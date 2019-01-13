---
title: 理解JS中的内存分配
urlname: understanding-memory-allocation-in-js
id: 1071
categories:
  - JS
tags:
  - JS
  - 内存
  - 数据结构
date: 2017-08-03 10:06:42
img: /images/hexo_thumbnail_79.jpeg
---

## 原始值和引用值

在 ECMAScript 中，变量可以存放两种类型的值，即原始值和引用值；原始值：原始数据类型（简单类型）的值，即undefined、null、Number、String、Boolean 类型所表示的值；引用值：复合数据类型（对象类型）的值，即Object、Function、Array 以及自定义对象等

## 栈和堆

与原始值和引用值对应存在两种结构的内存，即栈和堆

### 栈和原始值

栈是一种后进先出的数据结构，在 JS 中可以通过 Array（数组）来模拟栈的行为 原始值是存储在栈中的简单数据，也就是说，它们的值直接存储在变量访问的位置

### 堆和引用值

堆是基于散列算法的数据结构，在 JS 中，引用值是存放在堆中的 引用值是存储在堆中的对象，也就是说，存储在变量处的值（即指向对象的变量，存储在栈中）是一个指针，指向存储在堆中的实际对象

### 举个栗子

通过上面的讲解，我们可以得到如下简单的结论：

* **简单类型都放在栈里**
* **对象类型都放在堆里，指向对象的指针放在栈里**

假如我们有如下几个变量：

```javascript
var a = 20;
var b = 'abc';
var c = true;
var d = { m: 20 }  //地址假设为0x0012ff7c
var e = { m: 20 }  //重新开辟一段内存空间假设为0x0012ff8f
console.log(e==d);  //false
```

它们在实际存储时的内存空间占用是这样的：

<div align='center'><img src='/images/hexo_post_113.jpeg' alt='' width='600' /></div>

看到这里，你可能会问：为什么引用值要放在堆中，而原始值要放在栈中，不都是在内存中吗，为什么不放在一起呢？接下来，让我们来探索问题的答案！ 首先，请允许我再举个栗子:）

```javascript
function Person(id, name, age){
    this.id = id;
    this.name = name;
    this.age = age;
}
var num = 10;
var bol = true;
var str = "abc";
var obj = new Object();
var arr = \['a','b','c'\];
var person = new Person(100,"笨蛋的座右铭",25);
```

然后，我们来看一下分析图：

<div align='center'><img src='/images/hexo_post_38.jpeg' alt='' width='400'/></div>

从上图我们可以看到，我们无法直接操纵堆中的数据，也就是说我们无法直接操纵对象，但我们可以通过栈中对对象的引用来操纵对象。

## 答案揭晓

现在让我们来回答为什么引用值要放在堆中，而原始值要放在栈中的问题： 记住一句话：

> 能量是守恒的，无非是时间换空间，空间换时间的问题

堆比栈大，栈比堆的运算速度快,对象是一个复杂的结构，并且可以自由扩展，如：数组可以无限扩充，对象可以自由添加属性。将他们放在堆中是为了不影响栈的效率。而是通过引用的方式查找到堆中的实际对象再进行操作。相对于简单数据类型而言，简单数据类型就比较稳定，并且它只占据很小的内存。不将简单数据类型放在堆是因为通过引用到堆中查找实际对象是要花费时间的，而这个综合成本远大于直接从栈中取得实际值的成本。所以简单数据类型的值直接存放在栈中。

## 参考文章

* [从\[\]==!\[\]为true来剖析JavaScript各种蛋疼的类型转换](https://segmentfault.com/a/1190000008432611)
* [理解js内存分配](http://blog.sina.com.cn/s/blog_8ecde0fe0102vy6e.html)