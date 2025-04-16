// src/lang/en/http-statuses.ts

interface HttpStatusMessages {
  [key: string]: string;
}

export const httpStatuses: HttpStatusMessages = {
  '0': 'Unknown Error',
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': 'I\'m a teapot',
  '419': 'Session Has Expired',
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '425': 'Too Early',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '444': 'Connection Closed Without Response',
  '449': 'Retry With',
  '451': 'Unavailable For Legal Reasons',
  '499': 'Client Closed Request',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Maintenance Mode',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '509': 'Bandwidth Limit Exceeded',
  '510': 'Not Extended',
  '511': 'Network Authentication Required',
  '520': 'Unknown Error',
  '521': 'Web Server is Down',
  '522': 'Connection Timed Out',
  '523': 'Origin Is Unreachable',
  '524': 'A Timeout Occurred',
  '525': 'SSL Handshake Failed',
  '526': 'Invalid SSL Certificate',
  '527': 'Railgun Error',
  '598': 'Network Read Timeout Error',
  '599': 'Network Connect Timeout Error',
  'unknownError': 'Unknown Error',
} as const;

// 为了更好的类型安全，我们可以添加一个枚举来表示状态码
export enum HttpStatusCode {
  UNKNOWN = 0,
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
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
  IM_A_TEAPOT = 418,
  SESSION_HAS_EXPIRED = 419,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  TOO_EARLY = 425,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  CONNECTION_CLOSED_WITHOUT_RESPONSE = 444,
  RETRY_WITH = 449,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  CLIENT_CLOSED_REQUEST = 499,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  MAINTENANCE_MODE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  BANDWIDTH_LIMIT_EXCEEDED = 509,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
  UNKNOWN_ERROR = 520,
  WEB_SERVER_IS_DOWN = 521,
  CONNECTION_TIMED_OUT = 522,
  ORIGIN_IS_UNREACHABLE = 523,
  TIMEOUT_OCCURRED = 524,
  SSL_HANDSHAKE_FAILED = 525,
  INVALID_SSL_CERTIFICATE = 526,
  RAILGUN_ERROR = 527,
  NETWORK_READ_TIMEOUT_ERROR = 598,
  NETWORK_CONNECT_TIMEOUT_ERROR = 599,
}

// 辅助函数：获取状态码对应的消息
export function getHttpStatusMessage(statusCode: HttpStatusCode | number): string {
  return httpStatuses[statusCode.toString()] || httpStatuses.unknownError;
}

// 类型：HTTP 状态码分类
export type HttpStatusCategory = '1xx' | '2xx' | '3xx' | '4xx' | '5xx';

// 辅助函数：获取状态码类别
export function getHttpStatusCategory(statusCode: number): HttpStatusCategory {
  const category = Math.floor(statusCode / 100);
  return `${category}xx` as HttpStatusCategory;
}

// 辅助函数：检查是否为成功状态码
export function isSuccessStatus(statusCode: number): boolean {
  return statusCode >= 200 && statusCode < 300;
}

// 辅助函数：检查是否为客户端错误状态码
export function isClientError(statusCode: number): boolean {
  return statusCode >= 400 && statusCode < 500;
}

// 辅助函数：检查是否为服务器错误状态码
export function isServerError(statusCode: number): boolean {
  return statusCode >= 500 && statusCode < 600;
}