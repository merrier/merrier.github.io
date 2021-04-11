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

### word-break VS overflow-wrap

https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap

### 好用的 CSS 函数

https://segmentfault.com/a/1190000039031953


### oveflow:overlay 可以让滚动条在网页顶层

### currentColor 的妙用

https://juejin.cn/post/6901124887847403527

### 实现深色模式

https://www.zhangxinxu.com/wordpress/2020/11/css-mix-blend-mode-filter-dark-theme/


### 利用 mask-image 实现弹幕防档人像功能

https://bytedance.feishu.cn/docs/doccnUVs6YiwHPZzZJjV5eF0HSg


### CSS 选择器优先级

https://wiki.developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance


### 纯CSS实现密室逃脱游戏

https://juejin.im/post/6887792725031288839

### ::marker

通过 ::marker 更加个性化改变 li、ol 列表样式：https://web.dev/css-marker-pseudo-element/


### overflow-anchor

https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
https://css-tricks.com/almanac/properties/o/overflow-anchor/
https://github.com/necolas/normalize.css/issues/655

### 灵活运用CSS开发技巧

https://juejin.im/post/6844903926110617613

### 一个可能让你的页面渲染速度提升数倍的CSS属性:content-visibility

https://mp.weixin.qq.com/s/sT9iIdF22SVGkcCy9tl48Q


### 通过 touch-action 控制触摸行为

https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action

### 巧用CSS cross-fade()实现背景图像半透明效果

https://www.zhangxinxu.com/wordpress/2020/07/css-cross-fade-background-image-opacity/


### 浏览器新增特性：CSS Overview

https://css-tricks.com/new-in-chrome-css-overview/


### CSS 伪元素的一些罕见用例

https://mp.weixin.qq.com/s/gAPbsnqfqlweAfBSL1RxbQ

### 纯 CSS 写游戏

https://juejin.im/pin/6844910535276757000

### 通过动图来展示 CSS 相关知识点

https://github.com/qdlaoyao/css-gif

### 用 object-fit 实现图片居中

https://www.zhangxinxu.com/wordpress/2015/03/css3-object-position-object-fit/


### 用SVG实现一个优雅的提示框

文末还有一个在线预览的工具

https://mp.weixin.qq.com/s/jReoLQsNzW_rGUDbZfPtqA


### 利用 -webkit-mask-image: linear-gradient 实现透明蒙层

待补充


### CSS3 中的 width 值

https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/

### 伪类 VS 伪元素

::after和:after的区别
在实际的开发工作中，我们会看到有人把伪元素写成:after，这实际是 CSS2 与 CSS3新旧标准的规定不同而导致的。
CSS2 中的伪元素使用1个冒号，在 CSS3 中，为了区分伪类和伪元素，规定伪元素使用2个冒号。所以，对于 CSS2 标准的老伪元素，比如:first-line，:first-letter，:before，:after，写一个冒号浏览器也能识别，但对于 CSS3 标准的新伪元素，比如::selection，就必须写2个冒号了。

链接：https://juejin.im/post/5df1e312f265da33d039d06d


### 你未必知道的CSS知识点（第二季）

https://juejin.im/post/5d9ec8b0518825651b1dffa3

### 使用 sroll-snap-type 优化滚动

https://juejin.im/post/5de9c00ce51d4557f544f03d

### 利用一行代码实现网页灰色效果

https://juejin.im/post/5df32633e51d455820601bb7

### CSS之文本两端对齐

http://www.daqianduan.com/6806.html


### 解决 H5 页面在点击的时候，link区域点击的瞬间是蓝色的

```css
-webkit-tap-highlight-color: transparent;
```

## 一个动图，一个CSS知识点

https://github.com/qdlaoyao/css-gif

## CSS实现自适应式带说明文字的图片轮播效果

https://www.codecolor.cn/responsive-css3-slider/#

## 【前端词典】几个有益的 CSS 小知识

https://juejin.im/post/5d15749af265da1baa1e8750

## 【iCSS系列】不可思议的纯 CSS 实现鼠标跟随

https://mp.weixin.qq.com/s?__biz=MzIwNTc4OTU2NA==&mid=2247484067&idx=1&sn=cafb861f1424701e271413a792ffd63c&chksm=972ac2b0a05d4ba6674169dccc3e249f28af816358bf2f5ced675a3ba012175ac8c55bb45925&mpshare=1&scene=1&srcid=#rd

## user-select:none

可用于某些只有点击功能的按钮上

## backface-visibility

https://developer.mozilla.org/zh-CN/docs/Web/CSS/backface-visibility


## CSS 伪元素 content 属性的诸多取值

http://jimyuan.github.io/blog/2018/01/05/content-property-of-pseudo-element.html

## 仅用CSS实现聊天室

https://github.com/kkuchta/css-only-chat

## text-rendering: optimizeLegibility;

https://blog.csdn.net/freshlover/article/details/9853363

## 伪元素的应用


### 展示可接受文件列表

默认情况下，文件输入的可接受文件列表是不可见的。 通常，我们使用伪元素来暴露它们：

```html
<input type="file" accept="pdf,doc,docx">
```

```css
[accept]:after {
   content: "Acceptable file types: " attr(accept);
}
```

### 自定义提示

使用属性选择器创建自定义工具提示既有趣又简单：

```css
[title] {
  position: relative;
  display: block;
}
[title]:hover:after {
  content: attr(title);
  color: hotpink;
  background-color: slateblue;
  display: block;
  padding: .225em .35em;
  position: absolute;
  right: -5px;
  bottom: -5px;
}
```

### 快捷键展示

web 的一大优点是它提供了许多不同的信息访问选项。一个很少使用的属性是设置accesskey的能力，这样就可以通过键组合和accesskey设置的字母直接访问该项目(确切的键组合取决于浏览器)。但是要想知道网站上设置了哪些键并不是件容易的事
下面的代码将显示这些键:focus。我不使用鼠标悬停，因为大多数时候需要accesskey的人是那些使用鼠标有困难的人。你可以将其添加为第二个选项，但要确保它不是惟一的选项。

```css
a[accesskey]:focus:after {
   content: " AccessKey: " attr(accesskey);
}
```

## 利用CSS选择器快速选择出不安全链接：

```css
a[href^="https"]{
   color: bisque;
}
a:not([href^="https"]) {
  color: darksalmon;
}
```

## https://juejin.im/post/5cd179586fb9a032045960b6

  如果 input 和 textarea 元素附加了 disabled 属性，那么其内容是无法被选中的，这种情况最好是将 disabled 替换为 readonly 。


## 【前端词典】提高幸福感的 9 个 CSS 技巧

https://juejin.im/post/5cb45a06f265da03474df54e#heading-18

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


## [译] 从没有人告诉过我的 CSS 小知识

https://juejin.im/post/5ca2fa5551882543db10d489

## CSS 选择器的妙用

https://blog.csdn.net/u013778905/article/details/79309773

https://www.zhangxinxu.com/wordpress/2016/08/css-parent-selector/

https://www.w3cplus.com/css/advanced-html-css-lesson3-complex-selectors.html

## opacity的妙用

https://juejin.im/post/5cd811c5f265da035d0c9a6e