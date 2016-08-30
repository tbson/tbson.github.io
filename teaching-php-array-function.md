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

**Ví dụ**

```php
<?php

print("============ NORMAL ARRAY EXAMPLE =============\n");
$listItem = [
	"Banana",
	"Pineapple",
	"Apple",
	"Jackfruit",
];
print("------------ASCENDING SORT------------\n");
sort($listItem);
print_r($listItem);
print("------------DESCENDING SORT------------\n");
rsort($listItem);
print_r($listItem);

print("============ ASSOCIATIVE ARRAY EXAMPLE =============\n");
$listItem = [
	"key2" => "Banana",
	"key3" => "Pineapple",
	"key1" => "Apple",
	"key4" => "Jackfruit",
];
print("------------ASCENDING SORT BY KEY------------\n");
ksort($listItem);
print_r($listItem);
print("------------DESSCENDING SORT BY KEY------------\n");
krsort($listItem);
print_r($listItem);
print("------------ASCENDING SORT BY VALUE------------\n");
asort($listItem);
print_r($listItem);
print("------------DESSCENDING SORT BY VALUE------------\n");
arsort($listItem);
print_r($listItem);

```

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

**Ví dụ**

```php
<?php

$sampleStr = "I love PHP very much!";
print("Original string: $sampleStr\n");
print("String length: ".strlen($sampleStr)."\n");
print("String word count: ".str_word_count($sampleStr)."\n");
print("Position of PHP: ".strpos($sampleStr, "PHP")."\n");
print("Replace PHP by Python: ".str_replace("PHP", "Python", $sampleStr)."\n");
print("String reverse: ".strrev($sampleStr)."\n");
```

### File

Đọc File
Ghi file
Upload file

Ví dụ về đọc/ghi file:

Tạo 1 file `sample.txt` với nội dung bên dưới và 1 file sample_new.txt rỗng:

```
key1: value 1
key2: value 2
key3: value 3
key4: value 4
key5: value 5
Extra 1: Data 1
Extra 1: Data 1
```

Đọc file:

```php
<?php

$fileName = "sample.txt";
$myFile = fopen($fileName, "r") or die("Unable to open file!");
print("---------------READING WHOLE FILE------------------\n");
print(fread($myFile, filesize($fileName)));
fclose($myFile);

$myFile = fopen($fileName, "r") or die("Unable to open file!");
print("---------------READING FILE LINE BY LINE------------------\n");
while(!feof($myFile)){
	$lineData = fgets($myFile);
	print($lineData);
}
fclose($myFile);
```

Ghi file:

```php
<?php

$oldFile = "sample.txt";
$newFile = "sample_new.txt";
$myFile = fopen($newFile, "a") or die("Unable to open file.");
$newContent = "Extra 1: Data 1\n";
fwrite($myFile, $newContent);
fwrite($myFile, $newContent);
fclose($myFile);
```

Tham khảo thêm các option tại: http://www.w3schools.com/php/php_file_open.asp

### Hàm (function)

PHP có rất nhiều function có sẵn (hơn 1.000 functions) rất hữu dụng, ví dụ như `var_dump`, `print`…

Ngoài những function này, chúng ta có thể dựa vào nhu cầu cụ thể để định nghĩa ra các function cho riêng mình.

* Function là một khối các câu lệnh có thể sử dụng lại tại nhiều nơi trong chương trình.
* Function sẽ không chạy ngay khi được khai báo.
* Function chỉ chạy khi được gọi.

**Các loại hàm cần quan tâm:**

**Function chỉ là 1 khối lệnh thông thường, không tham số**

```php
<?php

function sayHello(){
	print("Hello world\n");
}

sayHello();
```

**Function có tham số**

```php
<?php
function threeWishesFromGenie($firstWish, $secondWish, $thirdWish){
	print("Your wishes are: \"".$firstWish.", ".$secondWish.", ".$thirdWish."\"\n");
}
threeWishesFromGenie("Rich", "Handsome", "Smart");
```

**Function có tham số mặc định**

```php
<?php
function threeWishesFromGenie($firstWish, $secondWish, $defaultWish="Smart"){
	print("Your wishes are: \"".$firstWish.", ".$secondWish.", ".$defaultWish."\"\n");
}
threeWishesFromGenie("Rich", "Handsome");
```

**Function có giá trị trả về**

```php
<?php
function sayHello($name){
	$result = "Hello ".$name."\n";
	return $result;
}

print(sayHello("PHP"));
```

**Bài tập**

Sửa, xoá một dòng trong mảng 2 chiều

**Vấn đề:** Có 1 danh bạ điện thoại gồm 1 danh sách các contact có cấu trúc: tên liên lạc, số đt, email
Hãy viết 1 hàm để sửa và 1 hàm để xoá 1 contact dựa trên số điện thoại.
