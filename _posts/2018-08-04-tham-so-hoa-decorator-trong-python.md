---
layout: post
title: Tham số hoá decorator trong Python
subtitle: Tham số hoá decorator trong Python
bigimg: /img/posts/2018-08-04/python-decorators.jpg
share-img: /img/posts/2018-08-04/python-decorators.jpg
---


`Decorator` trong Python là một công cụ mạnh mẽ. Nó giúp chúng ta tuỳ chỉnh logic của 1 function trong quá trình chạy.

Tuy nhiên, tự viết ra `decorator` để dùng sẽ không hề đơn giản cho người mới bắt đầu. Điều này đặc biệt đúng với những ai chưa quen với khái niệm `First-class functions` hoặc `functional programming`.

Về định nghĩa, `decorator` là 1 function nhận tham số là 1 function khác, giá trị trả về có thể là input function hoặc bất kì thứ gì khác.

Để minh hoạ cho khái niệm này, sau đây là ví dụ về 1 decorator biến đổi tham số của 1 function thành chữ in hoa:


```python
def upperParams(func):
    def inner(*args, **kwargs):
        args = [arg.upper() for arg in args]
        return func(*args, **kwargs)
    return inner

@upperParams
def greeting(name):
    print('hello {}'.format(name))


greeting('world')
# kết quả: hello WORLD
```

Giải thích cho ví dụ trên:

```python
@upperParams
def greeting(name):
    print('hello {}'.format(name))
```

Hoàn toàn tương đương với:

```python
def greeting(name):
    print('hello {}'.format(name))
greeting = upperParams(greeting)
```

Như các diễn giải này:

`upperParams` là 1 function nhận input là 1 function, trong trường hợp này là `greeting` function.
Nó trả về hàm `inner` nhận bất kì tham số tuần tự hoặc tham số keyword nào.
Do đó, tham số được truyền vào sau cùng khi chạy `greeting('world')` chính xác được truyền vào `inner` function.
`inner` function convert tất cả tham số tuần tự thành chữ in hoa và đưa hết vào input function rồi return function này.
kết quả trả về là chuỗi `hello WORLD` như ta thấy.

Vậy có những trường hợp ta không cần upper thì sao? Có 2 cách:
- Viết 2 decorator
- Tham số hoá decorator để đặt điều kiện khi nào cần upper, khi nào không.

Ta có thể sửa decorator trên thành:

```python
def upperParamsCondition(upper=True):
    def deco(func):
        def inner(*args, **kwargs):
            if upper is True:
                args = [arg.upper() for arg in args]
            return func(*args, **kwargs)
        return inner
    return deco
```

Chạy thử:

```python
@upperParamsCondition()
def greeting2(name):
    greeting(name)
# kết quả: hello WORLD

@upperParamsCondition(False)
def greeting3(name):
    greeting(name)
# kết quả: hello world
```

Cắt nghĩa khi không dùng synstatic sugar:


```python
@upperParamsCondition(False)
def greeting2(name):
    greeting(name)
```

Tương đương với:

```python
def greeting2(name):
    print('hello {}'.format(name))
greeting = upperParamsCondition(False)(greeting2)
```

`upperParamsCondition` thực chất là 1 decorator factory. Nó trả về 1 decorator (trong trường hợp này là `deco` function) để nhận input function sau khi nhận input của riêng nó.
`inner` function sau đó có thể sử dụng tham số `upper` được pass vào trước đó để quyết định xem có convert in hoa hay không.

Đó là sự khác nhau cơ bản của decorator thường và decorator được tham số hoá.

Decorator thường sẽ nhận input function để xử lý.
Decorator được tham số hoá sẽ nhận tham số của riêng nó, trả về 1 decorator, decorator này mới thực sự nhận input function để xử lý.

DONE
