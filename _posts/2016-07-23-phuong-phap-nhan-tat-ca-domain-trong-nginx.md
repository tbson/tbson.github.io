---
layout: post
title: Phương pháp nhận tất cả domain trong Nginx
subtitle: Cho phép người dùng sử dụng dịch vụ mà không cần config domain
bigimg: /img/posts/2016-07-23/domain-banner.jpg
---

Trong các dự án liên quan đến vấn đề tạo website cho người dùng, một trong những vấn đề cơ bản là cho phép người dùng sử dụng website mà họ đã đăng ký mà không (hoặc chưa cần) domain riêng.

**Ví dụ**: Bạn xây dựng một dịch vụ tạo website hàng loạt cho các chuyên viên bất động sản để họ đăng ký vào tạo các website bất động sản. Domain của bạn là somewebsite.com và người dùng sau khi đăng ký sẽ có 1 website dạng user1.somewebsite.com hoặc somewebsite.com/user1. Dùng phương thức nào là tuỳ bạn nhưng theo kinh nghiệm làm các dự án loại này của tôi thì dùng subdomain có 2 ưu điểm:

1. URL trông đẹp và chuyên nghiệp.
2. Dễ code (vì không phải làm việc nhiều với URL router).
