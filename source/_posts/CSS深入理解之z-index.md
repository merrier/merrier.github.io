---
title: CSS深入理解之z-index
urlname: z-index-of-css-in-depth-understanding
tags:
  - CSS
id: 715
categories:
  - CSS
date: 2017-04-20 23:38:25
---

1.z-index基础
===========

z-index含义
---------

z-index属性指定了元素及其子元素的\[z顺序\],而\[z顺序\]可以决定当元素发生覆盖的时候,哪个元素在上面.通常一个较大z-index值的元素会覆盖较低的那一个

属性值
---

auto-->默认值

<integer>-->整数值

inherit-->继承

基本特性
----

*   支持负值
*   支持CSS3 animation动画

@keyframes zIndex{
  0%{z-index:-1;}
  100%{z-index:51;}
}

*   在CSS2.1时代，需要和定位元素配合使用

如果不考虑CSS3,只有定位元素(position:relative/absolute/fixed/sticky,没有static)的z-index才有作用!在CSS3中有例外......

2.z-index与定位元素
==============

如果定位元素z-index没有发生嵌套
-------------------

*   后来居上
*   哪个大，哪个在上面

如果定位元素发生嵌套
----------

祖先优先原则（前提：z-index为数值，不是auto）： ![](https://merrier.wang/wp-content/uploads/2017/04/祖先优先.png)

3.层叠上下文
=======

层叠上下文(stacking context)是HTML元素中的一个三维概念,表示元素在z轴上有了"可以高人一等"的能力 含义:

*   皇帝(你)
*   当官(层叠上下文元素)
*   家族(嵌套)

层叠上下文是表示普通老百姓HTML元素当官了,离皇帝更近了

产生层叠上下文：
--------

1.  页面根元素天生具有层叠上下文,称之为"根层叠上下文"-->皇亲国戚
2.  z-index值为数值的定位元素也具有层叠上下文-->科考入选
3.  其他属性-->其他当官途径

层叠上下文特性
-------

*   层叠上下文可以嵌套,组合成一个分层次的层叠上下文

一个家里，爸爸可以当官，孩子也是可以同时当官的。这个家族的官就当得比较有层次

*   每个层叠上下文和兄弟元素独立:当进行层叠变化或渲染的时候,只需要考虑后代元素

自己当官，兄弟不沾光。有什么福利或者变故只会影响自己的孩子们

*   每个层叠上下文是自成体系的:当元素的内容被层叠后,整个元素被认为是在父层的层叠顺序中

每个当官的都有属于自己的小团体。当子孙或属下发生的排辈摩擦什么的，都是自己宅院的事情，不会影响官员自己和皇帝之间的距离

4.层叠水平
======

层叠上下文中的每个元素都有一个层叠水平(stacking level)，决定了同一个层叠上下文中元素在z轴上的显示顺序，**遵循"后来居上"和"谁大谁上"的层叠准则** 层**叠水平和z-index不是一个东西**.普通元素也有层叠水平 每一个当官的家里儿孙啊,仆人什么的,都有一个论资排辈(即层叠水平),决定了在一起的时候,谁排在前面,离官员更近

5.层叠顺序
======

元素发生层叠时候有着特定的垂直显示顺序，即内容>布局>装饰 ![](https://merrier.wang/wp-content/uploads/2017/04/7层层叠水平.png)

6.z-index与层叠上下文
===============

1.  定位元素默认z-index:auto,同时可以看成是z-index:0;
2.  z-index不为auto的定位元素会创建层叠上下文;
3.  z-index层叠顺序的比较止步于父级层叠上下文;

![](https://merrier.wang/wp-content/uploads/2017/04/z-index与层叠上下文.png)

7.其他CSS属性与层叠上下文
===============

其他参与层叠上下文的属性们

1.  z-index值不为auto的flex项（父元素display：flex|inline-flex）
2.  元素的opacity值不是1
3.  元素的transform值不是none
4.  元素mix-blend-mode值不是normal
5.  元素的filter值不是none
6.  元素的isolation值是isolate
7.  position：fixed声明
8.  will-change指定的属性值为上面任意一个
9.  元素的-webkit-overflow-scrolling设为touch

8.z-index与其他CSS属性层叠上下文
======================

不支持z-index的层叠上下文元素的层叠顺序均是z-index：auto级别
---------------------------------------

![](https://merrier.wang/wp-content/uploads/2017/04/更完整的7阶层叠水平.png)

依赖z-index值创建层叠上下文的情况
--------------------

1.  position值为relative/absolute或fixed(部分浏览器)
2.  display:flex|inline-flex容器的子flex项

9.z-index相关实践
=============

最小化影响原则
-------

*   避免使用定位属性;
*   定位属性从大容器平级分离为私有小容器

不犯二原则
-----

对于非浮层元素(浮层元素为弹框,蒙版之类),避免设置z-index值,z-index值没有任何道理需要超过2----不犯二准则;

组件层级计数器
-------

通过js获得body下子元素的最大z-index值

可访问性隐藏
------

z-index负值元素在层叠上下文的背景之上,其他元素之下 ![](https://merrier.wang/wp-content/uploads/2017/04/可访问性隐藏.png)