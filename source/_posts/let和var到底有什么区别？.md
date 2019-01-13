---
title: let和var到底有什么区别？
urlname: the-difference-between-let-and-var
id: 1089
categories:
  - stackoverflow
tags:
  - ES6
  - JS
  - stackoverflow
date: 2017-08-04 16:10:14
img: /images/hexo_thumbnail_19.jpg
---

问题来自于stackoverflow：[What's the difference between using “let” and “var” to declare a variable?](https://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var-to-declare-a-variable) 我们都知道 ES6 中引入了 let 声明，而 let 也一直被认为是声明“局部变量”，那么 let 和 var 到底有什么区别呢？

## 定义

首先，从其定义本身，其区别之一是起作用的范围： var 起作用的范围是其最近的方法体，而 let 起作用的范围是其最近的包围块，所谓的“包围块”是有可能比方法体小的。但是**如果都是全局作用域上声明的话，var 和 let 起作用的范围其实是一样的** 除此之外，用 let 声明的变量在它们被声明之前是无法访问到的（有点类似于严格模式），举个栗子：

```javascript
console.log('globalVar: ' + globalVar);
console.log('globalLet: ' + globalLet);
var globalVar = 'globalVar';  //globalVar: undefined
let globalLet = 'globalLet';  //Uncaught ReferenceError: globalLet is not defined
```

## 作为全局变量

和 var 不同，用 let 声明的“全局变量”将不会作为属性赋给 window，简单的栗子：

```javascript
let me = 'go';
var i = 'able';
console.log(window.me); // undefined
console.log(window.i); // 'able'
```

## 在函数中声明

当它们在函数体中声明时是一样的：

```javascript
function ingWithinEstablishedParameters() {
    let funclet = 'funclet'; //作用域为函数体内部
    var funcvar = 'funcvar'; //作用域为函数体内部
}
```

## 在循环体中声明

当我们在循环体中声明变量（例如 for）时，var 和 let 是有显著区别的：let 只在循环体内部可访问，而 var 在整个方法体中都可访问。还是个栗子：

```javascript
function allyIlliterate() {
    //tuce在这里不可访问
    for( let tuce = 0; tuce < 5; tuce++ ) {
        //tuce只能在这里访问得到
        //所以每次循环之后tuce的值都会变
    }
    //tuce在这里也不可访问
}

function byE40() {
    //nish在这里可以访问

    for( var nish = 0; nish < 5; nish++ ) {
        //nish在整个方法体中都可以访问得到
    }

    //nish在这里也可以访问
}
```

## 声明覆盖

在严格模式下，var 允许你重新给一个变量赋值，但是 let 不允许：

```javascript
'use strict';
let me = 'foo';
let me = 'bar'; // SyntaxError: Identifier 'me' has already been declared

'use strict';
var me = 'foo';
var me = 'bar'; // 没毛病，现在me就是bar了
```

虽然 let 和 var 在某些情况下是一样的行为表现，但还是推荐大家多使用 let，逐渐放弃 var 的使用。