---
title: 前端面试系列（5）——CSS盒子模型
urlname: the-css-box-model
tags:
  - CSS
  - 前端面试
id: 398
categories:
  - CSS
  - 面试
date: 2017-04-03 20:20:11
---

写在前面
====

盒子模型是html+css最核心的基础知识，理解了这个重要的概念才能更好的排版，进行页面布局；同时在前端面试或笔试中也经常遇到，所以深入理解盒子模型对自身前端水平的提升有很大帮助。

概念介绍
====

css盒子模型又称为框模型（Box Model），包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素，如图： ![](/images/hexo_post_16-300x300.gif) 图中最内部的框是元素的实际内容，也就是元素框，紧挨着元素框外部的是内边距padding，其次是边框（border），然后最外层是外边距（margin），整个构成了框模型。通常我们设置的背景显示区域，就是内容、内边距、边框这一块范围。下面是对这四个部分的说明：

*   **Margin（外边距）** \- 边框外围区域。Margin没有背景颜色，它是完全透明
*   **Border（边框）** \- 边框周围的填充和内容。边框是受到盒子的背景颜色影响
*   **Padding（内边距）** \- 清除内容周围的区域。会受到框中填充的背景颜色影响
*   **Content（内容）** \- 盒子的内容，显示文本和图像

那么，元素框的总宽度 = 元素（element）的width + padding的左边距和右边距的值 + margin的左边距和右边距的值 + border的左右宽度； 元素框的总高度 = 元素（element）的height + padding的上下边距的值 + margin的上下边距的值 ＋ border的上下宽度。 所以，在box-sizing为content-box也就是上面所述盒子模型时，当我们指定了一个CSS元素的高度和宽度属性时，只是设置了内容区域的高度和宽度

盒子模型表现
======

1.外边距合并（叠加）
-----------

两个上下方向相邻的元素框垂直相遇时，外边距会合并，合并后的外边距的高度等于两个发生合并的外边距中较高的那个边距值，如图： ![](/images/hexo_post_17-300x193.png) ![](/images/hexo_post_18-300x127.png) 比较容易理解，所以在页面中有时候遇到实际情况是需要考虑这个因素的。当然外边距合并其实也有存在的意义，如下图： ![](/images/hexo_post_19-300x205.png) 关于margin合并，其实还有很多不为人知的知识和问题，稍晚一些我会再专门针对margin合并写一篇文章（其实应该不算是“写”，因为是对张鑫旭的讲解的总结），感兴趣的童鞋可以直接搜索“margin合并”查看

box-sizing
==========

box-sizing属性是用户界面属性里的一种（CSS3），之所以介绍它，是因为这个属性跟盒子模型有关，而且在css reset中有可能会用到它。 `box-sizing : content-box|border-box|inherit;` (1) **content-box** ,默认值，可以使设置的宽度和高度值应用到元素的内容框。盒子的width只包含内容。

即总宽度=margin+border+padding+width

(2) **border-box** , 设置的width值其实是除margin外的border+padding+element的总宽度。盒子的width包含border+padding+内容

即总宽度=margin+width

(3) **inherit** , 规定应从父元素继承 box-sizing 属性的值 下面两张图形象的展示了box-sizing为content-box和border-box时的区别： （1）标准的盒子模型（content-box）： ![](/images/hexo_post_14.png) （2）IE盒子模型（border-box）： ![](/images/hexo_post_15-300x290.png)

### 关于border-box的使用：

1 一个box宽度为100%，又想要两边有内间距，这时候用就比较好 2 全局设置 border-box 很好，首先它符合直觉，其次它可以省去一次又一次的加加减减，它还有一个关键作用——让有边框的盒子正常使用百分比宽度。

盒子模型应用
======

1.用盒子模型画三角形
-----------

html代码：

<!DOCTYPE html>
<html>
  <head>
    <style>
        .triangle {
            width : 0;
            height: 0;
            border : 100px solid transparent;
            border-top : 100px solid blue; /*这里可以设置border的top、bottom、left、right四个方向的三角*/
        }
    </style>
  </head>
  <body>
    <div class="triangle"></div>
  </body>
</html>

页面显示结果为： ![](/images/hexo_post_20.png)

盒子模型产生的问题
=========

1.margin越界
----------

即第一个子元素的margin-top和最后一个子元素的margin-bottom的越界问题，以第一个子元素的margin-top 为例： 当父元素没有边框border时，设置第一个子元素的margin-top值的时候，会出现margin-top值加在父元素上的现象，解决方法有四个：

1.  给父元素加边框border （副作用）
2.  给父元素设置padding值  （副作用）
3.  父元素添加 overflow：hidden （副作用）
4.  **父元素加前置内容生成**。（推荐）

以第4种方法为例： html代码：

<div class="parent">
    <div class="child"></div> 
</div>

css代码：

.parent {
     width : 500px;
     height : 500px;
     background-color : red;       
}
.parent : before {
     content : " ";
     display : table;
}

.child {
     width : 200px;
     height : 200px;
     background-color : green;
     margin-top : 50px;
}

2.浏览器间的盒子模型
-----------

（1）ul标签在Mozilla中默认是有padding值的，而在IE中只有margin有值。 （2）标准盒子模型与IE模型之间的差异： 标准的盒子模型就是上述介绍的那种，而IE模型更像是 box-sizing : border-box; 其内容宽度还包含了border和padding。解决办法就是：在html模板中加doctype声明。但是我自己在项目中已经很少考虑IE了，如果没有特殊要求的话，IE基本上可以完全忽略了

##### 参考链接

cnblogs：[http://www.cnblogs.com/clearsky/p/5696286.html](http://www.cnblogs.com/clearsky/p/5696286.html)