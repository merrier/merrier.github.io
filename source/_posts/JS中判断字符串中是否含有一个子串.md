---
title: JS中判断字符串中是否含有一个子串
urlname: judging-whether-a-string-contains-a-substring-in-js
tags:
  - JS
  - stackoverflow
id: 1035
categories:
  - JS
  - stackoverflow
date: 2017-08-01 15:33:27
---

写在前面
====

题目我就不过多解释了，这篇文章是对[stackoverflow上一个问题](https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript)的总结，如果英文不是特别差的话，推荐大家点击上面链接看大家对这个问题的详细讨论

实现方案
====

indexOf
-------

var string = "foo",
    substring = "oo";
string.indexOf(substring) !== -1;

String的原型方法，返回一个字符串在另一个字符串中的位置，如果没有找到的话就返回-1；也是大家经常用的方案

ES6的includes
------------

var string = "foo",
    substring = "oo";
string.includes(substring);

ES6中新增的String原型方法（其实Array原型也有includes方法），可以[点击这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)查看文档

search
------

var string = "foo",
    expr = /oo/;
string.search(expr);

String.prototype.search()执行正则表达式和String对象之间的一个搜索匹配，所以参数需要是正则表达式，[点击这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search)查看中文文档

lodash的includes
---------------

var string = "foo",
    substring = "oo";
_.includes(string, substring);

lodash是一个前端库，其提供了一些更加拥抱未来的方法，其中就有_.includes(str,substr)

RegExp和test
-----------

var string = "foo",
    expr = /oo/;  // no quotes here
expr.test(string);

“正则表达式是万能的”，RegExp.prototype.test(str)

match
-----

var string = "foo",
    expr = /oo/;
string.match(expr);

和上面的test正好相反，match方式是String的原型方法，String.prototype.match(expr)

性能比较
====

既然有这么多方法都可以实现，那么哪一种才是“性能最优”的方法呢？早就有前辈替我们做了测试，可以[点击这里](http://jsben.ch/#/RVYk7)查看测试结果，或者直接看下面这张图片： ![](/images/hexo_post_273.png) 不出所料，果然原生方法indexOf()是最快的，所以我们以后就还尽量用indexOf()吧！