---
title: CSS深入理解之z-index
urlname: z-index-of-css-in-depth-understanding
id: 715
categories:
  - CSS
tags:
  - CSS
date: 2017-04-20 23:38:25
img: /images/hexo_thumbnail_63.png
---

## 1. z-index 基础

### z-index 含义

z-index 属性指定了元素及其子元素的 \[z顺序\]，而 \[z顺序\] 可以决定当元素发生覆盖的时候，哪个元素在上面.通常一个较大 z-index 值的元素会覆盖较低的那一个

### 属性值

* `auto` --> 默认值
* `<integer>` --> 整数值
* `inherit` --> 继承

### 基本特性

* 支持负值
* 支持 CSS3 animation 动画

```css
@keyframes zIndex {
  0%{ z-index:-1; }
  100%{ z-index:51; }
}
```

* 在 CSS2.1 时代，需要和定位元素配合使用

如果不考虑 CSS3，只有定位元素(position:relative / absolute / fixed / sticky，没有 static)的 z-index 才有作用！在 CSS3 中有例外......

## 2. z-index 与定位元素

### 如果定位元素 z-index 没有发生嵌套

* 后来居上
* 哪个大，哪个在上面

### 如果定位元素发生嵌套

祖先优先原则（前提：z-index 为数值，不是 auto）：

<div align='center'><img src='/images/hexo_post_85.png' alt='' width='500'/></div>

## 3. 层叠上下文

层叠上下文(stacking context)是 HTML 元素中的一个三维概念，表示元素在 z 轴上有了"可以高人一等"的能力，含义：

* 皇帝(你)
* 当官(层叠上下文元素)
* 家族(嵌套)

层叠上下文是表示普通老百姓 HTML 元素当官了，离皇帝更近了

### 产生层叠上下文：

1. 页面根元素天生具有层叠上下文，称之为"根层叠上下文" --> 皇亲国戚
2. z-index 值为数值的定位元素也具有层叠上下文 --> 科考入选
3. 其他属性 --> 其他当官途径

### 层叠上下文特性

* 层叠上下文可以嵌套，组合成一个分层次的层叠上下文

一个家里，爸爸可以当官，孩子也是可以同时当官的。这个家族的官就当得比较有层次

* 每个层叠上下文和兄弟元素独立: 当进行层叠变化或渲染的时候，只需要考虑后代元素

自己当官，兄弟不沾光。有什么福利或者变故只会影响自己的孩子们

* 每个层叠上下文是自成体系的: 当元素的内容被层叠后，整个元素被认为是在父层的层叠顺序中

每个当官的都有属于自己的小团体。当子孙或属下发生的排辈摩擦什么的，都是自己宅院的事情，不会影响官员自己和皇帝之间的距离

## 4. 层叠水平

层叠上下文中的每个元素都有一个层叠水平(stacking level)，决定了同一个层叠上下文中元素在 z 轴上的显示顺序，**遵循"后来居上"和"谁大谁上"的层叠准则** 层**叠水平和 z-index 不是一个东西**。普通元素也有层叠水平，每一个当官的家里儿孙啊，仆人什么的，都有一个论资排辈(即层叠水平)，决定了在一起的时候，谁排在前面，离官员更近。

## 5. 层叠顺序

元素发生层叠时候有着特定的垂直显示顺序，即内容 > 布局 > 装饰

<div align='center'><img src='/images/hexo_post_3.png' alt='' width='500'/></div>

## 6. z-index 与层叠上下文

1. 定位元素默认 z-index: auto，同时可以看成是 z-index: 0;
2. z-index 不为 auto 的定位元素会创建层叠上下文;
3. z-index 层叠顺序的比较止步于父级层叠上下文;

<div align='center'><img src='/images/hexo_post_294.png' alt='' width='500'/></div>

## 7. 其他 CSS 属性与层叠上下文

其他参与层叠上下文的属性们

1. z-index 值不为 auto 的 flex 项（父元素display：flex | inline-flex）
2. 元素的 opacity 值不是 1
3. 元素的 transform 值不是 none
4. 元素 mix-blend-mode 值不是 normal
5. 元素的 filter 值不是 none
6. 元素的 isolation 值是 isolate
7. position: fixed 声明
8. will-change 指定的属性值为上面任意一个
9. 元素的 -webkit-overflow-scrolling 设为 touch

## 8. z-index 与其他 CSS 属性层叠上下文

### 不支持 z-index 的层叠上下文元素的层叠顺序均是 z-index: auto 级别

<div align='center'><img src='/images/hexo_post_57.png' alt='' width='500'/></div>

### 依赖 z-index 值创建层叠上下文的情况

1. position 值为 relative / absolute 或 fixed(部分浏览器)
2. display: flex | inline-flex 容器的子 flex 项

## 9. z-index 相关实践

### 最小化影响原则

* 避免使用定位属性；
* 定位属性从大容器平级分离为私有小容器

### 不犯二原则

对于非浮层元素(浮层元素为弹框，蒙版之类)，避免设置 z-index 值，z-index 值没有任何道理需要超过 2--不犯二准则；

### 组件层级计数器

通过 js 获得 body 下子元素的最大 z-index 值

### 可访问性隐藏

z-index 负值元素在层叠上下文的背景之上，其他元素之下

<div align='center'><img src='/images/hexo_post_65.png' alt='' width='500'/></div>