---
title: Vue3.x总结
date: 2022-01-10
categories: Work
author: grace
tags:
  - vue
---

Vue3 最新版，增加 Composition API 组合语法，基于 Proxy 的响应系统、自定义渲染器等
比 Vue2，Vue3 全部支持 TS，渲染性能提升，全新的 API，基于 Vite 快速搭建 vue 项目

##### 一、Vue 基础语法-Composition API

```
// createApp 表示创建一个 Vue 应用, 存储到 app 变量中
  // 传入的参数表示，这个应用最外层的组件，应该如何展示
  // MVVM 设计模式，M -> Model 数据， V -> View 视图， VM -> ViewModel 视图数据连接层
  const app = Vue.createApp({
    data() {
      return {
        message: 'hello world'
      }
    },
    template: "<div>{{message}}</div>"
  });
  // vm 代表的就是 Vue 应用的根组件
  const vm = app.mount('#root');
```

动机（为什么会用）：
[Vue 3.0 到底好在哪里](https://blog.csdn.net/weixin_46837985/article/details/105852706)

首先抛出 Vue2 的代码模式下存在的几个问题。随着功能的增长，复杂组件的代码变得越来越难以维护。尤其发生你去新接手别人的代码时。根本原因是 Vue 的现有 API 通过「选项」组织代码，但是在大部分情况下，通过逻辑考虑来组织代码更有意义。

缺少一种比较「干净」的在多个组件之间提取和复用逻辑的机制。

类型推断不够友好。

安装开发环境：
[Vue cli](https://cli.vuejs.org/zh/)

运行安装

```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
#查看当前安装版本
vue --version

```

更新

```
npm uninstall -g vue-cli
npm install -g @vue/cli
#安装出错可以用cnpm 尝试
```

查看版本

```
vue -V
@vue/cli 4.5.4
```

eslint 插件

[Vetur 插件](https://github.com/vuejs/vetur)

1、Ref 语法

setup 方法

ref 函数：是个函数，接受一个参数，返回响应对象。
我们初始化的这个 0 作为参数包裹到这个对象中去，在未来可以检测到改变并作出对应的相应。

```
<template>
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <button @click="increase">+1</button></template>

import { ref } from "vue"

setup() {
  // ref 是一个函数，它接受一个参数，返回的就是一个神奇的 响应式对象 。我们初始化的这个 0 作为参数包裹到这个对象中去，在未来可以检测到改变并作出对应的相应。
  const count = ref(0)
  const double = computed(() => {
    return count.value * 2
  })
  const increase = () => {
    count.value++
  }
  return {
    count,
    increase,
    double
  }}
```

2、Reactive 函数

```
import { ref, computed, reactive, toRefs } from 'vue'

interface DataProps {
  count: number;
  double: number;
  increase: () => void;}

setup() {
  const data: DataProps  = reactive({
    count: 0,
    increase: () => { data.count++},
    double: computed(() => data.count * 2)
  })
  const refData = toRefs(data)
  return {
    ...refData
  }}
```

使用 ref 还是 reactive 可以现在这样的准则：

第一，就像些普通 js 代码一样，选择原始类型和对象类型一样，选择 ref 还是 reactive

第二，所有场景都使用 reactive，记得使用 toRefs 保证 reactive 对象属性保持响应性

3、vue3 响应原理：

Proxy

```
Object.defineProperty(data,'count',{
      get(){},
      set(){}
    })

    new Proxy(data,{
      get(key){},
      set(key,value)
    })
```

4、生命周期

在 setup 中使用的 hook 名称和原来生命周期的对应关系

beforeCreate -> 不需要

created -> 不需要

beforeMount -> onBeforeMount

mounted -> onMounted

beforeUpdate -> onBeforeUpdate

updated -> onUpdated

beforeUnmount -> onBeforeUnmount

unmounted -> onUnmounted

errorCaptured -> onErrorCaptured

renderTracked -> onRenderTracked

renderTriggered -> onRenderTriggered

5、侦测变化 watch

```
const updataGreeting = () => {
    greetings.value += "-a-"
  }
  watch([greetings, () => data.count],(newValue,oldValue) => {
    console.log("old",oldValue)
    console.log("new",newValue)
    document.title = 'updated' + greetings.value + data.count
  })
```

6、模块化

```
import { ref } from 'vue'import axios from 'axios'// 添加一个参数作为要使用的 地址const useURLLoader = (url: string) => {// 声明几个ref，代表不同的状态和结果
  const result = ref(null)
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)

// 发送异步请求，获得data// 由于 axios 都有定义，所以rawData 可以轻松知道其类型
  axios.get(url).then((rawData) => {
    loading.value = false
    loaded.value = true
    result.value = rawData.data
  }).catch((e) => {
    error.value = e
  })
  // 将这些ref 一一返回
  return {
    result,
    loading,
    error,
    loaded
  }}


export default useURLLoader
```

[请求获取狗图片 API](https://dog.ceo/dog-api/)

[请求获取猫图片 API](https://api.thecatapi.com/v1/images/search)

7、模块化结合 typescript - 泛型改造

```
// 为函数添加泛型
function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null)
  }
```

```
// 在应用中的使用，可以定义不同的数据类型interface DogResult {
  message: string;
  status: string;}interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;}
```

8、Typescript 对 Vue3 的加持：

```
import { defineCompoent } from "vue"
  //defineCompoent()让传入的对象获得类型
  const component = defineCompoent({
    name:"",
    props ;{
      msg:String
    },
    emits:{},//自定义事件
    setup(props,context){
      //传入的这两个参数理解context. （attrs、slots、emit）；props是一个响应式对象
    }
  })
```

新推出的特性 Teleport 瞬间移动

异步请求 Suspense 是 Vue3 推出的一个内置的特殊组件，要返回一个 promise

Global API Change 全局 API 修改

Vue2 入口文件写法

```
import Vue from ‘Vue’

Vue.use(....)
Vue.mixin(...)

new Vue({
  render:h=>h(App)
}).$mount('#app')
```

Vue2 全局 API 遇到的问题：

单元测试中，全局配置非常容易污染全局环境

在不同的 apps 中，共享一份有不同配置的 Vue 对象，也变得非常困难

Vue3 新的写法：

```
import { createApp } from ‘Vue’
// createApp 表示创建一个 Vue 应用, 存储到 app 实例 变量中
  // 传入的参数表示，这个应用最外层的组件，应该如何展示
  // MVVM 设计模式，M -> Model 数据， V -> View 视图， VM -> ViewModel 视图数据连接层
  const app = Vue.createApp({
    data() {
      return {
        message: 'hello world'
      }
    },
    template: "<div>{{message}}</div>"
  });
  // vm 代表的就是 Vue 应用的根组件
  const vm = app.mount('#root');
```

全局配置

Vue.config --> app.config

...

全局注册类 API

Vue.component --> app.component
...

行为扩展类：
Vue.mixin --> app.mixin
Vue.use() -->app.use()

Global API Treeshaking 打包工具提出的概念

##### 二、vue-router 和 vuex
