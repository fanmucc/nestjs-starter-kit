// src/lang/en/http-statuses.ts

interface HttpStatusMessages {
  [key: string]: string;
}

export const httpStatuses: HttpStatusMessages = {
  '0': '未知错误',
  '100': '继续请求',
  '101': '切换协议',
  '102': '处理中',
  '200': '请求成功',
  '201': '已创建',
  '202': '已接受',
  '203': '非权威信息',
  '204': '无内容',
  '205': '重置内容',
  '206': '部分内容',
  '207': '多状态',
  '208': '已上报',
  '226': 'IM已使用',
  '300': '多种选择',
  '301': '已永久移动',
  '302': '临时移动',
  '303': '见其他',
  '304': '未修改',
  '305': '使用代理',
  '307': '临时重定向',
  '308': '永久重定向',
  '400': '请求错误',
  '401': '未授权',
  '402': '需要付款',
  '403': '禁止',
  '404': '未找到',
  '405': '方法不允许',
  '406': '无法接受',
  '407': '需要代理验证',
  '408': '请求超时',
  '409': '冲突',
  '410': '不可用',
  '411': '长度要求',
  '412': '前提条件未满足',
  '413': '请求实体过大',
  '414': 'URI太长了',
  '415': '不支持的媒体类型',
  '416': '请求范围不符合',
  '417': '期望不满足',
  '418': '我是一个茶壶',
  '419': '会话已过期',
  '421': '错误的请求',
  '422': '不可处理的实体',
  '423': '锁定',
  '424': '失败的依赖',
  '425': '太早了',
  '426': '需要升级',
  '428': '前提要求',
  '429': '请求太多',
  '431': '请求标头字段太大',
  '444': '连接关闭无响应',
  '449': '重试',
  '451': '法律原因不可用',
  '499': '客户端关闭请求',
  '500': '内部服务器错误',
  '501': '未实现',
  '502': '网关错误',
  '503': '服务不可用',
  '504': '网关超时',
  '505': 'HTTP版本不支持',
  '506': '变体协商',
  '507': '存储空间不足',
  '508': '检测到环路',
  '509': '超出带宽限制',
  '510': '未延期',
  '511': '需要网络验证',
  '520': '未知错误',
  '521': 'Web服务器已关闭',
  '522': '连接超时',
  '523': '原点无法到达',
  '524': '发生超时',
  '525': 'SSL握手失败',
  '526': '无效的SSL证书',
  '527': '轨道炮错误',
  '598': '网络读取超时',
  '599': '网络连接超时',
  'unknownError': '未知错误',
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