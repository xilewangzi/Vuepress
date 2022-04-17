---
title: Node.js+KOA2
date: 2021-09-01
categories: Work
author: grace
tags:
  - Nodejs
---

##### 第一章、用 Node.js KOA2 打造超好用的 Web 框架

二次开发
异步编程模型

编程思维、
面向对象、
Sequelize 与 MySQL

Nodejs 能力：
NodeJS Stream（前端工程化基础）
脱离浏览器运行 JS
服务端 API
作为中间层

CTO 往往是由服务端工程师担任
技术架构、考虑全局、公司重要资产（数据）

javascript 语言本身的深度进阶

语法 Python  VS   ES2019
原型链 工程化 oo

面向对象

NodeJS 脱离浏览器

异步
async await
资源 http 异步 操作数据库

##### 第二章 Koa2 的那点事儿与异步编程模型

1、
MySQL （XAMPP）
Navicat （数据库可视化管理工具）
nodemon （自动重启服务器工具）pm2
nvm 管理 node 版本

Node js 脱离浏览器
3、
后端：读写数据库   提供 API
//写出好的代码、提高开发效率
悲观锁、乐观锁、事务、脏读、幻读
API 低级、基础、
基于 NodeJs 专业开发 web KOA Express
洋葱模型 精简 KOA 二次开发 比较好用
定制化能力越强 喜好 习惯 二次开发 非常好用 高级 KOA
Lin CMS ：KOA+Vue
4、
项目独立命名
服务器程序：
Commons require

es6 Import from

AMD

//实验特性 es6 es7 node 
//es10 import decorator class
TC39 查看最新 js 特性提案
babel es6 转换 es5
TS Typescript 
5、
洋葱模型

异步编程解决方案：

Promise async await  基础是 Promise

await：（  求值关键字   对表达式求值、阻塞当前线程）
异步操作：对资源、读文件、发送 http  操作数据库
axios  基于 Promise

const res = await axiso.get('https://www.baidu.com/') //1min

加上 await，本来是异步的调用变成同步调用

C#
async：返回 promise

async function f1(){
  return "hello"
}

console.log(f1())

async await  异步终极解决方案

异步编程思维

API 网站：http://bl.7yue.pro/dev/classic.html#id2

中间件：函数

中间件返回 promise

上下文（Context）

Koa Context  将  node  的  request  和  response  对象封装到单个对象中，为编写  Web  应用程序和  API  提供了许多有用的方法。  这些操作在  HTTP  服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。

为什么一定要按照洋葱模型

##### 第三章   路由系统的改造

路由
自动加载路由注册  require-directory

类的思想

路由拆分

动脑筋   思考   能不能简化。程序员一定要懒

服务端（数据库设计）  主题   模型

Process.cwd()  当前 Node.js 进程执行时的工作目录

\_\_dirname:  当前模块的目录名

##### 第四章 异步异常与全局异常处理

_异步异常处理_

参数获取与 LinValidator 校验器

TP5 Python WTForms LinValidator

函数返回 promise 加上 async await ，使用 try catch 进行处理，异步和同步就没什么区别
**深入理解 promie**
Promise async await

Koa 库 包 返回的是封装好的 promise 例如：axios、Sequelize

awiat 对一个表达式来求值

```
function func1(){
   func2()
}
async function func2(){
  try{
   await func3()
  }catch(error){
    console.log("error1",error)
  }
}
//全局异常处理
function func3(){
   return new  Promise((resolve,reject)=>{
    const r = Math.random()
    if(r<0.5){
      reject('error2')
    }
   })
  // return await setTimeout(function(){
  //   throw new Error('error2')
  // },1000)
}
func1()
```

//监听   全局异常处理

//中间件 --全局异常处理 AOP 面向切面编程
监听错误，输出一段有意义的提醒信息

```
const catchError = async (ctx,next) => {
  try {
   await next()
  }catch (error){
    //error 堆栈调用
    //j简化 清晰明了的信息 给前端
    //      HTTP 状态码  Code
    ctx.body = "服务器错误！！！"
    //message
    //error_code 详细，开发者自己定义 10001 20003
    //request_url 当前请求url
    //已知型错误 param int ‘'abc'  已知
    //处理错误，明确
    try catch 处理错误 明确

    //未知型错误 程序潜在错误 无意识 根本不知道错误
    //链接数据库 账号 密码    输入错误

  }
} 
module.exports = catchError
```

定义异常返回格式

```
//全局中间件
const catchError = async (ctx,next) => {
  try {
   await next()
  }catch (error){
    if(error.errorCode){
      ctx.body = {
        msg:error.message,
        error_code:error.errorCode,
        requestUrl: error.requestUrl
      }
      ctx.status = error.status
    }
  }
} 
module.exports = catchError
```

//list.js

```
router.post("/v1/:id/list/listDate",(ctx,next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  if(true){
   const error =   new Error("为什么错误")
   error.errorCode = 10001
   error.status = 400
   error.requestUrl = `${ctx.method}${ctx.path}`
   throw error
  }
  ctx.body = {
    key:'这里是数据77'
  }
  // throw new Error('API Exception')
})
```

//定义 HttpException 异常基类

```
class HttpException extends Error {
 constructor(msg='服务器异常',errorCode=10000,code=400){
   super()
   this.errorCode = errorCode
   this.code = code
   this.msg = msg
 }
}
module.exports = { 
 HttpException 
}
```

//特定异常类与 global 全局变量

##### 第五章 LinValidator 校验器与 Sequelize Orm 生成 MySQL 数据表

**持久存储数据**

4、
关系型数据库：
MS 持久化数据  SQLServer Oracle   PostgresSQL
SQL 语言 增删改查
CRUD
ORM

非关系型数据库  
Redis（key：value）做缓存  
 MongoDB(文档型数据库) 持续化数据、 ODM

数据库 增删改查

SQL 语言

XAMPP

数据库可视化工具：

Navicat 管理 MySQL

Sequelize 连接数据库   配置一些数据库的参数

Sequelize 框架
[Sequelize 官方文档：](https://sequelize.org/)
Sequelize 是一个基于 Promise 的 Node.js ORM，适用于 Postgres、MySQL、MariaDB、SQLite 和 Microsoft SQL Server。 它具有可靠的事务支持、关系、急切和延迟加载、读取复制等。

主键不能为空 不能重复

[gitHub-lincms](https://github.com/TaleLin)

nodejs  异步编程思维

性能：并发量处理的好
