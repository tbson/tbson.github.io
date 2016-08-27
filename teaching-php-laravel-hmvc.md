---
layout: page
title: Install Laravel 5.3 và config HMVC.
subtitle: HMVC (Hierarchical model–view–controller) giúp ứng dụng cấu trúc theo dạng module, thuận tiện cho việc quản lý code khi ứng dụng trỡ nên phức tạp và chia sẻ code trong nhóm.
share-img: /img/pages/teaching-php/laravel-hmvc/thumbnail.jpg
---

### Trong hướng dẫn này chúng ta sẽ hoàn thành 2 mục tiêu:

1. Cài đặt Laravel 5.3 bằng composser
2. Cấu hình Laravel để có thể chạy mô hình HMVC

## Bước 1: Cài đặt Laravel 5.3

**Cài đặt composer**

```
sudo apt-get update
sudo apt-get install curl php-cli git
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

Kiểm tra lại sau khi cài đặt:

```
composser
```

Nếu ra kết quả có dòng như:

```
...
Composer version 1.2.0 2016-07-19 01:28:52
...
```

Thì đạt yêu cầu

**Cài đặt Laravel**

```
composer global require "laravel/installer"
laravel new 9gag
```

