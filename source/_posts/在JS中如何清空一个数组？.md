---
title: 在JS中如何清空一个数组？
urlname: how-to-clear-an-array-in-js
id: 1085
categories:
  - stackoverflow
tags:
  - JS
  - stackoverflow
  - 数组
date: 2017-08-04 15:30:29
img: /images/hexo_thumbnail_75.jpg
---

问题来源于stackoverflow：[How do I empty an array in JavaScript?](https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript)。更多关于JS中数组的相关操作参见：[JS中数组方法总结](/20170322/summary-of-array-method-in-js.html) 比如我有如下数组：`A = [1, 2, 3, 4]`; 我如何清空它？

## A = [];

这个答案应该很好想到，因为很符合“从问题本身出发”的逻辑，既然我们想清空数组 A，那就清空喽~ 但是这个方法有一个弊端：如果你之前通过引用的方式 copy 了数组A，那么即使通过 `A = []` 将数组 A 清空了，你的引用变量也还是 A 原来的值，理论知识总是难理解，举个栗子：

```javascript
var arr1 = ['a', 'b', 'c', 'd', 'e', 'f'];
var arr2 = arr1;  //arr2是arr1的一个引用
console.log(arr2 === arr1)  //arr2和arr1共享内存地址
arr1 = [];
console.log(arr2);  //['a', 'b', 'c', 'd', 'e', 'f']，此时arr2和arr1就互相不认识了
```

## A.length = 0

因为在 JS 中数组其实也是一个对象（所谓的“数组对象”），而每个数组都有一个 length 属性，这是一个可读写的属性，将其置为 0 之后就可以清空数组。同时它的引用变量也将被清空：

```javascript
var arr1 = ['a','b','c','d','e','f'];
var arr2 = arr1;  // 我胡汉三又来引用了
arr1.length = 0;
console.log(arr1);  //[]
console.log(arr2);  //[]
console.log(arr1 === arr2)  //true
```

## A.splice(0, A.length)

和上面的通过 length 清空类似，该方法也将同时清空数组 arr2。不同点在于，.splice() 方法将返回一个数组

## while 和 .pop()

这是一个比较“愚蠢”的方法：

```javascript
while(A.length > 0) {
    A.pop();
}
```

该方法同样会清空数组 arr2，但是也是效率最低的一种方法

## while和.shift()

一般“愚蠢”的方法不止一种。。：

```javascript
while(A.length > 0) {
    A.shift();
}
```

## 性能比较

可以[点击这里](http://jsben.ch/hyj65)查看这四种方法的性能测试结果，或者直接看下图：

<div align='center'><img src='/images/hexo_post_277.png' alt='' width='500' /></div>

从图中可以很明显的看出来，`A.length = 0;` 这种方法是效率最高的，效率最低的是 pop 和 shift（不出所料啊。。）