---
permalink: "/project-todo-setting-up/"
layout: page
title: "TodoApp with PouchDB/CouchDB"
subtitle: "Setting up project using start-react-native and some dependencies"
---

## Step 1: Install NodeJS and CouchDB

Following instruction at [NodeJS](https://nodejs.org/en/) and [CouchDB](http://docs.couchdb.org/en/2.1.0/install/unix.html) home page.

## Step 2: Install nvm

```bash
nvm install node
```

## Step 3: Creating new project

```bash
nvm use node
npm install -g create-react-native-app
create-react-native-app TodoApp
cd TodoApp
yarn add pouchdb-react-native native-base
```

## Step 4: Ready to start

Visit [https://expo.io](https://expo.io) for installing Expo to your device (iOS or Android)

```bash
yarn start
```

Capture QR code and happy coding!

**Next step:** [Making layout.](/da-todo-making-layout)