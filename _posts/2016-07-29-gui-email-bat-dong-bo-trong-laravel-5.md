---
layout: post
title: Gửi email bất đồng bộ trong Laravel 5
subtitle: Gửi email là tính năng cơ bản của mọi website/webapp. Vấn đề cơ bản hơn nữa là không được để người dùng phải đợi quá lâu trong bất kỳ trường hợp nào.
bigimg: /img/posts/2016-07-29/banner.jpg
---

**Trong thế giới PHP có khá nhiều cách gửi email từ dễ đến khó. Nhưng Laravel đã làm đơn giản công việc này rất nhiều, khiến cho việc gửi email trỡ nên nhẹ nhàng hơn bao giờ hết.**

Laravel cung cấp cho chúng ta 2 hàm gửi email có chức năng tương tự nhau, chỉ khác nhau ở điểm là 1 hàm gửi đồng bộ (chạy và chờ) và 1 hàm bất đồng bộ (chạy và quên luôn). Cả 2 hàm này đều có thể sử dụng callback để kiểm tra khi nào email gửi xong.

2 hàm đó là: `Mail::send` và `Mail::queue`

Dĩ nhiên là chúng ta sẽ quan tâm tới hàm gửi bất đồng bộ vì việc để người dùng đợi gửi email xong mới làm việc khác là rất dở về mặt UX.

Để sử dụng phương pháp gửi email này chúng ta cần setup 2 phần:

1. Setup hàng đợi (queue)
2. Setup service trên server để đảm đương hàng đợi này.

## Setup hàng đợi:
Đầu tiên là vào file .env và khai báo

```
QUEUE_DRIVER=database
```

`database` là cách đơn giản nhất vì không phải setup gì thêm, chỉ việc tận dụng db có sẵn (chưa hỗ trợ NoSQL)

Sau đó chỉ việc chạy lệnh `migrate` để hệ thống tạo bảng mặc định cho queue quy định trong `config/queue.php` là `jobs`.

```
./artisan migrate
```

## Setup service trên server (Centos 7 Linux):

Tạo 1 bash script có tên là `laravel_queue` và đặt tại `/opt/scripts` để tiện cho việc tái sử dụng khi dùng cho nhiều website:

```bash
#!/bin/bash
# Only approve list app below
list_app=("project1" "project2")
if [[ " ${list_app[@]} " =~ " $1 " ]];
then
    BASE_DIR="/opt/nginx/$1/"
    ARTISAN_APP=$BASE_DIR"artisan"
    cd $BASE_DIR
    $ARTISAN_APP queue:listen
else
    echo 'No laravel app found.'
fi
```

Cho script này quyền thực thi:

```bash
chmod +x /opt/scripts/laravel_queue
```

Giả sử các dự án Laravel được nằm tại foler `/opt/nginx` (bạn có thể thay đổi bất kỳ nơi nào bạn thấy thích hợp).

`project1` và `project2` là folder chứa các dự án Laravel có sử dụng chức năng gửi email bất đồng bộ. Giả sử app hiện tại của chúng ta là `project1`

Sử dụng script này cực kì đơn giản.

Ví dụ: kích hoạt hàng đợi cho dự án `project1`:

```
/opt/scripts/laravel_queue project1
```

Bước cuối cùng là tạo service

Tạo file tên là `project1_queue.service` tại `/etc/systemd/system/`

Với nội dung:

```bash
[Unit]
Description=project1_queue daemon
After=network.target
[Service]
User=root
# Group=nginx
WorkingDirectory=/opt/nginx/project1
Environment=/usr/bin
ExecStart=/opt/scripts/laravel_queue project1
[Install]
WantedBy=multi-user.target
```

Kích hoạt dịch vụ:

```bash
systemclt stat project1_queue.service
```

Dịch vụ này sẽ chạy ngầm và có chức năng tự restart nếu gặp bất kỳ lỗi gì để đảm bảo mail luôn được gửi.

DONE
