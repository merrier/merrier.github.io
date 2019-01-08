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

https://mp.weixin.qq.com/s?\_\_biz=MzAxODE2MjM1MA==&mid=2651553445&idx=2&sn=e28e8409e1c8b72da752adde22aaf132&key=45681964be569d98da4893acbe46a71189bff2451a2187cfa929753c0c468a0988af906088b3e42c2a8355ec9b05c20beaefe742080319b3956e1864a8f9be1354c7703f7ce7834d3f6051ec66f4eee6&ascene=0&uin=MTMzNTc2NjIyMA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.13.2+build(17C88)&version=12020710&nettype=WIFI&lang=zh\_CN&fontScale=100&pass_ticket=l0UsBpASywvC83tRkNCFcXohxiiAWaeAwNErJ39lVT%2Br2MnNzTewpNPZbKzn5PtD

我脑中飘来飘去的 CSS 魔幻属性
-----------------

https://mp.weixin.qq.com/s?\_\_biz=MzAxODE2MjM1MA==&mid=2651553377&idx=3&sn=9983fe32e6ad25caf5a8f66ba38f18a6&chksm=8025a9a0b75220b6e5a5672db539457054a9b273bca791f5f40aed841ece6c6d5e330a164dea&mpshare=1&scene=1&srcid=1226lO8QxQJsUMXwIrUKQZA3&key=42e49dab06fd56069c9efae4f2f154182ccc67a8536cf400898a2acdccfac5fe610093986c2b4086ef828d3fa71b1dd7446e2ea8aab2e6c65f340cddc32789f63ada5af9b53c6f8777ae49b6ea467f2d&ascene=0&uin=MTMzNTc2NjIyMA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.13.2+build(17C88)&version=12020710&nettype=WIFI&lang=zh\_CN&fontScale=100&pass_ticket=l0UsBpASywvC83tRkNCFcXohxiiAWaeAwNErJ39lVT%2Br2MnNzTewpNPZbKzn5PtD

灵活的overflow
===========

https://www.w3cplus.com/css/flexible-overflow.html

CSS高级布局技巧
=========

https://mp.weixin.qq.com/s?\_\_biz=MzI2NDQwMTkyNw==&mid=2247484486&idx=1&sn=6da04ed23e53c452dd3b849b880de8c1&chksm=eaac612edddbe838666a18512cd1f4a2426753c7df151153d12d6a9e523eb9352d4a7a14882e&mpshare=1&scene=1&srcid=1119oUgKh3EnLogEFqtPmW3Y&key=ceb62083117db9ae17f221d1b85e5d18581e8d1b0dfcf542d9129792d9853802eb244562cad5d47fac57b644acf39bfae92f82a267c6d2ebfdc9b7c93a3ed200bc90a9651b5b1a375948a0b1bc6f4d4d&ascene=0&uin=MTMzNTc2NjIyMA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.13.2+build(17C88)&version=12020710&nettype=WIFI&lang=zh\_CN&fontScale=100&pass_ticket=l0UsBpASywvC83tRkNCFcXohxiiAWaeAwNErJ39lVT%2Br2MnNzTewpNPZbKzn5PtD

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