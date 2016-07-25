---
layout: post
title: Phương pháp nhận tất cả domain trong Nginx
subtitle: Cho phép người dùng sử dụng dịch vụ mà không cần config domain
bigimg: /img/posts/2016-07-23/domain-banner.jpg
---

**Trong các dự án liên quan đến vấn đề tạo website cho người dùng, một trong những vấn đề cơ bản là cho phép người dùng sử dụng website mà họ đã đăng ký mà không (hoặc chưa cần) domain riêng.**

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

```php
<?php
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

```javascript
window.onload = function(){
        //do stuff here
    var areas = [];
    var titles = {};
    var indicator = $("#indicators");
    var slides = $("#slides");
    var data = [
        {
            id: 'a1',
            tooltip: '<strong>Căn A1 (03)</strong> <br/>Diện tích: <em>80.74m<sup>2</sup></em>',
            title: 'Căn hộ A1 (03)',
            slideImg: [
                'xuanmai-03-1.jpg',
                'xuanmai-03-2.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ số 03 (tầng 16 – tầng 33)',
                'Mặt bằng căn hộ số 03 (tầng 7 – tầng 15)'
            ]
        }, {
            id: 'a2',
            tooltip: '<strong>Căn A2 (04)</strong> <br/>Diện tích: <em>67.12m<sup>2</sup></em>',
            title: 'Căn hộ A2 (04)',
            slideImg: [
                'xuanmai-04-1.jpg',
                'xuanmai-04-2.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ số 04 (tầng 16 – tầng 33)',
                'Mặt bằng căn hộ số 04 (tầng 7 – tầng 15)'
            ]
        }, {
            id: 'a31',
            tooltip: '<strong>Căn A3 (05)</strong> <br/>Diện tích: <em>61.37m<sup>2</sup></em>',
            title: 'Căn hộ A3 (05)',
            slideImg: [
                'xuanmai-05-1.jpg',
                'xuanmai-05-2.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ số 05 (tầng 16 – tầng 33)',
                'Mặt bằng căn hộ số 05 (tầng 7 – tầng 15)'
            ]
        }, {
            id: 'a32',
            tooltip: '<strong>Căn A3 (06)</strong> <br/>Diện tích: <em>61.37m<sup>2</sup></em>',
            title: 'Căn hộ A3 (06)',
            slideImg: [
                'xuanmai-06-1.jpg',
                'xuanmai-06-2.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ số 06 (tầng 16 – tầng 33)',
                'Mặt bằng căn hộ số 06 (tầng 7 – tầng 15)'
            ]
        }, {
            id: 'a4',
            tooltip: '<strong>Căn A4 (07)</strong> <br/>Diện tích: <em>45.22m<sup>2</sup></em>',
            title: 'Căn hộ A4 (07)',
            slideImg: [
                'xuanmai-07-1.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ số 07 (tầng 16 – tầng 33)'
            ]
        }, {
            id: 'a5',
            tooltip: '<strong>Căn 5A (08)</strong> <br/>Diện tích: <em>75.90m<sup>2</sup></em>',
            title: 'Căn hộ 5A (08)',
            slideImg: [
                'xuanmai-08-1.jpg',
                'xuanmai-08-2.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ số 08 (tầng 7 – tầng 15)',
                'Mặt bằng căn hộ số 08 (tầng 16 – tầng 33)'
            ]
        }, {
            id: 'a6',
            tooltip: '<strong>Căn A6 (09)</strong> <br/>Diện tích: <em>76.29m<sup>2</sup></em>',
            title: 'Căn hộ A6 (09)',
            slideImg: [
                'xuanmai-09-1.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ số 09 (tầng 16 – tầng 33)'
            ]
        }, {
            id: 'a71',
            tooltip: '<strong>Căn A7 (10)</strong> <br/>Diện tích: <em>90.83m<sup>2</sup></em>',
            title: 'Căn hộ A7 (10)',
            slideImg: [
                'xuanmai-10-1.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ số 10 (tầng 7 – tầng 33)'
            ]
        }, {
            id: 'a72',
            tooltip: '<strong>Căn A7 (01)</strong> <br/>Diện tích: <em>90.69m<sup>2</sup></em>',
            title: 'Căn hộ A7 (01)',
            slideImg: [
                'xuanmai-01-1.jpg',
                'xuanmai-01-2.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ số 01 (tầng 16 – tầng 33)',
                'Mặt bằng căn hộ số 01 (tầng 7 – tầng 15)'
            ]
        }, {
            id: 'a8',
            tooltip: '<strong>Căn A8 (02)</strong> <br/>Diện tích: <em>78.95m<sup>2</sup></em>',
            title: 'Căn hộ A8 (02)',
            slideImg: [
                'xuanmai-02-1.jpg',
                'xuanmai-02-2.jpg'
            ],
            slideTitle: [
                'Mặt bằng căn hộ tầng 16 – tầng 33',
                'Mặt bằng căn hộ số 02 (tầng 16 – tầng 33)'
            ]
        }
    ];
    for(var i in data){
        areas.push({
            key: data[i].id,
            toolTip: data[i].tooltip
        });
        titles[data[i].id] = data[i].title;
    }
    $('#main-map').mapster({
        fillOpacity: 0.4,
        fillColor: "d42e16",
        stroke: true,
        strokeColor: "9edd34",
        strokeOpacity: 0.6,
        strokeWidth: 4,
        singleSelect: true,
        mapKey: 'name',
        listKey: 'name',
        showToolTip: true,
        toolTipClose: ["tooltip-click", "area-click", "image-mouseout"],
        areas: areas,
        onClick: function (e) {
            indicator.empty();
            slides.empty();

            var item = [];
            for(var i in data){
                if(data[i].id == e.key){
                    item = data[i];
                    break;
                }
            }

            for(var j in item.slideImg){
                var title = item.slideTitle[j];
                var img = '/img/posts/2016-07-25/' + item.slideImg[j];
                if(j == 0){
                    indicator.append('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
                    slides.append('<div class="item active"><img src="' + img + '"><div class="carousel-caption"><h3 style="color: black">'+ title +'</h3></div></div>');

                }else{
                    indicator.append('<li data-target="#carousel-example-generic" data-slide-to="' + j + '"></li>');
                    slides.append('<div class="item"><img src="' + img + '"><div class="carousel-caption"><h3 style="color: black">'+ title +'</h3></div></div>');
                }
            }

            $("#myModalLabel").text(titles[e.key]);
            $("#myModal").modal();
        }
    });
};

```

```html
<img id="main-map" src="/img/posts/2016-07-25/xuanmai.jpg" style="width: 100%" usemap="#area"/>
<map name="area">
    <area name="a1" shape="poly" coords="125,50, 180,50, 180,168, 125,168, 125,110, 120,110, 120,80, 125,80" href="imgmap">
    <area name="a2" shape="poly" coords="181,50, 277,50, 277,119, 181,119" href="imgmap">
    <area name="a31" shape="poly" coords="296,56, 390,56, 390,119, 296,119" href="imgmap">
    <area name="a32" shape="poly" coords="390,56, 483,56, 483,119, 390,119" href="imgmap">
    <area name="a4" shape="poly" coords="502,62, 566,62, 566,101, 601,101, 601,118, 502,118" href="imgmap">
    <area name="a5" shape="poly" coords="566,62, 641,62, 656,78, 656,170, 600,170, 600,102, 566,102" href="imgmap">
    <area name="a6" shape="poly" coords="566,138, 601,138, 600,169, 656,169, 656,237, 601,237, 601,242, 566,242" href="imgmap">
    <area name="a71" shape="poly" coords="455,137, 547,137, 547,242, 488,242, 488,212, 455,212" href="imgmap">
    <area name="a72" shape="poly" coords="232,136, 324,136, 324,212, 292,212, 290,242, 232,242" href="imgmap">
    <area name="a8" shape="poly" coords="180,139, 213,139, 213,242, 178,242, 178,237, 123,237, 123,202, 118,202, 118,168, 180,168, " href="imgmap">
</map>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel"></h4>
            </div>
            <div class="modal-body" style="padding: 0">

                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators" id="indicators"></ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" id="slides" role="listbox"></div>

                    <!-- Controls -->
                    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
```

