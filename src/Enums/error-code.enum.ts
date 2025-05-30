// src/enums/error-code.enum.ts

export enum ErrorCode {
  // HTTP 标准状态码 (100-599)
  // 1xx: 信息性状态码
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,

  // 2xx: 成功状态码
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // 3xx: 重定向状态码
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  // 4xx: 客户端错误状态码
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,

  // 5xx: 服务器错误状态码
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,

  // 系统级别错误码 (1000-1999)
  SYSTEM_ERROR = 1000,
  NETWORK_ERROR = 1001,
  DATABASE_ERROR = 1002,
  CACHE_ERROR = 1003,

  // 认证和授权错误码 (2000-2999)
  TOKEN_EXPIRED = 2001,
  INVALID_TOKEN = 2002,

  // 参数验证错误码 (3000-3999)
  VALIDATION_ERROR = 3000,
  INVALID_PARAMETERS = 3001,
  MISSING_REQUIRED_PARAMETER = 3002,

  // 业务逻辑错误码 (4000-4999)
  BUSINESS_ERROR = 4000,
  RESOURCE_NOT_FOUND = 4001,
  RESOURCE_ALREADY_EXISTS = 4002,
  RESOURCE_EXPIRED = 4003,

  // 第三方服务错误码 (5000-5999)
  THIRD_PARTY_SERVICE_ERROR = 5000,
  API_CALL_FAILED = 5001,
  EXTERNAL_SERVICE_TIMEOUT = 5002,
}