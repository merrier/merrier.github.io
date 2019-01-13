---
title: JS 中的浅拷贝和深拷贝
urlname: shallow-and-deep-copies-in-js
id: 1023
categories:
  - JS
tags:
  - JS
  - 数据结构
  - 计算机基础
date: 2017-07-30 18:17:35
img: /images/hexo_thumbnail_75.jpg
---

## 浅拷贝 VS 深拷贝

浅拷贝和深拷贝也成为**浅复制**和**深复制**，是在很多编程语言中经常用到的方法。另外，本文只会涉及到 js 中**复杂数据类型**的拷贝问题（Object, Array 等），不讨论基本数据类型（null, undefined, string, number 和 boolean），因为基本数据类型不存在引用值的情况。浅拷贝和深拷贝都可以实现在已有对象的基础上再生一份的作用，但是对象的实例是存储在堆内存中然后通过一个**引用值**去操作对象，由此拷贝的时候就存在两种情况了：**拷贝引用和拷贝实例**，这也是浅拷贝和深拷贝的区别所在：浅拷贝：只会将对象的各个属性进行依次复制，**并不会进行递归复制**，而JS中存储对象都是存地址的，所以浅拷贝会导致 obj.arr 和 shallowObj.arr 指向同一块内存地址 深拷贝：不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深复制的方法**递归复制**到新对象上。这就不会存在上面 obj 和 shallowObj 的 arr 属性指向同一个对象的问题。 

NOTE：如果对象比较大，层级也比较多，**深拷贝会带来性能上的问题**。在遇到需要采用深拷贝的场景时，可以考虑有没有其他替代的方案。在实际的应用场景中，也是浅拷贝更为常用。

## 浅拷贝的实现方式

从以上的对比可以总结出：浅拷贝就是简单的**引用复制**，有以下几种实现方式：

### jQuery.extend(false,...)

jQuery.extend 的第一个参数可以是布尔值，用来设置是否深度拷贝，设置为 false 或设置为空时就可以实现浅拷贝

### Object.assign()

ES6 中的 Object.assign(...) 方法可用来实现浅拷贝--它会遍历一个或多个源对象的所有可枚举的自有键并把它们复制到目标对象，最后返回目标对象。

NOTE：这里[有一篇stackoverflow的文章](https://stackoverflow.com/questions/38345937/object-assign-vs-extend)，是关于jQuery.extend()和Object.assign()区别的，当然你也可以直接点击[这里](https://jsfiddle.net/on9x55ow/2/)通过实例比较两者区别

### Underscore 的 _.clone()

在 Underscore 中有这样一个方法：`_.clone()`，这个方法实际上是一种浅拷贝，所有嵌套的对象和数组都是直接复制引用，但是它比直接赋值来得“深”一些，因为它创建了一个新的对象，可以看下面例子：

```javascript
var x = {
    a: 1,
    b: { z: 0 }
};
var y = _.clone(x);

y === x       // false
y.b === x.b   // true

x.b.z = 100;
y.b.z         // 100
```

### Array 的 slice 和 concat

Array 的 slice 和 concat 方法都会**返回一个新的数组实例**，但是这两个方法对于数组中的对象元素却没有执行深拷贝，而只是复制了引用。（和上面的 _.clone() 类似）

### for...in...

利用 for...in... 遍历对象就可以实现浅拷贝，代码如下：

```javascript
function shallowCopy(p,c){
    var i;
    c = c||{};
    for(i in p){
        if(p.hasOwnProperty(i)){
            c\[i\] = p\[i\];
        }
    }
    return c;
}
```

## 深拷贝的实现方式

浅拷贝的实现方式如上所述，浅拷贝适合用在开发 jQuery 插件或者 redux 中返回 new state，而我们有时需要的是深拷贝，就是**保证拷贝的对象与源对象完全隔离**：

### jQuery.extend(true,...)

将 jQuery.extend 的第一个参数设置为 true 即可实现深度拷贝。但是缺点是**无法深拷贝 JSON 对象以外的对象**

NOTE：jQuery 中有一个叫做 $.clone() 的方法，可是它并不是用于一般的 JS 对象的拷贝，而是用于 DOM 对象的克隆，所以不要被它的名字骗到~

### 借助 JSON 全局对象

相比于使用插件，使用 JSON 全局对象的 `parse` 和 `stringify` 方法来实现深复制也算是一个简单讨巧的方法：

```javascript
function jsonClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
var clone = jsonClone({ a:1 });
```

然而这种方法**有一些隐藏的坑**：

* 只能处理能够被json直接表示的数据结构：Number, String, Boolean, Array, 扁平对象；而对于正则表达式、Date 和 Function这种特殊的 Object 就无能为力了
* 如果对象中存在循环引用的情况，这个方法也无法正确处理

### lodash 的 _.clone() / _.cloneDeep()

在 lodash 中关于复制的方法有两个，分别是 `_.clone()` 和 `_.cloneDeep()`。其中 `_.clone(obj, true)` 等价于 `_.cloneDeep(obj)`。看了源码会发现，lodash 中与深拷贝相关的代码有上百行，而 jQuery 却只有 60 多行，这是为什么呢？原因是 lodash 花了大量的代码来实现 ES6 引入的大量新的标准对象。更厉害的是，lodash 针对**存在环的对象**的处理也是非常出色的。 所以，loadsh 在深拷贝上下了很多功夫，是一个很完美同时更拥抱未来的一个第三方库

## 各个深拷贝方法的比较

[stackoverflow 上有一个提问](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/5344074#5344074)，讨论了 JS 中各个深拷贝方法的效率问题，然后有位大牛借助 jsben 对各个深拷贝方法进行了[实例测试](http://jsben.ch/bWfk9)，强烈推荐大家看一下这个提问下的讨论以及实例测试的结果，相信看完后你对 JS 中的深拷贝会有更深刻的理解~

## 参考文章

* [也来谈一谈js的浅复制和深复制](http://www.cnblogs.com/tracylin/p/5346314.html)
* [javascript中的深拷贝和浅拷贝？](https://www.zhihu.com/question/23031215)
* [深入剖析 JavaScript 的深复制](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)