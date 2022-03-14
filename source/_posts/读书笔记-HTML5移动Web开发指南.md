---
title: 读书笔记-HTML5移动Web开发指南
urlname: html5-mobile-web-development-guide
id: 497
categories:
  - HTML
tags:
  - HTML
  - 笔记
date: 2017-04-06 15:41:14
img: /images/hexo_thumbnail_69.jpeg
---

## 属性选择器

### 包含匹配选择器

包含匹配比完全匹配范围更广。只要元素中的属性包含有指定的字符串，元素就使用该样式。其语法是：`[attribute*=value]`。

其中 attribute 指的是属性名，value 指的是属性值，包含匹配采用 “ *=” 符号。

### 首字符匹配选择器

首字符匹配就是匹配属性值开头字符，只要开头字符符合匹配，则元素使用该样式。其语法是：`[attribute^=value]`。

其中 attribute 指的是属性名，value 指的是属性值，首字符匹配采用“ ^=”符号。

### 尾字符匹配选择器

尾字符匹配跟首字符匹配原理一样。尾字符只匹配结尾的字符串，只要结尾字符串符合匹配，则元素使用该样式。其语法是：`[attribute$=value]`。其中 attribute 指的是属性名，value 指的是属性值，尾字符匹配采用 “ $=”符号。

## 伪类选择器

### before

before 伪类元素选择器主要的作用是在选择某个元素之前插入内容，一般用于清除浮动。before 选择器的语法是：

```css
元素标签:before{
  content:"插入的内容"
}
```

例如，在 p 元素之前插入“文字”：

```css
p.before{ content: "文字" }
```

### after

after 伪类元素选择器和 before 伪类元素选择器原理一样，但 after 是在选择某个元素之后插入内容。after 选择器的语法是：

```css
元素标签:after {
  content: "插入的内容"
}
```

### first-child

指定元素列表中第一个元素的样式。语法：`li:first-child`

### last-child

和 first-child 是同类型的选择器。last-child 指定元素列表中最后一个元素的样式。语法：`li:last-child`

### nth-child 和 nth-last-child

指定某个元素的样式或从后数起某个元素的样式。

## 阴影

### box-shadow

> box-shadow: `<length> <length> <length>` || color

第一个 length 值是阴影水平偏移值；第二个 length 值是阴影垂直偏移值；第三个 length 值是阴影模糊值。水平和垂直偏移值都可取正负值。

基于 Webkit 的 Chrome 和 Safari 等浏览器：-webkit-box-shadow

Firebox 浏览器：-moz-box-shadow

### text-shadow

> text-shadow: `<length> <length> <length>` || color

第一个 length 值是阴影水平偏移值；第二个 length 值是阴影垂直偏移值；第三个 length 值是阴影模糊值。水平和垂直偏移值都可取正负值。

## 背景

### background-size**

背景图像的大小

### background-clip

背景的裁剪区域

> background-clip: border-box | padding-box | content-box | no-clip

其中：
* border-box 是从 border 区域向外裁剪背景；
* padding-box 是从 padding 区域向外裁剪背景；
* content-box 是从内容区域向外裁剪背景；
* no-clip 是从 border 区域向外裁剪背景。

### background-origin

background-origin 属性是指定 background-position 属性的参考坐标的起始位置。 background-origin 属性有三种值可以选择，border 值指定从边框的左上角坐标开始；content 值指定从内容区域的左上角坐标开始；padding 值指定从 padding 区域开始。

### background

可以使用 Webkit 的其中一种特性对背景采用颜色渐变，而非采用图片方式。

> -webkit-gradient(`<type>, <port>[, <radius>]?,<point> [, <radius>]? [, <stop>]*`)

type 类型是指采用渐变类型，如线性渐变 linear 或径向渐变 radial。如下代码：

```css
background: -webkit-gradient(linear, 0 0, 0 100%, form(#FFF), to(#000));
```

上述代码的含义是定义一个渐变背景色，该渐变色是线性渐变并且是由白色向黑色渐变的。其中前两个 0 表示的是渐变开始 __X__ 和 __Y__ 坐标位置；0 和 100%表示的是渐变结束 __X__ 和 __Y__ 坐标位置。

## Media Queries 移动设备样式

### viewport设置适应移动设备屏幕大小

Android Browser 浏览器的默认值是 800 像素；IE 浏览器的默认值是 974 像素；Opera 浏览器的默认值是 850 像素。viewport 虚拟窗口是在 meta 元素中定义的，其主要作用是设置 Web 页面适应移动设备的屏幕大小。 如以下代码：

```html
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0" />
```

代码中的 content 属性内共定义三种参数。实际上 content 属性允许设置 6 种不同的 参数，分别如下：

* width：指定虚拟窗口的屏幕宽度大小。
* height：指定虚拟窗口的屏幕高度大小。
* initial-scale：指定初始缩放比例。
* maximum-scale：指定允许用户缩放的最大比例。
* minimum-scale：指定允许用户缩放的最小比例。
* user-scalable：指定是否允许手动缩放。

### Media Queries 如何工作

要实现 Media Queries 样式模块，需要在 head 标签内导入一个 CSS 样式文件，例如，下面代码使用 media 属性定义当前屏幕可视区域的宽度最大值是 600 像素时应用该样式文件。

```html
<link rel="stylesheet" media="screen and(max-width:600px)" href="small.css"/>
```

在 small.css 样式文件内，需要定义 media 类型的样式，例如：

```css
@media screen and (max-width:600px){
  .demo{ background-color: #CCC; }
}
```

同样也可以判断当移动设备（如 iPad）的方向发生变化时应用该样式。以下代码是当移动设备处于纵向（portrait）模式下时，应用 portrait 样式文件；当移动设备处于横向（landscape）模式下时，应用 landscape 样式文件。

```html
<link rel="stylesheet" media="all and(orientation:portrait)" href="portrait.css"/>
<link rel="stylesheet" media="all and(orientation:landscape)" href="landscape.css"/>
```

### Media Queries 语法总结

Media Queries 的语法如下所示：

> @media \[media\_query\] media\_type and media_feature

使用 Media Queries 样式模块时都必须以 “@media” 方式开头。media_query 表示查询关键字，在这里可以使用 not 关键字和 only 关键字。not 关键字表示对后面的样式表达式执行取反操作。例如如下代码：

```css
@media not screen and (max-device-width:480px)
```

only 关键字的作用是，让不支持 Media Queries 的设备但能读取 Media Type 类型的浏览器忽略这个样式。例如如下代码：

```css
@media only screen and (max-device-width:480px)
```

对于支持 Media Queries 的移动设备来说，如果存在 only 关键字，移动设备的 Web 浏览器会忽略 only 关键字并直接根据后面的表达式应用样式文件。对于不支持 Media Queries 的设备但能够读取 Media Type 类型的 Web 浏览器，遇到 only 关键字时会忽略这个样式文件。

media_type 参数的作用是指定设备类型，通常称为媒体类型。实际上在 CSS2.1 版本时已经定义了该媒体类型。

* **all**                 所有设备
* **aural**               听觉设备
* **braille**             点字触觉设备
* **handled**             便携设备，如手机、平板电脑
* **print**               打印预览图等
* **projection**          投影设备
* **screen**              显示器、笔记本、移动端等设备
* **tty**                 如打字机或终端等设备
* **tv**                  电视机等设备类型
* **embossed**            盲文打印机

media_feature 的主要作用是定义 CSS 中的设备特性，大部分移动设备特性都允许接受 min/max 的前缀。 例如，min-width 表示指定大于等于该值；max-width 表示指定小于等于该值。