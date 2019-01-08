---
title: Zepto设计和源码分析
urlname: zepto-design-and-source-code-analysis
tags:
  - JS
  - 慕课网
id: 868
categories:
  - JS
  - 慕课网
date: 2017-05-22 09:50:23
---

写在前面
====

本文为慕课网同题目讲解视频总结，具体地址可以看文章最后链接

正文
==

1.拜读经典框架的源码、学习设计思想，就等于站在巨人的肩膀上 2.解读源码之后，真正留在自己脑子里面的，是这个框架的**设计思想** 3.Javascript三座大山

*   原型和原型链
*   上下文环境和作用域
*   单线程和异步

4.任何一个函数都有一个prototype属性，指向其原型，比如一个函数fn，那么fn.prototype是一个对象，同时满足fn.prototype.constructor === fn 5.所有通过函数new出来的东西，这个东西都有一个\_\_\_proto\_\_指向这个函数的prototype：

var arr = \[\];  //等价于 var arr = new Array()
arr.\_\_proto\_\_ === Array.prototype;  //true

当你想用一个对象（或者一个数组）的某个功能时：如果该对象本身具有这个功能，则直接使用；如果该对象本身没有这个功能，则去\_\_proto\_\_中找

原文地址
====

[zepto设计和源码分析](http://www.imooc.com/video/13219) [zepto对象思想与源码分析](http://www.kancloud.cn/wangfupeng/zepto-design-srouce/173681)