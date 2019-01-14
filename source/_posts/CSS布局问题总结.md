---
title: CSS布局问题总结
urlname: summary-of-css-Layout-problems
id: 946
categories:
  - CSS
tags:
  - CSS
date: 2017-07-04 18:17:27
img: /images/hexo_thumbnail_63.png
---

本文主要对 CSS 中常见的布局问题进行了总结，同时提供了解决方案和一些参考链接，涉及到三栏式布局（圣杯、双飞翼），居中布局等等；感兴趣的童鞋可以点击来源链接查看原文，因为本文是基于原文进行整理的，所以内容会比原文精简。

## 基础知识

* [学习CSS布局](http://zh.learnlayout.com/)（排版和配色比较舒服，简短不深入，适合入门）
* [10个文档学布局](http://www.barelyfitz.com/screencast/html-training/css/positioning/)（通过十个例子讲解布局，主要涉及相对布局，绝对布局和浮动）

## 三栏式布局

涉及浮动和清除浮动，主要讲解“圣杯”和“双飞翼”两种解决方法。这两种方法实现的都是三栏布局，两边的盒子宽度固定，中间盒子自适应，它们实现的效果是一样的，差别在于其实现的思想：

<div align='center'><img src='/images/hexo_post_22.png' alt='' width='400'/></div>

### 圣杯布局

#### 介绍

圣杯：父盒子包含三个子盒子（左，中，右）

* 中间盒子的宽度设置为 `width: 100%;` 独占一行；
* 使用负边距(均是 `margin-left`)把左右两边的盒子都拉上去和中间盒子同一行；
    * `.left {margin-left:-100%;}` 把左边的盒子拉上去
    * `.right {margin-left：-右边盒子宽度px;}` 把右边的盒子拉上去
* 父盒子设置左右的 padding 来为左右盒子留位置；
* 对左右盒子使用相对布局来占据 padding 的空白，避免中间盒子的内容被左右盒子覆盖；

#### HTML结构

```html
<div class="container">
    <!\-\- 中间的div必须写在最前面 -->
    <div class="middle">中间内容区</div>
    <div class="left">左边栏</div>
    <div class="right">右边栏</div>
</div>
```

#### CSS

```css
*{
    margin:0;
    padding: 0;
    height:300px;
}
.container{
    /*左右栏通过添加负的margin放到正确的位置了，此段代码是为了摆正中间栏的位置*/
    padding:0 200px 0 180px;
    height:100px;
}
.middle{
    float:left;
    width:100%;/*左栏上去到第一行*/
    height:100px;
    background:blue;
}
.left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:#0c9;
    /*中间栏的位置摆正之后，左栏的位置也相应右移，通过相对定位的left恢复到正确位置*/
    position:relative;
    left:-180px;
}
.right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#0c9;
    /*中间栏的位置摆正之后，右栏的位置也相应左移，通过相对定位的right恢复到正确位置*/
    position:relative;
    right:-200px;
}
```

### 双飞翼布局

双飞翼：父盒子包含三个子盒子（左，中，右），中间的子盒子里再加一个子盒子。

* 中间盒子的宽度设置为 `width: 100%;` 独占一行；
* 使用负边距(均是 `margin-left`)把左右两边的盒子都拉上去和中间盒子同一行；
* 在中间盒子里面再添加一个 div，然后对这个 div 设置 `margin-left` 和 `margin-right`来为左右盒子留位置；

#### HTML结构

```html
<div class="container">
    <!\-\- 中间的div必须写在最前面 -->
    <div class="middle">
        <div class="middle-inner">中间弹性区</div>
    </div>
    <div class="left">左边栏</div>
    <div class="right">右边栏</div>
</div>
```

#### CSS

```css
*{
    margin:0;
    padding: 0
}
.middle{
    float: left;
    width: 100%;

}
.middle-inner{
    margin: 0 210px;
    background-color: rgba(33, 114, 214, 0.8);
    height: 500px
}
.left{
    width: 200px;
    float: left;
    background-color: rgba(255, 82, 0, 0.8);
    margin-left: -100%;
    height: 200px

}
.right{
    width: 200px;
    height: 200px;
    margin-left: -200px;
    float: left;
    background-color: rgba(90, 243, 151, 0.8);
}
```

### 圣杯和双飞翼异同

圣杯布局和双飞翼布局解决的问题是一样的，都是两边定宽，中间自适应的三栏布局，**中间栏要在放在文档流前面以优先渲染**。

* 两种方法基本思路都相同：三栏全部 float 浮动。首先让中间盒子 100% 宽度占满同一高度的空间，在左右两个盒子被挤出中间盒子所在区域时，使用 margin-left 的负值将左右两个盒子拉回与中间盒子同一高度的空间。接下来进行一些调整避免中间盒子的内容被左右盒子遮挡。
* 主要区别在于 **如何使中间盒子的内容不被左右盒子遮挡**：
    * 圣杯布局的方法：设置父盒子的 padding 值为左右盒子留出空位，再利用相对布局对左右盒子调整位置占据 padding 出来的空位；
    * 双飞翼布局的方法：在中间盒子里再增加一个子盒子，直接设置这个子盒子的 margin 值来让出空位，而不用再调整左右盒子。

简单说起来就是**双飞翼布局比圣杯布局多创建了一个 div，但不用相对布局了，少设置几个属性**。

### 参考文章

* [CSS三栏布局——中间固定两边自适应宽度](http://www.w3cplus.com/blog/104.html)：w3cplus 的文章，使用了双飞翼和浮动实现两侧定宽、中间自适应，也实现了两侧自适应、中间定宽
* [简书 \- 圣杯布局和双飞翼布局（前端面试必看）](http://www.jianshu.com/p/f9bcddb0e8b4)：只讲了圣杯，不过特别详细
* [In Search of the Holy Grail](https://alistapart.com/article/holygrail)：圣杯布局的来源
* [百度前端学院笔记 \- 三栏式布局之双飞翼与圣杯](http://ife.baidu.com/note/detail/id/1025)：百度前端学院学员的前端学习笔记
* [简书 \- margin为负值产生的影响和常见布局应用](http://www.jianshu.com/p/549aaa5fabaa)：包括对自身的影响，对文档流的影响，以及一些在布局中的应用技巧(比如去除列表右边框，负边距+定位实现水平垂直居中，去除列表最后一个 li 元素的 border-bottom，多列等高)

## 居中布局

强烈推荐[Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)这篇文章，非常全面的居中定位博客，包括各种情况下的水平居中，垂直居中和水平垂直居中方案。有展示示例及相应的 HTML 和 CSS 代码，这篇文章翻译总结如下：

* 水平居中
    * 对于行内元素(inline)：`text-align: center;`
    * 对于块级元素(block)：设置宽度且 `marigin-left` 和 `margin-right` 是设成 auto
    * 对于多个块级元素：对父元素设置 `text-align: center;`，对子元素设置 `display: inline-block;`；或者使用 flex 布局
* 垂直居中
    * 对于行内元素(inline)
        * 单行：设置上下 pandding 相等；或者设置 `line-height` 和 `height` 相等
        * 多行：设置上下 pandding 相等；或者设置 `display: table-cell;` 和 `vertical-align: middle;`；或者使用 flex 布局；或者使用伪元素
    * 对于块级元素(block)：下面前两种方案，父元素需使用相对布局
        * 已知高度：子元素使用绝对布局 `top: 50%;`，再用负的 `margin-top` 把子元素往上拉一半的高度
        * 未知高度：子元素使用绝对布局 `position: absolute; top: 50%; transform: translateY(-50%);`
        * 使用 Flexbox：选择方向，`justify-content: center;`
* 水平垂直居中
    * 定高定宽：先用绝对布局 `top: 50%; left: 50%;`，再用和宽高的一半相等的负 margin 把子元素回拉
    * 高度和宽度未知：先用绝对布局 `top: 50%; left: 50%;`，再设置 `transform: translate(-50%, -50%);`
    * 使用 Flexbox：`justify-content: center; align-items: center;`

## 扩展阅读

[利用HTML和CSS实现常见的布局](https://segmentfault.com/a/1190000003931851)