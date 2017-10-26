---
layout: post
title: Setup dự án cơ bản với VueJS
subtitle: Dùng VueJS cho cả user và admin panel
bigimg: /img/posts/2017-10-23/vuejs.jpg
share-img: /img/posts/2017-10-23/vuejs.jpg
---

**Vấn đề cần giải quyết:** Dựng một dự án có sự tham gia của cả admin lẫn user, mỗi loại người dùng này sẽ có bảng điều khiển riêng và trang login riêng. Client là 1 SPA (Single Page Application) giao tiếp với tầng server qua RESTful API.

**Ví dụ:** Trang web chia sẻ ảnh, cho phép thành viên đăng ảnh và admin có thể kiểm duyệt ảnh vi phạm nội quy.

Người dùng đăng nhập: `http://project1.dev/admin/`

Admin đăng nhập: `http://project1.dev/user/`

Chúng ta sẽ bắt thiết lập 1 dự án như vậy cho cả môi trường dev lẫn production.

**Yêu cầu**

* Có `node` và `npm` được cài sẵn trên máy, tốt nhất là dùng `nvm`. Bạn có thể tham khảo link cài nvm ở [đây](https://github.com/creationix/nvm):
* Có `vue cli`: `npm install -g vue-cli`
* Thư mục giả định chứa dự án: `~/Code/project1`


## Bước 1: Khởi tạo khung dự án đơn giản nhất Vue bằng Vue cli

```bash
cd ~/Code/projec1
vue init webpack-simple client
cd client
npm install
```

Chạy thử:

```bash
npm run dev
```

Trả lời hết các câu hỏi trên và bạn đã có 1 khung dự án Vue sẵn sàng hoạt động tại: `http://127.0.0.1:8080`

Bước 2: Dùng domain thay vì IP hoặc localhost và bỏ phần port đi

