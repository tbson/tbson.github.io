---
layout: post
title: Pass props multiple levels đơn giản với context và React Hooks
subtitle: React Hook useContext đã làm cho việc sử dụng Context trỡ nên đơn giản và gọn gàng đi rất nhiều.
bigimg: /img/posts/2019-04-11/context-vs-redux.png
share-img: /img/posts/2019-04-11/context-vs-redux.png
---

Từ khi React cho ra phiên bản stable của `Context` để giải quyết vấn đề truyền props từ component cha xuống nhiều tầng component con:

Từ:

```javascript
import * as React from 'react';

export () => {
    const [importantProps, setImportantProps] = useState("")
    // changing importantProps somewhere...
    return (
        <Component1 importantProps={importantProps}></Component1>
    )
}

const Component1 = ({importantProps}) => (
    // this one doesn't need importantProps variable
    // just use for passing it to its child component
    <Component2 importantProps={importantProps}></Component2>
)

const Component2 = ({importantProps}) => (
    // The real one need importantProps variable
    <div>{importantProps}</div>
)
```

Thành:

```javascript
import * as React from 'react';
import {createContext} from 'react';

const Context = createContext({});
export () => {
    const [importantProps, setImportantProps] = useState("")
    // changing importantProps somewhere...
    return (
        <Context.Provider value={{importantProps}}>
            <Component1 importantProps={importantProps}></Component1>
        </Context>
    )
}

const Component1 = () => (
    <Component2></Component2>
)

const Component2 = () => (
    <Context.Consumer>
        {
            ({importantProps}) => (<div>{importantProps}</div>)
        }
    <Context.Consumer>
)
```

Vấn đề loại bỏ props trung gian đã được giải quyết.
Nhưng cách làm này đã phát sinh một vấn đề khác ít quan trọng hơn: Nó dùng kỹ thuật `render props`.

Chính là đám này:

```javascript
{
    ({importantProps}) => <div>{importantProps}</div>;
}
```

Kỹ thuật này theo mình là cực kì mất mỹ quan và quá rối rắm.

Nhưng từ khi React giới thiệu 1 Hook: `useContext` thì mọi thứ lại trỡ nên sáng sủa. `Component2` có thể được viết lại như sau:

```javascript
import {useContext} from 'react';

const Component2 = () => {
    const {importantProps} = useContext(Context);
    return (
        <div>{importantProps}</div>
    }
};
```

DONE
