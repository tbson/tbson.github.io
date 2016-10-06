---
layout: post
title: Login user bằng facebook trên iOS Ionic app.
subtitle: Sử dụng mạng xã hội để đăng nhập ứng dụng di động là một yêu cầu thông thường của hầu hết các app nhưng cách config để dùng tính năng này không hoàn toàn đơn giản.
bigimg: /img/posts/2016-10-06/banner.jpg
share-img: /img/posts/2016-10-06/banner.jpg
---

Yêu cầu tối thiểu: Bạn phải có 1 Facebook App đã có app ID bằng cách đăng ký tài khoản developer của Facebook. Bài viết này không bao gồm việc hướng dẫn tạo Facebook App.

Sau khi tạo xong App thì active app bằng cách vào menu **App Review** và check vào nút có label **"Your app is currently live and available to the public"**

Sau đó vào menu **Facebook Login** và check vào nút **"Client OAuth Login"**

Xong 2 bước trên là App Facebook đã được sẵn sàng để sử dụng tính năng login từ app di động.

## Bước 1: Thêm platform là iOS vào app facebook và thực hiện theo các bước hướng dẫn trên facebook

Download SDK xong thì ngoài việc thêm 3 folder :**FBSDKCoreKit.Framework, FBSDKLoginKit.Framework, FBSDKShareKit.Framework** thì chúng ta phải thêm cả folder **Bolts.framework** để đảm bảo framework này là phiên bản mới nhất và tương ứng với 3 framework kia.

Làm theo các bước hướng dẫn của Facebook

File `.plist` sẽ nằm ở:

```
/duong_dan_den_app_folder/platforms/ios/ten_app/ten_app-Info.plist
```

File `AppDelegate.m` nằm ở:

```
/duong_dan_den_app_folder/platforms/ios/ten_app/Classes/AppDelegate.m
```

Tới đoạn update AppDelegate.m

Không copy full cả 3 đoạn như trong hướng dẫn vì sẽ bị trùng lặp `didFinishLaunchingWithOptions`

Chỉ copy full đoạn đầu và đoạn cuối, đoạn giữa chỉ copy dòng

```Objective-C
[[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
```

Vào trước đoạn:

```Objective-C
return [super application:application didFinishLaunchingWithOptions:launchOptions];
```

## Bước 2: Cài đặt các thư viện cần thiết cho Ionic

Cài đặt `ngCordova`:

```
bower install ngCordova
```

Sau đó đưa vào file index.html của ionic:

```html
<script src="lib/ngCordova/dist/ng-cordova.js"></script>
<script src="cordova.js"></script>
```

Inject `ngCordova` vào app chính:

```javascript
angular.module('myApp', ['ngCordova'])
```

Cài đặt `cordova-plugin-facebook4`:

```
cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="123456789" --variable APP_NAME="myApplication"
```

## Bước 3: Config Xcode

Mở chế độ ON cho Capabilities -> Keychain Sharing

[Keychain Sharing](/img/posts/2016-10-06/keychain-enable.jpg)

## Bước 4: Chạy thử:

```javascript
$scope.facebookLogin = function(){
    facebookConnectPlugin.login(["public_profile", "email"], function(result){
        var response = result.authResponse;
        var userID = response.userID;
        facebookConnectPlugin.api(userID+"/?fields=id,email", [],
            function onSuccess (result) {
                var email = result.email;
                console.log(email);
                Tools.goToState('tab.vendorLanding');
            }, function onError (error) {
                console.error(error);
            }
        );
    }, function(error){
        console.error(error);
    });
}
```

```html
<button ng-click="facebookLogin()"></button>
```

DONE