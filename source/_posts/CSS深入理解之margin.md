---
title: CSS深入理解之margin
urlname: margin-of-css-in-depth-understanding
tags:
  - CSS
id: 700
categories:
  - CSS
date: 2017-04-20 22:58:44
---

1.margin与容器的尺寸
==============

*   适用于没有设定width/height的普通block水平元素(float元素,absolute/fixed元素,inline水平,table-cell元素虽然block化,但是不是普通的block水平元素)
*   只适用于水平方向尺寸
*   一侧定宽的自适应布局

![](/images/hexo_post_80.png)

*   hexo_post_59

外部容器设置padding值,只有chrome才会有留白,此时可以在给内部容器设置margin值

![](/images/hexo_post_59.png)

2.margin与百分比单位
==============

计算规则
----

普通元素的百分比margin都是相对于容器的宽度计算的 绝对定位元素的百分比margin是相对于第一个定位祖先元素(relative/absolute/fixed)的宽度计算的

应用-宽度2：1自适应矩形
-------------

由于margin百分比的计算规则是相对于容器进行计算的,而margin又可以影响普通block水平元素的可视尺寸,所以当设置为margin:50%时,由于margin重叠特性,所以会让元素的宽高始终保持2:1的比例 ![](/images/hexo_post_84.png)

3.margin重叠
==========

通常特性
----

发生在block水平元素（不包括float和absolute元素） 不考虑writing-mode，只发生在垂直方向（margin-top/margin-bottom）

3种情境
----

### 相邻的兄弟元素

![](/images/hexo_post_78.png)

### 父级和第一个/最后一个子元素

下面这3种书写形式的效果是相同的，都是子元素向下偏移了80px,而父级的尺寸并没有改变 ![](/images/hexo_post_56.png)

#### 父子margin重叠的其他条件

##### margin-top重叠

1.  父元素非块状格式化上下文元素
2.  父元素没有border-top设置
3.  父元素没有padding-top值
4.  父元素和第一个子元素之间没有inline元素分隔

##### margin-bottom重叠

1.  父元素非块状格式化上下文元素
2.  父元素没有border-bottom设置
3.  父元素没有padding-bottom值
4.  父元素没有和最后一个子元素之间没有inline元素分隔
5.  父元素没有height，min-height，max-height限制

### 空的block元素

![](/images/hexo_post_66.png)

#### 空的block元素margin重叠其他条件

1.  元素没有border设置
2.  元素没有padding值
3.  里面没有inline元素
4.  没有height，或者min-height

margin重叠计算规则
------------

*   正正取大值：50和20-->50
*   正负值相加：50和-20-->30
*   负负最负值：-50和-30-->-50

margin重叠的意义
-----------

1.  连续段落或列表之类，如果没有margin重叠，首尾项间距会和其他兄弟标签1：2关系，排版不自然
2.  web中任何地方嵌套或直接放入任何裸div，都不会影响原来的布局
3.  遗落的空任意多个<p>元素，不要影响原来的阅读排版

善用margin重叠
----------

![](/images/hexo_post_73.png)

4.margin auto
=============

如果一侧定值,一侧auto,auto为剩余空间大小;如果两侧都是auto,则平分剩余空间(居中显示),但是不能计算负值

writing-mode与垂直居中
-----------------

更改流为垂直方向，实现垂直方向的margin:auto居中

.father{
  height:200px;
  width:100%;
  writing-mode:vertical-lr;
}
.son{
  height:100px;
  width:500px;
  margin:auto;
}

absolut与margin居中
----------------

top:0;right:0;bottom:0;left:0;会使子元素的宽度和高度拉伸到与父元素相同大小,当没有width/height属性时,absolute元素自动填满了容器;但设置了width/height属性后,会限制absolute元素自动填满容器,此时margin:auto就会自动平分被变更的尺寸空间,从而实现子元素的水平垂直居中

.father{
  height:200px;
  position:relative;
}
.son{
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  width:500px;
  height:100px;
  margin:auto;
}

5.margin负值定位
============

margin负值下的两端对齐
--------------

margin可以改变元素尺寸 ![](/images/hexo_post_118.png)

margin负值下的等高布局
--------------

margin改变元素占据空间：给每个框设置大的底部内边距，然后用数值相似的负外边距消除这个高度。这会导致每一列溢出容器元素，如果把外包容器的overflow属性设为hidden，列就在最高点被裁切

![](/images/hexo_post_116.png)

margin负值下的两栏自适应布局
-----------------

元素占据空间跟随margin移动 ![](/images/hexo_post_117.png)

6.margin无效情形解析
==============

inline元素的垂直margin无效
-------------------

前提：

*   非替换元素：替换元素为<img><button>元素
*   正常书写模式

![](/images/hexo_post_109.png) ![](/images/hexo_post_67.png)

margin重叠
--------

上面讲过了

display：table-cell与margin
-------------------------

[MDN上的解释](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)：除了display为table相关类型（不包括table-caption，table以及inline-table）的所有，甚至也可应用于::first-letter

position:absolute与margin
------------------------

绝对定位元素**非定位方位**的margin值"无效" 绝对定位的margin值一直有效,只是不像普通元素那样,可以和兄弟元素插科打诨!

鞭长莫及导致的margin无效
---------------

浮动元素和绝对定位元素会破坏布局,此时的margin-left会从整个父容器的左侧开始算起,所以当margin-left值小于图片的宽度的时候,会看不到效果,但其实是有效的

内联特性导致的margin无效
---------------

内联元素默认基线对齐(vertical-align:baseline),当margin-top是一个很大的负值的时候,由于字母x(内敛元素)的拖累(x没有添加任何样式,所以不会跑到父容器外面),内联元素仍然在与x基线对齐的位置 ![](/images/hexo_post_69.png)

7.margin-start和margin-end
=========================

**正常流下：** margin-start-->margin-left margin-end-->margin-right margin-before-->margin-top margin-after-->margin-bottom 如果水平流是从右往左，margin-start等同于margin-right 在垂直流下（writing-mode：vertical-*），margin-start等同于margin-top

8.margin-collapse
=================

决定margin重叠时该如何表现

> **-webkit-margin-collapse:<collapse> | <discard> | <separate>**

*   collapse（默认-重叠）
*   discard（取消）-->此时margin将变为0
*   separate（分隔）-->此时margin将不再重叠，而是相加