---
layout: post
title: Các kỹ năng cần có để trỡ thành 1 Full Stack Developer
subtitle: Full Stack Developer có thể tự tin giải quyết hầu hết các vấn đề về web mà không phụ thuộc vào bên nào.
bigimg: /img/posts/2016-08-30/banner.jpg
share-img: /img/posts/2016-08-30/banner.jpg
---

Không phải ai cũng muốn trỡ thành Full Stack Developer do phải đầu tư khá nhiều thời gian để trau dồi nhiều loai kiến thức và kinh nghiệm khác nhau. Để trỡ thành 1 Full Stack Developer bạn cần có các kỹ năng chính:

1. Back-End/API (PHP & Laravel)
2. Front-End (Javascript & AngularJs/ReactJs)
3. Mobile (Javascript & Ionic/React Native)

Các kỹ năng trên là các kỹ năng tôi có được và có thể truyền đạt chứ không nhất thiết tất cả các Full Stack Developer đều có, tuỳ thuộc vào từng nhóm kỹ năng.

Hiện tại có rất nhiều nhu cầu xây dựng Web App dạng như: Dựng 1 trang bán hàng có app di động để đặt hàng. Mặc dù mobile web có thể làm được hầu hết các tác vụ mà mobile có thể nhưng vẫn có khá nhiều hạn chế liên quan đến các vấn đề tiếp cận phần cứng như: Lấy số điện thoại, dùng camera, dùng offline... và 1 vấn đề lớn nhất đối với khách hàng là có thể lấy app trên app store / play store.

Đối với developer thì nó khá vô nghĩa và ko khác gì mở trang web bằng trình duyệt, nhưng thực tế là nhiều người coi đó là 1 sự khác biệt lớn về đẳng cấp.

Một điều tuyệt vời của việc viết app di động bằng Ionic là Ionic dùng AngularJs. Nếu AngularJs đã được chúng ta sử dụng cho front-end thì thời gian học Ionic để viết 1 cross platform app (Android, iOS) là bằng 0 hoặc cực kì nhanh chóng để làm quen.

Đối với sự kết hợp Front-End là Angular và Back-End là PHP sẽ bộc lộ một vài nhược điểm. 2 nhược điểm nổi bật nhất là:

1. SEO khó
2. Chưa dùng được GraphQL để tối ưu API.

Nếu Front-End là ReactJs và Back-End là NodeJs thì 2 nhược điểm kia được khắc phục triệt để bằng Server Rendering và Relay.

Nhưng sự kết hợp PHP/Angular không phải là 1 sự kết hợp tồi vì:

1. PHP tiết kiệm tài nguyên do dùng Nginx (đặc biệt là dev nghèo có thể host tầm 6 trang hoặc nhiều hơn trên 1 host có bộ xử lý 1 core và 1GB RAM).
2. Angular dễ học dễ dùng và các công việc liên quan tới Angular hầu hết trong các trang cần login nên không cần SEO. Những trang cần SEO nằm ở ngoài như trang chủ, trang show blog, trang show sản phẩm thì cấu trúc quá đơn giản, không cần dùng tới Angular mà chỉ cần dùng Blade của Laravel là có thể xử lý rất tốt.
3. Có thể tối ưu dữ liệu trả về từ API để tối ưu tốc độ load của client.
4. Config và hiểu Server Rendering không hề đơn giản, vì khi làm việc với hệ sinh thái này, chúng ta cần học thêm nhiều kiến thức mới nữa như: Immutable, Flux/Redux, Webpack config (đào sâu)
