import { LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import 'winston-daily-rotate-file';

export class LoggerService implements NestLoggerService {
  private logger: winston.Logger;

  constructor() {
    const logDir = 'logs';

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        // 控制台输出
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
        // 错误日志文件（按天轮转，保留30天）
        new winston.transports.DailyRotateFile({
          filename: path.join(logDir, 'error-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '30d',
          level: 'error',
        }),
        // 所有日志文件（按天轮转，保留14天）
        new winston.transports.DailyRotateFile({
          filename: path.join(logDir, 'combined-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  log(message: any, context?: string) {
    this.logger.info(JSON.stringify(message), { context });
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error(JSON.stringify(message), { trace, context });
  }

  warn(message: any, context?: string) {
    this.logger.warn(JSON.stringify(message), { context });
  }

  debug(message: any, context?: string) {
    this.logger.debug(JSON.stringify(message), { context });
  }

  verbose(message: any, context?: string) {
    this.logger.verbose(JSON.stringify(message), { context });
  }
} 