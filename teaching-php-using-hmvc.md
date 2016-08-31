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

$namespace = 'App\Modules\Landing\Controllers';

Route::group(['prefix' => ''], function(){
    $namespace = 'App\Modules\Landing\Controllers';
    Route::group(
        ['prefix' => '', 'module'=>'Landing', 'namespace' => $namespace],
        function() {
            Route::get('', [
                'as' => 'index',
                'uses' => 'LandingController@index'
            ]);
        }
    );
});
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
        ['id' => 1, 'title' => 'Item 1'],
        ['id' => 2, 'title' => 'Item 2'],
        ['id' => 3, 'title' => 'Item 3'],
        ['id' => 4, 'title' => 'Item 4'],
        ['id' => 5, 'title' => 'Item 5']
    ];
    return $result;
}
```

Sử dụng dữ liệu này trong controller `LandingController.php`:

```php
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

### Nhiệm vụ 3: Dùng link để di chuyển giữa các trang

### Nhiệm vụ 4: Sử dụng tham số từ URL
