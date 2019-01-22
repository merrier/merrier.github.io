---
title: 前端面试系列（1）——HTML5新特性
urlname: new-features-of-html5
id: 228
categories:
  - HTML
tags:
  - HTML
  - 面试
date: 2017-03-18 18:32:25
img: /images/hexo_thumbnail_69.jpeg
---

这道问题被问的比较少，因为在如今前端框架大行其道的趋势下，对于 HTML 的理解似乎已经变得不那么重要了，况且浏览器对 H5（是的，我们通常说的 H5 其实就是 HTML5，5 代表版本）的支持还不那么完美，但是了解一下还是有助于自己前端水平的提升的，在查阅资料的过程中我发现有些特性我也是第一次知道，不过有些特性已经显示了其强大之处，比如：canvas，高能预警，大量干货：

## 摒弃了旧特性

### 1. 原 HTML 声明方式将失效，将采用简单的声明方式

原来：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

现在：

```html
<!DOCTYPE html>
```

### 2. 脚本和链接无需 type，在 HTML5 中，你只需要用简化的代码来给你的网页添加 CSS 和 JavaScript 文件，而不再需要指定类型属性

```html
<link rel="stylesheet" href="path/to/stylesheet.css" />
<script src="path/to/script.js"></script>
```

## 新的内容元素

### 1. figure

可以更加语义化地表示带标题的图片

```html
<figure>
  <img src=”path/to/image” alt=”About image” />
  <figcaption>
    <p>This is an image of something interesting. </p>
  </figcaption>
</figure>
```

### 2. hgroup

一般在 header 里面用来将一组标题组合在一起

```html
<header>
  <hgroup>
    <h1> Recall Fan Page </h1>
    <h2> Only for people who want the memory of a lifetime. </h2>
  </hgroup>
</header>
```

### 3. mark

高亮的作用，比如用户的搜索内容可以在文章中用 `<mark>` 进行修饰

```html
<h3> Search Results </h3> 
<p> They were interrupted, just after Quato said, <mark>”Open your Mind”</mark>. </p>
```

### 4. output

用来显示计算结果，也有一个和 label 一样的 for 属性

### 5. small

重新定义了 `<small>`，现在被用来表示小的排版，如网站底部的版权声明

### 6. article

定义文章

### 7. footer

定义尾部

### 8. header

定义头部

### 9. nav

定义导航栏

### 10. section

定义 section 区域

## 新的属性：

### 1. contenteditable

让你的内容可编辑

### 2. placeholder

不必通过javascript就可以显示提示内容了

### 3. input 的 新type

包括 email（如果给 input 的 type 设置为 email，浏览器就会验证这个输入是否是 email 类型）、range（可以创建滑块，它接受 min，max，step 和 value 属性）、color（颜色选择器）等等

### 4. input 的新属性

包括 autocomplete（on / off，是否使用输入字段的自动完成功能）、autofocus（规定输入字段在页面加载时是否获得焦点，但不试用于 type="hidden"）、required（指示输入字段的值是必须的）、form（规定输入字段所属的一个或多个表单）-> 其实新属性还有很多，可以点击文末 w3c 官网链接进行查看

### 5. pattern 属性

可以在 input 里直接使用正则表达式验证了

```html
<form action=”" method=”post”> 
  <label for=”username”>Create a Username: </label> 
  <input type=”text” name=”username” id=”username” placeholder=”4-10″ pattern=”\[A-Za-z\]{4,10}” autofocus required> 
  <button type=”submit”>Go </button> 
</form>
```

## 新的重要的元素

### 1. canvas

使用 Javascript 在网页上绘制图像，canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法；将在游戏、图表制作、banner 广告、模拟器、远程计算机控制、字体设计、图形编辑器、其他可嵌入网站的内容等方面大有可为；

#### SVG 与 Canvas 两者间的区别：

1. SVG 是一种使用 XML 描述 2D 图形的语言。Canvas 通过 JavaScript 来绘制 2D 图形。
2. SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
3. 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

下表列出了 canvas 与 SVG 之间的一些不同之处：

| Canvas                    | SVG                            | 
|---------------------------|--------------------------------| 
| 依赖分辨率                     | 不依赖分辨率                         | 
| 不支持事件处理器                  | 支持事件处理器                        | 
| 弱的文本渲染能力                  | 最适合带有大型渲染区域的应用程序（比如谷歌地图）       | 
| 能够以 .png 或 .jpg 格式保存结果图像  | 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快） | 
| 最适合图像密集型的游戏，其中的许多对象会被频繁重绘 | 不适合游戏应用                        |

### 2. 视频 video 元素

今天，大多数视频是通过插件（比如 Flash）来显示的。然而，并非所有浏览器都拥有同样的插件。通用的视频播放解决方案是 flash 和 flv（flash 从 9 开始支持 h.264 的 mp4）。但是随着 iOS 设备的流行，flash 已经不是万能药了，越来越多的视频网站提供多元的解决方案，而且偏向于 HTML5：也就是说，通过检测 agent 是否支持 html5 来决定使用 video 还是 flash。在面对 IE8 以下的浏览器时，flash 几乎是唯一的选择(silverlight 的接受度普遍不高)。

### 3. 音频 audio 元素

同理可见 video 元素

## 对本地离线存储的更好的支持

### 1. Web worker

运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

### 2. Web Storage

将数据存储在本地，而不会和服务器发生任何交互，使得数据操作更加简便

* Web Storage 与 Cookie 相比存在不少的优势，概括为以下几点：存储空间更大，能提供 5MB 的存储空间（不同浏览器的提供的空间不同），Cookie 仅 4KB
* 存储内容不会发送到服务器：当设置了 Cookie 后，Cookie 的内容会随着请求一并发送的服务器，这对于本地存储的数据是一种带宽浪费。而 Web Storage 中的数据则仅仅是存在本地，不会与服务器发生任何交互。
* 更多丰富易用的接口：Web Storage 提供了一套更为丰富的接口，使得数据操作更为简便。(开发者的福利)
* 独立的存储空间：每个域（包括子域）有独立的存储空间，各个存储空间是完全独立的，因此不会造成数据混乱。

### 3. Application Cache

使用 HTML5，通过创建 cache manifest 文件，可以轻松地创建 web 应用的离线版本，HTML5 引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。应用程序缓存为应用带来三个优势：

* 离线浏览 - 用户可在应用离线时使用它们
* 速度 - 已缓存资源加载得更快
* 减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。

## 地理位置 API

Geolacation API 用于获得用户的地理位置，实例：

* 更新本地信息
* 显示用户周围的兴趣点
* 交互式车载导航系统（GPS）

## 扩展阅读

* [HTML 5 教程](http://www.w3school.com.cn/html5/index.asp)