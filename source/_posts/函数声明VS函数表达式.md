---
title: 函数声明VS函数表达式
urlname: function-declaration-vs-function-expression
id: 1049
categories:
  - JS
tags:
  - JS
  - 函数
  - 前端面试
date: 2017-08-02 15:16:07
---

TL;DR
=====

本篇文章译自某大牛的文章：[Function Declarations vs. Function Expressions](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)，推荐英语不是很差的童鞋点击前面链接看原文。 首先先做个小测验，下面四个例子的alert输出分别是什么？ **例子一：**

function foo(){
    function bar() {
        return 3;
    }
    return bar();
    function bar() {
        return 8;
    }
}
alert(foo());

**例子二：**

function foo(){
    var bar = function() {
        return 3;
    };
    return bar();
    var bar = function() {
        return 8;
    };
}
alert(foo());

**例子三：**

alert(foo());
function foo(){
    var bar = function() {
        return 3;
    };
    return bar();
    var bar = function() {
        return 8;
    };
}

**例子四：**

function foo(){
    return bar();
    var bar = function() {
        return 3;
    };
    var bar = function() {
        return 8;
    };
}
alert(foo());

我就直接公布答案了：8，3，3和\[Type Error:bar is not a function\]。如果你没有完全答对或者直接翻到这里看答案，那你可以继续往下看了

什么是函数声明(function declaration)
=============================

函数声明定义了一个命名的函数变量，而不需要变量赋值。函数声明是一种独特的结构，并且不能嵌套在非函数体中。我们可以将函数声明看做是变量声明的另一种形式，就像变量声明必须以“var”开头一样，函数声明必须以“function”关键字开头。下面就是一个很简单的函数声明实例：

function bar() {
    return 3;
}

ECMA 5(13.0)中对于函数声明的定义：

> **function**_Identifier_ ( _FormalParameterList_opt ) { _FunctionBody_ }

需要注意的是，函数名在它本身的作用于以及它的父级作用域都是可见的（这是一个很不错的规则，因为不然的话在外面将无法访问到该函数）：

function bar() {
    return 3;
}
 
bar() //3
bar  //function
bar === window.bar  //true

什么是函数表达式(function expression)
=============================

函数表达式将一个函数定义为一个很长的表达式的一部分（通常是一个变量赋值表达式）。以“函数表达式”方式命名的函数可以是命名的也可以是匿名函数。**函数表达式不能以“function”关键字开头**（所以下面的第三个表达式需要用“()”包裹）：

//匿名函数表达式
var a = function() {
    return 3;
}
 
//命名函数表达式
var a = function bar() {
    return 3;
}
 
//自调用函数表达式
(function sayHello() {
    alert("hello!");
})();

和函数声明相反，**函数表达式的函数名（如果有的话）在它的作用域之外是不可见的**

那函数语句(function statement)又是什么呢？
===============================

函数语句有时候只是函数声明的另一种叫法。然而，按照[Kangax的说法](http://yura.thinkweb2.com/named-function-expressions/#function-statements)，Mozilla认为函数语句是对于函数声明的扩展，它允许在任何允许使用语句的地方使用函数声明这种语法。但是，这是非行业标准，所以不推荐用于生产环境。

好像忘了上面四个例子
==========

让我们回到文章开头那四个例子 首先，**例子一是两个函数声明，所以这两个函数声明被“提升”了**

等一下，什么叫做被“提升”？
--------------

援引[Ben Cherry文章](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting)中的一段话：

> Function declarations and function variables are always moved (‘hoisted’) to the top of their JavaScript scope by the JavaScript interpreter

翻译一下就是：函数声明和函数变量总会被Javascript解释器移动（提升）到它们的JavaScript作用域的顶端 （我希望你能够认认真真的理解一下上面这句话，如果还是不理解，没关系，继续向下看） 当函数声明被提升时，整个函数体都将随之提升。所以在解释器对例子一中的代码进行解析过后，它其实是这样的（建议回过头看一下例子一的代码，对比着看会更容易理解）：

//**例子一实际执行时的代码**
function foo(){
    //第一次定义函数bar
    function bar() {
        return 3;
    }
    //第二次定义函数bar，将之前的定义覆盖
    function bar() {
        return 8;
    }
    //return调用结果
    return bar(); //8
}
alert(foo());

### 但是，我们一直以来的“常识”是return语句后面的代码是不会执行的啊？

这就涉及到“执行上下文”和“执行过程”的概念了，ECMA 5将“执行上下文”分为“词法环境”、“变量环境 ”和“绑定this”，而“执行过程”是指最终的代码执行过程。当执行到声明语句的时候，此时的声明语句就会进入到“变量环境”，它们与语句（比如说return语句）是不同的，是不受所谓的“前面代码先执行，后面代码后执行”的约束的。 （“执行上下文”这一概念对于本篇文章来说是个重点，如果依然不理解的话，可以读一下[汤姆大叔](http://www.cnblogs.com/TomXu/archive/2012/01/13/2308101.html)和[简书-波同学](http://www.jianshu.com/p/a6d37c77e8db)的文章加深理解）

那么，函数表达式也会提升吗
-------------

这取决于表达式本身，让我们继续看以下例子二中的第一个表达式：

var bar = function() {
    return 3;
};

左边的var bar是一个变量声明。根据上面的规则，变量声明会被提升，但是赋值表达式却没有（和函数声明不同，函数声明会将整个函数体提升）。因此当bar这个变量被提升时，解释器会将bar初始化为undefined：var bar = undefined。所以例子二中的代码实际上以下面的顺序执行：

//**例子二实际执行时的代码**
function foo(){
    //函数表达式的变量声明（被提升，同时被解释器赋初始值undefined）
    var bar = undefined;
    var bar = undefined;
    //第一个函数表达式被执行
    bar = function() {
        return 3;
    };
    //第一个函数表达式创建的函数被执行了
    return bar();
    //第二个函数表达式将不会执行（但是变量声明被提升了，就在上面）
}
alert(foo()); //3

目前你应该已经理解的差不多了，但是如果你在Firebug中运行例子三的代码会不符合预期，这又是为什么呢？
----------------------------------------------------

你可以试着将例子三的代码保存在一个HTML文件中，然后用firefox浏览器打开，或者在IE 8，Chrome或者Safari的console中执行。你就会发现，Firebug的console并没有像其他浏览器一样在全局作用域（其实并不是全局作用域，而是特殊的“Firebug”作用域。。可以试着在firebug的控制台中打印一下“this == window”你就明白了）中有函数体提升的表现 所以，抛开firefox的“灵异表现”不管，例子三和例子一其实是相同的道理，只不过是函数foo被提升了而已。

现在我们可以看一下例子四了
-------------

很明显，例子四是没有函数提升的，但是变量提升是存在的（而且是两个），那么此时bar的声明就会提升，但是它的值没有定义（undefined），所以最后相当于执行undefined()。最后当然就会报错了：bar is not a function

那还应该注意些什么呢？
===========

目前，你应该能完全理解上面的四个例子了。还需要注意的一点是，函数声明在非函数体（如if）中是被明令禁止的。然而，所有的浏览器其实都允许这样做，并且更可怕的是，**每个浏览器对这种不符合规定的语法的解释还不同！** 举个栗子，下面的代码片断在firefox 3.6中会抛出一个错误，因为它将函数声明解析为函数语句（函数语句已经在上面介绍过了），所以x is not defined。然而在IE8，Chrome5和Safari5中，函数x被正常return了（就像标准的函数声明一样）。当然，鉴于这篇文章的原文年代比较久远，具体的还是要自己在console中运行一下才能得出结论（可以试着将if中的true替换为false再运行一下看看）

function foo() {
    if(true) {
        function x() {};
    }
    return x;
}
alert(foo());

既然函数声明会造成混论，那它的好处在哪里？
=====================

通过上面的讨论，你会发现函数声明是“宽松”的——如果你在某个函数声明之前就调用它，“函数提升”的机制将使函数得到正常调用而不会报错。但是这种“宽松”缺乏严谨性，同时从长远来看，禁止“声明前调用”将更有利于开发者的编程习惯的养成（就像所谓的“弱类型”）。毕竟，开发者需要养成以特定的顺序编写代码的习惯。

函数表达式的优势呢？
==========

说出来你可能不信:） 首先，函数声明的方式好像在模仿Java中的方法声明，然而Java的方法和JS中的函数是两码事啊（原文是：**Java methods are very different animals**）：在JavaScript中，函数是具有值的living object，而Java中的方法只是元数据存储结构。下面的两段代码片断都定义了函数但是只有函数表达式表明我们在创建一个对象：

//函数声明
function add(a, b) {return a + b};
//函数表达式
var add = function(a, b) {return a + b};

其次，**函数表达式的用途更多**。一个函数声明只能解释为一段孤立的语句。它能做的仅仅是创建一个以当前作用域为父域的变量对象。与之相反，函数表达式是一种更复杂的结构。如果你想创建一个匿名函数或者将某个函数分配给一个原型对象亦或作为某个其他对象的属性的话，你就可以用函数表达式来实现。每当你使用高阶应用程序（比如curry或compose）创建一个函数时，你其实都是在应用函数表达式。所以，**函数表达式和函数编程其实是密不可分的**。

//函数表达式
var sayHello = alert.curry("hello!");

函数表达式有缺点吗？
==========

一般情况下，通过函数表达式方式创建的函数都是匿名的。比如下面这段代码创建的函数是匿名的，today只是对于匿名函数的引用：

var today = function() {return new Date()}

那匿名不匿名关系大吗？大多数情况下是没有的，但是正如[Nick Fitzgerald](http://fitzgeraldnick.com/weblog/)所说，使用匿名函数进行调试有可能会很痛苦。所以他建议使用命名函数表达式（NFEs）作为一种替代方案：

var today = function today() {return new Date()}

然而，正如Asen Bozhilov所说（以及[Kangax的文章](http://yura.thinkweb2.com/named-function-expressions/#jscript-bugs)），NFEs在IE9以下的浏览器中无法正常运行（在我看来，这并不是个大问题）

MD终于到结尾了
========

在错误的位置进行函数声明会误导别人，而且很少有（如果有）这种情况，就是你不能通过函数表达式的方法创建函数而必须用函数声明。当然，如果你必须要用函数声明，请将它们放在作用域顶端，这样可以减小误导性。同时，我绝不会在if语句中进行函数声明（这是明令禁止的）。 说了这么多（译者注：确实很多，翻译了好几个小时），你可能依然觉得有时候还是宁愿用函数声明。这其实很正常，盲目的遵守某些规则是愚蠢的，而且有时候会导致自己的代码很“丑陋”。最重要的是，你理解了上面介绍的这些概念和知识点，从而能够让你做出明智的决定。我希望这篇文章在这个方面能够对你有所帮助。 欢迎评论，如果你觉得我哪里说得不对（或者翻译的不对:））以及还有哪里需要补充的，欢迎留言或者通过其他方式联系我。