---
permalink: "/teaching-php-variable-condition-loop-debug/"
layout: page
title: PHP cơ bản bài 1.
subtitle: Variable, loop, conditional statement và debug.
---

## Biến số, hằng số, kiểu dữ liệu, toán tử, nhập xuất

### Biến số (variable)

Biến (variable) trong PHP mặc định được bắt đầu bằng dấu `$`

Biến số có thể thay đổi giá trị trong quá trình chạy (runtime)

```php
<?php
$message = "hello world";
echo $message;
```

### Hằng số (constant)

Hằng số (constant) trong PHP được đinh nghĩa bằng từ khoá `define`:

Hằng số không thể thay đổi sau khi khai báo.

```php
<?php
define('LUCKY_NUMBERS', [4, 8, 15, 16, 23, 42]);
define('RANDOM_NUMBER', 5); # PHP 7 only
var_dump(LUCKY_NUMBERS);
var_dump(RANDOM_NUMBER);
```

### Kiểu dữ liệu (data type)

PHP có các kiểu dữ liệu cơ bản gồm:

* `String` -> Chuỗi
* `Integer` -> Số nguyên từ -2,147,483,648 đến 2,147,483,647
* `Float` -> Số thập phân
* `Boolean` -> True/False
* `Array` -> Mảng chứa phần tử là các kiểu dữ liệu còn lại
* `Object` -> Dạng đối tượng
* `NULL` -> Dạng rỗng

PHP sẽ tự động nhận dạng kiểu dữ liệu dựa vào giá trị được gán cho biến.

```php
<?php
$strVar = "hello";
$intVar = 365;
$floatVar = 3.14;
$boolVar = true;
$arrayVar = ["this", "is", "an", "array"];
$nullVar = null;
class Car {
    function Car() {
        $this->model = "VW";
    }
}
$objVar = new Car();
var_dump($strVar, $intVar, $floatVar, $boolVar, $arrayVar, $nullVar, $objVar);
```

### Toán tử (operator)

PHP hỗ trợ nhiều loại toán tử cho các mục đích khác nhau, các loại toán tử đó gồm:

* Toán tử số học:
* Toán tử gán
* Toán tử so sánh
* Toán tử tăng/giảm
* Toán tử logic
* Toán tử chuỗi
* Toán tử mảng
* Các loại toán tử này có thể tham khảo tại:

```
http://www.w3schools.com/php/php_operators.asp
```

Riêng trong bài học này chúng ta chỉ đề cập đến các toán tử dùng phổ biến:

* Cộng: `+`
* Trừ: `-`
* Nhân: `*`
* Chia: `/`
* Lấy phần dư: `%`
* Số mũ: `**`
* Gán: =
* So sánh bằng: `==`
* So sánh đồng nhất: `===`
* So sánh không bằng: `!=`
* So sánh không đồng nhất `!==`
* So sánh lớn hơn: `>`
* So sánh nhỏ hơn: `<`
* So sánh lớn hơn hoặc bằng: `>=`
* So sánh nhỏ hơn hoặc bằng: `<=`
* Tăng: `++`
* Giảm: `--`
* Và: `&&` (thường sử dụng trong câu lệnh điều kiện)
* Hoặc: `||` (thường sử dụng trong câu lệnh điều kiện)
* Nối chuỗi: .

Một trong những cặp toán tử dễ bị nhầm lẫn với nhau là toán tử so sánh bằng và toán tử so sánh đồng nhất: `==` và `===`

2 toán tử này khác nhau ở điểm:

So sánh bằng chỉ so sánh giá trị, so sánh đồng nhất thì so sánh cả giá trị lẫn kiểu dữ liệu, trong thực thế khuyến cáo nên dùng so sánh đồng nhất để tránh các lỗi liên quan đến kiểu dữ liệu.

```php
<?php
if("1" == 1)
   var_dump(true);
else
   var_dump(false);

if("1" === 1)
   var_dump(true);
else
   var_dump(false);
```

## Nhập xuất (I/O)

PHP được thiết kế để làm web application nên không quan trọng việc `I/O` trực tiếp (ví dụ như `CIN/COUT` của `C++`).

Thay vào đó PHP sẽ đọc input từ các request gửi tới địa chỉ tương ứng:

Các hàm xuất phổ biến gồm:

```
echo
print
print_r # In ra cấu trúc dữ liệu
var_dump # In ra giá trị và kiểu dữ liệu
```

Ví dụ:

```php
<?php
echo "hello\n";
echo("hello\n");
print("hello\n");
print_r("hello\n");
var_dump("hello");
```

Cách nhận dữ liệu phổ biến từ request:

Vào folder chứa file `url.php` và `form.html` để chạy build-in server:

```
php -nS localhost:8000
```

Tạo form gửi dữ liệu trong file `form.html`:

```html
<form action="url.php" method="GET">
    <input type="text" name="some_var"/>
    <button>Send data</button>
</form>
```

Tạo file nhận dữ liệu `url.php`:

```php
<?php

print_r($_GET["some_var"]);
```

Vào địa chỉ:

```
http://localhost:8000/form.php
```

Sau khi bấm nút "Send data" thì trình duyệt sẽ gửi tới địa chỉ bên dưới để nhận kết quả:

```
http://localhost:8000/url.php?some_var=hello
```

**Bài tập Làm 1 form để nhập tên người dùng, bấm gửi để hiển thị lời chào**

**Ví dụ:** Nhập "PHP" thì sau khi gửi dữ liệu sẽ hiện ra dòng: "Hello PHP! How are you?"

## Cấu trúc rẽ nhánh (Conditional statements)

### Câu lệnh if (if statement)

Cú pháp:

```
if(<điều kiện>){
	<nội dung cần thực thi>
}

if(<điều kiện>){
	<nội dung cần thực thi>
}else{
	<trường hợp khác>
}


if(<điều kiện>){
	<nội dung cần thực thi>
}else if(<điều kiện khác>){
	<nội dung cần thực thi>
}
```

Ví dụ:

```php
<?php
$delta = 1;
$message = "";
if($delta <  0){
    $message = "Vo nghiem";
}else if($delta === 0){
    $message = "Nghiem kep";
}else{
    $message = "2 nghiem";
}
print_r($message."\n");
```

### Câu lệnh if dạng rút gọn (if shorthand)

Câu lệnh `if` dạng rút gọn được sử dụng rất nhiều trong thực tế vì tính tiện dụng và ngắn ngọn của nó.

Ví dụ:

```
<?php
$canDrink = $age>=18?true:false;
```

### Câu lệnh switch (switch statement)

**Cú pháp:**

```
switch(<điều kiện>){
	case <điều kiện 1>:
		<nội dung cần thực thi 1>
	break;
	case <điều kiện 2>:
		<nội dung cần thực thi 2>
	break;
	default:
		<nội dung còn lại cần thực thi>
}
```

**Ví dụ**

```php
<?php

$step = 1;
switch($step){
	case 1:
		print_r('buoc 1');
	case 2:
		print_r('buoc 2');
	case 3:
		print_r('buoc 3');
	default:
		print_r('buoc 1');
}
```

### Bài tập

**Vấn đề:** Tạo một chương trình tính nghiệm của phương trình bậc 2

## Cấu trúc lặp (loop)

### Câu lệnh for

Câu lệnh for được sử dụng khi bạn biết chính xác số lần lặp

**Ví dụ**

```php
<?php

for($i=0; $i<=20; $i++){
	print_r($i*$i."\n");
}
```

### Câu lệnh foreach

Câu lệnh foreach được sử dụng cho các mảng để lấy thông tin tất cả các phần tử trong mảng

**Ví dụ**

```php
<?php
$listItem = [
	"key1" => "value 1",
	"key2" => "value 2",
	"key3" => "value 3",
	"key4" => "value 4",
	"key5" => "value 5",
];
print_r("---------------HASH ARRAY WITH KEY - VALUE ----------------\n");
foreach($listItem as $key => $value){
	print_r($key." => ".$value."\n");
}
$listItem = [
	"value 1",
	"value 2",
	"value 3",
	"value 4",
	"value 5",
];
print_r("---------------NORMAL ARRAY WITH KEY - VALUE----------------\n");
foreach($listItem as $key => $value){
	print_r($key." => ".$value."\n");
}
print_r("---------------NORMAL ARRAY WITH VALUE ONLY----------------\n");
foreach($listItem as $value){
	print_r($value."\n");
}
```

### Câu lệnh while/do…while

Câu lệnh while được dung để chạy cho đến khi điều kiện có giá trị là false.

**Ví dụ**

```php
<?php

while(true){
	sleep(1);
	print(date("h:i:s")."\n");
}
```

while và do…while chỉ khác nhau ở: while: block code chạy sau khi kiểm tra điều kiện, do…while chạy block code trước khi kiểm tra điều kiện, do đó câu lệnh do…while luôn chạy ít nhất 1 lần cho dù điều kiện có đúng hay không.

## Gỡ lỗi (debug)

Trong lập trình có 2 loại lỗi chính là lỗi cú pháp và lỗi logic.

Lỗi cú pháp thường được show ran gay khi trình phiên dịch bắt gặp lỗi, đây là loại lỗi dễ sửa và nó rất rõ rang.

Đối với lỗi logic thì mặc dù code chạy ổn nhưng ra kết quả không như mình mong muốn.

Xử lý loại lỗi này nhanh hay chậm phụ thuộc rất nhiều vào kinh nghiệm của lập trình viên.

Cách phổ biến nhất là bắt lỗi bằng câu lệnh try…catch

```
try{
	<Logic cần chạy>
}catch(Error $e){
	<xử lý khi gặp lỗi>
}
```

Câu lệnh try…catch được sử dụng để xử lý cả các lỗi đoán được và không doán được trong quá trình code chạy.

**Ví dụ**

```php
<?php

$listItem = [1, 2, 3, 4];
try{
	$listItem->someMethod(); # array $listItem không có hàm someMethod nên gây ra lỗi
}catch(Error $e){
	print("Catch error.\n");
}

```

Ngoài ra chúng ta có thể dùng các câu lệnh như var_dump(…);die; hoặc print_r(…);die để in ra giá trị/cấu trúc của các đối tượng trong quá trình code chạy để kiểm tra xem giá trị đúng chưa hoặc chương trình bị ngắt tại điểm nào. Khi PHP bắt gặp câu lệnh die ở bất kì nơi nào trong code thì sẽ dừng lại tại đó và chúng ta có thể cô lập được lỗi mà xử lý.

### Bài tập

**Thuật toán tìm giá trị lớn nhất/nhỏ nhất trong mảng**

**Vấn đề:** Có 1 bảng điểm của các sinh viên có cấu trúc tên sinh viên, điểm tin học
Hãy tìm ra sinh viên có điểm cao nhất để khen thưởng và sinh viên có điểm thấp nhất (với điều kiện số điểm này nhỏ hơn 5 để nhắc nhở).

**Bài liên quan:**

- [Array - Function](/teaching-php-array-function)


