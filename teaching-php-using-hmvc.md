---
layout: page
title: Kết hợp sử dụng Route, Model, View, Controller trong mô hình HMVC.
subtitle: Do mỗi module đã có cấu trúc MVC và routing riêng nên việc phân chia công việc trỡ nên cực kì đơn giản.
share-img: /img/pages/teaching-php/using-hmvc/banner.png
---

## Trong bài này chúng ta sẽ tìm hiểu cách sử dụng module cho mục đích hiển thị trang chủ.

Tiếp tục bài viết trước: [Chạy Laravel 5.3 và config HMVC (Hierarchical model–view–controller)](/teaching-php-laravel-hmvc)

Chúng ta đã có được trang welcome khi vào địa chỉ: `http://9gag.dev` và trang hello category khi vào địa chỉ `http://9gag.dev/category`.

**Nhiệm vụ lần này là chúng ta là:**

1. Xây dựng module tên là `Landing` dùng cho các công việc liên quan đến trang chủ.
2. Hiển thị dữ liệu từ model ra trang chủ.
3. Dùng link để di chuyển từ  trang chủ qua trang category và ngược lại.
4. Sử dụng tham số từ URL.

### Nhiệm vụ 1: Xây dựng module `Landing`

Đầu tiên là tạo module Landing bằng cách copy module Category và đổi tất cả các chữ `Category` thành `Landing` và `category` thành `landing`.

Tạo model `Landing` bằng câu lệnh:

```bahs
cd /opt/nginx/9gag
./artisan make:model Landing && mv app/Landing.php app/Modules/Landing/Models/
```

`Landing.php` có nội dung:

```php
<?php

namespace App\Modules\Landing\Models;

use Illuminate\Database\Eloquent\Model;

class Landing extends Model
{
    //
}
```

`LandingController.php` có nội dung:

```php
<?php

namespace App\Modules\Landing\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class LandingController extends Controller{
    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct(){
        # parent::__construct();
    }
    public function index(Request $request){
        return view('Landing::index');
    }
}
```

`index.blade.php` có nội dung:

```html
<h1>Landing page</h1>
```

`routes.php` có nội dung:

```php
<?php

$prefix = "";  // URL prefix

$module = basename(__DIR__);
$namespace = "App\Modules\\{$module}\Controllers";

Route::group(
    ["prefix" => $prefix, "module" => $module , "namespace" => $namespace],
    function() use($module){
        Route::get('/', [
            # middle here
            "as" => "{$module}.index",
            "uses" => "{$module}Controller@index"
        ]);
    }
);
```

Ta có cấu trúc:

```
├── Category
│   ├── Controllers
│   │   └── CategoryController.php
│   ├── Models
│   ├── Views
│   │   └── index.blade.php
│   └── routes.php
├── Landing
│   ├── Controllers
│   │   └── LandingController.php
│   ├── Models
│   │   └── Landing.php
│   ├── Views
│   │   └── index.blade.php
│   └── routes.php
└── ServiceProvider.php
```

Kiểm tra trang chủ `http://9gag.dev` ta sẽ thấy kết quả `Landing page`.

### Nhiệm vụ 2: Hiển thị dữ liệu từ model

Tạo function cung cấp dữ liệu trong model `Landing.php`:

```php
<?php

public static function list(){
    $result = [
        ['id' => 1, 'title' => 'Category 1'],
        ['id' => 2, 'title' => 'Category 2'],
        ['id' => 3, 'title' => 'Category 3'],
        ['id' => 4, 'title' => 'Category 4'],
        ['id' => 5, 'title' => 'Category 5']
    ];
    return $result;
}
```

Sử dụng dữ liệu này trong controller `LandingController.php`:

```php
<?php

public function index(Request $request){
    $data = [];
    $data['listItem'] = Landing::list();
    return view('Landing::index', $data);
}
```

Và cuối cùng là hiển thị dữ liệu trong template `index.blade.php`:

```html
<div>
    <ol>
        @foreach($listItem as $item)
        <li>{{ $item['title'] }}</li>
        @endforeach
    </ol>
</div>
```

Kiểm tra trang chủ `http://9gag.dev` ta sẽ thấy danh sách được hiển thị.

### Nhiệm vụ 3: Dùng link để di chuyển giữa các trang

Sửa `routes.php` của module `Category` lại thành dạng:

```php
<?php

$prefix = "category";  // URL prefix

$module = basename(__DIR__);
$namespace = "App\Modules\\{$module}\Controllers";

Route::group(
    ["prefix" => $prefix, "module" => $module , "namespace" => $namespace],
    function() use($module){
        Route::get("/", [
            # middle here
            "as" => "{$module}.index",
            "uses" => "{$module}Controller@index"
        ]);
        Route::get("/{id}", [
            # middle here
            "as" => "{$module}.detail",
            "uses" => "{$module}Controller@detail"
        ]);
    }
);
```

Từ trang chủ thêm link để tới trang category và từ trang category thêm link để về trang chủ:

Thêm link cho trang `index.blade.php` của module `Landing`:

```html
<a href="{!! route('Category.index') !!}">
    Category page
</a>
```

Thêm link cho trang `index.blade.php` của module `Module`:

```html
<a href="{!! route('Landing.index') !!}">
    Home
</a>
```

### Nhiệm vụ 4: Sử dụng tham số từ URL
