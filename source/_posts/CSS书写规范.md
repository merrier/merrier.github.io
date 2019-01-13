---
title: CSS书写规范
urlname: css-writing-specification
id: 414
categories:
  - CSS
tags:
  - CSS
date: 2017-04-04 21:12:45
---

写在前面
====

本篇文章转载自cnblogs，我在看了原文章之后又搜了一些其他相关资料，就有了下面这些对于CSS书写规范的总结。CSS作为前端语言中最好学的一种，很容易造成“不需要规范”的错觉，但其实CSS的书写也有很多规范，顺序、命名以及缩写等等，知道并且遵循这些规范不仅可以更容易让别人读懂你的代码，还能方便自己。

CSS书写顺序
=======

1.  位置属性(position, top, right, z-index, display, float等)
2.  大小(width, height, padding, margin)
3.  文字系列(font, line-height, letter-spacing, color- text-align等)
4.  背景(background, border等)
5.  其他(animation, transition等)

![](/images/hexo_post_97.png)

CSS书写规范
=======

使用CSS缩写属性
---------

CSS有些属性是可以缩写的，比如padding,margin,font等等，这样精简代码同时又能提高用户的阅读体验。 ![](/images/hexo_post_87.png)

去掉小数点前的“0”
----------

![](/images/hexo_post_98.png)

简写命名
----

很多用户都喜欢简写类名，但前提是要让人看懂你的命名才能简写哦！ ![](/images/hexo_post_121.png)

16进制颜色代码缩写
----------

有些颜色代码是可以缩写的，我们就尽量缩写吧，提高用户体验为主。 ![](/images/hexo_post_94-300x150.png)

连字符CSS选择器命名规范
-------------

1.长名称或词组可以使用中横线来为选择器命名。 2.不建议使用“_”下划线来命名CSS选择器，为什么呢？

*   输入的时候少按一个shift键；
*   浏览器兼容问题 （比如使用_tips的选择器命名，在IE6是无效的）
*   能良好区分JavaScript变量命名（JS变量命名是用“_”）

这里有一篇破折号与下划线的详细讨论，英文：[点击查看](http://stackoverflow.com/questions/7560813/why-are-dashes-preferred-for-css-selectors-html-attributes) 中文篇：[点击查看](http://www.cnblogs.com/kaiye/archive/2011/06/13/3039046.html) [《CSS Secrets》](https://book.douban.com/subject/26295140/)的译者张鹏对于使用"_"还是"-"也阐述了自己的观点，比较了两者的优缺点，可以[点击这里](https://github.com/cssmagic/blog/issues/42)查看 ![](/images/underline-300x150.png)

不要随意使用Id
--------

id在JS是唯一的，不能多次使用，而使用class类选择器却可以重复使用，另外id的优先级优先与class，所以id应该按需使用，而不能滥用。 ![](/images/hexo_post_96.png)

为浏览器添加状态前缀
----------

有时候可以给选择器添加一个表示状态的前缀，让语义更明了，比如下图是添加了“.is-”前缀。 ![](/images/hexo_post_221-300x150.png)

CSS命名规则
=======

可以按照功能、位置、结构进行命名，因为命名的出发点就是为了让自己和其他人都能看懂，所以越明白越好：

*   一律小写;
*   尽量用英文;
*   不加中槓和下划线;
*   尽量不缩写，除非一看就明白的单词。

在译文[《CSS命名神马的真心难》](http://jiongks.name/blog/naming-css-stuff-is-really-hard/?utm_source=tuicool)中，作者指出可以根据三类情况给定一个class名：

*   功能性（positive-button、important-text、selected-tab）
*   内容性（submit-button、intro-text、profile-photo）
*   展示性（green-button、bit-text、sqiggle-border）

其实，在我看来，命名的首要目的就是“语义化”，而“语义化”有两个方面：方便自己和方便别人，所以不一定所有的语义化都需要按照内容进行命名，class名的语义化不同于HTML，可以按照其背后的意义和开发者的意图进行命名 **最常用主要命名**：wrap（外套、最外层）、header（页眉、头部）、nav(导航条)、menu(菜单)、title(栏目标题、一般配合h1\\h2\\h3\\h4标签使用)、content (内容区)、footer(页脚、底部)、logo（标志、可以配合h1标签使用）、banner（广告条，一般在顶部）、copyRight（版权）

CSS样式表文件命名
==========

*   主要的 master.css
*   模块 module.css
*   基本共用 base.css
*   布局、版面 layout.css
*   主题 themes.css
*   专栏 columns.css
*   文字 font.css
*   表单 forms.css
*   补丁 mend.css
*   打印 print.css

##### 参考链接

cnblogs：[http://www.cnblogs.com/AllenChou/p/5911834.html](http://www.cnblogs.com/AllenChou/p/5911834.html) CSS命名神马的真心难：[http://jiongks.name/blog/naming-css-stuff-is-really-hard/?utm_source=tuicool](http://jiongks.name/blog/naming-css-stuff-is-really-hard/?utm_source=tuicool) NEC：css命名方式：[http://nec.netease.com/standard/css-name.html](http://nec.netease.com/standard/css-name.html) BEM（一种css命名解决方案）：[http://getbem.com/](http://getbem.com/) BEM--源自Yandex的CSS命名方法论：[https://segmentfault.com/a/1190000000391762](https://segmentfault.com/a/1190000000391762) CSS设计模式：OOCSS 和 SMACSS：[http://blog.jobbole.com/76030/](http://blog.jobbole.com/76030/)