---
title: JS中的一些小技巧，精妙且实用
urlname: some-tips-in-js
id: 623
categories:
  - JS
tags:
  - JS
  - 技巧
date: 2017-04-13 09:33:29
---

写在前面
====

这里总结了我在项目中经常会用到的一些JS小技巧，同时参考了其他开发者对于JS小技巧的总结，从而形成了这篇文章，如果在日后我发现了更多的小技巧，我会及时更新

使用!!操作符转换布尔值
============

有时候我们需要对一个变量检查其是否存在或者检查值是否有一个有效值，如果存在就返回true值。为了做这样的验证，我们可以使用!!操作符来实现是非常的方便与简单。对于变量可以使用!!variable进行检测，**只要变量的值为:0、null、" "、undefined或者NaN都将返回的是false，反之返回的是true**。

使用"+"或"-"转化数值
=============

这个技巧非常有用，其非常简单，可以将字符串数据转换成数字，不过其只适合用于字符串数据，否则将返回NaN

function toNumber(strNumber){
  return+strNumber;
}
console.log(toNumber("1234"));// 1234
console.log(toNumber("ACB"));// NaN

检测对象中属性
=======

当你需要检测一些属性是否存在，避免运行未定义的函数或属性时，这个小技巧就显得很有用。如果你打算定些一些跨兼容的浏览器代码，你也可能会用到这个小技巧。例如，你想使用document.querySelector()来选择一个id，并且让它能兼容IE6浏览器，但是在IE6浏览器中这个函数是不存在的，那么使用这个操作符来检测这个函数是否存在就显得非常的有用，如下面的示例：

if('querySelector' in document){
  document.querySelector("#id");
}else{
  document.getElementById("id");
}

在这个示例中，如果document不存在querySelector函数，那么就会调用docuemnt.getElementById("id")。

数组截断
====

这个小技巧主要用来锁定数组的大小，如果用于删除数组中的一些元素来说，是非常有用的。例如，你的数组有10个元素，但你只想只要前五个元素，那么你可以通过array.length=5来截断数组。如下面这个示例：

var array =\[1,2,3,4,5,6\];
console.log(array.length);// 6
array.length =3;
console.log(array.length);// 3
console.log(array);// \[1,2,3\]

合并数组
====

如果你要合并两个数组，一般情况之下你都会使用Array.concat()函数：

var array1 =\[1,2,3\];
var array2 =\[4,5,6\];
console.log(array1.concat(array2));// \[1,2,3,4,5,6\];

然后这个函数并不适合用来合并两个大型的数组，因为其将消耗大量的内存来存储新创建的数组。在这种情况之个，可以使用Array.pus().apply(arr1,arr2)来替代创建一个新数组。这种方法不是用来创建一个新的数组，其只是将第一个第二个数组合并在一起，同时减少内存的使用：

var array1 =\[1,2,3\];
var array2 =\[4,5,6\];
console.log(array1.push.apply(array1, array2));// \[1,2,3,4,5,6\];

将NodeList转换成数组
==============

如果你运行document.querySelectorAll(“p”)函数时，它可能返回DOM元素的数组，也就是NodeList对象。但这个对象不具有数组的函数功能，比如sort()、reduce()、map()、filter()等。为了让这些原生的数组函数功能也能用于其上面，需要将节点列表转换成数组。可以使用**\[\].slice.call(elements)**来实现：

var elements = document.querySelectorAll("p");// NodeListvar 
arrayElements =\[\].slice.call(elements);// Now the NodeList is an array
var arrayElements =Array.from(elements);// This is another way of converting NodeList to Array

数组元素随机排序
========

利用随机数模拟随机排序

var list =\[1,2,3\];
console.log(list.sort(function(){Math.random()-0.5}));// \[2,1,3\]

其实利用Math.random()得到的结果并不是真正的随机排序，参见我的另外一篇文章：[JS中数组方法总结](https://merrier.wang/?p=296)，这篇文章中的数组随机排序方法是比较好的一个方法

从数组中获取一个随机项
===========

很难说这是一个技巧，如果你的前端水平还算可以的话，这个应该难不倒你：

var items = \[12, 548 , 'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' , 2145 , 119\];

var  randomItem = items\[Math.floor(Math.random() * items.length)\];

在特定范围内获取一个随机数
=============

这个在生成测试数据的时候非常有用，比如一个在最小最大值之间的一个随机薪水值

var x = Math.floor(Math.random() * (max - min + 1)) + min;

生成一个随机的数字字母字符串
==============

有时候，我们需要给某个元素赋一个唯一的id，这个时候随机字符串就可以派上用场了，在这个技巧里，你可以见识到js中的toString()方法是多么的强大 Math.random()生成0到1之间的随机数，number.toString(36)是将这个数字转换成36进制（0-9，a-z），最后substr去掉前面的“0.”字符串

function generateRandomAlphaNum(len) {
    var rdmstring = "";
    for( ; rdmString.length &lt; len; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, len);
}

更快的四舍五入
=======

见到过双波浪线"~~"操作符吗？它有时也被称为double NOT运算符。你可以更快的使用它来作为Math.floor()替代品。为什么呢？ 单位移~将32位转换输入-(输入+1)，因此双位移将输入转换为-(-(输入+1))，这是个趋于0的伟大的工具。对于输入的数字，它将模仿Math.ceil()取负值和Math.floor()取正值。如果执行失败，则返回0，这可能在用来代替Math.floor()失败时返回一个NaN的时候发挥作用。

// 单位移
console.log(~1337) // -1338
// 双位移
console.log(~~47.11) // -> 47
console.log(~~-12.88) // -> -12
console.log(~~1.9999) // -> 1
console.log(~~3) // -> 3
//失败的情况
console.log(~~\[\]) // -> 0 
console.log(~~NaN) // -> 0
console.log(~~null) // -> 0
//大于32位整数则失败
console.log(~~(2147483647 + 1) === (2147483647 + 1)) // -> 0

虽然~~可能有更好的表现，为了可读性，请使用Math.floor()。

测量一个JavaScript代码块的性能
====================

快速测量一个JavaScript块的性能，我们可以使用控制台的功能像console.time(label)和console.timeEnd(label)

console.time("Array initialize");
var arr = new Array(100),
len = arr.length,
i;
for (i = 0; i < len; i++) {
arr\[i\] = new Object();
};
console.timeEnd("Array initialize"); // 输出: Array initialize: 0.711ms

自调用函数
=====

这个经常被称为自调用匿名函数（Self-Invoked Anonymous Function）或者即时调用函数表达式（IIFE-Immediately Invoked Function Expression)。这是一个在创建后立即自动执行的函数，可以用于数据回填以及窗口resize()事件，我在项目中屡试不爽，示例如下：

(function(){
    // some private code that will be executed automatically
})();
(function(a,b){
    var result = a+b;
    return result;
})(10,20)

实现String的trim函数
===============

在Java、C#、PHP和很多其他语言中都有一个经典的 trim 函数，用来去除字符串中首尾的空格符，而在JavaScript中并没有，所以我们需要在String对象上加上这个函数，不用prototype而写成function写可以

String.prototype.trim = function(){return this.replace(/^\\s+|\\s+$/g, "");};

将arguments对象转换成一个数组
===================

arguments对象是一个类数组对象，但不是一个真正的数组

var argArray = Array.prototype.slice.call(arguments);

验证是否是数字
=======

这是一个可以称得上技巧的js方法，当然你也可以用正则表达式

function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

验证是否是数组
=======

call()这个方法在js里如同神技，而这里也是它的一个应用

function isArray(obj){
    return Object.prototype.toString.call(obj) === '\[object Array\]' ;
}

**不要使用 delete 来删除一个数组中的项**
==========================

使用 splice 而不要使用 delete 来删除数组中的某个项。使用 delete 只是用 undefined 来替换掉原有的项，并不是真正的从数组中删除。 不要使用这种方式：

var items = \[12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 \];
items.length; // return 11
delete items\[3\]; // return true
items.length; // return 11
/\* items will be equal to \[12, 548, "a", undefined × 1, 5478, "foo", 8852, undefined × 1, "Doe", 2154,       119\]   */

而使用：

var items = \[12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 \];
items.length; // return 11
items.splice(3,1) ;
items.length; // return 10
/\* items will be equal to \[12, 548, "a", 5478, "foo", 8852, undefined × 1, "Doe", 2154,       119\]   */

delete 方法应该被用来删除一个对象的某个属性。

使用逻辑AND/OR做条件判断
===============

这个技巧降低了可读性，不推荐使用

var foo = 10;
foo == 10 && doSomething(); // 等价于 if (foo == 10) doSomething();
foo == 5 || doSomething(); // 等价于 if (foo != 5) doSomething();

使用逻辑OR为函数参数设置默认值
================

这个技巧实用到爆，尤其是开发插件的时候

function doSomething(arg1){
    Arg1 = arg1 || 10; // 如果arg1没有被设置的话，Arg1将被默认设成10
}

浮点数问题
=====

这是一个需要注意的地方，但是计算机专业的人应该早就知道了吧

0.1 + 0.2 === 0.3 // is false
9007199254740992 + 1 // is equal to 9007199254740992
9007199254740992 + 2 // is equal to 9007199254740994

为什么会这样？ 0.1+0.2等于0.30000000000000004。你要知道，所有的JavaScript数字在内部都是以64位二进制表示的浮点数，符合IEEE 754标准。更多的介绍，可以阅读[这篇博文](http://www.2ality.com/2012/04/number-encoding.html)。你可以使用 toFixed() 和 toPrecision() 方法解决这个问题。

使用for-**in遍历一个对象内部属性的时候注意检查属性**
===============================

下面的代码片段能够避免在遍历一个对象属性的时候访问原型的属性

for (var name in object) {
    if (object.hasOwnProperty(name)) {
        // do something with name
    }
}

isFinite()
==========

在使用这个方法之前需要验证一下参数，因为null的存在

isFinite(0/0) ; // false
isFinite("foo"); // false
isFinite("10"); // true
isFinite(10);   // true
isFinite(undifined);  // false
isFinite();   // false
isFinite(null);  // true  !!!

**在调用 setTimeout() 和 setInterval() 的时候传入函数，而不是字符串**
===================================================

如果你将字符串传递给 setTimeout() 或者 setInterval()，这个字符串将被如使用 eval 一样被解析，这个是非常耗时的 不要使用：

setInterval('doSomethingPeriodically()', 1000);
setTimeOut('doSomethingAfterFiveSeconds()', 5000)

而用:

setInterval(doSomethingPeriodically, 1000);
setTimeOut(doSomethingAfterFiveSeconds, 5000);

用JavaScript获取伪元素(pseudo-element)属性
==================================

大家都知道如何通过一个元素的`style`属性获取它的CSS样式值，但能获取伪元素(pseudo-element)的属性值吗？可以的，使用JavaScript也可以访问页面中的伪元素。

// Get the color value of .element:before
var color = window.getComputedStyle(
	document.querySelector('.element'), ':before'
).getPropertyValue('color');

// Get the content value of .element:before
var content = window.getComputedStyle(
	document.querySelector('.element'), ':before'
).getPropertyValue('content');

classList API
=============

很多的JavaScript工具库里都有`addClass`，`removeClass`和`toggleClass`等方法。为了对老式浏览器的兼容，这些类库采用的方法都是先搜索元素的`className`，追加和删除这个类，然后更新`className`。其实有一个新型的API提供了添加，删除和反转CSS类属性的方法，叫做classList：

myDiv.classList.add('myCssClass'); // Adds a class

myDiv.classList.remove('myCssClass'); // Removes a class

myDiv.classList.toggle('myCssClass'); // Toggles a class

直接对样式表进行添加和删除样式规则
=================

我们都非常熟悉使用`element.style.propertyName`来修改样式，使用JavaScript能帮助我们做到这些，但你知道如何新增或修一个现有的CSS样式规则吗？其实非常的简单。

function addCSSRule(sheet, selector, rules, index) {
	if(sheet.insertRule) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else {
		sheet.addRule(selector, rules, index);
	}
}

// Use it!
addCSSRule(document.styleSheets\[0\], "header", "float: left");

加载CSS文件
=======

延迟加载图片、JSON、脚本等是用来加快页面显示速度的好方法。我们可以使用curl.js等这样JavaScript加载器来延迟加载这些外部资源，可你知道CSS样式表也可以延迟加载吗，而且在加载成功后回调函数会给予通知。

curl(
	\[
		"namespace/MyWidget",
		"css!namespace/resources/MyWidget.css"
	\], 
	function(MyWidget) {
		// 你可以对MyWidget进行操作
		// 这里没有对这个CSS文件引用，因为不需要;
		// 我们只需要它已经加载到页面上了
	}
});

CSS鼠标指针事件
=========

CSS鼠标指针事件`pointer-events`属性非常的有趣，它的功效非常像JavaScript，当你把这个属性设置为`none`时，它能有效的阻止禁止这个元素，你也许会说“这又如何？”，但事实上，它是禁止了这个元素上的任何JavaScript事件或回调函数！

.disabled { pointer-events: none; }

点击这个元素，你会发现任何你放置在这个元素上的监听器都不会触发任何事件。一个神奇的功能，真的——你不在需要为了防止某个事件会被触发而去检查某个css类是否存在。

拓展阅读
====

Sina App Engine Blog：[45个实用的JavaScript技巧、窍门和最佳实践](http://blog.sae.sina.com.cn/archives/2291) Sina App Engine Blog：[5种你未必知道的JavaScript和CSS交互的方法](http://blog.sae.sina.com.cn/archives/5569)