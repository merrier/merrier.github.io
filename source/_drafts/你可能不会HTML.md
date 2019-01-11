---
title: 你可能不会HTML
urlname: you-probably-dont-know-html
tags:
  - HTML
id: 1095
categories:
  - HTML
  - stackoverflow
date: 2017-08-04 16:22:08
---

写在前面
====

这是一篇总结类的文章，因为大部分人都觉得HTML代码是“史上最简单的语言”，但是其实有很多特性你并没有用过，或者说都没有听说过，所以这一篇文章可以让你领略到HTML的独特魅力。

autocomplete
============

这个属性是我在逛[stackoverflow](https://stackoverflow.com/questions/2530/how-do-you-disable-browser-autocomplete-on-web-form-field-input-tag)时看到的，这是HTML5中关于input的新特性，具体可见[w3c文档](http://www.w3school.com.cn/tags/att_input_autocomplete.asp)，从这个属性的英文名我们可以看出来这是一个“自动完成”相关的属性，那么什么是自动完成呢？我们来看一下w3c中的解释：

> 自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。

所以这个属性其实我们经常碰到，比如淘宝搜索的时候、填用户名的时候……而且autocomplete默认是开启的，但是我们可以通过autocomplete = 'off' 关闭自动完成功能，这一点有时候用于防止攻击，具体可见上面的stackoverflow链接

shadow dom
----------

https://aotu.io/notes/2016/06/24/Shadow-DOM/index.html

你听说过原生 HTML 组件吗？：https://juejin.im/post/5bc7ead7f265da0afc2c2c6b

Map标签
-----

http://www.w3school.com.cn/tags/tag_map.asp

FileReader API
==============

调出纯数字键盘
=======

https://www.zhihu.com/question/55881888

十行HTML实现增强现实
============

http://web.jobbole.com/91186/

x-webkit-speech 语音输入功能
======================

http://caibaojian.com/x-webkit-speech.html http://www.cnblogs.com/moqiutao/p/6366942.html https://www.cnblogs.com/qzsonline/archive/2012/02/10/2344832.html http://hongqiang.iteye.com/blog/1636577 https://blog.csdn.net/gladtomeetyou/article/details/7892066

危险的 target="_blank" 与 “opener”
==============================

https://juejin.im/post/5a9f8425f265da239a5f57f8

DOMNodeRemoved、DOMNodeRemovedFromDocument和DOMSubtreeModified事件
==============================================================

https://www.cnblogs.com/xiaohuochai/p/5873289.html，这三个事件可以用来防篡改，DEMO页面：https://loadchange.github.io/gwm/index.html

你（可能）不知道的web api
================

https://juejin.im/post/5c1606d9f265da613d7bf7a4

Page Lifecycle API 教程：http://www.ruanyifeng.com/blog/2018/11/page\_lifecycle\_api.html

\[转\]你不知道的<img>标签
=================

https://www.jianshu.com/p/9f47ae6b3b5b