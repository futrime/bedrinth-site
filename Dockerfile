# syntax=docker/dockerfile:1

FROM node:18-alpine AS builder
WORKDIR /app

COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
