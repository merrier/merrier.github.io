---
title: JS中的apply、call和bind
urlname: apply-call-bind-in-js
id: 1077
categories:
  - JS
tags:
  - JS
date: 2017-08-03 16:30:08
img: /images/hexo_thumbnail_13.jpg
---

关于 JS 中的 apply、call 和 bind，网上的相关文章实在是太多了，但是对于我这种比较重视基础的人来说，感觉大部分文章都讲不到点子上，不乏无脑复制粘贴之辈，所以我在参考了一些资料之后，决定用比较容易理解的方式来讲解，同时会用更多的实例来说明它们之间的区别。

## 为什么会有它们仨

首先，哲学中有一句话：

> 存在即合理

所以，JS 中为什么会有它们仨呢？让我们来一看一段代码：

```javascript
function cat(){
}
cat.prototype={     
    food:"fish",     
    say: function(){          
    alert("I love "+this.food);     
    }
}
var blackCat = new cat;
blackCat.say();
```

这段代码很简单，也是我们经常会碰到的，就是我们定义了一个 cat 类，然后 blackCat 是 cat 类的一个实例， cat 类有一个 say 方法。那么问题来了，如果我们又有一个对象叫做 `whiteDog={food:"bone"}`，我们想让 whiteDog 也有 cat 类的 say 方法，那应该怎么办呢？所以这时候就体验出它们仨的作用了，我们可以通过下面的方式让 whiteDog 也有 say 方法：

* blackCat.say.call(whiteDog)
* blackCat.say.apply(whiteDog)
* blackCat.say.bind(whiteDog)()

通过上面这个“猫与狗”的栗子，我们可以总结出 apply、call 和 bind 的共同点，就是它们都是为了改变函数体内部 this 的指向，也就是为了改变某个函数运行时的上下文（context）而存在的（JavaScript 的函数存在【定义时上下文】、【运行时上下文】和【上下文是可以改变的】这样的概念，具体参见简书-波同学的文章：[前端基础进阶（二）：执行上下文详细图解](http://www.jianshu.com/p/a6d37c77e8db)）

## bind 的独特性

通过上面的调用方式你可能发现了一些端倪，就是 bind 在调用之后还需要加一个“()”，这就是 call、apply 它们和 bind 的区别了：

* 只传一个参数时，call 和 apply 都是对函数的直接调用
* 而 bind 方法返回的仍然是一个函数，因此后面还需要()来进行调用才可以

也许你又有疑问了，一般我们的方法都会有参数的，如果有参数的话应该如何调用呢？我们再举个栗子：

```javascript
var obj1 = {
  name: 'asd',
  age: 29 ,
  sayname: function(i, j){
    console.log( this.name + '是' + this.age+i+j);
    }
  }

var obj2 ={
  name:'aaa',
  age:30
}
obj1.sayname.apply(obj2,\['男',180\]);
obj1.sayname.call(obj2,'女',167);
obj1.sayname.bind(obj2,'x',150)();
obj1.sayname.bind(obj2)('y',110);
```

根据上面的代码，我们可以直观的总结出如下几个知识点：

* call 后面的参数与 sayname 方法中是一一对应的
* apply 的第二个参数是一个数组，数组中的元素是和 sayname 方法中一一对应的（**这其实就是和 call 最大的区别**）
* bind 可以像 call 那样传参，但是由于 bind 返回的仍然是一个函数，还可以在调用的时候再进行传参

## apply、call 的区别

通过上面的栗子，我们可以看到，bind 和 apply、call 是有本质上的区别的，所以我们先讲 apply 和 call 这一对“近亲”。对于 apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样。例如，有一个函数定义如下：

```javascript
var func = function(arg1, arg2) {
    console.log(arg1 + arg2);
};
```

我们可以通过如下方式来调用：

* func.call(this, arg1, arg2);
* func.apply(this, \[arg1, arg2\]);

其中 this 是你想指定的上下文，它可以是任何一个 JavaScript 对象，而不同点在于：call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。 因此，如果你的参数明确知道数量的话，就用 call。而不确定的时候用 apply，然后把参数 push 进数组再传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个伪数组来遍历所有的参数，所以也有人用一句话区分 apply 和 call：`foo.call(this, arg1, arg2, arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3)`

### 举个栗子

JS 中存在一种名为伪数组的对象结构，比较特别的是 arguments 对象，还有像调用 getElementsByTagName，document.childNodes 之类的，它们返回 NodeList 对象都属于**伪数组（也有文章描述这类对象为“类数组对象”）**，不能应用 Array 下的 push，pop 等方法。但是我们能够通过 Array.prototype.slice.call 将带有 length 属性的对象转换为真正的数组，这样 domNodes 就可以应用 Array 下的所有方法了。

## 一道面试题

可能你还是不太理解上面的“当参数数量不确定时，函数内部也可以通过 arguments 这个伪数组来遍历所有的参数”这句话，下面通过一道面试题，来更深入的理解 apply 和 call：

```javascript
//我们定义一个log方法，让它可以代理console.log方法
function log(msg)　{
  console.log(msg);
}
log(1);    //1
log(1,2);    //1
```

上面定义的方法可以解决最基本的需求，但是有一个问题在于：当传入参数的个数是不确定的时候，上面的方法就失效了。这个时候，因为传入多少个参数是不确定的，所以使用 apply：

```javascript
function log(){
  console.log.apply(console, arguments);
};
log(1);    //1
log(1,2);    //1 2
```

接下来我们又有一个需求，就是给每一个 log 信息添加一个 “(app)” 的前缀，比如

```javascript
log("hello world");    //(app)hello world
```

我们该如何实现呢？这个时候需要想到 arguments 参数是个伪数组，通过 Array.prototype.slice.call 转化为标准数组，再使用数组方法 unshift，像这样：

```javascript
function log(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift('(app)');
  console.log.apply(console, args);
};
```

## bind 详解

apply 和 call 就介绍完了，下面我们再介绍一下有些特殊的 bind。MDN 上对于 bind 的解释是：

> bind() 方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

我表示看完还是不懂，所以还是直接看实例来的痛快：在常见的单例模式中，通常我们会使用 _this, that, self 等保存 this，这样我们可以在改变了上下文之后继续引用到它。像这样：

```javascript
var foo = {
    bar : 1,
    eventBind: function(){
        var _this = this;
        $('.someClass').on('click',function(event) {
            console.log(_this.bar);     //1
        });
    }
}
```

由于 Javascript 特有的机制，上下文环境在 eventBind: function(){ } 过渡到 $('.someClass').on('click',function(event) { }) 发生了改变，上述使用变量保存 this 这些方式都是有用的，也没有什么问题。当然使用 bind() 可以更加优雅的解决这个问题：

```javascript
var foo = {
    bar : 1,
    eventBind: function(){
        $('.someClass').on('click',function(event) {
            console.log(this.bar);      //1
        }.bind(this));
    }
}
```

在上述代码里，bind() 创建了一个函数，当这个 click 事件绑定在被调用的时候，它的 this 关键词会被设置成被传入的值（这里指调用 bind() 时传入的参数）。因此，这里我们传入想要的上下文 this (其实就是 foo )，到 bind() 函数中。然后，当回调函数被执行的时候， this 便指向 foo 对象。

### 再来一个简单的栗子：

```javascript
var bar = function(){
    console.log(this.x);
}
var foo = {
    x:3
}
bar(); // undefined
var func = bar.bind(foo);
func(); // 3
```

这里我们创建了一个新的函数 func，当使用 bind() 创建一个绑定函数之后，它被执行的时候，它的 this 会被设置成 foo ， 而不是像我们调用 bar() 时的全局作用域。

### 连续 bind()

有个有趣的问题，如果连续 bind() 两次，亦或者是连续 bind() 三次那么输出的值是什么呢？像这样：

```javascript
var bar = function(){
    console.log(this.x);
}
var foo = {
    x:3
}
var sed = {
    x:4
}
var func = bar.bind(foo).bind(sed);
func(); //?
 
var fiv = {
    x:5
}
var func = bar.bind(foo).bind(sed).bind(fiv);
func(); //?
```

答案是，两次都仍将输出 3 ，而非期待中的 4 和 5 。原因是，在 Javascript 中，多次 bind() 是无效的。更深层次的原因， bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind(),故第二次以后的 bind 是无法生效的。

## 总结一下

最近发现“总结一下”很好用，因为可以堂而皇之的给自己的文章增加很多篇幅，同时还可以显得高大上：

* **apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；**
* **apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；**
* **apply 、 call 、bind 三者都可以利用后续参数传参；**
* **bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用。**

## 参考文章

* [【优雅代码】深入浅出 妙用Javascript中apply、call、bind](http://www.cnblogs.com/coco1s/p/4833199.html)
* [javascript call apply bind this指向和区别](http://www.jianshu.com/p/f17a7b5efc5d)
* [关于javascript中apply()和call()方法的区别](http://www.cnblogs.com/fighting_cp/archive/2010/09/20/1831844.html)
* [如何理解和熟练运用js中的call及apply？](https://www.zhihu.com/question/20289071)
* [What is the difference between call and apply?](https://stackoverflow.com/questions/1986896/what-is-the-difference-between-call-and-apply)