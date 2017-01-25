---
layout: post
title: React App SEO Friendly With Laravel
subtitle: Data ready when page loaded and SEO friendly React app with Laravel
bigimg: /img/posts/2017-01-24/banner.jpg
share-img: /img/posts/2017-01-24/banner.jpg
---

When developing SPA (Single Page Application), the most headache things are SEO and blank page (waiting spinner) as page first loaded.

SEO in SPA is tricky with many methods. Sometimes, we think about switching to NodeJs with Isomorphic (Same code base share between client and server with server rendering JS).

However if you are not familiar with NodeJs or are in loved with another Programing languages and don't want to move, it's realy a pain.

Luckily, search engines (SE), such as Google engine are smarter day by day.

They can parse JS app (that's amazing) but they are still lazy because they just grabe init render result of JS app and ignore any Ajax are called after that. That means any request form your app to API for getting data to update UI is completely ignored.

At least, SE can see init result of your SPA app so why don't we provide our JS app the init data which is directly rendered by server? If this circumstance happens, SE can see all what you want them see, that's our goal.

Let's begin with an ordinary ReactJS app, the index.html file:


```html
<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="utf-8"/>
        <title>Title</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="/dist/bundle.js"></script>
    </body>
</html>
```

```bundle.js``` is an output file as we compile source code with webpack or something else.

If this file is servered by web server (Nginx or Apache...) then we can do anything.

But if we render this file by a web framework, we can insert the init data to this file and components inside bundle.js can reach that init data. In this case, I use Laravel framework.

Let's put that bundle HTML in to a blade template:

{% raw %}
```html
<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="utf-8"/>
        <title>Title</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript">
            window.initData = {!! $initData !!};
        </script>
        <script src="{{config('app.client_url')}}"></script>
    </body>
</html>
```
{% endraw %}

The most important thing is here: ```window.initData = {!! $initData !!};```

Components inside ```bundle.js``` can ```access window.initData``` variable.

This template rendered by a controller:

```php
<?php
namespace App\Modules\Backend\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\Tools;
use App\Helpers\ValidateTools;
use App\Modules\Config\Models\Config;

class BackendController extends Controller{
    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct(){
        # parent::__construct();
    }

    public function login(Request $request){
        $data = [];
        $data["initData"] = Config::list(); // Get some data from config table
        return view('Backend::main', ValidateTools::toJson($data));
    }
}
```

This controller used by a route:

```php
<?php

Route::group(["prefix" => "admin"],
    function() {
        $module = "Backend";
        $controller = "\App\Modules\\{$module}\Controllers\\{$module}Controller";
        Route::get("login", ["uses" => "{$controller}@login"]);
    }
);
```

In ```bundle.js``` I use ```react-redux-router```, you can use ```react-router``` only.

The route of login component must be the same with current laravel route: ```/admin/login```

{% raw %}
```html
...
<Route path="admin" component={App} onChange={onChange} onEnter={onEnter}>
    <Route
        path="login"
        component={Login}
        params={{login: false}}></Route>
</Route>
...
```
{% endraw %}

When user navigates to: ```http://mydomain.com/admin/login``` then ```Login``` component will be shown up.

In ```Login``` I put a sample test for rendering 2 list items, one gets data from window.initData and another gets data by calling Ajax request:

```javascript
componentDidMount(){
    document.title = "Login";

    if(window.initData){
        this.setState({serverData: window.initData.data.items});
    }

    Tools.apiCall(configApiUrls.list, {}, false).then((result) => {
        if(result.success){
            this.setState({fetchResponse: result.data.items})
        }
    });
}

```

Render:

{% raw %}
```html
<div className="row">
    <div className="col-sm-6">
        <ul>
            {this.state.serverData.map( (item, index) =>{
                return <li key={index}>{item.uid}</li>
            })}
        </ul>
    </div>
    <div className="col-sm-6">
        <ul>
            {this.state.fetchResponse.map( (item, index) =>{
                return <li key={index}>{item.uid}</li>
            })}
        </ul>
    </div>
</div>
```
{% endraw %}

Then I use **Fetch as Google** tool: ```https://support.google.com/webmasters/answer/6066468?hl=en``` to see the final result:

**This is the result when open that url by browser:**
![Normal](/img/posts/2017-01-24/web-render.jpg)

**This is the result when check by Fetch as Google tool:**
![Google bot](/img/posts/2017-01-24/bot-render.jpg)

We can see Google bot can not see the right column (get data by calling Ajax) but can render exactly data got direct from server.

With this technique. We can develop a SPA with SEO friendly environment and can get init data as soon as it renders.

The good part of this technique is that we can apply to any web framework you love, not restrict to NodeJs.

The bad part is that we have to build 2 route lists, one in Laravel and one in React app.

DONE.
