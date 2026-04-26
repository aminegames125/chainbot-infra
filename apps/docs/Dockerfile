FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/docs/package.json ./apps/docs/

RUN pnpm install --frozen-lockfile

COPY apps/docs ./apps/docs
COPY tsconfig.base.json ./

WORKDIR /app/apps/docs
RUN pnpm build
CMD ["pnpm", "start"]
