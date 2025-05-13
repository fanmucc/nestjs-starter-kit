#!/bin/bash
# 1️⃣ Load .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# 2️⃣ 加载 env.prod 文件，并将生产环境的 DATABASE_URL 赋值给 PROD_DATABASE_URL
if [ -f env.prod ]; then
  # 临时保存生产环境的 DATABASE_URL
  PROD_DB_URL=$(grep -v '^#' env.prod | grep DATABASE_URL | cut -d '=' -f2)
  if [ -n "$PROD_DB_URL" ]; then
    export PROD_DATABASE_URL=$PROD_DB_URL
  fi
  # 加载其他环境变量
  export $(grep -v '^#' env.prod | grep -v DATABASE_URL | xargs)
fi

echo "🔍 加载环境变量完成"

if [ -z "$PROD_DATABASE_URL" ] || [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: 必须设置环境变量 \$PROD_DATABASE_URL 和 \$DATABASE_URL"
  exit 1
fi

echo "🔍 生成 Prisma 迁移 diff..."
npx prisma migrate diff \
  --from-url $PROD_DATABASE_URL \
  --to-url $DATABASE_URL \
  --script > src/database/prisma/migrations/migration.sql

echo "✅ Prisma 迁移文件已生成: src/database/prisma/migrations/migration.sql"
echo "🚀 请手动检查 migration.sql 并运行以下命令来应用迁移:"
echo "   npx prisma db execute --file src/database/prisma/migrations/migration.sql --schema src/database/prisma/schema.prisma"