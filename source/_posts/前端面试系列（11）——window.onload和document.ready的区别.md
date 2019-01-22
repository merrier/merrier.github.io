---
title: 前端面试系列（11）——window.onload和document.ready的区别
urlname: the-difference-between-window.onload-and-document.read
id: 600
categories:
  - JS
tags:
  - JS
  - 前端面试
date: 2017-04-12 17:14:30
img: /images/hexo_thumbnail_9.jpg
---

这个问题虽然比较简单，但是依然是前端面试中经常会问到的一道题，所以为了让自己“与众不同”，必须全面了解这两者的区别，才能从众多候选人中脱颖而出

## 一张表格

下面这张表格简单的介绍了两者的区别：

|                                                   | window.onload()          | $(document).ready()                             | 
|---------------------------------------------------|--------------------------|-------------------------------------------------| 
| 执行时机                                              | 在页面所有元素（包括图片，引用文件）加载完后执行 | 页面中所有HTML DOM，CSS DOM结构加载完之后就会执行，其他图片等内容可能没有加载完 | 
| 编写个数                                              | 不能同时写多个，后面的将会覆盖前面的       | 可以同时写多个                                         | 
| 简写 |           无               |    $().ready(function(){}) // $()不带参数默认是document；$(function(){})                 | 


## jQ 的 document.ready() 实现

在 jQuery 脚本加载的时候，会监听 DOMContentLoaded 事件。当事件触发时候，会执行 ready 事件的回调；（document.readyState === "complete" 时相当于 dom 加载完毕
由于用的是原生的 DOMContentLoaded 事件，所以**目前的 ready 函数仅能用于当前 document，无需选择器**

## 谁更快

jQuery 的 document.ready 就一定比 window.onload 快吗？下面是一个例子：

```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
<meta charset="UTF-8"/>
<title>加载时机</title>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.js"
onload="console.log('jquery.js loaded')"></script>
<script>
     console.log('define functions');
     function load(type, info){
          console.log(type + ' onload ' + (info || ""), new Date().getTime());
     }
     $(document).ready(function () {
          load('document ready');
     });
     document.onload = function () {
          load('document');
     };    
     window.onload = function () {
          load('window');
     };
     window.addEventListener("load",function(){
          load('window addEventListener');
     });
     document.addEventListener( "DOMContentLoaded", function () {
          load('DOMContentLoaded');
     });
</script>
</head>
     <body onload="load('body')">
          <div onload="load('text')">test</div>
          <img onload="load('img',1)" src="http://www.deskcar.com/desktop/else/2013714232149/17.jpg" />
          <img onload="load('img',2)" src="http://www.deskcar.com/desktop/else/2013714232149/16.jpg" />
          <script onload="load('js')" src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.0/react.min.js"></script>
     </body>
</html>
```

### 执行之后有两种结果：

#### 首次加载：

<div align='center'><img src='/images/hexo_post_11.png' alt='' width='400'/></div>

#### 二次加载：

<div align='center'><img src='/images/hexo_post_12.png' alt='' width='400'/></div>

第一种情况非常符合我们的想法，ready 比 onload 快，顺序也比较合理。而第二种情况就有些怪异，应该依照上面 jquery ready 事件的实现，那 ready 应该要 DOMContentLoaded 后面啊。我思来想去，我觉得这是个误会，由于二次加载时利用到缓存，导致文件资源都很快加载，各个事件触发的时间非常相近，顺序也不定，就给人一种 ready 顺序不对之感，大家应该发现这几个事件都是在几十毫秒之内触发。PS：js 执行需要时间，几十毫秒不同的顺序我觉得很正常。另外尝试几次，二次加载顺序确实会有变化，但时间都很相近。所以，jQuery 的 document ready 不一定比 window.onload 快执行。

## 为什么外部 script 文件放页面内容后面好？

### script 执行顺序

> 无论如何包含代码，只要不存在 defer 和 async 属性，浏览器都会按照 `<script>` 元素在页面中出现的先后顺序对它们依次进行解析。——《JavaScript高级程序设计》

换句话说，在第一个 `<script>` 元素包含的代码解析完成后，第二个 `<script>` 包含代码才会被解析，然后才是第三个.....
如果在 head 元素里包含所有 JavaScript 文件，就必须等到全部 JavaScript 代码都被下载、解析和执行完成以后，才能呈现页面的内容（浏览器在遇到 `<body>` 标签时才开始呈现内容）。在有 JavaScript 文件时候，浏览器呈现页面会出现明显的延迟，延时期间浏览器是一片空白。所以，外部 script 文件放页面内容后面。这样，在解析 JavaScript 代码之前，页面内容将完全呈现出来。

### 一定是放页面内容后面吗？

有种情况是 JavaScript 放哪里都一样的，那就是内容是依赖 JavaScript 的执行渲染时候，放哪都一样。所以我们需要尽量避免在 JS 中对 dom 进行修改，对于性能优化有比较大的帮助。

## Load() 方法

由于在 $(document).ready() 方法内注册的事件，只要 DOM 就绪就会被执行，因此可能此时元素的关联文件未下载完。例如与图片有关的 html 下载完毕，并且已经解析为 DOM 树了，但很有可能图片还没有加载完毕，所以例如图片的高度和宽度这样的属性此时不一定有效。要解决这个问题，可以使用 Jquery 中另一个关于页面加载的方法—— load() 方法。Load() 方法会在元素的 onload 事件中绑定一个处理函数。如果处理函数绑定给 window 对象，则会在所有内容（包括窗口、框架、对象和图像等）加载完毕后触发，如果处理函数绑定在元素上，则会在元素的内容加载完毕后触发。

## 其他方法

* $(window).load()：等价于 window.onload()
* $(window).unload()：页面关闭时触发

## 坑爹的 IE or jQ？

最近在改一个嵌入在 iframe 中的页面的时候，使用了 jquery 做效果，而页面本身也绑定了 onload 事件。改完后，Firefox 下测试正常流畅，IE 下就要等个十几秒 jquery 的效果才出现，黄花菜都凉了。起初以为是和本身 onload 加载的方法冲突。网上普遍的说法是 $(document).ready() 是在页面 DOM 解析完成后执行，而 onload 事件是在所有资源都准备完成之后才执行，也就是说 $(document).ready() 是要在 onload 之前执行的，尤其当页面图片较大较多的时候，这个时间差可能更大。可是我这页面分明是图片都显示出来十几秒了，还不见 jquery 的效果出来。 删了 onload 加载的方法试试，结果还是一样，看来没有必要把原本的 onload 事件绑定也改用 $(document).ready() 来写。那是什么原因使得 Firefox 正常而 IE 就能呢？接着调试，发现 IE 下原来绑定的 onload 方法竟然先于 $(document).ready() 的内容执行，而 Firefox 则是先执行 $(document).ready() 的内容，再执行原来的 onload 方法。这个和网上的说法似乎不完全一致啊，走投无路的时候就看看源码，翻翻 jQuery 的源码看看 $(document).ready() 是如何实现的吧：

```javascript
if ( jQuery.browser.msie && window == top ) (function(){ 
if (jQuery.isReady) return; 
try { 
document.documentElement.doScroll("left"); 
} catch( error ) { 
　　　　　　setTimeout( arguments.callee, 0 ); 
　　　　　　 return; 
　　　　} 
　　 // and execute any waiting functions 
　　　jQuery.ready(); 
})(); 
jQuery.event.add( window, "load", jQuery.ready );
```

结果很明了了，IE 只有在页面不是嵌入 iframe 中的情况下才和 Firefox 等一样，先执行 $(document).ready() 的内容，再执行原来的 onload 方法。对于嵌入 iframe 中的页面，也只是绑定在 load 事件上执行，所以自然是在原来的 onload 绑定的方法执行之后才轮到。而这个页面中正好在测试环境下有一个访问不到的资源，那十几秒的延迟正是它放大出的时间差。

## 参考文章

* [一张表格告诉你windows.onload()与$(document).ready()的区别](http://www.jb51.net/article/50185.htm)
* [jQuery的document ready与 onload事件——你真的思考过吗？](http://www.cnblogs.com/lovesong/p/5641834.html)