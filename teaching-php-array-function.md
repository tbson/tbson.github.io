---
layout: page
title: PHP cơ bản bài 2.
subtitle: Array và function.
---

## Mảng và hàm

### Mảng (array)

Mảng là nơi lưu trữ nhiều giá trị trong 1 biến số.

Mảng có 2 loại là `array` và `associative array`.

- `Array` được lấy dữ liệu ra bằng index.
- `Associative array` được lấy dữ liệu bằng cả index lẫn key.

Chúng ta có thể dùng vòng lặp để tuần tự lấy các phần tử trong array ra.

Dùng hàm `count` để lấy độ dài của array.

Có thể dùng các hàm có sẵn của PHP để sắp xếp lại thứ tự của các phần tử trong mảng.

**Ví dụ:**

```php

<?php
$listItem = [
	"Item 1",
	"Item 2",
	"Item 3",
	"Item 4",
	"Item 5",
];
print("[+] Array length: ". count($listItem)."\n");
print("----------------LOOP GET VALUE ONLY-------------\n");
foreach($listItem as $item){
	print($item."\n");
}
print("----------------LOOP GET VALUE AND INDEX-------------\n");
foreach($listItem as $index => $item){
	print($index." => ".$item."\n");
}
print("----------------LOOP GET KEY AND VALUE ONLY-------------\n");
$listItem = [
	"key1" => "Item 1",
	"key2" => "Item 2",
	"key3" => "Item 3",
	"key4" => "Item 4",
	"key5" => "Item 5",
];
foreach($listItem as $key => $item){
	print($key." => ".$item."\n");
}

```

**Các hàm sắp xếp của PHP:**

* `sort` – Sắp xếp mảng tăng dần (Aray thường)
* `rsort` – Sắp xếp mảng giảm dần (Array thường)
* `assort` – Sắp xếp mảng tăng dần dựa vào giá trị (associative array)
* `ksort` – Sắp xếp mảng tăng dần dựa vào key (associative array)
* `arsort` – Sắp xếp mảng giảm dần dựa vào giá trị (associative array)
* `krsort` – Sắp xếp mảng giảm dần dựa vào key (associative array)

### Chuỗi (string)

Xử lý chuỗi là công việc rất phổ biến khi làm lập trình, do đó tuy String là kiểu dữ liệu cơ bản của PHP nhưng được sử dụng rộng rãi nhất và có nhiều tính năng đáng chú ý.

**Các tính năng được sử dụng phổ biến của string:**

* strlen() – Lấy độ dài của chuỗi
* str_word_count() – Đếm số từ trong string (ngăn cách bằng khoảng trống)
* strrev() – Đảo ngược thứ tự các ký tự trong chuỗi
* strpos() – Tìm vị trí (index) của ký tự/chuỗi ký tự trong chuỗi khác
* str_replace() – Thay thế ký tự/chuỗi ký tự

String được định nghĩa là chuỗi ký tự được bao bởi `"` hoặc `'`

Có 1 sự khác biệt cơ bản giữa chuỗi ký tự `"` và `'` là đối với chuỗi ký tự sử dụng `"`, PHP sẽ parse dữ liệu từ biến số hoặc thay thế các ký tự đặc biệt bắt đầu bằng `\`.

### File

Đọc File
	Cú pháp để đọc file
	Loop tất cả các dòng trong file
Ghi file
	Ghi file mới
	Ghi file đã tồn tại
Tham khảo thêm các option tại: http://www.w3schools.com/php/php_file_open.asp
Upload file


### Hàm (function)

PHP có rất nhiều function có sẵn (hơn 1.000 functions) rất hữu dụng, ví dụ như `var_dump`, `print`…

Ngoài những function này, chúng ta có thể dựa vào nhu cầu cụ thể để định nghĩa ra các function cho riêng mình.

Function là một khối các câu lệnh có thể sử dụng lại tại nhiều nơi trong chương trình.

Function sẽ không chạy ngay khi được khai báo.

Function chỉ chạy khi được gọi.

**Các loại hàm cần quan tâm:**

* Function chỉ là 1 khối lệnh thông thường, không tham số
* Function có tham số
* Function có tham số mặc định
* Function có giá trị trả về

**Bài tập**

Sửa, xoá một dòng trong mảng 2 chiều

**Vấn đề:** Có 1 danh bạ điện thoại gồm 1 danh sách các contact có cấu trúc: tên liên lạc, số đt, email
Hãy viết 1 hàm để sửa và 1 hàm để xoá 1 contact dựa trên số điện thoại.
