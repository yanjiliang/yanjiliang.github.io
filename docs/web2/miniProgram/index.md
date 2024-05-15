# 小程序相关知识

## 1.微信小程序的原理和架构

小程序的本质是一个单页面应用(SPA)，所有的页面渲染和时间处理，都在一个页面内进行，但又可以通过微信客户端调用原生的各种接口。

架构：数据驱动的架构模式，UI和数据分离，所有页面的更新都需要通过更改数据来实现。

功能上分为webview和APPService
- webview用来展示UI内容
- APPService用来处理业务逻辑，数据及I/O请求等
- 通过JSBridge实现与微信容器APP通信，实现UI渲染，事件的处理；

## 2.微信小程序中对behavior的理解
behaviors是用于组件之间代码共享的特性，类似于一些编程语言的mixins或traits。
每个behavior可以包含一组属性、数据、生命周期函数和方法。组件引用它时，他的属性、数据、方法会被合并到组件中，生命周期函数也会在对应时机被调用。
每个组件可以引用多个behavior，behavior也可引用其他behavior。
组件引用时，在behavior定义段中将它们逐个列出即可。

```js
// my-component.js
var myBehavior = require('my-behavior');
Component({
    behaviors: [myBehavior],
    properties: {
        myProperty: {
            type: String
        }
    },
    data: {
        myData: 'my-component-data'
    },
    created: function() {
        console.log('[my-component] created')
    },
    attached: function() {
        console.log('[my-component] attached')
    },
    ready: function(){
        console.log('[my-component] ready')
    },
    methods: {
        myMethod: function(){
            // logic code
        }
    }
})

```