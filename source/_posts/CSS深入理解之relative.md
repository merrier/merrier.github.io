---
title: CSS深入理解之relative
urlname: relative-of-css-in-depth-understanding
tags:
  - CSS
url: 725.html
id: 725
categories:
  - CSS
date: 2017-04-21 15:33:18
---

1.relative和absolute的相煎关系
========================

1.  限制left/top/right/bottom定位;
2.  限制z-index层级：relative中的absolute层级不起作用,只看relative层级;
3.  限制在overflow下的嚣张气焰：消除absolute不受overflow限制的能力

2.relative和定位
=============

1.  相对自身：top:100px;left:100px为相对于自身原位置移动
2.  无侵入：不会影响到其他元素，可应用于自定义拖拽
3.  同时设置top/bottom/left/right的行为表现：绝对定位是拉伸，相对定位是斗争--top>bottom,left>right

3.relative与z-index
==================

1.  提高层叠上下文
2.  新建层叠上下文与层级

z-index：auto是不会产生层叠上下文的

4.relative的最小化影响原则
==================

*   尽量避免使用relative

absolute定位不依赖使用relative，不要为了使用absolute而设置relative

*   最小化原则

如果必须要使用relative,就把absolute定位的元素放进一个空div里，使relative的div只有定位为absolute的子元素

<div style="position:relative">
  <img src="pig_head.png" style="position:absolute;top:0;right:0;">
</div>
<div>
  <div></div>
  <div></div>
  <div></div>
  ......
</div>