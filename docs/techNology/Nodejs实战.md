---
title: Node.js实战
date: 2021-02-07
categories: Work
author: grace
tags:
  - Nodejs
---

#### 一、基础

Commonjs 模块规范:

CommonJS  是一种使用广泛的 JavaScript 模块化规范，核心思想是通过  require  方法来同步地加载依赖的其他模块，通过  module.exports  导出需要暴露的接口。 CommonJS 规范的流行得益于 Node.js 采用了这种方式，后来这种方式被引入到了网页开发中。

```

// 导入const moduleA = require('./moduleA');

// 导出module.exports = moduleA.someFunc;
```

优点:

代码可复用于 Node.js 环境下并运行，例如做同构应用；

通过 NPM 发布的很多第三方模块都采用了 CommonJS 规范

CommonJS 的缺点在于这样的代码无法直接运行在浏览器环境下，必须通过工具转换成标准的 ES5。

[CommonJS](http://www.commonjs.org/) 还可以细分为 CommonJS1 和 CommonJS2，区别在于 CommonJS1 只能通过  exports.XX = XX  的方式导出，CommonJS2 在 CommonJS1 的基础上加入了  module.exports = XX  的导出方式。 CommonJS 通常指 CommonJS2。

**AMD**

AMD  也是一种 JavaScript 模块化规范，与 CommonJS 最大的不同在于它采用异步的方式去加载依赖的模块。 AMD 规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是  [requirejs](https://requirejs.org/)。

```
// 定义一个模块
define('module', ['dep'], function(dep) {
  return exports;
});

// 导入和使用require(['module'], function(module) {
});
```

AMD 的优点在于：可在不转换代码的情况下直接在浏览器中运行；可异步加载依赖；可并行加载多个依赖；代码可运行在浏览器环境和 Node.js 环境下。

AMD 的缺点在于 JavaScript 运行环境没有原生支持 AMD，需要先导入实现了 AMD 的库后才能正常使用。

**ES6 模块化**

```
// 导入import { readFile } from 'fs';
import React from 'react';
// 导出export function hello() {};
export default {
  // ...
};
```

ES6 模块化是欧洲计算机制造联合会 ECMA 提出的 JavaScript 模块化规范，它在语言的层面上实现了模块化。浏览器厂商和 Node.js 都宣布要原生支持该规范。它将逐渐取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块虽然是终极模块化方案，但它的缺点在于目前无法直接运行在大部分 JavaScript 运行环境下，必须通过工具转换成标准的 ES5 后才能正常运行。

**样式文件中的模块化**

除了 JavaScript 开始模块化改造，前端开发里的样式文件也支持模块化。 以 SCSS 为例，把一些常用的样式片段放进一个通用的文件里，再在另一个文件里通过  @import  语句去导入和使用这些样式片段。

SCSS  可以让你用程序员的方式写 CSS。它是一种 CSS 预处理器，基本思想是用和 CSS 相似的编程语言写完后再编译成正常的 CSS 文件。

[Flow](https://flow.org/)  也是 JavaScript 的一个超集，它的主要特点是为 JavaScript 提供静态类型检查，和 TypeScript 相似但更灵活，可以让你只在需要的地方加上类型检查。

ES6 通过这些新特性，可以更加高效地编写代码，专注于解决问题本身。但遗憾的是不同浏览器对这些特性的支持不一致，使用了这些特性的代码可能会在部分浏览器下无法运行。为了解决兼容性问题，需要把 ES6 代码转换成 ES5 代码，Babel  是目前解决这个问题最好的工具。 Babel 的插件机制让它可灵活配置，支持把任何新语法转换成 ES5 的写法。

TypeScript
是 JavaScript 的一个超集，由 Microsoft 开发并开源，除了支持 ES6 的所有功能，还提供了静态类型检查。采用 TypeScript 编写的代码可以被编译成符合 ES5、ES6 标准的 JavaScript。 将 TypeScript 用于开发大型项目时，其优点才能体现出来，因为大型项目由多个模块组合而成，不同模块可能又由不同人编写，在对接不同模块时静态类型检查会在编译阶段找出可能存在的问题。 TypeScript 的缺点在于语法相对于 JavaScript 更加啰嗦，并且无法直接运行在浏览器或 Node.js 环境下。

#### 二、项目开发

Http Api

API 服务：

1、RESful：

简单易懂

可以快捷搭建

在数据的聚合方面有很大劣势

例子：github

2、facebook 提出 GraphQL

专注数据聚合，前段需要什么就返回什么

[Getting Started With GraphQL.js 官网](https://graphql.org/graphql-js/)

[GraphQL Koa Middleware
npm 包](https://www.npmjs.com/package/koa-graphql)

3、vue/react 服务端渲染

前后端同构：
后端需要渲染列表（首屏加速、SEO）
前端也需要渲染列表（无刷新过滤、排序）

同一个模版/组件。可在浏览器渲染，也可以在 Node.js 渲染

输入 url 到得到整个页面渲染完毕的结果，中间发生了哪些事情

架构图：

浏览器---》路由组件---》列表页 /播放页/详情页---》后端服务---》模版引擎渲染---》浏览器

[ReactDomServer.renderToString()](https://reactjs.bootcss.com/docs/react-dom-server.html)

[VueServerRender.renderToSting()](https://ssr.vuejs.org/zh/)

#### 开箱即用的 ssr 框架：

[ssr](http://doc.ssr-fc.com/)
