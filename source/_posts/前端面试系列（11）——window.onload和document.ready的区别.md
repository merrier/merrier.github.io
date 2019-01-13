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
---

写在前面
====

这个问题虽然比较简单，但是依然是前端面试中经常会问到的一道题，所以为了让自己“与众不同”，必须全面了解这两者的区别，才能从众多候选人中脱颖而出

一张表格
====

下面这张表格简单的介绍了两者的区别： \[table id=14 /\]

jQ的document.ready()实现
=====================

在jQuery脚本加载的时候，会监听DOMContentLoaded事件。当事件触发时候，会执行ready事件的回调；（document.readyState==="complete"时相当于dom加载完毕） 由于用的是原生的DOMContentLoaded事件，所以**目前的ready函数仅能用于当前document，无需选择器**

谁更快
===

jQuery的document.ready就一定比window.onload快吗？下面是一个例子：

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

执行之后有两种结果：
----------

### 首次加载：

![](/images/hexo_post_11.png)

### 二次加载：

![](/images/hexo_post_12.png) 第一种情况非常符合我们的想法，ready比onload快，顺序也比较合理。 而第二种情况就有些怪异，应该依照上面jquery ready事件的实现，那ready应该要DOMContentLoaded后面啊。我思来想去，我觉得这是个误会，由于二次加载时利用到缓存，导致文件资源都很快加载，各个事件触发的时间非常相近，顺序也不定，就给人一种ready顺序不对之感，大家应该发现这几个事件都是在几十毫秒之内触发。 PS：js执行需要时间，几十毫秒不同的顺序我觉得很正常。另外尝试几次，二次加载顺序确实会有变化，但时间都很相近。 所以，jQuery的document ready不一定比window.onload快执行。

**为什么外部script文件放页面内容后面好？**
==========================

### script执行顺序

《JavaScript高级程序设计》说过——无论如何包含代码，只要不存在defer和async属性，浏览器都会按照<script>元素在页面中出现的先后顺序对它们依次进行解析。换句话说，在第一个<script>元素包含的代码解析完成后，第二个<script>包含代码才会被解析，然后才是第三个..... 在head元素里包含所有JavaScript文件，就必须等到全部JavaScript代码都被下载、解析和执行完成以后，才能呈现页面的内容（浏览器在遇到<body>标签时才开始呈现内容）。在需要很多JavaScript文件时候，浏览器呈现页面会出现明显的延迟，延时期间浏览器是一片空白。 所以，外部script文件放页面内容后面。这样，在解析JavaScript代码之前，页面内容将完全呈现出来。

### 一定是放页面内容后面吗？

有种情况是JavaScript放哪里都一样的，那就是内容是依赖JavaScript的执行渲染时候，放哪都一样。

Load()方法
========

由于在 $(document).ready() 方法内注册的事件，只要 DOM 就绪就会被执行，因此可能此时元素的关联文件未下载完。例如与图片有关的 html 下载完毕，并且已经解析为 DOM 树了，但很有可能图片还没有加载完毕，所以例如图片的高度和宽度这样的属性此时不一定有效。 要解决这个问题，可以使用 Jquery 中另一个关于页面加载的方法 ---load() 方法。 Load() 方法会在元素的 onload 事件中绑定一个处理函数。如果处理函数绑定给 window 对象，则会在所有内容 ( 包括窗口、框架、对象和图像等 ) 加载完毕后触发，如果处理函数绑定在元素上，则会在元素的内容加载完毕后触发。

其他方法
====

$(window).load()：等价于window.onload() $(window).unload()：页面关闭时触发

坑爹的IE or jQ？
============

最近在改一个嵌入在frame中的页面的时候，使用了jquery做效果，而页面本身也绑定了onload事件。改完后，Firefox下测试正常流畅，IE下就要等个十几秒jquery的效果才出现，黄花菜都凉了。 起初以为是和本身onload加载的方法冲突。网上普遍的说法是$(document).ready()是在页面DOM解析完成后执行，而onload事件是在所有资源都准备完成之后才执行，也就是说$(document).ready()是要在onload之前执行的，尤其当页面图片较大较多的时候，这个时间差可能更大。可是我这页面分明是图片都显示出来十几秒了，还不见jquery的效果出来。 删了onload加载的方法试试，结果还是一样，看来没有必要把原本的onload事件绑定也改用$(document).ready()来写。那是什么原因使得Firefox正常而IE就能呢？接着调试，发现IE下原来绑定的onload方法竟然先于$(document).ready()的内容执行，而Firefox则是先执行$(document).ready()的内容，再执行原来的onload方法。这个和网上的说法似乎不完全一致啊，走投无路的时候就看看源码，翻翻jQuery的源码看看$(document).ready()是如何实现的吧：

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

结果很明了了，IE只有在页面不是嵌入frame中的情况下才和Firefox等一样，先执行$(document).ready()的内容，再执行原来的onload方法。对于嵌入frame中的页面，也只是绑定在load事件上执行，所以自然是在原来的onload绑定的方法执行之后才轮到。而这个页面中正好在测试环境下有一个访问不到的资源，那十几秒的延迟正是它放大出的时间差。

##### 参考链接

脚本之家：[http://www.jb51.net/article/50185.htm](http://www.jb51.net/article/50185.htm) cnblogs：[http://www.cnblogs.com/lovesong/p/5641834.html](http://www.cnblogs.com/lovesong/p/5641834.html)