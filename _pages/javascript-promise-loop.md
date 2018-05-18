---
permalink: "/javascript-promise-loop/"
layout: page
title: Promise loop
subtitle: Các phương pháp sử dụng Promise trong vòng lặp
share-img: /img/pages/javascript/promise.png
---

**Cách 1:** Dùng Coroutine

```javascript
async function* promises() {
    const _promises = [
        new Promise(resolve => setTimeout(resolve, 1000, 'Case 1')),
        new Promise(resolve => setTimeout(resolve, 5000, 'Case 2')),
        new Promise(resolve => setTimeout(resolve, 100, 'Case 3')),
    ];

    for (let promise of _promises) yield await promise;
}
for await (let result of promises()) {
    console.log(result);
}
```

**Cách 2:** Dùng await trong vòng lặp

```javascript
const promises = [
    new Promise(resolve => setTimeout(resolve, 1000, 'Case 1')),
    new Promise(resolve => setTimeout(resolve, 5000, 'Case 2')),
    new Promise(resolve => setTimeout(resolve, 100, 'Case 3')),
];
for (let result of promises) {
    console.log(await result);
}
```


