---
layout: post
title: Docker & PHP
subtitle: Sử dụng Docker để cài đặt môi trường phát triển Laravel (Nginx, PHP7, PHP-FPM, PostgreSQL)
bigimg: /img/posts/2017-08-30/docker-php.png
share-img: /img/posts/2017-08-30/docker-php.png
---

## Bước 1:

**Tạo cấu trúc folder cho dự án mới**

```bash
mkdir myproject # Folder gốc của dự án
mkdir myproject/dbdata # Lưu dữ liệu của database
mkdir myproject/configs # Lưu cấu hình nginx
cd myproject
```

**Donwload Laravel**

```bash
curl -L https://github.com/laravel/laravel/archive/v5.5.0.tar.gz | tar xz
mv laravel-5.5.0 src # Source code
```

**Install dependencies**

```bash
docker run --rm -v $(pwd)/src:/app composer/composer install
```

## Bước 2:

**Tạo file cấu hình `docker compose`**

```bash
vim docker-compose.yml
```

Với nội dung:

```
version: '2'
services:
  # The Database
  db:
    restart: always
    image: postgres
    environment:
        - POSTGRES_USER=docker
        - POSTGRES_PASSWORD=docker
        - POSTGRES_DB=docker
    ports:
        - "5432:5432"
    volumes:
        - ./dbdata:/var/lib/postgresql/data/

  # The Application
  app:
    build:
      context: ./
      dockerfile: app.dockerfile
    working_dir: /var/www
    volumes:
      - ./src/:/var/www
    environment:
      - "DB_CONNECTION=pgsql"
      - "DB_PORT=5432"
      - "DB_HOST=db"

  # The Web Server
  server:
    build:
      context: ./
      dockerfile: server.dockerfile
    working_dir: /var/www
    volumes_from:
      - app
    ports:
      - 8080:80
```

File cấu hình này phụ thuộc vào 2 cấu hình của `app` và `server` là `app.dockerfile` và `server.dockerfile`

```bash
vim app.dockerfile
```

Với nội dung:

```
FROM php:7.1.8-fpm

RUN apt-get update && apt-get install -y libmcrypt-dev libpq-dev \
    libmagickwand-dev --no-install-recommends \
    && pecl install imagick \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-enable imagick \
    && docker-php-ext-install mcrypt pdo pdo_pgsql pgsql
```

```bash
vim server.dockerfile
```

Với nội dung

```
FROM nginx:1.12.1

ADD configs/nginx.conf /etc/nginx/conf.d/default.conf
```

## Bước 3:

**Chạy phát đầu tiên để docker tiến hành cài đặt môi trường**

```bash
docker-compose up
```

**Init Laravel**

```
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan optimize
```

**Ghi chú:** Để tắt docker instance ta cần cd đến folder chứa file docker-compose.json của nó và chạy: `docker-compose down`

Kiểm tra trên trình duyệt với địa chỉ: `http://localhost:8080`

DONE.