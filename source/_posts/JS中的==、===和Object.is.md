---
title: JS中的==、===和Object.is
urlname: equal-symbol-in-js
id: 1053
categories:
  - JS
tags:
  - JS
  - 前端面试
  - 计算机基础
  - 运算符
date: 2017-08-02 20:07:47
img: /images/hexo_thumbnail_80.jpg
---

在查阅了很多资料之后，我将在这篇文章对于 JS 中的 ==、===、Object.is 进行详细的讲解，所以这很有可能是一篇很长很长的“唠叨文”，但是我相信你一定可以从这篇文章中收货很多，所以抖擞精神，往下看吧！

## 比较操作

首先，你需要知道 JavaScript 提供了三种不同的值比较操作：

* 严格相等（'triple equals'或'identity'），即 “===”
* 宽松相等（'double equals'），即 “==”
* Object.js（ECMAScript 2015/ES6 新特性）

现在考虑表达式 x==y，当 x 和 y 的类型相同时，x==y 可以转化为 x===y，而对于后者是很简单的，因为不涉及到类型转换，只需要注意：

* +0 ==(=) -0  //true
* NaN ==(=) NaN  //false

对于上面这两种，你可以理解为 JavaScript 设计的问题（其实还是那句老话，王八的屁股——规定！），所以只需要死记硬背就可以了，当然还有两个长得像的 Object 也不相等，表现在：

* \[\] ==(=) \[\]  //false
* {} ==(=) {}  //false

之所以两个长得像的对象和数组都不相等，是因为在JS中，数组和对象是复杂数据类型，所以其实比较的是引用值，所以任意两个长得像的对象都不相等，具体参见：[理解JS中的内存分配](/20170803/understanding-memory-allocation-in-js.html)。ES6 中新增了 Object.is() 方法，它和 “===” 是基本相同的，除了下面这两种情况：

* Object.is(+0, -0)  //false
* Object.is(NaN, NaN)  //true

所以你可以理解为 Object.is() 其实是对 “===” 的修正。“===” 和 Object.is() 介绍完了，下面就着重介绍一下 “==”（因为 JS 中的 “==” 会将等号两边进行类型转换，所以情况比较复杂）

## ==

“==” 在比较前会将比较的值转换为相同类型，在转换后（等式的一边或两边都可能被转换），最终的比较方式就等同于全等操作符 “===”。同时请注意，“===” 满足交换律，但是 “==” 不满足交换律（比如!\[\]和{}）。先来看一张吊炸天的图：

<div align='center'><img src='/images/hexo_post_51.png' alt='' width='600'/></div>

**我们接下来的讲解都建立在这张图上面：**

### 有和无

从这张图我们可以明显的看出，它们被分成了两个阵营：

* String、Number、Boolean 和 Object（对应左侧）
* undefined 和 null（对应右侧）

分组的依据是什么呢？就是左侧是一个存在的世界，右侧是一个空的世界。所以就有如下规则：

* 左侧任意 == 右侧任意  // false

也就是左右两个世界中的任意值做 “==” 比较的结果都是 false

### 空和空

JavaScript 中的 undefined 和 null 是另一个经常让我们崩溃的地方。通常它被认为是一个设计缺陷，这一点我们不去深究。不过我曾听说，JavaScript 的作者最初是这样想的：

> 假如你打算把一个变量赋予对象类型的值，但是现在还没有赋值，那么你可以用 null 表示此时的状态(证据之一就是 typeof null 的结果是 'object')；相反，假如你打算把一个变量赋予原始类型的值，但是现在还没有赋值，那么你可以用 undefined 表示此时的状态。

不管这个传闻是否可信，它们两者做 == 比较的结果是 true 是很合理的。(见上图中右侧垂直线上标的 true，也就是 `undefined == null`)

### P和N

依然是上面那张图，从图中可以看到两个符号：大写字母 N 和 P：N 表示 ToNumber 操作，即将操作数转为数字。它是规范中的抽象操作，但我们可以用 JS 中的 Number() 函数来等价替代；P 表示 ToPrimitive 操作，即将操作数转为原始类型的值。它也是规范中的抽象操作，同样也可以翻译成等价的 JS 代码，但是会比 ToNumber 复杂一些，所以我们后面会详细解释。  

#### ToPrimitive

我们先讲 ToPrimitive，因为 ToNumber 中会用到 ToPrimitive，下面是关于 ToPrimitive 的规范：

> ToPrimitive 运算符接受一个值和一个可选的期望类型作参数。ToPrimitive 运算符把其值参数转换为非对象类型。如果对象有能力被转换为不止一种原始类型，可以使用可选的期望类型来暗示那个类型。根据下表完成转换：

| 输入类型      | 结果                                                          | 
|-----------|-------------------------------------------------------------| 
| undefined | 结果等于输入的参数（不转换）                                     | 
| null      | 结果等于输入的参数（不转换）                                    | 
| Boolean   | 结果等于输入的参数（不转换）                                     | 
| Number    | 结果等于输入的参数（不转换）                                     | 
| String    | 结果等于输入的参数（不转换）                                     | 
| Object    | 返回该对象的默认值。对象的默认值由把期望类型传入作为hint参数调用对象的内部方法 `[[DefaultValue]]` 得到 |

对于 Object 这种输入类型，上面的表格中的描述不够清楚，我查了一些资料，概括如下：MDN 上对于 ToPrimitive 的语法规范定位为：

> ToPrimitive(obj, preferredType)

**在执行 ToPrimitive(obj, preferredType) 时如果第二个参数为空并且 obj 为 Date 的实例时，此时 preferredType 会被设置为 String，其他情况下 preferredType 都会被设置为 Number**。如果 preferredType 为 Number，ToPrimitive 执行过程如下：

1. 如果 obj 为原始值，直接返回；
2. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
3. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
4. 否则抛异常。

如果 preferredType 为 String，将上面的第 2 步和第 3 步调换，即：

1. 如果 obj 为原始值，直接返回；
2. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
3. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
4. 否则抛异常。

接下来我们就开始介绍v alueOf() 和 toString() 以及原始值了：

### valueOf()

valueOf 方法返回对象的原始值，可能是字符串、数值或 bool 值等，看具体的对象。还是看具体的例子吧：

```javascript
var obj = {
  name: "obj"
};
console.log(obj.valueOf());//Object {name: "obj"}

var arr1 = \[1\];
console.log(arr1.valueOf());//\[1\]

var date = new Date();
console.log(date.valueOf());//1456638436303
//如代码所示，三个不同的对象实例调用valueOf返回不同的数据
```

### toString()

toString 方法用来返回对象的字符串表示

```javascript
var obj = {};
console.log(obj.toString());//\[object Object\]

var arr2 = \[\];
console.log(arr2.toString());//""，即空字符串
  
var date = new Date();
console.log(date.toString());//Sun Feb 28 2016 13:40:36 GMT+0800 (中国标准时间)
```

这个方法具体的运行机制是个比较复杂的过程，我之后会专门写一篇文章讲解这两个方法，可以尝试搜索一下。（当然，也可以自己在控制台敲一下，加深印象）

### 原始值（Primitive）

“原始值”这三个字虽然听上去很高大上，其实很容易理解，就是指 null、undefined、String、Boolean、Number 这五种基本数据类型之一。 花了这么大力气终于把 ToPrimitive 介绍完了，下面我们介绍一下 ToNumber：

### ToNumber

ToNumber 运算符根据下表将其参数转换为数值类型的值：

| 输入类型                            | 结果                              | 
|---------------------------------|---------------------------------| 
| undefined                       | NaN                             | 
| null                            | +0                              | 
| Boolean                         | 如果参数是true，结果为1。如果参数是false，结果为+0 | 
| Number                          | 结果等于输入的参数（不转换）                  | 
| String                          | 下面会介绍                           | 
| Object                 |    "应用下列步骤：1.设原始值为ToPrimitive(输入参数，暗示数值类型)；2.返回ToNumber(上面的原始值)"  | 

上面表格已经很清楚了，但是还有个 ToNumber(String 类型)没有介绍：

#### 字符转数字

字符转数字的规则是这样的：把字符串两边的空白字符去掉，然后把两边的引号去掉，看它能否组成一个合法的数字。如果能，转化结果就是这个数字，否则结果就是 NaN。举个栗子：

```javascript
Number('123') //结果123
Number('1.2e3') //结果1200
Number('123abc') //结果NaN
Number('\\r\\n\\t123\\v\\f') //结果123
```

当然也有例外，比如空白字符串转换为数字的结果是 0。即：

```javascript
Number('') // 结果+0
Number('\\r\\n\\t \\v\\f') // 结果+0
```

到目前为止，我们介绍完了 ToPrimitive 和 ToNumber，所以上面那张图的内容基本上就介绍完了。但是还有个运算符没有讲，就是 “!” 取非操作，下面就介绍一下这个看似简单的取非操作：

### ToBoolean

取非其实是执行了 ToBoolean 运算符之后再取反，ToBoolean 运算符根据下表将其参数转换为布尔值类型的值：


| 输入类型      | 结果                                | 
|-----------|-----------------------------------| 
| undefined | false                             | 
| null      | false                             | 
| Boolean   | 结果等于输入的参数                         | 
| Number    | 如果参数是+0，-0或NaN，结果为false；否则结果为true | 
| String    | 如果参数时空字符串（长度为零），结果为false；否则为true  | 
| Object    | true                              | 

### 没图你说个**

相等操作符 (==) 对于不同类型的值，进行的比较如下图所示：

<div align='center'><img src='/images/hexo_post_276.png' alt='' width='700'/></div>

## 万物皆数

我们再来看上面那张图，里面标有 N 或 P 的那几条连线是没有方向的。假如我们在这些线上表上箭头，使得连线从标有 N 或 P 的那一端指向另一端，那么就会得到：

<div align='center'><img src='/images/hexo_post_50.png' alt='' width='300'/></div>

聪明的你肯定发现了，在 == 运算过程中，所有类型的值都有一种向数字类型转化的趋势。毕竟有这样一句名言：

> 万物皆数

## 举个栗子

前面废话一堆，还不如举个实例来的痛快：

```javascript
[] == ![]
``` 

首先你需要明确的是上面这段代码执行的顺序，这就涉及到运算符的优先级了：`! > ==`。所以 ! 取反运算符的优先级会高于 ==，那让我们先来看等号右边的 “!\[\]”，根据上面的 ToBoolean，**\[\]是一个对象**，那么 ToBoolean(\[\]) 就是 true，!\[\] 就是 false 了 然后，我们根据上面那张图，等号左边的 \[\] 是 Object，等号右边的 !\[\] 是一个 Boolean 值，所以最终就成为了 ToPrimitive(\[\]) == ToNumber(false) 了；而 ToPrimitive 默认调用 toString 方法，于是 ToPrimitive(\[\]) 就是空字符串，而 ToNumber(false) 就是 0；那么最后就成为了 "" == 0，这种形态，此时是 String 和 Number 之间的比较，很明显就是 toNumber("") == 0 的比较了，根据 ToNumber 的转换规则，toNumber("")=0，于是 \[\] == !\[\] 最后成了 0 == 0 的问题，答案显而易见为 true。

## 总结一下

最后，我们总结一下 == 运算的规则：

* undefined == null，结果是 true。且它俩与所有其他值比较的结果都是 false。
* String == Boolean，需要两个操作数同时转为 Number。
* String/Boolean == Number，需要 String/Boolean 转为 Number。
* Object == Primitive，需要 Object 转为 Primitive(具体通过 valueOf 和 toString方法)。

所以，其实只有 4 条规则！只要我们完全理解了这四条规则，以后再遇到 == 就不会头疼了！

## 一些经典题目

```javascript
\[\]==\[\]  //false
{}=={}  //false
\[\]==!\[\]  //true
{}==!{}  //false
{}==!\[\]  //VM1896:1 Uncaught SyntaxError: Unexpected token ==
!\[\]=={}  //false
\[\]==!{}  //true
undefined==null  //true
+0 === -0  //true
NaN == NaN  //false
NaN !== false  //true
```

> 更新自2017-8-4：根据[stackoverflow上的一个讨论](https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric)，我发现还有如下规则：2e308 === Infinity，原因是**2e308 > Number.MAX_VALUE**，所以其相当于是无穷大，负无穷大同理。

## 参考文章

* [JavaScript 中的相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)
* [JS比较表](http://dorey.github.io/JavaScript-Equality-Table/)
* [从\[\]==!\[\]为true来剖析JavaScript各种蛋疼的类型转换](https://segmentfault.com/a/1190000008432611)
* [通过一张简单的图，让你彻底地、永久地搞懂JS的==运算](http://www.admin10000.com/document/9242.html)
* [Javascript 中 == 和 === 区别是什么？](https://www.zhihu.com/question/31442029)