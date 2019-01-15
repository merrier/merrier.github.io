---
title: 读书笔记系列（7）——JavaScript半知半解
urlname: javaScript-semi-knowledgeable-and-semi-knowledgeable
id: 782
categories:
  - JS
tags:
  - JS
  - 笔记
date: 2017-04-25 23:33:09
img: /images/hexo_thumbnail_79.jpeg
---

这本书是我无意中看到的一本电子版书籍，但是第一章就吸引到了我，然后就对作者展开了深入“挖掘”，通过作者的[个人博客](http://ghmagical.com/)发现作者是一个很厉害的技术开发人员，不管是前端还是后台都有所涉猎，所以推荐大家去他的个人博客逛逛，同时推荐他的两本书籍：《JavaScript半知半解》和《Web实战》，一定会有所收获

## 1. 完整的 JavaScript

完整的 JavaScript 实现由下列三个不同的部分组成：

* 核心（**ECMAScript**）
* 文档对象模型（**DOM**）
* 浏览器对象模型（**BOM**）

## 2. `<script>` 元素

向 HTML 页面中插入 JavaScript 的主要方法，就是使用 `<script>` 元素。`<script>` 中定义了下列 6 个属性：

* **`async`**：可选，表示应该立即下载脚本，但不应妨碍页面中的其他操作。只对外部脚本文件有效
* **`charset`**：可选，表示通过 src 属性指定的代码的字符集，比较少用。
* **`defer`**：可选，表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。
* **`language`**：已废弃
* **`src`**：可选，表示包含要执行代码的外部文件
* **`type`**：可选，表示编写代码使用的脚本语言的内容类型（也称为MIME类型）。在 HTML5 中，默认是 text/javascript，所以不需要设置。

## 3. 在使用 `<script>` 嵌入 JavaScript 代码时，切记不要在代码中的任何地方出现 `</script>`

执行下面的代码时，会产生一个错误：

```html
<script>
function loadScript(){
  alert('</script>');
}
</script>
```

## 4. JavaScript 代码的执行顺序

只要不存在 defer 和 async 属性，JavaScript 代码就会从上至下依次解析。带有 src 属性的 `<script>` 元素不应该在其 `<script>` 和 `</script>` 标签之间再包含额外的 JavaScript 代码，嵌入代码会被忽略。**只要不存在 defer 和 async 属性，浏览器都会按照 `<script>` 出现的先后顺序对它们依次进行解析。** 一般将全部 JavaScript 引用放在 `<body>` 元素中页面的内容后面。

## 5. 延迟脚本

当给 `<script>` 元素添加了 `defer` 属性时，src 指向的外部文件会立即下载，但包含的脚本会延迟到浏览器遇到 `</html>` 标签（整个页面解析完毕）后再执行（按添加顺序执行），会先于 DOMContentLoaded 事件执行。

```html
<script defer="defer" src="example.js"></script>
<script async src="example2.js"></script>
```

会先执行 example.js，然后执行 example2.js。

> 注意：defer 只适合外部脚本文件。

## 6. 异步脚本

`async` 与 `defer` 属性类似，都用于改变处理脚本的行为，适用于外部脚本文件，并告诉浏览器立即下载，但标记为 `async` 的脚本并不保证按照指定它们的先后顺序执行。

```html
<script async src="example.js"></script>
<script async src="example2.js"></script>
```

**两个执行顺序不定**。指定 `async` 属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。
> 注意：异步脚本不要在加载期间修改 DOM。 **异步脚本一定会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 事件触发之前或之后执行**。

## 7. <noscript>元素

当浏览器不支持 JavaScript 或被禁用时，显示里面的内容。

```html
<noscript>
 本页面需要浏览器支持（启用）JavaScript
</noscript>
```

## 8. 关键字和保留字

ECMA-262 描述了一组具有特定用途的**关键字**，这些关键字可用于控制语句的开始或结束，或者用于执行特定操作等，不能用作标识符。

> break do instanceof typeof case else new var catch finally return void continue for switch while debugger function this with default if throw delete in try

ECMA-262 还描述了一组不能用作标识符的**保留字**：

> abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public

如果使用关键字作标识符，会导致 “Identifier Expected” 错误。 有些时候，我们不得不用到保留字货关键字的，比如 CSS 样式中的 float，这时就需要这样：

```javascript
style.cssFloat
```

## 9. 隐式全局变量

在下面的代码中，由于从右至左的操作符优先级，所以表达式 “b=0” 是先执行的，而此时b未经过声明，所以它会成为全局变量。

```javascript
function test() {
  var a = b = 0;
}
test();
console.log(b);  // 0
console.log(a);  // ReferenceError: a is not defined
```

关于全局变量：

* 使用 var 创建的全局变量不能删除。
* 不是 var 创建的隐含全局变量可以使用 delete 删除（因为它并不是真正的变量，而是全局对象 window 的属性）

```javascript
function test() {
  var a = b = 0;
  delete a;
  delete b;
  console.log(a);  //  0
  console.log(b);  // ReferenceError: b is not defined
}
test();
```

## 10. 变量提升

**变量提升**是指所有变量的声明语句，都会被提升到代码的头部。 在函数内也一样，函数中的所有变量声明会在函数执行时被“提升”至函数体顶端：

```javascript
console.log(a);  // undefined
var a = 1;
function test(){
  console.log(a);  // undefined
  var a = 2;
}
test();
```

结果是不是有点出乎你的意料。其实 JavaScript 的执行环境分为**声明阶段**和**执行阶段**，因此对于上面的代码，JavaScript 会这样解释代码：

```javascript
var a;
console.log(a);  // undefined
a = 1;
function test(){
  var a;
  console.log(a);  // undefined
  a = 2;
}
test();
```

## 11. typeof 操作符

**`typeof`**操作符用来检测给定变量的数据类型，可能的返回值：

* "undefined" --> 这个值未定义
* "boolean" --> 这个值是布尔值
* "string" --> 这个值是字符串
* "number" --> 这个值是数值
* "object" --> 这个值是对象或 **null**
* "function" --> 这个值是函数

## 12. undefined 和 null 类型

`Undefined` 类型只有一个值，即特殊的 `undefined`；`Null` 类型也是只有一个值的数据类型，这个特殊值就是 `null`；null 和 undefined 没有属性，甚至连 toString() 这种标准方法都没有；undefined 其实是派生自 null 值：

```javascript
console.log(null == undefined);  // true
```

## 13. Boolean()

要将一个值转换为其对应的 Boolean 值，可以使用转型函数 Boolean()；

```javascript
var name = 'tg';
console.log(Boolean(name);  // true
```

可以对任何类型的值调用 Boolean 函数，而且总会返回一个 Boolean 值（true 或 false）**转换规则**：

* 对于 true 或 false，返回原值（true 或 false）
* 对于 String 类型的值，任何非空字符串返回 true，空字符串（""）返回 false
* 对于 Number 类型的值，任何非零数字值（包括无穷大），返回 true；0 和 NaN 返回 false
* 对于 Object 类型的值，任何对象返回 true，null 返回 false
* 对于 Undefined 类型，undefined 返回 false（只有一个值）

## 14. 浮点数值

保存浮点数值需要的内存空间是保存整数值的两倍。 默认情况下，ECMAScript 会将那些小数点后面带有 6 个零以上的浮点数值转换为以 e 表示的数值。 浮点数的最高精度是 17 位小数（所以浮点数的比较比较麻烦）。

```javascript
0.1 + 0.2 = 0.3000000000000004; // 不是等于0.3
```

## 15. 数值范围

ECMAScript 能够表示的最小数值保存在 `Number.MIN_VALUE`（最小值）中，这个值是 5e-324；能够表示的最大数值保存在 `Number.MAX_VALUE`（最大值）中，这个值是 1.7976931348623157e+308

> 注意：Infinity 是不能参与计算的数值。用 `isFinite()` 来判断这个值是否无穷，该函数接受一个参数。如果参数位于最小与最大数值之间，返回 true。

```javascript
console.log(isFinite(1));  //true
console.log(isFinite(Infinity));  // false
```

## 16. NaN

NaN（Not a Number）表示非数值，这个数值用于表示一个本来要返回数值的操作数未返回数值的情况。 注意点：

* 任何涉及 NaN 的操作都会返回 NaN。
* NaN 与任何值都不相等，包括 NaN 本身。
* 任何操作数与 NaN 比较，都会返回 false

```javascript
console.log(NaN == NaN);  //false
```

我们可以用 `isNaN()` 函数来判断是否非数值，该函数接受一个参数，可以是任何类型。`isNaN()` 在接收到这个参数之后，会尝试将这个值转换为数值，某些不是数值的值会直接转换为数值，比如：字符串 "10" 或 Boolean 值。而任何不能被转换为数值的值都会导致这个函数返回 true。

```javascript
console.log(isNaN(NaN));  // true
console.log(isNaN(10));  // false
console.log(isNaN('blue'));  //  true
```

## 17. Number()

**Number() 函数的转换规则**：

* 如果是 Boolean 值，true 和 false 将分别转换为 1 和 0
* 如果是数字值，只是简单的传入和返回
* 如果是 null 值，返回 0
* 如果是 undefined，返回 NaN
* 如果是字符串，遵循下列规则： （
  * 如果是字符串中只包含数字（包括前面带正负号），则将其转换为十进制数值（前导的零会被忽略）
  * 如果字符串中包含有效的浮点格式，如 1.1，则将其转换为对应的浮点数值
  * 如果字符串中包含有效的十六进制，如 0xf，则将其转换为相同大小的十进制数值
  * 如果字符串是空的，返回0
  * 如果字符串中包含上述格式以外的字符，返回 NaN ）
* 如果是对象，则调用对象的 valueOf() 方法，然后依照前面的规则转换返回的值。如果转换的结果是 NaN，则调用对象的 toString() 方法，然后再次依照前面的规则转换返回字符串值

```javascript
console.log(Number('tg'));   // NaN
console.log(Number(''));   // 0
console.log(Number('0011'));  // 11
console.log(Number(true));   //1
```

一元加操作符的操作与 Number 函数规则相同

## 18. parseInt() 和 parseFloat()

`parseInt()` 会忽略字符串前面的空格，直到找到第一个非空格字符。如果第一个字符不是数字字符或负号，就会返回 NaN。如果第一个字符是数字字符，就会继续解析，直到解析完所有后续字符或者遇到了一个非数字字符。 `parseInt()` 也能识别八进制（在 ECMAScript 5 中无法识别，将开头的 0 当作 0）和十六进制，最后会转换成十进制。

```javascript
console.log(parseInt('123tg'));  // 123
console.log(parseInt(''));   // NaN
console.log(parseInt('070'));  // 70
console.log(parseInt('0xf'));  //15
console.log(parseInt(22.5));  // 22
```

我们还可以为 `parseInt()` 提供第二个参数，指定需要转换的进制（刷算法题的时候经常用到）：

```javascript
console.log(parseInt('0xAF',16));  // 175
console.log(parseInt('AF',16));  // 175
console.log(parseInt('AF'));  // NaN
console.log(parseInt('070',8));  // 56
console.log(parseInt('70',8));  // 56
```

`parseFloat()` 和 `parseInt()` 类似，也是从第一个字符（位置 0）开始解析每个字符，而且一直解析到字符串末尾，或者解析到遇到一个无效的浮点数字字符为止，换句话说，字符串中的第一个小数点是有效的，后面的小数点是无效的，它还会忽略前导的零，只会解析十进制值。

```javascript
console.log(parseFloat('123tg'));  // 123
console.log(parseFloat('22.12.4'));   // 22.12
console.log(parseFloat('070'));  // 70
console.log(parseFloat('0xf'));  //0
console.log(parseFloat(22.5));  // 22.5
```

## 19. Object 类型

在 ECMAScript 中，`Object` 类型是所有对象的基础。`Object` 的每个实例都具有下列属性和方法：

* **`Constructor`**：保存着用于创建当前对象的函数，比如上面的例子，构造函数就是 Object()
* **`hasOwnProperty(propertyName)`**：用于检查给定的属性在当前对象实例中是否存在（而不是在实例的原型中），参数必须是字符串形式
* **`isPrototypeOf(object)`**：用于检查传入的对象是否是另一个对象的原型
* **`propertyIsEnumerable(propertyName)`**：用于检查给定的属性是否能够使用 for-in 语句来枚举，参数必须是字符串形式
* **`toLocaleString()`**：返回对象的字符串表示，该字符串与执行环境的地区对应
* **`toString()`**：返回对象的字符串表
* **`valueOf()`**：返回对象的字符串、数值或布尔值表示，通常和 toString() 返回的值相同

## 20. 递增和递减

递减和递增操作符会遵循下列规则：

* 当操作数是一个包含有效数字字符的字符串，系统会将其转换为数字值，再执行递减或递增。
* 当操作数是一个不包含有效数字字符的字符串，系统将变量的值设置为 NaN
* 当操作数是布尔值，会将其转为数值（true 转为 1，false 转为 0）再操作。
* 当操作数是浮点数值，直接执行递减或递增
* 当操作数是对象，先调用对象的 valueOf() 方法取得一个可供操作的值，然后再遵循上面的三条规则。如果结果是 NaN，则在调用 toString() 方法后再遵循上面的规则转换。

```javascript
var a = '2';
var b = 'a';
var c = false;
var d = 1.1;
var o = {
  valueOf: function() {
    return -1;
  }
};
a++;  // 3
b++;  // NaN
c--;  // -1
d--;  // 0.10000000000000009 （浮点数操作结果，类似0.1+0.2 != 0.3）
o--;  -2
```

## 21. 按位非（NOT）

位运算符并不直接操作 64 位的值，而是先将 64 位的值转换为 32 位，然后执行操作，最后将结果转换回 64 位。按位非（否运算）就是**一个数与自身的取反值相加，等于 -1**。

~3 + 3 = -1 => -1 - 3 = -4 == ~3

## 22. 位运算符

位运算符只对整数起作用，如果一个运算子不是整数，会自动转为整数后再执行。

##23. 逻辑与（&&）

逻辑与（&&）有两个操作数，如果是布尔值，只有两个都是 true 时，才会返回 true，否则返回 false；逻辑与操作属于短路操作，也就是说如果第一个操作数能够决定结果（等于 false 时），就不会再对第二个操作数求值，如果不是布尔值，它遵循下面的规则：

* 如果第一个操作数是对象，则返回第二个操作数
* 如果第二个操作数是对象，则只有在第一个操作数的求值为 true 时才会返回第二个操作数
* 如果有一个操作数是 null，则返回 null
* 如果有一个操作数是 NaN，则返回 NaN
* 如果有一个操作数是 undefined，则返回 undefined

逻辑与操作符也就是先将第一个操作数转换为 Boolean 类型判断是 true 或 false，再根据结果决定是否执行第二个操作数

```javascript
0 && 'tg' ;  //  0
{} && 'tg';  // "tg"
```

## 24. 乘法运算符

乘法运算符(`*`)，用于计算两个数值的乘积。 处理特殊值时，乘法运算符会遵循下列规则：

* 如果操作数都是数值，但乘积超过了 ECMAScript 数值范围，则返回 Infinity 或 -Infinity
* 如果有一个操作数是 NaN，结果是 NaN
* 如果是 Infinity 乘以 0，结果是 NaN
* 如果是 Infinity 与非 0 数值相乘，结果是 Infinity 或 -Infinity，取决于非0数值的符号
* 如果是 Infinity 与 Infinity 相乘，结果是 Infinity
* 如果有一个操作数不是数值，则在后台调用 Number() 将其转换为数值，然后遵循上面的规则

```javascript
console.log(1 * NaN);  // NaN
console.log( Infinity * 2);  // Infinity
console.log(Infinity * 0);  // NaN
console.log(Infinity * Infinity);  // Infinity
```

## 24. 除法运算符

除法运算符（/），执行第二个操作数除第一个操作数计算。 处理特殊值，规则如下：

* 如果操作数都是数值，但商超过了 ECMAScript 的表示范围，则返回 Infinity 或 -Infinity
* 如果有一个操作数是 NaN，结果是 NaN
* 如果是 Infinity 被 Infinity 除，结果是 NaN
* 如果是零被零除，结果是 NaN
* 如果是非零的有限数被零除，结果是 Infinity 或 -Infinity，取决于有符号的操作数
* 如果是 Infinity 被任何非零数值除，结果是 Infinity 或 -Infinity
* 如果有一个操作数不是数值，则在后台调用 Number() 将其转换为数值，然后遵循上面的规则。

```javascript
console.log(NaN / 1); // NaN
console.log(0 / 0);  // NaN
console.log(1 / 0);  //  Infinity
console.log(2 / Infinity);  // 0
console.log(Infinity / Infinity);  // NaN
console.log(Infinity / 2);   // Infinity
```

## 25. 求模

求模（余数）运算符（%） 处理特殊值，规则如下：

* 如果被除数是无穷大值而除数是有限大的数值，结果是 NaN
* 如果被除数是有限大的数值而除数是零，结果是 NaN
* 如果是 Infinity 被 Infinity 除，结果是 NaN
* 如果被除数是有限大的数值而除数是无穷大的数值，结果是被除数
* 如果被除数是零，结果是零
* 如果有一个操作数不是数值，则在后台调用 Number() 将其转换为数值，然后遵循上面的规则。

```javascript
console.log(5 % 3);  // 2
```

## 26. 减法

减法运算符（-） 对于特殊值，减法操作会遵循下列规则：

* 如果有一个操作数是 NaN，结果是 NaN
* 如果 Infinity 减 Infinity，结果是 NaN
* 如果是 -Infinity 减 -Infinity，结果是 NaN
* 如果是 Infinity 减 -Infinity，结果是 Infinity
* 如果是 -Infinity 减 Infinity，结果是 -Infinity
* 如果是 +0 减 +0，结果是 +0
* 如果是 -0 加 -0，结果是 +0
* 如果是 +0 减 -0，结果是 -0
* 如果有一个操作数是字符串、布尔值、null 或 undefined，则先在后台调用 Number() 将其转换为数值，然后遵循上面的规则进行计算。
* 如果有一个操作数是对象，则调用对象的 valueOf() 方法以取得表示该对象的数值；如果该对象没有 valueOf() 方法，则调用其 toString() 方法将得到的字符串转换为数值，然后遵循上面的规则进行计算。

```javascript
5 - true;  // 4 （true转换成1）
5 - '2'    // 3
5 - null;  // 5（null转换成0）
```

## 27. 逗号运算符

逗号运算符多用于声明多个变量。逗号运算符还可以用于赋值。在用于赋值时，逗号运算符总会返回表达式中的最后一项：

```javascript
var num = (1,5,3);  // num的值为3
```

## 28. 标签语句

语句是可以添加标签的，标签是由语句前的标识符和冒号组成：

> **label** : statement

label 语句定义的标签一般由 break 或 continue 语句引用。加标签的语句一般要与 for 等循环语句配合使用。

```javascript
var num = 0;
tip : for(var i = 0; i < 10; i++){
  num += i;
  console.log(i);  //  轮流输出：0、1、2、3、4、5
  if(i ==5) {
    break tip;
  }
}
console.log(num);  // 15
```

当执行到 i = 5 时，会跳出循环，也就是 tip 对应的层，然后执行其下方的代码。

## 29. with 语句

`with` 语句用于临时扩展作用域链，也就是将代码的作用域设置到一个特定的对象中。

```javascript
with(object){   
  statement  
}
```

将 object 添加到作用域链的头部，然后执行 statement，最后把作用域链恢复到原生状态。

```javascript
var o = {
  name: 'tg',
  age: 24
};
with(o){
  console.log('name：' + name);  // name：tg
  console.log('age：' + age);  // age：24
}
```

with 里面的 name 相当于 o.name。

> 注意：在严格模式中是禁止使用 with 语句的，因为 with 语句性能非常差，不推荐使用。

## 30. debugger 语句

debugger 语句用来产生一个断点（breakpoint），JavaScript 代码的执行会停止在断点的位置。一般用来调试代码。

## 31. 对象

**键名**：对象的所有键名都是字符串，所以加不加引号都可以。如果键名是数值，会被自动转为字符串。但是如果键名不符合标识名的条件（比如第一个字符为数字，或者含有空格或运算符），也不是数字，则必须加上引号，否则会报错。

```javascript
var o = {
  '1a' : 'a'  
}
```

上面的代码中，如果键名 '1a' 不用引号引起来，就会报错。注意：为了避免这种歧义，JavaScript 规定，如果行首是大括号，一律解释为语句（即代码块）。如果要解释为表达式（即对象），必须在大括号前加上圆括号。

## 32. 创建对象

在 JavaScript 中，有三种方法创建对象

* 对象直接量： var o={};
* 关键字new： var o=new Object();
* Object.create() 函数： var o=Object.create(null)

### 提取方法

如果对对象中的方法进行提取，则会失去与对象的连接。

```javascript
var obj = {
  name: 'a',
  get: function() {
    console.log(this.name);
  }
};

console.log(obj.get());  //  "a"

var func = obj.get;
console.log(func());  // undefined
```

在上面的例子中，object 对象中有一个方法 get()，用来获取 obj 对象中的 name，而当 get() 方法赋值给一个变量 func，再调用 func() 函数时，此时的 this 是指向 window 的，而非 obj 的。注意：如果在严格模式下，this 会是 undefined。

### 属性特性

* 可写（writable attribute）：可设置该属性的值。
* 可枚举（enumerable attribute）：可通过 for / in 循环返回该属性。
* 可配置（configurable attribute）：可删除或修改属性。

### 查看所有属性

查看一个对象本身的所有属性，可以使用 Object.keys 方法，返回一个数组。

```javascript
var o = {
  name : 'a',
  age : 12
}

Object.keys(o)  // ['name','age']
```

### 删除属性

delete 运算符可以删除对象的属性。

```javascript
var o={
  name : 'a'
}
delete o.name  //true
o.name  //undefined
```

> 注意：delete 运算符只能删除自有属性，不能删除继承属性。 删除一个不存在的属性，delete 不报错，而且返回 true。只有一种情况，delete 命令会返回 false，那就是该属性存在，且不得删除。

## 33. 序列化对象

对象序列化是指将对象的状态转换为字符串，也可将字符串还原为对象。 在 JavaScript 中，提供了内置函数 **JSON.stringify()** 和 **JSON.parse()** 用来序列化和还原 JavaScript 对象。NaN、Infinity 和 -Infinity 序列化的结果是 null

```javascript
var o = {
  name : 'a',
  age : 12,
  intro : \[false,null,''\]
}
s= JSON.stringify(o)  // s {"name":"a","age":12,"intro":[false,null,""]}
p=JSON.parse(s)  // p是o的深拷贝
```

注意：JSON.stringify() 只能序列化对象可枚举的自有属性。对于一个不能序列化的属性来说，在序列化后的输出字符串中会将这个属性省略掉。

## 34. 原型

每一个 JavaScript 对象（null 除外）都和另一个对象相关联，也可以说，继承另一个对象。另一个对象就是我们熟知的“原型”（prototype），每一个对象都从原型继承属性。只有 null 除外，它没有自己的原型对象。所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过 JavaScript 代码 Object.prototype 获得对原型对象的引用。通过关键字 new 和构造函数调用创建的对象的原型就是构造函数的 prototype 属性的值。比如：通过 new Object() 创建的对象继承自 Object.prototype；通过 new Array() 创建的对象的原型就是 Array.prototype。没有原型的对象为数不多，Object.prototype 就是其中之一，它不继承任何属性。所有的内置构造函数都具有一个继承自 Object.prototype 的原型。

## 35. 空位

当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在**空位**（hole）。如果最后一个元素后面有逗号，并不会产生空位。数组直接量的语法允许有可选的结尾的逗号，故\[,,\]只有两个元素而非三个。

```javascript
var arr = [,,];
arr.length  // 2
```

## 36. 类数组对象

在 JavaScript 中，有些对象被称为“类数组对象”。意思是，它们看上去很像数组，可以使用 length 属性，但是它们并不是数组，无法使用一些数组的方法。`类数组对象`有一个特征，就是具有 length 属性。换句话说，只要有 length 属性，就可以认为这个对象类似于数组。但是，对象的 length 属性不是动态值，不会随着成员的变化而变化。典型的类似数组的对象是函数的 **arguments 对象**，以及**大多数 DOM 元素集**，还有**字符串**。

## 37. 函数表达式

采用函数表达式声明函数时，function 命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，在函数体外部无效。

```javascript
var f = function(x){   
  console.log(x);  
}
```

## 38. 函数被提前

就像变量的“被提前”一样，函数声明语句也会“被提前”到外部脚本或外部函数作用域的顶部，所以以这种方式声明的函数，可以被在它定义之前出现的代码所调用。在函数提升中，函数体也会跟着提升（不像变量一样，只会提升变量声明），这也是我们可以引用后面声明的函数的原因。 此外，**以表达式定义的函数并没有“被提前”，而是以变量的形式“被提前”**。

```javascript
f();  
var f = function (){};  
// TypeError: f is not a function
```

变量其实是分为声明，赋值两部分的，上面的代码等同于下面的形式

```javascript
var f;
f();
f = function() {};
```

## 39. 实参对象

`arguments` 类数组中每一个元素的值会与对应的命名参数的值保持同步，这种影响是单向的，也可以这样说，**如果是修改 `arguments` 中的值，会影响到命名参数的值，但是修改命名参数的值，并不会改变 `arguments` 中对应的值**。

```javascript
function f(x){   
  console.log(x);    // 1
  arguments[0] = null;   
  console.log(x);    // null
}

f(1);
```

`arguments` 并不是真正的数组，它只是类数组对象（有 length 属性且可使用索引来访问子项）。但我们可以借助 Array 类的原型对象的 slice 方法，将其转为真正的数组：

```javascript
Array.prototype.slice.call(arguments, 0);
// 更简洁的写法
[].slice.call(arguments, 0);
```

## 40. 函数的属性、方法

### name 属性

name 属性返回紧跟在 function 关键字之后的那个函数名。

```javascript
function f(){}
f.name   // f
```

### length 属性

函数的 length 属性是只读属性，代表函数形参的数量，也就是在函数定义时给出的形参个数。

```javascript
function f(x,y){}
f.length  //2
```

## 41. 立即调用的函数表达式（IIFE）

通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：

* 一是不必为函数命名，避免了污染全局变量；
* 二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

## 42. Object 对象的静态方法

`Object.keys()` 方法和 `Object.getOwnPropertyNames()` 方法一般用来遍历对象的属性，它们的参数都是一个对象，返回一个数组，该数组的项都是对象自身的（不是继续原型的）的所有属性名。两者的区别在于， `Object.keys()` 只返回可枚举的属性，`Object.getOwnPropertyNames()` 方法还返回不可枚举的属性名。

```javascript
var arr = ['a', 'b'];
console.log(Object.keys(arr));  // ["0", "1"]
console.log(Object.getOwnPropertyNames(arr)); // ["0", "1", "length"]
```

## 43. splice()

`splice()` 用于删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，返回值是被删除的元素，该方法会改变原数组。第一个参数是删除的起始位置，如果是负数，就表示从倒数位置开始删除 第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。 如只是单纯地插入元素，splice 方法的第二个参数可以设为 0。 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。

```javascript
var arr = ['a','b','c','d'];
console.log(arr.splice(1,1));  // ["b"]
console.log(arr);  // ["a", "c", "d"]

var arr = ['a','b','c','d'];
console.log(arr.splice(1,1,'f'));   // ["b"]
console.log(arr);  // ["a", "f", "c", "d"]

var arr = ['a','b','c','d'];
console.log(arr.splice(1,0,'h'));  // []
console.log(arr);  // ["a", "h", "b", "c", "d"]
```

## 44. some()、every()

`some()` 用来判断数组成员是否符合某种条件。接受一个函数作为参数，所有数组成员依次执行该函数，返回一个布尔值。该函数接受三个参数，依次是当前位置的成员、当前位置的序号和整个数组。只要有一个数组成员的返回值是 true，则整个 some 方法的返回值就是 true，否则 false。

```javascript
var arr = [1,2,3];
var bool = arr.some(function(v){
  return (v == 3);
});
console.log(bool);  // true
```

`every()` 用来判断数组成员是否符合某种条件。接受一个函数作为参数，所有数组成员依次执行该函数，返回一个布尔值。 该函数接受三个参数，依次是当前位置的成员、当前位置的序号和整个数组。所有数组成员的返回值都是 true，才返回 true，否则 false。

```javascript
var arr = [1,2,3];
var bool = arr.every(function(v){
  return (v == 3);
});
console.log(bool);  // false

var bool2 = arr.every(function(v){
  return (v > 0);
});
console.log(bool2);  // true
```

some 和 every 方法还可以接受第二个参数，用来绑定函数中的 this 关键字。

## 45. 基本包装类型

ECMAScript 提供了三个基本包装类型：`Boolean`、`Number`、`String`。实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能过调用一些方法来操作这些数据。执行步骤如下：

1. 创建那个类型的一个实例
2. 在实例上调用指定的方法
3. 销毁这个实例

引用类型与基本包装类型的区别在于对象的生存期：使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中，而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即销毁，这也是我们不能再运行时为基本类型值添加属性和方法的原因。

```javascript
var s = 'tg';
s.age =10;
console.log(s.age);  // undefined
```

上面代码执行输出的是 undefined，这是音乐第二行创建的 String 对象在执行第三行代码时已经被销毁了，第三行又创建自己的 String 对象，而该对象没有 age 属性。

## 46. Boolean 类型

即使你使用 false 创建一个 Boolean 实例对象，当进行逻辑运算时，它会被转为 true，因为它是一个对象，而所有对象在逻辑运算中都会返回 true。

```javascript
var bool = new Boolean(false);
if(bool){
  console.log(true);
}
// true
```

## 47. document.referrer

document.referrer 属性返回一个字符串，表示当前文档的访问来源，如果是无法获取来源或是用户直接键入网址，而不是从其他网页点击，则返回一个空字符串。 注：HTTPS 默认会关闭 referrer，需要通过 meta 来设置，设置方法如下：

```html
<meta name="referrer" content="always">
```

## 48. 数据集（dataset）属性

在 HTML5 文档中，任意以 “data-” 为前缀的小写的属性名字都是合法的。 HTML5 还在 Element 对象上定义了 dataset 属性。该属性指代一个对象，它的各个属性对应于去掉前缀的 data-属性。因此 dataset.x 应该保存 data-x 属性的值。带连字符的属性对应于驼峰命名法属性名：data-jquery-test 属性就变成 dataset.jqueryTest 属性。

```html
<div id="top" data-tip="title"></div>
```

```javascript
var t=document.getElementById('top');
t.dataset.tip  //title
t.dataset.tip = 'title2'
```

注意：dataset 属性是元素的 data-属性 的实时、双向接口。设置或删除 dataset 的一个属性就等同于设置或移除对应元素的 data-属性。

## 49. addEventListener()

调用 addEventListener() 并不会影响 onclick 属性的值。

```html
<button id="mybutton">点击</button>
```

```javascript
var v = document.getElementById('mybutton');
v.onclick = function() {alert('1');}
v.addEventListener('click',function(){alert('2');},false);
```

上面的代码中，单击按钮会产生两个 alert() 对话框。 能通过多次调用 addEventListener() 方法为同一个对象注册同一事件类型的多个处理程序函数。

## 50. 调用顺序

文档元素或其他对象可以指定事件类型注册多个事件处理程序。当适当的事件发生时，浏览器必须按照下面的规则调用所有的事件处理程序：

* 通过设置对象属性或 HTML 属性注册的处理程序一直优先调用。
* 使用 addEventListener() 注册的处理程序按照它们的注册顺序调用。
* 使用 attachEvent() 注册的处理程序可能按照任何顺序调用，所以代码不应该依赖于调用顺序。

## 51. 进度事件

进度事件用来描述一个事件进展的过程。比如 XMLHttpRequest 对象发出的 HTTP 请求的过程，`<img>、<audio>、<video>、<style>、<link>` 加载外部资源的过程。下载和上传都会发生进度事件。进度事件有以下几种：

* abort 事件：当进度事件被中止时触发。如果发生错误，导致进程中止，不会触发该事件。
* error 事件：由于错误导致资源无法加载时触发。
* load 事件：进度成功结束时触发。
* loadstart 事件：进度开始时触发。
* loaden d事件：进度停止时触发，发生顺序排在 error 事件 / abort 事件 / load 事件后面。
* progress 事件：当操作处于进度之中，由传输的数据块不断触发。
* timeout 事件：进度超过限时触发。

## 52. JSON 语法

JSON 对值的类型和格式有严格的规定：

* 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
* 简单类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和 null（不能使用 NaN, Infinity, -Infinity 和 undefined）。
* 字符串必须使用双引号表示，不能使用单引号。
* 对象的键名必须放在双引号里面。
* 数组或对象最后一个成员的后面，不能加逗号。

## 53. 上传文件

如果要允许选择多个文件，可设置 file 控件的 multiple 属性。

```html
<input type="file" multiple/>
```

## 54. 同源策略

同源策略是对 JavaScript 代码能够操作哪些 Web 内容的一条完整的安全限制。当 Web 页面使用多个 `<iframe>` 元素或打开其他浏览器窗口的时候，这一策略通常就会发挥作用。所谓“同源”指的是”三个相同“。

* **协议**相同
* **域名**相同
* **端口**相同

从不同 Web 服务器载入的文档具有不同的来源。通过同一主机的不同端口载入的文档具有不同的来源。使用 http:协议 载入的文档和使用 https:协议 载入的文档具有不同的来源，即使它们来自同一个服务器。同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

## 55. 获取表单元素

获取表单元素一般有两种方式：

* 通过 id 来获取，比如获取一个 id 名为 form1 的表单元素：

```javascript
document.getElementById('form1');
```

* 通过 docuemnt.forms 获取 name 名为 form1 的表单元素：

```javascript
document.forms["form1"]
```

`document.forms` 可以获取到当前页面中所有的表单元素，我们又可以通过方括号表示法获取某个属性，传入数值索引或 `name` 值。

## 56. 重置表单

重置表单也有两种方式：

### 重置按钮

```html
<input type="reset" />
<button type="reset"></button>
```

当点击重置按钮时，会触发 reset 事件：

```javascript
form1.onreset = function(){
}
```

### 通过 reset() 方法

```javascript
form1.reset();
```

与调用 submit() 不同，调用 reset() 方法时也会触发 reset 事件。

## 57. 离线检测

HTML5 定义了一个 `navigator.onLine` 属性，用来检测设备是在线还是离线，为 true 时表示设备能上网，否则表示设备离线。 检测代码：

```javascript
if (navigator.onLine){
  // 正常工作
} else {
  // 设备已离线
}
```

除了 `navigator.onLine` 属性，HTML5 还为检测网络是否可用提供了两个事件：`online` 和 `offline`。

* `online`：当网络从离线变为在线时触发
* `offline`：当网络从在线变为离线时触发

## 58. 应用缓存

HTML5 的应用缓存（application cache），简称：appcache，是专门为开发离线 Web 应用而设计的。 Appcache 就是从浏览器的缓存中分出来的一块缓存区。要想在这个缓存中保存数据，可以使用一个描述文件（manifest file），列出要下载和缓存的资源。`manifest` 文件可分为三个部分：

* CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
* NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
* FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）

```manifest
CACHE MANIFEST

CACHE:
# 需要缓存的列表
test.css
test.jpg
test.js

NETWORK:
# 不需要缓存的
test2.jpg

FALLBACK:
# 访问缓存失败后，备用访问的资源，第一个是访问源，第二个是替换文件 *.html /offline.html
2.jpg/3.jpg
```

注意：manifest 文件的 `MIME` 类型必须是 "text/cache-manifest"。

> 描述文件的扩展名以前推荐用 manifest，现在推荐用 appcache

## 59. localStorage 和 sessionStorage

`localStorage` 和 `sessionStorage`这两个属性都代表同一个 Storage 对象（一个持久化关联数组，数组使用字符串来索引，存储的值都是字符串形式的）。

### localStorage

通过 `localStorage` 存储的数据是永久性的，除非Web应用刻意删除存储的数据或用户通过设置浏览器设置来删除，否则数据将一直保留在用户的电脑里，永不过期。`localStorage` 的作用域是限定在文档源（document origin）级别。 同源的文档间共享同样的 `localStorage` 数据。

### sessionStorage

`sessionStorage` 的作用域同样是限定在文档源中，不过它被限定在窗口中。也就是说，如果同源的文档在不同的浏览器标签页中，那它们互相之间拥有的是各自的 `sessionStorage` 数据，无法共享。

注意：基于窗口作用域的 `sessionStorage` 指的窗口只是顶级窗口。如果一个浏览器标签页包含多个 `<iframe>` 元素，它们包含的文档是同源的，两者之间的 sessionStorage 是可共享的。

## 60. finally 子句

当使用 `finally` 子句时，其代码无论如何都会执行，也就是说，不管是正常执行还是出错了，`finally` 子句都会执行。甚至 `return` 语句，也不会阻止 `finally` 子句的执行。看下面的例子：

```javascript
function test(){
  try{
    console.log('a');
    return 2;
  }catch(error){
    console.log('b');
  }finally{
    console.log('c');
  }
}
console.log(test()); 
//结果
a
c
2
```

从运行结果，我们可以看到，`return` 语句并没有阻止 `finally` 子句的执行，而且是在 `finally` 子句执行后才会返回 `return` 语句的值。