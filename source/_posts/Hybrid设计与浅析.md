---
title: Hybrid设计与浅析
urlname: hybrid-design-and-analysis
tags:
  - Hybrid
  - 慕课网
id: 1489
categories:
  - 前端
  - 慕课网
date: 2017-12-01 22:19:00
---

慕课网视频——[Hybrid设计](https://www.imooc.com/learn/850)的学习笔记，同时加入了一些自己的理解，希望通过本篇文章能够让你理解什么是Hybrid，以及Hybrid有什么特点，同时还会简单介绍一下Hybrid开发时的注意事项。

什么是Hybrid
=========

Hybrid和普通前端代码没差别，只不过宿主不一样，Hybrid就是在app中运行的前端代码。

业内的Hybrid App
=============

*   携程
*   百度糯米
*   京东
*   天猫
*   微信
*   QQ
*   手机百度
*   支付宝

一般地，APP开发方式有以下几种方式：
-------------------

1.  Web App（浏览器网页）
2.  Native App（原生app）
3.  Hybrid App（H5混合app）
4.  超级Hybrid（React Native、Weex）
5.  微信/支付宝小程序（或内嵌页面）

Hybrid相比Native和纯Html5的优缺点
=========================

![](https://merrier.wang/wp-content/uploads/2017/12/WX20171201-204056.png)

Native与H5的职责
============

*   H5做业务
*   Native提供基础能力
*   Native做好必须Native做的业务

H5与Native通信
===========

JavascriptCore
--------------

和JS Bridge类似 ![](https://merrier.wang/wp-content/uploads/2017/12/H5与Native通信.png)

通过URL Schema通信
--------------

### App主动与H5通信

![](https://merrier.wang/wp-content/uploads/2017/12/App主动与Native通信.png) 将一组API绑定在webview的window对象上，App通过iOS/Android原生方法调用window对象中的js方法

### H5主动与App通信

![](https://merrier.wang/wp-content/uploads/2017/12/H5主动与App通信.png) App实现对WebView URL的观察者模式，H5通过改变URL的哈希值，App会通过解析哈希值的变化执行对应的操作