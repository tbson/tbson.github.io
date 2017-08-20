---
permalink: "/db-couchdb-cac-khai-niem-co-ban/"
layout: page
title: Các khái niệm cơ bản về CouchDB
---


## CouchDB là gì ?

* CouchDB là 1 sơ sở dữ liệu dạng NoSQL mã nguồn mở database lưu trữ dữ liệu dạng document/JSON.
* CouchDB được thiết kế nhắm tới tính dễ sử dụng và phục vụ cho môi trường web.

## Tại sao chúng ta lại cần CouchDB ?

* CouchDB có API dạng RESTFul giúp cho việc giao tiếp với cơ sở dữ liệu được đơn giản.
* Các RESTFul API rất trực quan và dễ thao tác.
* Dữ liệu được lưu dưới cấu trúc document rất mềm dẻo, chúng ta không cần phải lo lắng về cấu trúc dữ liệu.
* Map/reduce giúp việc lọc, tìm, tổng hợp dữ liệu dễ hơn bao giờ hết.
* Nhân bản / đồng bộ là sức mạnh đặc biệt của CouchDB mà hiếm database nào có.

## Mô hình dữ liệu

* Database là cấu trúc dữ liệu lớn nhất của CouchDB.
* Mỗi database là 1 danh sách các document độc lập.
* Document bao gồm dữ liệu người dùng thao tác lẫn thông tin về phiên bản của dữ liệu để tiện việc merge dữ liệu.
* CouchDB sử dụng cơ chế phiên bản hoá dữ liệu để tránh tình trạng khoá dữ liệu khi đang ghi.

## Các tính năng chính

### Lưu trữ dạng document

CouchDB là một NoSQL database dạng document. Document là một đơn vị dữ liệu (giống như 1 object của Javascript), mỗi field có một tên riêng không trùng nhau, chứa các loại dữ liệu như chữ, số, Boolean, danh sách... Không có bất kì giới hạn nào về dung lượng text hay số field trong 1 doucment.

CouchDB cung cấp 1 RESTFul API cho việc đọc và ghi (thêm, sửa, xoá) document.

Sau đây là 1 ví dụ về 1 document

```javascript
{
	"title": "Macbook",
	"price": 1500,
	"SKU": "abcd1234"
}
```

### Các thuộc tính ACID

Khi dữ liệu được ghi xuống ổ cứng thì nó sẽ không bị ghi đè. Bất kì thay đổi nào (thêm, sửa, xoá) đều theo chuẩn Atomic, có nghĩa là dữ liệu sẽ được lưu lại toàn diện hoặc không được lưu lại. Database không bao giờ thêm hay sửa một phần dữ liệu.

Hầu hết các cập nhật đều được serialized để đảm bảo tất cả người dùng có thể đọc document mà không bị chờ đợi hoặc gián đoạn.

### Khả năng nén (compaction)
Nén là 1 hành động giúp giải phóng dung lượng ổ cứng được sử dụng bằng cách xoá đi các dữ liệu không còn được sử dụng. Khi tiến hành nén dữ liệu ở 1 file thì 1 file mới với định dạng **.compaction** sẽ được tạo ra và dữ liệu sẽ được sao chép vào file mới này. Khi quá trình copy hoàn thành thì file cũ sẽ được xoá bỏ. Database vẫn online trong quá trình nén và các thao tác thay đổi / đọc dữ liệu vẫn diễn ra bình thường.

### Views
Dữ liệu trong CouchDB được lưu trữ trong các document. Bạn có thể tưởng tượng như 1 database là 1 table và 1 document là 1 row. Khi. Khi chúng ta muốn trình bày dữ liệu bằng nhiều góc nhìn khác nhau thì chúng ta cần 1 phương pháp để filter, tổ chức để hiển thị kết quả cuối cùng.

Để giải quyết vấn đề này, CouchDB sử dụng mô hình View. View là 1 phương pháp tổng hợp dữ liệu trong các document ở 1 database. Các View được build động và không ảnh hưởng đến dữ liệu đã ghi của các document nên chúng ta có thể có bao nhiêu View tuỳ ý tuỳ vào nhu cầu trình bày dữ liệu.

* **Prev:** [Các hướng dẫn về database](/database)
* **Next:** [cURL và CouchDB](/db-couchdb-doc-va-ghi-du-lieu)

