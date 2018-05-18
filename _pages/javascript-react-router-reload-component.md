---
permalink: "/javascript-react-router-reload-component/"
layout: page
title: React router reload component
subtitle: Giải quyết vấn đề load lại component khi di chuyển giữa các URL dùng chung component
share-img: /img/pages/javascript/react-router.jpeg
---


Trong quá trình sử dụng React Router, 1 vấn đề thường xảy ra là có nhiều Link sử dụng chung 1 component.

Ví dụ về 1 blog có route dạng này:

```javascript
<Route exact path="/danh-sach-bai-viet/:slug" component={ArticleList} />
```

Khi người dùng di chuyển giữa 2 URL như:

```
/danh-sach-bai-viet/tin-tuc
/danh-sach-bai-viet/thong-bao
```

Thì khi qua link `thong-bao`, api call ở `componentDidMount` sẽ không chạy.

Chúng ta không thể trực tiếp gọi API ở `componentDidUpdate` mà không có điều kiện ràng buộc gì, vì khi cập nhật state ở `componentDidUpdate`, event gọi `componentDidUpdate` sẽ được kích hoạt. Điều đó sẽ đẩy chúng ta bị rơi vào 1 vòng lặp vô tận.

Để giải quyết vấn đề này thì chúng ta chỉ cần so sánh URL mới và URL trước đó, nếu không khớp nhau thì gọi lại, điều đó sẽ ngăn chặn vòng lặp vô tận:

```javascript
static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.location.pathname !== prevState.pathname) {
        return {pathname: nextProps.location.pathname};
    }
    return null;
}

componentDidUpdate(prevProps: Props, prevState: State) {
    const {pathname} = this.props.location;
    if (prevProps.location.pathname != pathname) {
        // Get data again
    }
}
```
