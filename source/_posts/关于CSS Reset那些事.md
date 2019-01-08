---
title: 关于CSS Reset那些事
urlname: things-about-css-reset
tags:
  - CSS
  - 性能优化
id: 1025
categories:
  - CSS
  - 总结
date: 2017-07-30 20:47:49
---

CSS Reset
=========

css reset，顾名思义，就是**重置样式**。那么为什么我们需要重置样式呢，这一切还要“归功于”前端领域的特点，就是跨平台、跨客户端；众所周知，现在所使用的主流浏览器对于一些标签的默认属性并没有做到统一，所以我们有时候会发现，某个页面在chrome浏览器上样式表现很正常，但是到了firefox上面却有着其他的样式表现（就更不用提IE了），这就是经常提到的“**兼容性问题**”，而css reset就是解决默认样式不兼容问题的办法之一

CSS Reset发展历程
=============

### 第一份

查阅了一些资料，也看了一些大牛的博客，目前比较一致地认为最早的一份CSS reset来自[Tantek的undohtml.css](http://tantek.com/log/2004/undohtml.css)，时间应该是2004年，很简单的代码（注释都比代码多），Tantek根据自己的需要，对浏览器的默认样式进行了一些重置，同时从这一份CSS reset也可以窥探出“重置样式”需要考虑的标签有哪些。

### YUI团队

业界领袖YUI团队在Tantek的基础上将css reset变得更加充实，当然代码的核心部分仍然是对样式进行重置，可以直接[点击这里](http://yui.yahooapis.com/3.18.1/build/cssreset-context/cssreset-context-min.css)查看YUI团队2014年给出的css reset代码（随着Yahoo光荣不再，估计这份css reset的版本也会停留在3.18.1了吧），从代码中可以看出我们如果想引用这套css reset，还需要加一个yui3-cssreset类，或者修改其源码，将.yui3-cssreset全部删掉。 YUI不仅支持css reset，还配套了cssfonts.css和cssbase.css。`cssreset.css`只负责清除默认样式,而`cssfonts.css`和 `cssbase.css` 则负责将一些元素的默认样式再重设回来

### Eric Meyer

相比YUI团队的css reset方案，[Eric Meyer的方案](http://meyerweb.com/eric/tools/css/reset/index.html)就显得有些繁重了，而且这套代码最新版本是2011年公开的，考虑到年代久远，就不予评论了。

### html5reset

相比前面的这些方案，[这个团队](https://github.com/murtaugh/HTML5-Reset)给出的方案就更显臃肿了，而且也不太出名，当然了，css reset并不是用来全盘照搬的，找到自己需要的才是最聪明的办法

国产CSS reset
===========

以上都是国外的大牛或团队给出的css reset方案，那么作为互联网行业发展最突飞猛进的中国，就没有人或团队做过css reset方面的尝试吗？肯定有啊（要不然我这一部分怎么写？）：

### 阿里Kissy框架

阿里在2009年就已经给出了自己的css reset方案，这应该是国内的第一份css reset，是玉伯和另外一位前辈完成的，向他们致敬。但是由于距离现在已经有将近十年了，源码的链接已经失效，我将各种版本的css reset代码都上传到了我的github，可以[点击这里](http://merrier.github.io/CSS-Reset/kissy/reset.css)查看国内第一份css reset。

### 张鑫旭的方案

我不希望你看到这个标题的第一感觉是：[张鑫旭](http://www.zhangxinxu.com)是谁。因为如果你连张鑫旭都不认识，前端界真是白混了！作为一位资深css研究学者，张鑫旭对于css reset也有自己独到的理解，下面就是他给出的方案：

body{
    line-height:1.4;
    color:#333;
    font-family:arial;
    font-size: 12px;
}
input,textarea,select{
    font-size:100%;    
    font-family:inherit;
}
body,h1,h2,h3,h4,h5,h6,p,ul,ol,form{
    margin:0;
}
h4,h5,h6{
    font-size:1em;
}
ul,ol{
    padding-left:0; 
    list-style-type:none;
}
/\*image with no-border\*/
img{border:0;}

可以看到，非常的简短，当然了，对于这份方案，张鑫旭在[他的文章](http://www.zhangxinxu.com/wordpress/2010/07/%E6%88%91%E6%98%AF%E5%A6%82%E4%BD%95%E5%AF%B9%E7%BD%91%E7%AB%99css%E8%BF%9B%E8%A1%8C%E6%9E%B6%E6%9E%84%E7%9A%84/)中也进行了解释

替代品Normalize.css
================

历史的车轮滚滚向前，时过境迁，中国的前端职位越发的火热，开发者们也变得更为专业，`CSS Reset` 泛滥使用逐渐淡出的前端的视野，被取而代之就是[`Normalize.css`](https://github.com/necolas/normalize.css)，关于对`CSS Reset` 与 `Normalize.css`的区别？可以引用知乎上[张小核桃](http://www.zhihu.com/question/20094066)的一个回答：

> CSS Reset 是革命党，CSS Reset 里最激进那一派提倡不管你小子有用没用，通通给我脱了那身衣服，凭什么你 body 出生就穿一圈 margin，凭什么你姓 h 的比别人吃得胖，凭什么你 ul 戴一胳膊珠子。于是 *{margin:0;} 等等运动，把人家全拍扁了。看似是众生平等了，实则是浪费了资源又占不到便宜，有求于人家的时候还得贱贱地给加回去，实在需要人家的默认样式了怎么办？人家锅都扔炉子里烧了，自己看着办吧。

所以，normalize.css的产生是有一定历史原因的（css reset的滥用），normalize.css是[@necolas](https://twitter.com/necolas)和[@jon_neal](https://twitter.com/jon_neal) 两位大牛花了几百个小时来研究不同浏览器的默认样式的差异而得出的结晶，感谢前辈们的贡献。 关于normalize.css的更多内容，就不在本篇文章里过多赘述了，因为它不是主角啊！有兴趣的童鞋可以点击下面的链接查看：

*   [Github](https://github.com/necolas/normalize.css/)
*   [官方介绍](http://nicolasgallagher.com/about-normalize-css/)
*   [官方介绍（中文）](http://jerryzou.com/posts/aboutNormalizeCss/)

总结
==

最后引用张鑫旭文章中的一段话作为结束：

> 武侠的最高境界是什么？ – 无招胜有招 设计的最高境界是什么？ – 减少设计 所以，最少的CSS代码，最少的渲染，最少的重置就是最好的CSS样式代码，这反应了您的CSS层次。说句不好听的话，CSS reset是用来让那些CSS菜鸟，对CSS不太了解的人准备的。

##### 参考文章

[关于CSS Reset 那些事（一）之 历史演变与Normalize.css](https://segmentfault.com/a/1190000003021766) [我是如何对网站CSS进行架构的](http://www.zhangxinxu.com/wordpress/2010/07/%E6%88%91%E6%98%AF%E5%A6%82%E4%BD%95%E5%AF%B9%E7%BD%91%E7%AB%99css%E8%BF%9B%E8%A1%8C%E6%9E%B6%E6%9E%84%E7%9A%84/) [CSS reset的重新审视 – 避免样式重置](http://www.zhangxinxu.com/wordpress/2010/04/css-reset%E7%9A%84%E9%87%8D%E6%96%B0%E5%AE%A1%E8%A7%86-%E9%81%BF%E5%85%8D%E6%A0%B7%E5%BC%8F%E9%87%8D%E7%BD%AE/) [HTML5 css reset](http://www.zhangxinxu.com/wordpress/2010/08/html5-css-reset/) [CSS:认识 css reset](http://www.jianshu.com/p/69ba47248774)