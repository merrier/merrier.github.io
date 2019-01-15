---
title: JS宽高的理解和应用
urlname: understanding-and-application-of-JS-width-and-height
id: 793
categories:
  - JS
tags:
  - JS
date: 2017-05-01 22:49:51
img: /images/hexo_thumbnail_17.jpg
---

## window 和 document

**document 是 window 对象的一部分**：document.body -> window.document.body，浏览器的 HTML 文档称为 document 对象
**window.location === document.location**：window 对象的 location 属性引用的是 location 对象，表示该窗口中当前显示文档的 URL，document 对象的 location 属性也是引用了 location 对象

## window.screen

window.screen 包含有关用户屏幕的信息，它包括：

* `window.screen.width`
* `window.screen.height`
* `window.screen.availHeight`
* `window.screen.availWidth`
* `window.screenTop`
* `window.screenLeft`

<div align='center'><img src='/images/hexo_post_31.png' alt='' width='700'/></div>

## 与 window 相关的宽高

* `window.innerWidth` 内部的宽度
* `window.innerHeight` 内部的高度
* `window.outWidth` 外部的宽度
* `window.outHeight` 外部的高度

<div align='center'><img src='/images/hexo_post_24.png' alt='' width='700'/></div>

## 与 document 相关的宽高

### 与 client 相关的宽高

* `document.body.clientWidth` 元素宽度（可视内容区+内边距）
* `document.body.clientHeight` 元素高度（可视内容区+内边距）

该属性指的是元素的可视部分宽度和高度，即 `padding+content`

* 如果没有滚动条，即为元素设定的宽度和高度

```css
body{ 
  border: 20px solid #000; 
  margin: 10px; 
  padding: 40px; 
  background: #eee; 
  height: 350px; 
  width: 500px; 
  overflow: scroll; 
}
```

```javascript
console.log(document.body.clientWidth);  // 350+padding(80) = 430
console.log(document.body.clientHeight);  // 500 + padding(80) = 580
```

* 如果出现滚动条，滚动条会遮盖元素的宽高，那么该属性就是其本来宽高减去滚动条的宽高

```css
#exp2 {
  width:200px;
  height:200px;
  background:red;
  border:1px solid #000;
  overflow:auto;
}
```

```javascript
var test = document.getElementById("exp2");
console.log(test.clientHeight); // 200
console.log(test.clientWidth); //
```

* `document.body.clientLeft`
* `document.body.clientTop`

这两个返回的是元素周围边框的厚度，如果不指定一个边框或者不定位该元素，它的值就是 0

```css
body{ 
  border: 20px solid #000; 
  margin: 10px; 
  padding: 40px; 
  background: #eee; 
  height: 350px; 
  width: 500px; 
  overflow: scroll; 
}
```

```javascript
console.log(document.body.clientLeft);  // 20
console.log(document.body.clientTop);  // 20
```

### 小结

* 无 `padding` 无滚动 ：`clientWidth` = 盒子的 `width`
* 有 `padding` 无滚动 ：`clientWidth` = 盒子的 `width` + 盒子的 `padding * 2`
* 有 `padding` 有滚动 ：`clientWidth` = 盒子和 `width` + 盒子的 `padding * 2` - 滚动轴宽度
* `clientTop = border-top`
* `clientLeft = border-left`

### 与 offset 相关的宽高

* **document.body.offsetWidth（元素的border + padding + content的宽度）**
* **document.body.offsetHeight（元素的border + padding + content的高度）**

该属性和其内部的内容是否超出元素大小无关，只和本来设定的 border 以及 width 和 height 有关

```css
body{ 
  border: 20px solid #000; 
  margin: 10px; 
  padding: 40px; 
  background: #eee; 
  height: 350px; 
  width: 500px; 
  overflow: scroll; 
}
```

```javascript
console.log(document.body.offsetWidth);  // 470 = padding\*2 + 350 + border\*2
console.log(document.body.offsetHeight);  // 620 = padding\*2 + 500 + border\*2
```

* **document.offsetLeft**
* **document.offsetTop**

了解这两个属性我们必须先了解它，什么是 `offsetParent`

* 如果当前元素的父级元素没有进行 `CSS` 定位（`position` 为 `absolute` 或 `relative`）,`offsetParent` 为 `body.`
* 假如当前元素的父级元素中有 `CSS` 定位，`offsetParent` 取最近的那个父级元素

### offsetLeft 的兼容性问题

* 在 `IE6/7` 中
  * `offsetLeft` = offsetParent 的 padding-left + 当前元素的 margin-left
* 在 `IE8/9/10` 以及 `chrome` 中
  * `offsetLeft` = offsetParent 的 margin-left + offsetParent 的 border 宽度 + offsetParent 的 padding-left + 当前元素的 margin-left
* 在 `FireFox` 中
  * `offsetLeft` = offsetParent 的 margin-left + 当前元素的 margin-left + offsetParent 的padding-left

```css
body{ 
  border: 20px solid #000; 
  margin: 10px; 
  padding: 40px; 
  background: #eee; 
  height: 350px; 
  width: 500px; 
  overflow: scroll; 
} 
#exp {
  width:400px;
  height:200px;
  padding:20px;
  margin:10px;
  background:red;
  border:20px solid #000;
  overflow:auto;
}
```

* 在 IE8 / 9 / 10 以及 chrome 中：
  * div.offsetLeft = 本身的 margin10 + 父级元素的 padding40 + margin10 + border20 = 80
  * div.offsetTop = 本身的 margin10 + 父级元素的 padding40 + margin10 + border20 = 80
* 在 FireFox：（相比 chrome 中少了 border）
  * div.offsetLeft = 本身的 margin10 + 父级元素的 padding40 + margin10 = 60
  * div.offsetTop = 本身的 margin10 + 父级元素的 padding40 + margin10 = 60
* 在 IE6/7 中：（相比在 FireFox，不但少了 border 还少了父级元素的 margin）
  * `div.offsetLeft` = 本身的 `margin10` + 父级元素的 `padding40` = 50
  * `div.offsetTop` = 本身的 `margin10` + 父级元素的 `padding40` = 50

### 小结

* 无 `padding` 无滚动无 `border`
  * offsetWidth = clientWidth = 盒子的宽度
* 有 `padding` 无滚动有 `border`
  * offsetWidth = 盒子的宽度 + 盒子 padding * 2 + 盒子边框 * 2 = clientWidth + 边框宽度 * 2
* 有 `padding` 有滚动，且滚动是显示的，有 `border`
  * offsetWidth = 盒子宽度 + 盒子 padding * 2 + 盒子边框 * 2 = clientWidth + 滚动轴宽度 + 边框宽度 * 2

## 与 scroll 相关的宽高

* **document.body.scrollWidth**
* **document.body.scrollHeight**

document.body 的 scrollWidth 和 scrollHeight 与 div 的 scrollWidth 和 scrollHeight 是有区别的

```css
body{ 
  border: 20px solid #000; 
  margin: 10px; 
  padding: 40px; 
  background: #eee; 
  height: 350px; 
  width: 500px; 
  overflow: scroll; 
}
```

```javascript
document.body.scrollHeight; // 
document.body.scrollWidth; //
```

* 当给定宽高小于浏览器窗口的宽高
  * scrollWidth = 通常是浏览器窗口的宽度
  * scrollHeight = 通常是浏览器窗口的高度
* 当给定宽高大于浏览器窗口的宽高，且内容小于给定宽高的时候
  * scrollWidth = 给定宽度 + 其所有的 padding + margin + border
  * scrollHeight = 给定高度 + 其所有的 padding + margin + border
* 当给定宽高大于浏览器窗口宽高，且内容大于给定宽高
  * scrollWidth = 内容宽度 + 其所有的 padding + margin + border
  * scrollHeight = 内容高度 + 其所有的 padding + margin + border

### **在某 div 中的 scrollWidth 和 scrollHeight**

无滚动轴时：

* scrollWidth = clientWidth = 盒子宽度 + 盒子 padding * 2

<div align='center'><img src='/images/hexo_post_28.png' alt='' width='450'/></div>

有滚动轴时：

* scrollWidth = 实际内容的宽度 + padding * 2
* scrollHeight = 实际内容的高度 + padding * 2

<div align='center'><img src='/images/hexo_post_32.png' alt='' width='450'/></div>

* **document.body.scrollLeft**
* **document.body.scrollTop**

与前面不同的是，这对属性是**可读写**的，指的是当元素其中的超出其宽高的时候，元素被卷起来的高度和宽度

```css
#exp {
  width:400px;
  height:200px;
  padding:20px;
  margin:10px;
  background:red;
  border:20px solid #000;
  overflow-y:scroll;
}
```

```javascript
var mydiv = document.getElementById("exp");
mydiv.scrollTop ;  // 默认情况下是0 
mydiv.scrollLeft ; // 默认情况下是0 
// 可以改写它
mydiv.scrollTop = 20;
console.log(mydiv.scrollTop)
```

<div align='center'><img src='/images/hexo_post_25.png' alt='' width='400'/></div>

### **obj.style.width 和 obj.style.height**

对于一个 `DOM` 元素，它的 `style` 属性返回的是一个对象，这个对象的任意一个属性是可读写的，`style.width` 等于 `css` 属性中的宽度。`style.height` 等于 `css` 属性中的高度

## documentElement 和 body 的关系

是父子级的关系

```javascript
console.log(document); //document
console.log(document.documentElement); //html
console.log(document.body); //body
```

<div align='center'><img src='/images/hexo_post_29.png' alt='' width='600'/></div>

* 兼容问题推荐使用，获取浏览器窗口可视区域大小：

```javascript
document.body.clientWidth || document.documentElement.clientWidth;
document.body.clientHeight || document.documentElement.clientHeight;
```

## Event 对象的 5 种坐标

* clientX 和 clientY：相对于浏览器（可视区左上角0,0）的坐标
* screenX 和 screenY：相对于设备屏幕左上角（0,0）的坐标
* offsetX 和 offsetY：相对于事件源左上角（0,0）的坐标
* pageX 和 pageY：相对于整个网页左上角（0,0）的坐标
* X 和 Y：本来是 IE 属性，相对于用CSS动态定位的最内层包容元素

<div align='center'><img src='/images/hexo_post_27.png' alt='' width='700'/></div>

## JS各种宽高的应用

* [可视区域加载](http://codepen.io/poetries/pen/RoeJgG)
* [判断网页滚动到顶部或者底部](http://codepen.io/poetries/pen/WoayJy)
* [DIV滚动到底部时加载剩余内容](http://codepen.io/poetries/pen/vyVrvm)
* [计算滚动轴的宽高](http://codepen.io/poetries/pen/RoeBbL)

## JS中的宽高属性总结

<div align='center'><img src='/images/hexo_post_26.png' alt='' width='700'/></div>

<div align='center'><img src='/images/hexo_post_23.png' alt='' width='700'/></div>

<div align='center'><img src='/images/hexo_post_30.png' alt='' width='600'/></div>

## 参考文章

* [JavaScript及jQuery中的各种宽高属性图解](http://blog.poetries.top/2016/12/13/js-props/)