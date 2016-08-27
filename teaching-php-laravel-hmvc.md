---
layout: page
title: Install Laravel 5.3 và config HMVC.
subtitle: HMVC (Hierarchical model–view–controller) giúp ứng dụng cấu trúc theo dạng module, thuận tiện cho việc quản lý code khi ứng dụng trỡ nên phức tạp và chia sẻ code trong nhóm.
share-img: /img/pages/teaching-php/laravel-hmvc/thumbnail.jpg
---

### Trong hướng dẫn này chúng ta sẽ hoàn thành 2 mục tiêu:

1. Cài đặt Laravel 5.3 bằng composser
2. Cấu hình Laravel để có thể chạy mô hình HMVC

## Bước 1: Cài đặt Laravel 5.3

**Cài đặt composer**

```
sudo apt-get update
sudo apt-get install curl php-cli git
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

Kiểm tra lại sau khi cài đặt:

```
composser
```

Nếu ra kết quả có dòng như:

```
...
Composer version 1.2.0 2016-07-19 01:28:52
...
```

Thì đạt yêu cầu

**Tạo database mới cho dự án**

```
sudo -i -u postgres
createdb -O username 9gag
```

`username` ở đây là tài khoản được tạo khi config server ban đầu tại bài: [Cài đặt Ubuntu 16.04 server](/teaching-php-server-config/)

**Cài đặt Laravel**

```
composer global require "laravel/installer"
cd /opt/nginx/
laravel new 9gag
sudo chmod -R 777 /opt/nginx/9gag/storage
sudo chmod -R 777 /opt/nginx/9gag/bootstrap/cache
```

**Sửa file `.env`**

Thay đổi các thông số sau:

``
APP_URL=http://9gag.dev

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5421
DB_DATABASE=9gag
DB_USERNAME=username
DB_PASSWORD=password
``

**Set domain cho dự án mới**

sudo vim /etc/hosts

Nếu dùng máy ảo thì thêm dòng:

```
192.168.1.45        9gag.dev # 192.168.1.45 là IP của máy ảo
```

Nếu dùng máy thật:

```
127.0.0.1        9gag.dev
```
**Cấu hình Nginx cho dự án mới**

sudo vim /etc/nginx/sites-enabled/default

Thêm nội dung:

```
server {
    listen   80;
    server_name 9gag.dev;

    root /opt/nginx/9gag/public;
    index index.php index.html;
    client_max_body_size 5M;
    fastcgi_read_timeout 300;
    expires off;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_intercept_errors on;
        include fastcgi_params;
    }

    location /public {
        # Static files
        try_files $uri $uri/ /index.html;
        rewrite ^/public(/.*)$ $1 break;
        add_header Access-Control-Allow-Origin *;
    }
}
```

Sau đó restart lại Nginx

```
service nginx restart
```

Test thử bằng cách