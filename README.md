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

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## 初始化数据库
```bash
npx prisma db pull
npx prisma generate
```

完成后，prisma/schema.prisma 文件中会同步出表数据

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Project Structure (Laravel-like)

```bash
src/
├── config/               # Configuration files
├── controllers/         # Request handlers
├── services/           # Business logic layer
├── models/             # Data models and database interactions
├── repositories/       # Data access layer
├── middleware/         # HTTP middleware
├── interfaces/         # TypeScript interfaces
├── dto/               # Data Transfer Objects
├── decorators/        # Custom decorators
├── guards/            # Authentication and authorization guards
├── exceptions/        # Custom exceptions and filters
├── database/          # Database related files
│   ├── migrations/    # Database migrations
│   └── seeders/      # Database seeders
├── providers/         # Service providers
├── events/           # Event classes
├── listeners/        # Event listeners
├── jobs/            # Queue jobs
├── mail/            # Mail related files
├── helpers/         # Helper functions
└── resources/       # Resource files
    ├── views/       # View templates (if needed)
    └── lang/        # Localization files
```

### Directory Descriptions

- **config/**: 存放应用程序的配置文件
- **controllers/**: 控制器层，处理 HTTP 请求和响应
- **services/**: 服务层，包含主要的业务逻辑
- **models/**: 数据模型层，定义数据结构和数据库交互
- **repositories/**: 数据访问层，处理数据持久化
- **middleware/**: 中间件，处理请求/响应过滤和修改
- **interfaces/**: TypeScript 接口定义
- **dto/**: 数据传输对象，用于请求验证和数据转换
- **decorators/**: 自定义装饰器
- **guards/**: 守卫，用于认证和授权
- **exceptions/**: 自定义异常和异常过滤器
- **database/**: 数据库相关文件
  - **migrations/**: 数据库迁移文件
  - **seeders/**: 数据库种子文件
- **providers/**: 服务提供者，用于依赖注入
- **events/**: 事件类
- **listeners/**: 事件监听器
- **jobs/**: 队列任务
- **mail/**: 邮件相关文件
- **helpers/**: 辅助函数
- **resources/**: 资源文件
  - **views/**: 视图模板（如果需要）
  - **lang/**: 多语言文件

### Key Differences from Laravel

1. 使用 TypeScript 而不是 PHP
2. 使用装饰器（Decorators）而不是 PHP 注解
3. 使用 TypeORM/Prisma 而不是 Eloquent
4. 主要面向 API 开发，视图层可选

### Best Practices

1. 遵循 SOLID 原则
2. 使用依赖注入
3. 保持代码模块化
4. 使用 TypeScript 类型系统
5. 遵循 NestJS 最佳实践
