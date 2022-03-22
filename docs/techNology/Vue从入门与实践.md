---
title: Vue入门与实践
date: 2020-02-10
categories: Work
author: grace
tags: 
 - vue
---

#### 一、基础
##### 1、Vue API 2.x

##### 1.1 全局API

Vue.nextTick()

获取更新后的DOM
在created()钩子函数执行的时候DOM其实并未进行渲染，此时操作DOM没有，所以在created中，将DOM操作的js代码放进Vue.nextTick()回调函数中。与之对应的是mounted（）钩子函数，因为该钩子函数执行时所有DOM挂载渲染都已经完成，此时在该钩子函数中进行任何DOM操作都不会有问题。

code:

```
<template>
    <div id="app">
        <div ref="msgDiv" id="msgDiv" v-if="showDiv">{{msg1}}</div>
        
        <button @click="changeMsg">点击我</button>
    </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  data () {
     return {
            msg1: "你我贷",
            showDiv:false
          }
  },
  methods:{
     changeMsg(){
        this.showDiv = true

       console.log(document.getElementById("msgDiv"))
       this.$nextTick(function(){
                    console.log(document.getElementById("msgDiv"))
        })

     }
  }
}
</script>
```


```
<template>
    <div id="app">
        <div ref="msgDiv">{{msg1}}</div>
        <br/>
        <div>{{msg2}}</div>
        <br/><br/>
        <button @click="changeMsg">点击我</button>
    </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  data () {
     return {
            msg1: "你我贷",
            msg2: "理财"
          }
  },
  methods:{
     changeMsg(){
       this.msg1 = "飞旋"
       console.log(this.$refs.msgDiv.textContent)
        this.$nextTick(function(){
        console.log(this.$refs.msgDiv.textContent)
       })
     }
  }
}
</script>

```

Vue.observable( object ) 2.6.0

让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景


##### 1.2 DOM

render

在 Vue.js 中，对于大部分场景，使用 template 足以应付，但如果想完全发挥 JavaScript 的编程能力，或在一些特定场景下，需要使用 Vue.js 的 Render 函数。

render函数实际是template的底层方法，通过createElement(h)来创建dom节点，实际上作用就是负责组件视图渲染。在Vue.js
编辑阶段，会解析为Virtual DOM,与DOM相比，Virtual DOM是基于js计算的，开销会小。

Object--->render(生成虚拟节点)--->createElement(h)(基于虚拟节点创建dom节点)--->diff(状态更新后，进行对比，生成补丁对象)--->patch(遍历补丁对象，更新dom节点)

Render 函数只有 3 个参数：

(1)、要渲染的元素或者组件，可以是一个html标签、组件选项或一个函数（不常用）,该参数为必填参数。

```
h('div') html标签

import Datapicker from '../component/datapicker.vue'

h(Datapicker) 组件选项
```

(2)、对应属性的数据对象，比如组件的props、元素class、绑定事件、slot、自定义指令等

[Vue.js 的文档查看，没必要全部记住，用到时查阅就好](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)

(3)、子节点，可选，String或者Array,它同样是一个h

约束：VNode 必须唯一

所有的组件树中，如果 vNode 是组件或含有组件的 slot，那么 vNode 必须唯一

Render 函数的基本用法还有很多，比如 v-model 的用法、事件和修饰符、slot 等，读者可以到 Vue.js 文档阅读[Vue.js渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)

使用场景：

1、使用两个相同 slot。在 template 中，Vue.js 不允许使用两个相同的 slot

2、在 runtime 版本的 Vue.js 中，如果使用 Vue.extend 手动构造一个实例，使用 template 选项是会报错的，在第 9 节中也有所介绍。解决方案也很简单，把 template 改写为 Render 就可以了。需要注意的是，在开发独立组件时，可以通过配置 Vue.js 版本来使 template 选项可用，但这是在自己的环境，无法保证使用者的 Vue.js 版本，所以对于提供给他人用的组件，是需要考虑兼容 runtime 版本和 SSR 环境的。

3、这可能是使用 Render 函数最重要的一点。一个 Vue.js 组件，有一部分内容需要从父级传递来显示，如果是文本之类的，直接通过 props 就可以，如果这个内容带有样式或复杂一点的 html 结构，可以使用 v-html 指令来渲染，父级传递的仍然是一个 HTML Element 字符串，不过它仅仅是能解析正常的 html 节点且有 XSS 风险。当需要最大化程度自定义显示内容时，就需要 Render 函数，它可以渲染一个完整的 Vue.js 组件。你可能会说，用 slot 不就好了？的确，slot 的作用就是做内容分发的，但在一些特殊组件中，可能 slot 也不行。比如一个表格组件 Table，它只接收两个 props：列配置 columns 和行数据 data，不过某一列的单元格，不是只将数据显示出来那么简单，可能带有一些复杂的操作，这种场景只用 slot 是不行的，没办法确定是那一列的 slot。这种场景有两种解决方案，其一就是 Render 函数，下一节的实战就是开发这样一个 Table 组件；另一种是用作用域 slot（slot-scope）

4、在 SSR 环境（服务端渲染），如果不是常规的 template 写法，比如通过 Vue.extend 和 new Vue 构造来生成的组件实例，是编译不过的，在前面小节也有所介绍。回顾上一节的 $Alert 组件的 notification.js 文件，当时是使用 Render 函数来渲染 Alert 组件，如果改成另一种写法，在 SSR 中会报错

参考：[Vue 2.0学习笔记：Vue的render函数](https://www.w3cplus.com/vue/vue-render-function.html)


2、Vue cli

3、Vue Router

3.1 两张模式：

Hash模式

History模式，模式利用H5  History新增加的pushState()和replaceState()方法,两个方法，应用到浏览器历史记录的增加替换功能上。

Hash模式

使用url的hash来模拟一个完整的url，此时url变化，浏览器不会重新加载。#锚点代表网页中的一个位置。仅仅对浏览器进行指导，而对服务端完全没有作用。不会包括在http请求中，故也不会重新加载页面。

动态路由匹配：

把某种模式匹配到所有的路由，全部映射到同一个组件，我们有一个User组件,对于所有ID各不相同的用户,都要使用这个组件来渲染.这时我们就可以配置动态路由来实现。本质就是通过url进行传参

路由对象属性：

在组件中可以通过this.$route访问。

params、query、name、hash、pullPath、matched、redirectedFrom

使用params进行配置、通过query进行配置传参


工作整理：

路由组件传参：

params和query：本质是把参数放在url上，通过改变url进行的，这样会造成参数和组件的高度耦合，可以使用rute的props进行解耦，提高组件的复用，同时不改变url


配置params：

父组件：
```
this.$router.push({
          name: 'Describe',
          params: {
            id: id
          }
        })
```
对应路由配置:这里可以添加:/id，可不添加

子组件：

```
this.$route.params.id
```

配置query：
父组件：

```
 this.$router.push({
          path: '/describe',
          query: {
            id: id
          }
        })
```
子组件：
```
this.$route.query.id
```
由于路由参数对组件实例是复用的.例如:/user/foo 和 /user/bar在使用路由参数时,复用的都是User组件.此时组件的生命周期钩子不会再被调用。如果你想路径切换时,进行一些初始化操作时,可以用以下两种解决办法:

在组件内 watch $route 对象：
```
const User = {
 template: '...',
 watch: {
   '$route' (to, from) {
     // 对路由变化作出响应...
   }
 }
}

```
使用2.2版本中的 beforeRouteUpdate 路由守卫：
```
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
	// react to route changes...
	// don't forget to call next()
  }
}

```

3.2

导航守卫

3.3

路由懒加载

3.4

路由元信息

3.5

滚动行为











参考：[VueRouter完全指北](https://juejin.im/post/5b82bcfcf265da4345153343)




4、 Vue Vuex

简单理解：state（数据源）中定义数据后，可以在所在项目中的任何一个组件里进行获取、修改，修改可以得到全局的响应变更。

核心思想：

Vuex应用的核心就是store(仓库)。'store'基本就是一个容器，包含着应用中的大部分状态（state）

Vuex和单纯的全局对象有以下两点不同：

(1)、Vuex的状态存储是响应式的。当Vue组件从store中读取状态的的时候，若store中的状态发生变化，那么响应的组件也会相应的高效更新。

(2)、不能直接改变store中的状态。改变store中唯一的状态就是提交（commit）mutation。

Vuex包含5个基本对象：

State：单一状态树

mapState 辅助函数：用于批量映射 store 中的状态

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性

「在 Vuex 模块化中，state 是唯一会根据组合时模块的别名来添加层级的，后面的 getters、mutations 以及 actions 都是直接合并在 store 下」。

Getter:计算属性

Mutation：用于提交更改store中的状态

更改state的方式只有提交mutation,大家可以把他想象成vue中methods中的一个方法

Action:用于提交mutation,可以包含异步操作

Module:当应用程序很大时，需要管理状态很多时，需要将state进行拆分，分隔成模块（modules）,最后统一管理

Vue.Store实例方法

subscribeAction：subscribeAction(handler: Function): Function

订阅 store 的 action。handler 会在每个 action 分发的时候调用并接收 action 描述和当前的 store 的 state 这两个参数：
```
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})
```
要停止订阅，调用此方法返回的函数即可停止订阅。

从 3.1.0 起，subscribeAction 也可以指定订阅处理函数的被调用时机应该在一个 action 分发之前还是之后 (默认行为是之前)：

store.subscribeAction({
  before: (action, state) => {
    console.log(`before action ${action.type}`)
  },
  after: (action, state) => {
    console.log(`after action ${action.type}`)
  }
})

该功能常用于插件:[详细内容](https://vuex.vuejs.org/zh/guide/plugins.html)




参考：

[vue系列-vuex理解](https://juejin.im/post/5d500d0de51d453b5c121890#heading-12)






二、日志整理

2.1开发使用插件：

1)、[vue-cropper](https://github.com/xyxiao001/vue-cropper)一个简单的图片剪辑插件为vue

[vue+element 学习之路（九）vue-cropper 图片裁剪上传](https://blog.csdn.net/weixin_39327044/article/details/89765109)

2)、[vue-image-crop-upload](https://github.com/dai-siki/vue-image-crop-upload)vue图片剪裁上传组件

3)、[JavaScript image viewer.](https://github.com/fengyuanchen/viewerjs)、查看图片

4)、[v-viewer](https://mirari.cc/v-viewer/)

5)、[vue日历组件](https://github.com/Wanderxx/vue-fullcalendar)

[11个顶级 JavaScript 日历插件](http://blog.yidengxuetang.com/post/201907/19/)

6)、[vue视频播放组件](https://github.com/surmon-china/vue-video-player)

[基于 Vue 的直播播放器实战](https://blog.csdn.net/qq_21454973/article/details/90256429)

7)、[v-charts基于 Vue2.0 和 ECharts 封装的图表组件](https://github.com/ElemeFE/v-charts)

8)、[charts](https://www.echartsjs.com/zh/index.html)

9)、[v-charts](https://v-charts.js.org/#/bar)

10)、[vue直播组件](https://www.jianshu.com/p/a045f3bacb6f)

[WEB直播技术入门及在 Vue 中应用 video.js](https://segmentfault.com/a/1190000011346597)

11)、[具有Vue.js嵌套选项的多选组件](https://github.com/riophae/vue-treeselect)



11）、bilibili开源的播放器也是很不错的[flv.js](https://github.com/Bilibili/flv.js)

2.2工作遇到：

1)、理解oAuth2协议（未实践）

oAuth是一个关于授权的开放网络标准，用来授权第三方应用，获取用户数据，最终目的是给第三方的应用颁发一个有时效性的令牌access_token,第三方应用根据这个access_token就可以获取用户的相关资料、数据

oAuth2.0的协议是这个[RFC 6749](https://tools.ietf.org/html/rfc6749)提取出来。

协议流程
+--------+                               +---------------+
 |        |--(A)- Authorization Request ->|   Resource    |
 |        |                               |     Owner（资源所有者）     |
 |        |<-(B)-- Authorization Grant ---|               |
 |        |                               +---------------+
 |        |
 |        |                               +---------------+
 |        |--(C)-- Authorization Grant -->| Authorization |
 | Client |                               |     Server（授权服务器）    |
 |  （客户端）      |<-(D)----- Access Token -------|               |
 |        |                               +---------------+
 |        |
 |        |                               +---------------+
 |        |--(E)----- Access Token ------>|    Resource   |
 |        |                               |     Server（资源服务器）    |
 |        |<-(F)--- Protected Resource ---|               |
 +--------+                               +---------------+
1、客户端--->授权服务器
2、用户同意给客户端授权
3、客户端用授权去向认证服务器认证
4、认证服务器通过认证，会给客户端发放令牌
5、客户端拿着令牌，去资源服务器申请获取资源
6、资源服务器确认令牌后，给客户端返回受保护的资源

授权方式

授权码模式:流程最完整和严密的一种授权方式，服务器和客户端配合使用，主要是针对web服务器的情况采用

简化模式:主要用于移动应用程序或纯前端的web应用程序，主要是针对没有web服务器的情况采用

密码模式:不推荐，用户需要向客户端提供自己的账号和密码，如果客户端是自家应用的话，也是可以的

客户端模式:客户端以自己的名义，而不是用户的名义，向“服务提供商”进行认证，如微信公众号以此access_token来拉取所有已关注用户的信息，docker到dockerhub拉取镜像等


单点登录：单点登录就是在多个系统中，用户只需登录一次，各个系统就可以感知该用户已经登录。

单点登录实现方案：

同父域下的单点登录解决方案

如hr.oa.com、km.oa.com、fuli.oa.com,cookie domain属性共享cookie，session共享，基于cookie，session

不同域下的单点登录:

如www.taobao.com|www.tmall.com,基于中央认证服务器开源项目代表：CAS

参考文章：

 [OAuth 2.0 的四种方式](http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html#support)

[理解 OAuth2 协议](https://github.com/USTB-musion/fee-skills)


三、进阶提升


四、Vue技术结合UI模板集成后台管理项目

1、[admin-template](https://panjiachen.github.io/vue-element-admin-site/zh/)
是一个后台前端解决方案，它基于 vue 和 element-ui实现。它使用了最新的前端技术栈，内置了 i18 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。



2、[iView-admin](https://lison16.github.io/iview-admin-doc/#/)是iView生态中的成员之一，是一套采用前后端分离开发模式，基于Vue的后台管理系统前端解决方案。iView-admin2.0脱离1.x版本进行重构，换用Webpack4.0 + Vue-cli3.0作为基本开发环境。内置了开发后台管理系统常用的逻辑功能，和开箱即用的业务组件，旨在让开发者能够以最小的成本开发后台管理系统，降低开发量。

3、[nx-admin](https://mgbq.github.io/nx-admin-site/zh/)是基于 Vue2.0，配合使用 Element UI 组件库的一个前端管理后台集成解决方案。它使用了最新的前端技术栈，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。([集成方案](https://github.com/mgbq/nx-admin)、[基础模板](https://github.com/mgbq/nxAdmin-template))

4、[D2Admin](https://github.com/d2-projects/d2-admin)是一个完全 开源免费 的企业中后台产品前端集成方案，使用最新的前端技术栈，小于 60kb 的本地首屏 js 加载，已经做好大部分项目前期准备工作，并且带有大量示例代码，助力管理系统快速开发。

5、[View UI](https://www.iviewui.com/)即原先的 iView，是一套基于 Vue.js 的开源 UI 组件库，主要服务于 PC 界面的中后台产品。

6、[Element](https://element.eleme.cn/#/zh-CN)一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库

7、[PearProject](https://home.vilson.xyz/#/home)梨子项目管理系统，一款轻量级的在线项目/任务协作系统，目前已支持项目管理、任务管理、账号管理、文件管理、团队管理和权限管理等多项功能，是中小型团队进行互相协作的最佳选择。未来我们还将持续迭代新功能，致力于打造一个灵活、高效、易用、有趣的协作系统，帮助大家提升协作效率并且降低团队沟通成本。

8、[Vue仿网易云课堂](https://github.com/fishman17/vue-wyclass)Vue2.0 + Mint-ui快速构建前端界面

9、[领课学院](https://gitee.com/roncoocom/roncoo-education)领课教育系统（roncoo-education）是基于领课网络多年的在线教育平台开发和运营经验打造出来的产品，致力于打造一个各行业都适用的分布式在线教育系统。系统采用前后端分离模式，前台采用vue.js为核心框架，后台采用Spring Cloud为核心框架。系统目前主要功能有课程点播功能，支持多家视频云的接入，课程附件管理功能，支持多家存储云的接入，讲师管理功能，支持讲师入驻功能，可以帮助个人或者企业快速搭建一个轻量级的在线教育平台。

10、[nuxtjs+express+vue2.0+vuex搭建的服务端渲染个人网站项目](https://github.com/se7en-1992/5se7en.com)

11、[vue-typescript-admin-template](https://github.com/armour/vue-typescript-admin-template)是基于vue，typescript和UI Toolkit element-ui的管理界面的生产就绪前端解决方案。原始Javascript版本代码vue-element-admin由PanJiaChen编写，非常感谢他的出色开源项目

12、[h5Vue](https://github.com/Ljhhhhhh/h5vue)基于vue+vant搭建h5通用架子

13、[D2Admin](https://d2.pub/zh/doc/d2-admin/)是一个完全 开源免费 的企业中后台产品前端集成方案，使用最新的前端技术栈，小于 60kb 的本地首屏 js 加载，已经做好大部分项目前期准备工作，并且带有大量示例代码，助力管理系统快速开发。

14、[Lin CMS](http://doc.cms.talelin.com/)是林间有风团队经过大量项目实践所提炼出的一套内容管理系统框架。

是一套前后端完整的解决方案，后端部署请移步

Lin 既提供后台的支撑，也有一套对应的前端系统，当然双端分离的好处不仅仅 在于此，Lin 目前已有 Python 、Node.js 和 Java 版本的实现。

15、[博客：vue全家桶+node+mongodb](https://github.com/bestRenekton/taoLand)，[2020年用TypeScript,React,Koa重构了前后端,支持SSR,PWA](https://github.com/bestRenekton/taoland-react)