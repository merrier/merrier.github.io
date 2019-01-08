---
title: 聊一聊移动端web开发
urlname: mobile-web-development
tags:
  - 心得
  - 技巧
  - 指南
  - 移动端
id: 1602
categories:
  - 移动端
date: 2018-02-11 11:24:39
---

Pixel 移动开发像素知识
==============

来自幕课网 ![](https://merrier.wang/wp-content/uploads/2018/02/移动开发像素知识.png)

弹性图片
====

img{
  max-width: 100%;
}

其思路是：无论何时，都包含在图片的元素宽度范围内，以最大的宽度同比完整的显示图片。

相对单位rem
=======

// 默认320px
html{ font-size: 32px; }

// iphone6
@media (min-device-width: 375px) {
  html{font-size: 37.5px;}
}

// iphone6 plus
@media (min-device-width: 414px){
  html{font-size: 41.4px;}
}

一般来讲font-size是不应该使用rem等相对单位的。因为字体的大小是趋向于阅读的实用性，并不适合于排版布局。 同理趋向于一些固定的元素的特性。我们不使用rem而改为使用px去确保在不同屏幕上表现一致（跟rem的目的相反）

多行文本溢出
======

// 单行文本溢出
.inaline{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

// 多行文本溢出
.intwoline{
  display: -webkit-box !important;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

可以利用-webkit-line-clamp这一属性控制显示几行

移动web页面上的click事件相应都要慢上大约300ms
=============================

在移动设备上，为了**确认用户是“双击”还是“单击”**，safari需要大约300ms的延迟来判断，而后来的iphone也一直沿用这样的设计，而借鉴成功iphone的android也沿用了这样的设计。于是“300ms的延迟”就成为了一道规范。 解决方案：使用自定义的tap事件代替click事件

自定义tap事件原理
----------

在touchstart、touchend时记录时间、手指位置，在touchend时进行比较，如果手指位置为同一位置（或允许移动一个非常小的位移值）且时间间隔较短（一般认为是200ms），且过程中未曾触发过touchmove，即可认为触发了手持设备上的“click”，一般称它为“tap” 然而，tap存在“点透”的bug，原因就在于300ms延迟之后事件会“向下”传递，触发下层的click事件

### tap透传的解决方案

1.  使用缓动动画，过渡300ms的延迟
2.  中间层dom元素的加入，让中间层接受这个“穿透”事件，稍后隐藏
3.  “上下”都是用tap事件，原理上解决tap透传事件（但不可避免原生标签的click事件）
4.  改用[Fastclick](https://github.com/ftlabs/fastclick)库（不过最新的zepto已经解决了这个bug）

touch基础事件在android浏览器上存在bug
==========================

Android（版本>4.4以及低版本，只有4.2fix了这个bug）只会触发touchstart，一次touchmove，touchend不触发，解决方案是：**在touchmove中加入：event.preventDefault()**，不过这样会导致默认行为不发生，如scroll，即导致页面不滚动！

弹性滚动
====

分为body层滚动和局部滚动：

body层滚动
-------

自带弹性滚动，缺点是会导致**overflow: hidden失效**，**GIF和定时器会暂停**

局部滚动
----

**没有滚动弹性**，不流畅

### 局部滚动开启弹性滚动

body{
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

**注意**：**Android不支持原生的弹性滚动**，但可以借助第三方库[iScroll](https://github.com/cubiq/iscroll)来实现

[移动web开发问题和优化小结](https://segmentfault.com/a/1190000011338800)
=============================================================

https://segmentfault.com/a/1190000011338800

Tips-移动端滑动固顶效果(position: sticky)
================================

https://juejin.im/post/588f2fb2128fe1006c86dfd2