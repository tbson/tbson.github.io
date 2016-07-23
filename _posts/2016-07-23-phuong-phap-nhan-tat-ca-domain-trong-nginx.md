---
layout: post
title: Phương pháp nhận tất cả domain trong Nginx
subtitle: Cho phép người dùng sử dụng dịch vụ mà không cần config domain
bigimg: /img/posts/2016-07-23/domain-banner.jpg
---

Trong các dự án liên quan đến vấn đề tạo website cho người dùng, một trong những vấn đề cơ bản là cho phép người dùng sử dụng website mà họ đã đăng ký mà không (hoặc chưa cần) domain riêng.

**Ví dụ**: Bạn xây dựng một dịch vụ tạo website hàng loạt cho các chuyên viên bất động sản để họ đăng ký vào tạo các website bất động sản. Domain của bạn là _somewebsite.com_ và người dùng sau khi đăng ký sẽ có 1 website dạng _user1.somewebsite.com_ hoặc _somewebsite.com/user1_. Dùng phương thức nào là tuỳ bạn nhưng theo kinh nghiệm làm các dự án loại này của tôi thì dùng subdomain có 2 ưu điểm:

1. URL trông đẹp và chuyên nghiệp.
2. Dễ code (vì không phải làm việc nhiều với URL router).

Khi sử dụng phương pháp subdomain thì bạn sẽ gặp một vấn đề là: Làm cách nào để tôi đăng ký 1 subdomain cho người dùng ngay khi họ vừa đăng ký tài khoản trên hệ thống của tôi.

Câu trả lời có thể:

1. Dùng API trỏ tới bên cung cấp domain để cấp phát mỗi khi có nhu cầu.
2. Config server để nhận subdomain 1 cách chủ động.

Rõ ràng cách 2 khả thi hơn.

Ý tưởng của cách 2 này là: Bất cứ domain nào cũng có tính năng **Wildcard DNS record**
Wildcard DNS record có nghĩa là bạn khai báo rằng mỗi khi ai đó nhập địa chỉ website chính của bạn, ví dụ như vào 1 subdomain mà bạn chưa định nghĩa thì hệ thống tự động redirect đến nơi mà Wildcard DNS record trỏ tới.

Ví dụ: trong A records bạn thêm 1 record:

**\*** trỏ tới **121.122.123.124**

Với IP trên là IP của server bạn đang dùng.

Hình minh hoạ dưới đây sử dụng dịch vụ Godaddy:

![A record wildcard](/img/posts/2016-07-23/a-record-wildcard.jpg)

Vậy là bất kỳ lúc nào người dùng vào địa chỉ _user1.somewebsite.com_ hoặc _user2.somewebsite.com_ hay bất kì subdomain nào mà bạn chưa khai báo sử dụng ở nhà cung cấp domain thì request đó sẽ tự trỏ tới server chính và bạn chỉ cần lọc subdoman đó ra xem user nào sở hữu subdomain ấy để trả về kết quả phù hợp.

Hàm dưới đây viết bằng PHP dùng để phân giải xem domain mà người dùng vào là domain chính của website, subdomain hay domain riêng mà người dùng tự mua và trỏ tới hệ thống:

```PHP
public static function parseDomain(){
    $primaryDomain = \Config::get('app.domain'); # Laravel's config
    $currentDomain = $_SERVER['HTTP_HOST'];
    # Match perfectly
    if($currentDomain === $primaryDomain){
        return 'primary';
    }

    $currentDomainArr = explode('.', $currentDomain);

    # Just localhost
    if(count($currentDomainArr) === 1){
        return 'primary';
    }

    # Get 2 last items.
    $currentDomainArr = array_slice($currentDomainArr, -2, 2, true);

    $currentDomain = implode('.', $currentDomainArr);

    if($currentDomain === $primaryDomain){
        return 'subdomain';
    }
    return 'personal';
}
```

