---
title: React-简书
date: 2021-07-19
categories: Work
author: grace
tags:
  - React
---

React ： A JS library for building user interfaces

React 中的组件

#### 三、Todolist-Demo 基础

```
//immutable

state 不允许我们做任何改变
 deleteTodoItem (index){
    const list = [...this.state.todoItems];
    list.splice(index,1)
    this.setState({
      todoItems:list
    })
  }
```

2、JSX

写注释

```
{
//这样写注释

{/*注释...*/}
}
```

3、不转译：

```\
<li key={index}  onClick={this.deleteTodoItem.bind(this,index)}
                  dangerouslySetInnerHTML={{ __html:item }}
                >
</li>
```

4、组件拆分、传值
组件-树形结构

父组件通过属性向子组件传值，子组件通过 this.props.xxx 接受值

既可以传递数据、也可以传递方法

注意：子调用父组件方法，父组件传递函数 this 指向绑定

5、优化

```
this.props.deleteTodoItemBtn(this.props.index)


//解构赋值
    const { deleteTodoItemBtn,index } = this.props
    deleteTodoItemBtn(index)

```

this 指向的绑定，组件初始化的时候，this 指向改好。提升页面性能

精简 jsx 内逻辑，单独封装函数，引入

```
//触发input框
 this.setState({
      todoItems:list
    })


    this.setState( () =>{
      return {
        inputValue: e.target.value
      }
    })


const value = e.target.value;
    this.setState(() => ({
      inputValue:value
    }))
```

```
//添加
 this.setState({
      todoItems:[...this.state.todoItems,this.state.inputValue],
      inputValue:""
    })
    //Es6函数语法
    this.setState((prevState) => ({
      todoItems:[...prevState.todoItems,prevState.inputValue],
      inputValue:""
    }))

```

```
//删除

优化前：
const list = [...this.state.todoItems];
    list.splice(index,1)
    this.setState({
      todoItems:list
    })

    优化后：
    this.setState((prevState) => {
      const todoItems = [...prevState.todoItems];
      todoItems.splice(index,1)
      return { todoItems }
    })
```

思考：

命令式编程

声明式编程、组件化

单向数据流：父组件单向传给子组件，但不能改变

视图层框架（数据传值交给 redux、mbox 框架）

函数式编程（自动化测试到来便捷）

#### 四、React 高级内容

1、开发者工具：chorm 扩展程序

React Developer Tools

PropTypes 与 DefaultProps 的应用：

PropTypes：接受外部传入的 prop 进行校验

DefaultProps：父组件没有向子组件传递数据，定义默认值

2、props，state 与 render 函数的关系

当组件的 state 或者 props 发生改变的时候，render 函数就会重新执行

当父组件的 render 函数被运行时，它的子组件的 render 都被重新运行一次

3、React 中的虚拟 DOM

虚拟 DOM 就是一个 JS 对象

4、深入了解虚拟 DOM

JSX -> creatElement -> 虚拟 DOM(js 对象) -> 真实 DOM

虚拟 DOM 优点：

性能提升、跨段应用得以实现（RN）、

5、虚拟 DOM 中的 Diff 算法

setState 异步函数

setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。

setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。

setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

diff 同层对比

6、React 中 ref 的使用

ref 帮助直接获取 DOM 元素使用

结合 setState 使用时，获取 DOM 不及时，由于 setState 在这里是异步。可以放到 setState 回调中执行 DOM 操作

ref 作用于 React 内置的 Html 组件，得到真实的 DOM 对象

ref 作用于类组件，得到类的实例对象

ref 不能作用于函数组件上（即引用组件是函数组件的话，给函数组件使用 ref 会报错）

ref 属性推荐传递对象或函数

对象  (通过  React.createRef()  创建或手动创建  { current: null })

7、生命周期：函数在某一时刻组件自动调用执行的函数

挂载

render

componentDidMount

更新

shouldComponentUpdate

render

componentDidUpdate

卸载

React 生命周期函数的使用场景：

```
//当父组件render执行，子组件处理不需要执行
shouldComponentUpdate(nextProps,nextState){
    if(nextProps.content !== this.props.content){
      return true
    }else{
      return false
    }
  }

  //ajax请求

componentDidMount

```

#### 五、Redux

看成图书馆

Store--图书管理员

React Components--借阅的学生

Reducers--借阅记录册（//reducer  可以接受 state，但不能修改 state）

Action Creaters--我要借什么书

基本原则：

store 必须唯一

只有 store 能够改变自己的数据内容，reducer  可以接受 state，但不能修改 state

Reducer 必须是个纯函数（给定固定的输入，就一定会有固定的输出，而且不会有任何副作用）

副作用：对参数的修改

核心 API:

createStore

store.dispatch

store.getState

store.subscibe

#### 、六、Redux 进阶

UI 组件和容器组件:组件拆分

UI 组件:负责页面渲染

容器组件：负责业务逻辑
