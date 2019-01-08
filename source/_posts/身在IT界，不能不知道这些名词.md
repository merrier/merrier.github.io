---
title: 身在IT界，不能不知道这些名词
urlname: it-nouns
tags:
  - IT
  - 生活
url: 1148.html
id: 1148
categories:
  - 总结
  - 杂谈
date: 2017-08-20 20:44:49
---

RT，作为码农/程序猿/攻城狮，有些名词不知道可就说不过去了

> geek

这是美国“俚语”，音译为“极客”。很多人都想成为“极客”，也有很多人自诩“极客”；然而究竟什么样的人算是“极客”呢？根据我的理解，我认为那种对自己要求极致并且不食人间烟火的技术达人，比如“楼教主”这种编程奇才。。

> polyfill

Polyfill或者Polyfiller，是英国Web开发者 Remy Sharp **在咖啡店蹲坑的时候拍脑袋造出来的**。当时他想用一个词来形容"用JavaScript（或者Flash之类的什么鬼）来实现一些浏览器不支持的原生API"。苦思冥想一直想不到合适的单词，于是他一怒之下造了一个单词Polyfill。除了他自己用这个词以外，他还给其他开发者用。随着他在各种Web会议演讲和他写的书《Introducing HTML5》中频繁提到这个词，大家用了都觉得很好，就一起来用。 Polyfill的准确意思为：**用于实现浏览器并不支持的原生API的代码**。一个Polyfill是抹平新老浏览器标准原生API之间的差距的一种封装，而不是实现自己的API。这里有一堆`Polyfills`，有兴趣可以把玩一下：[HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)

> hack

hack一般用来形容某些“黑科技”，是指为了满足程序的某些需求而搞的一些代码，比如css中的一些hack：

<!--\[if IE\]>
这段文字只在IE浏览器显示
<!\[endif\]-->

> bug

懂的人自然懂，有一个段子分享一下：

*   我们是谁？程序员
*   我们是做什么的？消除bug
*   然后做什么？写bug

> ssr

对于前端这个行业来说，ssr不是你家的大天狗，也不是他家的妖刀姬，更不是别人家的姑获鸟，而是**服务端渲染（Server Side Render）**的意思，自从node.js问世以后，前端就出现了服务端渲染的方式，相比前端渲染，ssr究竟有哪些优点呢？其本身又存在哪些不足呢？推荐一篇文章：[精读前后端渲染之争](https://github.com/camsong/blog/issues/8)。