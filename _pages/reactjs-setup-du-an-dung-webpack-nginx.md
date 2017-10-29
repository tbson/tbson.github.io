---
permalink: "/reactjs-setup-du-an-dung-webpack-nginx/"
layout: page
title: Setup dự án dùng Webpack và Nginx
subtitle: Thiết lập nền móng cho dự án SPA hỗ trợ cả admin và user cùng 1 code base, dùng custom domain
---

Thiết lập dự án là những viên gạch đầu tiên cho toà nhà dự án của mỗi lập trình viên.

Có người thích tự làm từ đầu, có người thích dùng các starter kit, generator... gọi chung là các công cụ `scaffolding`.

Mỗi loại có ưu và nhược điểm riêng, tuỳ thuộc vào nhu cầu của dự án mà chúng ta có thể sử dụng công cụ / phương pháp nào cho phù hợp.

Loạt bài viết này mình muốn truyền tải các kiến thức nền tảng của React và xây tự xây dựng môi trường phát triển của React ví dụ như `webpack`, `babel`... Đây là các công cụ được dùng trong hầu hết các công cụ `scaffolding`. Bạn cần hiểu các khái niệm nền tảng để khi dùng các công cụ này, có vấn đề phát sinh thì bạn có thể tự tin giải quyết.

Trong loạt bài viết này, mình sẽ chỉ chú trọng vào việc xây dựng ứng dụng SPA cho tầng quản lý, ví dụ như admin/user panel nên sẽ không đặt nặng vấn đề layout đẹp.

Để bắt đầu 1 dự án, bạn cần có 1 môi trường phát triển, mình quen dùng Mac/Linux nên sẽ chỉ đề cập đến các môi trường này.

**Yêu cầu tối thiểu:**

- git
- node / npm / nvm / yarn

Bạn có thể tìm tài liệu cài đặt của các công cụ này trên trang chủ của chúng.

Mỗi bài viết trong loạt bài này đều có link source code trên github, bạn có thể clone về và chạy ngay.

Bạn có thể làm lần đầu thông qua các bước sau:

```bash
git clone https://github.com/tbson/react-spa.git
yarn
git checkout son/setup-du-an-dung-webpack-nginx
yarn start
```

Đối với các lần sau bạn chỉ cần checkout branch tương ứng

```bash
git checkout son/setup-du-an-dung-webpack-nginx
yarn start
```

Trong loạt bài này mình giả dịnh thư mục chứa các project là `~/Code/`

Sau đây là các bước để thiết lập dự án:

## Khởi tạo dự án dùng `npm` / `yarn`

```
cd ~/Code/
mkdir reactspa && mkdir reactspa/client
cd ~/Code/reactspa/client
yarn init
```

Trả lời hết các câu hỏi được đặt ra và trong thư mục `~/Code/reactspa/client` sẽ có 1 file `package.json` với nội dung như sau:

```
{
	"name": "tmp_client",
	"version": "1.0.0",
	"main": "index.js",
	"license": "MIT"
}
```

## Cài các gói cần thiết cho dự án / môi trường dev

**Cài các thư viện liên quan đến React**
```
yarn add react react-dom jquery antd
```

**Cài các thư viện liên quan đến môi trường dev React**
```
yarn add -D babel-cli babel-loader babel-plugin-import babel-plugin-syntax-dynamic-import babel-plugin-transform-decorators-legacy babel-plugin-transform-runtime babel-preset-env babel-preset-react babel-preset-react-hmre css-loader file-loader less less-loader node-sass sass-loader style-loader stylus stylus-loader webpack webpack-dev-server webpack-merge
```

**Tạo mục `scripts` trong `package.json`**
```
"scripts": {
    "start": "webpack-dev-server --watch-poll --inline --hot",
}
```
Các lệnh trong mục `script` (ví dụ như trong trường hợp này là `start`) dùng để tạo 1 shortcut, tập lệnh bên giá trị của `start` sẽ được chạy khi ta gõ `yarn start` hoặc `npm run start`;

Kết quả là chúng ta sẽ có 1 file package.json dạng như sau:
```
{
  "name": "app",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "webpack-dev-server --watch-poll --inline --hot",
  },
  "devDependencies": {
    "babel-cli": "6.26.0",
    "babel-loader": "7.1.2",
    "babel-plugin-import": "1.6.2",
    "babel-plugin-syntax-dynamic-import": "6.18.0",
    "babel-plugin-transform-decorators-legacy": "1.3.4",
    "babel-plugin-transform-runtime": "6.23.0",
    "babel-preset-env": "1.6.1",
    "babel-preset-react": "6.24.1",
    "babel-preset-react-hmre": "1.1.1",
    "css-loader": "0.28.7",
    "file-loader": "1.1.5",
    "less": "2.7.3",
    "less-loader": "4.0.5",
    "node-sass": "4.5.3",
    "sass-loader": "6.0.6",
    "style-loader": "0.19.0",
    "stylus": "0.54.5",
    "stylus-loader": "3.0.1",
    "webpack": "3.8.1",
    "webpack-dev-server": "2.9.3",
    "webpack-merge": "4.1.0"
  },
  "dependencies": {
    "antd": "2.13.7",
    "jquery": "2.2.4",
    "react": "16.0.0",
    "react-dom": "16.0.0"
  }
}
```

## Cấu hình dự án

**Cấu hình `webpack` với file `webpack.config.js`:**

```
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const path = require('path');
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    test: path.join(__dirname, 'tests')
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        app: PATHS.app
    },
	resolve: {
        modules: [
            path.resolve(__dirname),
            "node_modules"
        ],
        alias: {
            app: 'app',
            libs: 'app/libs/',
            components: 'app/components/',
            utils: 'app/utils/',
            images: 'app/images/',
            helpers: 'app/utils/helpers'
        },
        extensions: ['.js', '.jsx']
	},
    output: {
        path: PATHS.build,
        filename: "[name].js"
    },
    module: {
        loaders: [
        	{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }, {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }, {
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"]
            }, {
            	test: /\.png$/,
                loader: "file-loader"
            }, {
            	test: /\.jpg$/,
                loader: "file-loader"
            }, {
                test: /\.gif$/,
                loader: "file-loader"
            }, {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file-loader'
            }, {
				test: /\.jsx?$/,
				loader: 'babel-loader',
                include: PATHS.app,
                exclude: /node_modules/
			}
        ]
    }
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        watchOptions: {
            ignored: /node_modules/
        },
        // devtool: 'source-map',
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            disableHostCheck: true,
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            stats: 'errors-only',
            host: '0.0.0.0',
            port: 4004
        },
        plugins: [
            new webpack.NamedModulesPlugin()
        ]
    });
}
```

Các lệnh liên quan đến webpack như `webpack` hay `webpack-dev-server` mặc định sẽ đọc file này đầu tiên để lấy thông tin, đây là file cấu hình chính của webpack.

**Cấu hình `babel` với file `.babelrc`:**

Tạo file .babelrc tại thư mục gốc của dự án `reactspa` với nội dung sau:

```
{
	"plugins": [
		"syntax-dynamic-import",
		"transform-decorators-legacy",
		[
			"transform-runtime", {
				"polyfill": false,
				"regenerator": true
			}
		],
		["import", { libraryName: "antd", style: "css" }]
	],
	"presets": [
		"env",
		"react"
	],
	"env": {
		"start": {
			"presets": [
				"react-hmre"
			]
		}
	}
}
```

Cấu hình trên sẽ thông báo với `bebel` rằng source code sẽ được compile theo chuẩn ES6 với các hỗ trợ thêm import động, decorator, shortcut import cho Ant desig...

**Cấu hình `ESLint` với file `.eslintrc.json`:**

Tạo file .eslintrc.json với nội dung sau

```
{
    "globals": {
        "jQuery": true,
        "$": true
    },
    "env": {
        "browser": true,
        "node": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "rules": {
        "comma-dangle": 2,
        "no-cond-assign": 2,
        "no-constant-condition": 0,
        "no-control-regex": 2,
        "no-debugger": 2,
        "no-dupe-args": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-empty": 2,
        "no-empty-character-class": 2,
        "no-ex-assign": 2,
        "no-extra-boolean-cast": 2,
        "no-extra-semi": 2,
        "no-func-assign": 2,
        "no-inner-declarations": 2,
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 2,
        "no-negated-in-lhs": 2,
        "no-obj-calls": 2,
        "no-prototype-builtins": 2,
        "no-regex-spaces": 2,
        "no-sparse-arrays": 2,
        "no-unexpected-multiline": 2,
        "no-unreachable": 2,
        "no-unsafe-finally": 2,
        "use-isnan": 2,
        "valid-jsdoc": 2,
        "valid-typeof": 2
    }
}
```
Các nội dung trên sẽ giúp text editor / IDE của bạn gợi ý về các sai sót trong quá trình code.



## Tạo cấu trúc folder chính cho dự án
Mỗi dự án font-end thông thường sẽ có 3 phần:

1. `app`: Folder chứa source code
2. `build`: Folder chứa file thành phẩm để đưa lên production
3. `tests`: Folder chứa các test cases

Ta sẽ tiến hành tạo 3 folder này trong thư mục gốc của dự án `reactspa`

```
mkdir app build tests
```

## Viết những dòng code React đầu tiên

Tạo folder `components` trong folder app
```
mkdir app/components
```

Tạo component chính cho dự án: `app/components/App.js` với nội dung

```javascript
import React, { Component } from 'react';
import { DatePicker } from 'antd';


export default class App extends Component {
  render() {
    return (
    	<div>
	    	<h1>Hello world</h1>
	    	<DatePicker onChange={(date, dateString)=>{}} />
    	</div>
    );
  }
}
```

Tạo mount point cho dự án: file `app/index.js` file này sẽ có nhiệm vụ load component `App`.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import App from './components/App';


ReactDOM.render(
	<LocaleProvider locale={enUS}>
		<App />
	</LocaleProvider>
	, document.getElementById('app'));

```

Kiểm tra kết quả, vào thư mục gốc của dự án `reactspa` và gõ
```
yarrn start
```
Kiểm tra trình duyệt: `http://127.0.0.1:4004`

## Cấu hình Ngix để loại bỏ port trên url

Thên cấu hình sau vào file config của nginx:

Đối với Ubuntu/Debian: /etc/nginx/site-enabled/default
Đối với RHE/Centos: /etc/nginx/conf.d/default.conf
Đối với Mac: /usr/local/etc/nginx/sites-enabled/default

```
server {
	listen 80;
	server_name reactspa.dev;
	index index.html;

	location /admin/ {
		proxy_pass http://127.0.0.1:4004;
		proxy_redirect off;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		rewrite ^/admin(/.*)$ $1 break;
	}

	location /user/ {
		proxy_pass http://127.0.0.1:4004;
		proxy_redirect off;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		rewrite ^/user(/.*)$ $1 break;
	}
}
```

Thử lại với địa chỉ: `http://reactspa.dev/admin` hoặc `http://reactspa.dev/user`

Bạn có thể sử dụng branch `son/setup-du-an-dung-webpack-nginx` để dùng source code.

<< [Bài viết trước](/reactjs/)
>> Bài viết tiếp theo