---
permalink: "/db-pouchdb-cac-khai-niem-co-ban/"
layout: page
title: Các khái niệm cơ bản về PouchDB
---


## PouchDB là gì ?
PouchDB là 1 phiên bản Javascript của [CouchDB](/db-couchdb-cac-khai-niem-co-ban). Mục tiêu của PouchDB là giả lập tiệm cận hoàn hảo CouchDB API khi chạy trên môi trường trình duyệt hoặc Node.js.

## Cài đặt PouchDB
### Download trực tiếp

[Download PouchDB](https://pouchdb.com/download.html) tại trang chủ

Sau đó đưa vào file `index.html`

```html
<script src="pouchdb-6.3.4.min.js"></script>
```

### Dùng bower

```bash
$ bower install pouchdb
```

Sau đó đưa vào file `index.html`

```html
<script src="bower_components/pouchdb/dist/pouchdb.min.js"></script>
```

### Dùng npm

```bash
$ npm install pouchdb
```

Sau đó đưa vào file `index.html`

```html
<script src="node_modules/pouchdb/dist/pouchdb.min.js"></script>
```

### Dùng jsdelivr CDN

Đưa vào file `index.html`

<script src="//cdn.jsdelivr.net/pouchdb/6.3.4/pouchdb.min.js"></script>

### Dùng Node.js

```bash
$ npm install pouchdb
```

Sau đó đưa vào file JS

```javascript
var PouchDB = require('pouchdb');
```

Hoặc

```javascript
import PouchDB from 'pouchdb';
```

* **Prev:** [Làm việc với database](/database)
* **Next:** [Làm việc với database](/db-pouchdb-lam-viec-voi-database)

