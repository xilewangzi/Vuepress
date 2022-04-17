---
title: React 与 TypeScript
date: 2022-03-10
categories: Work
author: grace
tags:
  - React
---

#### 基础篇

##### 三、React 与 TypeScript

**CSS 模组** JSS：

CSS moudle（模组化）

每个 jsx 或者 tsx 文件就被视为一个独立存在的原件

原件所包含的所有内容也同样都应该是独立存在的

import './index.css' --> import style from './index.css'

**CSS in JS (JSS)添加样式**意思就是使用 JS 语言写 CSS。React  出现以后，这个原则不再适用了。因为，React 是组件结构，强制要求把 HTML、CSS、JavaScript 写在一起。这有利于组件的隔离。每个组件包含了所有需要用到的代码，不依赖外部，组件之间没有耦合，很方便复用。所以，随着 React 的走红和组件模式深入人心，这种"关注点混合"的新写法逐渐成为主流。

**加载媒体与字体文件**

###### state 与 props

区别：

props 是组件对外的接口，而 state 是组件对内的接口

props 用于组件间数据传递，而 state 用于组件内部的数据传递

**State**是私有的，可以认为 state 是组件的“私有属性”，用 setState()修改 State

构建函数 constructor 是唯一可以**初始化**state 的地方

State 的更新是异步的，调用 setState 后，不会立刻改变，是异步操作；不要依赖当前的 State，计算下个 State

**Props**：Properties 缩写，本质上，props 就是传入函数的参数，是从传入组件内部的数据，更准确地说，是从父组件传递向子组件的数据

Immutable 不变的 对象一旦创建就不可改变，只能通过销毁、创建来改变数据

通过判断内存地址的是否一致，来确认对象是否有经过修改

只读属性

**函数式编程理念**

ImmutableJS Redux Observable（RxJS)

**事件驱动 React Event 事件处理:**

e.target 事件发生的元素

e.currentTarget 事件处理绑定单位元素

**异步处理获取网络 API 数据**

[获取网络测试数据](https://jsonplaceholder.typicode.com/)

**setState（）** 异步更新，同步执行；setState（）本身并非异步，但对 state 的处理机制给人一种异步的假象。state 处理一般发生在生命周期变化的时候。

**生命周期：**

生命周期第一阶段：初始化
  初始化组件 state

constructor

componentDidMount

生命周期第二阶段：更新

在组件接收到一个新的 prop（更新后）时被调用

static getDerivedStateFromProps(props, state)

componentWillReceiveProps(){} 已经废弃

shouldComponentUpdate(nextProps,nextState){}

组件更新后调用

componentDidUpdate(){}

生命周期第三阶段：销毁

componentWillUnmount(){}

**17 版本变化：**

支持逐步升级

事件委托机制改变

向原生浏览器靠拢

删除事件池

useEffect 清理操作改为异步操作

JSX 不可返回 undefined

删除部分私有 API

#### 生态篇

1、**Hooks** 钩子
what：
非类组件中使用 state

消息处理的一种方法，用来监听指定程序

函数组件中需要处理副作用，可以用钩子把外部代码“钩”进来

常用的钩子：useState，useEffect，useContext，useReducer

hooks 一律使用 use 前缀命名：useXxx

本质：一类特殊的函数，为你的函数式组件注入特殊的功能

why:
有些类组件冗长而且复杂，难以复用

结局方案：无状态组件与 HOC(高阶组件),但是存在诸多问题

目的：

给函数式组件加上状态

生命周期函数会同时处理多项任务：发起 ajax、跟踪数据状态、绑定事件监听

函数式组件则轻量化很多，使用 Hooks 钩子来钩入组件状态

不再需要类组件

不会再有 this、不会再有 binding、甚至有可能取代 redux

useState：声明组件状态

useEffect：副作用钩子，可以取代
componentDidMount、
componentDidUpdate、
componentWillUnmount

给函数式组件添加副作用（side effect）

纯函数（pure function）

副作用与纯函数相反，指一个函数处理了与返回值无关的事情

**Context 与 useContext**

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据。

**组件化 Context Provider**

进阶--性能优化、原理
