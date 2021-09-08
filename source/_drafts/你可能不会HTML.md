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

## 写在前面

这是一篇总结类的文章，因为大部分人都觉得HTML代码是“史上最简单的语言”，但是其实有很多特性你并没有用过，或者说都没有听说过，所以这一篇文章可以让你领略到HTML的独特魅力。

### progress 标签

张鑫旭推荐的进度条实现姿势：https://c.runoob.com/codedemo/5637/

上文：https://juejin.cn/post/6976810016930005029


### 如何让谷歌不自动翻译英文

https://stackoverflow.com/questions/12238396/how-to-disable-google-translate-from-html-in-chrome


### 关于 input=number 的坑

https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/

### rel=noreferrer 的作用

https://www.chromium.org/developers/design-documents/process-models，

求教window.open打开一个新tab页，由于开发需求新的tab页要渲染一会儿，这期间父页面一直卡死动不了，一直到新的tab页渲染完之后才恢复，新页面不是应该有一个新的render进程吗？为什么会影响父页面进程卡死？有什么解决办法吗

加个 noreferer 可破


### rel=noopener 的作用

https://juejin.im/post/6844903485289267214

### 有哪些被低估未被广泛使用的有用的 HTML标签？

https://www.zhihu.com/question/396745068/answer/1262953923

https://www.w3cplus.com/html5/talk-about-HTML-you-don-not-know.html


### 在页面中展示webp图片

webp格式，在大小、展现上都更具优势，只是有小小的兼容性（ie11不兼容）问题。所以使用下文方案，来用于webp图片的展示。

```html
<picture>
    <source srcset="/media/examples/pic.webp">
    <img src="/media/examples/pic.jpg" />
</picture>
```

使用<picture>浏览器会加载第一个支持的图片，并使其呈现在<img>元素占据的空间中。该方案有如下好处：
- 在不支持<pictrue>的浏览器中，img标签将被直接展现
- 书写样式时，只需要针对img写样式。
- 无需考虑目标浏览器，react服务端渲染时，服务端渲染结果能与客户端首次hydrate时一致，避免屏幕闪烁及无效图片请求。


## 【译】10 个你不知道你需要的 HTML 元素

https://juejin.im/post/5cce2a4651882541992d447c

## html 实现手风琴菜单

details和summary标签是一种只用HTML做扩展/手风琴菜单的方法，details 包括了summary标签和手风琴打开时要展示的内容。点击summary会展开details标签并添加open属性，我们可以通过open属性轻松地为打开的details标签设置样式：

```css
details[open] {
   background-color: hotpink;
}
```


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

## 图片懒加载踩坑

https://juejin.im/post/5add55dd6fb9a07aad171f76，HTML5 有一个新的 IntersectionObserver API，它可以自动观察元素是否可见。

## 危险的 target="_blank" 与 “opener”

https://knownsec-fed.com/2018-03-01-wei-xian-de-targetblank-yu-opener/

## 添加智能 App 广告条

Smart App Banner：高速浏览器这个网站对应的 app，并在页面上显示下载banner，只需要：

```html
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
```