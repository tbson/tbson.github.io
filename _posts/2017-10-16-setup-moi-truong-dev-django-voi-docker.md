---
layout: post
title: Setup môi trường dev Django với Docker
subtitle: Sử dụng Docker để cài đặt môi trường phát triển Django (Nginx, Python, Django, PostgreSQL)
bigimg: /img/posts/2017-10-16/docker-django.jpg
share-img: /img/posts/2017-10-16/docker-django.jpg
---

Mục tiêu khi viết bài này của tôi là để mở rộng bài viết [Docker & PHP](/2017-08-30-su-dung-docker-cai-dat-moi-truong-phat-trien-php-laravel/)

Bài viết trên mô tả vắn tắt cách setup môi trường cho 1 dự án PHP (Laravel) dùng Nginx và Postgres. Giới hạn của bài viết này là mỗi môi trường phát triển đều có 1 Nginx proxi riêng.

Điều này sẽ không thành vấn đề nếu dự án của chúng ta chỉ bó gọn trong mỗi docker container và không tương tác với nhau.

Nếu chúng ta chạy 1 lần 2 dự án thì URL của dự án thứ 2 không thể là port 80 vì container trước đã dùng.

Điều này có thể chấp nhận khi phát triển nhưng không thể chấp nhận trong khi đưa lên production.

Mục tiêu của docker là giảm thiểu công sức config dự án cả ở local lẫn ở production nên chúng ta cần 1 giải pháp khác.

Giải pháp được mình đề xuất là:
 - Nginx sẽ là 1 container riêng
 - Mỗi dự án sẽ là 1 container riêng, có nginx config riêng.
 - Tất cả dùng chung 1 network
 - Mỗi khi có dự án mới, chúng ta chỉ đơn giản là tạo 1 link từ file .config của từng dự án đến volume của Nginx container

Phương án này đã giải quyết triệt để vấn đề nhiều dự án cùng chạy trên 1 máy.

Và sau đây là các bước thực hiện:

Giả sử trong `Home` của bạn có 1 folder tên là `Code`, folder này chứa tất cả mọi thứ liên quan tới bài viết này.

## Bước 1: Setup Nginx container

Tạo 1 folder cho Nginx container

```bash
mkdir ~/Code/nginx
```

Folder `nginx` có cấu trúc sau:

```
└── nginx
    ├── conf.d
    │   ├── default.conf
    │   └── project1.conf
    └── docker-compose.yml
```

Lần lượt các file có nội dung như sau:

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
# Trang mặc định là 404 khi có ai đó truy cập vào domain chưa được config
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
  server_name project1.dev;
  charset utf-8;

  location / {
    proxy_pass http://web:8001;
    proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## Bước 2: Setup Django container

Folder `project1` có cấu trúc sau:

```
├── .gitignore
├── configs
│   └── nginx.conf  # Nginx config
├── dbdata  # Chứa DB
├── utils  # Chứa các script cần thiết
├── docker-compose.dev.yml
├── docker-compose.pro.yml
├── docker-compose.sta.yml
├── docker-compose.yml
├── requirements.txt  # Danh sách các package cần cho Django project
└── web.dockerfile
```

Nội dung các file

```
# .gitignore
docker-compose.yml
dbdata/*
```

```
# nginx.conf
server {
  listen 80;
  server_name project1.dev;
  charset utf-8;

  location / {
    proxy_pass http://web:8001;
    proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

```
# docker-compose.dev.yml
version: '2'

networks:
  proxy:
    external:
      name: common_proxy

services:
  db:
    container_name: thuenha_db
    image: "postgres:latest"
    environment:
        - POSTGRES_USER=docker
        - POSTGRES_PASSWORD=docker
        - POSTGRES_DB=docker
    ports:
        - "5433:5432"
    expose:
        - "5432"
    volumes:
        - ./dbdata:/var/lib/postgresql/data/
    networks:
      - proxy
  web:
    container_name: thuenha_web
    build:
      context: ./
      dockerfile: web.dockerfile
    command: bash -c "./utils/wait-for-it.sh db:5432 -- python3 manage.py makemigrations && python3 manage.py migrate && python3 manage.py runserver 0.0.0.0:8001"
    volumes:
      - .:/code
    expose:
      - "8001"
    ports:
      - "8001:8001"
    depends_on:
      - "db"
    networks:
      - proxy
```

```
# docker-compose.sta.yml
# docker-compose.pro.yml
version: '2'

networks:
  proxy:
    external:
      name: common_proxy

services:
  db:
    container_name: thuenha_db
    image: "postgres:latest"
    environment:
        - POSTGRES_USER=docker
        - POSTGRES_PASSWORD=docker
        - POSTGRES_DB=docker
    ports:
        - "5433:5432"
    expose:
        - "5432"
    volumes:
        - ./dbdata:/var/lib/postgresql/data/
    networks:
      - proxy
  web:
    container_name: thuenha_web
    build:
      context: ./
      dockerfile: web.dockerfile
    command: bash -c "./utils/wait-for-it.sh db:5432 -- python3 manage.py makemigrations && python3 manage.py migrate && gunicorn src.wsgi -b 0.0.0.0:8001"
    volumes:
      - .:/code
    expose:
      - "8001"
    ports:
      - "8001:8001"
    depends_on:
      - "db"
    networks:
      - proxy
```

```
# requirements.txt
Django>=1.8,<2.0
gunicorn==19.7.1
psycopg2
djangorestframework
markdown
django-filter
```

```
# web.dockerfile
FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD ./requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
```

Nội dung file `docker-compose.yml` là 1 trong 3 file `.dev.yml`, `.sta.yml` và `.pro.yml`

### Download `wait-for-it` script:

```bash
cd ~/Code/project1/utils
git clone https://github.com/vishnubob/wait-for-it.git && cp ./wait-for-it/wait-for-it.sh ./ && chmod +x wait-for-it.sh && rm -rf wait-for-it
```

### Init Django project

```bash
cd ~/Code/project1
docker-compose run web django-admin.py startproject src .
```

### Cập nhật các biến sau trong src/settings.py

```python
ALLOWED_HOSTS = ['project1.dev']
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'USER': 'docker',
        'PASSWORD': 'docker',
        'NAME': 'docker',
        'HOST': 'db',
        'PORT': 5432,
    }
}
```

### Link Nginx configuration file

```bash
cd ~/Code/nginx/conf.d
ln ~/Code/project1/configs/nginx.conf project1.conf
```

### Thêm project1.dev vào file hosts

```
127.0.0.1         project1.dev
```

### Tạo proxy network

```
docker network create common_proxy
```

### Chạy nginx

```
cd ~/Code/nginx/
docker-compose up -d
```

### Chạy Django

```
cd ~/Code/project1/
docker-compose up
```