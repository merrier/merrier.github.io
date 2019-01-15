---
title: 浏览器中输入url后发生了什么
urlname: what-happened-after-url-was-entered-into-the-browser
id: 767
categories:
  - 前端
tags:
  - HTTP
  - 前端
date: 2017-04-24 21:18:56
img: /images/hexo_thumbnail_41.png
---

本文转载自[简书-浏览器中输入url后发生了什么](http://www.jianshu.com/p/c1dfc6caa520)，其实这个问题在前端面试中经常遇到，所以网上有很多关于这个问题的文章，但是我感觉这篇文章是表达的最清晰的，感兴趣的童鞋可以点击上面的链接查看原文，不过在本文中，我又补充了一些其他文章中的相关内容，同时加入了一些我自己的理解，争取让初学者更容易看懂 先上一张思维导图：

<div align='center'><img src='/images/hexo_post_34.png' alt='' width='900'/></div>

上面这张图用非常简练的语言总结了浏览器中输入 url 后发生的事情以及顺序，下面按照执行顺序分为六步进行描述：

## 1. DNS 域名解析

* 在浏览器 DNS 缓存中搜索
* 在操作系统 DNS 缓存中搜索
* 读取系统 hosts 文件，查找其中是否有对应的 ip
* 向本地配置的首选 DNS 服务器发起域名解析请求

以上四个步骤其实都是 DNS 的解析过程，总结一下就是先看有没有缓存，如果没有就发起DNS域名解析请求，具体过程其实比较复杂，可以查看[DNS原理及解析过程](http://www.cnblogs.com/vincently/p/4670597.html)进行更深入的了解

## 2.建立 TCP 连接

为了准确地传输数据，TCP 协议采用了三次握手策略。发送端首先发送一个带 SYN（synchronize）标志的数据包给接收方，接收方收到后，回传一个带有 SYN/ACK(acknowledegment) 标志的数据包以示传达确认信息。最后发送方再回传一个带 ACK 标志的数据包，代表握手结束。在这过程中若出现问题中断，TCP 会再次发送相同的数据包。TCP 是一个端到端的可靠的面向连接的协议，所以 HTTP 基于传输层 TCP 协议不用担心数据的传输的各种问题。当然，TCP 三次握手也是一个可以展开的问题，而且为什么使用三次握手也是大有学问，可以去我的另外一篇文章：[前端面试系列（8）——TCP的三次握手与四次分手](/daizhengli/1234.html)中寻找答案

## 3. 发起 HTTP 请求

HTTP 的请求方法（method）有以下几种：

* GET: 获取资源
* POST: 传输实体主体
* HEAD: 获取报文首部
* PUT: 传输文件
* DELETE: 删除文件
* OPTIONS: 询问支持的方法
* TRACE: 追踪路径

其中最常用的就是 GET 和 POST 了，请求报文格式如下所示（HTTP/1.1）：

<div align='center'><img src='/images/hexo_post_33.png' alt='' width='900'/></div>

## 4. 接受响应结果

客户端在发出请求之后，服务器会在接收到请求之后返回客户端响应结果，该结果就是服务器告知客户端的当前状态，下面是状态码的分类，更多关于状态码的详细内容请移步[前端面试系列（6）——HTTP请求的状态码](/daizhengli/12.html)：

* 1**：信息性状态码
* 2**：成功状态码
* 3**：重定向状态码
* 4**：客户端错误状态码
* 5**：服务器错误状态码

响应报文：

<div align='center'><img src='/images/hexo_post_35.png' alt='' width='900'/></div>

## 5. 浏览器解析 html

浏览器按顺序解析 html 文件，构建 DOM 树，在解析到外部的 css 和 js 文件时，向服务器发起请求下载资源，若是下载 css 文件，则解析器会在下载的同时继续解析后面的 html 来构建 DOM 树，但是在下载 js 文件和执行它时，解析器会停止对 html 的解析。这便出现了 js 阻塞问题。

### 预加载器：

当浏览器被脚本文件阻塞时，预加载器（一个轻量级的解析器）会继续解析后面的 html，寻找需要下载的资源。如果发现有需要下载的资源，预加载器在开始接收这些资源。预加载器只能检索 HTML 标签中的 URL，无法检测到使用脚本添加的 URL，这些资源要等脚本代码执行时才会获取。（注: 预解析并不改变 Dom 树，它将这个工作留给主解析过程），浏览器解析 css，形成 CSSOM 树，当 DOM 树构建完成后，浏览器引擎通过 DOM 树和 CSSOM 树构造出渲染树（Render 树）。渲染树中包含可视节点的样式信息（不可见节点将不会被添加到渲染树中，如：head 元素和 display 值为 none 的元素）

> 值得注意的是，这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的 html 都解析完成之后再去构建和布局 render 树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。

## 6. 浏览器布局渲染

* 布局（Layout）：通过计算得到每个渲染对象在可视区域中的具体位置信息（大小和位置），这是一个递归的过程。
* 绘制（Paint）：将计算好的每个像素点信息绘制在屏幕上

在页面显示的过程中会多次进行 Reflow 和 Repaint 操作，而 Reflow 的成本比 Repaint 的成本高得多的多。因为 Repaint 只是将某个部分进行重新绘制而不用改变页面的布局，如：改变了某个元素的背景颜色。而如果将元素的 display 属性由 block 改为 none 则需要 Reflow。如何减少 rpaint 和 reflow 也是[前端优化](/daizhengli/123.html)需要考虑的问题：

<div align='center'><img src='/images/hexo_post_36.png' alt='' width='700'/></div>

## 参考文章

* [浏览器中输入url后发生了什么](http://www.jianshu.com/p/c1dfc6caa520)
* [浏览器的渲染原理简介](http://coolshell.cn/articles/9666.html)
* [了解html页面的渲染过程](http://www.cnblogs.com/yuezk/archive/2013/01/11/2855698.html)
* [老生常谈-从输入url到页面展示到底发生了什么](https://xianyulaodi.github.io/2017/03/22/%E8%80%81%E7%94%9F%E5%B8%B8%E8%B0%88-%E4%BB%8E%E8%BE%93%E5%85%A5url%E5%88%B0%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA%E5%88%B0%E5%BA%95%E5%8F%91%E7%94%9F%E4%BA%86%E4%BB%80%E4%B9%88/)
* [异步脚本载入提高页面性能](http://harttle.com/2016/05/18/async-javascript-loading.html)

## 扩展阅读

* [浅谈前端页面渲染机制](http://blog.codingplayboy.com/2017/03/29/webpage_render/)