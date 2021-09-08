---
title: 最好用的工具和 NPM 库都在这里了
urlname: some-useful-npm-libraries
id: 2067
date: 2018-12-20 10:38:58
categories:
  - JS
tags:
  - npm
  - 推荐
---

分享一些 NPM 库或者其他实用的工具

## zx

Github 地址：https://github.com/google/zx

用 JS 写脚本，很有意思：

```js
#!/usr/bin/env zx

await $`cat package.json | grep name`

let branch = await $`git branch --show-current`
await $`dep deploy --branch=${branch}`

await Promise.all([
  $`sleep 1; echo 1`,
  $`sleep 2; echo 2`,
  $`sleep 3; echo 3`,
])

let name = 'foo bar'
await $`mkdir /tmp/${name}`
```

## fx

官网：https://fx.wtf/
Github 地址：https://github.com/antonmedv/fx

Command-line JSON processing tool

<div align='center'><img src='/images/hexo_post_721.gif' alt='' /></div>

## react-content-loader

官网：https://skeletonreact.com/
Github 地址：https://github.com/danilowoz/react-content-loader

SVG-Powered component to easily create placeholder loadings (like Facebook's cards loading).

## canvas-confetti

官网：https://catdad.github.io/canvas-confetti/
Github 地址：https://github.com/catdad/canvas-confetti

轻松实现烟花特效，支持各种自定义参数

<div align='center'><img src='/images/hexo_post_720.jpeg' alt='' /></div>

## Triangula

Github 地址：https://github.com/RH12503/triangula

Triangula uses a modified genetic algorithm to triangulate or polygonate images. It works best with images smaller than 3000px and with fewer than 3000 points, typically producing an optimal result within a couple of minutes.

<div align='center'><img src='/images/hexo_post_719.png' alt='' /></div>

## react-pdf

官网：https://react-pdf.org/
Github 地址：https://github.com/diegomura/react-pdf

React renderer for creating PDF files on the browser and server

## localtunnel

官网：https://localtunnel.me/
Github 地址：https://github.com/localtunnel/localtunnel

localtunnel exposes your localhost to the world for easy testing and sharing! No need to mess with DNS or deploy just to have others test out your changes.

Great for working with browser testing tools like browserling or external api callback services like twilio which require a public url for callbacks.

## git-blame-someone-else

Github 地址：https://github.com/jayphelps/git-blame-someone-else

只有恶搞的作用，其他一无是处

## pipcook

官网：https://alibaba.github.io/pipcook/#/zh-cn/
Github 地址：https://github.com/alibaba/pipcook

Pipcook 项目是一个开源工具集，它能让 Web 开发者更好地使用机器学习，从而开启和加速前端智能化时代！

## React95

官网：react95.io/
Github 地址：https://github.com/arturbien/React95

Refreshed Windows95 UI components for your modern React apps.
Built with styled-components 💅

<div align='center'><img src='/images/hexo_post_717.png' alt='' /></div>

## asciinema

官网：https://asciinema.org/

Record and share your terminal sessions, the right way.Terminal 录屏工具，支持 Mac、Linux


## PhotoSwipe

官网：photoswipe.com
Github 地址：https://github.com/dimsemenov/PhotoSwipe

JavaScript image gallery for mobile and desktop.
连微博都在用的图片预览库

## TypeIt

官网：https://typeitjs.com/
Github 地址：https://github.com/alexmacarthur/typeit

The Most Versatile JavaScript Animated Typing Utility on the Planet.

## depcheck

Github 地址：https://github.com/depcheck/depcheck

Depcheck is a tool for analyzing the dependencies in a project to see: how each dependency is used, which dependencies are useless, and which dependencies are missing from package.json.

## pngquant

官网：https://pngquant.org/
Github 地址：https://github.com/kornelski/pngquant

pngquant is a command-line utility and a library for lossy compression of PNG images.

The conversion reduces file sizes significantly (often as much as 70%) and preserves full alpha transparency. Generated images are compatible with all web browsers and operating systems.

## xss

官网：https://jsxss.com/zh/index.html
Github 地址：https://github.com/leizongmin/js-xss

xss是一个用于对用户输入的内容进行过滤，以避免遭受 XSS 攻击的模块。主要用于论坛、博客、网上商店等等一些可允许用户录入页面排版、格式控制相关的 HTML 的场景，xss模块通过白名单来控制允许的标签及相关的标签属性，另外还提供了一系列的接口以便用户扩展，比其他同类模块更为灵活。

## react-toggle

官网：http://aaronshaf.github.io/react-toggle/
Github 地址：https://github.com/aaronshaf/react-toggle/

An elegant, accessible toggle component for React. Also a glorified checkbox.

## followcursor

Github 地址：https://gitlab.com/bersLucas/FollowCursor/

Rotate elements to create a following effect. 经常见到的那种图片跟着鼠标进行旋转的动画效果

## Magnifier.js

Github 地址：https://github.com/mark-rolich/Magnifier.js

Javascript library enabling magnifying glass effect on an images.图片放大库

## iTyped

官网：ityped.surge.sh/
Github 地址：https://github.com/luisvinicius167/ityped

Dead simple Animated typing, with no dependencies.非常简单的打字动画实现库

## Benchmark.js

官网：https://benchmarkjs.com/
Github 地址：https://github.com/bestiejs/benchmark.js

A [robust](https://mathiasbynens.be/notes/javascript-benchmarking) benchmarking library that supports high-resolution timers & returns statistically significant results. As seen on [jsPerf](https://jsperf.com/).

## Eruda

官网：https://eruda.liriliri.io/
Github 地址：https://github.com/liriliri/eruda

Eruda 是一个专为手机网页前端设计的调试面板，类似 DevTools 的迷你版，其主要功能包括：捕获 console 日志、检查元素状态、捕获XHR请求、显示本地存储和 Cookie 信息等等。

## ScrollMagic

官网：http://scrollmagic.io/
Github 地址：https://github.com/janpaepke/ScrollMagic

ScrollMagic helps you to easily react to the user's current scroll position.

## Verdaccio

官网：https://www.verdaccio.org/
Github 地址：https://github.com/verdaccio/verdaccio

私有 NPM 部署；Verdaccio is a simple, zero-config-required local private npm registry.

## iconify

官网：https://iconify.design/
Github 地址：https://github.com/iconify

Iconify is a unified open source icon framework that makes it possible to use many icons from different icon sets on same page or in same application using one syntax.


## ni

Github 地址：https://github.com/antfu/ni

现在有三种 nodejs 包管理方式：npm、yarn、pnpm，而这个库就是兼容这三种方式，统一了执行脚本

~~*`npm i` in a yarn project, again? F\*\*k!*~~


## Odiff

Github 地址：https://github.com/dmtrKovalenko/odiff

图片对比工具 ODiff is a blazing fast native image comparison tool. It was originally designed to handle the "big" images.

## Viewer.js

官网：https://fengyuanchen.github.io/viewerjs/
Github 地址：https://github.com/fengyuanchen/viewerjs

JavaScript image viewer.图片预览库

## docsify

Github 地址：https://github.com/docsifyjs/docsify/

A magical documentation site generator.文档站点生成工具


## pdf-rs

Github 地址：https://github.com/pdf-rs/pdf/

Rust library to read, manipulate and write PDF files.


## react-lines-ellipsis

官网：https://xiaody.github.io/react-lines-ellipsis/
Github 地址：https://github.com/xiaody/react-lines-ellipsis

Poor man's multiline ellipsis component for React.JS；React 中的多行文本省略解决方案

## isomorphic-git

官网：https://isomorphic-git.org/
Github 地址：https://github.com/isomorphic-git/isomorphic-git

isomorphic-git is a pure JavaScript reimplementation of git that works in both Node.js and browser JavaScript environments. It can read and write to git repositories, fetch from and push to git remotes (such as GitHub), all without any native C++ module dependencies.

## Tesseract.js

官网：http://tesseract.projectnaptha.com/
Github 地址：https://github.com/naptha/tesseract.js

Tesseract.js is a javascript library that gets words in almost any language out of images.

## web-extension-starter

Github 地址：https://github.com/abhijithvijayan/web-extension-starter

Web Extension starter to build "Write Once Run on Any Browser" extension：

* Cross Browser Support (Web-Extensions API)
* Browser Tailored Manifest generation
* Automatic build on code changes
* Auto packs browser specific build files
* SASS styling
* TypeScript by default
* ES6 modules support
* React UI Library by default
* Smart reload

## roughViz.js

Github 地址：https://github.com/jwilber/roughViz

roughViz.js is a reusable JavaScript library for creating sketchy/hand-drawn styled charts in the browser, based on D3v5, roughjs, and handy.绘制手写体风格的图表

## chart.xkcd

官网：https://timqian.com/chart.xkcd/
Github 地址：https://github.com/timqian/chart.xkcd

Chart.xkcd is a chart library plots “sketchy”, “cartoony” or “hand-drawn” styled charts.另一款绘制手写体风格的图表

## nodeppt

> 累死累活干不过做 PPT 的！

官网：https://nodeppt.js.org/
Github 地址：https://github.com/ksky521/nodeppt

基于webslides、webpack、markdown-it、posthtml 重构，This is probably the best web presentation tool so far!

## nb

官网：https://xwmx.github.io/nb/
Github 地址：https://github.com/xwmx/nb

nb is a command line and local web note‑taking, bookmarking, archiving, and knowledge base application.

## Diagram Maker

官网：https://awslabs.github.io/diagram-maker/
Github 地址：https://github.com/awslabs/diagram-maker

Diagram Maker is a library to display an interactive editor for any graph-like data.

Diagram Maker is a framework & data format agnostic library that is fully customizable in terms of look & feel as well as behavior. It also exposes a declarative interface to reduce the code required to integrate the library in any application and comes with many interactive features built in.

## Optimizt

Github 地址：https://github.com/funbox/optimizt

Optimizt is a CLI tool that helps you prepare images during frontend development.
It can compress PNG, JPEG, GIF and SVG lossy and lossless and create AVIF and WebP versions for raster images.

## React Flow

官网：https://reactflow.dev/
Github 地址：https://github.com/wbkd/react-flow

一个用于构建基于节点的图形的库。可以轻松地实现自定义节点类型，并且它附带了诸如迷你地图和图形控件之类的组件。

## Slidev

官网：https://sli.dev/
Github 地址：https://github.com/slidevjs/slidev

为开发者打造的演示文稿工具，基于 Markdown

## opentype.js

官网：https://opentype.js.org/
Github 地址：https://github.com/opentypejs/opentype.js

用于 TrueType 和 opentype 类型字体的 JavaScript 解析器和编写器，具体可查看官网中的 demo。



## PeerJS

官网：https://peerjs.com/
Github 地址：https://github.com/peers/peerjs

WebRTC 届的 jQuery

## Docusaurus

官网：https://docusaurus.io/
Github 地址：https://github.com/facebook/docusaurus

文档站生成工具，可以将 doc 转换成在线网页

## Image Tilt Effect

官网：https://tympanus.net/Development/ImageTiltEffect/
Github 地址：https://github.com/codrops/ImageTiltEffect/

可以实现图片随鼠标位置进行倾斜的效果，从而让图片产生运动和视差效果


## imagehover.css

官网：http://www.imagehover.io/
Github 地址：https://github.com/ciar4n/imagehover.css

效果丰富的图片悬停特效库，使用起来很简单：

```html
<figure class="imghvr-fade">
  <img src="#">
  <figcaption>
    // Hover Content
  </figcaption>
</figure>
```

## visx

<p align="center">
  <img src="https://github.com/airbnb/visx/raw/master/assets/visx-geometry.png" alt="visx">
</p>

Github 地址：https://github.com/airbnb/visx

可重用的 low-level 可视化图表组件的集合。visx 将 d3 的强大功能与 react 更新 DOM 的优势结合了起来，可以最大化渲染性能，同时也支持基本上所有类型的图表

## Mitt

<p align="center">
  <img src="https://i.imgur.com/BqsX9NT.png" width="300" height="300" alt="mitt">
</p>

Github 地址：https://github.com/developit/mitt

只有 200b 的 JS event emitter / pubsub

## fzf

<p align="center">
  <img src="https://raw.githubusercontent.com/junegunn/i/master/fzf.png" height="170" alt="fzf - a command-line fuzzy finder">
</p>

Github 地址：https://github.com/junegunn/fzf

是一个通用的命令行模糊查找器，可视化做的比较好，非常方便实用：

<p align="center">
<img src="https://raw.githubusercontent.com/junegunn/i/master/fzf-preview.png" width=640>
</p>

## Dark Reader

Github 地址：https://github.com/darkreader/darkreader

让网页变成“暗黑模式”，有 [Edge 插件](https://microsoftedge.microsoft.com/addons/detail/dark-reader/ifoakfbpdcdoeenechcleahebpibofpc)、[Chrome 插件](https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh)和 [Firefox 插件](https://addons.mozilla.org/en-US/firefox/addon/darkreader/)，同时也可以`npm install`后在自己的网页上使用：

![Dark Reader screenshot](https://i.imgur.com/DyBlYwU.png)


## postcss-pxtorem

一个用于 postcs 的插件，可以自动将 CSS 中的 px 这种单位转换成 rem，很适合移动端使用

## emotion

<p align="center">
  <img src="https://cdn.rawgit.com/tkh44/emotion/master/emotion.png" alt="emotion" height="150" width="150">
</p>

Github 地址：https://github.com/emotion-js/emotion
官网：https://emotion.sh/

高效且灵活的 CSS-in-JS 库：

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'

let SomeComponent = props => {
  return (
    <div
      css={{
        color: 'hotpink'
      }}
      {...props}
    />
  )
}
```

## Parallax.js

Github 地址：https://github.com/pixelcog/parallax.js/
官网：http://pixelcog.github.io/parallax.js/

简单的视差滚动 JQuery 插件

## FR 可视化 schema 编辑器

Github 地址：https://github.com/form-render/schema-generator

经常做中后台的前端同学对于表单可以说是“苦不堪言”，而可视化表单生成是一个比较好的解决方案，可以将研发从写表单的重复劳动中解放出来，该库的 demo 演示：https://x-render.gitee.io/schema-generator/playground

## Driver.js

<p align="center">
  <img src="https://github.com/kamranahmedse/driver.js/blob/master/demo/images/driver.png?raw=true" />
</p>

Github 地址：https://github.com/kamranahmedse/driver.js

功能强大、高度可定制的元素高亮库，在做新人引导以及元素高亮时可以考虑试用一下，[在线查看 demo](https://kamranahmed.info/driver.js/)


## typestyle

Github 地址：https://github.com/typestyle/typestyle

使用它之后，用 TypeStyle 编写 CSS 就像用 TypeScript 编写 JavaScript 一样流畅。

![](https://raw.githubusercontent.com/typestyle/typestyle.github.io/source/public/images/autocomplete.gif)

## lrz

> 目前已不再维护

Github 地址：https://github.com/think2011/localResizeIMG

前端对图片进行压缩，可以[点击这里直接进入演示页面](https://think2011.net/localResizeIMG/test/)


## npkill

<p align="center">
  <img src="https://npkill.js.org/img/npkill-text-clean.svg" width="320" alt="npkill logo" />
  <img src="https://npkill.js.org/img/npkill-scope-mono.svg" width="50" alt="npkill logo scope" />
</p>

Github 地址：https://github.com/voidcosmos/npkill

可以轻松查找和删除旧的和比较大的的`node_modules`文件夹

<p align="center">
  <img src="https://npkill.js.org/img/npkill-demo-0.3.0.gif" alt="npkill demo gif" />
</p>


## RobotJS

<p align="center"><img src="https://cldup.com/1ATDf2JMtv.png"></p>

Github 地址：https://github.com/octalmage/robotjs

基于 NodeJS 的桌面自动化控制库，封装了一些实用的鼠标、键盘、桌面等 API，支持 Mac、Windows 和 Linux。

## React Hook Form

Github 地址：https://github.com/react-hook-form/react-hook-form

高性能、灵活、易拓展、易于使用的表单校验库


## Resemble.js

<h1 align="center"><img src="https://raw.github.com/rsmbl/Resemble.js/master/demoassets/resemble.png" alt="Resemble.js" width="256"/></h1>

Github 地址：https://github.com/rsmbl/Resemble.js

通过 HTML5 和 Javascript 对图像进行分析，还可以进行两张图像的对比，demo 见：http://rsmbl.github.io/Resemble.js/

## node-opencv-compare-images

Gitee 地址：https://gitee.com/txdd/opencv-compare-image

使用opencv比较两个图片的相似度，比 Resemble.js 要专业一些，但是已经好久没更新了

## caniuse-cmd

Github 地址：https://github.com/sgentle/caniuse-cmd

兼容性测试工具，使用也很简单，比如：

```
caniuse websockets
```

## fingerprintjs2

Github 地址：https://github.com/fingerprintjs/fingerprintjs2

现代而灵活的浏览器指纹库，使用很简单，还有另外一个差不多的库：[clientjs](https://github.com/jackspirou/clientjs)，关于浏览器指纹，可以看这篇文章：[浏览器指纹：原来我们一直被互联网巨头监视，隐私在网上裸奔、无处可藏](https://github.com/biaochenxuying/blog/issues/60)

## wallace-cli

Github 地址：https://github.com/bartveneman/wallace-cli

通过命令行分析 CSS 的工具，配合某些其他提取 CSS 文件等工具可以用于网站分析和优化


## chromatic

官网：https://www.chromatic.com/

是一个可以快速发布 UI 组件库的 Storybook 的工具，可以关联 Github 仓库，操作非常简单


## NodeGui

官网：https://docs.nodegui.org/#quick-start

使用 Javascript 和 CSS 构建性能良好的跨平台桌面应用程序，对标的是 electron


## FunDebug

官网：https://www.fundebug.com/

Fundebug提供全栈错误监控服务，通过邮件、钉钉、倍洽、Slack等第三方工具实时报警，提供全面的报错信息帮助您快速分析问题，改进产品。目前支持网站、JS、微信小程序、微信小游戏、Java、Node.js等的错误监控，通过记录程序异常的堆栈、网络请求错误、资源加载错误、并且记录用户行为利用独创的可视化重现技术来帮助您改进产品，提升用户体验。

分为免费版、付费版、本地版三种，价格不低，但是一些付费客户中不乏一些知名大厂


## docz

Github 地址：https://github.com/doczjs/docz/
官网：https://www.docz.site/

非常好用的文档生成工具，使用特定语法可以生成相应文档站，比较适合类似于 antd 官网组件示例文档那样的场景


## unlayer

Github 地址：https://github.com/unlayer
官方文档地址：https://docs.unlayer.com/docs

是一个可以生成电子邮件编辑器和登录页的生成器，支持了各种个性化配置

## mjml

Github 地址：https://github.com/mjmlio/mjml

定义了一种 MJML 语法，将 MJML 转换为 响应式的 HTML，可用来编写个性化邮件


## pinyin

Github 地址：https://github.com/hotoo/pinyin

转换中文字符为拼音。可以用于汉字注音、排序、检索。同时还有 Python 版和 NodeJS 版。


## yddict

Github 地址：https://github.com/kenshinji/yddict

有道词典命令行查询工具，相比应用程序和网页都要方便许多，非常适合程序员日常使用


## whistle

官方文档：http://wproxy.org/whistle/

whistle是基于Node实现的跨平台web调试代理工具，类似的工具有Windows平台上的Fiddler，主要用于查看、修改HTTP、HTTPS、Websocket的请求/响应，也可以作为HTTP代理服务器使用，不同于Fiddler通过断点修改请求响应的方式，whistle采用的是类似配置系统hosts的方式，一切操作都可以通过配置实现，支持域名、路径、正则表达式、通配符、通配路径等多种匹配方式，且可以通过Node模块扩展功能。
如果想快速上手使用常用的功能，可参考：https://juejin.im/post/5df1baae6fb9a016470c1f98。

## is-progressive-cli

NPM 地址:https://www.npmjs.com/package/is-progressive-cli

用来检查 JPEG 图像是否是渐进式的。


## pangu

Github地址：https://github.com/vinta/pangu.js

用来在所有的中文字和半形的英文、数字、符号之间插入空白。不仅有支持 Chrome 和 Firefox 浏览器的插件版本，还有以下几种语言的库：

* Go
* Java
* Javascript
* Python

## svrx

官网：https://svrx.io/
Github地址：https://github.com/svrxjs/svrx

> 一个渐进且易于使用的、插件化的前端开发平台

可以这样快速试用：

```bash
npm install -g @svrx/cli
mkdir example && cd example
echo '<html><body>Hello svrx!</body></html>' > index.html
svrx
```

网易云音乐前端技术团队出品，其定位是：

* svrx 是面向前端开发者的一个强大的本地 dev server，它由本地服务、proxy、livereload 等功能插件组成
* svrx 有着丰富强大的插件系统，你可以自由使用或者定制想要的功能

更多关于其特性和使用介绍可参考：[Server-X：一款可能提升你十倍工作效率的工具](https://zhuanlan.zhihu.com/p/87684011)

## ytdl-core

NPM地址：https://npmjs.com/package/ytdl-core

Youtube 下载模块，和其他模块相比，该模块的特点在于纯用 JS 编写，同时使用了 NodeJS 友好的 stream API

## prismjs

官网地址：https://prismjs.com/index.html

一个漂亮而且小巧的代码语法高亮插件，很多大网站都在用，有如下优点：

1. 极致易用：引用 prism.css 和 prism.js，使用合适的 HTML5 标签（code.language-xxxx），搞定！
2. 天生伶俐：语言的 CSS 类是可继承的，所以你只需定义一次就能应用到多个代码片段。
3. 轻如鸿毛：代码压缩后只有 1.6KB。每添加一个语言平均增加 0.3-0.5KB，主题在 1KB 左右。
4. 快如闪电：如果可能，支持通过 Web Workers 实现并行。
5. 轻松扩展：定义新语言或扩展现有语法，或者新增功能都非常简单。
6. 丰富样式：所有的样式通过 CSS 完成，并使用合理的类名如：.comment, .string, .property 等。

## acorn

Github 地址：https://github.com/acornjs/acorn

一个非常轻量的JS代码解析器，可用于语法检测，AST检测等领域


## Cloc

Github 地址：https://github.com/AlDanial/cloc

> Cloc是一款使用Perl语言开发的开源代码统计工具，支持多平台使用、多语言识别，能够计算指定目标文件或文件夹中的文件数(files)、空白行数(blank)、注释行数(comment)和代码行数(code)。

虽然这是一个命令行工具，但是其作用非常强大，具体使用参考：[代码统计利器 Cloc](https://www.hi-linux.com/posts/4004.html)，如果是前端工程，可以如此使用：

```bash
cloc --exclude-dir=node_modules .
```

## http-server

NPM 地址：https://www.npmjs.com/package/http-server
Github地址：https://github.com/indexzero/http-server

只需要一行命令就可以起一个 HTTP Server

## live-server

NPM 地址：https://www.npmjs.com/package/live-server
Github 地址：https://github.com/tapio/live-server

也是起一个 HTTP Server，只不过带 live reload 的功能

## glyphhanger

NPM 地址：https://www.npmjs.com/package/glyphhanger
Github 地址：https://github.com/filamentgroup/glyphhanger

一个 `.ttf` 转 WOFF/WOFF2 等 Web 字体格式的命令行工具，可以：

* 抓取远程或本地文件并分析其中包含的文字
* 将分析结果去重排序并转换为 Unicode 码点
* 根据指定的源字体生成对应格式的子集（需要安装另一个工具，稍后介绍）
* 同时也生成包含 `@font-face` 规则的 CSS 文件

具体用法参见：[前端字体截取](https://juejin.im/post/5c1783216fb9a049b07d4330)

## google-translate-api

Github地址：https://github.com/matheuss/google-translate-api

免费且无限制的谷歌翻译 API 库

## changelog

NPM 地址：https://www.npmjs.com/package/changelog
Github 地址：https://github.com/dylang/changelog

根据 commit 信息生成 changelog 文件，其实具有类似功能的还有

* [standard-version](https://github.com/conventional-changelog/standard-version)
* [@semantic-release/changelog](https://github.com/semantic-release/changelog)

## svg-term-cli

NPM 地址：https://www.npmjs.com/package/svg-term-cli
Github 地址：https://github.com/marionebl/svg-term-cli

可以将 terminal 中的操作和输出生成对应的 svg，类似下面这张图片所展示的：

<div align='center'><img src='//camo.githubusercontent.com/bc42bdae37fb7d47b934f8027c121e3bc3fb3ed3/68747470733a2f2f63646e2e7261776769742e636f6d2f6d6172696f6e65626c2f7376672d7465726d2d636c692f31323530663963312f6578616d706c65732f706172726f742e737667' alt='' width='500'/></div>

## rimraf

Github 地址：https://github.com/isaacs/rimraf

`rm -rf` 命令 for nodejs

## roa

Github 地址：https://github.com/sindresorhus/ora

定制化 terminal 中展示的 loading 动画：

<div align='center'><img src='//github.com/sindresorhus/ora/raw/master/screenshot.svg?sanitize=true' alt='' width='400'/></div>

## gwm

NPM 地址：https://www.npmjs.com/package/gwm
Github 地址：https://github.com/loadchange/gwm

试用过好几款添加水印的库，只有这一款我能用，demo：http://yanfu.vip/gwm/

## youtube-dl

NPM 地址：https://www.npmjs.com/package/youtube-dl
Github 地址：https://github.com/przemyslawpluta/node-youtube-dl

可以下载 youtube 视频，同时下载完成之后会展示该视频的相关信息

## husky

Github 地址：https://github.com/typicode/husky

可以很方便的添加 git hook，目前已被各大开源库使用，实用性可见一斑

## cz-cli

Github 地址：https://github.com/commitizen/cz-cli

不知道 commit message 怎么写？cz-cli 以可视化的方式帮助你提交合适的语义化的 message

## Lighthouse

Github 地址：https://github.com/GoogleChrome/lighthouse

Lighthouse 是一个 Google Chrome 开源的自动化工具，用于改进网络应用的质量。可以将其作为一个 Chrome 扩展程序运行，或从命令行运行。当为 Lighthouse 提供一个要审查的网址，它将针对此页面运行一连串的测试，然后生成一个有关页面性能的报告。可以参考失败的测试，看看可以采取哪些措施来改进应用。

运行 Lighthouse 的方式有两种：作为 Chrome 扩展程序运行，或作为命令行工具运行：

```bash
npm install -g lighthouse
lighthouse https://merrier.wang
```

## speedracer

Github 地址：https://github.com/speedracer/speedracer

SpeedRacer 是一款性能测试工具，它在 Chrome 中运行脚本，并生成详细的性能报告。SpeedRacer 是直接借助浏览器来实际测试性能的工具，在实际工作中，可以与其它模拟用户访问流量来评估性能的工具配合使用。

## PapaParse

Github 地址：https://github.com/mholt/PapaParse
官网：https://www.papaparse.com/

PapaParse 是一款 CSV 解析工具，可优雅地处理大文件和格式错误的输入。

## dom-to-image

Github 地址：https://github.com/tsayen/dom-to-image

提供了诸多方法，可以将 DOM 节点直接转换成 JPEG、PNG、SVG、Blob 等格式，同时还可以从中进行个性化设置，功能强大，兼容性良好

## Caddy

Github 地址：https://github.com/mholt/caddy/

鼎鼎大名的 Caddy，是一个面向生产环境的开放源码 Web 服务器，它快速、易于使用。支持多个平台：Windows、Mac、Linux、BSD、Solaris 以及 Android。

## cheerio

Github 地址：https://github.com/cheeriojs/cheerio

Node 层的 jQuery，一般借助它实现各种爬虫，结合 superagent 可以非常方便的爬取网页信息

## Nodemailer

Github 地址：https://github.com/nodemailer/nodemailer

发送邮件的 Node 插件，兼容主流的 Email 厂商，只需要配置好邮箱账号和 SMTP 授权码，便可以用你的邮箱账号在 Node 脚本上发文件

## node-schedule

Github 地址：https://github.com/node-schedule/node-schedule

这是一个有着各种配置的定时任务发生器，可以定时每个月、每个礼拜、每天具体什么时候执行什么任务，具体应用：
* [用Node + EJS写一个爬虫脚本每天定时女朋友发一封暖心邮件](https://juejin.im/post/5c75fa4af265da2d84109219)
* [Electron + Puppeteer + Robotjs 实现工作自动化](https://mp.weixin.qq.com/s/mziw_VfwcO_qLglypbzy2A)

## stickybits

Github 地址：https://github.com/dollarshaveclub/stickybits

position:sticky 解决方案，代码精炼，纯 CSS

## fx

Github 地址：https://github.com/antonmedv/fx

可以对 terminal 中的 JSON 格式的数据进行非常友好的格式化展示：

![fx](https://camo.githubusercontent.com/b5df8c57792e443a18a56cd9a292b1a101ba2391/68747470733a2f2f6d6564762e696f2f6173736574732f66782e676966)