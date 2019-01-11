---
title: Blue老师ES6视频笔记
urlname: teacher-blue-es6-video-notes
id: 1504
categories:
  - JS
tags:
  - ES6
  - JS
  - 笔记
date: 2017-12-12 22:10:42
img: /images/hexo_thumbnail_19.jpg
---

请容许我吐槽一下，我发现中国很多前端的大神的英文真的差啊。。

## ES6 兼容性

可以在线查看兼容性：

* ES5：[kangax.github.io/compat-table/es5/](https://kangax.github.io/compat-table/es5/)
* ES6：[kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/)

### 在线编译

**babel === browser.js**，只不过叫法不同 可以通过如下方式实现在线编译 ES6，只不过会多出额外的编译时间，用户体验稍差：

```html
<script src="browser.js"></script>
<script type="text/babel">
    let a = 12;
    let b = 5;
    alert(a+b);
</script>
```

## 变量

### ES5 中 var 的缺点：

* 可以重复声明
* 无法限制修改，即没有常量的概念
* 没有块级作用域

```javascript
if(true){
    var a = 12;
}
alert a; // 12
```

### 块级作用域有什么用？

可以限定变量在块中起作用，而不像ES5一样在函数块中起作用，最常见的是 for 循环中的索引值

## 箭头函数

1. 如果只有一个参数，()可以省略
2. 如果只有一个 return，{}可以省略

## 函数的参数

ES6新增：

### 参数扩展（...args必须为最后一个形参）

```javascript
function show(a, b, ...args){
  alert(a);
  alert(b);
  alert(args);
}
show(12, 15, 8, 9, 20);
```

### 展开一个数组

```javascript
let arr = \[1, 2, 3\];
\[...arr\] = \[1, 2, 3\];
```

### 默认参数

```javascript
function show(a, b=5, c=12){
  console.log(a, b, c);
}
```

## 解构赋值

```javascript
let \[a, b, c\] = \[1, 2, 3\]
console.log(a, b, c);

let \[{a, b}, \[n1, n2, n3\], num, str\] = \[{a: 12, b: 5}, \[12, 5, 8\], 8, 'cxzcv'\];
console.log(a, b, n1, n2, n3, num, str);

let \[a, b\] = {a: 12, b: 45};
console.log(a, b); // undefined is not a function, 前提1

let {a, b} = {12, 5};
console.log(a, b); // unexpected token, 前提2

let \[a, b\];
\[a, b\] = \[12, 5\]; // XXXX error, 前提3
```

前提：

1. 左右两边解构必须一样
2. 右边必须是个东西
3. 声明和赋值不能分开（必须在一句话中完成）

## 数组

新增四个方法：

* map：映射
* reduce：汇总
* filter：过滤器
* forEach：循环（迭代）

### map

```javascript
let arr = \[12, 5, 8\];
let result = arr.map(function(item){
  return item*2;
})
alert(result); // 24, 10, 16
```

### reduce

经常用来算总数、平均数等指标

```javascript
let arr = \[12, 69, 180, 8763\];
let result = arr.reduce(function (tmp, item, index){
  return tmp + item;
})
alert(result);
```

求平均数：

```javascript
let arr = \[12, 69, 180, 8763\];
let result = arr.reduce((tmp, item, index) => {
  if(index != arr.length - 1){
    return tmp+item;
  }else {
    return (tmp+item)/arr.length;
  }
})
alert(result);
```

### filter

filter 中 return true 就留下来，return false 就不保留

### forEach

类似于传统的 for 循环，参数为 item, index

## 字符串

新增：

1. 多了两个新方法，startsWith，endsWith
2. 字符串模板

### 字符串模板

普通字符串无法折行，字符串模板可以折行

```javascript
let a = 12;
let str = \`a${a}bc\`;
alert(str); // a12bc
```

## 面向对象

ES5 中的面向对象：类和构造函数不分，混为一谈；ES6 中的面向对象：

1. class 关键字，构造器和类分开了
2. class 里面直接加方法
3. extends-继承

## JSON

json 的标准写法：

1. 只能用双引号
2. 所有的名字（key）都必须用引号包起来

在 ES 中，当名字和值相同时，可以只写其中一个；方法可以省掉: function

## Promise

异步会让代码更复杂，而同步的代码简单，而 Promise 用同步的方式来书写异步代码

```javascript
let p = new Promise(function (resolve, reject){
  $.ajax({
    url: 'arr.txt',
    dataType: 'json',
    success(arr){
      resolve(arr);
    },
    error(err){
      reject(err);
    }
  })
})
p.then(function (){alert('成功')}, function (){alert('失败')});
```

Promise.all(\[promise1, promise2, ...\]) => 都 resolve 的时候才算成功，只要有一个 reject 就算失败
Promise.race(\[promise1, promise2, ...\]) => 只要有一个 resolve 的时候就算成功，全部 reject 才算失败 在高版本 jQuery 中，$.ajax 的返回值就是一个 Promise 对象

## generator

和普通函数相比，中间能暂停，需要和 yield 配合使用 generator 并不会直接执行，而是会创建一个 generator 对象，其中该对象的 next 方法用于继续执行，碰到 yield 就会停

```javascript
function *show(){
  alert('a');
  yield;
  alert('b');
}
let genObj = show();
genObj.next(); // a
genObj.next(); // b
```

### yield

yield 既可以传参，又可以返回

```javascript
function *show(num1, num2){
  alert(`${num1}, ${num2}`);
  alert('a');
  let a = yield;
  alert('b');
  alert(a);
}
let gen = show(99, 88);
gen.next(12); // 第一个next没法给yield传参
gen.next(5); // 会传给上面的yield，所以a=5
```

### Promise 的局限性

其实 generator 之所以出现也是因为纯 Promise 也有其自身的缺陷，并不能完全避免“回调陷阱”，而网上对于 Promise 的局限性解释很多，建议大家直接去看相关博客就可以了，而在我理解就是**Promise 在解决数据依赖问题时避免不了“回调陷阱”**，比如我需要根据数据 A 去请求数据 B，然后再根据数据 B 请求数据 C，然后再……，如果你自己用 Promis e实现一下的话就会发现这时候它的局限性所在；这也再一次证明了那句话：**懒惰是最大生产力**

## ES7 预览

ES6 还没掌握，ES7 都定稿了。。ES8 都有草案了。。，不过现在浏览器对 ES7 的支持很惨

* 数组 includes -> 检查数组是否包含某元素
* 数组 keys/values/entries -> 一般配合 for...of 使用，for...of 即对 value 的循环，entries 是对键值对的循环
* 求幂新操作符 -> 3**8 === Math.pow(3, 8)
* 字符串的 padStart/padEnd 方法 -> 补充空格或其他字符串
* 增加了函数容忍度 function show(a, b, c, ) -> 不报错
* async 和 await，这基本上是 ES7 最好用的。。用于替代 generator 和 yield
* ……