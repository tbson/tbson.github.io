---
layout: post
title: Mã hoá khoá công khai cho người không chuyên
subtitle: Mã hoá khoá công khai (public-key cryptography) không thực sự phức tạp như bạn tưởng tượng.
bigimg: /img/posts/2016-08-01/banner.jpg
share-img: /img/posts/2016-08-01/lock.jpg
---

## Mã hoá đối xứng

Mã hoá khoá công khai dựa trên khái niệm mã hoá "bất đối xứng". Nhưng khoan đã, trước khi tìm hiểu vấn đề này ta cần hiểu mã hoá "đối xứng" hoạt động như thế nào.

Để hiểu mã hoá đối xứng hoạt động thế nào. Ta có thể hình dung rằng John có 1 cái hộp dùng 1 ổ khoá. Bình thường thì 1 ổ khoá sẽ có 1 chìa khoá để mở và khoá ổ khoá. Do đó, khi John muốn cất giữ 1 cái gì đó thì anh ta chỉ việc bỏ thứ đó vào hộp, khoá lại. Rõ ràng là chỉ có John hoặc 1 ai đó có cái chìa khoá giống hệt của anh ta mới có thể mở hộp ra.

Đó chính là mã hoá đối xứng: Bạn có 1 chìa khoá dùng để khoá (mã hoá) và mở khoá (giải mã) dữ liệu của bạn.

## Mã hoá bất đối xứng

Bây giờ, chúng ta hãy xem mã hoá khoá công khai (bất đối xứng) hoạt động như thế nào.

Hã tưởng tượng Anna cũng có 1 cái hộp nhưng cái hộp này có 1 ổ khoá rất đặc biệt.

![Mã khoá khoá công khai](/img/posts/2016-08-01/lock.jpg)

Ổ khoá này có tới 3 trạng thái là A(khoá), B(mở), C(khoá).

Và ổ khoá này có tới 2 chìa khoá. Một chìa chỉ có thể xoay theo chiều kim đồng hồ (từ A tới B tới C) và chìa còn lại chỉ có thể xoay theo chiều ngược kim đồng hồ (từ C tới B tới A).

Anna lấy chìa đầu tiên (xoay theo chiều kim đồng hồ) và giữ cho riêng mình. Chúng ta gọi chìa khoá đó là chìa khoá riêng (private-key) hay khoá bí mật (secret-key) vì chỉ có mỗi mình Anna có.

Chúng ta gọi chìa khoá còn lại (xoay ngược chiều kim đồng hồ) là khoá công khai vì cô ấy sẽ đánh ra hàng trăm bản để gửi cho bạn bè, cho gia đình, đặt chúng ở bàn làm việc, treo ở trước cửa... Nếu ai đó muốn bussiness card của cô, cô cũng sẽ cho anh ta 1 chìa luôn.

Vì vậy, Anna có chìa khoá có thể xoay theo chiều kim đồng hồ (ABC) và những người khác có chìa khoá xoay ngược chiều kim đồng hồ (BCA).

Chúng ta sẽ có vài điều thú vị từ những chiếc chìa khoá và ổ khoá này.

Đầu tiên, tưởng tượng rằng bạn có 1 tài liệu riêng tư cần gửi cho Anna. Bạn sẽ đặt tài liệu đó vào cái hộp, dùng chìa khoá công khai khoá lại theo chiều ngược chiều kim đồng hồ từ B tới A và chiếc hộp được khoá. Chỉ có duy nhất chiếc chìa khoá của Anna là có thể xoay theo chiều kim đồng hồ từ A đến B để mở.

Như vậy đấy, bất kì ai có chìa khoá công khai của Anna (rất dễ tìm thấy) đều có thể gửi tài liệu vào chiếc hộp của cô và có thể yên tâm rằng chỉ mình cô xem được tài liệu này.

### Chữ ký số

Một điều thú vị tiếp theo:

Giả sử Anna đưa 1 tài liệu vào chiếc hộp. Dùng khoá bí mật của cô khoá lại theo chiều kim đồng hồ đến vị trí C.

Tại sao cô ta lại làm như vậy? Vì bất kì ai có chìa khoá công khai của cô đều có thể mở được theo chiều ngược chiều kim đồng hồ (từ C đến B)! Nhưng khoan đã.

Một anh chàng nào đó đưa cho tôi 1 chiếc hộp và nói rằng chiếc hộp này được Anna gửi tới. Tôi không tin anh ta. Vì vậy, tôi lấy chiếc chìa khoá công khai của Anna trong mớ khoá công khai tôi đang lưu giữ từ nhiều nguồn và thử cắm vào ổ khoá, xoay ngược chiều kim đồng hồ, chiếc hộp mở ra! Và tôi biết rằng chiếc hộp được khoá bằng chiếc chìa khoá bí mật của Anna vì chỉ mình cô ta có chiếc chìa khoá đó.

Do đó tôi chắc chắn Anna đã bỏ tài liệu vào chiếc hộp đó. Chúng ta gọi đó là **"chữ ký số"**.


### Chìa khoá là những con số

Trong thế giới máy tính "chìa khoá" chỉ là các con số - một chuỗi số dài với nhiều chữ số. Bạn có thể lưu khoá bí mật của mình là 1 con số trong 1 file text hay 1 app đặc thù. Bạn có thể để khoá công khai của mình ở chữ ký của email hay trên website. Ở đây không cần tới chiếc hộp nữa. Bạn có thể khoá (mã hoá) và mở khoá (giải mã) file hay dữ liệu của mình bằng 1 chương trình và các chìa khoá của bạn.

Nếu ai đó, kể cả bạn mã hoá thông tin nào đó bằng khoá công khai của bạn thì chỉ có mỗi mình bạn có thể giải mã thông tin đó bằng khoá bí mật của mình.

Nếu bạn mã hoá thông tin nào đó bằng khoá bí mật của mình thì bất cứ ai muốn đọc đều phải giải mã thông tin đó bằng khoá công khai của bạn. Điều đó chứng minh là bạn đã mã hoá nó. Điều đó có ý nghĩa là bạn đã "ký điện tử" vào thông tin đó.
