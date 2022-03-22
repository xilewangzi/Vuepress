---
title: 前端测试Jest入门到 TDDBDD
date: 2020-05-20
categories: Work
author: grace
tags: 
 - Jest
---

#### 一 、Jest是一个令人愉快的 JavaScript 测试框架，专注于简洁明快。


#### 1、基础

##### 1.1自动化测试背景及原理
##### 1.2Jest自动化测试框架简介用 
##### 1.3Jest 修改自动化测试样例

##### 1.4Jest 的配置/匹配器



 ```
 npx jest --init
 ```
 
 为了node、jest能够运行es6
 
 安装babel 
 
 ```
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

npm run jest

jest (babel-jest)

babel-core

取.babelrc 配置

在运行之前，结合babel，先把代码做一次转换

运行转换过的测试用例代码

###### 匹配器：

###### Jest 命令行工具的使用

###### 异步代码的测试方法
1、回调类型异步函数类型
测试函数，传入done参数。当函数执行完毕，调用done函数。

```

import axios from 'axios'
export const fetchData = () => {
    // axios.get('http://www.dell-lee.com/react/api/demo.json').then((response) => {
    //     fn(response.data)
    // })
   return  axios.get('http://www.dell-lee.com/react/api/demo.json')
    //  .then((response) => {
    //     fn(response.data)
    // })
}

```

```

import { fetchData } from './fetchData'
// test("fetchData 返回结果为true", (done) => {
//     // fetchData((data) => {
//     //     expect(data).toEqual({
//     //         success: true
//     //     })
//     //     done()
//     // })
//    return fetchData().then((response) => {
//       expect(response.data).toEqual({
//             success: true
//         })
//     })
// })
test("fetchData 返回结果为true", () => {
    // fetchData((data) => {
    //     expect(data).toEqual({
    //         success: true
    //     })
    //     done()
    // })
   return fetchData().then((response) => {
      expect(response.data).toEqual({
            success: true
        })
        
        
     //404
     
     
 expect.assertions(1)
    return fetchData().catch((e) => {
        expect(e.toString().indexOf('404')>-1).toBe(true)
    })


    })
})
```
```
return expect(fetchData()).rejects.toThrow();
```

异步测试用例：

```
 expect.assertions(1)
    try {
        await fetchData();
    }catch(e){
        console.log(e)
    }
```

```
  // const response = await fetchData();
    // expect(response.data).toEqual({
    //     success: true
    // })
```



###### Jest 中的钩子函数钩子函数的作用域




Jest 中的 Mock

2、进阶

napshot 快照测试
mock 深入学习
mock timers
ES6 中类的测试
Jest  中对 DOM 节点操作的测试


[官网文档](https://jestjs.io/zh-Hans/)


参考：[Vue单元测试探索](https://juejin.im/post/5b308f5e6fb9a00e5d798c3c#heading-4)

参考：[前端自动化测试](https://segmentfault.com/a/1190000020336411)