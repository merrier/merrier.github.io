---
title: iOS中采用AMP规范时的scroll和position:fixed带来的bug
urlname: the-bugs-caused-by-scroll-and-position
id: 1212
categories:
  - 移动端
tags:
  - AMP
  - fixed
  - ios
  - 前端
date: 2017-08-26 20:23:20
img: /images/hexo_thumbnail_67.jpg
---

本文翻译自一位前辈的两篇文章，原文链接：

* [AMP, iOS, Scrolling and Position Fixed](https://medium.com/@dvoytenko/amp-ios-scrolling-and-position-fixed-b854a5a0d451)
* [AMP, iOS, Scrolling and Position Fixed Redo — the wrapper approach](https://hackernoon.com/amp-ios-scrolling-and-position-fixed-redo-the-wrapper-approach-8874f0ee7876)

首先，你需要先了解一下 AMP，[点击这里](https://imququ.com/post/amp-project.html)

## 前言

我们对于 AMP 的目标是确保 document 文档在不同环境中都是可嵌入的，无论是单独查看还是在 webview 中或者在 iframe 中——总体而言，它在不同环境中的功能和行为表现都应该尽可能相同。我们将从一个简单的栗子开始，在这个栗子中，一个 AMP 文档通过 iframe 被嵌入了一个 web app。这听起来很正常，但是很实在的说，iframes 在最近已经很少有人用了。闲话少说，html 结构是这样的：

```html
<html>
<head>
  <title>I’m a Web App and I show AMP documents</title>
  <style>
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  </style>
</head>
<body>
 <iframe … width="100%" height="100%"
   scrolling="yes"
   src="https://cdn.ampproject.org/c/pub1.com/doc1"></iframe>
</body>
</html>
```

上面这段代码通常来说在移动设备上表现良好。然后我们有了一个新的想法，我们尝试将 iframe 调整到整个 document 的高度，同时使用 static 定位，从而将滚动委托给上一层的 window。然而，出于一些原因，我们放弃了这种方法：

* 当视口高度等于文档高度时，在嵌入的AMP文档中设置`“position: fixed”`是不会起作用的
* 计算文档高度容易出错，而且有延迟

当然，我们最终没有很好的解决方案。主要是，设置了`“scrolling=yes”`的 iframe 会丢失一些移动设备的特性，比如滚动时隐藏地址栏。然而，我们仍然觉得这已经是一个很好的折衷方案了。除此之外，一些浏览器已经开始尝试将这些特性扩展到非 body 滚动的情况中。我们就这样美滋滋，直到我们遇到了 iOS。。

### 问题1：iOS 不支持 iframe 的 `“scrollable=yes”`

Bug：[https://bugs.webkit.org/show_bug.cgi?id=149264](https://bugs.webkit.org/show_bug.cgi?id=149264) 简单的说：**ios中不能有可以滚动的iframe**。然而，我们找到了解决这个 bug 的方法。参考这里[ViewportBindingNaturalIosEmbed_](https://github.com/ampproject/amphtml/blob/de7a14d/src/service/viewport-impl.js#L754)。简短而言，我们让 document 中真正的`<body>`元素滚动。这样的话，即使 iframe 自身不滚动，它里面的内容也会滚动。 我们按照上面方案修改后的 AMP 文档如下：

```html
<html AMP
  style="overflow-y: auto; -webkit-overflow-scrolling: touch;">
<head></head>
<body
    style="
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    ">
</body>
</html>
```

我们以为自己很牛逼，然而。。

### 问题2：现在 scrollTop，scrollLeft，scrollHeight，scrollWidth 不管用了

Bug：[https://bugs.webkit.org/show_bug.cgi?id=106133](https://bugs.webkit.org/show_bug.cgi?id=106133) 这是 webkit 中长期存在的一个 bug。scrollTop 和其他类似属性被分配给了 `“document.body”`，但是却委托给了`“document.documentElement”`。最终，当 “scrollingElement” 是文档里的大部分元素的时候，这个问题会被解决。同时，令人惊喜的是，这个 bug 不会对我们在问题1中提出的解决方案造成冲突。然而，`“scrollTop”` 将会一直是 0，从而导致其他连带属性也会受到影响，比如 `“window.pageYOffset”` 解决方案是添加一个滚动的元素到文档顶部。它的 `“getBoundingClientRect().top”` 就可以用来重新计算文档的滚动位置。 具体如下所示：

```html
<html AMP
    style="overflow-y: auto; -webkit-overflow-scrolling: touch;">
<head></head>
<body
    style="
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    ">
  <div id="scroll-pos"
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        visibility: hidden;
      "></div>
</body>
</html>
```

我们的 JS 代码：

```javascript
function getScrollTop() {
  // 要对scrollPos.top取负值的原因是滚动位置在计算时，
  // 我们的scrollPos元素会向上滚动，在视口范围外,
  // 此时它的top值是负的
  return -scrollPos.getBoundingClientRect().top;
}
```

从上面的代码可以看出，这个解决方案显得很蠢，但是它确实奏效了。类似的方法可用于“scrollLeft”，“scrollHeight” 以及剩余属性。 然而，我们又有了新的发现。。

### 问题3：“postion: fixed” 的元素在 “overflow: auto” 容器中会有很多 bug

Bug：[https://bugs.webkit.org/show_bug.cgi?id=154399](https://bugs.webkit.org/show_bug.cgi?id=154399) 如果一个 “position: fixed” 元素在一个 “overflow: auto” 的容器中，它的表现会让你很失望：滚动的时候，“position: fixed” 元素会跳远和闪现。它看起来像是稍微滚动一点然而又跳回到正确的位置。这个效果很差，可以通过这个[视频演示](https://drive.google.com/file/d/0B_v8thsbiGyDMXZMZkRFZGFRbjA/view?usp=sharing)看到这个 bug。 要哭了。我们通过各种 hack 解决了各种 bug，最后还是有一个 bug，我们如何解决这个？这里有一个很疯狂的 idea 貌似好使。我们可以添加一个虚拟元素到 “document.documentElement”（不是 “body”，所以它其实是 “body” 的兄弟元素）。我们把它叫做“**固定层**”。他将占据整个视口。我们将使用CSS来找到所有的可能是 “fixed” 的元素（希望不会有太多。。），如果在某些时候它们是确定 “fixed” 的，我们就通过正确的 “z-index” 属性将它们移动到“固定层” 你可能看晕了，直接上代码：

```html
<html AMP
    style="overflow-y: auto; -webkit-overflow-scrolling: touch;">
<head>
  <style>
    #fixed-element {
      position: fixed;
      right: 20px;
      top: 20px;
    }
  </style>
</head>
<body
    style="
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    ">
  <div id="fixed-element">
  </div>
</body>
<div id="fixed-layer"
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    ">
</div>
</html>
```

当我们找到一个确实 “fixed” 的元素的时候，我们将它移动到“固定层”，像这样：

```html
<div id="fixed-layer"
    style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    ">
  <div id="fixed-element"
      style="pointer-events: initial; z-index: 11;">
  </div>
</div>
```

因此，我们可以根据某元素是否 “fixed” 来将它在 “body” 中的原始位置和“固定层”之间移动。 这个方法就无懈可击了吗？很明显没有：

* 这代码看都看不懂！
* 计算 “z-index” 会相当痛苦
* 我们将失去一些 CSS 祖先选择器

但是它确实是有效的，可以看一下[这条PR](http://github.com/ampproject/amphtml/pull/2128)。还有别的 idea 吗？ 准确来说是有的，下面是作者第二篇文章的译文：

## 回顾一下

简单回顾一下，AMP 文档经常在一个滚动的 iframe 中进行展示。它的 html 结构看起来像这样：

```html
<html>
  <head>
    <title>I'm a Web App and I show AMP documents</title>
    <style>
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    </style>
  </head>
  <body>
    <iframe … width="100%" height="100%"
      scrolling="yes"
      src="https://cdn.ampproject.org/c/pub1.com/doc1"></iframe>
  </body>
</html>
```

在大部分浏览器中，上面这段代码表现很正常。但是在 ios 中会有很多异常表现，我们尝试了很多方法，包括通过内容调整 iframe 大小和滚动主文档。但是他们都有一些性能问题，具体可以参见上面的问题描述。 根本而言，ios 的 safari 浏览器不支持滚动的 iframe。换句话说，`“scrolling=yes”` 这个属性被直接忽略了。[看这个例子](http://jsbin.com/gugika/edit?html,css,output)。这个 bug 由来已久，可以[在这里](https://bugs.webkit.org/show_bug.cgi?id=149264)发现。 我们在[之前提到的一篇文章](https://github.com/ampproject/amphtml/blob/de7a14d/src/service/viewport-impl.js#L754)中发现了一个很原始的方案。简而言之，我们让真正的 “body” 元素滚动。于是，即使 iframe 它自身不滚动，iframe 中的内容也会滚动，AMP 文档如下：

```html
<html AMP
    style="overflow-y: auto; -webkit-overflow-scrolling: touch;">
  <head></head>
  <body
      style="
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      ">
    <!\-\- document content -->
  </body>
</html>
```

现在我们 iframe 可以滚动了！这个 AMP 中的解决方案我们用了一年。然而，随着时间的流逝，我们发现了一系列的问题，这些问题在上一篇文章中已经详细介绍过了，这里再简单罗列一下： 给“ body” 添加 “position: absolute” 属性是作者不想看到的，会影响原始布局。另外一个副作用是我们不没办法在 “body” 元素上设置 margin body 的 scrollTop，scrollLeft，scrollHeight 和 scrollWidth 将不起作用。这个 bug 通过上面介绍的注入虚拟 dom 元素可以解决。 “position: fixed” 在 “-webkit-overflow-scrolling: touch” 容器中会有各种 bug 抵消 header 和 footer 需要给 body 设置边框，这个代价很昂贵，因为它缩小了滚动区域，同时可能会打破现有布局。而隐藏头部又会造成 UI 视觉的隔断和滚动的间断 那我们如何解决这个问题呢，我们的主角就要登场了。。

### 新的解决方案——wrapper 元素

这个方案已开源，可以[点击这里](https://github.com/ampproject/amphtml/blob/2d73ac0d9c451dee4c89ac1fa73329b69edca5a4/src/service/viewport-impl.js#L1404)查看源代码

### DOM 结构

通俗来讲，wrapper 元素和滚动的 “body” 元素是类似的。iframe 在 ios 的 safari 浏览器中依然无法滚动，所以我们需要让 iframe 中的内容滚动。因为让`<body>`滚动会有一系列问题，所以我们可以创建一个滚动的 wrapper，然后将它放在`<html>`和`<body>`中间。换句话说，我们将`<body>`元素包装在一个可滚动的容器中。 现在的 dom 结构类似这样：

```html
<html AMP
    style="overflow-y: auto; -webkit-overflow-scrolling: touch;">
  <head></head>
  <i-amp-html-wrapper
      style="
        display: block;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      ">
    <body style="position: relative;">
      <!\-\- document content -->
    </body>
  </i-amp-html-wrapper>
</html>
```

毫无疑问，这看起来很怪，但是它确实解决了原来的问题——它让 iframe 在 ios 的 safari 浏览器中可以滚动。此外，它也解决了上面描述的许多问题：

* 对于`<body>`元素没有任何强制要求：它仍然拥有原来的“position”属性，同时也可以拥有默认的“overflow: visible”属性。AMP 允许 dom 中的大多数 css 样式，这样可以减少对代码原作者样式的干扰
* 可滚动的 wrapper 元素可以用来获取 scrollTop，scrollLeft，scrollHeight 和 scrollWidth 属性，于是之前介绍过的虚拟元素将不再需要
* 不再需要给`<body>`设置边界来抵消 header 和 footer 了——只需要给 wrapper 元素添加 padding 就足够了

然而，“position: fixed” 的问题仍然存在，我们稍后再谈。

### 两个`<html>`元素

我们采用了 wrapper 方案，然后很快就碰到了一个小问题。很多人喜欢 html>body 选择器，而我们在 `<html>` 和 `<body>` 中间插入了 i-amp-html-wrapper 元素。为了解决这个问题，我们将 i-amp-html-wrapper 作为另外一个 `<html>` 元素，最终的 dom 结构长这样：

```html
<html AMP
    style="overflow-y: auto; -webkit-overflow-scrolling: touch;">
  <head></head>
  <html id="i-amp-html-wrapper"
      style="
        display: block;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      ">
    <body style="position: relative;">
      <!\-\- document content -->
    </body>
  </html>
</html>
```

加倍奇怪，加倍好玩。总而言之现在 html>body 选择器将正常起作用

### 实践

AMP runtime 会在启动时尽可能早的创建 wrapper 元素。而现有的 `<body>` 元素会作为子元素放到新建 wrapper 里面

```javascript
// Create wrapper.
const wrapper = document.createElement('html');
wrapper.id = 'i-amp-html-wrapper';

// Setup classes and styles.
wrapper.className = document.documentElement.className;
document.documentElement.className = '';
document.documentElement.style = '...';
wrapper.style = '...';

// Attach wrapper straight inside the document root.
document.documentElement.appendChild(wrapper);

// Reparent the body.
const body = document.body;
wrapper.appendChild(body);
Object.defineProperty(document, 'body', {
  get: () => body,
});
```

这段代码很简单，不过有一个细节——将 body 移到 wrapper 里面会将 document.body 重置为 null，因此我们需要将 document.body 重写回初始的 `<body>` 元素，可以通过 Object.defineProperty 来实现

#### position: fixed问题

尽管 wrapper 方案能够解决大部分问题，但是 position: fixed 的问题仍然存在 这个问题在上面那篇文章已经详细介绍过了，有关 ios 的 safari 浏览器 bug 可以[点击这里](https://bugs.webkit.org/show_bug.cgi?id=154399)查看 简而言之，一个 position: fixed 元素在一个 -webkit-overflow-scrolling: touch 容器中滚动时会出现跳跃和闪现的问题。它看起来像是稍微滚动一点然而又跳回到正确的位置。可以通过这个[视频演示](https://drive.google.com/file/d/0B_v8thsbiGyDMXZMZkRFZGFRbjA/view?usp=sharing)看到这个 bug。 在我们之前的解决方案中，我们将有 position: fixed 属性的元素放到了 `<body>` 外面，同时放到了一个虚拟“固定层”元素内部，这个“固定层”元素放在了 -webkit-overflow-scrolling: touch 容器外面 最终的 dom 结构：

```html
<html AMP
    style="overflow-y: auto; -webkit-overflow-scrolling: touch;">
  <head></head>
  <html id="i-amp-html-wrapper"
      style="
        display: block;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      ">
    <body style="position: relative;">
      <!\-\- document content -->
    </body>
  </html>
  <body id="i-amp-fixed-layer"
      style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      ">
    <!\-\- fixed elements reparented here -->
  </body>
</html>
```

于是，**我们最终获得了两个`<html>`元素和两个`<body>`元素**。看起来很疯狂，但是它确实解决了两个问题： iframe 不滚动和 position:fixed 元素闪现问题 很明显，我们将取得更好的效果如果存在已久的 ios safari 问题被修复。。