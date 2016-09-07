---
layout: post
title: Sử dụng web fingerprint trong vấn đề security của SPA.
subtitle: Định danh người dùng luôn là vấn đề security cơ bản của các app dạng SPA (Single Page Application) do nguyên tắc Staless của cơ chế client-API.
bigimg: /img/posts/2016-09-08/banner.jpg
share-img: /img/posts/2016-09-08/banner.jpg
---

**Phương pháp authenticate phổ biến của các SPA (Single Page Application) là trao đổi token.**

SPA được hiểu như phần client (Front-End) được viết hoàn toàn bằng JavaScript, nằm trong các file tĩnh, tương tác với server thông qua các web API.

Do tính độc lập gần như tuyệt đối với server như vậy nên tầng client của SPA không thể sử dụng Session để định danh và lưu các thông tin cơ bản của người dùng nên cần 1 cơ chế khác để server biết request hiện tại là của người dùng nào nhằm xử lý cho phù hợp.

Token ra đời từ nhu cầu này.

**Nguyên tắc hoạt động của token rất đơn giản gồm các bước sau:**

1. User nhập thông tin login ở client, gửi lên server, nếu thành công (khớp username/password) sẽ nhận được vài thông tin cơ bản của người dùng cộng với 1 chuỗi ngẫu nhiên gọi là token. Token này được lưu trong DB gắn liên với user, có thể đại diện user cho những request sau mà không cần nhập lại username/password.
2. User lưu token này lại ở client (lưu ở local storage) để dùng đại diện cho tài khoản hiện tại mà không cần phải nhập lại username/password cho các request sau.
3. User tiến vào các vùng dành cho người dùng đã authenticate bằng cách gửi kèm token trong mỗi request.
4. Server nhận được request có đính kèm token sẽ bóc tách token ra, kiểm tra xem token này có tồn tại hay không. Nếu có tồn tại thì còn hạn sử dụng hay không. Nếu còn hạn sử dụng thì trả về dữ liệu mà người dùng yêu cầu. Nếu không thì trả về mã 401 (Unauthorized) để client tiến hành redirect người dùng về trang login để đăng nhập và làm mới token.

**Quy trình trên có 2 nhược điểm:**

1. Luôn phải đính kèm token trong mỗi request -> Nguy cơ bị đánh cắp token bằng phương pháp Man In the Middle.
2. Phải lưu lại token ở client nếu không muốn cứ mỗi request phải nhập lại username password -> Nguy cơ bị đánh cắp token nếu 1 dịch vụ khác biết được key chứa token trong local storage của người dùng (rất đơn giản, chỉ thử login sau đó kiểm tra các key trong local storage bằng các Dev Tool của các trình duyệt).

**Để khắc phục 2 nhược điểm trên ta có 2 giải pháp.**

**Giải pháp cho vấn đề bảo mật khi truyền tải token qua Internet:**

Dùng HTTPS. Rất đơn giản, HTTPS sẽ đảm bảo mã hoá dữ liệu khi truyền tải.

Nếu 1 website sử dụng HTTPS thì khi có 1 ai đó đứng giữa bắt được request thì cũng gần như không thể giải mã được thông tin trong request đó trừ khi hacker biết được một lỗ hổng bảo mật mới nào đó trong thư viện SSL.

**Giải pháp cho vấn đề lưu trữ token:**

Gửi thêm 1 thông tin định danh trình duyệt đang sử dụng. Thông tin này phải được tạo ra trong quá trình gửi request hoặc lưu trong 1 biến của JS (tạm thời) chứ không lưu xuống local storage (có thể bị lấy trộm).

Và bắt đầu từ đây, vai trò của web fingerprint được xác định.

Web fingerprint là thông tin cá nhân của trình duyệt đang sử dụng được mã hoá thành 1 chuỗi.

**Các thông tin này cơ bản bao gồm:**

1. UserAgent
2. Language
3. Color Depth
4. Screen Resolution
5. Timezone
6. Has session storage or not
7. Has local storage or not
8. Has indexed DB
9. Has IE specific 'AddBehavior'
10. Has open DB
11. CPU class
12. Platform
13. DoNotTrack or not
14. Full list of installed fonts (maintaining their order, which increases the entropy), implemented with Flash.
15. A list of installed fonts, detected with JS/CSS (side-channel technique) - can detect up to 500 installed fonts without flash
16. Canvas fingerprinting
17. WebGL fingerprinting
18. Plugins (IE included)
19. Is AdBlock installed or not
20. Has the user tampered with its languages 1
21. Has the user tampered with its screen resolution 1
22. Has the user tampered with its OS 1
23. Has the user tampered with its browser
24. Touch screen detection and capabilities
25. Pixel Ratio

Các request gửi tới server ngoài việc đính kèm token thì sẽ phải đính kèm luôn fingerprint của trình duyệt hiện tại.

Khi server nhận được request khi login thì server sẽ cập nhật thông tin fingerprint trong tài khoản user và sau đó dùng 2 thông số là token + fingerprint để định danh user thay vì chỉ token thôi.

Ngoài ra chúng ta sẽ kết hợp check IP thành bộ 3: token + fingerprint + IP để định danh người dùng chính xác hơn.

Mặc dù các thông số trên rất có thể trùng nhau cho 1 số trường hợp nhưng ta đã hạn chế được rất nhiều rủi ro bị giả mạo request.

**Các trường hợp user phải đăng nhập lại:**

1. Khi user đã đăng nhập ở 1 máy mà có 1 người khác biết username/password của user này để vào máy khác đăng nhập.
2. Khi chuyển qua máy khác.
3. Khi chuyển qua mạng (IP) khác.
4. Khi hết hạn token. Thông thường token sẽ có tuổi thọ là 1 ngày tính từ lần truy cập cuối cùng. Mỗi request thành công thì token đó sẽ được gia hạn thêm 1 ngày.

Phương pháp này rất hữu dụng cho các web app có yêu cầu dạng như: **Chỉ cho user login vào máy A ở công ty, không thể truy cập ở nơi khác (ở điện thoại hoặc ngoài nơi công sở để đảm bảo dữ liệu ko bị show ra bên ngoài).**

Dưới đây là source sử dụng thư viện Fingerprint2 và Fetch để tạo function gọi request lên server có đính kèm fingerprint trong ES6.

Trước tiên là install các gói cần thiết:

```
npm install whatwg-fetch -S
npm install fingerprintjs2 -S
```

```javascript
import 'whatwg-fetch';
import Fingerprint2 from 'fingerprintjs2';

let fingerprint = null;

export default class Tools {
	...
	static getFingerprintFromLib(){
		return new Promise(function(resolve, reject){
			new Fingerprint2().get((newFingerprint) => {
				fingerprint = newFingerprint;
				resolve(newFingerprint);
			});
		});
	}
	static checkFingerprint(inner, ...args){
		return new Promise((resolve, reject) => {
			if(!fingerprint){
				this.getFingerprintFromLib().then((newFingerprint) => {
					return inner(resolve, ...Array.prototype.slice.call(arguments).slice(1));
				});
			}else{
				return inner(resolve, ...Array.prototype.slice.call(arguments).slice(1));
			}
		});
	}
	static apiPost(apiUrl, params){
		try{
			return this.checkFingerprint((resolve, ...args) => {
				// Fetch here
				fetch(apiUrl.url, {
					method: apiUrl.method,
					body: JSON.stringify(params),
					headers: {
						"Content-Type": "application/json",
						"fingerprint": fingerprint
					},
					credentials: "same-origin"
				}).then(function(response) {
					response.text().then(function(responseText) {
						resolve(JSON.parse(responseText));
					});
				}, function(error) {
					resolve(error);
				});
			}, arguments);
		}catch(error){
			console.error(error);
		}
	}
	...
}
```

Hàm gọi ở đây hơi phức tạp vì thư viện Fingerprint2 trả về kết quả Async (callback) nên chúng ta cần:

1. Chuyển hàm lấy fingerprint về dạng Promise thông thường thông qua hàm `getFingerprintFromLib`.
2. Kiểm tra fingerprint đã được dùng trước đây chưa, nếu có rồi thì gọi trực tiếp hàm fetch dữ liệu. Nếu chưa thì gọi hàm `getFingerprintFromLib` để lấy fingerprint trước.
3. Thêm logic của hàm fetch dữ liệu thành tham số đầu vào của hàm `checkFingerprint` và return hàm này trong hàm apiPost thì ta có được 1 hàm gọi API và trả về 1 Promise để sử dụng:

```javascript
import Tools from 'duong_dan_toi_file/Tools';

let apiUrl = {
	url: 'http://test.dev/api/v1/user/authenticate',
	method: 'GET'
}

let params = {
	email: 'abc@gmail.com',
	password: 'password'
}

Tools.apiPost(apiUrl, params).then(function(result){
	// Xử lý result tại đây
});
```

DONE