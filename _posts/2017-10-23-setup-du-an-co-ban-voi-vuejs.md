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
