---
layout: post
title: Docker cho môi trường phát triển Laravel và React
subtitle: Dùng cho dự án SPA dùng React, Laravel làm API
bigimg: /img/posts/2018-01-14/docker-laravel-react.jpeg
share-img: /img/posts/2018-01-14/docker-laravel-react.jpeg
---


Bài viết này sẽ giải quyết các vấn đề:

- Development / Production server chạy nhiều hơn 1 dự án web.
- Proxy React SPA dùng subpath instead of subdomain or other port.

Nội dung khá giống với bài viết [Setup môi trường dev Django với Docker](/2017-10-16-setup-moi-truong-dev-django-voi-docker/) nhưng giải quyết thêm vài vấn đề đặc thù khi setup `php-fpm`, `node` dùng proxy network.

Lý do không dùng mỗi nginx instance cho mỗi dự án: Khi dùng mỗi nginx instance cho mỗi dự án thì chúng ta sẽ gặp vấn đề về port 80. Chúng ta có thể chạy nhiều nginx instance cùng lúc nhưng chỉ có duy nhất 1 port 80. Điều đó có nghĩa là nếu chúng ta có 2 dự án web chạy cùng lúc thì chỉ có 1 dự án dùng được port 80, ví dụ: `project1.test` và dự án còn lại phải dùng port khác, ví dụ: `project2.test:8080`. Điều này gây ra rất nhiều bất tiện trên cả môi trường Development lẫn Production.

Để giải quyết vấn đề đó thì ta có thể dùng 1 nginx container dùng chung cho tất cả các dự án. Vấn đề phát sinh khi dùng phương pháp này là các container không dùng chung 1 network nên ta cần tạo 1 proxy network dùng chung cho tất cả các container.

Giả sử trong `home` của bạn có 1 folder tên là `code`, folder này chứa tất cả mọi thứ liên quan tới bài viết này.

## Bước 1: Tạo proxy network

```bash
docker network create common_proxy
```

## Bước 2: Setup Nginx container

Tạo 1 folder cho Nginx container

```bash
mkdir ~/code/nginx
```

Folder `nginx` có cấu trúc sau:

```
└── nginx
    ├── conf.d
    │   ├── default.conf
    │   └── project1.conf
    └── docker-compose.yml
```

Lần lượt các file có nội dung:

```
version: '2'
# docker-compose.yml
networks:
    proxy:
        external:
            name: common_proxy

services:
    nginx:
        container_name: nginx
        image: "nginx:1.12.1"
        restart: always
        volumes:
            - ./conf.d:/etc/nginx/conf.d
        ports:
            - "80:80"
        networks:
            - proxy
```

```
# default.conf
# Default page if no configuration match
server {
    listen 80;
    server_name _;
    charset utf-8;

    location / {
        return 404;
    }
}
```

```
# project1.conf
server {
    listen 80; 
    server_name project1.test;
    charset utf-8;
    root /code/public;
    index index.php index.html;

    location / {
        try_files $uri /index.php?$args;
    }

    location /api/v1/ {
        try_files $uri /index.php?$args;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass project1_api:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }

    location /public {
        try_files $uri $uri/ /index.html;
        rewrite ^/public(/.*)$ $1 break;
        add_header Access-Control-Allow-Origin *;
    }

    location /admin/ {
        proxy_pass http://project1_client:4004;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        rewrite ^/admin(/.*)$ $1 break;
    }

    location /user/ {
        proxy_pass http://project1_client:4004;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        rewrite ^/user(/.*)$ $1 break;
    }
}
```

Bạn có thể để ý thấy `project1_client` và `project1_client` là 2 service name được khai báo trong container tiếp theo.


## Bước 3: Cấu trúc dự án

Giả sử dự án của bạn nằm ở: `~/code/project1` thì `project1` có cấu trúc sau:

```
├── api #  Laravel
├── client #  React
├── down #  Script dùng để chạy dự án
└── up #  Script dùng để tắt dự án
```


## Bước 4: Setup Laravel container

Các file /folder đáng lưu ý khi setup Laravel container:

```
├── .gitignore
├── dbdata/ #  Chứa database
├── api.dockerfile #  Setup php-fpm container và các lib cần thiết
├── docker-compose.default.yml
└── docker-compose.yml #  File được ignore, có nội dung gần giống với docker-compose.default.yml
```

Các file có nội dung sau:

```
# api.dockerfile
FROM php:7.0.17-fpm

RUN apt-get update && apt-get install -y libmcrypt-dev libpq-dev \
    libmagickwand-dev --no-install-recommends \
    && pecl install imagick \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-enable imagick \
    && docker-php-ext-install mcrypt pdo pdo_pgsql pgsql

RUN mkdir /code
```

```
# docker-compose.default.yml
version: '2'

networks:
    proxy:
        external:
            name: common_proxy

services:
    project1_db:
        container_name: project1_db
        image: "postgres:10.1"
        environment:
            - POSTGRES_USER=docker
            - POSTGRES_PASSWORD=docker
            - POSTGRES_DB=docker
        ports:
            - "5433:5432"
        volumes:
            - ./dbdata:/var/lib/postgresql/data/:cached
        networks:
            - proxy

    project1_api:
        container_name: project1_api
        build:
            context: ./
            dockerfile: api.dockerfile
        working_dir: /code
        volumes:
            - .:/code:cached
        environment:
            - "DB_CONNECTION=pgsql"
            - "DB_PORT=5432"
            - "DB_HOST=project1_db"
            - "DB_DATABASE=docker"
            - "DB_USERNAME=docker"
            - "DB_PASSWORD=docker"
        networks:
            - proxy
```


## Bước 5: Setup React container

Các file /folder đáng lưu ý khi setup React container:

```
├── .gitignore
├── client.dockerfile #  Setup node container và các lib cần thiết
├── docker-compose.default.yml
└── docker-compose.yml #  File được ignore, có nội dung gần giống với docker-compose.default.yml
```

Các file có nội dung sau:

```
# client.dockerfile
FROM node:carbon

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN mkdir /code

WORKDIR /code

ADD ./package.json /code/

RUN yarn
```

```
# docker-compose.default.yml
version: '2'

networks:
    proxy:
        external:
            name: common_proxy

services:
    project1_client:
        container_name: project1_client
        build:
            context: ./
            dockerfile: client.dockerfile
        command: bash -c "yarn start"
        working_dir: /code
        ports:
            - "4004:4004"
        volumes:
            - .:/code:cached
            - /code/node_modules
        networks:
            - proxy
```

Client dùng port 4004 vì trong bài này, tôi dùng `webpack-dev-server` chạy port 4004, bạn có thể dùng bất kì port nào khác.

## Bước 6: Viết script tắt / mở cả dự án

File `up` và `down` có nội dung:

```
# up
docker-compose -f api/docker-compose.yml up -d
docker-compose -f client/docker-compose.yml up -d
docker-compose -f ../../docker/nginx/docker-compose.yml up -d
```

```
# down
docker-compose -f ../../docker/nginx/docker-compose.yml down
docker-compose -f api/docker-compose.yml down
docker-compose -f client/docker-compose.yml down
```

## Bước 7: Chạy dự án
Thêm `project1.test` vào `/etc/hosts`

Copy các file `docker-compose.default.yml` thành `docker-compose.yml`

Chạy: `~/code/project1/up`

Nếu cần import file SQL vào db:

```
docker exec -i project1_db psql -U docker docker < file_path.sql
```

Với `docker` đầu tiên là tên user và `docker` thứ 2 là tên db được quy định trong `project1_db`

Tắt: `~/code/project1/down`
