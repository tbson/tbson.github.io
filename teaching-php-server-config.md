---
layout: page
title: Cài đặt Ubuntu 16.04 server.
subtitle: Config server là 1 kỹ năng không thể thiếu cho 1 full stack web developer.
---

**Bài viết này không bao gồm hướng dẫn chi tiết cài Ubuntu trên (máy thật hoặc máy ảo)**

## Bước 1: cài Nginx, PHP7, php-fpm

Để chạy được PHP khi truy cập server bằng trình duyệt, chúng ta cần cài 1 web server là Nginx và gói php-fpm để chạy PHP trên nginx.

```bash
apt-get install nginx php php-fpm
```

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

## Bước 2: Config Nginx

## Bước 3: Cài và config Postgres

## Bước 4: Config samba (dành cho máy ảo)

