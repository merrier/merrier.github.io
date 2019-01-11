---
title: CSS深入理解之absolute
urlname: abslute-of-css-in-depth-understanding
tags:
  - CSS
id: 744
categories:
  - CSS
date: 2017-04-21 21:11:24
---

1.超越overflow
============

独立的absolute可以摆脱overflow的限制,无论是滚动还是隐藏

**2.无依赖的absolute**
==================

不受relative限制的absolute定位,行为表现上是不使用top/right/bottom/left任何一个属性或使用auto作为值

3.定位的行为表现
=========

*   脱离文档流
*   去浮动：absolute生效的时候，float是失效的
*   位置跟随：原来是什么位置,绝对定位后依然是什么位置(元素是block,absolute之后依然是block,inline时absolute后依然是inline)
*   可以配合margin来精确定位
*   注释<!\-\- -->可以消除换行后的空白,同时保持代码可读性

4.居中以及边缘对齐定位
============

居中
--

采用『text-align:center』使div中的空格居中，利用『absolute的跟随性』配合『margin负值自身宽度50%』实现居中。 html：

<div class="course-loading-x">
     <img src="http://img.mukewang.com/5453077400015bba00010001.gif" class="course-loading" alt="加载中...">
</div>

css：

.course-loading-x { 
  height: 0; 
  margin-top: 20px; 
  text-align: center; 
  letter-spacing: -.25em; 
  overflow: hidden; 
}
.course-loading { 
  position: absolute; 
  margin-left: -26px; 
}

![](/images/hexo_post_64.png)

hexo_post_53
----

采用『text-align:right』使div中的空格居右(fixed是直接相对于窗口定位，而直接用absolute和right，bottom是会受到父级relative限制的。所以为了避免受到父级影响，使用fixed) html：

<div class="course-fixed-x">
    <div class="course-fixed">
        <a href="http://www.imooc.com/activity/diaocha" class="goto\_top\_diaocha"></a>
        <a href="http://www.imooc.com/user/feedback" class="goto\_top\_feed"></a>
    </div>
</div>

css：

.course-fixed-x { 
  height: 0; 
  text-align: right; 
  overflow: hidden; 
}
.course-fixed { 
  display: inline; 
  position: fixed; 
  margin-left: 20px; 
  bottom: 100px; 
}

![](/images/hexo_post_53.png)

5.处理对齐、溢出技巧
===========

处理文字前的星号
--------

将星号绝对定位后其不占据任何空间，方便后面的文字左对齐 html：

<label class="regist-label">
    <span class="regist-star">*</span>登录密码
</label>

css：

.regist-star { 
  position: absolute; 
  margin-left: -1em; 
  font-family: simsun; 
  color: #f30; 
}

图片与文字垂直对齐
---------

对图标设置绝对定位，并设置margin为负值 html：

<span class="regist-remark regist-warn">
    <i class="icon-warn"></i>邮箱格式不准确（演示）
</span>

css：

.regist-warn { 
  padding-left: 20px; 
  color: #be3948; 
}
.regist-warn > .icon-warn { 
  position: absolute; 
  margin-left: -20px; 
}

处理文字溢出
------

利用absolute绝对定位使span不占据任何空间，从而使其不换行（注<span>必须紧跟前一个标签，不能有空格） html：

<span class="regist-remark">请输入6-16位密码，区分大小写，不能使用空格</span>

css：

.regist-remark { 
  position: absolute; 
  line-height: 21px; 
  padding-top: 9px; 
  color: #666; 
}

6.脱离文档流
=======

回流与重绘
-----

由于回流与重绘的缘故，动画尽量作用在绝对定位元素上

垂直空间的等级
-------

\[z-index潜在『误区』:绝对定位元素都需要z-index控制等级以确定其显示的位置\]

### absolute是z-index无依赖的：

1.  如果只有一个绝对定位元素，则会自动**覆盖普通元素**
2.  如果有两个绝对定位，可以控制DOM流的前后顺序达到覆盖效果(**后来居上**)
3.  如果多个绝对定位交错（非常少见），则用**z-index：1控制**
4.  如果非弹框类的绝对定位元素**z-index>2，必定z-index冗余**，需要优化

7.**absolute的top/right/bottom/left和width/height**
=================================================

absolute元素使用top/right/bottom/left可以让元素在容器内自由定位
----------------------------------------------

但是遇到属性为**position:relative/absolute/fixed/sticky**的<div>时，则只能到这一层为止，无法突破这一层。

使用top/right/bottom/left实现『拉伸』
-----------------------------

当绝对定位的方向是『对立』的(如left和right)，则不是瞬间位移，而是『拉伸』效果 『position:absolute;left:0;top:0;width:50%』等价于『position:absolute;left:0;top:0;right:50%』

### 没有宽度和高度声明实现的全屏自适应效果：

.overlay {
  position: absolute;
  left: 0; 
  top: 0; 
  right: 0; 
  bottom: 0;
  background-color: #000;
  opacity: .5; 
}

### 高度自适应的九宫格效果

.page{
  position: absolute;
  left: 0; 
  top: 0; 
  right: 0; 
  bottom: 0;
}
.list {	
  float: left;
  height: 33.3%; 
  width: 33.3%;
  position: relative;
}

left/right和width同时存在
--------------------

相互支持性：

*   容器无需固定width/height值，内部元素亦可拉伸(**可实现图片上一张/下一张的遮盖层效果**)
*   容器拉伸，内部元素支持百分比width/height值

**优先级：width/height > left/right**