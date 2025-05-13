// 后端统一成功相应拦截器

// src/interceptors/transform.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  SetMetadata,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseInterface } from './response.interface';
import { ResponseCodeEnum } from '../Enums/response-status.enum';
import { ClassConstructor, instanceToPlain, plainToInstance, Type } from 'class-transformer';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';

export const RESPONSE_DTO_KEY = 'response_dto';

export function ResponseDto(dto: ClassConstructor<any>) {
  return SetMetadata(RESPONSE_DTO_KEY, dto);
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseInterface<T>> {
  constructor(private reflector: Reflector, private i18n: I18nService) { }

  // 递归处理嵌套对象
  private transformNestedObject(data: any, dto: ClassConstructor<any>): any {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map(item => this.transformNestedObject(item, dto));
    }

    if (typeof data === 'object') {
      // 转换当前对象
      const instance = plainToInstance(dto, data, {
        excludeExtraneousValues: true
      });

      const transformed = instanceToPlain(instance);

      // 递归处理所有嵌套对象
      Object.keys(transformed).forEach(key => {
        if (transformed[key] && typeof transformed[key] === 'object') {
          // 获取属性的类型装饰器
          const propertyType = Reflect.getMetadata('design:type', dto.prototype, key);
          if (propertyType && propertyType !== Object) {
            // 如果属性有明确的类型，使用该类型进行转换
            transformed[key] = this.transformNestedObject(data[key], propertyType);
          } else {
            // 如果没有明确的类型，使用当前DTO类型
            transformed[key] = this.transformNestedObject(data[key], dto);
          }
        }
      });

      return transformed;
    }

    return data;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseInterface<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const handler = context.getHandler();

    // 获取控制器方法上设置的ResponseDto
    const responseDto = this.reflector.get<ClassConstructor<any>>(
      RESPONSE_DTO_KEY,
      handler,
    );

    return next.handle().pipe(
      map(data => {
        // 如果返回的数据已经是 ResponseInterface 格式，直接返回
        if (data && data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
          return data;
        }

        // 获取 HTTP 状态码
        const statusCode = response.statusCode || HttpStatus.OK;

        let transformedData = data;
        let meta = {};

        // 处理包含 data 和 meta 的返回结构
        if (data && data.hasOwnProperty('data') && data.hasOwnProperty('meta')) {
          const { data: items, meta: originalMeta } = data;

          // 使用递归转换处理返回数据
          if (responseDto && items) {
            transformedData = this.transformNestedObject(items, responseDto);
          } else {
            transformedData = items;
          }

          meta = originalMeta;
        } else {
          // 处理普通数据
          if (responseDto && data) {
            transformedData = this.transformNestedObject(data, responseDto);
          }
        }

        let defaultMessage = this.i18n.t(`http-statuses.${ResponseCodeEnum.OK}`);
        // 构建标准响应格式
        const result: ResponseInterface<T> = {
          code: ResponseCodeEnum.OK,
          message: defaultMessage as string,
          data: transformedData,
          meta: {
            timestamp: new Date().toISOString(),
            path: request.url,
            statusCode,
            ...meta,
          },
        };

        return result;
      }),
    );
  }
}