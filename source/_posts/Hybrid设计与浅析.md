---
title: Hybrid设计与浅析
urlname: hybrid-design-and-analysis
id: 1489
categories:
  - 慕课网
tags:
  - Hybrid
  - 慕课网
date: 2017-12-01 22:19:00
img: /images/hexo_thumbnail_32.jpg
---

慕课网视频——[Hybrid设计](https://www.imooc.com/learn/850)的学习笔记，同时加入了一些自己的理解，希望通过本篇文章能够让你理解什么是 Hybrid，以及 Hybrid 有什么特点，同时还会简单介绍一下 Hybrid 开发时的注意事项。

## 什么是 Hybrid

Hybrid 和普通前端代码没差别，只不过宿主不一样，Hybrid 就是在 app 中运行的前端代码。

## 业内的 Hybrid App

* 携程
* 百度糯米
* 京东
* 天猫
* 微信
* QQ
* 手机百度
* 支付宝

### 一般地，APP 开发方式有以下几种方式：

1. Web App（浏览器网页）
2. Native App（原生app）
3. Hybrid App（ H5 混合app）
4. 超级Hybrid（React Native、Weex）
5. 微信/支付宝小程序（或内嵌页面）

## Hybrid 相比 Native 和纯 Html5 的优缺点

<div align='center'>![](/images/hexo_post_288.png)</div>

## Native 与 H5 的职责

* H5 做业务
* Native 提供基础能力
* Native 做好必须 Native 做的业务

## H5 与 Native 通信

### JavascriptCore

和 JS Bridge 类似

<div align='center'>![](/images/hexo_post_104.png)</div>

## 通过 URL Schema 通信

### App 主动与 H5 通信

<div align='center'>![](/images/hexo_post_88.png)</div>

将一组 API 绑定在 webview 的 window 对象上，App 通过 iOS/Android 原生方法调用 window 对象中的 js 方法

### H5 主动与 App 通信

<div align='center'>![](/images/hexo_post_105.png)</div>

App 实现对 WebView URL 的观察者模式，H5 通过改变 URL 的哈希值，App 会通过解析哈希值的变化执行对应的操作