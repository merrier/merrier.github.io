---
title: CSS深入理解之relative
urlname: relative-of-css-in-depth-understanding
id: 725
categories:
  - CSS
tags:
  - CSS
date: 2017-04-21 15:33:18
img: /images/hexo_thumbnail_62.png
---

## 1. relative 和 absolute 的相煎关系

1. 限制 left / top / right / bottom 定位；
2. 限制 z-index 层级：relative 中的 absolute 层级不起作用，只看 relative 层级；
3. 限制在 overflow 下的嚣张气焰：消除 absolute 不受 overflow 限制的能力

## 2. relative 和定位

1. 相对自身：top: 100px; left: 100px 为相对于自身原位置移动
2. 无侵入：不会影响到其他元素，可应用于自定义拖拽
3. 同时设置 top / bottom / left / right 的行为表现：绝对定位是拉伸，相对定位是斗争--top > bottom，left > right

## 3. relative 与 z-index

1. 提高层叠上下文
2. 新建层叠上下文与层级

z-index：auto 是不会产生层叠上下文的

## 4. relative 的最小化影响原则

### 尽量避免使用relative

absolute 定位不依赖使用 relative，不要为了使用 absolute 而设置 relative

### 最小化原则

如果必须要使用 relative，就把 absolute 定位的元素放进一个空 div 里，使 relative 的 div 只有定位为 absolute 的子元素

```html
<div style="position:relative">
  <img src="pig_head.png" style="position:absolute;top:0;right:0;">
</div>
<div>
  <div></div>
  <div></div>
  <div></div>
  ......
</div>
```