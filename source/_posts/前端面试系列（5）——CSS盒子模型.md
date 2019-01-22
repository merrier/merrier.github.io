---
title: 前端面试系列（5）——CSS盒子模型
urlname: css-box-model
id: 398
categories:
  - CSS
tags:
  - CSS
  - 面试
date: 2017-04-03 20:20:11
img: /images/hexo_thumbnail_63.png
---

盒子模型是 html + css 最核心的基础知识，理解了这个重要的概念才能更好的排版，进行页面布局；同时在前端面试或笔试中也经常遇到，所以深入理解盒子模型对自身前端水平的提升有很大帮助。

## 概念介绍

css 盒子模型又称为框模型（Box Model），包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素，如图：

<div align='center'><img src='/images/hexo_post_16.gif' alt='' width='400'/></div>

图中最内部的框是元素的实际内容，也就是元素框，紧挨着元素框外部的是内边距 padding，其次是边框（border），然后最外层是外边距（margin），整个构成了框模型。通常我们设置的背景显示区域，就是内容、内边距、边框这一块范围。下面是对这四个部分的说明：

* **Margin（外边距）** \- 边框外围区域。Margin 没有背景颜色，它是完全透明
* **Border（边框）** \- 边框周围的填充和内容。边框是受到盒子的背景颜色影响
* **Padding（内边距）** \- 清除内容周围的区域。会受到框中填充的背景颜色影响
* **Content（内容）** \- 盒子的内容，显示文本和图像

那么，元素框的总宽度 = 元素（element）的 width + padding 的左边距和右边距的值 + margin 的左边距和右边距的值 + border 的左右宽度；
元素框的总高度 = 元素（element）的height + padding 的上下边距的值 + margin 的上下边距的值 ＋ border 的上下宽度。
所以，在 box-sizing 为 content-box 也就是上面所述盒子模型时，当我们指定了一个 CSS 元素的高度和宽度属性时，只是设置了内容区域的高度和宽度

## 盒子模型表现

### 外边距合并（叠加）

两个上下方向相邻的元素框垂直相遇时，外边距会合并，合并后的外边距的高度等于两个发生合并的外边距中较高的那个边距值，如图：

<div align='center'><img src='/images/hexo_post_17.png' alt='' width='500'/></div>

<div align='center'><img src='/images/hexo_post_18.png' alt='' width='500'/></div>

比较容易理解，所以在页面中有时候遇到实际情况是需要考虑这个因素的。当然外边距合并其实也有存在的意义，如下图：

<div align='center'><img src='/images/hexo_post_19.png' alt='' width='500'/></div>

关于 margin 合并，其实还有很多不为人知的知识和问题，稍晚一些我会再专门针对 margin 合并写一篇文章（其实应该不算是“写”，因为是对张鑫旭的讲解的总结），感兴趣的童鞋可以直接搜索 “margin 合并”查看

## box-sizing

box-sizing 属性是用户界面属性里的一种（CSS3），之所以介绍它，是因为这个属性跟盒子模型有关，而且在 css reset 中有可能会用到它。

> box-sizing: content-box | border-box | inherit; 

### content-box

默认值，可以使设置的宽度和高度值应用到元素的内容框。盒子的 width 只包含内容。

即总宽度 = margin + border + padding + width

### border-box

设置的 width 值其实是除 margin 外的 border + padding + element 的总宽度。盒子的 width 包含 border + padding + 内容

即总宽度 = margin + width，关于 border-box 的使用：

1. 一个 box 宽度为 100%，又想要两边有内间距，这时候用就比较好
2. 全局设置 border-box 很好，首先它符合直觉，其次它可以省去一次又一次的加加减减，它还有一个关键作用——让有边框的盒子正常使用百分比宽度。

### inherit

规定应从父元素继承 box-sizing 属性的值 下面两张图形象的展示了 box-sizing 为 content-box 和 border-box 时的区别：

（1）标准的盒子模型（content-box）：

<div align='center'><img src='/images/hexo_post_14.png' alt='' width='400'/></div>

（2）IE盒子模型（border-box）：

<div align='center'><img src='/images/hexo_post_15.png' alt='' width='400'/></div>

## 盒子模型应用

### 用盒子模型画三角形

html 代码：

```html
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
```

页面显示结果为：

<div align='center'><img src='/images/hexo_post_20.png' alt='' width='200'/></div>

## 盒子模型产生的问题

### margin 越界

即第一个子元素的 margin-top 和最后一个子元素的 margin-bottom 的越界问题，以第一个子元素的margin-top 为例：当父元素没有边框 border 时，设置第一个子元素的 margin-top 值的时候，会出现 margin-top 值加在父元素上的现象，解决方法有四个：

1. 给父元素加边框 border （副作用）
2. 给父元素设置 padding值  （副作用）
3. 父元素添加 overflow: hidden （副作用）
4. **父元素加前置内容生成**。（推荐）

以第 4 种方法为例：

html 代码：

```html
<div class="parent">
    <div class="child"></div> 
</div>
```

css代码：

```css
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
```

### 浏览器间的盒子模型

1. ul 标签在 Mozilla 中默认是有 padding 值的，而在 IE 中只有 margin 有值。
2. 标准盒子模型与 IE 模型之间的差异：标准的盒子模型就是上述介绍的那种，而 IE 模型更像是 box-sizing: border-box；其内容宽度还包含了 border 和 padding。解决办法就是：在 html 模板中加 doctype 声明。但是我自己在项目中已经很少考虑 IE 了，如果没有特殊要求的话，IE 基本上可以完全忽略了

## 参考文章

* [css 盒子模型理解](http://www.cnblogs.com/clearsky/p/5696286.html)