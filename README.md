# NestJS Laravel-like Structure

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

基于 NestJS 框架的项目，采用类似 Laravel 的目录结构，使用 TypeScript 开发。本项目提供了一个完整的后端服务架构，包含用户认证、权限管理、国际化等常用功能。

## 项目初始化

1. 查看 .env 文件 进行 sql 地址配置，不同数据库配置请更新 `prisma/schema.prisma`中数据库参数
2. `pnpm install`
3. 运行 `npx prisma db pull`
4. 运行 `npx prisma generate` 初始化 prisma 客户端
5. `pnpm run start:dev` 运行配置

** 注：引入了 sql，请优先讲 sql 环境进行配置，否则控制台报错 **

## 第三方服务 services

第三方服务统一放到这里进行引入，暂时有 `prisma`、`redis`、`email`.
其中 `redis 和 email`为 亚马逊提供，可能需要在配置或者代码上进行修改适配

## prisma 提交说明

1. `prisma` 会在 sql 中生成一个日志表，会对生产时间有较为严格的对比，这就导致在多人开发过程中，对表的生产和修改时间无法保证统一的顺序，导致的结果就是再更新表的时候，会提示表错误，然后让其选择是否进行数据库格式化 --(eggs 疼)
2. 这里我采用的方法是，测试环境想提交就提交。`npx prisma db push`，其他人在开发环境的时候，进行`pull`就可以了。
3. 生产环境时，则通过命令讲生产环境表与测试环境表进行`diff`对比，然后生产修改文件。手动保留需要上线的表修改并生产日志文件进行同步。
4. 生产环境执行日志更新，来打到表更新的目的
5. 设计到的两个文件`prisma-diff.sh` 这个会对比生产表与测试表的不同并生产修改文件。 `prisma-up`这里会讲生产的修改文件打包成修改迁移日志。发布线上后，线上执行 `npx prisma migrate deploy`来同步日志。

## 技术栈

- **核心框架**: NestJS
- **开发语言**: TypeScript
- **数据库 ORM**: Prisma
- **数据库**: MySQL
- **认证**: JWT Authentication
- **国际化**: i18n
- **包管理**: pnpm
- **代码规范**: ESLint + Prettier
- **测试框架**: Jest

## 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 8
- MySQL >= 8.0
- Redis (可选)

### 安装

```bash
# 克隆项目
$ git clone [项目地址]

# 安装依赖
$ pnpm install

# 配置环境变量
$ cp .env.example .env
$ cp env.prod.example env.prod

# 初始化数据库
$ npx prisma db pull
$ npx prisma generate
```

### 运行项目

```bash
# 开发环境
$ pnpm run start:dev

# 生产环境
$ pnpm run start:prod

# 调试模式
$ pnpm run start:debug
```

## 项目结构

```
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
├── i18n/              # 国际化文件
│   ├── en/           # 英文
│   └── zh/           # 中文
├── models/           # 数据模型
├── translations/     # 翻译模块
└── utils/           # 工具函数
```

## 核心功能

### 1. 认证与授权

- JWT 认证
- 角色权限控制
- 多角色支持
- 自定义守卫

### 2. 数据库操作

- Prisma ORM
- 数据库迁移
- 数据验证
- 关联关系处理

### 3. 国际化

- 多语言支持
- 动态语言切换
- 翻译文件管理
- 自动语言检测

### 4. 异常处理

- 全局异常过滤
- 自定义业务异常
- 统一错误响应
- 错误日志记录

### 5. 响应处理

- 统一响应格式
- 响应转换器
- 分页处理
- 数据过滤

## 开发规范

### 代码风格

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化
- 保持代码整洁和一致性

### 命名规范

- 文件名：kebab-case（如：user-service.ts）
- 类名：PascalCase（如：UserService）
- 变量名：camelCase（如：userName）
- 常量：UPPER_CASE（如：MAX_RETRY_COUNT）
- 接口名：以 I 开头（如：IUserResponse）

### API 设计

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

### 1. 构建项目

```bash
$ pnpm run build
```

### 2. 环境配置

- 配置生产环境变量
- 设置数据库连接
- 配置日志系统
- 设置安全选项

### 3. 启动服务

```bash
$ pnpm run start:prod
```

## 数据库迁移

```bash
# 生成迁移文件
$ ./prisma-diff.sh

# 应用迁移
$ npx prisma db execute --file src/database/prisma/migrations/migration.sql --schema src/database/prisma/schema.prisma
```

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证

[MIT licensed](LICENSE)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Prisma 命令说明

### 常用命令

```bash
# 查看所有可用命令
$ npx prisma --help

# 数据库相关命令
$ npx prisma db --help

# 生成 Prisma Client
$ npx prisma generate

# 数据库迁移相关命令
$ npx prisma migrate --help

# 查看数据库状态
$ npx prisma db pull

# 重置数据库
$ npx prisma db push --force-reset

# 查看数据库模型
$ npx prisma studio
```

### 数据库迁移

```bash
# 创建新的迁移
$ npx prisma migrate dev --name init

# 应用迁移
$ npx prisma migrate deploy

# 重置数据库并应用所有迁移
$ npx prisma migrate reset

# 生成迁移文件（使用脚本）
$ ./prisma-diff.sh
```

### 数据模型操作

```bash
# 格式化 schema 文件
$ npx prisma format

# 验证 schema 文件
$ npx prisma validate

# 生成类型定义
$ npx prisma generate
```

### 数据库管理

```bash
# 打开 Prisma Studio（数据库管理界面）
$ npx prisma studio

# 导出数据库结构
$ npx prisma db pull

# 将 schema 同步到数据库
$ npx prisma db push
```
