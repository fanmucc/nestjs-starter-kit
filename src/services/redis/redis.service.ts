import { Injectable } from '@nestjs/common';
import { CreateRediDto } from './dto/create-redi.dto';
import { UpdateRediDto } from './dto/update-redi.dto';

import { Redis, Cluster } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { REDIS } from '../../Enums/redis.enum';

@Injectable()
export class RedisService {
  private readonly redis: Redis | Cluster;
  private readonly ttl: number;
  private readonly globalPrefix: string; // 全局前缀

  constructor(private configService: ConfigService) {
    const REDIS_CLUSTER = this.configService.get(REDIS.REDIS_CLUSTER);

    if (REDIS_CLUSTER === 'true') {
      // 集群 redis
      this.redis = new Cluster([
        {
          host: this.configService.get(REDIS.REDIS_HOST),
          port: this.configService.get(REDIS.REDIS_PORT),
        },
      ], {
        dnsLookup: (address, callback) => callback(null, address), // 解决 AWS 负载均衡问题
        redisOptions: {
          tls: {}, // 👈 启用 TLS，使用默认配置即可
          username: this.configService.get(REDIS.REDIS_USERNAME),
          password: this.configService.get(REDIS.REDIS_PASSWORD),
        },
      })
    } else {
      // 单机 redis
      this.redis = new Redis({
        host: this.configService.get(REDIS.REDIS_HOST),
        port: this.configService.get(REDIS.REDIS_PORT),
        username: this.configService.get(REDIS.REDIS_USERNAME),
        password: this.configService.get(REDIS.REDIS_PASSWORD),
        db: this.configService.get(REDIS.REDIS_DB),
      });
    }
    this.ttl = this.configService.get(REDIS.REDIS_TTL); // 默认 24 小时
    this.globalPrefix = this.configService.get(REDIS.REDIS_PREFIX) || 'redis_demo';
  }

  // 获取 redis 前戳配置
  private getPrefixedKey(module: string, key: string): string {
    return `${this.globalPrefix}:${module}:${key}`;
  }

  /**
   * 设置缓存
   * @param module 模块名称
   * @param key 缓存键
   * @param value 缓存值
   * @param ttl 过期时间（秒）
   */
  async set(module: string, key: string, value: any, ttl: number = this.ttl): Promise<void> {
    await this.redis.setex(this.getPrefixedKey(module, key), ttl, JSON.stringify(value));
  }

  /**
   * 获取缓存
   * @param module 模块名称
   * @param key 缓存键
   * @returns 缓存值
   */
  async get<T>(module: string, key: string): Promise<T | null> {
    const data = await this.redis.get(this.getPrefixedKey(module, key));
    return data ? JSON.parse(data) : null;
  }

  /**
   * 删除缓存
   * @param module 模块名称
   * @param key 缓存键
   */
  async del(module: string, key: string): Promise<void> {
    await this.redis.del(this.getPrefixedKey(module, key));
  }

  /**
   * 批量获取缓存
   * @param module 模块名称
   * @param keys 缓存键数组
   * @returns 缓存值数组
   */
  async mget<T>(module: string, keys: string[]): Promise<(T | null)[]> {
    const results = await this.redis.mget(keys.map(key => this.getPrefixedKey(module, key)));
    return results.map(item => (item ? JSON.parse(item) : null));
  }

  /**
   * 批量设置缓存
   * @param module 模块名称
   * @param keyValuePairs 键值对
   * @param ttl 过期时间（秒）
   */
  async mset(module: string, keyValuePairs: Record<string, any>, ttl: number = this.ttl): Promise<void> {
    const pipeline = this.redis.pipeline();

    Object.entries(keyValuePairs).forEach(([key, value]) => {
      pipeline.setex(this.getPrefixedKey(module, key), ttl, JSON.stringify(value));
    });

    await pipeline.exec();
  }

  /**
   * 批量删除缓存
   * @param module 模块名称
   * @param keys 缓存键数组
   */
  async mdel(module: string, keys: string[]): Promise<void> {
    if (keys.length > 0) {
      await this.redis.del(...keys.map(key => this.getPrefixedKey(module, key)));
    }
  }

}
