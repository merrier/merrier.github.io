---
title: CSS深入理解之overflow
urlname: overflow-of-css
id: 748
categories:
  - CSS
tags:
  - CSS
date: 2017-04-21 21:29:13
img: /images/hexo_thumbnail_65.png
---

## 1. overflow 起作用的前提

1. 非 display:inline水 平
2. 对应方位的尺寸限制 .width / height / max-width / max-height / absolute 拉伸
3. 对于单元格 td 等，还需要 table 为 table-layout:fixed 状态才行

**Tips**: 如果 overflow-x，overflow-y 相同，则等同于 overflow；如果不同，其中一个为 visible，另外一个为 auto / hidden / scroll，则 visible 会重置为 auto

## 2. JS 与滚动高度

无论什么浏览器，默认滚动条均来自 `<html>`，而不是 `<body>` 标签.所以，如果想要去除页面默认滚动条，只需要 **html{ overflow: hidden }**，而没必要把 `<body>` 也拉下水。

### 关于scrollTop
Chrome 浏览器: document.body.scrollTop
其他浏览器: document.documentElement.scrollTop

目前，两者不会同时存在，建议使用: 

```javascript
var st = document.body.scrollTop || document.documentElement.scrollTop
```

## 3. 水平居中跳动问题的修复

由于滚动条会使网页可用内容宽度变小，所以水平居中的页面出现滚动条时会有跳动的问题，解决方案： 

1. html{ overflow-y: scroll } // 滚动栏一直存在
2. container{ padding-left: calc(100vw - 100%) } // **100vw-浏览器宽度;100%-可用内容宽度**

## 4. iOS 原生滚动回调效果:

```css
-webkit-overflow-scrolling:touch;
```

会使滚动出现缓冲效果

## 5. overflow 与块状格式上下文

### 两栏自适应布局

```css
.cell{
  display: table-cell;
  width: 2000px; // IE8+ BFC特性
  display: inline-block;
  width: auto; // IE7- 伪BFC特性
}
```

只适用于 block 属性的元素，之间的空隙推荐使用浮动元素的 margin 来实现
     
### 父元素设置 overflow: scroll; overflow: auto; overflow:hidden，可以解决父元素因内部浮动塌陷问题。

更多请参见：[overflow 与布局上下文（BFC）](http://harttle.com/2016/05/11/block-formatting-context.html)

## 6. overflow 与 absolute 绝对定位

overflow: hidden 在子元素绝对定位失效，可以理解成，父元素与子元素所在的层级不一样了，子元素完全脱离文档流了，因而无法被剪裁。而给父元素加上除 static 以外的定位属性（使之成为包含块），只不过是提高了父元素的层级，从而约束绝对定位的表现。使之可以被溢出隐藏

### 如何避免 overflow 失效?

1. overflow 元素自身为包含块;
2. overflow 元素的子元素为包含块;
3. 任意合法 transform 声明当作包含块;

####  overflow 元素自身 transform:

* IE9+/Firefox √
* Chrome/Safari(win)/Opera ×

#### overflow 子元素 transform

* IE9+/Firefox √
* Chrome/Safari(win)/Opera √

动态渲染异常: Chrome 包含块重定位 / Opera 同，但点击重绘自修正 / Safari 非定位 overflow 元素左上角

### overflow 失效妙用

右侧图片会紧挨左侧内容，并实现自适应跟随，`&nbsp` 可以辅助将图片设置在右方；将 `&nbsp` 的高度设置为 0 以及 overflow: hidden 可以让 `&nbsp` 不影响布局，但图片是绝对定位，不会受 overflow: hidden 影响：

<div align='center'><img src='/images/hexo_post_124.png' alt='' width='400'/></div>

## 7. 依赖 overflow 的样式表现

### resize

可以拉伸元素尺寸，但是，此声明要想起作用，元素的 overflow 属性值不能是 visible

### text-overflow:ellipsis

文本溢出时用 ... 代替，经常与 white-space: nowrap 一起使用，但是，**不设置 overflow: hidden 属性，无法实现效果**

## 8. overflow 与锚点技术

### 锚点定位:

寻找妹子5: `<a href="#mm5">`

### 锚点定位实现的前提:

* 容器可滚动;
* 锚点元素在容器内;

### 锚点定位的本质

1. 触发锚点定位;
2. 锚点元素通过 scrollTop 值改变向上偏移定位;
3. 锚元素的上边缘和可滚动容器上边缘对齐

### 锚点定位的触发

* url 地址中的锚链与锚点元素;
* 可 focus 的锚点元素处于 focus 态

### 锚点定位的作用

* 快速定位
* 选项卡技术(有严重的不足)

<div align='center'><img src='/images/hexo_post_68.png' alt='' width='400'/></div>