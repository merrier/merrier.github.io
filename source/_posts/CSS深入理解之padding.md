---
title: CSS深入理解之padding
urlname: padding-of-css
id: 688
categories:
  - CSS
tags:
  - CSS
date: 2017-04-20 20:30:24
img: /images/hexo_thumbnail_60.jpeg
---

## 1. padding 和元素尺寸的关系

### 对于 block 水平元素

* padding 太大时，一定会影响尺寸
* width 非 auto，padding 影响尺寸
* width 为 auto 或 box-sizing 为 border-box，同时 padding 值没有过大，此时不会影响尺寸

### 对于 inline 水平元素

水平 padding 影响尺寸，垂直 padding 不影响尺寸，**但是会影响背景色(占据空间)**

<div align='center'><img src='/images/hexo_post_60.png' alt='' width='500'/></div>

### inline 元素 padding 特性应用 >> 高度可控的分割线

1. 直接使用字符：注册 | 退出登录
2. inline-block 控制：注册丨退出登录
3. 使用 inline 和 padding：注册丨退出登录

```html
注册<sapn></span>退出登录
```

```css
span{
  padding: 16px 6px 1px;
  margin-left: 12px;
  border-left: 2px solid;
  font-size: 0;
}
```

## 2. padding 负值

padding 不支持任何形式的负值

## 3. padding 百分比值

padding 百分比均是相对于宽度计算的，所以可以用来实现一个正方形（**padding: 50%**）

### inline 元素的 padding 百分比值

* 同样相对于宽度计算
* 默认的高度宽度细节有差异
* padding 会断行

因为文字的换行导致表现诡异，当 padding 变小以至于文字不会换行时就会正常表现

<div align='center'><img src='/images/hexo_post_61.png' alt='' width='400'/></div>

空 inline 元素 + padding 高度也不等(高度大于宽度)，此时如果设置 font-size: 0 就可以正常表现了

原因：inline 元素的垂直 padding 会让"幽灵空白节点"显现，也就是规范中的 "strut" 出现

## 4. 标签元素的内置 padding

### ol / ul 列表

* ol / li 元素内置 padding-left，但是单位是 px 不是 em；
* 例如 Chrome 浏览器下是 40px；
* 如果字号很小，间距就会很开；
* 如果字号很大，序号会爬到容器外面；

### 表单元素

* 所有浏览器 input / textarea 输入框内置 padding
* 所有浏览器 button 按钮内置 padding
* 部分浏览器 select 下拉内置 padding，如 FireFox、IE8+ 可以设置 padding
* 所有浏览器 radio / checkbox 单复选框无内置 padding
* button 按钮元素的 padding 最难控制

### button按钮

#### Chrome 浏览器

可以完美设置 padding

#### FireFox 浏览器

设置 padding: 0 左右依然有 padding，只能通过：

```css
button::-moz-focus-inner {
  padding: 0;
}
```

#### IE 浏览器

IE7 文字越多，左右 padding 逐渐变大，解决方案：

```css
button {
  overflow: visible;
}
```

## 4.padding 与高度计算的不兼容

```css
button {
  line-height: 20px;
  padding: 10px;
  border: none;
}
```

* IE7: 45px
* IE8+: 40px
* FireFox: 42px
* Chrome: 40px

button 按钮会有以上的各种 bug，所以建议是**通过 label 按钮模拟按钮**

```html
<button id="btn"></button>
<label for="btn">按钮</label>
```

```css
label {
  display: inline-block;
  line-height: 20px;
  padding: 10px;
}
```

## 5. padding 与图形绘制

### 三道杠

第一道杠用 border-top，第二道杠用 background-color，第三道杠用 border-bottom，中间空白用padding：

<div align='center'><img src='/images/hexo_post_72.png' alt='' width='400'/></div>

### 白眼效果

中间大的圆用 background-color，最外面的环用 border，中间空白用 padding

<div align='center'><img src='/images/hexo_post_52.png' alt='' width='400'/></div>

## 6. padding 与布局

### 使用百分比单位构建固定比例布局结构

移动端 1:1 头图布局

<div align='center'><img src='/images/hexo_post_75.png' alt='' width='200'/></div>

### 配合 margin 等高布局

<div align='center'><img src='/images/hexo_post_71.png' alt='' width='500'/></div>

### 两栏自适应布局

#### padding 在容器上

<div align='center'><img src='/images/hexo_post_125.png' alt='' width='500'/></div>

#### padding 在子元素上

<div align='center'><img src='/images/hexo_post_126.png' alt='' width='500'/></div>