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
import { ResponseCodeEnum, ResponseMessageEnum } from '../Enums/response-status.enum';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import { Reflector } from '@nestjs/core';

export const RESPONSE_DTO_KEY = 'response_dto';

export function ResponseDto(dto: ClassConstructor<any>) {
  return SetMetadata(RESPONSE_DTO_KEY, dto);
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseInterface<T>> {
  constructor(private reflector: Reflector) { }

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

        // 使用class-transformer处理返回数据
        if (responseDto && data) {
          if (Array.isArray(data)) {
            // 处理数组数据
            const instances = data.map(item => plainToInstance(responseDto, item, {
              excludeExtraneousValues: true
            }));
            transformedData = instances.map(instance => instanceToPlain(instance));
          } else {
            // 处理单个对象
            const instance = plainToInstance(responseDto, data, {
              excludeExtraneousValues: true
            });
            transformedData = instanceToPlain(instance);
          }
        }

        // 构建标准响应格式
        const result: ResponseInterface<T> = {
          code: ResponseCodeEnum.SUCCESS,
          message: ResponseMessageEnum.SUCCESS,
          data: transformedData,
          meta: {
            timestamp: new Date().toISOString(),
            path: request.url,
            statusCode,
          },
        };

        // 如果是分页数据，添加分页信息
        if (data && data.meta && data.meta.pagination) {
          const { pagination, ...restMeta } = data.meta;
          result.data = transformedData;
          result.meta = {
            ...result.meta,
            ...restMeta,
            pagination,
          };
        }

        return result;
      }),
    );
  }
}