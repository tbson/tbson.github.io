---
layout: post
title: Setup HTTPS cho môi trường dev
subtitle: Để môi trường phát triển gần với môi trường production nhất
bigimg: /img/posts/2018-01-16/https.png
share-img: /img/posts/2018-01-16/https.png
---


Sử dụng HTTPS cho môi trường phát triển nếu môi trường production của bạn là HTTPS là điều cần thiết. Điều đó sẽ giúp hạn chế lỗi phát sinh vì sự khác biệt môi trường.

Ngoài ra, có nhiều trường hợp bạn cần HTTP để test local ví dụ như HTTP2 Server Push, postMessage.

Ý tưởng của bài viết này là dùng 1 dạng self signed certificate nhưng chính bạn sẽ đóng vai trò là 1 CA.

Cách này sẽ loại bỏ khuyết điểm về HTTPS đỏ, bắt verify để sử dụng HTTPS.

Nguyên nhân trình duyệt bắt phải verify đối với các self signed certificate vì root certificate không có trong trình duyệt / hệ điều hành.

Nếu bạn dùng dịch vụ của các bên bán SSL certificate như Vverisign hoặc free như Let's encrypt, trình duyệt happy vì hầu hết các trình duyệt đều có 1 bản copy (hoặc lấy từ hệ điều hành) root certificate của các bên ấy. Điều đó đảm bảo bất kì người dùng nào cũng được bảo vệ.

Sẽ ra sao nếu nếu bản thân mình làm CA và tự tạo cho mình 1 root certificate? Mình có thể install root certificate vào máy mình (hoặc trình duyệt) và dùng root certificate này để sign các certificate dùng cho HTTPS. Thao tác đó sẽ giúp trình duyệt máy tính được cài root certificate happy nhưng ở máy khác thì certificate sẽ bị từ chối (hiện đỏ, bắt verify). Phương pháp này cực kì phù hợp cho môi trường dev (có mỗi mình dùng HTTPS).

Đầu tiên là tạo 1 root CA và certificate cho 1 domain cụ thể, ví dụ: `mydomain.test`.

Mình đã tạo 1 tool để làm công việc này tại [https://github.com/tbson/localca](https://github.com/tbson/localca)

Sau khi clone repo này về, có được file `generage` thì chạy:

```
./generage mydomain
```

Sau các câu hỏi về thông tin lẫn mật khẩu thì bạn sẽ có được thư mục như sau:

```

├── localca.key
├── localca.pem
└── output
    └── mydomain
        ├── cer.crt
        ├── localca.pem
        └── rsa.key
```

Install `localca.pem` vào máy

Sau đây là các bước install trên Mac

Mở Keychain app

Vào > Import Items...

Chọn private key file (localca.pem)

Tìm common name tương ứng

![Tìm common name](/img/posts/2018-01-16/step1.png)

Chọn root certificate trong danh sách

Mở rộng mục Trust

Đổi mục `When using this certificate:` Chọn `Always Trust`

![Tìm common name](/img/posts/2018-01-16/step2.png)

Đóng cửa sổ certificate

Hệ thống sẽ hỏi mật khẩu máy hoặc bắt quét vân tay

Done!

Sau đó ta đã có thể dùng ceftificate được tạo ra:

Dùng cho Nginx/PHP

```
ssl on;
ssl_certificate /path_to/cer.crt;
ssl_certificate_key /path_to/rsa.key;
```

Dùng cho webpack dev server

```
devServer: {
    disableHostCheck: true,
    contentBase: PATHS.build,
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 4004,
    https: {
        cert: fs.readFileSync("/path_to/cer.crt"),
        key: fs.readFileSync("/path_to/rsa.key"),
        ca: fs.readFileSync("/path_to/localca.pem")
    }
},
```

Dùng cho django development dùng với [https://github.com/teddziuba/django-sslserver](https://github.com/teddziuba/django-sslserver)

```
python manage.py runsslserver 0.0.0.0:8001 --certificate /path_to/cer.crt --key /path_to/rsa.key
```

Tham khảo: [https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/)
