---
layout: page
title: Cài đặt Ubuntu 16.04 server.
subtitle: Config server là 1 kỹ năng không thể thiếu cho 1 full stack web developer.
share-img: /img/pages/teaching-php/server-config/thumbnail.jpg
---

**Bài viết này không bao gồm hướng dẫn chi tiết cài Ubuntu trên (máy thật hoặc máy ảo)**

Trong bài này sử dụng VIM làm editor là chủ yếu. Vim là 1 trình chỉnh sửa text trên nền terminal. Được sử dụng rộng rãi bởi các sysadmin vì rất tiện dụng nhưng vì các tiếp cận hơi khác với các editor khác như notepad++ nên bước đầu làm quen sẽ hơi khó chịu. Nhưng ai đã quen rồi thì sẽ NGHIỆN VIM.

Các bạn có thể tham khảo bài hướng dẫn dùng VIM tại [đây](http://quantrimang.com/cach-su-dung-trinh-bien-soan-vim-54249)

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

Chuyển `;cgi.fix_pathinfo=1` thành `cgi.fix_pathinfo=0`

**Test xem PHP đã được cài đúng chưa:**

```bash
php -version
```

Nếu output ra dạng như sau thì ok:

```bash
PHP 7.0.8-0ubuntu0.16.04.2 (cli) ( NTS )
Copyright (c) 1997-2016 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2016 Zend Technologies
    with Zend OPcache v7.0.8-0ubuntu0.16.04.2, Copyright (c) 1999-2016, by Zend Technologies
```

**Test xem Nginx đã được cài đúng chưa:**

Dùng trình duyệt truy cập địa chỉ: `127.0.0.1` nếu bạn dùng máy thật hoặc IP của máy ảo.

Để có được IP của máy ảo thì dùng lệnh:

```bash
ifconfig
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

Khi truy cập bằng trình duyệt và thấy hiện ra dòng chữ: **Welcome to nginx!** thì xem như xong bước 1.

## Bước 2: Test/Config Nginx

Để test PHP chạy được trên server chưa thì ta sẽ thực hiện các bước sau:

**Tạo folder chứa source code:**

```bash
sudo mkdir /opt/nginx
sudo chmod 777 /opt/nginx
mkdir /opt/nginx/9gag
vim /opt/nginx/9gag/index.php
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

```
sudo vim /etc/nginx/sites-enabled/default
```

thêm nội dung:

```
server {
    listen 80;
    server_name 9gag.dev;

    root /opt/nginx/9gag;
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

**Cài Postgres:**

```bash
sudo apt-get install postgresql postgresql-contrib php-pgsql
```

**Test Postgres:**

```bash
sudo -i -u postgres
psql
```

Nếu output ra dạng như sau là ok:

```
psql (9.5.3)
Type "help" for help.
```

**Config Postgres:**

Tạo thêm 1 tài khoản người dùng cho Postgres

```bash
sudo -i -u postgres
createuser someuser
psql
ALTER USER someuser WITH PASSWORD 'somepassword';
\q
exit
```

Tạo database để dùng cho dự án mới

```bash
sudo -i -u postgres
createdb -O someuser 9gag
exit
```

Config cho phép truy cập/quản lý Postgres từ bên ngoài (**Chỉ áp dụng cho máy ảo**)

```
sudo vim /etc/postgresql/9.5/main/postgresql.conf
```

Sửa `# listen_addresses = 'localhost'` thành `listen_addresses = '8'`

```
sudo vim vim /etc/postgresql/9.5/main/pg_hba.conf
```

Thêm dòng

```
host    all             all             192.168.1.20/24            md5
```

Với `192.168.1.20` là địa chỉ IP của máy thật

Restart lại Postgres:

```
sudo service postgresql restart
```

Sau đó các bạn có thể dùng [Valentina Studio](http://www.valentina-db.com/en/valentina-studio-overview) để truy cập và quản lý database của mình.

Chọn **Connect to** hoặc **Add Bookmark**

![Connect to](/img/pages/teaching-php/server-config/valentina-1.png)

Điền thông tin

![Điền thông tin](/img/pages/teaching-php/server-config/valentina-2.png)

## Bước 4: Config samba (chỉ dành cho máy ảo)

Bước này dùng để mount folder chứa source code trên server máy ảo về máy thật để thao tác trực tiếp. Không cần phải code local xong đưa lên server máy ảo để test.

**Cài Samba**

```
sudo apt-get install samba
```

**Set password cho Samba user**

Vì samba dùng cùng hệ thống user của Ubuntu nhưng khác hệ thống password nên ta cần set lại để sử dụng cho Samba. Có thể set giống với mật khẩu user trên Ubuntu để tiện nhớ

```
sudo someuser -a somepassword
```

**Lưu ý:** `someuser` phải là tài khoản đã được tạo sẵn của Ubuntu

Config Samba:

Backup file config cũ:

```
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
```

Sửa file config

```
sudo vim /etc/samba/smb.conf
```

Thêm vào:

```
[nginx]
path = /opt/nginx
valid users = someuser
read only = no
```

Restart Samba:

```
sudo service smbd restart
```

Sau đó bạn có thể mount folder nginx chứa source code tại địa chỉ `192.168.1.45/nginx` với `192.168.1.45` là IP của máy ảo, user name và mật khẩu được định nghĩa ở trên.

Đối với Windows có thể dùng chức năng map network drive để mount.

Đối với Mac/Linux có thể dùng chức năng Connect to server để mount.

DONE!