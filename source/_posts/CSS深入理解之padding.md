---
title: CSS深入理解之padding
urlname: padding-of-css-in-depth-understanding
id: 688
categories:
  - CSS
tags:
  - CSS
date: 2017-04-20 20:30:24
---

1.padding和元素尺寸的关系
=================

对于block水平元素
-----------

*   padding太大时，一定会影响尺寸
*   width非auto，padding影响尺寸
*   width为auto或box-sizing为border-box，同时padding值没有过大,此时不会影响尺寸

对于inline水平元素
------------

水平padding影响尺寸,垂直padding不影响尺寸,**但是会影响背景色(占据空间)**

![](/images/hexo_post_60.png)

### inline元素padding特性应用>>高度可控的分割线

1.  直接使用字符：注册 | 退出登录
2.  inline-block控制：注册丨退出登录
3.  使用inline和padding：注册丨退出登录

注册<sapn></span>退出登录
span{
  padding:16px 6px 1px;
  margin-left:12px;
  border-left:2px solid;
  font-size:0;
}

2.padding负值
===========

padding不支持任何形式的负值

3.padding百分比值
=============

padding百分比均是相对于宽度计算的，所以可以用来实现一个正方形（**padding:50%**）

### inline元素的padding百分比值

*   同样相对于宽度计算
*   默认的高度宽度细节有差异
*   padding会断行

因为文字的换行导致表现诡异,当padding变小以至于文字不会换行时就会正常表现

![](/images/hexo_post_61.png)

空inline元素+padding高度也不等(高度大于宽度),此时如果设置font-size:0就可以正常表现了

原因:inline元素的垂直padding会让"幽灵空白节点"显现,也就是规范中的"strut"出现

4.标签元素的内置padding
================

ol/ul列表
-------

*   ol/li元素内置padding-left,但是单位是px不是em;
*   例如Chrome浏览器下是40px;
*   如果字号很小,间距就会很开;
*   如果字号很大,序号会爬到容器外面;

表单元素
----

*   所有浏览器input/textarea输入框内置padding
*   所有浏览器button按钮内置padding
*   部分浏览器select下拉内置padding，如FireFox、IE8+可以设置padding
*   所有浏览器radio/checkbox单复选框无内置padding
*   button按钮元素的padding最难控制

### button按钮

#### chrome浏览器

可以完美设置padding

#### FireFox浏览器

设置padding：0左右依然有padding，只能通过：

button::-moz-focus-inner{padding:0}

#### IE浏览器

IE7文字越多，左右padding逐渐变大，解决方案：

button{overflow:visible;}

4.padding与高度计算的不兼容
==================

button{
  line-height:20px;
  padding:10px;
  border:none;
}

*   IE7:45px
*   IE8+:40px
*   FireFox:42px
*   Chrome:40px

button按钮会有以上的各种bug，所以建议是**通过label按钮模拟按钮**

<button id="btn"></button>
<label for="btn">按钮</label>

label{
  display:inline-block;
  line-height:20px;
  padding:10px;
}

5.padding与图形绘制
==============

三道杠
---

第一道杠用border-top,第二道杠用background-color,第三道杠用border-bottom,中间空白用padding ![](/images/hexo_post_72.png)

hexo_post_52
----

中间大的圆用background-color,最外面的环用border,中间空白用padding

![](/images/hexo_post_52.png)

6.padding与布局
============

使用百分比单位构建固定比例布局结构
-----------------

移动端1：1头图布局

![](/images/hexo_post_75.png)

配合margin等高布局
------------

![](/images/hexo_post_71.png)

两栏自适应布局
-------

### padding在容器上

![](/images/hexo_post_125.png)

### padding在子元素上

![](/images/hexo_post_126.png)