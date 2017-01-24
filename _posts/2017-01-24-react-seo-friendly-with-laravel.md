---
layout: post
title: React App SEO Friendly With Laravel
subtitle: Data ready when page loaded and SEO friendly React app with Laravel
bigimg: /img/posts/2017-01-24/banner.jpg
share-img: /img/posts/2017-01-24/banner.jpg
---

When developing SPA (Single Page Application), the most headache thing is SEO and blank page (waiting spinner) when page first loaded.

SEO in SPA is tricky with many methods. Sometime, we think about switching to NodeJs with Isomorphic (Same code base share between client and server with server rendering JS).

But if you not familiar with NodeJs or be in loved with some other Programing languages and don't want to move. It's realy a pain.

Luckily, search engines (SE) such as Google search are smarter day by day.

They can parse JS app (that's amazing) but they still lazy because they just grabbing init render result of JS app and ignore any Ajax call after that. That mean any request form your app to API for getting data to update UI is completely ignore.

At least, SE can see init result of your SPA app then why not we provide our JS app the init data rendered directly from server? If this circumstance happen, SE can see all what you want them see, that's our goal.

Let's begin with an ordinary ReactJS app:


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
