---
layout: page
title: Cài đặt Ubuntu 16.04 server.
subtitle: Config server là 1 kỹ năng không thể thiếu cho 1 full stack web developer.
---

**Bài viết này không bao gồm hướng dẫn chi tiết cài Ubuntu trên (máy thật hoặc máy ảo)**

## Bước 1: cài Nginx, PHP7, php-fpm

Để chạy được PHP khi truy cập server bằng trình duyệt, chúng ta cần cài 1 web server là Nginx và gói php-fpm để chạy PHP trên nginx.

```bash
sudo apt-get update
sudo apt-get install nginx php php-fpm
```

Config php.ini

```bash
sudo vim /etc/php/7.0/fpm/php.ini
```

Chuyển `;cgi.fix_pathinfo=1 thành `cgi.fix_pathinfo=0`

Test xem PHP đã được cài đúng chưa:

```bash
php -version
```


Test xem Nginx đã được cài đúng chưa:

Dùng trình duyệt truy cập địa chỉ: `127.0.0.1` nếu bạn dùng máy thật hoặc IP của máy ảo.

Để có được IP của máy ảo thì dùng lệnh:

```bash
php -version
```

Ví dụ như đây là output của lệnh trên:

```
Link encap:Ethernet  HWaddr 08:00:27:69:fd:0f
inet addr:192.168.1.45  Bcast:192.168.1.255  Mask:255.255.255.0
inet6 addr: fe80::a00:27ff:fe69:fd0f/64 Scope:Link
UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
RX packets:7384 errors:0 dropped:0 overruns:0 frame:0
TX packets:3264 errors:0 dropped:0 overruns:0 carrier:0
collisions:0 txqueuelen:1000
RX bytes:6887075 (6.8 MB)  TX bytes:311339 (311.3 KB)
```

và IP trong trường hợp này là `192.168.1.45`

Khi truy cập bằng trình duyệt và thấy hiện ra dòng chữ: **Welcome to nginx!** thì xem như xong 2 bước.

## Bước 2: Config Nginx

Để test PHP chạy được trên server chưa thì ta sẽ thực hiện các bước sau:

**Tạo folder chứa source code:**

```bash
sudo mkdir /opt/web
sudo chmod 777 /opt/web
mkdir /opt/web/9gag
vim /opt/web/9gag/index.php
```

với nội dung:

```PHP
<?php
echo "<h1>Hello world</h1>";
```
**Trỏ domain tới IP máy ảo hoặc 127.0.0.1 nếu cài trực tiếp trên máy thật linux:**

```bash
sudo vim /etc/hosts
```

Nếu bạn đang dùng Windows thì có thể tham khảo tại [đây](https://support.rackspace.com/how-to/modify-your-hosts-file/)

với nội dung:

```
192.168.1.45        9gag.dev
```

**Lưu ý:** Phần trỏ domain này là thao tác trên máy thật chứ ko phải máy ảo.

**Tạo file cấu hình Nginx cho dự án mới**

sudo vim /etc/nginx/sites-enabled/default

thêm nội dung:

```
server {
    listen 80;
    server_name 9gag.dev;

    root /opt/web/9gag;
    index index.php index.html;

    location / {
    	try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
		include snippets/fastcgi-php.conf;
		fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }
}
```

Restart lại Nginx:

```bash
sudo systemctl reload nginx
```

Bây giờ bạn vào địa chỉ `http://9gag.dev` và sẽ thấy dòng `Hello world`

## Bước 3: Cài và config Postgres

## Bước 4: Config samba (dành cho máy ảo)

