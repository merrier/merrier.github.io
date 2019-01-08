---
title: JS宽高的理解和应用
urlname: understanding-and-application-of-JS-width-and-height
tags:
  - JS
id: 793
categories:
  - JS
date: 2017-05-01 22:49:51
---

window和document
===============

**document是window对象的一部分**：document.body ->window.document.body 浏览器的HTML文档称为document对象 **window.location === document.location**：window对象的location属性引用的是location对象，表示该窗口中当前显示文档的URL，document对象的location属性也是引用了location对象

window.screen
=============

window.screen包含有关用户屏幕的信息，它包括：

*   `window.screen.width`
*   `window.screen.height`
*   `window.screen.availHeight`
*   `window.screen.availWidth`
*   `window.screenTop`
*   `window.screenLeft`

![](https://merrier.wang/wp-content/uploads/2017/05/1480597-d7979b36ca991d9c.png)

与window相关的宽高
============

*   `window.innerWidth` 内部的宽度
*   `window.innerHeight` 内部的高度
*   `window.outWidth` 外部的宽度
*   `window.outHeight` 外部的高度

![](https://merrier.wang/wp-content/uploads/2017/05/1480597-7c90cc88a3355d8e.png)

与document相关的宽高
==============

与client相关的宽高
------------

*   `document.body.clientWidth` 元素宽度（可视内容区+内边距）
*   `document.body.clientHeight`元素高度（可视内容区+内边距）

该属性指的是元素的可视部分宽度和高度，即`padding+content`

*   如果没有滚动条，即为元素设定的宽度和高度

body{ 
  border: 20px solid #000; 
  margin: 10px; 
  padding: 40px; 
  background: #eee; 
  height: 350px; 
  width: 500px; 
  overflow: scroll; 
} 
console.log(document.body.clientWidth);  // 350+padding(80) = 430
console.log(document.body.clientHeight);  // 500 + padding(80) = 580

*   如果出现滚动条，滚动条会遮盖元素的宽高，那么该属性就是其本来宽高减去滚动条的宽高

#exp2 {
  width:200px;
  height:200px;
  background:red;
  border:1px solid #000;
  overflow:auto;
}
var test = document.getElementById("exp2");
console.log(test.clientHeight); // 200
console.log(test.clientWidth); //

*   `document.body.clientLeft`
*   `document.body.clientTop`

这两个返回的是元素周围边框的厚度，如果不指定一个边框或者不定位该元素，它的值就是0

body{ 
  border: 20px solid #000; 
  margin: 10px; 
  padding: 40px; 
  background: #eee; 
  height: 350px; 
  width: 500px; 
  overflow: scroll; 
} 
console.log(document.body.clientLeft);  // 20
console.log(document.body.clientTop);  // 20

### 小结

*   无`padding`无滚动 ： `clientWidth` = 盒子的`width`
*   有`padding`无滚动 ： `clientWidth` = 盒子的`width` \+ 盒子的`padding * 2`
*   有`padding`有滚动 ： `clientWidth` = 盒子和`width` \+ 盒子的`padding * 2`\- 滚动轴宽度
*   `clientTop = border-top`
*   `clientLeft = border-left`

与offset相关的宽高
------------

*   **document.body.offsetWidth（元素的border+padding+content的宽度）**
*   **document.body.offsetHeight（元素的border+padding+content的高度）**

该属性和其内部的内容是否超出元素大小无关，只和本来设定的border以及width和height有关

body{ 
  border: 20px solid #000; 
  margin: 10px; 
  padding: 40px; 
  background: #eee; 
  height: 350px; 
  width: 500px; 
  overflow: scroll; 
} 
console.log(document.body.offsetWidth);  // 470 = padding\*2 + 350 + border\*2
console.log(document.body.offsetHeight);  // 620 = padding\*2 + 500 + border\*2

*   **document.offsetLeft**
*   **document.offsetTop**

了解这两个属性我们必须先了解它，什么是`offsetParent`

*   如果当前元素的父级元素没有进行`CSS`定位（`position`为`absolute`或`relative`）,`offsetParent`为`body.`
*   假如当前元素的父级元素中有`CSS`定位，`offsetParent`取最近的那个父级元素

### offsetLeft的兼容性问题

*   在`IE6/7`中
    *   `offsetLeft` = offsetParent的padding-left + 当前元素的margin-left
*   在`IE8/9/10`以及`chrome`中
    *   `offsetLeft` = offsetParent的margin-left + offsetParent的border宽度 + offsetParent的padding-left + 当前元素的margin-left
*   在`FireFox`中
    *   `offsetLeft` = offsetParent的margin-left + 当前元素的margin-left + offsetParent的padding-left

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
var div = document.getElementById("exp");

*   在IE8/9/10以及chrome中：
    *   div.offsetLeft = 本身的margin10 + 父级元素的padding40 + margin10 + border20 = 80
    *   div.offsetTop = 本身的margin10 + 父级元素的padding40 + margin10 + border20 = 80
*   在FireFox：（相比chrome中少了border）
    *   div.offsetLeft = 本身的margin10 + 父级元素的padding40 + margin10 = 60
    *   div.offsetTop = 本身的margin10 + 父级元素的padding40 + margin10 = 60
*   在IE6/7中：（相比在FireFox，不但少了border还少了父级元素的margin）
    *   `div.offsetLeft` = 本身的`margin10` \+ 父级元素的`padding40` = 50
    *   `div.offsetTop` = 本身的`margin10` \+ 父级元素的`padding40` = 50

### 小结

*   无`padding`无滚动无`border`
    *   offsetWidth = clientWidth = 盒子的宽度
*   有`padding`无滚动有`border`
    *   offsetWidth = 盒子的宽度 + 盒子padding*_2 + 盒子边框*_2 = clientWidth + 边框宽度*2
*   有`padding`有滚动，且滚动是显示的，有`border`
    *   offsetWidth = 盒子宽度 + 盒子padding*_2 + 盒子边框*_2 = clientWidth + 滚动轴宽度 + 边框宽度*2

与scroll相关的宽高
------------

*   **document.body.scrollWidth**
*   **document.body.scrollHeight**

document.body的scrollWidth和scrollHeight与div的scrollWidth和scrollHeight是有区别的

body{ 
  border: 20px solid #000; 
  margin: 10px; 
  padding: 40px; 
  background: #eee; 
  height: 350px; 
  width: 500px; 
  overflow: scroll; 
}
document.body.scrollHeight; // 
document.body.scrollWidth; //

*   当给定宽高小于浏览器窗口的宽高
    *   scrollWidth = 通常是浏览器窗口的宽度
    *   scrollHeight = 通常是浏览器窗口的高度
*   当给定宽高大于浏览器窗口的宽高，且内容小于给定宽高的时候
    *   scrollWidth = 给定宽度 + 其所有的padding + margin + border
    *   scrollHeight = 给定高度 + 其所有的padding + margin + border
*   当给定宽高大于浏览器窗口宽高，且内容大于给定宽高
    *   scrollWidth = 内容宽度 + 其所有的padding + margin + border
    *   scrollHeight = 内容高度 + 其所有的padding + margin + border

### **在某div中的scrollWidth和scrollHeight**

无滚动轴时：

*   scrollWidth = clientWidth = 盒子宽度 + 盒子padding*2

![](https://merrier.wang/wp-content/uploads/2017/05/1480597-1370209704289653.png)有滚动轴时：

*   scrollWidth = 实际内容的宽度 + padding*2
*   scrollHeight = 实际内容的高度 + padding*2

![](https://merrier.wang/wp-content/uploads/2017/05/1480597-f2e4e49734f8ea46.png)

*   **document.body.scrollLeft**
*   **document.body.scrollTop**

与前面不同的是，这对属性是**可读写**的，指的是当元素其中的超出其宽高的时候，元素被卷起来的高度和宽度

#exp {
  width:400px;
  height:200px;
  padding:20px;
  margin:10px;
  background:red;
  border:20px solid #000;
  overflow-y:scroll;
}
var mydiv = document.getElementById("exp");
mydiv.scrollTop ;  //默认情况下是0 
mydiv.scrollLeft ; //默认情况下是0 
//可以改写它
mydiv.scrollTop = 20;
console.log(mydiv.scrollTop)

![](https://merrier.wang/wp-content/uploads/2017/05/1480597-8a31ecd4fd0a59a9.png)

### **obj.style.width和obj.style.height**

对于一个`DOM`元素，它的`style`属性返回的是一个对象，这个对象的任意一个属性是可读写的，`style.width`等于`css`属性中的宽度。`style.height`等于`css`属性中的高度

documentElement和body的关系
=======================

是父子级的关系

console.log(document); //document
console.log(document.documentElement); //html
console.log(document.body); //body

![](https://merrier.wang/wp-content/uploads/2017/05/1480597-a0840d36969a6ca9.png)

*   兼容问题推荐使用 获取浏览器窗口可视区域大小

document.body.clientWidth || document.documentElement.clientWidth;
document.body.clientHeight || document.documentElement.clientHeight;

Event对象的5种坐标
============

*   clientX和clientY：相对于浏览器（可视区左上角0,0）的坐标
*   screenX和screenY：相对于设备屏幕左上角（0,0）的坐标
*   offsetX和offsetY：相对于事件源左上角（0,0）的坐标
*   pageX和pageY：相对于整个网页左上角（0,0）的坐标
*   X和Y：本来是IE属性，相对于用CSS动态定位的最内层包容元素

![](https://merrier.wang/wp-content/uploads/2017/05/1480597-8596ee9ee7d11e15.png)

js各种宽高的应用
=========

*   [可视区域加载](http://codepen.io/poetries/pen/RoeJgG)
*   [判断网页滚动到顶部或者底部](http://codepen.io/poetries/pen/WoayJy)
*   [DIV滚动到底部时加载剩余内容](http://codepen.io/poetries/pen/vyVrvm)
*   [计算滚动轴的宽高](http://codepen.io/poetries/pen/RoeBbL)

js中的宽高属性总结
==========

![](https://merrier.wang/wp-content/uploads/2017/05/1480597-41da370c1bd5e927.png) ![](https://merrier.wang/wp-content/uploads/2017/05/1480597-3f7c4f7f4e7f132a.png) ![](https://merrier.wang/wp-content/uploads/2017/05/1480597-b2343bbf8a94bf8e.png)

##### 参考链接

[JavaScript及jQuery中的各种宽高属性图解](http://blog.poetries.top/2016/12/13/js-props/)