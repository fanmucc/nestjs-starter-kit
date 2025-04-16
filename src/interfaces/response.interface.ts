// src/interfaces/response.interface.ts

export interface ResponseInterface<T = any> {
  code: number;
  message: string;
  data?: T;
  meta?: any;
}