---
title: Promise入门
urlname: introduction-to-promise
tags:
  - ES6
  - JS
  - 慕课网
  - 笔记
id: 1643
categories:
  - JS
  - 慕课网
date: 2018-02-26 22:14:10
---

幕课网上的视频——[Promise入门](https://www.imooc.com/learn/949)笔记，Promise作为ES6中最重要的特性之一，对其进行了解和学习是非常有必要的，课程的源码已经上传至[我的github](https://github.com/merrier/imooc-promise-sample)。

Promise是什么
==========

MDN
---

> *   The Promise object is used for asynchronous computations.
> *   A Promise represents a value which may be available now, or in the future, or never.

MDN中文
-----

> *   Promise对象用于异步计算。
> *   一个Promise表示一个现在、将来或永不可能可用的值。

按照用途来解释
-------

*   主要用于异步计算
*   可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果。
*   可以在对象之间传递和操作Promise，帮助我们处理队列。

回调存在的问题
=======

1.  嵌套层次很深，难以维护
2.  无法正常使用return和throw
3.  无法正常检索堆栈信息
4.  多个回调之间难以建立联系

Promise详解
=========

*   Promise是一个代理对象，它和原先要进行的操作并无关系
*   它通过引入一个回调，避免更多的回调

Promise有3个状态
------------

1.  pending\[待定\]——初始状态
2.  fulfilled\[实现\]操作成功
3.  rejected\[被否决\]操作失败

当Promise的状态发生改变，就会触发.then()里的响应函数处理后续步骤 Promise状态一经改变，不会再变 只有在连续多个回调顺序执行的时候，Promise才会显示出其威力

.then()
=======

*   .then()接受两个函数作为参数，分别代表fulfilled和rejected
*   .then()返回一个新的Promise实例，所以它可以链式调用
*   当前面的Promise状态改变时，.then()根据其最终状态，选择特定的状态响应函数执行
*   状态响应函数可以返回新的Promise，或其它值
*   如果返回新的Promise，那么下一级.then()会在新的Promise状态改变之后执行
*   如果返回其它任何值，则会立刻执行下一级.then()

错误处理
====

Promise会自动捕获内部异常，并交给rejected响应函数处理 最好是在语句的最后通过catch捕获错误，因为catch可以捕获resolve回调中发生的错误，而reject回调无法捕获 catch也会返回一个Promise实例，并且它返回的Promise实例如果没有错误的话也是fulfilled状态，所以catch()后面的.then()也都会触发，但是catch()后面的.catch()不会触发（**如果在第一个catch()中没有抛出错误**）

### 强烈建议在所有队列最后都加上.catch()，以避免漏掉错误处理造成意想不到的问题：

doSomething()
  .doAnotherThing()
  .doMoreThing()
  .catch( err => {
    console.log(err);
  });

实现队列
====

有时候我们不希望所有动作一起发生，而是按照一定顺序，逐个进行：

let promise = doSomething();
promise = promise.then(doSomethingElse);
promise = promise.then(doSomethingElse2);
promise = promise.then(doSomethingElse3);
...

使用.forEach()
------------

function queue(things) {
  let promise = Promise.resolve();
  things.forEach( thing => {
    promise = promise.then( () => {
      return new Promise( resolve => {
        doThing(thing, () => {
          resolve();
        })
      })
    })
  });
  return promise;
}
queue(\['lots', 'of', 'things', ....\]);

使用.reduce()
-----------

function queue(things) {
  return things.reduce( (promise, thing) => {
    promise = promise.then( () => {
      return new Promise( resolve => {
        doThing(thing, () => {
          resolve();
        })
      })
    })
  }, Promise.resolve());
}
queue(\['lots', 'of', 'things', ....\]);

Promise常用函数
===========

Promise.resolve()
-----------------

返回一个fulfilled的Promise实例，或原始Promise实例

*   参数为空，返回一个状态为fulfilled的Promise实例
*   参数是一个跟Promise无关的值，同上，不过fulfilled响应函数会得到这个参数
*   参数为Promise实例，则返回该实例，不做任何修改
*   参数为thenable（有then方法），立刻执行它的.then()

Promise.reject()
----------------

返回一个rejected的Promise实例

*   **Promise.reject()不认thenable**
*   其他和Promise.resolve()类似

Promise.all()
-------------

Promise.all(\[p1, p2, p3, ...\])用于将多个Promise实例包装成一个新的Promise实例 当所有子Promise都完成，该Promise完成，返回值是**全部值的数组** 有任何一个失败，该Promise失败，返回值是**第一个失败的子Promise的结果** 最常见的是和.map()连用

Promise.race()
--------------

类似Promise.all()，区别在于它有任意一个完成就算完成。

### 常见用法：

*   把异步操作和定时器放在一起
*   如果定时器先触发，就认为超时，告知用户

async/await
===========

ES2017新增运算符，新的语言元素

*   赋予JavaScript以顺序手法编写异步脚本的能力！
*   既保留异步运算的无阻赛特性，还继续使用同步写法。
*   还能正常使用return/try/catch