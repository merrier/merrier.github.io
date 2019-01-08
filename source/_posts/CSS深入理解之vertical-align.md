---
title: CSS深入理解之vertical-align
urlname: vertical-align-of-css-in-depth-understanding
tags:
  - CSS
id: 727
categories:
  - CSS
date: 2017-04-21 16:40:08
---

1.vertical-align支持的属性值
======================

1.  线类：**baseline**，top，middle，bottom
2.  文本类：text-top，text-bottom
3.  上标下标类：sub，super
4.  数值百分比类：20px，2em，20%，...

其中，默认为baseline，百分之值是相对于line-height计算的

2.vertical-align起作用的前提
======================

应用于inline水平和table-cell元素（图片，按钮，文字，单元格）

inline水平：
---------

*   inline：<img>，<span>，<strong>，<em>，未知元素，...
*   inline-block：<input>(IE8+)，<button>(IE8+)，...

table-cell元素
------------

*   table-cell：<td>

3.个数不定文字与图片垂直对齐
===============

html：

<div class="test-list">
  <span>文字</span>
  <img src="小公主.jpg">
</div>

css：

.test-list>span{
  display:inline-block;
  width:210px;
  vertical-align:middle;
}
.test-list>img{
  vertical-align:middle;
}

4.vertical-align与line-height
============================

**任何内联元素都会受到vertical-align与line-height的影响**
-------------------------------------------

![](https://merrier.wang/wp-content/uploads/2017/04/内联元素.png) 图片没有居中显示,因为**受到了vertical-align与line-height的影响**,此时的默认属性为vertical-align:baseline;line-height:1.5;font-size:24px

如何消除这种影响
--------

1.  消灭vertical-align：display:block;margin:auto
2.  改变vertical-align：vertical-align:top/middle/bottom
3.  改变line-height：line-height:0;font-size:0;

inline-block的基线
---------------

inline-block的基线是正常流中最后一个line box的基线,除非,这个line box里面既没有line boxes或者本身'overflow'属性的计算值不是'visible',这种情况下基线是margin底边缘 ![](https://merrier.wang/wp-content/uploads/2017/04/inline-block的基线.png) 左边的元素基线为边框下边缘，右边的元素基线为X文字下边缘

5.vertical-align线性类属性值表现
========================

vertical-align:bottom
---------------------

1.  inline/inline-block元素:元素底部和整行的底部对齐
2.  table-cell元素:单元格底padding边缘和表格行的底部对齐

vertical-align:top
------------------

1.  inline/inline-block元素:元素顶部和整行的顶部对齐
2.  table-cell元素:单元格顶padding边缘和表格行的顶部对齐

vertical-align:middle
---------------------

*   inline/inline-block元素:元素垂直中心点和父元素基线上1/2x-height处对齐

![](https://merrier.wang/wp-content/uploads/2017/04/近似垂直居中.png) 文字具有下沉的特性,而父容器的高度是由文字撑开的,所以父容器的中心点与元素垂直中心点是不重合的,可以设置**font-size:0**解决这个问题

*   table-cell元素:单元格填充盒子相对于外面的表格行居中对齐

6.vertical-align文本类属性值
======================

vertical-align:text-top
-----------------------

盒子的顶部和父级content area的顶部对齐

vertical-align:text-bottom
--------------------------

盒子的底部和父级content area的底部对齐 ![](https://merrier.wang/wp-content/uploads/2017/04/text-bottom.png)

*   vertical-align垂直对齐的位置与前后的元素都没有关系;
*   元素vertical-align垂直对齐的位置与行高line-height没有关系,只与字体大小font-size有关

7.vertical-align前后不一致的行为表现
==========================

关注当前元素和父级，因为前后并没有直接影响 ![](https://merrier.wang/wp-content/uploads/2017/04/近似垂直居中-1.png) 在img后面加一个内联元素,并且设置vertical-align:middle就可以实现图片的垂直居中

8.vertical-align的实际应用
=====================

小图片和文字对齐
--------

vertical-align设置为负值 ![](https://merrier.wang/wp-content/uploads/2017/04/小图片和文字对齐.png)

不定尺寸图片和多行文字的垂直居中
----------------

三个步骤：

1.  主体元素inline-block化;
2.  0宽度100%高度辅助元素;
3.  vertical-align:middle;

如果已经是inline-block（img）水平元素，就不需要额外设置display属性 ![](https://merrier.wang/wp-content/uploads/2017/04/不定尺寸图片和多行文字的垂直居中.png)