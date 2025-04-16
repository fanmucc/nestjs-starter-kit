// src/services/response.service.ts

import { Injectable } from '@nestjs/common';
import { ResponseInterface } from '../interfaces/response.interface';
import { ResponseCodeEnum, ResponseMessageEnum } from '../Enums/response-status.enum';

@Injectable()
export class ResponseService {
  success<T>(data: T, message = ResponseMessageEnum.SUCCESS): ResponseInterface<T> {
    return {
      code: ResponseCodeEnum.SUCCESS,
      message,
      data,
    };
  }

  error(message: string, code = ResponseCodeEnum.ERROR): ResponseInterface {
    return {
      code,
      message,
    };
  }

  paginate<T>(
    data: T[],
    pagination: {
      total: number;
      page: number;
      limit: number;
    },
    message = ResponseMessageEnum.SUCCESS,
  ): ResponseInterface<T[]> {
    return {
      code: ResponseCodeEnum.SUCCESS,
      message,
      data,
      meta: {
        pagination: {
          total: pagination.total,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: Math.ceil(pagination.total / pagination.limit),
        },
      },
    };
  }
}