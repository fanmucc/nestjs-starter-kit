// src/constants/error-messages.constant.ts

import { ErrorCode } from '../enums/error-code.enum';

export const ErrorMessages = {
  [ErrorCode.SYSTEM_ERROR]: 'System error occurred',
  [ErrorCode.NETWORK_ERROR]: 'Network error occurred',
  [ErrorCode.DATABASE_ERROR]: 'Database error occurred',
  [ErrorCode.CACHE_ERROR]: 'Cache error occurred',

  [ErrorCode.UNAUTHORIZED]: 'Unauthorized access',
  [ErrorCode.TOKEN_EXPIRED]: 'Token has expired',
  [ErrorCode.INVALID_TOKEN]: 'Invalid token',
  [ErrorCode.FORBIDDEN]: 'Access forbidden',

  [ErrorCode.VALIDATION_ERROR]: 'Validation error',
  [ErrorCode.INVALID_PARAMETERS]: 'Invalid parameters',
  [ErrorCode.MISSING_REQUIRED_PARAMETER]: 'Missing required parameter',

  [ErrorCode.BUSINESS_ERROR]: 'Business error occurred',
  [ErrorCode.RESOURCE_NOT_FOUND]: 'Resource not found',
  [ErrorCode.RESOURCE_ALREADY_EXISTS]: 'Resource already exists',
  [ErrorCode.RESOURCE_EXPIRED]: 'Resource has expired',

  [ErrorCode.THIRD_PARTY_SERVICE_ERROR]: 'Third party service error',
  [ErrorCode.API_CALL_FAILED]: 'API call failed',
  [ErrorCode.EXTERNAL_SERVICE_TIMEOUT]: 'External service timeout',
} as const;