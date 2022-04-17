---
title: Javascript进阶
date: 2021-08-15
categories: Work
author: grace
tags:
  - JavaScript
---

#### 一、阶段一 JS 核心运行机制及高阶编程

##### 1、堆栈内存底层处理机制

**函数执行：**

1、形成一个全新的、私有的上下文 EC
2、当前私有的上下文中，有一个存放本上下文内声明的变量的地方 AO 私有变量对象-->这里的变量都是当前上下文内的私有变量[当前上下文中声明的变量、形参变量]
3、进栈执行
4、代码进栈执行还要处理很多事情：
1）、初始化作用域链[scope-chain]：<当前自己的上下文、上级上下文（创建函数时形成的作用域）>-当前函数的上级上下文是创建函数所在的上下文（作用域）
作用域链查找机制：变量--私有变量--上级上下文的私有变量--EC(G) 2)、初始化 this 3)、初始化 arguments 4)、形参赋值：形参都是私有变量（放到 AO 中），如果不传递实参，默认是 undefined 5)、变量提升
5、代码自上向下执行
6、一般情况下，函数执行上下文，进栈执行后，会默认出栈释放掉[私有上下文中存储的私有变量和一些值都会被释放]
目的：为了优化内存空间，减少内存消耗，提高页面或计算机处理速度

**闭包**：函数执行形成私有上下文，此上下文中的私有变量，和上下文以外的变量互不干扰；也就是当前上下文把
这些变量保护起来了，我们把函数这种保护机制称为闭包[闭包不是具体代码，而是一种机制]；
上下文不被释放，保护了私有变量，变量和存储值不被释放，保存起来[保存]
利用这两种机制可实现高阶编程技巧

**不能出栈释放**：当前上下文中某些内容[一般指堆空间]被上下文以外的事务占用了，则无法释放
假设一旦被释放，后期外部事务就无法找到对应的内容了

作业 3：

```
var a=1;
var obj ={
   name:"tom"
}
function fn(){
   var a2 = a;
  //  console.log(obj2)
   obj2 = obj;
   a2 =a;
   obj2.name ="jack";
}
fn();
console.log(a);
console.log(obj);

//obj2不是私有的，向全局找，如果全局也没有
    //  情况1：输出obj2  直接报错  Uncaught ReferenceError: obj2 is not defined
    //  情况2：赋值操作  相当于给window设置一个obj2的属性，并且赋值  window.obj2=0x001
    a2 = a; //私有a2=1
    obj2.name = "jack"; //遇到obj2，但是发现全局没有这个变量，它会继续再看window下是否有这个属性，如果window下有这个属性，则获取属性值，如果window下也没有这个属性，则报错（未定义变量） ->把0x001中的name属性值改为'jack'


// VO(G):全局变量对象「全局上下文中声明的变量」
// GO「window」:全局对象 「浏览器默认开辟的一个堆内存，存储供JS调用的各种API的」
console.log(a);//首先看VO(G)中是否有，如果没有，则再看GO中有没有，如果也没有，则报错：a is not defined

// 在全局上下文中
var n = 10;
//老版本机制：VO(G)中声明一个n的全局变量，赋值10；特殊：“全局上下文”中，“基于var/function声明”的变量，也相当于给GO新增私有属性；并且之间存在映射关系「一个修改，另外一个也跟着修改」；
//新版本机制：“全局上下文”中，“基于var/function声明”的变量，直接都当做GO的属性存储起来；

基于let/const声明的变量，只是给VO(G)中设置全局变量，和GO没有任何的关系；

```

作业 4：

```
 * EC(G)变量提升
 *   var a;
 *   fn=0x000; [[scope]]:EC(G)
 *!/
var a = 1;
function fn(a) {
    /!*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:a=1
     *   变量提升:
     *     var a; 「没用了：因为此时私有上下文中已经有a了，不会重复声明」
     *     a=0x001; [[scope]]:EC(FN) 「不会重复声明，但是需要重新赋值」
     *!/
    console.log(a); //=>函数
    var a = 2; //私有a重新赋值为2
    function a() {}
    console.log(a); //=>2
}
fn(a); //fn(1)
console.log(a); //=>1
```

**_a、变量提升_**

**_当前上下文中_**（全局、私有、块级），js 代码自上而下执行之前，浏览器会提前处理一些事情（可以理解为词法解析的一个环节，词法解析一定发生在代码执行之前【编译阶段】）

声明 var a

定义是赋值 a = 10

会把当前上下文中带有 VAR/FUNCTION 关键字的进行提前的声明或者定义

全局上下文中的变量提升
EC(G)只有 VAR/FUNCTION 会变量提升(ES6 中 LET 和 CONST 不会)

```
func=函数 函数在这个阶段赋值都做了
func()
function func(){}
```

```
var func = function （）{
真实项目中建议用函数表达式创建函数，因为这样在变量提升阶段只会声明，不会赋值
}

func()
```

```
var func = function AAA(){
把原本作为值的函数表达式匿名函数“具名化”,（虽然是具名化，这个名字不能在外面访问=》也就是不能在当前上下文中创建这个名字）
当函数执行，在形成的私有上下文中，会把这个具名的名字作为私有上下文中的变量（值就是这个函数）来进行处理
AAA --> 当前函数
AAA() 递归调用，一般递归是有结束条件
}
AAA()// AAA is not defined
func（）


setTimeout（function func（）{
   func（）
}，1000）

```

**基于'VAR 或者 FUNCTION 在全局上下文中声明的变量-全局变量，会映射到 GO 全局对象 window 上一份，作为他的属性；而且接下来是一个修改，另外一个也会跟着修改'**

```
if(!("a" in window)){
   var a = 1
}

console.log(a)// undefined
```

**不论条件是否成立，都需要变量提升（条件中带 function 的新版本中浏览器中只会提前声明，不会再提前赋值了）**

**_b、this 的几种情况_**

```
var x = 3,
    obj = {x: 5};
obj.fn = (function () {
    this.x *= ++x;
    return function (y) {
        this.x *= (++x)+y; 14 * 13+4
        console.log(x);
    }
})();
var fn = obj.fn;
obj.fn(6);
fn(4);
console.log(obj.x, x);
```

this: 函数的执行主体（不等价于执行上下文「作用域」） -> 谁把这个函数执行的
 *   人具备的方法：吃饭
 *   王光慧“童鞋”，早上去北京大饭店吃饭「鸡蛋灌饼，加 10 个鸡蛋」
 *     + 谁吃饭？ 王光慧「方法执行主体:this」
 *     + 在哪吃饭？北京饭店「方法执行作用域:scope」
 \*
 * 想要分清楚函数执行的执行主体(this)，可以按照如下的规律来分析:
 *   + 事件绑定
 *     + 不论是 DOM0 还是 DOM2 级事件绑定，给元素 E 的某个事件行为绑定方法，当事件触发方法执行，方法中的 this 是当前元素 E 本身
 *     + 特殊情况：
 \*
 *       + IE6~8 中基于 attachEvent 实现 DOM2 事件绑定，事件触发方法执行，方法中的 this 不在是元素本身，大部分情况都是 window
 *       + 如果基于 call/apply/bind 强制改变了函数中的 this，我们也是以强制改变的为主
 *   + 普通函数执行
 *     + 函数执行，看函数前面是否有“点”，有“点”，“点”前面是谁 this 就是谁，没有“点”this 是 window「JS 严格模式下是 undefined」
 *       fn() -> this:window/undefined
 *       obj.fn() -> this:obj
 *       xxx.**proto**.fn() -> this:xxx.**proto**
 *       ...
 *     + 自执行函数执行：其内的 this 一般都是 window/undefined
 *     + 回调函数中的 this 一般也是 window/undefined，除非做过特殊的处理
 *     + 括号表达中的 this 很变态
 *     + ...
 *   + 构造函数执行
 *   + 箭头函数执行
 *   + 基于 call/apply/bind 强制改变 this
 *
 * 在浏览器端运行 JS 代码，非函数中的 this 一般都是 window；研究 this 都是+
 * 研究函数中的 this；有一个特殊的，就是 ES6+中“块级上下文”中的 this，是其所在上下文中的 this「理解为：块级上下文是没有自己 this 的」；

JS 中 THIS 的五种情况梳理事件绑定函数执行（包括

自执行函数）

new 构造函数

箭头函数

call/apply/bind

截图++++++

```
var foo = 1；

function  bar(){
    //var foo 变量提升
    if(!foo){
        var foo = 10;
    }
    console.log(foo)//10
}


var foo = 1；

function  bar(){
    //var foo 变量提升
    if(false){
        var foo = 10;
    }
    console.log(foo)//undefined 找自己私有 变量提升
}
```

[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table)

成员访问 20

##### 2、函数底层处理机制（创建+执行）

创建函数：和创建变量区别不大，->【函数名其实就是变量】

1、单独开辟一个堆内存【16 进制地址】，函数的堆内存中存放的是函数体中的“代码字符串”

2、创建函数的时候，就声明了作用域（scope），也就是所在的上下文环境

3、把 16 进制的地址存放到栈中，共变量（函数名等）关联引用即可

执行函数：

执行函数目的：

```
var x = [12, 23];
function fn(y) {
y[0] = 100;
y = [100];
y[1] = 200;
console.log(y);
}
fn(x);
console.log(x);
```

###### ++i 和 i++ 的区别？

相同点：都是在自身基础上累加 1
不同点：计算和累加的顺序
++i ：自身先累加 1，根据累加后的结果进行运算
i++：先根据原始值进行运算，运算完成后再累加 1

(5 + i++); // 5+(i++) 都是一样的效果 -> 5+i=6  i++:i=2

i++和++i 一定是数学运算「“+N”也是把 N 变为数字类型的值」

##### 闭包：函数执行形成一个私有上下文，此上下文中的私有变量，和上下文以外的变量互不干扰，也就是当前上下文把这些变量保护起来了，我们把函数的这种保护机制称为闭包。【闭包不是具体的代码，而是一种机制】

形成的私有上下文不被释放，此时不仅保护私有变量，而且变量和存储的值也不会被释放，保存起来了。
保护、保存这两种机制，可以实现高阶编程技巧。

```
var x = 100;
function fn(){
   var x = 200;
   return function (y) {
       console.log(y+x++)
   }
}
var f = fn();
f(10);
f(20);
```

###### 3、闭包作用域练习题 1（浏览器垃圾回收机制）

```
let x = 5;
function fn(x) {
    return function(y) {
    console.log(y + (++x));
}
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x);
```

###### 4、闭包作用域练习题 2

```
let a=0,
b=0;
function A(a){
    A=function(b){
    alert(a+b++);
};
    alert(a++);
}
A(1);
A(2);
```

专题练习：

1、手写防抖函数
函数防抖（debounce）和节流（throttle），在高频触发场景下需要防抖和节流。

频繁的事件触发：

window 的 resize、scroll

mousedown、mousemove

keyup、keydown ......

防抖：触发事件后 n 秒后才执行，如果在 n 妙内又触发了事件，则会重新计算函数执行事件。

```
function debounce(func,wait,immediate){


 if (typeof func !== "function") throw new TypeError("func must be an function!");
    if (typeof wait === "undefined") wait = 500;


    var timeout,result;
    return function(){
       var self = this;
       var args = arguments;
       if(timeout) clearTimeout(timeout);
       if(immediate){
           //如果已经执行过，不再执行
           var callNow = !timeout;
           timeout = setTimeout(function(){
                timeout = null
           },await)
           if(callNow) result = func.apply(self,args)
       }else{
           timeout = setTimeout(function(){
           result =  func.apply(self,args)
       },wait);
       }
       return result;
    }
}


注意四个问题：
1、this指向
2、event对象
3、返回值
4、判断是否是立刻执行

```

2、手写节流函数

原理：如果持续触发事件，每隔一段时间，只执行一次。

根据首次是否执行以及结束后是否执行，效果有所不同，实现方式也有所不同。

leading：代表首次是否执行

trailing：结束后是否再执行一次

关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

```
//节流--使用时间戳
function throttle(){
    var self,args;
    var previous = 0;
    return function(){
        var now = new Date()
        self = this;
        args = arguments;
        if(now - previous > await){
            func.apply(self,args)
            previous = now;
        }
    }
}
```

```
//节流--使用定时器
function throttle(){
    var timeout;
    var previous = 0;
    return function(){
        context = this;
        args = arguments;
        if(!timeout){
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context,args)
            },await)
        }
    }
}
```

```
// 第三版
function throttle(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args)
    };

    var throttled = function() {
        var now = +new Date();
        //下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
         // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}
```

```
function throttle(func, wait) {
    if (typeof func !== "function") throw new TypeError("func must be an function!");
    if (typeof wait === "undefined") wait = 500;
    let timer = null,
        previous = 0; //记录上一次操作的时间
    return function proxy(...params) {
        let self = this,
            now = new Date(), //当前这次触发操作的时间
            remaining = wait - (now - previous);
        if (remaining <= 0) {
            // 两次间隔时间超过wait了，直接执行即可
            clearTimeout(timer);
            timer = null;
            previous = now;
            func.call(self, ...params);
        } else if (!timer) {
            // 两次触发的间隔时间没有超过wait，则设置定时器，让其等待remaining这么久之后执行一次「前提：没有设置过定时器」
            timer = setTimeout(function () {
                clearTimeout(timer);
                timer = null;
                previous = new Date();
                func.call(self, ...params);
            }, remaining);
        }
    };
}
```

#### 第二座大山：面向对象程序设计

##### 1、对象思想开发出来的编程语言，所以我们学习和开发 JS 的时候，也要按照面向对象的思想去处理！！

**内置类：**

每一种数据类型都有一个自己所属的内置类：Number 数字类(每一个数字/NaN/Infinity 都是它的实例)、String、Boolean、Symbol、BigInt、Array、RegExp、Date、Function、Object...

- 每一种 DOM 元素也都有自己所属的类：
  window -> Window -> WindowProperties -> EventTarget -> Object
  document -> HTMLDocument -> Document -> Node -> EventTarget -> Object
  div -> HTMLDivElement -> HTMLElement -> Element -> Node -> ...

* HTMLCollection / NodeList / CSSStyleDeclaration /  DOMTokenList ...

学习数组，首先分析一个数组（实例），研究清楚这个实例的特征后（含：结构特点和常用方法等），我们再遇到其他的数组，直接也是按照相同的机制进行处理的

**自定义类**：

创建一个函数 fn

fn() 普通函数执行「堆栈机制」

new fn() 构造函数执行 「堆栈机制 + 面向对象机制」

```
function Fn() {
    /*
     * EC(FN)
     *   初始创建Fn找个类的一个实例对象  0x000
     *   初始THIS:this->0x000
     */
    let total = 0; //上下文的私有变量  和实例对象没有必然的联系
    this.x = 10; //this.xxx=xxx 都是给实例对象设置的私有属性和方法
    this.y = 20;
    this.say = function () { //0x000.say=0x100   0x001.say=0x101
        console.log('SAY');
    };
    /* 如果不设置返回值，或者返回值是一个基本类型值，默认都会把实例对象 0x000 返回；如果手动返回的是一个引用数据类型值，则以自己返回的为主； */
    // return {
    //     name: 'zhufeng'
    // };
}
let f1 = new Fn(); //->0x000
```

检测某个成员（属性/键）是否属于这个对象，或者是否属于这个对象的私有属性

in:检测成员是否属于这个对象「特点：不论是私有属性，还是公有的属性，只要有则检测结果就是 true」

hasOwnProperty:用来检测当前成员是否为对象的私有属性「特点：只有是私有属性，结果才是 ture，哪怕有这个属性，但是属于公有的属性，结果也是 false」

** for in 遍历的时候**
      无法遍历 Symobol 的私有属性
      但是可以遍历到自己扩展的公共属性「内置的公共属性是不可枚举的（就是无法遍历到的）」
      优先遍历数字属性，而且按照从小到大（不会严格按照属性书写的顺序）

很多对“对象”的操作是无法拿到 Symbol 属性的

```
 for (let key in obj) {
    console.log(key); //->‘name’ ‘AAA’  
    // for in遍历的时候
    //  + 无法遍历Symobol的私有属性
    //  + 但是可以遍历到自己扩展的公共属性「内置的公共属性是不可枚举的（就是无法遍历到的）」
    //  + 优先遍历数字属性，而且按照从小到大（不会严格按照属性书写的顺序）
}
```

/\* // 解决：能够避免遍历公共的

```
for (let key in obj) {
    if (!obj.hasOwnProperty(key)) break;
    //已经遍历到公共的，则私有已经遍历完，结束循环
    console.log(key); //->'name'
}
```

解决：只想遍历私有的，包含 Symbol 的
Object.keys:获取一个对象非 Symbol 的私有属性（结果是一个数组，数组中包含获取的属性）  
类似的还有：Object.getOwnPropertyNames
Object.getOwnPropertySymbols:只获取 Symbol 的私有属性（结果也是一个数组）

##### 2、new fn() 构造函数执行与 fn() 普通函数执行异同：

相同：

一样把函数执行（传递参数也是一样）

形成私有上下文[按照步骤逐一处理

也存在私有变量

...

不同：

new 执行，浏览器会在当前上下文中，默认创建一个对象（实例对象）

在初始化 this 的时候，会让 this 指向这个实例对象

代码编写中，this.xxx = xxx 的操作，都是在给实例对象设置私有属性

除这些操作，其他的操作和实例对象没有直接关系

函数如果没有返回值，或者返回的是基本类型值，则默认返回创建的实例对象；如果自己返回的是应用类型值，以自己的返回为主。

构造函数执行：函数成为类，返回结果是类的一个实例。

##### 3、面向对象基础「搞定原型和原型链」-

JS 中面向对象的底层处理机制：

1、每一个函数数据类型（除箭头函数），都天生自带一个属性：prototype 原型属性，属性值是一个对象（Function.prototype 除外），并且原型对象中自带一个属性：constructore，属性值是当前构造函数本身。
普通函数、箭头函数、生成器函数

构造函数[自定义类]

内置类[内置构造函数]...

prototype 针对类有用，对于普通函数没啥用

**存储供当前类所属实例调用的公共属性和方法**

2、每一个对象类型值，都天生自带一个属性：**proto**原型链属性（隐式原型），属性值指向所属类的原型对象 prototype

普通函数、数组对象、正则对象、日期对象...

prototype 原型对象

实例对象

函数也是对象

所有对象都是 Object 内置类的一个实例

...
**为了找到所属类原型上的公共方法**

**原型链**：首先找自己私有的属性，私有中存在的就是私有属性；私有中不存在，则默认基于**proto**找所属类 prototype 上的，如果还没有，则基于 prototype 上的**proto**继续向上查找...直到找到 Obeject.prototype 为止【我们把这个查找机制称为原型链】

**proto**:null

为什么是 null？

Object.prototype 原型对象也是对象类的一个实例，**proto**如果要指向就是指向自己，这样没有意义；所以作为基类上的**proto**是 null 即可

3、原型重定向的处理

构造函数的‘原型重定向’

优势：

1、把原型上其实例提供的公共属性和方法，全部写在一起了，提高整体性后者模块性

2、向其原型上扩展方法会容易些

弊端：

1、重定向后的原型对象中，缺失了 constructor 属性
解决：
fun.prototype = {
手动设置 constructor:fun ，保证结构完整性
}

2、 如果原始内置的原型对象中具备了一些属性和方法，此时重定向之后，之前设置的公共属性方法就丢失了

解决：

fun.prototype = Object.assign(fun.prototype,{...})

这种合并的办法，Fn.prototype 还是之前的堆地址，只不过是把新对象中的内容全部扩展到了原始的堆中 \*/

**Object.assign:合并两个对象「浅比较」**

Object.assign(obj1, obj2)); //->浅比较：obj2.n 直接覆盖 obj1.n

Fn.prototype = Object.assign({}, Fn.prototype, proto); //->这样合并，最后返回的是一个全新的对象，由于内置的 Fn.prototype 中的 constructor 是内置的不可枚举的属性，所以合并后也是无法赋给新对象的 \*/

```
/* let obj = {
    fn1() {},
    fn2: function fn2() {}
    // 两者写法的区别：
    //   + 第一种写法：obj.fn1函数是没有prototype属性的 「不能被作为构造函数」
    //   + 第二种写法：和正常的函数没有区别
};
```

**内置原型扩展方法**

Array String Number Symbol RegExp Date ...

Element Node EventTarget Nodelist HTMLCollection

/\*
 * 向内置类的原型扩展方法
 *   + 内置类的原型上提供了很多内置方法，但是这些方法不一定完全满足业务需求，此时需要我们自己扩展一些方法
 *  「优势」
 *   + 调用起来方便
 *   + 可以实现链式写法
 *   + 限定调取方法的类型，必须是指定类的实例
 *   + 扩展的方法，各个模块「其他成员」都可以直接的调用
 *   + ...
 *  「弊端」
 *   + 自己扩展的方法，容易覆盖内置的方法 （解决：自己设定的方法名要设置前缀 myUnique）
 *     Array.prototype={...} 这样操作是无效的，也怕你一行代码，把数组方法全干没了
 *   + 基于 for in 遍历的时候，会把自己扩展到原型上的方法也遍历到
 *   + ...
 */

所有对象都是 Object 的一个实例
它的**proto**直接指向 Object.prototype 纯粹的对象

通过它的原型链一层层找，最后能找到 Object.prototype 的

所以所有的对象，都可以调取 Obeject.prototype 上的方法

“链式写法”：执行完成一个方法，返回的结果是某个实例，则可以继续调用这个实例所属类原型上的方法...

```

// Array.prototype.unique = function unique() {
//     // this:一般都是当前要操作的实例(也就是要操作的数组)
//     let obj = {},
//         self = this;
//     for (let i = 0; i < self.length; i++) {
//         let item = self[i];
//         if (obj.hasOwnProperty(item)) {
//             // 数组之前出现过这一项，当前项就是重复的，我们此时删除当前项即可
//             self.splice(i, 1);
//             i--;
//             continue;
//         }
//         obj[item] = item;
//     }
//     return self; //实现链式写法
// };



arr.sort().reverse().push("zrb")
```

##### 4、面向对象进阶：

一、**new 执行的原理**
1、创建实例对象
2、会像普通函数一样，让其执行[THIS 指向实例对象]
3、返回值没有或者是基本值，则返回的是实例对象（处理返回值）

```
function _new(Ctor, ...params) {
    // 1.创建一个实例对象「创建Ctor类的实例：实例.__proto__ -> 类.prototype」
    /* let obj = {};
    obj.__proto__ = Ctor.prototype; */
    let obj = Object.create(Ctor.prototype);
    // 2.把函数执行「THIS指向实例对象」  call->执行函数,改变函数中的THIS
    let result = Ctor.call(obj, ...params);
    // 3.处理返回值
    if (result !== null && /^(object|function)$/.test(typeof result)) return result;
    return obj;
}
```

二、函数多种角色

函数的多种角色：
函数:（第一角色：函数 一等公民）
普通函数-->作用域
构造函数[类] --> 原型和原型链
对象：-->键值对
三种角色之间没有必然联系

所有的函数都(普通函数、自定义函数、内置构造函数)是 Function 内置类的实例

```
函数.__proto__ = Function.prototype
```

Function.prototype:类型是一个 empty/anonymous
匿名空函数（）

三、this 的处理和应用（5 中情况梳理）

事件绑定

函数执行（包括自执行函数）

new 构造函数

箭头函数：没有 this，用到的 this 都是所处上下文中的 this

call/apply/bind

Function.prototype call applay bind 都是用来改变 this 指向，以后函数执行调用这三个方法就可以实现 this 的改变

==CALL/APPLY== 都是立即执行函数，并且改变函数中的 THIS，再并且给函数传递参数信息

==BIND== 并不会把函数立即执行，它是预先处理函数中的 THIS 和参数的

#### 面向对象作业题讲解

```
//ES6基于class创建类
class Model {
    //给实例设置私有属性
    //构造函数体
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    // z = 100 // 相当于在构造函数体中this.z = 100
    //构造函数原型上设置方法[实例的公共属性],设置方法可以，设置属性不可以
    gexX(){
        console.log(this.x);
    }
    getY(){
        console.log(this.y);
    }
    //给构造函数设置静态属性方法[把它当做普通对象] Model.setNumber()
    static n = 200
    static setNumber(n){
        this.n = n
    }
}
Model.prototype.z = 100
let m = new Model()
```

```
var a = ?;
if (a == 1 && a == 2 && a == 3) {
console.log('OK');
}
```

绝对相等：左右两边类型和值都相等

相等：左右两边类型不同，会默认先转换为形同类型再去比较

对象==字符串：对象转字符串    
 *    null==undefined：相等，但是和其它值都不等
 *    NaN==NaN：false NaN 和谁都不相等
 \*     剩余的都是转换为数字

对象->数字/字符串
 *    + 先调取这个属性 Symbol.toPrimitive
 *    + 没有这个属性，再去调用 valueOf 获取原始值「基本类型值」
 *    + 没有原始值，再去调用 toString 变为字符串
 *    + 如果最后是转换为数字，再去调用 Number，把字符串转换为数字

```

// 方案1:数据类型转换

/* var a = {
   i: 0
};
// Symbol.toPrimitive/valueOf/toString...
a[Symbol.toPrimitive] = function () {
   // this -> a
   return ++this.i;
};
if (a == 1 && a == 2 && a == 3) {
   console.log('OK');
} */
/* var a = [1, 2, 3];
a.toString = a.shift;
if (a == 1 && a == 2 && a == 3) {
   console.log('OK');
}


// 方案2：数据劫持
//   + 在全局上下文中基于var/function声明变量，相当于给window设置对应的属性  -> window.a
//   + Object.defineProperty劫持对象中某个属性的获取和设置等操作
var i = 0;
Object.defineProperty(window, 'a', {
   get() {
       // 获取window.a的时候触发getter函数
       return ++i;
   },
   // set(value) {
   //     // 设置window.a属性值的时候触发setter函数
   // }
});
```

```

/*
* 编写queryURLParams方法实现如下的效果（至少两种方案）
*/
let url="http://www.zhufengpeixun.cn/?lx=1&from=wx#video";
console.log(url.queryURLParams("from")); //=>"wx"
console.log(url.queryURLParams("_HASH")); //=>"video"

```

使用正则

```

/* String.prototype.queryURLParams = function queryURLParams(key) {
    // this->url  key->property
    // 获取信息
    var self = this,
        link = document.createElement('a'),
        hash = '',
        search = '',
        result = {};
    link.href = self;
    hash = link.hash;
    search = link.search;
    // 解析结果
    if (hash) {
        hash = hash.substring(1);
        result['_HASH'] = hash;
    }
    if (search) {
        search = search.substring(1);
        search.split('&').forEach(function (item) {
            item = item.split('=');
            result[item[0]] = item[1];
        });
    }
    // 返回信息
    return typeof key === "undefined" ? result : result[key];
}; */
/* String.prototype.queryURLParams = function queryURLParams(key) {
    var self = this,
        result = {};
    self.replace(/#([^?#=&]+)/g, function (_, $1) {
        result['_HASH'] = $1;
    });
    self.replace(/([^?#=&]+)=([^?#=&]+)/g, function (_, $1, $2) {
        result[$1] = $2;
    });
    return typeof key === "undefined" ? result : result[key];
};


```

##### 对象、数组克隆[浅克隆]

es6 循环遍历   内置方法
浅克隆：只处理对象或数组的第一级内容，剩下的都是**公用**的，这样克隆后的结果和之前还是有一定的关联
深克隆：
JSON.parse/stringify[变为字符串，再变为对象，这样所有的内存会重新开辟]；
无法转为字符串，不是所有的值都支持：
正则变为空对象
BigInt 处理不了，会报错
属性为 undefined 或者函数的都会消失
日期对象变为字符串后转换不回来
ArrayBuffer...

```
  /**
     * 判断给定的对象是否是一个普通对象
     * @method isObject
     * @param { * } object 需要判断的对象
     * @return { Boolean } 给定的对象是否是普通对象
     */
    utils.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'], function (v) {
        UE.utils['is' + v] = function (obj) {
            return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
        }
    });
```

```
function shallowClone(source,target){
 //数组或对象，基于循环的方案处理
 //处理判断数据类型
  var tep;
  target = target || {}
  for(var i in source){
    if(source.hasOwnProperty(i)){
        tep = source[i];
        if(typeof tep == "object"){
            target[i] = Array.isArray(tep) ? [] : {};
            shallowClone(source[i], target[i])
        }else{
            target[i] = tep;
        }
    }
  }
}
```

#### 异步同步

“Ajax 串行”
传统实现异步操作，并且是串行的模式下，基本都是回调函数嵌套回调函数“回调地狱”问题。

异步：上面的事情没有完成，也不会等，下面的事情继续处理

同步：上面事情没处理完之前，下面事情是无法去处理的

需要优秀的代码管理模式，能够有效的管理异步编程中的代码，通过这种代码管理思想，让代码开发起来更便捷，维护起来更方便，可读性更强。JS 设计模式 Promise 设计模式就是异步编程

##### Promise：ES6 新增加的类，它是一种承诺模式，有效管控 JS 中的异步编程，可以解决异步编程中产生的回调“地狱”；

- PROMISE 的 executor 函数和状态

executor

PROMISE 状态

pending 初始状态

fulfilled/resolved 操作成功完成

rejected 操作失败

- PROMISE 中的 THEN 和 CATCH

then(func1,func2) / then(func)

catch(func)then 链机制

- PROMISE 中其它常用方法

Promise.all 取决于多个 promise 实例中是否出现有失败态的

Promise.race

Promise.reject

Promise.resolve 直接返回指定状态的 promise 实例

```
const myFirstPromise = new Promise((resolve, reject) => {
  // ?做一些异步操作，最终会调用下面两者之一:
  //
  //   resolve(someValue); // fulfilled
  // ?或
  //   reject("failure reason"); // rejected

  resolve执行：修改promise实例的态,fulfilled/resolved,
  成功的结果就是传递的实参信息

  reject执行：修改promise实例的状态rejected,失败的原因也是传递的实参信息

//resolve("ok")
//立即修改状态和值，通知基于then注入的方法，此时.thena还没执行，不知道通知谁来执行，先把通知执行操作保存起来，"通知对应注入这个方法执行"这个操作是异步，只是把它排列到等待任务队列中，当其他事情处理完，再次返回头，通知对应注入方法执行
 });
```

//new promise 的时候
//立即执行传递的 executor 函数[同步]
//在 executor 函数中一般用来管控一个异步的操作
//而且传递给 executor 函数两个参数，resolve，reject，并且这两个参数都是函数
//创造 Promise 类的一个实例：
//[[PromiseState]]promise 状态：pending 准备状态 fulfilled/resolved 成功 兑现状态 rejected 失败(已拒绝)
//[[PromiseResult]]promise 值：默认是 undefined，一般存储成功的结果或者失败的原因

ps：new Promise 创建实例，其状态和结果，取决于：executor 函数中的 resolve/reject 执行 & executor 函数执行是否报错

.then(onfulfilled,onrejected)
onfulfilled,onrejected 返回的新实例，其成功或者失败
.catch(onrejected) ==> .then(null,onrejected)如果某个参数不处理，会顺延到下一个.then 中指定状态要执行的方法

返回结果是一个全新的 Promise 实例，则这个实例的成功或失败等内容决定了 P2 的成功或者失败等内容

//**proto**  ==> Promise.prototype:then/catch/finally

//真实项目中，在多个 then 链下，其余的 then 方法基本都存放的是成功处理的事情，最后一个 then 存放失败的 ，这样不论是第一次或者其中一次，导致 promise 实例状态是失败的，都会**延顺**到最后一个失败的处理函数上进行处理...

then(null,reason => {...}) 用 catch(reason=>{...})来代替

.then
  当前实例状态已经是成功或者失败，此时创建一个异步微任务，等待同步业务结束，根据成功或者失败，来决定执行哪个方法
如果此时的状态还是 pending，则直接把方法存储起来即可，没有创建异步的微任务
resolve/reject 的时候，创建一个异步任务，等待同步结束后，根据状态执行基于.then 动态存储的函数

then(onfulfilled,onrejected):执行 then 方法只是把 onfulfilled,onrejected 函数保存起来[同步]，但是此时还没有执行，当 promise 状态变为成功或者失败的时候，才会去触发执行对应的函数【异步->微任务】

//同时处理多个 Promise 实例：
//Promise.all 等待所有的 Promise 实例都成功，整体返回状态才是成功，只是有一个失败，整体状态就是失败 -- 都成功，result 是按照之前设定的顺序依次存储每一个 promise 的结果
//只要在处理过程中有一个失败的，则立即结束处理，p 也是失败的，谁失败的，记录谁失败的原因
//Promise.race 看多个实例谁先处理完，先处理完的状态[不论是失败还是成功]就是最后整体的状态
//ajax 并行：同时发送多个异步的 ajax 请求（三者之间没有依赖关系），但是需要所有的异步请求都处理成功后，再去统一做什么事情

**async await [ES7 增加]**

async:修饰函数，最后默认让函数返回一个 promise 实例（函数执行报错，实例状态是失败，结果是报错原因；否则实例状态是成功，结果是 return 后的值）--一般都配合 await 的[函数中使用 await，则必须基于 asnc 修饰才可以

await “promise 实例”：如果设置的不是 promise 实例
  + 正常的值  await 10 -> await Promise.resolve(10)
  + 函数执行  await xxx() -> 首先立即执行 xxx 函数，接收它的返回值 -> await 返回值
本身是异步微任务：把当前上下文中 await 下面要执行的代码整体存储到异步的微任务中，当 await 后面的 promise 实例状态为成功后，再去执行下面的代码(也就是那个异步的微任务)

对失败的 promise 实例没有做异常的处理，则控制台抛出异常信息「不会影响后续代码执行」

//    + promise.catch(reason=>{})
//    + await 需要自己基于 try catch 做异常捕获

练习题：

```
 let body = document.body;
body.addEventListener('click', function () {
    Promise.resolve().then(() => {
        console.log(1);
    });
    console.log(2);
});
body.addEventListener('click', function () {
    Promise.resolve().then(() => {
        console.log(3);
    });
    console.log(4);
});



setTimeout(() => { //宏任务1
    console.log('a');
});
Promise.resolve().then(() => { //微任务1 「进入到微任务队列即执行」
    console.log('b');
}).then(() => { //微任务2 「微任务1执行完即可」
    return Promise.resolve('c').then(data => { //微任务4 「进入到微任务队列立即执行」
        setTimeout(() => { //宏任务2
            console.log('d')
        });
        console.log('f');
        return data;
    });
}).then(data => { //微任务3 「微任务2执行完，并且告知其promise实例是成功的才可以执行」
    console.log(data);
});
```

```
function func1() {
    console.log('func1 start');
    return new Promise(resolve => {
        resolve('OK');
    });
}
function func2() {
    console.log('func2 start');
    return new Promise(resolve => {
        setTimeout(() => {//宏任务2
            resolve('OK');
        }, 10);
    });
}
console.log(1);
setTimeout(async () => {//宏任务1
    console.log(2);
    await func1();
    console.log(3);//微任务3
   
}, 20);
for (let i = 0; i < 90000000; i++) {} //循环大约要进行80MS左右
console.log(4);
func1().then(result => {//微任务1
    console.log(5);
});
func2().then(result => {//微任务2
    console.log(6);
});
setTimeout(() => {//宏任务3
    console.log(7);
}, 0);
console.log(8);
```

首先在微任务中查找，如果有"可执行的”，一定先执行微任务，再去执行宏任务。

微任务执行顺序：

“可执行“才可以拿出来执行，如果多个可执行，谁先放置的 先执行谁

宏任务执行顺序：

可执行“才可以拿出来执行，如果多个可执行，看谁先到的[定时器]

**Promise A**

(JS 实现 Promise「遵循的是 Promise A Plus 规范）https://promisesaplus.com/]
