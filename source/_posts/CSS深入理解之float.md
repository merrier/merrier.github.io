---
title: CSS深入理解之float
urlname: float-of-css-in-depth-understanding
tags:
  - CSS
id: 752
categories:
  - CSS
date: 2017-04-21 21:41:31
---

1.float的历史
==========

浮动设计的初衷:实现文字环绕

2.float感性认知
===========

float具有**包裹性**和**破坏性**

具有包裹性的小伙伴:
----------

*   display:inline-block/table-cell/...
*   position:absolute(近亲)/fixed/sticky
*   overflow:hidden/scroll

具有破坏性的小伙伴:(父级元素容器塌陷,高度变为0)
--------------------------

*   display:none
*   position:absolute(近亲)/fixed/sticky

**3.如何解决浮动让父元素高度塌陷的问题**
=======================

浮动的破坏性只是单纯为了实现文字环绕效果而已 关于**浮动塌陷**：给父元素设置了宽高,那么父元素不会塌陷;如果设置了宽度没有设置高度,会塌陷,宽度值还是设定的值,高度为0;如果没有设置宽高,发生塌陷,宽度为页面宽度,高度为0.

4.清除浮动
======

底部插入**clear:both**
------------------

.clearfix:after{
  content:'';
  display:block;
  height:0;
  overflow:hidden;
  clear:both;
}
.clearfix{
  *zoom:1;
}

更好的方法：

.clearfix:after{
  content:'';
  display:table;
  clear:both;
}
.clearfix{
  *zoom:1;
}

5.BFC
=====

BFC：Block Formatting Context，**块级格式化上下文**，一个独立的块级渲染区域，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关

产生条件：
-----

1.  html根元素
2.  float的值不为none
3.  display的值为inline-block、table-cell、table-caption
4.  position的值为absolute或fix

约束规则：
-----

1.  生成BFC元素的子元素会一个接着一个防止垂直方向上他们的起点是一个包含块的顶部，两个相邻子元素之间的垂直距离取决于元素的margin特性。在BFC中相邻的块级元素外边距会折叠，同属一个BFC的两个相邻Box的margin会发生重叠。
2.  生成BFC元素的子元素中，每一个子元素左外边距与包含块的左边界接触，即使浮动元素也是如此（除非这个子元素自身也是一个浮动元素）。
3.  BFC的区域不会与float的元素区域重叠。
4.  计算BFC高度时，浮动元素也参与计算。
5.  BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。

6.浮动的优劣
=======

浮动的影响
-----

*   元素block块状化(砖头化)
*   破坏性造成的紧密排列特性(去空格化，和inline-block不同)

浮动存在的问题:
--------

*   容错性比较糟糕,容易出问题
*   全部用固定尺寸,代码不易重用
*   与IE7及以下版本不兼容

7.两侧自适应布局
=========

.left{  //左侧
  float:left;
}
.right{  //右侧
  width:max-width;
  *width:auto;
  display:table-cell;
  *display:inline-block
}