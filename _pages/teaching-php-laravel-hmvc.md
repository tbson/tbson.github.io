---
permalink: "/teaching-php-laravel-hmvc/"
layout: page
title: Install Laravel 5.3 và config HMVC.
subtitle: HMVC (Hierarchical model–view–controller) giúp ứng dụng cấu trúc theo dạng module, thuận tiện cho việc quản lý code khi ứng dụng trỡ nên phức tạp và chia sẻ code trong nhóm.
share-img: /img/pages/teaching-php/laravel-hmvc/thumbnail.jpg
---

### Trong hướng dẫn này chúng ta sẽ hoàn thành 2 mục tiêu:

1. Cài đặt Laravel 5.3 bằng composser
2. Cấu hình Laravel để có thể chạy mô hình HMVC

## Bước 1: Cài đặt Laravel 5.3

### Bước 1.1: Cài đặt composer

```
sudo apt-get update
sudo apt-get install curl php-cli git
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

Kiểm tra lại sau khi cài đặt:

```
composer
```

Nếu ra kết quả có dòng như:

```
...
Composer version 1.2.0 2016-07-19 01:28:52
...
```

Thì đạt yêu cầu

### Bước 1.2: Tạo database mới cho dự án

```
sudo -i -u postgres
createdb -O username 9gag
```

`username` ở đây là tài khoản được tạo khi config server ban đầu tại bài: [Cài đặt Ubuntu 16.04 server](/teaching-php-server-config/)

### Bước 1.3: Cài đặt Laravel

```
composer global require "laravel/installer"
cd /opt/nginx/
laravel new 9gag
cd 9gag
chmod +x artisan
sudo chmod -R 777 /opt/nginx/9gag/storage
sudo chmod -R 777 /opt/nginx/9gag/bootstrap/cache
```

Vì lý do bí ẩn nào đó mà bạn gặp lỗi **laravel: command not found** thì thực hiện thêm các bước sau:

```
vim ~/.profile
```

Thêm nội dung:

```
export PATH=$PATH:~/.composer/vendor/bin/
```

Sau dó chạy lệnh:

```
source ~/.profile
```

Và thử lại lệnh `laravel`

### Bước 1.4: Sửa file `.env`

Thay đổi các thông số sau:

```
APP_URL=http://9gag.dev

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=9gag
DB_USERNAME=username
DB_PASSWORD=password
```

### Bước 1.5: Init database

```
./artisan migrate
```

### Bước 1.6: Set domain cho dự án mới

```
sudo vim /etc/hosts
```

Nếu dùng máy ảo thì thêm dòng:

```
192.168.1.45        9gag.dev # 192.168.1.45 là IP của máy ảo
```

Nếu dùng máy thật:

```
127.0.0.1        9gag.dev
```

### Bước 1.7: Cấu hình Nginx cho dự án mới

```
sudo vim /etc/nginx/sites-enabled/default
```

Thêm nội dung:

```
server {
    listen   80;
    server_name 9gag.dev;

    root /opt/nginx/9gag/public;
    index index.php index.html;
    client_max_body_size 5M;
    fastcgi_read_timeout 300;
    expires off;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_intercept_errors on;
        include fastcgi_params;
    }

    location /public {
        # Static files
        try_files $uri $uri/ /index.html;
        rewrite ^/public(/.*)$ $1 break;
        add_header Access-Control-Allow-Origin *;
    }
}
```

Sau đó restart lại Nginx

```
service nginx restart
```

Test thử bằng cách vào địa chỉ: ```http://9gag.dev```

## Bước 2: Config HMVC

Laravel mặc định sử dụng mô hình MVC, mô hình này rất phù hợp cho làm prototype hay các dự án nhỏ. Khi dự án phình ra hoặc có sự tham gia của nhiều người thì mô hình này sẽ bộc lộ một vài hạn chế.

Tất cả Model nằm trong `app`, tất cả View nằm trong `resources/views` và tất cả Controller nằm trong `app/Http/Controllers`. Khi dự án phình to ra thì các folder này cũng sẽ to ra tương ứng và khi cần chỉnh sửa 1 chức năng nào đó rất có thể chúng ta sẽ phải di chuyển trên 3 tập folder này.

Mô hình HMVC sinh ra để giải quyết vấn đề đó. HMVC có nghĩa là `Hierarchical model–view–controller`. Một đơn vị của HMVC là module, module này bao gồm 1 cấu trúc MVC và các route tương ứng để làm 1 tập các tính năng cụ thể.

Ví dụ module `User` sẽ làm tất cả các việc như list/hêm/sửa/xoá/login/logout... và quản lý luôn các URL (route) liên quan đến các chức năng này. Khi cần chỉnh sửa 1 tính năng nào đó thuộc về `User` thì ta chỉ quan tâm đến chính module (folder) `User`. Điều này sẽ tránh mất thời gian tìm kiếm file model/view/controller tương ứng và tránh nhầm lẫn.

Dự án lớn ra thì sẽ thêm các module tương ứng. Mỗi thành viên trong nhóm code sẽ quản lý 1 hay 1 vài module độc lập với nhau sẽ tránh tình trang conflict code.

### Bước 2.1: Khai báo địa chỉ / cấu hình module

Folder chứa các module đặt tại `app/Modules` tức là ngay trong thư mục `app` của project: `/opt/nginx/9gag/app/Modules`.

Sau khi tạo folder xong chúng ta sẽ khao báo folder này trong mục `autoload/psr-4` ở file `composer.json`

```json
"autoload": {
    "classmap": [
        "database"
    ],
    "psr-4": {
        "App\\": "app/",
        "Modules\\": "app/Modules/"
    }
},
```

Trong folder `app/Modules`, chúng ta sẽ tạo 1 service provider trong file `ServiceProvider.php`.

`app/Modules/ServiceProvider.php` sẽ có nội dung:

```php
<?php

namespace App\Modules;
use File;


class ServiceProvider extends \Illuminate\Support\ServiceProvider{
    public function boot(){
        $listModule = array_map('basename', File::directories(__DIR__));
        foreach ($listModule as $module) {
            if(file_exists(__DIR__.'/'.$module.'/routes.php')) {
                include __DIR__.'/'.$module.'/routes.php';
            }
            if(is_dir(__DIR__.'/'.$module.'/Views')) {
                $this->loadViewsFrom(__DIR__.'/'.$module.'/Views', $module);
            }
        }
    }
    public function register(){}
}
```

Khai báo service provider này trong `config/app.php` tại mục `providers`:

```php
'providers' => [
    ...
    /*
     * Custom Service Providers...
     */
    'App\Modules\ServiceProvider',
]
```

### Bước 2.2: Tiến hành tạo các module

Tạo một module tên là `Category` thì chúng ta cần có cấu trúc sau:

```
app/
└── Modules
    ├── Category
    │   ├── Controllers
    │   │   └── CategoryController.php
    │   ├── Models
    │   │   └── Category.php
    │   ├── Views
    │   │   └── index.blade.php
    │   └── routes.php
    └── ServiceProvider.php
```

### Bước 2.3: Test thử tính năng

File `CategoryController.php` có nội dung:

```php
<?php
namespace App\Modules\Category\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class CategoryController extends Controller{
    public function __construct(){
        # parent::__construct();
    }
    public function index(Request $request){
        return view('Category::index');
    }
}
```

File `index.blade.php` có nội dung:

```html
<h1>Hello module</h1>
```

File `routes.php` có nội dung:

```php
<?php
$namespace = 'App\Modules\Category\Controllers';
Route::group(
    ['module'=>'Category', 'namespace' => $namespace],
    function() {
        Route::get('category', [
            # middle here
            'as' => 'index',
            'uses' => 'CategoryController@index'
        ]);
    }
);
```

Cuối cùng là chạy thử trên trình duyệt:

```
http://9gag.dev/category
```

DONE

<hr/>

**Bài viết liên quan**

1. [Cài môi trường phát triển trên Ubuntu server 16.04](/teaching-php-server-config)
2. [Kết hợp sử dụng Route, Model, View, Controller trong mô hình HMVC](/teaching-php-using-hmvc)

<br/>