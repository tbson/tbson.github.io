---
permalink: "/project-todo/"
layout: page
title: TodoApp with PouchDB/CouchDB
subtitle: TodoApp with React Native, PouchDB, CouchDB and zero backend
---

# Requirements

The TodoApp will help us memorize something we need with priorities.

We can create/edit/remove/re-arange/mark done todos.

Our requirements are TodoApp able to work on both online and offline.

User can have more than one device such as iPhone, iPad and Android devices.

When user update todo by one device, the other device(s) will be changed.

Then we get some conclusions:

1. App can run on most mobile devices (iOS and Android are majority)
2. App can work on both online and offline
3. App can sync data from offline to online and vice versa

# Choosing technologies

Based on requirements, we get some decisitions:

1. Using `React Native` with `start-react-native` (Expo) because we don't need any function that requires `link` to platform.
2. Using `PouchDB` for client and `CouchDB` for server because we need sync data.
3. Using `Nativebase`, this is a trivial choice because it help us so much in making layout.

# Implementation steps

1. [Setting up project using start-react-native and some dependencies.](/da-todo-setting-up/)
2. [Making layout.](/da-todo-making-layout)
3. Using PouchDB to store data.
4. Syncing data.
5. Testing.
6. Ready for production.
