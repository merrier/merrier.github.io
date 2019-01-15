---
title: CSS深入理解之margin
urlname: margin-of-css
id: 700
categories:
  - CSS
tags:
  - CSS
date: 2017-04-20 22:58:44
img: /images/hexo_thumbnail_65.png
---

## 1. margin 与容器的尺寸

* 适用于没有设定 width / height 的普通 block 水平元素(float 元素，absolute / fixed 元素，inline 水平，table-cell 元素虽然 block 化，但是不是普通的 block 水平元素)
* 只适用于水平方向尺寸
* 一侧定宽的自适应布局

<div align='center'><img src='/images/hexo_post_80.png' alt='' width='400'/></div>

* 滚动容器内上下留白

外部容器设置 padding 值，只有 chrome 才会有留白，此时可以在给内部容器设置 margin 值

<div align='center'><img src='/images/hexo_post_59.png' alt='' width='400'/></div>

## 2. margin 与百分比单位

### 计算规则

普通元素的百分比 margin 都是相对于容器的宽度计算的，绝对定位元素的百分比 margin 是相对于第一个定位祖先元素(relative / absolute / fixed)的宽度计算的

### 应用-宽度 2:1 自适应矩形

由于 margin 百分比的计算规则是相对于容器进行计算的，而 margin 又可以影响普通 block 水平元素的可视尺寸，所以当设置为 margin: 50% 时，由于 margin 重叠特性，所以会让元素的宽高始终保持 2:1 的比例

<div align='center'><img src='/images/hexo_post_84.png' alt='' width='400'/></div>

## 3. margin 重叠

### 通常特性

发生在 block 水平元素（不包括 float 和 absolute 元素） 不考虑 writing-mode，只发生在垂直方向（margin-top / margin-bottom）

### 3 种情境

#### 相邻的兄弟元素

<div align='center'><img src='/images/hexo_post_78.png' alt='' width='400'/></div>

#### 父级和第一个 / 最后一个子元素

下面这3种书写形式的效果是相同的，都是子元素向下偏移了 80px，而父级的尺寸并没有改变

<div align='center'><img src='/images/hexo_post_56.png' alt='' width='400'/></div>

父子 margin 重叠的其他条件

**margin-top 重叠：**

1. 父元素非块状格式化上下文元素
2. 父元素没有 border-top 设置
3. 父元素没有 padding-top 值
4. 父元素和第一个子元素之间没有 inline 元素分隔

**margin-bottom 重叠：**

1. 父元素非块状格式化上下文元素
2. 父元素没有 border-bottom 设置
3. 父元素没有 padding-bottom 值
4. 父元素没有和最后一个子元素之间没有 inline 元素分隔
5. 父元素没有 height，min-height，max-height 限制

#### 空的 block 元素

<div align='center'><img src='/images/hexo_post_66.png' alt='' width='400'/></div>

**空的 block 元素 margin 重叠其他条件：**

1. 元素没有 border 设置
2. 元素没有 padding 值
3. 里面没有 inline 元素
4. 没有 height，或者 min-height

### margin 重叠计算规则

* 正正取大值：50 和 20 --> 50
* 正负值相加：50 和 -20 --> 30
* 负负最负值：-50 和 -30 --> -50

### margin 重叠的意义

1. 连续段落或列表之类，如果没有 margin 重叠，首尾项间距会和其他兄弟标签 1:2 关系，排版不自然
2. web 中任何地方嵌套或直接放入任何裸 div，都不会影响原来的布局
3. 遗落的空任意多个 `<p>` 元素，不要影响原来的阅读排版

### 善用 margin 重叠

<div align='center'><img src='/images/hexo_post_73.png' alt='' width='400'/></div>

## 4. margin auto

如果一侧定值，一侧 auto，auto 为剩余空间大小；如果两侧都是 auto，则平分剩余空间(居中显示)，但是不能计算负值

### writing-mode 与垂直居中

更改流为垂直方向，实现垂直方向的 margin: auto 居中

```css
.father {
  height: 200px;
  width: 100%;
  writing-mode: vertical-lr;
}
.son {
  height: 100px;
  width: 500px;
  margin: auto;
}
```

### absolut 与 margin 居中

`top:0; right:0; bottom:0; left:0;` 会使子元素的宽度和高度拉伸到与父元素相同大小，当没有 width / height 属性时，absolute 元素自动填满了容器；但设置了 width / height 属性后，会限制 absolute 元素自动填满容器，此时 margin: auto 就会自动平分被变更的尺寸空间，从而实现子元素的水平垂直居中

```css
.father {
  height: 200px;
  position: relative;
}
.son {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 500px;
  height: 100px;
  margin: auto;
}
```

## 5. margin 负值定位

### margin 负值下的两端对齐

margin 可以改变元素尺寸

<div align='center'><img src='/images/hexo_post_118.png' alt='' width='400'/></div>

### margin 负值下的等高布局

margin 改变元素占据空间：给每个框设置大的底部内边距，然后用数值相似的负外边距消除这个高度。这会导致每一列溢出容器元素，如果把外包容器的 overflow 属性设为 hidden，列就在最高点被裁切

<div align='center'><img src='/images/hexo_post_116.png' alt='' width='400'/></div>

### margin 负值下的两栏自适应布局

元素占据空间跟随 margin 移动

<div align='center'><img src='/images/hexo_post_117.png' alt='' width='400'/></div>

## 6. margin 无效情形解析

### inline 元素的垂直 margin 无效

前提：

* 非替换元素：替换元素为 `<img>` `<button>` 元素
* 正常书写模式

<div align='center'><img src='/images/hexo_post_109.png' alt='' width='400'/></div>

<div align='center'><img src='/images/hexo_post_67.png' alt='' width='400'/></div>

### margin 重叠

上面讲过了

### display: table-cell 与 margin

[MDN上的解释](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)：

> 除了 display 为 table 相关类型（不包括 table-caption，table 以及 inline-table）的所有，甚至也可应用于 ::first-letter

### position: absolute 与 margin

绝对定位元素**非定位方位**的 margin 值"无效"，绝对定位的 margin 值一直有效，只是不像普通元素那样，可以和兄弟元素插科打诨!

### 鞭长莫及导致的 margin 无效

浮动元素和绝对定位元素会破坏布局，此时的 margin-left 会从整个父容器的左侧开始算起，所以当 margin-left 值小于图片的宽度的时候，会看不到效果，但其实是有效的

### 内联特性导致的 margin 无效

内联元素默认基线对齐(vertical-align: baseline)，当 margin-top 是一个很大的负值的时候，由于字母 x (内敛元素)的拖累(x 没有添加任何样式，所以不会跑到父容器外面)，内联元素仍然在与 x 基线对齐的位置

<div align='center'><img src='/images/hexo_post_69.png' alt='' width='400'/></div>

## 7. margin-start 和 margin-end

正常流下：

* margin-start --> margin-left
* margin-end --> margin-right
* margin-before --> margin-top
* margin-after --> margin-bottom

如果水平流是从右往左，margin-start 等同于 margin-right 
在垂直流下（writing-mode: vertical-*），margin-start 等同于 margin-top

## 8. margin-collapse

决定 margin 重叠时该如何表现

> -webkit-margin-collapse:<collapse> | <discard> | <separate>

* collapse（默认-重叠）
* discard（取消）--> 此时 margin 将变为 0
* separate（分隔）--> 此时 margin 将不再重叠，而是相加