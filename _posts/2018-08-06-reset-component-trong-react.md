---
layout: post
title: Reset component trong react
subtitle: Quản lý state chưa bao giờ là vấn đề đơn giản nhưng React đã cung cấp nhiều công cụ hữu ích để xử lý vấn đề này.
bigimg: /img/posts/2018-08-06/react.jpg
share-img: /img/posts/2018-08-06/react.jpg
---


Trong các dự án thực tế, việc reset 1 component đặc biệt là 1 form là công việc thường xuyên phải làm.

Phương pháp đơn giản nhất là unmount 1 component (`return null`) sau đó mount lại.

Nhưng có nhiều trường hợp mount lại gần như bất khả thi khi sử dụng react router.

React router sẽ tái sử dụng component một khi nó được mount, cho dù ở 2 route khác nhau.

Ví dụ như chúng ta có 2 route cho trang sửa sản phẩm và sửa sản phẩm liên quan:
- `/product/:id`
- `/related-product/:relatedID/:id`

Từ trang sửa sản phẩm, người dùng có thể click vào 1 sản phẩm liên quan để xem chi tiết hoặc chỉnh sửa.
Cả 2 URL này dùng chung một component là `Product`

Thông thường, việc fetch dữ liệu sẽ xảy ra trong `componentDidMount` lifecycle method.

Rắc rối sẽ xảy ra khi di chuyển từ trang sản phẩm A qua trang sản phẩm B.

Form chứa thông tin đáng lý ra của sản phẩm B sẽ hiện thông tin của sản phẩm A trước đó do Product component được tái sử dụng chứ không được huỷ rồi mount lại do đó hàm `componentDidMount` sẽ không được gọi.

Để giải quyết vấn đề này, React cung cấp 1 tính năng mà ít ai để ý tới, đó là `key` property.

`key` property là 1 property bắt buộc khi render 1 danh sách component dùng vòng lặp.

`key` they đổi thì component sẽ được render lại, đó là tất cả những gì chúng ta cần.

Thay vì định nghĩa route như thông thường:

```
<Route path="/product/:id" component={Product} />
<Route path="/related-product/:relatedID/:id" component={Product} />
```

Ta sẽ dùng `render` thay cho `component`

```
<Route 
    path="/product/:id"
    render={props => <Product {...props} key={props.match.params.id}/>}
/>
<Route
    path="/related-product/:relatedID/:id"
    render={props => <Product {...props} key={props.match.params.id}/>}
/>
```

Mỗi khi người dùng chuyển từ sản phẩm A qua sản phẩm B, `id` sẽ thay đổi và component sẽ được render lại từ đầu, `componentDidMount` sẽ hoạt động lại bình thường.

DONE
