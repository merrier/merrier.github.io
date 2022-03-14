---
title: 读书笔记-编写高质量代码-Web前端开发修炼之道
urlname: the-way-to-practice-web-front-end-development
id: 509
categories:
  - 前端
tags:
  - 笔记
date: 2017-04-06 16:42:13
img: /images/hexo_thumbnail_107.jpeg
---

## 1. Web 标准——结构、样式和行为的分离

Web 标准由一系列标准组合而成，其核心理念就是将网页的结构，样式和行为分离开来，所以它可以分为三大部分：结构标准，央视标准和行为标准。
结构标准包括 XML 标准，XHTML 标准，HTML 标准；
样式标准主要是指 CSS 标准；
行为标准主要包括 DOM 标准和 ECMAScript 标准。

## 2. 打造高品质的前端代码，提高代码的可维护性——精简，重用，有序

精简的代码可以让文件变小，有利于客户端快速下载；重用可以让代码更易于精简，同时有助于提升开发速度；有序可以让我们更清晰地组织代码，使代码易于维护，有效应对变化。

## 3. 欲精一行，必先通十行

在前端开发领域，不通十行就无法精一行。专精很难，甚至不可能，一专多能才是现实的。在前端开发这个领域，一专多能更是非常必要的。

## 4.增加代码可读性——注释

一个好的代码，注释要占 1/3 的篇幅

## 5. 磨刀不误砍柴工——前期的构思很重要

构思的内容主要包括规范的指定，公共组件的设计和复杂功能的技术方案等。一般来说，前期构思占整个项目 30% ~ 60% 的时间都算是正常的.

## 6. 标签的语义

HTML 标签的设计都是有语义考虑的。下表是部分标签的全称和中文翻译：

<div align='center'><img src='/images/hexo_post_300.png' alt='' width='600'/></div>
<div align='center'><img src='/images/hexo_post_301.png' alt='' width='600'/></div>

其中，**div 和 span 其实是没有语义的**，它们只是分别用作块级元素和行内元素的区域分隔符。事实上，CSS 布局只是 Web 标准的一部分。在 HTML，CSS，JavaScript 这三大元素中，HTML 才是最重要的，结构才是重点，样式是用来修饰结构的。正确的做法是，先确定 HTML，确定语义的标签，再来选用合适的 CSS。

## 7. 如何确定你的标签是否语义良好

判断网页标签语义是否良好的一个简单方法就是：**去掉样式，看网页结构是否组织良好有序，是否仍然有很好的可读性**。除了去样式后的可读性外，值得重点提及的还有 h 标签。h 标签的含义是"标题"，搜索引擎对这个标签比较敏感，尤其是 h1 和 h2。一个语义良好的页面，h 标签应该是完整有序没有断层的。也就是说，**要按照 h1，h2，h3，h4 这样依次排列下来，不要出现类似 h1，h2，h3，h4，漏掉 h2 的情况**。

## 8. 常见模块

### 标题和内容

当页面内标签无法满足设计需要时，才会适当添加 div 和 span 等无语义标签来辅助实现。

### 表单

```html
<form action="" method="">
  <fieldset>
    <legend>登录表单</legend>
    <p><label for="name">账号：</label><input type="text" id="name" /></p>
    <p><label for="pw">密码：</label><input type="password" id="pw" /></p>
    <input type="submit" value="登录" class="subBtn" />
  </fieldset>
</form>
```

一般来说，表单域要用 fieldset 标签包起来，并用 legend 标签说明表单的用途。因为 fieldset 默认有边框，而 legend 也有默认的样式，为满足设计需要，我们可以将 fieldset 的 "border" 设为 "none"，把 legend 的 "display" 设为 "none"，以此来兼顾语义和设计两方面的要求。每个 input 标签对应的说明文本都需要 label1 标签，并且通过为 input 设置 id 属性，在 label 标签中设置 "for=someld" 来让说明文本和相应的 input 关联起来.

### 表格

表格标题要用 caption，表头要用 thead 包围，主体部分用 tbody 包围，尾部要用 tfoot 包围，表头和一般单元格要区分开，表头用 th，一般单元格用 td。

## 9. 语义化标签应注意的一些其他问题

为了保证网页去样式后的可读性，并且又符合 Web 标准，我们应注意以下几点：

* 尽可能少的使用无语义标签 div 和 span；
* 在语义不明显，既可以用 p 也可以用 div 的地方，尽量用 p，因为 p 默认情况下有上下间距，去样式后的可读性更好，对兼容特殊终端有利；
* 不要使用纯样式标签，例如 b，font 和 u 等，改用 CSS 设置。语义上需要强调的文本可以包在 strong 或 em 标签里，strong 和 em 有"强调"的语意，其中 strong 的默认样式是加粗，而 em 的默认样式是斜体。

## 10. 如何组织 CSS

一种组织 CSS 的方法：**base.css+common.css+page.css**。将网站内的所有样式，按照职能分成三大类：base，common 和 page。

### base 层

这一层位于三者的最底层，提供 CSS reset 功能和粒度最小的通用类——原子类。这一层会被所有页面引用，是页面样式所需依赖的最底层。这一层与具体 UI 无关，无论何种风格的设计都可以引用它，所以 base 层要力求精简和通用。base 层具有高度可移植性，不同设计风格的网站可以使用同一个 base 层. base 层相对稳定，基本上不需要维护。

### common 层

这一层位于中间，提供组件级的 CSS 类。我们可以将页面内的元素拆分成一小块一小块功能和样式相对独立的小"模块"，这些"模块"有些是很少重复的，有些是会大量重复的，我们可以将大量重复的"模块"视为一个组件。我们从页面里尽可能多的将组件提取出来，放在 common 层里。common 层就相当于 MVC 模式中的 M(Model，模型)。为了保证重用性和灵活性，M 需要尽可能将内部实现封装，对可能会经常变化的部分提供灵活的接口。common 层是网站级的，不同的网站有不同的 common 层，同一个网站只有一个 common 层。在团队合作中，common 层最好由一个人负责，统一管理。

### page 层

网站中高度重用的模块，我们把它们视为组件，放在 common 层；非高度重用的模块，可以把它们放在 page 层。page 层位于最高层，提供页面级的样式，对重用性没有要求。base 层基本上不需要维护，common 层修改的幅度不会很大，通常只由一个人负责维护，但到了 page 层，代码可能由多人开发，如何避免冲突是个需要注意的问题。通常我们通过命名规则来避免这种冲突。

## 11. 推荐的 base.css

通常情况下，为了让浮动元素的父容器能够根据浮动元素的高度而自适应高度，有三种做法：

* 让父容器同时浮动起来，例如：`<div class="fl"><div class="fl"></div></div>`；
* 让浮动元素后面紧跟一个用于清楚浮动的空标签，例如 `<div><div class="fl"></div><div class="cb"></div></div>`；
* **给父容器挂一个特殊 class，直接从父容器清除浮动元素的浮动，例如 `<div class="clearfix"><div class="fl"></div></div>`**

**第一种方法会让父容器也浮动起来，影响父元素后面的元素的布局，有副作用；第二种方法增加了一个空标签，破坏了语义化。第三种方法没有任何副作用，推荐使用。**

```css
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  display:inline-block;
}
```

## 12. 拆分模块

* 模块与模块之间尽量不要包含相同的部分，如果有相同部分，应将它们提取出来，拆分成一个独立的模块.
* 模块应在保证数量尽可能少的原则下，做到尽可能简单，以提高重用性.

##13. CSS 的命名

推荐使用英语，不要使用汉语拼音。我们可以根据内容来选用合适的英文单词命名 CSS。比如头部用 head，底部用 foot，主体部分用 main，导航用 nav，菜单用 menu 等，page 层 css 命名不可过短，可以将开发人员名字缩写作为前缀，以免发生冲突。

## 14. 挂多个 class 还是新建 class——多用组合，少用继承

在面向对象编程里，有个很重要的原则就是"多用组合，少用继承". HTML 的 class 与程序中"类"有相同的"味道"，class 可以挂多个，从技术上支持了"组合"的用法。我们在使用 CSS 时，如果能灵活运用这点就可以大大减少类的数量，一方面减少了代码量，提高了可维护性，另一方面时类的职责更单一，弹性更强，增加了类的重用性，提高了开发效率。

## 15 .组件的 margin

如果对相邻的模块同时使用了 margin-top 和 margin-bottom，边距会重合带来不必要的麻烦，所以最好统一使用 margin-top 或者 margin-bottom，不要混合使用，从而降低出现问题的风险。
总结：如果不确定模块的上下 margin 特别稳定，最好不要将它写到模块的类里，而是使用类的祝贺，单独为上下 margin 挂用于边距的原子类(例如 mt10，mb20)。模块最好不要混用 margin-top 和 margin-bottom，统一使用 margin-top 或 margin-bottom。

## 16. 低权重原则——避免滥用子选择器

除非确定 HTML 结构非常稳定，一定不会再修改了，否则尽量不要使用子选择器。为了保证样式容易被覆盖，提高可维护性，CSS 选择符需保证权重尽可能低。

## 17. CSS sprit 技术

CSS sprite 技术看似简单，其实不容易掌握，主要有如下原因:

* 它能合并的只能是用于背景的图片，对于 `<img src="" />` 设置的图片，是不能合并到 CSS sprite 大图中的，如果合并这些图片会影响页面可读性。
* 对于横向和纵向都平铺的图片，也不能使用 CSS sprite；如果是横向平铺的，只能将所有横向平铺的图合并成一张大图，只能竖直排列，不能水平排列；如果是纵向平铺的，我们只能将所有纵向平铺的图合并成一张大图，只能水平排列，不能竖直排列。
* 图片如何排列能够尽量紧凑，同时保证不会影响扩展性。这点是 CSS sprite 技术最困难也是最具挑战性的地方。

## 18. CSS hack

### IE 条件注释法

#### 只在IE下生效

```html
<!--[if IE]>
<link type="text/CSS" href="test.css" rel="stylesheet" />
<![endif]-->
```

#### 只在 IE6 下生效

```html
<!--[if IE 6]>
<link type="text/CSS" href="test.css" rel="stylesheet" />
<![endif]-->
```

#### 只在 IE6 以上版本生效

```html
<!--[if gt IE 6]>
<link type="text/CSS" href="test.css" rel="stylesheet" />
<![endif]-->
```

#### 只在 IE7 上不生效

```html
<!--[if ! IE 6]>
<link type="text/CSS" href="test.css" rel="stylesheet" />
<![endif]-->
```

#### 条件注释和 style 标签

```html
<!--[if IE 6]>
<style type="text/CSS">
.test{}
</style>
<![endif]-->
```

#### 条件注释和 script 标签

```html
<!--[if IE 6]>
<script type="text/JavaScript">
alert("我是 IE 6");
</script>
<![endif]-->
```

### 选择符前缀法

```html
<style type="text/CSS">
.test{ width: 80px; }               /* IE 6,IE 7,IE 8 */
*html .test{ width: 60px; }         /* only for IE 6 */
*+html .test{ width: 70px; }        /* only for IE 7 */
</style>
```

选择符前缀法相较于 IE 条件注释法来说，可维护性强了很多，但在向后兼容性上存在一点风险。另外，选择符前缀法不能用于内联样式上。

### 样式属性前缀法

样式属性前缀法的原理是在样式的属性名前加前缀，这些前缀只在特定浏览器下才生效.例如 "_" 只在 IE6 下生效，"*" 在 IE6 和 IE7 下生效。

```html
<style type="text/CSS">
.test{
  width: 80px;
  *width: 70px;
  _width: 60px;
}
</style>

```

## 19. a 标签的四种状态

关于 a 标签的四种状态的排序问题，有个简单好记的原则，叫做 love hate 原则，即 l(link)ov(visited)e h(hover)a(active)te

## 20. hasLayout

hasLayout 是 IE 浏览器专有的一个属性，用于 CSS 的解析引擎。有时候在 IE 下一些复杂的 CSS 设置解析起来会出现 Bug，其原因可能与 hasLayout 没有被自动触发有关，我们通过一些技巧，手动触发 hasLayout 属性就可以解决Bug了。

<div align='center'><img src='/images/hexo_post_302.png' alt='' width='550'/></div>

<div align='center'><img src='/images/hexo_post_303.png' alt='' width='550'/></div>

## 21. 块级元素和行内元素的区别

* 块级元素会独占一行，默认情况下，其宽度自动填满其父元素宽度，行内元素不会独占一行，相邻的行内元素会排列在同一行里，知道一行排不下，才会换行，其宽度随元素的内容而变化；
* 块级元素可以设置 width，height 属性。行内元素设置 width，height 属性无效。块级元素即使设置了宽度，仍然是独占一行的；
* 块级元素可以设置 margin 和 padding 属性。行内元素的 margin 和 padding 属性很奇怪，水平方向的 padding 和 margin 都产生边距效果，但竖直方向的 padding，margin 却不会产生边距效果。

## 22. display:inline-block

它是行内的块级元素，它拥有块级元素的特点，可以设置长宽，可以设置 margin 和 padding 值，但它却不是独占一行，它的宽度并不占满父元素，而是和行内元素一样，可以和其他行内元素排在同一行里.

## 23. relative，absolute 和 float

设置 position: relative 或 position: absolute 都可以让元素激活 left，top，right，bottom 和 z-index 属性(默认情况下，这些属性未激活，设置了也无效) 设置 position:relative 或 position:absolute 会让元素"浮"起来，也就是 z-index 值大于 0，它会改变正常情况下的文档流。float 也能改变文档流，不同的是，float 属性不会让元素"上浮"到另一个 z-index 层，它仍然让元素在 z-index: 0 层排列。另外，不论之前什么类型的元素(display: none 除外)，只要设置了 position: absolute，float: left 或 float: right 中的任意一个，都会让元素以 display: inline-block 的方式显示，可以设置长宽，默认宽度并不占满父元素。就算我们显示地设置 display: inline 或者 display: block，也仍然无效。position: relative 不会隐式改变 display 的类型。

## 24. 居中

### 水平居中

#### 文本，图片等行内元素的水平居中

父元素设置text-align:center

#### 确定宽度的块级元素的水平居中

margin:0 auto

#### 不确定宽度的块级元素的水平居中

* 第一种方法：将 ul 包含在 table 标签内，对 table 设置 margin: 0 auto 就可以使 table 水平居中，间接地使 ul 实现了水平居中；
* 第二种方法：改变块级元素的 display 为 inline 类型，然后使用 text-align: center 来实现居中；
* 第三种方法：给父元素设置 float，然后父元素设置 position: relative 和 left: 50%，子元素设置 position: relative 和 left: -50% 来实现水平居中

### 竖直居中

#### 父元素高度不确定的文本，图片，块级元素的竖直居中

给父容器设置相同上下边距实现的

#### 父元素高度确定的单行文本的竖直居中

通过给父元素设置 line-height 来实现的，line-height 值和父元素的高度值相同。

#### 父元素高度确定的多行文本，图片，块级元素的竖直居中

块级元素的 display:table-cell，vertical-align:center。

## 25. 使用匿名函数控制变量的作用域

`(function(){ var a，c="abc"; })();` 这种形式很巧妙，先定义一个匿名的 function，然后立即执行它.包在这个匿名 function 里的变量，作用域就不再是 window，而是局限在函数内部。用匿名函数将脚本包起来，可以有效控制全局变量，避免冲突隐患。让 JS 不产生冲突，需要避免全局变量的泛滥，合理使用命名空间以及为代码添加必要的注释。

## 26. window.onload 和 DOMReady

window.onload 需要当页面完全加载完成时才会触发，包括图片，Flash 等富媒体，DOMReady 只判断页面内所有的 DOM 节点是否已经全部生成，至于节点的内容是否加载完成，它并不关心. DOMReady 比 window.onload 更适合用来调用初始化函数。值得注意的是，DOMReady 并不是原生 JavaScript 支持的事件，它不能像 window.load 那样直接调用，一般我们都是结合 JS 框架来使用它。

## 27. CSS 放在页头，JavaScript 放在页尾

将 CSS 放在页头，在载入 HTML 元素之前，先载入它们的样式，这样可以避免 HTML 出现无样式状态；将 JavaScript 放在页尾，先将网页呈现给用户，再来加载页面内的脚本，避免 JavaScirpt 阻塞网页的呈现，减少页面空白的时间。

## 28. 引入编译的概念——文件压缩

为了减小网页的大小，缩短网页的下载时间，在正式发布 JavaScript 之前，我们可以先对它进行一下压缩。JS 压缩通常的做法是去掉空格和换行，去掉注释，将复杂变量名替换成简单的变量名。

## 29. JavaScript 如何分层

把 JavaScript 也分成三层，从下往上依次是 base 层，common 层和 page 层

### base 层

有两个职责，职责一是封装不同浏览器下 JavaScript 的差异，提供统一的接口，我们可以依靠它来完成跨浏览器兼容的工作。职责二是扩展 JavaScript 语言底层提供的接口，让它提供更多更为易用的接口。

### common 层

依赖于 base 层提供的接口。common 层提供可供复用的组件，它是典型的 mvc 模式中的 m，和页面内的具体功能没有直接关系。common 层的功能是给 page 层提供组件。

### page 层

这一层和页面里的具体功能需求直接相关，是 mvc 模式中的 c。page 层的功能是完成页面内的功能需求。

## 30. JavaScript 中的参数

如果一个函数内某个因素很不稳定，我们可以将它从函数内部分离出来，以参数的形式传入，从而将不稳定因素和函数解耦。在编程里有一个很出名的规则叫做 DRY——don't repeat yourself，强调在程序中不要将相同的代码重复编写多次，更好的做法是只写一次，然后在多处引用。

## 31. JavaScript 与面向对象

JavaScript 很奇怪，它没有 Class 关键字，在 JavaScript 中是用函数来充当类的。函数在 JavaScript 中既可以当作普通函数使用，也可以当作类来使用，在充当类的时候，它本身又担负着构造函数的责任。函数作为普通函数使用时，通常直接使用 "()" 进行调用，而作为类使用时，通常使用 new 来实例化。通常情况下，作为函数时我们更倾向于用动词来命名，而作为类时用名词来命名。按照习惯，类名的首字母大写。JavaScript 是基于原型的语言，通过 new 实例化出来的对象，其属性和行为来自于两部分，一部分来自于构造函数，另一部分来自于原型。当我们声明一个类时，其实同时生成了一个对应的原型，例如我们定义 Animal 这个类时，会生成一个与 Animal 类对应的原型，通过 Animal.prototype 可以指向这个原型，原型可以通过 constructor 指向 Animal 类，更确切地说，是指向 Animal 类的构造函数。构造函数中定义的属性和行为的优先级比原型中定义的属性和行为优先级高，如果构造函数和原型定义了同名的属性和行为，构造函数中的属性和行为会覆盖原型中的同名的属性和行为。 this 关键字无论出现在构造函数中，还是出现在原型中，指向的都是实例对象，通过 this 关键字，可以让属性和方法在构造函数和原型间通信。正统的面向对象语言会提供 public，protect，private 等关键字来声明属性和行为的可访问性是公有还是私有。但 JavaScript 并不提供这些关键字，在 JavaScript 中公有还是私有是通过作用域实现的。

<div align='center'><img src='/images/hexo_post_304.png' alt='' width='550'/></div>

把行为写在原型里可以减少内存消耗，没有特殊原因，推荐尽量把行为写在原型里。写在原型中的行为一定是公有的，而且无法访问私有属性。

## 32. 传值与传址

```javascript
var a = 10;             // 基本数据类型
var b = a;              // 将变量 a 保存的值复制一份，传给变量 b，a 和 b 各保存一份数据
var c = [1，2，3];       // 复杂数据类型
var d = c;              // 将变量 c 指向的数据的内存地址传给变量d，c 和 b 指向同一份数据
b++;
d.push(4);
alert(a);     // 10
alert(b);     // 11        变量 b 保存的数据更改不会影响到变量 a
alert(c);     // 1，2，3，4 变量 c 和 d 指向同一份数据，数据更改会互相影响
alert(d);     // 1，2，3，4
```

在原生 JavaScript中，选择传值还是传址是根据数据类型自动判定的，但传址有时候会给我们带来意想不到的麻烦，所以我们需要对复杂类型数据的赋值进行控制，让复杂数据类型也可以进行传值。

## 33. UML 描述类

|PhonebookManager|
|:---------------|
|+getTel():string|
|+addItem():void|
|+removeItem():void|

一个方框代表一个类，将方框划分成上中下三栏，第一栏填入类名，第二栏填入类的属性，第三栏填入类的行为，其中公有属性和公有行为需要在属性和行为名前加上 “+” 号，而私有属性和私有行为需要在属性和行为名前加上 “-” 号。

## 34. prototype 和内置类

<div align='center'><img src='/images/hexo_post_305.png' alt='' width='600'/></div>

只要是类就会有原型，不管它是自定义类还是 JavaScript 的内置类，我们可以通过修改内置类的原型，让 JavaScript 基本类型的对象获得一些有趣的功能。无论在类的构造函数中还是在原型中，this 都指向实例化的对象。内置类的方法可以重写，但属性却不能重写。在 JavaScript 中，包括内置类和自定义类，所有类的祖先类都是 Object，所以如果想对所有对象都扩展方法，可以通过修改 Object 类的原型实现。

## 35. 修改内置类

使用自定义类：

```javascript
function myArray(o){
  this.getArray=function(){
    return o;
  };
}
myArray.prototype={
  each:function(fun){
    var o=this.getArray();
    for(var i=-，n=o.length;i<n;i++){
      fun(o\[i\]，i);
    }
  }
}
var a=new nyArray(\[1，2，3\])，str="";
a.each(function(v，k){
  str += k+":"+v+"\\n";
});
alert(str);    // 0:1 1:2 2:3
```

代替直接修改内置类原型的做法，定义一个自定义类，将内置类的实例作为参数传给构造函数，在自定义类里定义扩展方法。这种做法的思路是将内置类再封装一层，以此保护内置类的原型不被污染。两种方法都各有优缺点，修改内置类的原型非常方便，缺点是可能会带来冲突隐患；自定义类可以保护原型不被修改，但它需要用 new 来实例化自定义类，相对麻烦一点。如果是小应用，不用过多考虑可维护性，推荐使用前者，如果是大中型应用，需要考虑可维护性，推荐使用后者。

## 36. 自定义属性

对于常规属性，统一使用 node.XXX 的方式读取，对于自定义属性，统一使用 node.getAttribute(“XXX”) 读取。将复杂类型的数据转化成字符串，称为数据的序列化，其逆操作叫做数据的反序列化。字符串的反序列化是通过 eval 函数实现的。只要字符串长的像 JavaScript 支持的数据格式，就可以进行反序列化。

```html
<a id="a" href="http://www.adanghome.com" blogInfo="{name:'阿当的博客'，
type:'前端开发'}">my blog</a>

<script type="text/JavaScript">
  var node=document.getElementById("a");
  var info=node.getAttribute("blogInfo");
  alert(typeof info);    //string
  alert(info.name);      //undefined
  alert(info.type);      //undefined
  info=eval("(" + info + ")");
  alert(typeof info);    //object
  alert(info.name);      //阿当的博客
  alert(info.type);      //前端开发
</script>
```

## 37. 代码可维护性

好的可维护性可以从四个方面获得：

* 代码的松耦合，高度模块化，将页面内的元素视为一个个模块，相互独立，尽量避免耦合过高的代码，从 HTML、CSS、JavaScript 三个层面考虑模块化。
* 良好的注释。
* 注意代码的弹性，在性能和弹性的选择上，一般情况下以弹性为优先考虑条件，在保证弹性的基础上，适当优化性能。
* 严格按照规范编写代码。