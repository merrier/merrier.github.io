---
title: 你可能不会JS
urlname: you-probably-dont-know-js
tags:
  - JS
  - 技巧
id: 1597
categories:
  - JS
date: 2018-02-11 11:17:24
---

## 新属性

### https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/setSelectionRange

### 老属性详解


## 老属性不一样玩法

### Event.isTrusted

https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted


## JS 中的基本类型为什么会有方法？

https://medium.com/weekly-webtips/autoboxing-in-javascript-a368b42d8969


## Multi-line strings in JavaScript and Node.js

https://tomasz.janczuk.org/2013/05/multi-line-strings-in-javascript-and.html


## 中文乱码

https://github.com/justjavac/unicode-encoding-error-table


## Composition Event

https://juejin.cn/post/6844903721285976072
https://cloud.tencent.com/developer/article/1418222


## Object.is()

通过这个方法判断两个 JS 中的基础类型是否完全相等，React 也是用该方法判断是否需要重新渲染

## 字符编码

https://juejin.cn/post/6901868546322923534

## 超好用的API之IntersectionObserver

https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action

## JavaScript 的正则表达式中的 \b 以及 \B 问题？

https://www.zhihu.com/question/46315785

## 关于使用 Symbol 的注意点

https://juejin.im/post/6844903791746088974

## 关于 Promise 的两道面试题，很有意思

https://segmentfault.com/a/1190000023037214

## 关于JS中一些重要的api实现, 巩固你的原生JS功底

https://juejin.im/post/6844903924520992782

https://www.cnblogs.com/chenwenhao/p/11294541.html#_label1

## 127 个 JS 代码片段

https://medium.com/better-programming/127-helpful-javascript-snippets-you-can-learn-in-30-seconds-or-less-part-1-of-6-bc2bc890dfe5

## 使用 Intersection Observer 实现无限下拉刷新


https://mp.weixin.qq.com/s/xEE7ZyETb3CkP5Y4RWuCeA

## toFixed 的坑

https://juejin.im/post/5ee545a6f265da771b2ff711


## 通过浏览器标签页的 Icon 看视频

源码地址：https://github.com/shengxinjing/iconjs/tree/e41b60c722634691fea10081be8543f7ecc1b0ac

演示站点：https://shengxinjing.cn/wheel/moyu.html

代码讲解视频：https://www.bilibili.com/video/BV1R54116794

## scrollIntoView支持更多参数

```javascript
.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
})
```


## classList 和 cssText 这两个我以前没见过的东西

https://juejin.im/post/5cd903f4e51d453c9e540768

## 非常方便的实现图片预览

来自：https://juejin.im/post/5d1ea7a8e51d454fd8057bea

```javascript
const upload = document.querySelector("#upload");
const preview = document.querySelector("#preview");

upload.onchange = function() {
  const file = upload.files[0]; //File对象
  const src = URL.createObjectURL(file);
  preview.src = src;
};
```

## Array.slice 8 种不同用法

https://juejin.im/post/5d25259af265da1bad572d75

## console不可信

https://juejin.im/post/5cdf8c02e51d45105e0211f8

## div 元素并没有开箱即用的 select() 方法，这就需要读者了解一个新的对象： Selection 。

https://juejin.im/post/5cd179586fb9a032045960b6


## URLSearchParams

获取url里面的参数值或者追加查询字符串，在这之前，我们一般通过正则匹配处理，然而现在有一个新的api，具体详情可以查看这里，可以让我们以很简单的方式去处理url。
假如我们有这样一个url，"?post=1234&action=edit"，我们可以这样处理这个url：

```javascript
var urlParams = new URLSearchParams('?post=1234&action=edit');

console.log(urlParams.has('post'));
console.log(urlParams.get('action')); // "edit"
console.log(urlParams.getAll('action')); // ["edit"]
console.log(urlParams.toString()); // "?post=1234&action=edit"

urlParams.append('active', '1')
console.log(urlParams); // "?post=1234&action=edit&active=1"
```

是不是很方便？那浏览器支持程度如何呢？通过[这个地址](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)查看，可以发现大部分浏览器都支持哦！，如果碰到不支持的情况，这里还有个[polyfill](https://github.com/jerrybendy/url-search-params-polyfill/)。

你不知道的JSON.stringify()妙用
=======================

https://wdd.js.org/json-stringify-powerful.html

JavaScript 字符串转数字：陷阱（示例）
========================

http://zcfy.cc/article/converting-strings-to-number-in-javascript-pitfalls-example-4301.html

JavaScript 中的匿名递归
=================

https://zhuanlan.zhihu.com/p/28421224

JavaScript深入之参数按值传递
===================

https://github.com/mqyqingfeng/Blog/issues/10

一道面试题引发的对 javascript 类型转换的思考
============================

http://web.jobbole.com/90654/

一行神奇的javascript代码
=================

http://www.cnblogs.com/lvdabao/p/4280518.html

this 的值到底是什么？一次说清楚
==================

https://zhuanlan.zhihu.com/p/23804247

touchcancel
===========

移动端上的touch类事件除了touchstart、touchmove和touchend之外还有touchcancel事件，其触发的时机是当touch事件被取消时，举个例子：当你在玩《水果忍者》一直划屏幕的时候突然来了个电话，此时touchcancel事件就会触发，不过一般我们都不会在意该事件

 JS实现打印的方式
==========

http://blog.csdn.net/yongchao940/article/details/73129425

JS的垃圾回收机制和内存分配
==============

http://blog.csdn.net/qizhiqq/article/details/51859541

void 0 vs undefined
===================

underscore 源码中使用 void 0 代替了 undefined，https://github.com/webproblem/Blog/blob/master/%E6%BA%90%E7%A0%81%E8%A7%A3%E8%AF%BB/underscore/notes/void%200%20%26%20undefined.md https://stackoverflow.com/questions/7452341/what-does-void-0-mean

0.1+0.2!==0.3
=============

https://github.com/webproblem/Blog/issues/1

这段颜文字竟然是可执行js代码
===============

https://juejin.im/pin/5bc0379c092dcb7eb99bef91?utm\_medium=fe&utm\_source=weixinqun

JavaScript之300行代码搞定汉字转拼音
========================

https://github.com/creeperyang/blog/issues/31

**3行代码实现一个简易版promise**
======================

https://github.com/noahlam/articles/blob/master/3%E8%A1%8C%E4%BB%A3%E7%A0%81%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E7%AE%80%E6%98%93%E7%89%88promise.md

## 想偷懒的话，toLocaleString 了解一下？

https://mp.weixin.qq.com/s/t_aPQ4tpUIKUrA0ickfMpQ

## 思路清奇：通过 JavaScript 获取移动设备的型号

https://segmentfault.com/a/1190000010157682

## JS 反调试技巧

https://mp.weixin.qq.com/s/smMUIwcs5woqTPOZP1Fjww