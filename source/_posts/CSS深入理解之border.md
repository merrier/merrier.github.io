---
title: CSS深入理解之border
urlname: border-of-css-in-depth-understanding
id: 758
categories:
  - CSS
tags:
  - CSS
date: 2017-04-23 22:39:19
img: /images/hexo_thumbnail_62.png
---

## 1. 不支持百分比单位的属性

* border-width
* outline
* box-shadow
* text-shadow

## 2. border-width 支持关键字

* thin --> 1px
* medium（默认值）--> 3px
* thick --> 5px

## 3. border-style

* solid：实线
* dashed：虚线，但是 IE 和 Chrome / FireFox 的虚线比例不同，IE 会更密一些
* dotted：点线，Chrome / FireFox 下点线是方形，IE 下是圆形
* double：双线，宽度实现规律为双线宽度永远相等，而中间间隔 ±1
* inset：内凹，在 css 里很少用，基本上被淘汰了
* groove：沟槽
* ridge：山脊

inset、groove、ridge 风格过时 + 兼容性差，所以基本上处于被淘汰的状态

## 4. 利用 IE7 中的 border-style:dotted 实现圆角效果

```css
.box{
  width: 150px;
  height: 150px;
  overflow: hidden;
}
.dotted{
  width: 100%;
  height: 100%;
  border: 149px dotted #cd0000;
}
```

## 5. 利用 border-style:double 实现三道杠

```css
.three {
  width:120px;
  height:20px;
  border-top:60px double;
  border-bottom:20px solid;
}
```

## 6. border-color 与 color

当没有指定 border-color 的时候，会使用 color 作为边框色，类似的还有 box-shadow、text-shadow 和 outline，都是默认使用 color 的颜色

## 7. border 与 background-position 定位

background-position 默认相对于左上进行定位，所以如果想相对于右边进行定位的话，其中一个方法就是借助于 border（设置为 100% 默认不计算 border 区域）：

```css
border-right: 50px solid transparent;
background-position: 100% 40px;
```

## 8. border-color 的分配

```css
.triangle{
  width: 100px;
  height: 100px;
  border: 100px solid;
  border-color: red green blue orange;
}
```

效果展示：

<div align='center'><img src='/images/hexo_post_205.png' alt='' width='150'/></div>

## 9. border 的应用

### 透明边框优雅增加响应区域大小（复选框）

原来视觉区域大小（不含边框）是 16px \* 16px，经过使用透明边框，可以使复选框点击区域扩大到 20px \* 20px 甚至更大

```css
.checkbox{
  border: 2px solid transparent;
  box-shadow: inset 0 1px, inset 1px 0, inset -1px 0, inset 0 -1px;
  background-color: #fff;
  background-clip: content-box;
  color: #d0d0d5;
}
```

### 实现两栏等高布局

利用很长的 border 构造另外一个盒子，然后利用 margin 负值进行定位，但是不支持百分比宽度（margin 和 padding实现支持百分比宽度）

html：

```html
<div class="box">
  <nav class="left">
    <h3>导航1</h3>
  </nav>
  <section>
    <div class="module">模块1</div>
  </section>
</div>
```

css：

```css
.box{
  border-left: 300px solid #222;
}
.left{
  width: 300px;
  margin-left: -300px;
  float: left;
}
```

实现效果：

<div align='center'><img src='/images/hexo_post_206.png' alt='' width='500'/></div>

### 绘制三角形

根据上面 border-color 的分配，实现方案为将 border 的其中一个方向的颜色设置为预期颜色，将其余三个方向设置为透明，然后 border-width 就是三角形的大小

```css
.triangle{
  width: 0;
  height: 0;
  border: 100px solid;
  border-color: red transparent transparent transparent;
}
```