---
title: 读书笔记系列（9）——你不知道的JavaScript（上卷）
urlname: you-dont-know-js-volume1
id: 1403
categories:
  - 笔记
tags:
  - JS
  - 笔记
date: 2017-10-10 19:42:12
img: /images/hexo_thumbnail_35.jpg
---

这本书在 github 上很火，而中文译本迟迟没有发行，最近出了中卷，我很早之前就听说了该大作，然而一直没有时间拜读，现在实习告一段落了，终于可以静下心来品味经典了。

## 作用域是什么

在传统编译语言的流程中，程序中的一段源代码在执行之前会经历三个步骤，统称为“编译”。

### 分词/词法分析

将字符串分解成有意义的代码块，这些代码块被称为词法单元（token），例如：`var a = 2;`，会被分解为下面这些词法单元：var、a、=、2、；

### 解析/语法分析

将语法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树，被称为“抽象语法树”（AST）。`var a = 2;` 的抽象语法树中可能会有一个叫作 VariableDeclaration 的顶级节点，接下来是一个叫作 Identifier (它的值是 a)的子节点，以及一个叫作 AssignmentExpression 的子节点。AssignmentExpression 节点有一个叫作 NumericLiteral(它的值是 2)的子节点。

### 代码生成

将 AST 转换为可执行代码。简单来说就是有某种方法可以将 `var a = 2;` 的 AST 转化为一组机器指令，用来创建一个叫作 a 的变量(包括分配内存等)，并将一个值储存在 a 中。 然而，比起那些编译过程只有三个步骤的语言的编译器，**JavaScript 引擎要复杂得多**。例如，在语法分析和代码生成阶段有特定的步骤来对运行性能进行优化，包括对冗余元素进行优化等。

对于 JavaScript 来说，大部分情况下编译发生在代码执行前的几微秒(甚至更短!)的时间内。

### 理解作用域

首先介绍将要参与到对程序 `var a = 2;` 进行处理的过程中的演员们。

#### 引擎

从头到尾负责整个 JavaScript 程序的编译及执行过程。

#### 编译器

引擎的好朋友之一，负责语法分析及代码生成等脏活累活(详见前一节的内容)。

#### 作用域

引擎的另一位好朋友，负责收集并维护由所有声明的标识符(变量)组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。

### 变量的赋值操作

变量的赋值操作会执行两个动作，首先编译器会在当前作用域中声明一个变量(如果之前没有声明过)，然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对它赋值。（我们在面试时会经常遇到变量为undefined的问题，其实就是这个道理）

#### 编译器有话说

当变量出现在赋值操作的左侧时进行 LHS 查询，出现在右侧时进行 RHS 查询。

讲得更准确一点，RHS 查询与简单地查找某个变量的值别无二致，而 LHS 查询则是试图找到变量的容器本身，从而可以对其赋值。从这个角度说，RHS 并不是真正意义上的“赋值操作的右侧”，更准确地说是“非左侧”。

#### 引擎和作用域的对话

```javascript
function foo(a) { console.log( a ); // 2
}
foo( 2 );
```

让我们把上面这段代码的处理过程想象成一段对话，这段对话可能是下面这样的。

> 引擎:我说作用域，我需要为 foo 进行 RHS 引用。你见过它吗?
> 作用域:别说，我还真见过，编译器那小子刚刚声明了它。它是一个函数，给你。
> 引擎:哥们太够意思了!好吧，我来执行一下 foo。
> 引擎:作用域，还有个事儿。我需要为 a 进行 LHS 引用，这个你见过吗?
> 作用域:这个也见过，编译器最近把它声名为 foo 的一个形式参数了，拿去吧。
> 引擎:大恩不言谢，你总是这么棒。现在我要把 2 赋值给 a。
> 引擎:哥们，不好意思又来打扰你。我要为 console 进行 RHS 引用，你见过它吗?
> 作用域:咱俩谁跟谁啊，再说我就是干这个。这个我也有，console 是个内置对象。 给你。
> 引擎:么么哒。我得看看这里面是不是有 log(..)。太好了，找到了，是一个函数。
> 引擎:哥们，能帮我再找一下对 a 的 RHS 引用吗?虽然我记得它，但想再确认一次。
> 作用域:放心吧，这个变量没有变动过，拿走，不谢。 引擎:真棒。我来把 a 的值，也就是 2，传递进 log(..)。 ......

### 小结

JavaScript 引擎首先会在代码执行前对其进行编译，在这个过程中，像 `var a = 2` 这样的声明会被分解成两个独立的步骤:

1.  首先，var a 在其作用域中声明新变量。这会在最开始的阶段，也就是代码执行前进行。
2.  接下来，a = 2 会查询(LHS 查询)变量 a 并对其进行赋值。

不成功的 RHS 引用会导致抛出 ReferenceError 异常。不成功的 LHS 引用会导致自动隐式地创建一个全局变量(非严格模式下)，该变量使用 LHS 引用的目标作为标识符，但是如果对结果的操作是非法或不合理的，会抛出 TypeError 异常，或者直接抛出 ReferenceError 异常(严格模式下)。

## 词法作用域

### 变量查找

全局变量会自动成为全局对象(比如浏览器中的 window 对象)的属性，因此可以不直接通过全局对象的词法名称，而是间接地通过对全局对象属性的引用来对其进行访问。 window.a 通过这种技术可以访问那些被同名变量所遮蔽的全局变量。但非全局的变量如果被遮蔽了，无论如何都无法被访问到。

**无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定。**

### 欺骗词法

如果词法作用域完全由写代码期间函数所声明的位置来定义，怎样才能在运行时来“修改”(也可以说欺骗)词法作用域呢? JavaScript 中有两种机制来实现这个目的。

1. eval
2. with

欺骗词法作用域会导致性能下降。

#### eval

在执行 eval(..) 之后的代码时，引擎并不“知道”或“在意”前面的代码是以动态形式插入进来，并对词法作用域的环境进行修改的。引擎只会如往常地进行词法作用域查找。

在严格模式的程序中，eval(..) 在运行时有其自己的词法作用域，意味着其中的声明无法修改所在的作用域。

```javascript
function foo(str) {
    "use strict"; 
    eval( str ); 
    console.log( a ); // ReferenceError: a is not defined 
} 

foo( "var a = 2" );
```

JavaScript 中还有其他一些功能效果和 `eval(..)` 很 相 似。setTimeout(..) 和 setInterval(..) 的第一个参数可以是字符串，字符串的内容可以被解释为一段动态生成的函数代码。这些功能已经过时且并不被提倡。不要使用它们! new Function(..) 函数的行为也很类似，最后一个参数可以接受代码字符串，并将其转化为动态生成的函数(前面的参数是这个新生成的函数的形参)。这种构建函数的语法比 eval(..) 略微安全一些，但也要尽量避免使用。

#### with

with 通常被当作重复引用同一个对象中的多个属性的快捷方式，可以不需要重复引用对象本身。with 的副作用通过一个简单的例子就可以看到：

```javascript
function foo(obj) {
    with (obj) {
        a = 2; 
    }
}
var o1 = { 
    a: 3
};
var o2 = { 
    b: 3
};

foo( o1 );
console.log( o1.a ); // 2

foo( o2 );
console.log( o2.a ); // undefined
console.log( a ); // 2——不好，a 被泄漏到全局作用域上了!
```

with 可以将一个没有或有多个属性的对象处理为一个完全隔离的词法作用域，因此**这个对象的属性也会被处理为定义在这个作用域中的词法标识符**。

结合上面的例子，o2 的作用域、foo(..) 的作用域和全局作用域中都没有找到标识符 a，因此当 a=2 执行时，**自动创建了一个全局变量**(因为是非严格模式)。

#### 性能

如果引擎在代码中发现了 eval(..) 或 with，它只能简单地假设关于标识符位置的判断都是无效的，因为无法在词法分析阶段明确知道 eval(..) 会接收到什么代码，这些代码会如何对作用域进行修改，也无法知道传递给 with 用来创建新词法作用域的对象的内容到底是什么。 最悲观的情况是如果出现了 eval(..) 或 with，所有的优化可能都是无意义的，因此最简单的做法就是完全不做任何优化。 如果代码中大量使用 eval(..) 或 with，那么运行起来一定会变得非常慢。无论引擎多聪明，试图将这些悲观情况的副作用限制在最小范围内，也无法避免如果没有这些优化，代码会运行得更慢这个事实。

## 函数作用域和块作用域

### 函数中的作用域

函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复 用(事实上在嵌套的作用域中也可以使用)。这种设计方案是非常有用的，能充分利用 JavaScript 变量可以根据需要改变值类型的“动态”特性。

### 全局命名空间

某些库通常会在全局作用域中声明一个名字足够独特的变量，通常是一个对象。这个对象被用作库的命名空间，所有需要暴露给外界的功能都会成为这个对象(命名空间)的属性，而不是将自己的标识符暴漏在顶级的词法作用域中：

```javascript
var MyReallyCoolLibrary = { 
    awesome: "stuff", 
    doSomething: function() {
        // ... 
    },
    doAnotherThing: function() {
        // ...
    } 
};
```

### 匿名和具名

```javascript
setTimeout( function() {
    console.log("I waited 1 second!");
}, 1000 );
```

这叫作匿名函数表达式，因为 function().. 没有名称标识符。函数表达式可以是匿名的，而函数声明则不可以省略函数名——在 JavaScript 的语法中这是非法的。

### 然而，匿名函数也有几个缺点：

1. 匿名函数在栈追踪中不会显示出有意义的函数名，使得**调试很困难**。
2. 如果没有函数名，当函数需要引用自身时只能使用已经过期的**arguments.callee**引用， 比如在递归中。另一个函数需要引用自身的例子，是在事件触发后事件监听器需要解绑自身。
3. 匿名函数省略了对于代码可读性/可理解性很重要的函数名。**一个描述性的名称可以让代码不言自明**。

综合考虑而言，始终给函数表达式命名是一个最佳实践（下面的例子叫做行内函数表达式）：

```javascript
setTimeout( function timeoutHandler() { // <-- 快看，我有名字了! 
    console.log( "I waited 1 second!" );
}, 1000 );
```

### 立即执行函数表达式

立即执行函数表达式（IIFE）有两种形式：

1. (function foo(){ .. })()
2. (function foo(){ .. }())

这两种形式在功能上是一致的，**选择哪个全凭个人喜好**。

### IIFE的用途

#### 把它们当做函数调用并传递参数进去：

```javascript
var a = 2;
(function IIFE( global ) {
    var a = 3;
    console.log( a ); // 3 
    console.log( global.a ); // 2
})( window );
console.log( a ); // 2
```

#### 解决 undefined 标识符的默认值被错误覆盖导致的异常(虽然不常见)

将一个参数命名为 undefined，但是在对应的位置不传入任何值，这样就可以保证在代码块中 undefined 标识符的值真的是 undefined:

```javascript
undefined = true; // 给其他代码挖了一个大坑!绝对不要这样做! 
(function IIFE( undefined ) {
    var a;
    if (a === undefined) {
        console.log( "Undefined is safe here!" );
    }
})();
```

#### 倒置代码的运行顺序，将需要运行的函数放在第二位，在IIFE执行之后当作参数传递进去

```javascript
var a = 2;
(function IIFE( def ) { 
    def( window );
})(function def( global ) {
    var a = 3;
    console.log( a ); // 3 
    console.log( global.a ); // 2
});
```

函数表达式 def 定义在片段的第二部分，然后当作参数(这个参数也叫作 def)被传递进 IIFE 函数定义的第一部分中。最后，参数 def(也就是传递进去的函数)被调用，并将 window 传入当作 global 参数的值。

### 块作用域

块作用域的例子：

#### with

with就是块作用域的一个例子（形式），用with从对象中创建出的作用域仅在with声明中而非外部作用域中有效

#### try/catch

try/catch 是 ES3 的规范，而很少有人注意到，**catch 分句会创建一个块作用域，其中声明的变量仅在 catch 内部有效**

> 尽管这个行为已经被标准化，并且被大部分的标准 JavaScript 环境(除了老 版本的 IE 浏览器)所支持，但是当同一个作用域中的两个或多个 catch 分句 用同样的标识符名称声明错误变量时，很多静态检查工具还是会发出警告。 实际上这并不是重复定义，因为所有变量都被安全地限制在块作用域内部， 但是静态检查工具还是会很烦人地发出警告。

#### let

ES6 引入的 let 关键字可以将变量绑定到所在的任意作用域中(通常是{ .. }内部)。换句话说，let 为其声明的变量隐式地了所在的块作用域。 但是，let 进行的声明不会在块作用域中进行提升。声明的代码被运行之前，声明并不“存在”：

```javascript
{
    console.log( bar ); // ReferenceError! 
    let bar = 2;
}
```

#### const

ES6 还引入了 const，同样可以用来创建块作用域变量，但是其值是固定的

### 提升

#### 先有鸡还是先有蛋

首先，抛出两个例子，也是很经典的JS的“坑”：

```javascript
a = 2;
var a; 
console.log(a); // 2

console.log(a); // undefined 
var a = 2;
```

关于这一奇怪现象，可以用一句话概括：**包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理** 当你看到 var a = 2; 时，可能会认为这是一个声明。但 JavaScript 实际上会将其看成两个——声明:var a;和a = 2;。第一个定义声明是在编译阶段进行的。第二个赋值声明会被留在原地等待执行阶段。 换句话说，**先有蛋（声明）后又鸡（赋值）**；所以上面的两个例子会以如下形式进行处理： 例子一：（第一部分是编译，第二部分是执行）

```javascript
var a;
a = 2; 
console.log(a);
```

例子二：

```javascript
var a;
console.log(a);
a = 2;
```

再举一个例子：

```javascript
foo(); // 不是 ReferenceError, 而是 TypeError!
var foo = function bar() { 
    // ...
};
```

这段程序中的变量标识符 foo() 被提升并分配给所在作用域(在这里是全局作用域)，因此foo() 不会导致 ReferenceError。但是 foo 此时并没有赋值(如果它是一个函数声明而不是函数表达式，那么就会赋值)。**foo() 由于对 undefined 值进行函数调用而导致非法操作，因此抛出 TypeError 异常**。

从上面的例子，我们还可以得出：**函数声明会被提升，但是函数表达式不会被提升**

### 函数优先

函数声明和变量声明都会被提升。但是一个值得注意的细节是函数会首先被提升，然后才是变量。考虑下面的例子：

```javascript
foo(); // 3
function foo() { 
    console.log(1);
}
var foo = function() { 
    console.log(2);
};
function foo() { 
    console.log(3);
}
```

上面的例子会被引擎理解为如下形式：

```javascript
function foo() { 
    console.log(3);
}
foo(); // 3
```

从这两段代码我们可以得出两个结论：

1. var foo 尽管出现在 function foo()...的声明之前，但它是重复的声明(因此**被忽略**了)，因为函数声明会被提升到普通变量之前。
2. 尽管重复的 var 声明会被忽略掉，但**出现在后面的函数声明还是可以覆盖前面的**。

## 作用域闭包

### 老生常谈，闭包是什么

划重点：当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。 这一部分之前已经讲了很多次了，感觉这本书也没有很多新意，所以想了解闭包的童鞋可以参见我的另一篇文章：[前端面试系列（10）——JS中的闭包](/daizhengli/123.html)

### 不太显性的闭包

其实，你已经写过的代码中一定到处都是闭包的身影。

#### setTimeout

```javascript
function wait(message) {
    setTimeout(function timer() {
        console.log(message);
    }, 1000 );
}
wait("Hello, closure!");
```

将一个内部函数(名为 timer)传递给 setTimeout(..)。timer 具有涵盖 wait(..) 作用域 的闭包，因此还保有对变量 message 的引用。wait(..) 执行 1000 毫秒后，它的内部作用域并不会消失，**timer 函数依然保有 wait(..) 作用域的闭包**。

#### jQuery 或其他 JS 框架

```javascript
function setupBot(name, selector) {
    $( selector ).click( function activator() {
        console.log( "Activating: " + name ); 
    });
}
setupBot( "Closure Bot 1", "#bot_1" );
setupBot( "Closure Bot 2", "#bot_2" );
```

本质上无论何时何地，如果将函数(访问它们各自的词法作用域)当作第一级的值类型并到处传递，你就会看到闭包在这些函数中的应用。在定时器、事件监听器、Ajax请求、跨窗口通信、Web Workers 或者任何其他的异步(或者同步)任务中，只要使用了回调函数，实际上就是在使用闭包!

#### IIFE

```javascript
var a=2;
(function IIFE() { 
    console.log( a );
})();
```

虽然这段代码可以正常工作，但严格来讲它并不是闭包。为什么?因为函数(示例代码中的 IIFE)并不是在它本身的词法作用域以外执行的。它在定义时所在的作用域中执行(而外部作用域，也就是全局作用域也持有 a)。a 是通过普通的词法作用域查找而非闭包被发现的。 尽管 IIFE 本身并不是观察闭包的恰当例子，但它的确创建了闭包，并且也是最常用来创建可以被封闭起来的闭包的工具。因此 IIFE 的确同闭包息息相关，即使本身并不会真的使用闭包。

### 块作用域和闭包

一道很经典的面试题：

```javascript
for (var i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
```

这段代码在运行时会以每秒一次的频率输出五次 6，具体原因就不再赘述了。。而如果我们想让他连续输出1 2 3 4 5应该怎么办呢？有两种方法:

#### 利用闭包

```javascript
for (var i=1; i<=5; i++) { 
    (function(j) {
        setTimeout( function timer() { 
            console.log( j );
        }, j*1000 ); 
    })(i);
}
```

#### 闭包+块作用域

```javascript
for (let i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
```

### 模块

#### 模块有两个主要特征：

1. 为创建内部作用域而调用了一个包装函数;
2. 包装函数的返回 值必须至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包。

ES6 的模块没有“行内”格式，必须被定义在独立的文件中(一个文件一个模块)。浏览器或引擎有一个默认的“模块加载器”(可以被重载，但这远超出了我们的讨论范围)可以在导入模块时异步地加载模块文件。 模块文件中的内容会被当作好像包含在作用域闭包中一样来处理，就和前面介绍的函数闭包模块一样。

#### 动态作用域与词法作用域

下面一段代码很有意思：

```javascript
function foo() {
    console.log( a ); // 2(不是3!)
}
function bar() { 
    var a = 3;
    foo(); 
}
vara=2;
bar();
```

如果 JS 是动态作用域，上面将会输出 3，因为当 foo() 无法找到 a 的变量引用时，会顺着调用栈在调用 foo() 的地方查找 a，而不是在嵌套的词法作用域链中向上查找。由于 foo() 是在 bar() 中调用的，引擎会检查 bar() 的作用域，并在其中找到值为 3 的变量 a。 需要明确的是，事实上 JavaScript 并不具有动态作用域。它只有词法作用域，简单明了。但是 this 机制某种程度上很像动态作用域。 主要区别：词法作用域是在写代码或者说定义时确定的，而动态作用域是在运行时确定的。(this也是!)词法作用域关注函数在何处声明，而动态作用域关注函数从何处调用。

## 关于this

### 误解

有两种常见的对于this的解释，但是它们都是错误的：

#### 指向自身

人们很容易把 this 理解成指向函数自身，然而如果要从函数对象内部引用它自身，那只使用 this 是不够的。一般来说你需要通过一个指向函数对象的词法标识符(变量)来引用它。 思考一下下面这两个函数：

```javascript
function foo() {
    foo.count = 4; // foo 指向它自身
}
setTimeout( function(){
    // 匿名(没有名字的)函数无法指向自身
},10);
```

第一个函数被称为具名函数，在它内部可以使用 foo 来引用自身。 但是在第二个例子中，传入 setTimeout(..) 的回调函数没有名称标识符(这种函数被称为匿名函数)，因此无法从函数内部引用自身。

#### 它的作用域

第二种常见的误解是，this 指向函数的作用域。这个问题有点复杂，因为在某种情况下它是正确的，但是在其他情况下它却是错误的。 **每当你想要把this和词法作用域的查找混合使用时，一定要提醒自己，这是无法实现的。**

### this到底是什么

this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。**this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。** 当一个函数被调用时，会创建一个活动记录(有时候也称为执行上下文)。这个记录会包含函数在哪里被调用(调用栈)、函数的调用方法、传入的参数等信息。this 就是记录的其中一个属性，会在函数执行的过程中用到。

## this全面解析

### 调用位置

在理解 this 的绑定过程之前，首先要理解调用位置：**调用位置就是函数在代码中被调用的位置(而不是声明的位置)**；然而做起来并没有这么简单，因为某些编程模式可能会隐藏真正的调用位置。最重要的是要分析调用栈(就是为了到达当前执行位置所调用的所有函数)。我们关心的调用位置就在当前正在执行的函数的前一个调用中。 下面通过一个例子来看看到底什么是调用栈和调用位置：

```javascript
function baz() {
    // 当前调用栈是:baz
    // 因此，当前调用位置是全局作用域
    console.log( "baz" );
    bar(); // <-- bar 的调用位置 
}

function bar() {
    // 当前调用栈是 baz -> bar
    // 因此，当前调用位置在 baz 中
    console.log( "bar" );
    foo(); // <-- foo 的调用位置
}

function foo() {
    // 当前调用栈是 baz -> bar -> foo
    // 因此，当前调用位置在 bar 中
    console.log( "foo" );
}
baz(); // <-- baz 的调用位置
```

### 绑定规则

我们来看看在函数的执行过程中调用位置如何决定 this 的绑定对象。你必须找到调用位置，然后判断需要应用下面四条规则中的哪一条。我们首先会分别解释这四条规则，然后解释多条规则都可用时它们的优先级如何排列。

#### 默认绑定

```javascript
function foo() { 
    console.log( this.a );
}
vara = 2;
foo(); // 2
```

this.a 被解析成了全局变量 a。为什么?因为在本例中，函数调用时应用了 this 的默认绑定，因此 this 指向全局对象。在代码中，foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。 如果使用严格模式(strict mode)，那么全局对象将无法使用默认绑定，因此**this会绑定到 undefined** 这里有一个微妙但是非常重要的细节，虽然 this 的绑定规则完全取决于调用位置，但是**只有foo()运行在非strict mode下时，默认绑定才能绑定到全局对象；严格模式下与foo() 的调用位置无关：**

```javascript
function foo() {
    console.log( this.a );
}
var a = 2;

(function(){
    "use strict";
    foo(); // 2
})();
```

#### 隐式绑定

另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。

```javascript
function foo() {
    console.log( this.a );
}
var obj={
    a: 2,
    foo: foo
};
obj.foo(); // 2
```

**调用位置会使用 obj 上下文来引用函数**，因此你可以说**函数foo被调用时 obj 对象“拥有”或者“包含”它**。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。因为调用 foo() 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的。 对象属性引用链中只有最顶层或者说最后一层会影响调用位置。举例来说:

```javascript
function foo() {
    console.log( this.a );
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo(); // 42
```

#### 显示绑定

可以使用函数的 call(..) 和 apply(..) 方法。这两个方法是如何工作的呢？它们的第一个参数是一个对象，它们会把这个对象绑定到 this，接着在调用函数时指定这个this。因为你可以直接指定 this 的绑定对象，因此我们称之为显式绑定。

```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a:2
};
foo.call( obj ); // 2
```

通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。 从 this 绑定的角度来说，call(..) 和 apply(..) 是一样的，它们的区别体现在其他的参数上，但是现在我们不用考虑这些。 **硬绑定**

```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a:2
};
var bar = function() {
    foo.call( obj );
};
bar(); // 2
setTimeout( bar, 100 ); // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call( window ); // 2
```

无论我们如何调用函数 bar，它总会手动在 obj 上调用 foo。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。由于硬绑定是一种非常常用的模式，所以在 ES5 中提供了内置的方法 Function.prototype. bind，它的用法如下：

```javascript
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}
var obj = {
    a:2
};
var bar = foo.bind( obj );
var b = bar(3);//23
console.log( b ); // 5
```

bind(..) 会返回一个硬编码的新函数，它会把参数设置为 this 的上下文并调用原始函数。

#### new绑定

JS 中 new 的机制和面向类的语言完全不同：实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行\[\[原型\]\]连接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

一个简单的例子来解释 new 绑定：

```javascript
function foo(a) {
    this.a = a;
}
var bar = new foo(2);
console.log( bar.a ); // 2
```

**使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this 上。**

#### 优先级

（原书中通过很多例子得到了上面四种绑定方式的优先级，这里就不再赘述了。。） 我们可以按照下面的顺序来进行判断：

1. 函数是否在new中调用(new 绑定)？如果是的话this绑定的是新创建的对象。 var bar = new foo()
2. 函数是否通过 call、apply(显式绑定)或者硬绑定调用?如果是的话，this 绑定的是 指定的对象。 var bar = foo.call(obj2)
3. 函数是否在某个上下文对象中调用(隐式绑定)？如果是的话，this 绑定的是那个上 下文对象。 var bar = obj1.foo()
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到 全局对象。 var bar = foo()

然而，凡事总有例外。

#### 绑定例外

在某些场景下 this 的绑定行为会出乎意料，你认为应当应用其他绑定规则时，实际上应用的可能是默认绑定规则。

#### 被忽略的this

如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则:

```javascript
function foo() {
    console.log( this.a );
}
vara=2;
foo.call( null ); // 2
```

一般，如果函数并不关心 this 的话，你仍然需要传入一个占位值，这时 null 可能是一个不错的选择。 然而，总是使用 null 来忽略 this 绑定可能产生一些副作用。如果某个函数确实使用了this(比如第三方库中的一个函数)，那默认绑定规则会把 this 绑定到全局对象(在浏览器中这个对象是 window)，这将导致不可预计的后果(比如修改全局对象)。 划重点：**Object.create(null)和{}很像，但是并不会创建Object.prototype 这个委托，所以它比 {}“更空”**

#### 间接引用

你有可能(有意或者无意地)创建一个函数的“间接引用”，在这种情况下，调用这个函数会应用默认绑定规则。而间接引用最容易在赋值时发生：

```javascript
function foo() {
    console.log( this.a );
}
var a = 2;
var o = { a:3, foo: foo};
var p = { a:4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2
```

赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此**调用位置是 foo() 而不是 p.foo() 或者 o.foo()**。根据我们之前说过的，这里会应用默认绑定。

#### 软绑定

硬绑定会大大降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显式绑定来修改 this。 如果可以给默认绑定指定一个全局对象和 undefined 以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改 this 的能力。 下面是一种被称为软绑定的方法，有时间的话可以研究一下：

```javascript
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this;
        // 捕获所有 curried 参数
        var curried = \[\].slice.call( arguments, 1 );
        var bound = function() {
            return fn.apply(
                (!this || this === (window || global)) ?
                    obj : this
                curried.concat.apply( curried, arguments )
            );
        };
        bound.prototype = Object.create( fn.prototype );
        return bound;
    };
}
```

### this语法

ES6 中介绍了一种无法使用这些规则的特殊函数类型：箭头函数。箭头函数并不是使用 function 关键字定义的，而是使用被称为“胖箭头”的操作符 => 定义的。**箭头函数不使用 this 的四种标准规则，而是根据外层(函数或者全局)作用域来决定 this**。

```javascript
function foo() {
    // 返回一个箭头函数
    return (a) => {
        //this 继承自 foo()
        console.log( this.a );
    };
}
var obj1 = {
    a:2
};
var obj2 = {
    a:3
};
var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, 不是3!
```

foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1， bar(引用箭头函数)的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。(new 也不 行!)

## 对象

### 语法

对象可以通过两种形式定义:声明(文字)形式和构造形式。

#### 文字形式（对象字面量）

```javascript
var myObj = {
    key: value
    // ... 
};
```

#### 构造形式

```javascript
var myObj = new Object();
myObj.key = value;
```

构造形式和文字形式生成的对象是一样的。唯一的区别是，在文字声明中你可以添加多个键值对，但是在构造形式中你必须逐个添加属性。

### 类型

在 JavaScrip t中一共有六种主要类型（语言类型）：

* string
* number
* boolean
* null
* undefined
* object

简单基本类型(string、boolean、number、null 和 undefined)本身并不是对象。 null 有时会被当作一种对象类型，但是这其实只是语言本身的一个 bug，即对 null 执行 typeof null 时会返回字符串 "object"。实际上，**null 本身是基本类型**。

> 原理是这样的，不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判 断为 object 类型，null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“object”。

### 内置对象

JavaScript 中还有一些对象子类型，通常被称为内置对象。

* String
* Number
* Boolean
* Object
* Function
* Array
* Date
* RegExp
* Error

### 自动转换

```javascript
var strPrimitive = "I am a string";
console.log( strPrimitive.length ); // 13
console.log( strPrimitive.charAt( 3 ) ); // "m"
```

使用以上两种方法，我们都可以直接在字符串字面量上访问属性或者方法，之所以可以这样做，是因为**引擎自动把字面量转换成 String 对象**，所以可以访问属性和方法。同样的事也会发生在数值字面量上 null 和 undefined 没有对应的构造形式，它们只有文字形式。相反，Date 只有构造，没有文字形式（只能通过 new Date() 创建一个 Date 对象）。

### 内容

```javascript
var myObject = {
    a:2
};
myObject.a; // 2
myObject\["a"\]; // 2
```

.a 语法通常被称为“**属性访问**”，\["a"\] 语法通常被称为“**键访问**”。这两种语法的主要区别在于 . 操作符要求属性名满足标识符的命名规范，而 \[".."\] 语法可以接受任意 UTF-8/Unicode 字符串作为属性名。 在对象中，属性名永远都是字符串。如果你使用 string(字面量)以外的其他值作为属性名，那它首先会被转换为一个字符串。即使是数字也不例外，虽然在数组下标中使用的的确是数字，但是在对象属性名中数字会被转换成字符串，所以当心不要搞混对象和数组中数字的用法：

```javascript
var myObject = { };

myObject\[true\] = "foo";
myObject\[3\] = "bar";
myObject\[myObject\] = "baz";

myObject\["true"\]; // "foo"
myObject\["3"\]; // "bar"
myObject\["\[object Object\]"\]; // "baz"
```

### 数组

数组也是对象，所以虽然每个下标都是整数，你仍然可以给数组添加属性：

```javascript
var myArray = \[ "foo", 42, "bar" \];
myArray.baz = "baz";
myArray.length; // 3
myArray.baz; // "baz"
```

可以看到虽然添加了命名属性(无论是通过 . 语法还是 \[\] 语法)，**数组的 length 值并未发生变化**。但是，如果你试图向数组添加一个属性，但是属性名“看起来”像一个数字，那它会变成一个数值下标(因此会修改数组的内容而不是添加一个属性)：

```javascript
var myArray = \[ "foo", 42, "bar" \];
myArray\["4"\] = "baz";
myArray.length; // 5
myArray\[4\]; // "baz"
myArray\[3\]; // undefined
```

### Object.defineProperty

在创建普通属性时属性描述符会使用默认值，我们也可以使用 Object.defineProperty(..) 来添加一个新属性或者修改一个已有属性(如果它是 configurable)并对特性进行设置。

```javascript
var myObject = {};

Object.defineProperty( myObject, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});

myObject.a; // 2
```

### 不变性

有时候你会希望属性或者对象是不可改变(无论有意还是无意)的，在 ES5 中可以通过很多种方法来实现：

#### 对象常量

结合 writable: false 和 configurable: false 就可以创建一个真正的常量属性(不可修改、重定义或者删除):

```javascript
var myObject = {};
Object.defineProperty( myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false
});
```

#### 禁止扩展

如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(..)：

```javascript
var myObject = {
    a:2
};
Object.preventExtensions( myObject );
myObject.b = 3;
myObject.b; // undefined
```

#### 密封

Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用Object.preventExtensions(..) 并把所有现有属性标记为 configurable: false。 所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性(虽然可以修改属性的值)。

#### 冻结

Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(..) 并把所有“数据访问”属性标记为 writable: false，这样就无法修改它们的值。 **这个方法是你可以应用在对象上的级别最高的不可变性**，它会禁止对于对象本身及其任意直接属性的修改(不过就像我们之前说过的，这个对象引用的其他对象是不受影响的)。

#### 数组上不要用for..in循环

在数组上应用 for..in 循环有时会产生出人意料的结果，因为这种枚举不仅会包含所有数值索引，还会包含所有可枚举属性。最好只在对象上应用 for..in 循环，如果要遍历数组就使用传统的 for 循环来遍历数值索引。

### 遍历

#### ES5中增加了一些数组的辅助迭代器：

1. forEach(..)：遍历数组中的所有值并忽略回调函数的返回值
2. every(..)：会一直运行直到回调函数返回 false
3. some(..)：会一直运行直到回调函数返回 true

## 混合对象“类”

### 类的机制

#### 构造函数

类实例是由一个特殊的类方法构造的，这个方法名通常和类名相同，被称为构造函数。这个方法的任务就是初始化实例需要的所有信息(状态)。 类构造函数属于类，而且通常和类同名。此外，构造函数大多需要用 new 来调，这样语言引擎才知道你想要构造一个新的类实例。

#### JS中的类

在传统的面向类的语言中 super 有一个功能，就是**从子类的构造函数中通过 super 可以直接调用父类的构造函数**。通常来说这没什么问题，因为对于真正的类来说，构造函数是属于类的。然而，在 JavaScript 中恰好相反——**实际上“类”是属于构造函数的**(类似 Foo.prototype... 这样的类型引用)。由于**JavaScript 中父类和子类的关系只存在于两者构造函数对应的 .prototype 对象中**，因此它们的构造函数之间并不存在直接联系，从而无法简单地实现两者的相对引用

> 注: 其实这一部分还蛮重要的，而原文也通过比较大量的篇幅对JS中的“类”进行了介绍，只不过我感觉没有什么与众不同之处就略过了，对这一部分还不太熟悉的童鞋可以自己研究一下。。

## 原型

### \[\[Prototype\]\]

JavaScript 中的对象有一个特殊的 \[\[Prototype\]\] 内置属性，其实就是对于其他对象的引用。几乎所有的对象在创建时 \[\[Prototype\]\] 属性都会被赋予一个非空的值。 而\[\[Prototype\]\]的作用是：对于默认的 \[\[Get\]\] 操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的 \[\[Prototype\]\] 链：

```javascript
var anotherObject = {
    a:2
};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create( anotherObject );
myObject.a; // 2
```

使用 for..in 遍历对象时原理和查找 \[\[Prototype\]\] 链类似，任何可以通过原型链访问到(并且是 enumerable)的属性都会被枚举。使用 in 操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链(无论属性是否可枚举)

### Object.prototype

**所有普通的 \[\[Prototype\]\] 链最终都会指向内置的 Object.prototype**。由于所有的“普通”(内置，不是特定主机的扩展)对象都“源于”(或者说把 \[\[Prototype\]\] 链的顶端设置为)这个 Object.prototype 对象，所以它包含 JavaScript 中许多通用的功能。

### 属性屏蔽

如果属性名 foo 既出现在 myObject 中也出现在 myObject 的 \[\[Prototype\]\] 链上层，那么就会发生屏蔽。myObject 中包含的 foo 属性会屏蔽原型链上层的所有 foo 属性，因为**myObject.foo 总是会选择原型链中最底层的 foo 属性**。

```javascript
var anotherObject = {
    a:2
};
var myObject = Object.create( anotherObject );

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false

myObject.a++; // 隐式屏蔽!

anotherObject.a; // 2
myObject.a; // 3
myObject.hasOwnProperty( "a" ); // true
```

尽管 myObject.a++ 看起来应该(通过委托)查找并增加 anotherObject.a 属性，但是别忘了**++操作相当于myObject.a = myObject.a + 1**。因此++操作首先会通过\[\[Prototype\]\]查找属性 a 并从 anotherObject.a 获取当前属性值 2，然后给这个值加 1，接着用 \[\[Put\]\] 将值 3 赋给 myObject 中新建的屏蔽属性 a，天呐!

### “类”

#### “类”函数

所有的函数默认都会拥有一个名为 prototype 的公有并且不可枚举(参见第 3 章)的属性，它会指向另一个对象：

```javascript
function Foo() {
    // ...
}
Foo.prototype; // { }
```

这个对象通常被称为 Foo 的原型，然而，如果是我的话就 会叫它“之前被称为 Foo 的原型的那个对象”。好吧我是开玩笑的，你觉得“**被贴上‘Foo 点 prototype’标签的对象**”这个名字怎么样？最直接的解释就是，这个对象是在调用new Foo()时创建的，最后会被(有点武断地)关联到这个“Foo 点 prototype”对象上。

#### 继承与原型

继承意味着复制操作，JavaScript(默认)并不会复制对象属性。相反，JavaScript 会在两个对象之间创建一个关联，这样一个对象就可以通过委托访问另一个对象的属性和函数。委托(参见第 6 章)这个术语可以更加准确地描述 JavaScript 中对象的关联机制。

#### 构造函数还是调用

在JS中，**new 会劫持所有普通函数并用构造对象的形式来调用它**。换句话说，在 JavaScript 中对于“构造函数”最准确的解释是，所有带 new 的函数调用。函数不是构造函数，但是**当且仅当使用 new 时，函数调用会变成“构造函数调用”**。

#### constructor 并不表示被构造

function Foo() { /* .. */ }
Foo.prototype = { /* .. */ }; // 创建一个新原型对象
var a1 = new Foo();
a1.constructor === Foo; // false! a1.constructor === Object; // true!

a1 并没有 .constructor 属性，所以它会委托 \[\[Prototype\]\] 链上的 Foo.prototype。但是这个对象也没有 .constructor 属性(不过**默认的 Foo.prototype 对象有这个属性**!)，所以它会继续委托，这次会委托给委托链顶端的 Object.prototype。这个对象有 .constructor 属性，指向内置的 Object(..) 函数。 a1.constructor 是一个非常不可靠并且不安全的引用。通常来说要尽量避免使用这些引用。

#### （原型）继承

### Object.setPrototypeOf(...)

ES6 添加了辅助函数 Object.setPrototypeOf(..)，可以用标准并且可靠的方法来修改关联：

```javascript
// ES6 之前需要抛弃默认的 Bar.prototype
Bar.ptototype = Object.create( Foo.prototype );
// ES6 开始可以直接修改现有的 Bar.prototype 
Object.setPrototypeOf( Bar.prototype, Foo.prototype );
```

### 对象关联

\[\[Prototype\]\] 机制就是存在于对象中的一个内部链接，它会引用其他对象。 这个链接的作用是:如果在对象上没有找到需要的属性或者方法引用，引擎就会继续在 \[\[Prototype\]\] 关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的 \[\[Prototype\]\]，以此类推。这一系列对象的链接被称为“原型链”。

## 行为委托

委托行为意味着某些对象在找不到属性或者方法引用时会把这个请求委托给另一个对象。这是一种极其强大的设计模式，和父类、子类、继承、多态等概念完全不同。在你的脑海中对象并不是按照父类到子类的关系垂直组织的，而是通过任意方向的委托关联并排组织的。下面是一个例子：

```javascript
Task = {
    setID: function(ID) { this.id = ID; },
    outputID: function() { console.log( this.id ); }
};

// 让XYZ委托Task
XYZ = Object.create( Task );

XYZ.prepareTask = function(ID,Label) {
    this.setID( ID );
    this.label = Label;
};

XYZ.outputTaskDetails = function() {
    this.outputID();
    console.log( this.label );
};

// ABC = Object.create( Task );
// ABC ... = ...
```

在上面这段代码中，Task 和 XYZ 并不是类（或者函数），它们是对象。**XYZ 通过 Object. create(..) 创建，它的 \[\[Prototype\]\] 委托了 Task 对象**

### 互相委托（禁止）

你无法在两个或两个以上互相(双向)委托的对象之间创建循环委托。如果你把 B 关联到 A 然后试着把 A 关联到 B，就会出错。如果你引用了一个两边都不存在的属性或者方法，那就会在 \[\[Prototype\]\] 链上产生一个**无限递归的循环**。 所以互相委托是被禁止的。

### 调试

JavaScript 规范并不会控制浏览器中开发者工具对于特定值或者结构的表示方式，所以浏览器和工具的解析结果并不一定相同。下面是一个例子：

```javascript
function Foo() {}
var a1 = new Foo(); 
a1; // Foo {}
```

**这段代码在chrome中会输出：Foo {}；而在Firefox中会得到Object {}**

Chrome 实际上想说的是“**{} 是一个空对象，由名为 Foo 的函数构造**”。Firefox 想说的是“**{} 是一个空对象，由 Object 构造**”。之所以有这种细微的差别，是因为 **Chrome 会动态跟踪并把实际执行构造过程的函数名当作一个内置属性**，但是其他浏览器并不会跟踪这些额外的信息。

然而，这个行为被认定是 Chrome 的一个 bug，当你读到此书时，它可能已经被修复了。所以你看到的可能是

```javascript
a1; // Object {}。
```

### 类与对象

相比“类”的构造方式，**对象关联可以更好地支持关注分离（separation of concerns）原则**，创建和初始化并不需要合并为一个步骤。 对象关联除了能让代码看起来更简洁(并且更具扩展性)外还可以通过行为委托模式简化代码结构。

### 更好的语法

在 ES6 中，你可以使用对象的字面形式(这样就可以使用简洁方法定义)来改写之前繁琐的属性赋值语法(比如 AuthController 的定义)，然后用 Object.setPrototypeOf(..) 来修改它的 \[\[Prototype\]\]:

```javascript
// 使用更好的对象字面形式语法和简洁方法 
var AuthController = {
    errors: \[\],
    checkAuth() {
        // ... 
    },
    server(url, data) {
        // ...
    }
    // ... 
};

// 现在把 AuthController 关联到 LoginController
Object.setPrototypeOf( AuthController, LoginController );
```

### 内省

自省就是检查实例的类型。类实例的自省主要目的是通过创建方式来判断对象的结构和功能。

在 js 中，instanceof 语法会产生语义困惑而且非常不直观。如果你想检查对象 a1 和某个对象的关系，那必须使用另一个引用该对象的函数才行——你不能直接判断两个对象是否关联。

```javascript
function Foo() { /* .. */ }
function Bar() { /* .. */ }
Bar.prototype = Object.create( Foo.prototype ); // 让Foo和Bar互相关联

Bar.prototype instanceof Foo; // true
Bar instanceof Foo; // false
```

然而，又回到上面的那个问题，**如果通过对象关联的方式构造对象，内省的方法将更加简洁并且清晰**：

```javascript
var Foo = { /* .. */ };
var Bar = Object.create( Foo ); // 让Foo和Bar互相关联
var b1 = Object.create( Bar ); // 让b1关联到Foo和Bar

Foo.isPrototypeOf( Bar ); // true 
Object.getPrototypeOf( Bar ) === Foo; // true

Foo.isPrototypeOf( b1 ); // true 
Bar.isPrototypeOf( b1 ); // true 
Object.getPrototypeOf( b1 ) === Bar; // true
```

## 附录

### ES6中的Class

除了语法更好看之外，ES6 还解决了什么问题？

1. （基本上）不再引用杂乱的 .prototype 了；
2. 不再需要通过 Object.create(..) 来替换 .prototype 对象，也不需要设置 .\_\_proto\_\_ 或者 Object.setPrototypeOf(..)；
3. 可以通过 super(..) 来实现相对多态，这样任何方法都可以引用原型链上层的同名方法；
4. class 字面语法不能声明属性(只能声明方法)。看起来这是一种限制，但是它会排除掉许多不好的情况，可以帮助你避免犯错；
5. 可以通过 extends 很自然地扩展对象(子)类型，甚至是内置的对象(子)类型，比如 Array 或 RegExp。

然而，class 语法并没有解决所有的问题，你可能会认为 ES6 的 class 语法是向 JavaScript 中引入了一种新的“类”机制，其实不是这样。class 基本上只是现有 \[\[Prototype\]\](委托!)机制的一种语法糖。 也就是说，class 并不会像传统面向类的语言一样在声明时静态复制所有行为。如果你 (有意或无意)修改或者替换了父“类”中的一个方法，那子“类”和所有实例都会受到影响，因为**它们在定义时并没有进行复制，只是使用基于 \[\[Prototype\]\] 的实时委托。** 除此之外，class 还有以下问题：

1. **class 语法无法定义类成员属性（只能定义方法）；**
2. class 语法仍然面临**意外屏蔽**的问题；
3. super 并不是动态绑定this的，它会在声明时“静态”绑定。（可以通过 toMethod(...) 手动修改 super 绑定）

综上，class 最大的问题在于，像传统的类一样)它的语法有时会让你认为，定义了一个 class 后，它就变成了一个(未来会被实例化的)东西的静态定义。**你会彻底忽略 C 是一个对象，是一个具体的可以直接交互的东西。**

ES6 的 class 想伪装成一种很好的语法问题的解决方案，但是实际上却让问题更难解决而且让 JavaScript 更加难以理解。