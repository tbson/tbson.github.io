---
layout: post
title: Gửi email bất đồng bộ trong Laravel 5
subtitle: Gửi email là tính năng cơ bản của mọi website/webapp. Vấn đề cơ bản hơn nữa là không được để người dùng phải đợi quá lâu trong bất kỳ trường hợp nào.
bigimg: /img/posts/2016-07-29/banner.jpg
---

**Trong thế giới PHP có khá nhiều cách gửi email từ dễ đến khó. Nhưng Laravel đã làm đơn giản công việc này rất nhiều, khiến cho việc gửi email trỡ nên nhẹ nhàng hơn bao giờ hết.**

Laravel cung cấp cho chúng ta 2 hàm gửi email có chức năng tương tự nhau, chỉ khác nhau ở điểm là 1 hàm gửi đồng bộ (chạy và chờ) và 1 hàm bất đồng bộ (chạy và quên luôn). Cả 2 hàm này đều có thể sử dụng callback để kiểm tra khi nào email gửi xong.

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
