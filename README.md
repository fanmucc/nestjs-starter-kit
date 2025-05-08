# NestJS Laravel-like Structure

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

基于 NestJS 框架的项目，采用类似 Laravel 的目录结构，使用 TypeScript 开发。

## 技术栈

- NestJS
- TypeScript
- Prisma (ORM)
- MySQL
- JWT Authentication
- i18n (国际化)

## 安装

```bash
# 安装依赖
$ pnpm install

# 初始化数据库
$ npx prisma db pull
$ npx prisma generate
```

## 运行项目

```bash
# 开发环境
$ pnpm run start:dev

# 生产环境
$ pnpm run start:prod
```

## 项目结构

```bash
src/
├── Http/                    # HTTP 相关
│   └── Api/                # API 路由
│       └── V1/             # API 版本
│           ├── app/        # C端接口
│           ├── auth/       # 认证模块
│           └── backend/    # 后端模块
├── common/                 # 公共模块
│   └── services/          # 公共服务
├── config/                # 配置文件
├── database/             # 数据库相关
│   └── prisma/          # Prisma 配置
├── Enums/               # 枚举定义
├── exceptions-filters/  # 异常过滤器
├── guards/             # 认证守卫
├── interfaces/         # 接口定义
├── lang/              # 语言文件
│   ├── en/           # 英文
│   └── zh/           # 中文
├── models/           # 数据模型
├── translations/     # 翻译模块
└── utils/           # 工具函数
```

## 目录说明

- **Http/**: HTTP 请求处理

  - **Api/**: API 路由定义
  - **V1/**: API 版本控制
  - **app/**: C端接口，处理客户端请求
  - **auth/**: 认证相关，处理用户认证和授权
  - **backend/**: 后端业务逻辑，处理管理后台请求

- **common/**: 公共模块

  - **services/**: 公共服务（如日志服务、响应格式化等）

- **config/**: 配置文件

  - 环境配置（开发、测试、生产）
  - 应用配置（数据库、JWT、i18n等）

- **database/**: 数据库相关

  - **prisma/**: Prisma ORM 配置和模型定义
  - 数据库连接配置
  - 数据迁移和种子

- **Enums/**: 枚举定义

  - 状态码（HTTP状态码、业务状态码）
  - 错误码（系统错误、业务错误）
  - 常量定义（业务常量、配置常量）

- **exceptions-filters/**: 异常处理

  - 全局异常过滤器
  - 自定义异常类
  - 异常响应格式化

- **guards/**: 认证守卫

  - JWT 认证守卫
  - 角色验证守卫
  - 权限控制守卫

- **interfaces/**: 接口定义

  - 响应接口（统一响应格式）
  - 请求接口（DTO验证）
  - 数据接口（业务模型接口）

- **lang/**: 国际化

  - **en/**: 英文翻译文件
  - **zh/**: 中文翻译文件
  - 支持动态切换语言

- **models/**: 数据模型

  - 基础业务模型
  - 通用业务逻辑
  - 数据验证规则
  - 模型关联关系

- **translations/**: 翻译模块

  - 翻译服务（I18nService）
  - 翻译管道（TranslationPipe）
  - 翻译装饰器（@Translate）

- **utils/**: 工具函数
  - 日期处理
  - 字符串处理
  - 加密解密
  - 文件处理
  - 其他通用工具

## 开发规范

1. **代码风格**

   - 使用 TypeScript 严格模式
   - 遵循 ESLint 规则
   - 使用 Prettier 格式化
   - 保持代码整洁和一致性

2. **命名规范**

   - 文件名：kebab-case（如：user-service.ts）
   - 类名：PascalCase（如：UserService）
   - 变量名：camelCase（如：userName）
   - 常量：UPPER_CASE（如：MAX_RETRY_COUNT）
   - 接口名：以 I 开头（如：IUserResponse）

3. **模块组织**

   - 按功能模块划分
   - 保持模块独立性
   - 遵循单一职责原则
   - 合理使用依赖注入

4. **API 设计**
   - RESTful 风格
   - 版本控制（/api/v1/...）
   - 统一响应格式
   - 合理的错误处理
   - 完整的接口文档

## 测试

```bash
# 单元测试
$ pnpm run test

# E2E 测试
$ pnpm run test:e2e

# 测试覆盖率
$ pnpm run test:cov
```

## 部署

1. 构建项目

```bash
$ pnpm run build
```

2. 启动服务

```bash
$ pnpm run start:prod
```

## 许可证

[MIT licensed](LICENSE)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
