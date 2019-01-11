---
title: 前端面试系列（1）——HTML5新特性
urlname: new-features-of-html5
tags:
  - HTML
  - 前端面试
  - 面试
id: 228
categories:
  - HTML
  - 前端
date: 2017-03-18 18:32:25
---

这道问题被问的比较少，因为在如今前端框架大行其道的趋势下，对于HTML的理解似乎已经变得不那么重要了，况且浏览器对h5（是的，我们通常说的h5其实就是HTML5，5指版本）的支持还不那么完美，但是了解一下还是有助于自己前端水平的提升的，在查阅资料的过程中我发现有些特性我也是第一次知道，不过有些特性已经显示了其强大之处，比如：canvas，高能预警，大量干货：

摒弃了旧特性
======

1.原HTML声明方式将失效，将采用简单的声明方式
-------------------------

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!DOCTYPE html>

2.脚本和链接无需type，在HTML5中，你只需要用简化的代码来给你的网页添加CSS和JavaScript文件，而不再需要指定类型属性
--------------------------------------------------------------------

<link rel="stylesheet" href="path/to/stylesheet.css" />
 
<script src="path/to/script.js"></script>

新的内容元素
======

1.figure元素：
-----------

和来语义化地表示带标题的图片" ><figure> 
<img src=”path/to/image” alt=”About image” /> 
<figcaption> 
<p>This is an image of something interesting. </p> 
</figcaption> 
</figure>

2.hgroup：一般在header里面用来将一组标题组合在一起
--------------------------------

<header> 
<hgroup> 
<h1> Recall Fan Page </h1> 
<h2> Only for people who want the memory of a lifetime. </h2> 
</hgroup> 
</header>

3.mark：高亮的作用，比如用户的搜索内容可以在文章中用<mark>进行修饰
---------------------------------------

<h3> Search Results </h3> 
<p> They were interrupted, just after Quato said, <mark>”Open your Mind”</mark>. </p>

4.output：用来显示计算结果，也有一个和lable一样的for属性
------------------------------------

5.small：重新定义了<small>，现在被用来表示小的排版，如网站底部的版权声明
-------------------------------------------

6.article：定义文章
--------------

7.footer：定义尾部
-------------

8.header：定义头部
-------------

9.nav：定义导航栏
-----------

10.section：定义section
--------------------

新的属性：
=====

1.contenteditable属性：让你的内容可编辑
----------------------------

2.placeholder：不必通过javascript就可以显示提示内容了
--------------------------------------

3.input的新type，包括email（如果给input的type设置为email，浏览器就会验证这个输入是否是email类型）、range（可以创建滑块，它接受min，max，step和value属性）、color（颜色选择器）等等
-----------------------------------------------------------------------------------------------------------------------

4.input的新属性，包括autocomplete（on/off，是否使用输入字段的自动完成功能）、autofocus（规定输入字段在页面加载时是否获得焦点，但不试用于type="hidden"）、required（指示输入字段的值是必须的）、form（规定输入字段所属的一个或多个表单）->其实新属性还有很多，可以点击文末w3c官网链接进行查看
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

5.pattern属性：可以在input里直接使用正则表达式验证了
---------------------------------

<form action=”" method=”post”> 
<label for=”username”>Create a Username: </label> 
<input type=”text” name=”username” id=”username” placeholder=”4 <> 10″ pattern=”\[A-Za-z\]{4,10}” autofocus required> 
<button type=”submit”>Go </button> 
</form>

新的重要的元素
=======

1.canvas：使用Javascript在网页上绘制图像，canvas拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法；将在游戏、图表制作、banner广告、模拟器、远程计算机控制、字体设计、图形编辑器、其他可嵌入网站的内容等方面大有可为；
---------------------------------------------------------------------------------------------------------------------------

SVG 与 Canvas两者间的区别： SVG 是一种使用 XML 描述 2D 图形的语言。Canvas 通过 JavaScript 来绘制 2D 图形。 SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。 Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。 下表列出了 canvas 与 SVG 之间的一些不同之处。 ![](/images/hexo_post_137-300x124.png)

2.视频video元素
-----------

今天，大多数视频是通过插件（比如 Flash）来显示的。然而，并非所有浏览器都拥有同样的插件。通用的视频播放解决方案是flash和flv（flash从9开始支持h.264的mp4）。但是随着iOS设备的流行，flash已经不是万能药了，越来越多的视频网站提供多元的解决方案，而且偏向于html5：也就是说，通过检测agent是否支持html5来决定使用video还是flash。在面对IE8以下的浏览器时，flash几乎是唯一的选择(silverlight的接受度普遍不高)。

3.音频audio元素
-----------

同理可见video元素

对本地离线存储的更好的支持
=============

1.Web worker：是运行在后台的JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。
-----------------------------------------------------------------------------------------------

2.Web Storage：将数据存储在本地，而不会和服务器发生任何交互，使得数据操作更加简便
-----------------------------------------------

*   Web Storage与Cookie相比存在不少的优势，概括为以下几点：存储空间更大，能提供5MB的存储空间（不同浏览器的提供的空间不同），Cookie仅4KB
*   存储内容不会发送到服务器：当设置了Cookie后，Cookie的内容会随着请求一并发送的服务器，这对于本地存储的数据是一种带宽浪费。而Web Storage中的数据则仅仅是存在本地，不会与服务器发生任何交互。
*   更多丰富易用的接口：Web Storage提供了一套更为丰富的接口，使得数据操作更为简便。(开发者的福利)
*   独立的存储空间：每个域（包括子域）有独立的存储空间，各个存储空间是完全独立的，因此不会造成数据混乱。

3.Application Cache：使用HTML5，通过创建cache manifest文件，可以轻松地创建web应用的离线版本，HTML5引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。应用程序缓存为应用带来三个优势：
-----------------------------------------------------------------------------------------------------------------------------------

*   离线浏览 - 用户可在应用离线时使用它们
*   速度 - 已缓存资源加载得更快
*   减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。

地理位置API
=======

1.Geolacation API用于获得用户的地理位置，实例：
--------------------------------

*   更新本地信息
*   显示用户周围的兴趣点
*   交互式车载导航系统（GPS）

网易用户体验中心对HTML5的动画演示：[http://uedc.163.com/wp-content/uploads/2011/07/flash.html](http://uedc.163.com/wp-content/uploads/2011/07/flash.html) w3c对HTML5的讲解：[http://www.w3school.com.cn/html5/html\_5\_intro.asp](http://www.w3school.com.cn/html5/html_5_intro.asp)