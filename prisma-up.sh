#!/bin/bash

# 1️⃣ 让用户输入迁移名称，并自动拼接时间戳
TIMESTAMP=$(date +%Y%m%d%H%M)
DEFAULT_MIGRATION_NAME="update_migration_${TIMESTAMP}"

read -p "请输入迁移记录名称（默认: ${DEFAULT_MIGRATION_NAME}）: " MIGRATION_NAME
MIGRATION_NAME=${MIGRATION_NAME:-$DEFAULT_MIGRATION_NAME}

# 2️⃣ 创建带时间戳的迁移目录
MIGRATION_DIR="./src/database/prisma/migrations/${TIMESTAMP}_${MIGRATION_NAME}"
mkdir -p "$MIGRATION_DIR"

# 3️⃣ 复制 diff 生成的 SQL 文件到 Prisma 迁移目录
if [ -f "./src/database/prisma/migrations/migration.sql" ]; then
  cp "./src/database/prisma/migrations/migration.sql" "${MIGRATION_DIR}/migration.sql"
  echo "✅ 迁移 SQL 已复制到: ${MIGRATION_DIR}/migration.sql"
else
  echo "❌ 未找到 migration.sql，确保你已经执行了 prisma migrate diff"
  exit 1
fi

# 4️⃣ 标记迁移记录已应用，防止 Prisma 误报 drift
npx prisma migrate resolve --applied "${TIMESTAMP}_${MIGRATION_NAME}"

echo "🎉 迁移记录已生成，请提交到 Git 并在生产环境运行:"
echo "   npx prisma migrate deploy"