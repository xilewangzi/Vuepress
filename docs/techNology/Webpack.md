---
title: Webpack
date: 2021-07-01
categories: Work
author: grace
tags:
  - Webpack
---

#### 一、基础

##### 第 1 章、webpack 与构建发展历史

1.1 为什么需要构建工具？

转换 ES6 语法

转换 JSX

CSS 前缀补全/预处理器

压缩混淆

图片压缩

1.2 前端构建演变

[grunt](https://www.gruntjs.net/)

Grunt 生态系统非常庞大，并且一直在增长。由于拥有数量庞大的插件可供选择，因此，你可以利用 Grunt 自动完成任何事，并且花费最少的代价。如果找不到你所需要的插件，那就自己动手创造一个 Grunt 插件，然后将其发布到 npm 上吧

执行不同任务，执行完任务存放本地磁盘文件（本地磁盘 I/O 操作）打包速度慢

[gulp](https://www.gulpjs.com.cn/)

文件流 打包存放在内存中，下个流程可以使用上个步骤的内存

gulp 将开发流程中让人痛苦或耗时的任务自动化，从而减少你所浪费的时间、创造更大价值。

1.3 配置组成

build："webpack" 原理：模块局部安装在 node_modules/.bin 目录创建软链接

##### 第二章 基础用法

2.1 entry、output、loaders

单入口：entry 是一个字符串
多入口：entry 是一个对象

```
output 告诉 webpack 如何将编译后的文件输出到磁盘

entry 多入口，output 的 filename，通过占位符确保文件名称的唯一
_[name].js_

output: {
    path: path.join(__dirname,'dist'),
    filename:'[name].js'
  }
```

webpack 开箱即用只支持 js 和 json 两种文件类型，通过 loaders 去支持其他文件类型并且把它们转换成有效的模块，并且可以添加到依赖图中。

本身是一个函数，接受源文件作为参数，返回转换的结果。
Loaders：

Pugins:
插件用于 bundle 文件的优化，资源管理和环境变量注入

作用于整个构建过程

plugins:[]

mode:

Mode 用来指定当前的构建环境：production、developent 还是 none

设置 mode 可以使用 webpack 内置函数，默认值为 production

解析 ES6、解析 React JSX

使用 babel-loader

babel 的配置文件是：.babelrc

增加 ES6 的 babel preset 配置

安装依赖

```
npm i @babel/core @babel/preset-env babel-loader -D
```

增加 React JSX preset 配置

安装依赖

```
npm i react react-dom @babel/preset-react -D
```

```
解析 css

css-loader 用于加载.css 文件。并且转换成 common.js 对象

style-loader 将样式通过<style>标签插入到 head 中

安装依赖
npm i style-loader css-loader -D
```

解析 less

less-loader 用于将 less 转换成 css

安装依赖

```
npm i less less-loader -D
```

解析图片、文件

```
npm i file-loader -D
```

url-loader 也可以处理图片和字体

可以设置较小资源自动 base64

```
npm i url-loader -D
```

2.2 文件监听

在源代码发生变化时，自动重新构建出新的输出文件

开启监听模式：

启动命令时，带上--watch

在配置 webpack.config.js 中设置 watch:true

唯一的缺陷：每次需要手动刷新页面

原理：轮询判断文件的最后编辑时间是否变化

webpack 热更新以及原理
