---
title: 好文章推荐系列——Javascript
urlname: javascript-good-articles
id: 689385287857593854
categories:
  - 推荐
tags:
  - Javascript
img: /images/hexo_thumbnail_148.jpg
date: 2017-08-07 16:28:03
---

### [What the f*ck JavaScript?](https://github.com/denysdovhan/wtfjs/blob/master/README-zh-cn.md)

> 一个有趣和棘手的 JavaScript 示例列表。

JavaScript 是一种很好的语言。它有一个简单的语法，庞大的生态系统，以及最重要，最伟大的社区。
同时，我们都知道，JavaScript 是一个非常有趣又充满戏法的语言。他们中的有些可以迅速将我们的日常工作变成地狱，有些可以让我们大声笑起来。

### [见微知著 - 1000字带你掌握nextTick背后的原理](https://mp.weixin.qq.com/s/VQsT7SWMZO5rXVtr8bjWvQ)

在开发过程中，我们经常遇到这样的问题：我明明已经更新了数据，为什么当我获取某个节点的数据时，却还是更新前的数据？在视图更新之后，怎么基于新的视图进行操作？

### [What Every JavaScript Developer Should Know About Floating Points](https://modernweb.com/what-every-javascript-developer-should-know-about-floating-points/)

JavaScript numbers are really floating points. Due to inadequecies when representing numbers in base-2, as well as a finite machine, we are left with a format that is filled with rounding errors. This article explains those rounding errors and why those errors occur. Always use a good library for numbers instead of building your own.

### [undefined vs. null revisited](https://2ality.com/2021/01/undefined-null-revisited.html)

关于 JS 中的 undefined 和 null 最详细的对比了

### [Writing a JavaScript Framework](https://blog.risingstack.com/writing-a-javascript-framework-project-structuring/)

In the last couple of months Bertalan Miklos, JavaScript engineer at RisingStack wrote a next generation client-side framework, called NX: https://nx-framework.com. In the Writing a JavaScript Framework series, Bertalan shares what he learned during the process.

### [how-javascript-works](https://github.com/Troland/how-javascript-works)

本文是翻译介绍 JavaScript 的工作原理的，该系列原文还在更新中，原文见 [这里](https://blog.sessionstack.com/tagged/tutorial)。

### [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)

Software engineering principles, from Robert C. Martin's book Clean Code, adapted for JavaScript. This is not a style guide. It's a guide to producing readable, reusable, and refactorable software in JavaScript.

### [The JavaScript Call Stack - What It Is and Why It's Necessary](https://www.freecodecamp.org/news/understanding-the-javascript-call-stack-861e41ae61d4/)

This article is aimed at explaining what the call stack is and why it is needed. An understanding of the call stack will give clarity to how “function hierarchy and execution order” works in the JavaScript engine.


## [JavaScript's Memory Management Explained](https://felixgerschau.com/javascript-memory-management/)

非常详尽的一篇文章，对 JS 中的内存管理作了解释和讲解

## [JavaScript 对象转换之 toString 和 valueOf](https://f-e-d.club/topic/conversion-of-tostring-and-the-valueof-javascript-object.article)

JS 中的对象转换一直是面试重点，同时在实际工作中也会遇到因为对象转换带来的各种“坑”，比如这个例子：

```js
parseInt(0.0000004)  // 4
![]==[] //true
['x','y'] == 'x,y' //true
alert({name:'mofei'})  //"[object Object]"
```

### [时区与JS中的Date对象](https://juejin.im/post/6844903885505576968)

非常详细的介绍了时区、时间标准等概念和规范，同时结合 JS 中的使用和常见问题可以更深刻地理解 Date 对象与时区。

### [深拷贝的终极探索](https://yanhaijing.com/javascript/2018/10/10/clone-deep/)

深拷贝和浅拷贝是面试高频题目，作者首先列举了一些深拷贝的实现方案，同时通过这些方案存在的问题引出他所理解的最终解决方案


### [WebAudio Deep Note, part 2: play a sound](https://www.phpied.com/webaudio-deep-note-part-2-play-a-sound/)

介绍了 iOS 上关于音频的一些知识

### [你不知道的 JSON.stringify() 的威力](https://github.com/NieZhuZhu/Blog/issues/1)

作者详细介绍了`JSON.stringify()`的九大特性，同时还介绍了`JSON.stringify()`中经常被人忽略的第二个和第三个参数，相信看完之后对`JSON.stringify()`会有更深入的理解。

### [忍者代码](https://zh.javascript.info/ninja-code#zong-jie)

过去的程序员忍者使用这些技巧，来使代码维护者的头脑更加敏锐。
代码审查大师在测试任务中寻找它们。
一些新入门的开发者有时候甚至比忍者程序员能够更好地使用它们。
仔细阅读本文，找出你是谁 —— 一个忍者、一个新手、或者一个代码审查者？

### [《编程时间简史系列》JavaScript 模块化的历史进程](https://segmentfault.com/a/1190000023017398)

模块化是前端绕不开的话题，而本篇文章不涉及任何前端代码，只谈历史故事，可以作为模块化开发的了解材料

### [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)

[《TypeScript Deep Dive》](https://github.com/basarat/typescript-book/) 的中文翻译版

### [【动画演示】：事件循环 形象深动(JavaScript)](https://juejin.im/post/5e0a8d57f265da33a55fb33c)

通过几张动图 + 讲解非常生动形象的讲解了 JS 中的事件循环这一重要概念。

### [一次弄懂Event Loop（彻底解决此类面试问题）](https://juejin.im/post/5c3d8956e51d4511dc72c200)

Event Loop 即事件循环，是指浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。本文内容较长，通过实例对事件循环概念和应用进行了讲解，图文并茂，看起来其实并不枯燥。

### [统一回复《怎么学JavaScript？》](http://www.qdfuns.com/notes/17398/d3f6dd40e2d3ff15b209810dfa98be0b:storey-71.html)

作者通过自己的经历告诉大家：如何学习前端。这是一篇很不错的前端入门文章，作者推荐了一些前端方面的书籍，同时还注明了这些书籍适合什么时候阅读以及适合怎样阅读，建议仍然不知道如何学前端的你好好看一下这篇文章

### [javascript 的 12 个怪癖（quirks）](http://justjavac.com/javascript/2013/04/08/12-javascript-quirks.html)

实际上 javascript 是一个相当简洁的语言，但是也难免会有一些怪癖（quirks）。这是作者翻译的国外一个开发者的系列文章，同时在我发布之前（2017-8-7），作者还没有翻译团队，如果有英语比较好的前端小伙伴，欢迎加入翻译的队伍中，像我这种英语“战五渣”表示只能“拿来”了。。

### [80% 应聘者都不及格的 JS 面试题](https://juejin.im/post/58cf180b0ce4630057d6727c)

从最简单的 setTimeout() 执行队列，到自执行函数产生闭包，再到 ES6 中的 promise 以及 ES7 中的 async 和 await，作者通过一道不断延伸出来的js面试题讲解了在面试中经常遇到的问题，同时对以上的这些知识点进行了概括总结

### [\[翻译\] We have a problem with promises](http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/?qq-pf-to=pcqq.c2c)

promise 一直是被认为判断一名“前端工程师”是否仍然处在“初级”的利器，而这篇文章通过 promise 相关的四段代码对 promise 进行了深入剖析，这是一篇译文，英文原文可以[点击这里](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)查看

### [学用 JavaScript 设计模式](http://wiki.jikexueyuan.com/project/javascript-design-patterns/constructor-mode.html)

设计模式的概念很早之前就有了，而 JS 虽然之前一直被认为是“做网页”的语言，但是JS中也有设计模式的思想，相信看完这个系列的文章之后，你会对 JS 有更加深入的理解，该系列文章对于没有“面向对象”语言基础的童鞋来说可能会有些难度，建议在看的过程中及时查阅其他资料。

### [ajax跨域，这应该是最全的解决方案了](https://segmentfault.com/a/1190000012469713)

看题目就很屌，恩。。

### [jQuery的document ready与 onload事件——你真的思考过吗？](https://www.cnblogs.com/lovesong/p/5641834.html)

虽然题目看似和 jQuery 关系很大，但其实作者探究了很多 JS 相关问题，包括加载顺序以及 load 事件的产生原因，内容短小精悍，值得一看。下面这些问题是作者在文中所阐述探索的：

1. window.onload 到底是什么加载完触发？
2. body 为什么会有 onload 事件？
3. 为什么是 window.onload，而不是 document.onload？
4. document ready到底是什么 ready，DOM 渲染完成？
5. jQuery 怎么实现 $(document).ready？
6. jQuery 的 ready，还能 ready 什么？
7. jQuery 的 document ready 就一定比 window.onload 快吗？
8. 为什么外部 script 文件放页面内容后面好，是一定的吗？

### [10 分钟了解 JS 堆、栈以及事件循环的概念](https://github.com/BooheeFE/weekly/issues/2)

作者通过 `JS的内存机制`以及`事件机制`和`大量的（例子）`来讲解栈、堆究竟是个什么玩意。概念比较多，不用死读，把所有的实例代码手敲一遍就很清楚了，作者讲的很透彻，该文章来自于[薄荷前端周刊](https://github.com/BooheeFE/weekly)，该周刊发布的文章都蛮不错的，建议阅读~

### [7 分钟理解 JS 的节流、防抖及使用场景](https://juejin.im/post/5b8de829f265da43623c4261?utm_medium=fe&utm_source=weixinqun)

防抖和节流是两个很重要也经常会用到的知识点，这篇文章的重点并不是介绍它们的实现原理，而是着眼于它们的应用效果和应用场景，文中对于防抖和节流产生效果的总结很通俗易懂：

> 函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会重新读条。
> 函数节流就是 fps 游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹。

### [精读 The Cost of JavaScript](https://zhuanlan.zhihu.com/p/41292532)

Addy 在 [The Cost of JavaScript In 2018](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)一文中分享了在保证用户友好交互体验的前提下如何高效分发 JavaScript 的开发经验，而我现在推荐的这篇文章是一篇导读文章，原文作者首先将全文的内容压缩成几条观点总结出来，之后从用户体验为 Web 带来的变化开始说起，到 JavaScript 的成本有哪些、它们为何如此高昂、如何降低开销以及持续集成，全文形成一个非常完整的优化流程：

1. 写在开头的话
2. 膨胀的 JavaScript 与 Web 现状
3. JavaScript 的成本所在
4. 页面交互性解释与建议
5. 处理 JavaScript 成本为何如此昂贵
6. 千差万别的移动用户与应对策略
7. 分发更少 JavaScript 的常见技巧
8. 持续集成四部曲

### [深入理解javascript原型和闭包系列](http://www.cnblogs.com/wangfupeng1988/p/4001284.html)

本系列有 16 篇文章，外加两篇后补的，一共 18 篇文章。将原型和闭包相关知识都进行了讲解，知识点很全，图文并茂。

### [JavaScript 模块化七日谈](https://github.com/Huxpro/js-module-7day)

作者以 slide 的形式讲解了 JS 模块化的发展历程，目录：

* 第一日 上古时期 _**Module?**_ 从设计模式说起
* 第二日 石器时代 _**Script Loader**_ 只有封装性可不够，我们还需要加载
* 第三日 蒸汽朋克 _**Module Loader**_ 模块化架构的工业革命
* 第四日 号角吹响 _**CommonJS**_ 征服世界的第一步是跳出浏览器
* 第五日 双塔奇兵 _**AMD/CMD**_ 浏览器环境模块化方案
* 第六日 精灵宝钻 _**Browserify/Webpack**_ 大势所趋，去掉这层包裹！
* 第七日 王者归来 _**ES6 Module**_ 最后的战役

### [写了 10 年 Javascript 未必全了解的连续赋值运算](https://yanhaijing.com/javascript/2012/04/05/javascript-continuous-assignment-operator/)

`a.x = a = {n:2}` 是一个连续赋值表达式。 这个连续赋值表达式在引擎内部究竟发生了什么？是如何解释的？作者从这一问题出发，对 JS 中的变量定义规则进行了研究。

### [每个 JavaScript 工程师都应懂的33个概念](https://github.com/stephentian/33-js-concepts)

这篇文章是参照 @leonardomso 创立，英文版项目地址在[这里](https://github.com/leonardomso/33-js-concepts)。 由于原版资源都要翻墙，所以作者创立了一个中文版，附上关于 JS 中的 33 个概念在国内的一些文章和视频。所以这可以看做是一个文章 / 视频集合，闲来无事的时候可以看一下巩固一下基础概念。

### [前端网老姚浅谈：怎么学 JavaScript？](https://zhuanlan.zhihu.com/p/23265155)

前端老姚对如何学习JS这一问题的解答，主要回答了以下几个问题：

* 看书有啥好处
* 看什么书
* 怎么看书
* 看书的层次
* 利用源码进行学习
* 时间、兴趣等问题

### [Effective JavaScript](https://github.com/dreamapplehappy/effective-javascript)

关于原生 JS 的 68 个实例，理论上,实践过下面的 68 个项目之后,你的JS能力应该有一个质的飞跃

### [how javascript works](https://github.com/Troland/how-javascript-works)

本文是翻译介绍 JavaScript 的工作原理的，该系列原文还在更新中，原文见[这里](https://blog.sessionstack.com/tagged/tutorial)。

### [JavaScript This 的六道坎](https://blog.crimx.com/2016/05/12/understanding-this/)

鉴于 this 风骚的运作方式，对 this 的理解是永不过时的话题，该文试图通过将其大卸六块来钉住这个磨人的妖精。通过六个成语对 this 进行了剖析讲解，非常清晰明了。

### [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html)

1. 展现形式：由于是属于系统梳理型，就没有由浅入深了，而是从头到尾的梳理知识体系，重点是将关键节点的知识点串联起来，而不是仅仅剖析某一部分知识。
2. 内容是：从浏览器进程，再到浏览器内核运行，再到 JS 引擎单线程，再到 JS 事件循环机制，从头到尾系统的梳理一遍，摆脱碎片化，形成一个知识体系
3. 目标是：看完这篇文章后，对浏览器多进程，JS 单线程，JS 事件循环机制这些都能有一定理解，有一个知识体系骨架，而不是似懂非懂的感觉。
4. 另外，本文适合有一定经验的前端人员，**新手请规避**，避免受到过多的概念冲击。可以先存起来，有了一定理解后再看，也可以分成多批次观看，避免过度疲劳。

**大纲**：

* 区分进程和线程
* 浏览器是多进程的
  * 浏览器都包含哪些进程？
  * 浏览器多进程的优势
  * 重点是浏览器内核（渲染进程）
  * Browser进程和浏览器内核（Renderer进程）的通信过程
* 梳理浏览器内核中线程之间的关系
  * GUI渲染线程与JS引擎线程互斥
  * JS阻塞页面加载
  * WebWorker，JS的多线程？
  * WebWorker与SharedWorker
* 简单梳理下浏览器渲染流程
  * load事件与DOMContentLoaded事件的先后
  * css加载是否会阻塞dom树渲染？
  * 普通图层和复合图层
* 从Event Loop谈JS的运行机制
  * 事件循环机制进一步补充
  * 单独说说定时器
  * setTimeout而不是setInterval
* 事件循环进阶：macrotask与microtask
* 写在最后的话

### [关于 Promise 的 9 个提示](https://mp.weixin.qq.com/s/1ILwZ6BecgBFA49c4YvTRQ)

通过 9 个鲜活的案例，我们可以加深对 Promise 的理解