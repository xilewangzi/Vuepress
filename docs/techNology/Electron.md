---
title: Electron
date: 2022-02-03
categories: Work
author: grace
tags:
  - Electron
---

1、什么是 Electron

使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序的框架

由 Github 开发了一个开源框架，允许我们 HTML+CSS+JS 来构建开发桌面应用。整体架构核心组成：Chromium + Node.js + Native APIs 组成的。其中 Chromium 提供了 UI 能力，Node.js 让 Electron 有了底层操作能力，Native APIs 则解决了跨平台的一些问题。wins 系统，macOS 系统以及 Linux 系统间差异的屏蔽，并且它还提供了一个比较统一体验的原生能力。

能力点：

其他桌面端选型对比

请问子洋：Electron 和 NW.js 的区别能请您对比一下吗？

它们两个最大的区别是在于对 Node.js 和 Chromium 事件循环机制的整合处理方式是不一样的。首先 NW.js 是通过修改源码的方式让 Chromium 与 Node.js 的事件循环机制进行打通。Electron 实现的机制是通过启用一个新的安全线程，在 Node.js 和 Chromium 之间做事件转发，这样来实现两者的打通。这样的一个好处就是 Chromium 和 Node.js 的事件循环机制不会有这么强的耦合。另外的区别则是 NW.js 支持 xp 系统，Electron 是不支持的。相比较而言 Electron 有着更活跃的社区，以及更多的大型应用如 VSCode、Atom 的实践案例，更多的区别可以参考 Electron 官方的一篇介绍：https://www.electronjs.org/docs/development/electron-vs-nwjs

2、配置开发环境

3、进程与线程

进程是对运行时程序的封装，它是系统进行资源调度和分配的基本单位；

线程是进程的子任务，是 CPU 调度和分派的基本单位，是操作系统可识别的最小执行和调度单位。

进程与线程间关系（区别）：

进程至少含一个线程，每一个进程都有一个主线程，进程能够创建、撤销线程；线程能创建线程，不能创建进程。

进程拥有独立的内存地址，多个进程之间的资源不共享，如果需要通信，可以通过 IPC；线程无独立的内存地址，某个进程下的所有线程（可以直接读写进程数据段）共享该进程所拥有的所有资源。

进程崩溃不会影响其他进程，线程挂了进程也会发生崩溃。

区别：

内存使用方面的区别

通信机制的区别

量级方面的区别

4、官方文档摘录:

Electron 继承了来自 Chromium 的多进程架构，这使得此框架在架构上非常相似于一个现代的网页浏览器。

为什么不是一个单一的进程？
多进程模型：

为了解决这个问题，Chrome 团队决定让每个标签页在自己的进程中渲染， 从而限制了一个网页上的有误或恶意代码可能导致的对整个应用程序造成的伤害。

Electron 应用程序的结构非常相似。

主进程：

每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。 主进程在 Node.js 环境中运行，这意味着它具有  require  模块和使用所有 Node.js API 的能力。

窗口管理：主进程的主要目的是使用  BrowserWindow  模块创建和管理应用程序窗口。
