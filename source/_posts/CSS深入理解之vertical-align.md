---
title: CSS深入理解之vertical-align
urlname: vertical-align-of-css-in-depth-understanding
id: 727
categories:
  - CSS
tags:
  - CSS
date: 2017-04-21 16:40:08
img: /images/hexo_thumbnail_60.jpeg
---

## 1. vertical-align 支持的属性值

1.  线类：**baseline**，top，middle，bottom
2.  文本类：text-top，text-bottom
3.  上标下标类：sub，super
4.  数值百分比类：20px，2em，20%，...

其中，默认为 baseline，百分之值是相对于 line-height 计算的

## 2. vertical-align 起作用的前提

应用于 inline 水平和 table-cell 元素（图片，按钮，文字，单元格）

### inline 水平：

* inline：`<img>`，`<span>`，`<strong>`，`<em>`，未知元素，...
* inline-block：`<input>`(IE8+)，`<button>`(IE8+)，...

### table-cell 元素

* table-cell：`<td>`

## 3. 个数不定文字与图片垂直对齐

html：

```html
<div class="test-list">
  <span>文字</span>
  <img src="小公主.jpg">
</div>
```

css：

```css
.test-list>span {
  display: inline-block;
  width: 210px;
  vertical-align: middle;
}
.test-list>img {
  vertical-align: middle;
}
```

## 4. vertical-align 与 line-height

### 任何内联元素都会受到 vertical-align 与 line-height 的影响

<div align='center'><img src='/images/hexo_post_70.png' alt='' width='500'/></div>

图片没有居中显示，因为**受到了 vertical-align 与 line-height 的影响**，此时的默认属性为vertical-align: baseline;line-height: 1.5;font-size: 24px

### 如何消除这种影响

1. 消灭 vertical-align：display: block; margin: auto
2. 改变 vertical-align：vertical-align: top / middle / bottom
3. 改变 line-height：line-height: 0; font-size: 0;

### inline-block 的基线

inline-block 的基线是正常流中最后一个 line box 的基线，除非，这个 line box 里面既没有 line boxes 或者本身 'overflow' 属性的计算值不是 'visible'，这种情况下基线是 margin 底边缘

<div align='center'><img src='/images/hexo_post_108.png' alt='' width='400'/></div>

左边的元素基线为边框下边缘，右边的元素基线为 X 文字下边缘

## 5. vertical-align 线性类属性值表现

### vertical-align: bottom

1. inline / inline-block元素: 元素底部和整行的底部对齐
2. table-cell 元素: 单元格底 padding 边缘和表格行的底部对齐

### vertical-align: top

1. inline / inline-block 元素: 元素顶部和整行的顶部对齐
2. table-cell 元素: 单元格顶 padding 边缘和表格行的顶部对齐

### vertical-align: middle

* inline / inline-block 元素: 元素垂直中心点和父元素基线上 1/2x - height 处对齐

<div align='center'><img src='/images/hexo_post_63.png' alt='' width='500'/></div>

文字具有下沉的特性，而父容器的高度是由文字撑开的，所以父容器的中心点与元素垂直中心点是不重合的，可以设置 **font-size: 0** 解决这个问题

* table-cell 元素: 单元格填充盒子相对于外面的表格行居中对齐

## 6. vertical-align 文本类属性值

### vertical-align: text-top

盒子的顶部和父级 content area 的顶部对齐

### vertical-align: text-bottom

盒子的底部和父级 content area 的底部对齐

<div align='center'><img src='/images/hexo_post_224.png' alt='' width='400'/></div>

* vertical-align 垂直对齐的位置与前后的元素都没有关系;
* 元素 vertical-align 垂直对齐的位置与行高 line-height 没有关系，只与字体大小 font-size 有关

## 7. vertical-align 前后不一致的行为表现

关注当前元素和父级，因为前后并没有直接影响

<div align='center'><img src='/images/hexo_post_62.png' alt='' width='400'/></div>

在 img 后面加一个内联元素，并且设置 vertical-align: middle 就可以实现图片的垂直居中

## 8. vertical-align 的实际应用

### 小图片和文字对齐

vertical-align 设置为负值

<div align='center'><img src='/images/hexo_post_79.png' alt='' width='400'/></div>

### 不定尺寸图片和多行文字的垂直居中

三个步骤：

1. 主体元素 inline-block化;
2. 0 宽度 100% 高度辅助元素;
3. vertical-align: middle;

如果已经是 inline-block（img）水平元素，就不需要额外设置 display 属性

<div align='center'><img src='/images/hexo_post_54.png' alt='' width='600'/></div>