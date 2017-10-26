---
layout: post
title: Sử dụng Destructuring trong ES6
subtitle: Những điều bạn cần biết về phép gán Destructuring trong ES6
bigimg: /img/posts/2017-10-26/es6-destructuring.jpg
share-img: /img/posts/2017-10-26/es6-destructuring.jpg
---


JavasScript ES6 có rất nhiều tính năng mới và thú vị so với tiền nhiệm của nó là ES5. Chúng ta hãy xem qua phép gán Destructuring trong ES6 và nó thực sự tiện lợi như thế nào

```javascript
[a,b] = [1, 2]
// a == 1
// b == 2

{a,b} = {a:3, b:4}
// a == 3
// b == 4
```

Phép ghán Destructuring trong ES6 giúp chúng ta dễ dàng liên kết các thuộc tính giống nhau, nó hoạt động cả đối với `array` lẫn `object`. Nó có thể kéo các thuộc tính của nhiều object khác nhau cùng lúc và có thể alias các thuộc tính.

Một object sẽ có giá trị mặc định là `undefined` nếu không có dữ liệu cung cấp cho object đó.

```javascript
[a, b, c] = [5, 6];
// c === undefined
```

Chúng ta có thể bỏ qua vài giá trị.

```javascript
let [a, , b] = [1, 2, 3];
console.log(a, b); // 1 3
```

Có thể nối các giá trị.

```javascript
[a, ...b] = [1, 2, 3];
// b == [2, 3]
```

Kéo ra 1 vài giá trị của object.

```javascript
let o = {p1: 'foo', p2: 'bar'};
let {p1, p2} = o;
// p1 == 'foo'
// p2 == 'bar'
```

Phép gán Destructuring có thể hoán đổi giá trị 2 biến mà không cần tạo biến trung gian.

```javascript
let a = 1, b = 2;
[b, a] = [a, b];

// a == 2
// b == 1
```

Code ngắn và rõ ràng là ưu điểm của phép gán Destructuring. Phép gán này giúp cho các lập trình viên không phải viết nhiều code nhưng code vẫn rõ ràng sạch đẹp nên sẽ tiết kiệm được thời gian và sức lực.

**Nguồn:** [https://hackernoon.com/what-you-should-know-about-assignment-destructuring-in-es6-d049c84ad95a](https://hackernoon.com/what-you-should-know-about-assignment-destructuring-in-es6-d049c84ad95a)
