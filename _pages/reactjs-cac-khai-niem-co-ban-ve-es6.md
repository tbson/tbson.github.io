---
permalink: "/reactjs-cac-khai-niem-co-ban-ve-es6/"
layout: page
title: Các khái niệm cơ bản về ES6
subtitle: Giới thiệu các tính năng trong ES6 thường được sử dụng trong dự án React
---


ES6 hay ECMAScript 6 / ECMAScript 2015 là phiên bản mới được sử dụng rộng rãi của ECMAScript (Javascript tuân theo chuẩn này).

Phiên bản này cung cấp rất nhiều tính năng mới rất tiện dụng. Các tính năng mới được đưa vào rất nhiều. Trong bài viết này mình chỉ giới thiệu vài tính năng được sử dụng thường xuyên.

## Hằng (constant)
```javascript
const PI = 3.14
```
Hằng giúp tạo các biến không thể thay đổi giá trị (immutable variables). Lưu ý rằng hằng chỉ ngăn chặn việc thay đổi giá trị của biến chứ không ngăn chặn thay đổi nội dung của biến, ví dụ như đổi 1 thuộc tính (property) của 1 object.

## Biến giới hạn phạm vi (Block-Scoped Variables)

```javascript
function varTest() {
    let x = 1;
    if (true) {
        let x = 2;
        console.log(x);  // 2
    }
    console.log(x);  // 1
}
```

Trong ví dụ trên, biến `x` bên ngoài và trong block `if` được xem là 2 biến khác nhau nếu khai báo biến dùng `let`.
Nếu dùng `var` khai báo biến thì 2 biến `x` trên được xem là 1 biến và giá trị in ra tất cả bằng 2.

Biến giới hạn phạm vi là 1 bước tiến lớn của JS, chúng giúp cho việc sử dụng biến và debug dễ dàng hơn khi ta biết được phạm vi hoạt động của từng biến một cách dễ dàng.

## Arrow (Fat Arrow) function

```javascript
let odds  = evens.map(v => v + 1);
```

Tương đương với

```javascript
let odds  = evens.map(function(v){
    return (v + 1);
});
```

## Phép ghán destructuring

Tham khảo bải viết về [phép gán destructuring](/2017-10-26-es6-destructuring/)

## Template

Nếu bạn đã quen dùng PHP thì sẽ không lạ gì với các biểu thức dạng này:

```php
<php
$var1 = 'hello';
$var2 = "$var1 world"; // hello world
```

Giờ đây JS đã có tính năng tương tự

```javascript
var customer = { name: "hello" }
var message = `${customer.name} world`;
```

Trong các tính năng trên, const, let và fat arrow được sử dụng nhiều nhất.

<-- [Bài viết trước](/reactjs-setup-du-an-dung-webpack-nginx/)
 ...
Bài viết tiếp theo -->