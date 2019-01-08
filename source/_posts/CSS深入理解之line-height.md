---
title: CSS深入理解之line-height
urlname: line-height-of-css-in-depth-understanding
tags:
  - CSS
id: 736
categories:
  - CSS
date: 2017-04-21 16:56:36
---

1.baseline与line-height
======================

两条baseline之间的距离即为行高(不同的字体所在位置不同,可能偏离基线) ![](https://merrier.wang/wp-content/uploads/2017/04/baseline与line-height.png)

2.行内框盒子模型
=========

一共有4种模型：

1.  **内容区域**(content area),是一种围绕文字看不见的盒子."内容区域"(content area)的大小与font-size的大小相关;
2.  **内联盒子**(inline boxes),内联盒子不会让内容成块显示,而是排成一行.如果外部含inline水平的标签(span,a,em等),则属于内联盒子.如果是个光秃秃的文字,则属于匿名内联盒子;
3.  **行框盒子**(line boxes),每一行就是一个行框盒子,每个行框盒子又是由一个一个内联盒子组成;
4.  <p>标签所在的**包含盒子**(containing box),此盒子由一行一行的行框盒子组成;

3.line-height与内联元素的高度机制
=======================

*   **内联元素的高度是由line-height决定的;**
*   行高由于其继承性,影响无处不在,即使单行文本也不例外;
*   行高只是幕后黑手,高度的表现不是行高,而是内容区域和行间距;
*   **内容区域高度(content area)+行间距(vertical spacing)=行高(line-height);**
*   内容区域高度只与字号以及字体有关,与line-height没有任何关系;在simsun字体下,内容区域高度等于文字大小值;
*   行间距上下拆分,就有了"半行间距";
*   **行高决定内联盒子高度;行间距墙头草,可大可小(甚至负值),保证高度正好等同于行高;**
*   含多个行框盒子的包含容器----多行文本的高度就是单行文本高度累加.

4.line-height各类属性值
==================

normal
------

默认属性值.跟着用户的浏览器走,且与元素字体关联

<number>
--------

使用数值作为行高值,根据当前元素的font-size大小计算

<length>
--------

使用具体长度值作为行高值,如1.5em;1.5rem;20px;20pt

<percent>
---------

相对于设置了该line-height属性的元素的font-size大小计算

inherit
-------

继承,input框等元素默认行高是normal,使用inherit可以让文本框样式可控性更强

5.line-height设置为1.5/150%/1.5em有何区别
==================================

计算上无差别，但是**150%/1.5em是根据父元素的font-size计算的，1.5是根据自身的font-size计算；也就是150%/1.5em是会将行高继承给后代元素的，而1.5只会将比例继承给后代元素，后代元素会根据自己的font-size重新计算行高** ![](https://merrier.wang/wp-content/uploads/2017/04/应用元素的差别.png)

6.body全局数值行高使用经验
================

body{
  font-size:14px;
  line-height:?
}

为了方便心算，所以我们**将行高设置为20px**，此时的line-height为： line-height=20px/14px≈1.4287->**line-height:1.4286**

7.line-height与图片的表现
===================

**行高不会影响图片实际占据的高度**
-------------------

图片外面有隐藏的“幽灵”文本节点，所以text-align:center会使图片在p标签中居中 ![](https://merrier.wang/wp-content/uploads/2017/04/隐匿文本节点.png) 内联元素的vertical-align默认为baseline,所以文字的基线与图片的最下方对齐,但由于文字有行高,所以图片下方会有空隙： ![](https://merrier.wang/wp-content/uploads/2017/04/文字基线与图片最下方对齐.png)

如何消除图片底部间隙
----------

### **图片块状化-无基线对齐**

img{display:block;}

块状化的元素没有vertical-align属性

### **图片底线对齐**

img{vertical-align:bottom}

vertical-align不再是baseline,文本的最下方与图片的最下方对齐

### **行高足够小-基线位置上移**

.box{line-height:0;}

基线位置上移到图片的最下方

小图片和大文字
-------

基本上高度受行高控制

8.line-height的实际应用
==================

图片水平垂直居中
--------

.box{
  line-height:300px;
  text-align:center;
}
.box>img{
  vertical-align:middle;
}

多行文本水平垂直居中
----------

多行文字水平垂直居中实现的原理跟上一页图片的实现是一样的,区别在于要把多行文本所在的容器的display水平转换成和图片一样的,也就是inline-block,以及重置外部继承的text-align和line-height属性值

.box{
  line-height:250px;
  text-align:center;
}
.box>.text{
  display:inline-block;
  line-height:normal;
  text-align:left;
  vertical-align:middle;
}