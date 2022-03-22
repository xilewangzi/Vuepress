---
title: Js高级程序设计你不知道的那些事儿
date: 2019-04-01
categories: Work
author: grace
tags: 
 - JavaScript
---

写在开头：

为了学习方便，js程序分成两个阶段学习，JS初级和js高级阶段，js高级有很多需要理解的概念，重在理解！让我们愉快的开始学习吧。

一、面向对象

1、对象，JavaScript是一种面向对象编程(OOP)语言。一种编程语言可以被称为面向对象的，它为开发者提供了四种基本功能：

1)抽象

2)继承（父级对子级功能的开放和共享）

3)封装（将抽象得到的数据和行为相结合，形成一个整体，对外隐藏属性和实现细节，只对外提供接口）

4)多态（同一操作作用于同类但不同的对象上面，可以产生不同的解释和不同的执行结果

对象是由属性和方法。如果属性包含一个函数，它被认为是一个对象的方法，否则，该属性被认为是一个属性。

2、创建对象方法（自定义对象）：

1）字面量法

字面量创建对象

var car = {

name:"didi",

age:5

run:function(){

console.log("跑的快")}

};

2)new+构造函数

var obj = new Object();

3)工厂模式创建

创建工厂函数

function factory(name,age){

var newObj = {};

newObj.name = name;

newObj.age = age;

newObj.say = function(){

console.log(this.name);};

return newObj;}

使用构造函数创建对象

var person = factory("tom",28);

4)动态原型方式创建




01
3、对象属性的增删改查

Obj[属性名]注意区别！属性加双引号，变量不加Obj[变量]

car.name =“baoma”

4、对象属性的getter()、setter()

我们知道，对象属性是由名字、值和一组特性（attribute）构成的。在ECMAScript 5中，属性值可以用一个或两个方法替代，这两个方法就是getter和setter。由getter和setter定义的属性称做「存取器属性（accessor property）」，它不同于「数据属性（data property）」，数据属性只有一个简单的值。

当程序查询存取器属性的值时，JavaScript 调用getter方法。这个方法的返回值就是属性存取表达式的值。当程序设置一个存取器属性的值时，JavaScript 调用setter方法，将赋值表达式右侧的值当做参数传入setter。从某种意义上讲，这个方法负责「设置」属性值。可以忽略setter方法的返回值。

和数据属性不同，存取器属性不具有可写性（writable attribute）。如果属性同时具有getter和setter方法，那么它是一个读/写属性。如果它只有getter方法，那么它是一个只读属性。如果它只有setter方法，那么它是一个只写属性，读取只写属性总是返回undefined。定义存取器属性最简单的方法是使用对象直接量语法的一种扩展写法。例如：

varo = {// 普通的数据属性data_prop: value,// 存取器属性都是成对定义的函数get accessor_prop() {/*这里是函数体 */},    set accessor_prop(value) {/* 这里是函数体*/}};

存取器属性定义为一个或两个和属性同名的函数，这个函数定义没有使用function关键字，而是使用get或set。注意，这里没有使用冒号将属性名和函数体分隔开，但在函数体的结束和下一个方法或数据属性之间有逗号分隔。

set可以用于修改私有属性

get获取值

5、对象序列化（serialization）是指将对象的状态转换为字符串，也可将字符串还原为对象。ECMAScript 5提供了内置函数JSON.stringify()和JSON.parse()。

6、for-in循环遍历对象

7、属性查找：首先在自身中查找，如果没有沿着原型链逐级向上查找，最后没有找到返回undefined

8、静态方法：给构造函数添加的方法和属性。

二、高级函数

1、Js中函数属于一等公民，几乎可以出现在任何场景中。（作为参数、函数嵌套函数、函数作为返回值

2、函数分类：官方定义的函数（输出函数都document、alert()、console.log()、输入函数prompt()、变量类型的转换函数Number()、parsenInt()、paeseFloat()、Boolean()、isNaN()、数学函数、Math.random();Math.random()*(n-m)+m、DOM document.getElementByid()）、构造函数、自定义函数

js中绝大数的函数的原型都是object类型的，只有一个例外，就是Function他的原型是一个function

3、创建函数方式：

1)function关键字声明function add(){}

2)字面量方式声明var say = function(){}

3)使用new Function创建函数对象var add = new Function(“a”,”b”);

var function_name = new Function(arg1, arg2, ..., argN, function_body)

创建ab数值互换函数注意形参需使用字符串

var fn = new Function("a", "b", "a = a + b; b = a - b; a = a - b; console.log(a); console.log(b);");

fn(10, 20);

4、函数作用域:形参、实参

Js中是以函数作为局部变量和全局变量区分，没有块元素。

变量声明、函数声明

5、this典型场景:




02



03
6、构造函数，特殊的函数，用于创建同类对象

function Person(){

thhis.name = name;

this.age = age;

this.say(){

}

}

7、使用new关键字执行构造函数（实例对象）

var p1 = new Pereson();

8、构造函数和普通函数的区别：

1）首字母大写

2）内部使用this关键字处理属性赋值逻辑

3）构造函数不使用return关键字返回新对象

4）使用new关键字执行函数

构造函数与实例：实例是new加构造函数创建的对象，新对象叫做构造函数的实例。实例与构造函数之间是多对一的关系。

eg:一个Person函数可以创建无数个Person实例p1 p2 ...pn

new做的一些事儿：new在堆区开辟一片空间用来保存对象；返回堆区对象的引用地址。


04

05
三、原型：作用是为所有实例提供公共的空间，原型内的属性可以提供给构造函数所有实例复用。

1、每一个函数对象都有一个私有原型属性prototype，Person.prototype这个值是一个object类型的对象

实例（对象）都有一个__proto__属性指向构造函数的原型prototype




06



07
2、hasOwnProperty()函数：用来判断某个属性是否是自身的私有属性，是返回true， 原型中的属性或不存在返回false

isprototype()判断一个对象是否是另一个对象的原型。

In关键字可以判断某个属性对象是都可用，准确说对象自身私有属性或者原型属性总存在该属性返回true

3、原型链：原型通过继承关系链接到一起，组成的链型结构，叫做原型链。

原型是函数prototype属性对应的对象，而多个构造函数相互继承，将彼此的原型对象进行关联，组成了一条链型结构。

原型链从下级函数实例的__ptoto__开始  原型链的顶端Object.prototype.__proto__


08
4、继承

继承方式：原型继承、借用构造函数、组合继承、ES6方法继承

1)原型方式继承:

Student.prototype = new Person();

将上级函数的实例，赋值给下级函数的原型

继承目的：下级函数的实例提供多个可共用的原型

原型方式继承：

优点：通过原型方式继承，底层函数可以逐级向上复用上级函数原型空间

缺点：下级函数无法复用上级函数的私有属性初始逻辑，上级函数实例的私有属性会进入到下级函数的原型中，即使是undefined也会被当做有效属性查找

伪造、借用构造函数方式的继承：

优点：可以实现多继承，还可以复用上级函数私有属性初始化逻辑

缺点：此种继承和原型无关，下级函数实例无法复用上级函数的原型

基于以上两种继承方式的优缺点，人们创造而第三种继承方式： 组合方式继承

原型继承：

将上级函数的实例，赋值给下级函数的原型

继承目的：下级函数的实例提供多个可共用的原型

注意！constructor属性位于函数对象中。是原型默认的两个属性之一,他的默认值是原型所属的函数。

当对函数原型进行覆盖型操作时，注意必须修正constructor属性（原型继承）

2)借用构造函数继承（经典继承）

关键代码借用call()、apply()函数

function Student(name, age, stuNum, legs, eyes){

Person.call(this, name, age);

Animal.apply(this, [legs, eyes]);

// this.name = name;

// this.age = age;

this.stuNum = stuNum;}

call、appl继承作用：

可以延长作用域借用构造函数方式支持多继承

区别：两者主要差异在于传参call将函数需要的参数在第二个参数开始按顺序传递，而apply只能讲参数封装成数组传给函数

3）组合继承（原型和组合继承）

function Fruit(color, taste, size){

this.color = color;

this.taste = taste;

this.size = size;}

Fruit.prototype.grow = function(){

console.log("小苹果长大了！");}

创建苹果构造函数

function Apple(color, taste, size, price){

复用上级函数私有属性初始化逻辑

Fruit.call(this, color, taste, size);

this.price = price;}

使用原型继承方式，连接上下级函数原型

Apple.prototype = new Fruit();

Apple.prototype.bad = function(){

console.log("再不吃就烂了！！！");}

创建实例测试继承效果

var apple = new Apple("red", "sweet", "big", 100);

apple.grow();

console.log(apple);

1、可以延长作用域借用构造函数方式支持多继承

2、区别：两者主要差异在于传参call将函数需要的参数在第二个参数开始按顺序传递，而apply只能讲参数封装成数组传给函数

3、基于借用、伪造构造函数方式的继承，并没有关联上下级函数的原型，而是仅仅让下级函数借用了上级函数初始化私有属性的代码。

4）ES6继承

class Person{

constructor(name,age,sex){

this.name = name;

this.age = age;

this.sex = sex;}

walk(){

console.log("你好吗");}

}

class Student extends Person{

constructor(name,age,sex,school,stu_id){

super(school,stu_id);

this.stu_id = stu_id;

this.school = school;}

run(){

console.log("400米");}

}

var student4 = new Student("北大","7号");

console.log(student4);

student4.run();

四、Ajax：是一种浏览器到服务器端通信技术，通常使用脚本发送异步请求。

1、通信原理（核心步骤）

ajax通信过程控制，是通过监听readyState状态码来实现的，而监听是通过onreadystatechange事件监听属性完成的

readyState分5个状态

0）：xhr对象创建

1）：open初始化完成

2）：send请求发送

3）：开始接收返回数据

4)：数据接收完毕




09
注意！//XMLHttpRequest在绝大多数浏览器下都支持。而IE低版本下（ie6）不支持该构造函数，需要使用ActiveXObject该构造函数需要使用对应的参数构造出通信对象["MSXML.XMLHttp.6.0","MSXML.XMLHttp.3.0","MSXML.XMLHttp"]




10
2、get和post的区别：get与post是http通信协议下两种想后台发送请求的方式。post允许传递参数相比get更大，get是k级别的数据量post是m级别的数据量；

post传参数据放在数据报文内部，而get参数拼接在url后面，post更安全；

get相比post方式请求更快，理论上能快一倍

3、jsonp跨域手段




11
4、baiduTemplate Javascript模板引擎：

应用在前端模版系统或则后端JavaScript的环境发布页面，它提供了一套模版语法，用户可以写一个模版区块，每次根据传入的数据生成对应数据产生的Html，渲染不同界面效果；它的优点：愈发简单，学习成本极低，开发效率提升很大，采用javascript的原生语法，所以效率比较高， 默认HTML转义（防XSS攻击），并且支持包括URL转义等多种转义，变量未定义自动输出为空，防止页面错乱，功能强大，如分隔符可自定等多种功能。

五、动画

1、计时器的写法（轮播图）

2、鼠标、键盘位置元素（推箱子游戏）




12
3、游戏（碰撞检测）

4、jQuery动画




13



14
六、一些重要的概念

1、变量声明提升:js是一种脚本语言，执行前没有编译过程，但是有预编译阶段。预编译以代码块或文件为单位,首先检查语法错误，再做做变量声明提升，最后做函数声明提升。当一个区块内代码执行前，js引擎会对该区域代码进行预编译，将所有变量声明提升到代码最顶端，初始化为undefined。

2、函数声明提升：预编译阶段，当前作用域下所有函数对象会被创建完成。

预编译作用：

1）.语法错误检查，如果有错误，不再执行后续操作

2）.变量声明提升

3）.函数声明提升

3、函数柯里化：为函数执行固定的参数固定参数从第二个参数开始按顺序传入。

核心思想：为在复用原函数逻辑代码基础上，为函数指定固定的参数。

function curry(fn){

var args = [].slice.call(arguments, 1);

return function(){

使用slice函数将实参维数组转化为数组，下一部拼接

var innerArgs = [].slice.call(arguments);

固定参数列表拼接自定义参数列表

var argsFinal = args.concat(innerArgs);

执行原有函数 只不过参数列表已经被替换为新列表

return fn.apply(null, argsFinal)}}

4、同源策略：浏览器限制动态访问非同源资源内容。处于安全考虑下不允许使用ajax等异步加载技术非同源内容，也防止外部内容恶意注入。同源三大要素：协议、ip和端口

5、回调函数：作为主函数达到某些固定条件才会执行的函数。通常作为主函数的参数传入主函数中。

6、C/S通信客户端/服务端通信  客户端网游和服务器B/S浏览器/服务端通信 百度等

通信是端与端的数据交互

7、闭包：外部函数返回的，持有外部函数变量的，内部函数。

8、匿名函数：通常出现在不需要使用函数名执行函数的场景。

9、垃圾回收：垃圾回收清理内存中无用的对象，释放内存空间简称GC。

主流垃圾回收方式有两种：标记清除是目前js主流垃圾回收机制，清除逻辑： 首先标记内存中所有对象，检查不再运行环境中的对象，取消标记，检查后 清除不带有标记的对象，释放对应空间。

2）引用计数 因为少数IE核心中bom dom对象仍使用c系列语言实现，所以保留其引用计数垃圾回收方式 逻辑：当一个对象在内存存在一个引用，计数为1每多一个引用计数加一，当垃圾回收执行时，会检查并销毁计数为0的对象

js不推荐程序员主动触发垃圾回收，依赖js核心自动的垃圾回收周期

垃圾回收中所有代码执行暂停，所以不建议程序员自助调用回收函数触发回收。

垃圾回收优化：采用分批次分优先级等算法，尽量减少单次垃圾回收耗时。

10、事件委托：通过上级节点监听事件处理下级节点事件。

事件冒泡：当前节点触发某类事件时，也会从当前节点开始逐级先上，触发上级节点的同类事件。event对象的target属性可以返回触发当前的dom对象

事件委托优点：可以减少页面绑定事件数量，提高页面性能

当子节点动态变化 无需重新处理

例子：

document.getElementById("div1").onclick = function(e){

e = e || window.event;

var curDom = e.target.id;

switch(curDom){

case "btn1":

console.log("这是按钮1");

break;

case "btn2":

console.log("这是按钮2");

break;

case "btn3":

console.log("这是按钮3");

break;

default:

break;}}}


15



16
11、原型链：原型通过继承关系链接到一起，组成的链型结构，叫做原型链。

原型是函数prototype属性对应的对象，而多个构造函数相互继承，将彼此的原型对象进行关联，组成了一条链型结构。

12、匿名函数：没有名字的函数。通常不使用函数名调用此类函数。

13、自执行函数：匿名自执行函数，在函数内部创建了一个独立的命名空间，空间声明变量不会对外部作用域产生污染。外部不会干扰影响内部空间。

七、写在结尾：

归纳整理的不够全面，有待完善。

期待js初级程序设计出炉！