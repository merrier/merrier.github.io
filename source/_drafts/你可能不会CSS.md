---
title: 你可能不会CSS
urlname: you-probably-dont-know-css
tags:
  - CSS
id: 1557
categories:
  - CSS
date: 2018-01-28 20:43:57
---

前端小知识:为什么你写的 height:100% 不起作用？
==============================

https://segmentfault.com/a/1190000012707337

我脑中飘来飘去的 CSS 魔幻属性
-----------------

https://segmentfault.com/a/1190000012417553

灵活的overflow
===========

https://www.w3cplus.com/css/flexible-overflow.html

CSS高级布局技巧
=========

https://mp.weixin.qq.com/s/uawifMjTCNMzrb59IECfoA

引入Google font
=============

有时候我们对原生提供的一些字体不太满意，想引入google font中的某些自己喜欢的字体，其实只需要在css代码中引入就好：

// main.css
@import url('https://fonts.googleapis.com/css?family=Passion+One');

CSS Grid的应用
===========

[Grid](https://www.w3.org/TR/css-grid-1/) 是网页布局上第一个真正的工具。到目前为止，我们所拥有的一切，从表格到浮动，从绝对定位到弹性盒子 —— 都是为了解决不同的问题，我们找到了使用和滥用它来进行布局的方法。这里有一个利用Grid实现的切换动画（来自于[driggle](https://dribbble.com/)），如果无法翻墙，你可以在[codepen](https://codepen.io/mxbck/live/81020404c9d5fd873a717c4612c914dd)上查看某大牛实现的模拟效果。

css的一个bug导致iphone直接关机
=====================

介绍链接：https://www.bleepingcomputer.com/news/security/new-css-attack-restarts-an-iphone-or-freezes-a-mac/ https://juejin.im/post/5bbe9e1f5188255c59672717?utm\_medium=fe&utm\_source=weixinqun 可以试一下的链接：http://i0580.com/safari.html 罪魁祸首：-webkit-backdrop-filter: blur(10px)，上千个div同时blur，导致资源消耗殆尽。

SVG的颜色设置
========

svg { fill: currentColor; } 链接：https://www.zhangxinxu.com/wordpress/2014/07/svg-sprites-fill-color-currentcolor/

CSS Mask
========

https://juejin.im/post/5bc8184ee51d450e81090d94

CSS content属性
=============

https://juejin.im/post/5be25553f265da611b57d2ee

Fixed定位脱离Viewport的bug
=====================

https://segmentfault.com/a/1190000002783265 在定位中有一个跟stacking content无关但又较为相近的[危险Bug](https://code.google.com/p/chromium/issues/detail?id=20574)，注意下面代码中.inner的定位： See the Pen [VLKeZP](http://codepen.io/abruzzi/pen/VLKeZP/)点击预览 by abruzzi ([@abruzzi](http://codepen.io/abruzzi)点击预览) on [CodePen](http://codepen.io/). <script async src="//assets.codepen.io/assets/embed/ei.js"></script> [http://codepen.io/abruzzi/pen/VLKeZP](http://codepen.io/abruzzi/pen/VLKeZP)点击预览 对于声明transfrom值非none元素，其子元素中若存在position: fixed将以声明transform的最近祖先作为基准而定位，这是因为transfrom值非none的元素[定义了一个局部坐标系统](http://www.w3.org/TR/css3-2d-transforms/#transform-rendering)，导致postion: fixed以此坐标系统计算布局。 目前这个bug仍未被解决，官方建议避免在transform元素下做fixed定位。

浅谈line-height和vertical-align
----------------------------

https://mp.weixin.qq.com/s/1BwOuxjF7fm5n9WllXRqkA

css实现瀑布流
========

-webkit-column-width:160px;

 -moz-column-width:160px;

 -webkit-column-gap:5px;

 -moz-column-gap:5px;

CSS选择器妙用
========

https://juejin.im/post/5bfb411a6fb9a049f153df56

22个实用的CSS技巧
===========

https://juejin.im/post/5c1101875188257afc713809

前端字体截取
======

https://juejin.im/post/5c1783216fb9a049b07d4330

你可能不知道的 CSS —— CSS规范阅读分享
========================

https://juejin.im/post/5c2058886fb9a049a711d2d7

\[译\] 前端项目中常见的 CSS 问题
=====================

https://juejin.im/post/5c2b5cb8e51d45673971d582

## 借助CSS Shapes实现元素滚动自动环绕iPhone X的刘海

https://mp.weixin.qq.com/s/xiEjql-i4jbxWgZQgACHBA

## 使用 CSS 来做素数的判定与筛选

https://mp.weixin.qq.com/s/10H6Noh0OeOb1eXpKlqxKA

## 纯 CSS 实现排行榜序号设计

https://www.jianshu.com/p/847bee226c1e

## text-indent 特殊性

text-indent：这个属性是用来设置首行缩进的，我们最长用的是2em，首行缩进两个字符，这边的2em指的就是两倍的font-size，按道理来说如果它取%应该也是要相对于本身的font-size的，但是偏偏就那么特别，和padding和margin一样，如果设置的是%，则参照的是父元素的width。这应该算是一个特例吧。

## CSS变量让你轻松制作响应式网页

https://segmentfault.com/a/1190000013512723

## 别天真了，第三方 CSS 并不安全

https://mp.weixin.qq.com/s/ivHsjUF4FPVhxOr7VP_7aQ

## 利用CSS注入（无iFrames）窃取CSRF令牌

https://www.freebuf.com/articles/web/162687.html

## background-position 的特殊性

这个属性和 relative 类似，起到的也是定位的效果，因此它的参照对象就是原盒子。但是这个属性比较特殊，他不是参照原盒子的宽高值，而是原盒子的宽高值减去背景图片的宽高值所得到的剩余值，更为形象的说，下面这两个属性值是等价的：“center center” 和 “50% 50%”，如果你设置了后者，背景图片会自动居中，不用像定位那样还需要 transform 偏移了。这应该是优秀的前人在设计这个属性的时候就考虑到它将来的应用了吧。

## 神奇的 conic-gradient 圆锥渐变

http://web.jobbole.com/91586/

## Crooked Style Sheets：只用CSS实现网页跟踪、分析

译文：https://mp.weixin.qq.com/s/iU_7MyxOYidZAKW74Net0A

原文：https://github.com/jbtronics/CrookedStyleSheets

## 有趣的 box-decoration-break

https://juejin.im/post/5c77457951882540447df818

## 用touch-action解决click 300ms延时的问题

https://github.com/mishe/blog/issues/160

https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action

