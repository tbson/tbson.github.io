---
layout: post
title: Setup môi trường dev Django với Docker
subtitle: Sử dụng Docker để cài đặt môi trường phát triển Django (Nginx, Python, Django, PostgreSQL)
bigimg: /img/posts/2017-08-30/docker-php.png
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

Tạo 1 folder cho Nginx container

```bash
mkdir ~/Code/nginx
```

và folder `nginx` có cấu trúc sau:

```
└── nginx
    ├── conf.d
    │   ├── default.conf
    │   └── project1.conf
    └── docker-compose.yml
```

Lần lượt các file có nội dung như sau:

```YAML
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
