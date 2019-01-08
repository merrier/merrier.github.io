---
title: jQuery事件：不要再(滥)用return false了
urlname: jquery-event-stop-using-return-false
tags:
  - jQuery
  - stackoverflow
id: 1079
categories:
  - jQuery
  - stackoverflow
date: 2017-08-03 18:25:21
---

无意中在stackoverflow上看到一个[关于jQuery中event.preventDefault()和return false的提问](https://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false)，后来从评论中发现一篇[关于这个问题的很不错的文章](https://web.archive.org/web/20160614140933/http://fuelyourcoding.com/jquery-events-stop-misusing-return-false/)，遂翻译了一下，希望能够帮助大家更好的理解jQuery中的return false： 当你刚开始学习jQuery中的事件时，也许你首先碰到的知识点就是“取消浏览器的默认行为”这一概念。比如，一个讲click的初级教程里可能会有如下代码：

$("a.toggle").click(function () {
    $("#mydiv").toggle();
    return false; // 禁止浏览器访问'#'
});

上面这个方法动态的控制#mydiv的显示与隐藏，然后取消了浏览器的默认行为——访问锚标签的href 这是一个非常简单的例子，同时也让很多前端小白养成了使用return false取消浏览器默认行为的习惯。关于取消浏览器事件这一问题，我将从以下两个主题重点讲解：

*   使用正确的方法：return false、preventDefault、stopPropagation和stopImmediatePropagation
*   头部、底部或中间某个位置：我们应该在事件回调函数的哪个位置取消默认行为？

使用正确的方法
=======

之所以return false被大量滥用，是因为它确实满足了我们的需求——超链接不再跳转，表单也不再提交等等，那么为什么我说好多人都误用了呢？

return false到底做了什么
------------------

首先，大部分人都没有搞明白的是，jQuery中的return false其实做了下面三件事：

1.  **event.preventDefault();**
2.  **event.stopPropagation();**
3.  **阻止剩下的代码执行，同时立即返回**

“等一下”。你是不是很惊讶，大部分人用return false其实只是为了阻止默认行为，也就是上面的第一件事，另外两件其实根本不需要。 上面3件事中，只有event.preventDefault()会取消默认行为。除非你真的打算阻止事件冒泡，否则使用return false将大大增加你的代码的脆弱性。让我们来看看现实应用中这种滥用是如何产生的： 我们有如下HTML代码：

<div class="post">
    <h2><a href="/path/to/page">My Page</a></h2>
    <div class="content">
        Teaser text...
    </div>
</div>
<div class="post">
    <h2><a href="/path/to/other_page">My Other Page</a></h2>
    <div class="content">
        Teaser text...
    </div>
</div>

现在我们想实现这样的功能：当用户点击标题链接时，跳转到相应的div.content上面，我们可能会写出这样的jQuery代码：

jQuery(document).ready(function ($) {
   $("div.post h2 a").click(function () {
      var a = $(this),
          href = a.attr('href'), // 获取href,
          content  = a.parent().next();
      content.load(href + " #content");
      return false; // 取消链接跳转这种默认行为
   });
});

目前，我们的页面一切正常。然后，我们又想要添加一个功能：当div.post（或者它的子元素）被点击时，给当前被点击的div.post添加一个"active"类。所以，我们需要添加一个click事件：

var posts = $("div.post");
posts.click(function () {
    posts.removeClass("active");  // 移除所有div.post的active类
    $(this).addClass("active");  // 给当前的div.post添加active类
});

现在测试一下，当我们点击标题链接的时候，它会起作用吗？不会！它不能起作用的原因是我们在点击事件中return false了。而return false实际上意味着执行了event.preventDefault()和event.stopPropagation()。所以点击事件不会冒泡到div.post上，从而我们新添加的事件将不起作用。 当我们将正常绑定的事件和live以及delegate绑定的事件混用时，它也会出现问题：

$("a").click(function () {
    // do something
    return false;
});
 
$("a").live("click", function () {
    // 这里的代码将不起作用
});

我们真正想要实现什么？
-----------

### preventDefault()

在大多数场景下，当我们使用return false的时候，我们真正想要的其实是e.preventDefault()。使用preventDefault的前提是你允许在你的函数中访问事件对象（在后面的例子中以e表示事件对象）：

$("a").click(function (e) {
    // e代表我们的事件对象
    e.preventDefault();
});

这个方法就可以是实现取消默认行为，但是它不能阻止事件冒泡。但是，代码的功能越单一，它的可维护性就更强

### stopPropagation()

有些时候我们只是想阻止事件冒泡，比如下面的栗子：

<div class="post">
    Normal text and then a <a href="/path">link</a> and then more text.
</div>

现在，比如我们有一个非常“奇特”的需求：我们想让用户点击div中除了链接之外的任何地方都干一件事（可能是重定向到其他页面），然后还想让用户点击链接的时候可以正常跳转（从可用性的角度来看，这是一个非常糟糕的idea。因为如果用户本意想点击链接却点到了其他地方，接下来发生的事情可能会让用户很吃惊，影响用户体验）

$("div.post").click(function () {
   // do something
});
 
$("div.post a").click(function (e) {
    // 在这里不要取消默认行为
    // 需要阻止事件冒泡
    e.stopPropagation();
});

在这个例子中，如果我们用return false，那div的点击事件将永远不会触发，这样用户就不会被引导到正确的页面。

### stopImmediatePropagation()

这个函数将阻止事件的进一步执行，即使是同一对象上绑定的不同事件。因为绑定到一个dom元素的所有事件都将按照它们被绑定的顺序执行。下面是一个栗子：

$("div a").click(function () {
   // Do something
});
 
$("div a").click(function (e) {
   // Do something else
   e.stopImmediatePropagation();
});
 
$("div a").click(function () {
   // 这里将不会执行
});
 
$("div").click(function () {
   // 这里也不会执行
});

如果你认为这个例子看起来太假了，不得不说，是很假。然而，有时候这种情况确实会发生。当你构造更加复杂的代码时，代码结构会变得比较混乱，不同的组件和插件可能会给同一个dom元素添加事件。在这种情况下，正确的理解和使用stopImmediatePropagation()就显得尤为重要了。

### return false

只有当你同时需要preventDefault()和stopPaopagation()时，才需要使用return false。与此同时，你的代码应该保证只有到回调函数的尾部才取消默认行为。我强烈反对您在为jQuery小白编写的实例中使用这个return false。它会误导一些入门开发者，因为只有很清楚它的功能你才能正确的使用它。

头部，底部还是中间的某个地方？
===============

之前，当你(滥)用return false时，它总是出现在函数的底部，或者至少在某个特定逻辑行的结尾处，因为它会组织后面的代码执行。但是我们有e.preventDefault，所以我们有了更多选择。e.preventDefault可以在函数执行过程中的任何时候调用。那么应该把它放在哪里呢？

在开发环境，它应该总是放在第一行
----------------

对于一个表单，你想做的最后一件事往往是，你希望通过ajax的方式将表单提交到另一个网页，同时你尝试在回调函数中调试JavaScript产生的bug

在生产环境，如果还有其他功能待开发，请将它放在回调函数的底部或者执行过程的末尾
---------------------------------------

如果你是在一个开发完的页面上添加功能，那么你的链接点击事件或者表单提交事件需要对于不支持JS的浏览器的服务器端的反馈。这里的好处在于，与不支持JS的浏览器无关，而是你的代码在那些浏览器中会抛出错误。下面有一个示例：

var data = {};
$("a").click(function (e) {
    e.preventDefault(); // 取消默认行为
 
    // 抛出一个错误，因为my是undefined
    $("body").append(data.my.link);
 
    // 链接将不起作用
    // JS的执行将终端，用户将不知所措
});

现在，让我们看一下同样的问题出现在preventDefault放在末尾时候的表现：

var data = {};
$("a").click(function (e) {
    // 抛出错误，因为my是undefined
    $("body").append(data.my.link);
 
    // 这里将不会执行，此时你的网页将使用“href”
 
    e.preventDefault(); // 取消默认行为
});

这个例子同样适用于表单提交事件，可以让你有适当的回退选择。所以，千万不要指望你的代码永远都会正确执行。计划好回退方案比盼望着不会报错要好得多！

在生产环境中，如果你的功能只与JS有关，请放在第一行
--------------------------

它不一定是函数中的第一行，但是它应该在你的程序逻辑中的最开始位置。原因是这样的：如果功能的这一部分一开始是与JS相关的，那么回退就不是那么必要了。在这种情况下，回退只是会造成一个随机的“#”出现在URL中或者页面跳转的区别。很明显，我们需要做的事提供尽可能多的错误处理方案，从而确保用户不会觉得它们的努力是白费的。

结论
==

我希望这篇文章在你对于取消事件进行选择时提供了足够多的信息。记住只有在你真正需要return false时采去使用它，同时确保在你的回调函数的正确位置取消了默认行为。程序员的目标就是让你的代码尽可能的灵活，所以不要再用return false了！