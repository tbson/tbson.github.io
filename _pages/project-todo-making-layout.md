---
permalink: "/project-todo-making-layout/"
layout: page
title: "TodoApp with PouchDB/CouchDB"
subtitle: "Making layout with NativeBase"
---

## Step 1: Create basic structure

Set content of `App.js`

```JSX
import React, { Component } from 'react';
import { Container, Header, Title, Content, Body, Text } from 'native-base';

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Todo App</Title>
                    </Body>
                </Header>

                <Content>
                    <Text>
                        Content area
                    </Text>
                </Content>
            </Container>
        );
    }
}
```