---
title: 前端面试系列（2）——CSS3新特性
urlname: new-features-of-css3
id: 233
categories:
  - CSS
tags:
  - CSS
  - 前端面试
date: 2017-03-18 18:37:57
---

CSS3 是 CSS 的升级版本，这套新标准提供了更加丰富且实用的规范，如：盒子模型、列表模块、超链接方式、语言模块、背景和边框、文字特效、多栏布局等等；和HTML5不同，CSS3的新特性基本上得到了广泛应用，而知道并熟练运用这些新特性已经成为前端人员的必修课：

更方便快捷的选择器
=========

:nth-child、:nth-last-child、:nth-of-type、:last-child、:only-child、:empty css3新增的选择器有很多，就不一一介绍了，这里有一篇关于css3新增选择器的文章总结的很好：[http://www.cnblogs.com/libingql/p/4375354.html](http://www.cnblogs.com/libingql/p/4375354.html)

框模型
===

border-radius（圆角）、box-shadow（盒子阴影）、border-image（边框图片）

背景
==

background-size（背景大小）、background-origin（背景的定位）、background-clip（背景的绘制区域）、支持多重背景图片（background-image:url(bg\_flower.gif),url(bg\_flower_2.gif);）

渐变效果
====

gradient属性可以非常方便的实现渐变色，同时可以设置渐变的方向和渐变方式等，实现各种复杂的效果。文末有一篇讲解gradient的文章我觉得讲的不错，感兴趣的可以去瞅瞅。

文本效果
====

text-shadow（文本阴影）、word-break（规定非中日韩文本的换行规则）、word-wrap（允许对长的不可分割的单词进行分割并换行到下一行）,CSS3的文本属性比较多，还是用一张图片代替吧（来自w3c）： ![](/images/hexo_post_138-300x164.png)

@font-face
==========

可以在网页中使用除默认字体之外的其他字体，先定义字体的名称，然后引入字体文件，在需要使用该字体的时候就通过font-family属性引用字体的名称

<style> 
@font-face
{
font-family: myFirstFont;
src: url('Sansation_Light.ttf'),
     url('Sansation_Light.eot'); /* IE9+ */
}

div
{
font-family:myFirstFont;
}
</style>

transform
=========

我认为这是CSS3最“好用”的特性，也正是因为这个属性（当然，下面那个属性也功不可没），通过CSS3转换就可以能够堆元素进行移动、缩放、转动、拉长或拉伸；同时结合对持续时间和延迟时间的控制，可以“创造”出非常炫的动画效果，大大提升了网页的展示效果。同时分为2D和3D转换，由于内容繁多，就不一一介绍了，感兴趣的小伙伴可以点击文末的链接进行进一步的学习。

transtion
=========

当元素从一种样式变换为另一种样式时为元素添加效果，使动画更加“圆润”流畅

@keyframes
==========

这是个面试中会经常问到的属性，原因是其应用领域非常广泛，因为如今用户的时间非常宝贵，同时网络上的信息又是鱼龙混杂，如何在有限的时间内抓住用户眼球是一个重要的课题，而@keyframes就可以让自己的网页焕然一新并且与众不同，通过@keyframes规则可以创建动画，再结合animation就可以使元素“动”起来。

多列布局
====

通过column-count（列数）、column-fill（如何填充列）、column-gap（列之间的间隔）、column-width（列的宽度）可以创建多个列来对文本进行布局，就像报纸那样。

用户界面
====

*   resize：是否可由用户调整元素尺寸
*   box-sizing：border-box/content-box，这个属性我也很喜欢，可以改变传统的“盒子模型”，方便进行布局
*   outline-offset：对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓（轮廓不占用空间并且可能是非矩形，这两点和边框不同）

flex弹性布局
========

这个属性让开发者非常头疼的“居中”问题找到了一种十分简便的答案，可以非常方便地实现让一个或多个元素在其父元素中垂直居中，建议大家去看阮一峰对其的讲解，很全面并且简单易懂（链接在文末）。 w3c关于CSS3的讲解：[http://www.w3school.com.cn/css3/index.asp](http://www.w3school.com.cn/css3/index.asp) 阮一峰对于flex的讲解：[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool) w3cplus对于gradient的讲解：[http://www.w3cplus.com/css3/new-css3-radial-gradient.html](http://www.w3cplus.com/css3/new-css3-radial-gradient.html)