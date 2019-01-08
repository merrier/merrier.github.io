---
title: 读书笔记系列（8）——CSS Secrets
urlname: css-secrets
tags:
  - CSS
  - 笔记
id: 955
categories:
  - CSS
  - 笔记
date: 2017-07-06 18:21:45
---

写在前面
====

这本书被誉为近十年来最出色的一本CSS相关书籍，作者是被誉为"CSS一姐"的Lea Verou，是W3C CSS工作组特邀专家，而我看的是这本书的译本（翻译为CSS揭秘），作者叫张鹏，是百姓网的前端架构师；译者翻译的不错，同时还加入了自己的注解，如果对这本书有任何疑问，可以[点击这里](http://book.cssmagic.net)查看译者的注解。作者通过示例介绍了CSS得47个技巧，并将其归类至7大类中，由于这本书的绝大部分内容都是很值得学习的，所以关于这本书的读书笔记可能会比较长，强烈推荐你认真阅读一下这本书，是一本不可多得的CSS中阶教材。

引言
==

currentColor
------------

这是一个特殊的颜色关键字，它是CSS中有史以来的第一个变量，举个例子，加入我们想让所有的水平分割线（所有<hr>元素）自动与文本的颜色一致，可以这样写：

hr{
    height: .5em;
    background: currentColor;
}

currentColor其实不仅仅可以用到background属性，还可以用在border-color、outline-color、text-shadow和box-shadow等等

避免不必要的媒体查询
----------

*   使用百分比长度来取代固定长度，如果实在做不到这一点，也应该尝试使用与视口相关的单位（vw、vh、vmin和vmax）
*   当你需要在较大分辨率下得到固定宽度时，使用 max-width 而不是 width，因为它可以适应较小的分辨率，而无需使用媒体查询。
    
*   不要忘记为替换元素(比如 img、object、video、iframe 等)设置一个 max-width，值为 100%。
*   假如背景图片需要完整地铺满一个容器，不管容器的尺寸如何变化， background-size: cover 这个属性都可以做到。但是，我们也要时刻牢记——带宽并不是无限的，因此在移动网页中通过CSS 把一张大图缩小显示往往是不太明智的。
*   当图片(或其他元素)以行列式进行布局时，让视口的宽度来决定列的数量。弹性盒布局(即 Flexbox)或者 display: inline-block 加上常规的文本折行行为，都可以实现这一点。
*   在使用多列文本时，指定column-width(列宽)而不是指定column-count(列数)，这样它就可以在较小的屏幕上自动显示为单列布局。

合理使用简写
------

以下两行CSS代码并不是等价的：

background: rebeccapurple;
background-color: rebeccapurple;

前者是简写，它可以确保你得到rebeccapurple纯色背景 但是如果你用的是展开式的单个属性（background-color），那这个元素的背景最终有可能会显示为一个粉色的渐变图案、一张猫的图片或其他任何东西，因为同时可能会有一条 background-image 声明在起作用。所以展开式属性并不会帮助你清空所有相关的其他属性，从而有可能会被其他属性所干扰。

预处理器不是完美无缺的
-----------

*   CSS的**文件体积**和**复杂度**可能会失控
*   **调试难度**会增加（但是SourceMap正是为了解决这个痛点而生的，它会告诉浏览器哪些编译生成的 CSS 代码对应哪些预处理器 CSS 代码，精确到行号）
*   预处理器在开发过程中引入了一定程度的**延时**
*   **学习成本**变高
*   预处理器是由人类写出来的，就像所有由 人类写出来的大型程序一样，**它们有它们自己的bug**

预处理器中不可能做到的变量玩法
---------------

ul { --accent-color: purple; }
ol { --accent-color: rebeccapurple; } 
li { background: var(--accent-color); }

上面这段代码的意图是：在有序列表中，列表项的背景色将是rebeccapurple；但在无序列表中，列表项的背景色将是purple

背景与边框
=====

半透明边框
-----

假设我们想给一个容器设置一层白色背景和一道半透明白色边框，body 的背景会从它的半透明边框透上来。我们最开始的尝试可能是这样的:

border: 10px solid hsla(0,0%,100%,.5); 
background: white;

但实际上，上面这段代码让 body 的背景从半透明白色边框处透了上来，这实际上得到的效果跟纯白实色的边框看起来完全一样。 所以我们可以通过background-clip属性来调整上述默认行为所带来的不便，这个属性的初始值是 border-box，意味着背景会被元素的 border box(边框的外沿框)裁切掉。如果不希望背景侵入边框所在的范围，我们要做的就是把它的值设为 padding-box，这样浏览器就会用内边距的外沿来把背景裁切掉。

border: 10px solid hsla(0,0%,100%,.5); 
background: white;
background-clip: padding-box;

多重边框
----

### box-shadow

box-shadow还接受第四个参数（称作"扩张半径"），通过指定正值或负值，可以让投影面积加大或者减小。一个正值的扩张半径加上两个为零的偏移量以及为零的模糊值，得到的“投影”其实就像一道实线边框。这并没有什么了不起的，因为你完全可以用 border 属性来生成完全一样的边框效果。不过 box-shadow 的好处在于，**它支持逗号分隔语法，我们可以创建任意数量的投影**，但是多重投影方案有一些注意事项： 投影不会影响布局，也不会受到box-sizing属性的影响。不过，你可以通过**内边距或外边距**(这取决于投影是内嵌和还是外扩的)来额外模拟出边框所需要占据的空间。 通过box-shadow创建出的假"边框'出现在元素的外圈，它们并不会响应鼠标事件，比如悬停或点击。可以通过给box-shadow加上inset关键字，来使投影绘制在元素的内圈，此时还需要额外的内边距来腾出足够的空隙

### ouline

在某些情况下，你可能只需要两层边框，那就可以先设置一层常规边框，再加上 outline(描边)属性来产生外层的边框。这种方法的优点在于边框样式十分灵活（box-shadow无法产生虚线边框），而且可以通过outline-offset属性来控制它跟元素边缘之间的间距，但是同样有一些需要注意的地方：

*   只适用于双层"边框"的场景，因为outline不接受逗号
*   outline产生的边框不一定会贴合border-radius产生的圆角
*   对于outline的表现，各个浏览器可能会有所不同，最好在不同浏览器中完整地测试最终效果

灵活的背景定位
-------

### background-position

background-position允许我们指定背景图片距离任意角的偏移量，只要我们在偏移量前面指定关键字：

background: url(code-pirate.svg) no-repeat #58a; 
background-position: right 20px bottom 10px;

### background-origin

背景图片的background-position属性是默认相对于padding box的左上角的，但是background-origin可以改变这种行为：

padding: 10px;
background: url("code-pirate.svg") no-repeat #58abottom right; /* 或 100% 100% */ 
background-origin: content-box;

此时，background-position将以内容区的边缘作为基准，也就是此时图片距离边角的偏移量就跟内边距保持一致了

### calc

把背景图片定位到距离底边 10px 且距离右边 20px 的位置。如果我们仍然以左上角偏移的思路来考虑，其实就是希望它有一个 100% - 20px 的水平偏移量，以及 100% - 10px 的垂直偏移量。calc()函数可以完美地在background-position属性中使用：

background: url("code-pirate.svg") no-repeat; 
background-position: calc(100% - 20px) calc(100% - 10px);

边框内圆角
-----

有时我们需要一个容器，只在内侧有圆角，而边框或描边的四个角在外部仍然保持直角的形状，如下图所示： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-102638.png) 如果只需要达成简单地实色效果，我们可以只用一个元素：

background: tan; 
border-radius: .8em; 
padding: 1em;
box-shadow: 0 0 0 .6em #655; 
outline: .6em solid #655;

上面这段代码产生的视觉效果如下图所示： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-102949.png) 我们受益于两个事实：**描边并不会跟着元素的圆角走(因而显示出直角)，但 box-shadow 却是会的**。因此，如果我们把这两者叠加到一起，box-shadow会刚好填补描边和容器圆角之间的空隙，这两者的组合达成了我们想要的效果。

条纹背景
----

假如我们有一条基本的垂直现行渐变，颜色从#fb3过渡到#58a：

background: linear-gradient(#fb3 20%, #58a 80%);

### 水平条纹

现在容器顶部的 20% 区域被填充为 #fb3 实色，而底部 20% 区域被 填充为 #58a 实色。真正的渐变只出现在容器 60% 的高度区域。如果我们把两个色标重合在一起（改为50%和50%）， 会发生什么?

background: linear-gradient(#fb3 50%, #58a 50%);

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-103746.png) 所以，本质上，我们通过垂直线性渐变创建了两条巨大的水平条纹 我们还可以通过background-size来调整其尺寸，然后由于背景在默认情况下是重复平铺的，整个容器其实已经被填满了水平条纹：

background: linear-gradient(#fb3 50%, #58a 50%); 
background-size: 100% 30px;

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-104023.png) 还有一条规范是：如果某个色标的位置值比整个列表中在它之前的色标的位置值都要小，则该色标的位置值会被设置为它前面所有色标位置值的最大值。这意味着，如果我们把第二个色标的位置值设置为0，那它的位置就总是会被浏览器调整为前一个色标的位置值：

background: linear-gradient(#fb3 30%, #58a 0); 
background-size: 100% 30px;

如果要创建超过两种颜色的条纹，也是很容易的。举例来说，下面的代码可以生成三种颜色的水平条纹：

background: linear-gradient(#fb3 33.3%,#58a 0, #58a 66.6%, yellowgreen 0);
background-size: 100% 45px;

### 垂直条纹

我们只需要在开头加上一个额外的参数来指定渐变的方向（但是我们还需要把background-size的值颠倒一下）：

background: linear-gradient(to right, /* 或 90deg */ #fb3 50%, #58a 0);
background-size: 30px 100%;

### 斜向条纹

我们需要用单个贴片包包含四条条纹，而不是两条，只有这样才可能做到无缝拼接： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-104751.png)

background: linear-gradient(45deg,#fb3 25%, #58a 0, #58a 50%,#fb3 0, #fb3 75%, #58a 0); 
background-size: 30px 30px;

但是，如果我们想得到条纹宽度为15px的背景，则需要借助**勾股定理**进行计算，具体原理就不在赘述，看上面图应该能看出来

### 更好的斜向条纹

一个鲜为人知的真相是 linear-gradient() 和 radial-gradient() 还各有一个循环式的加强版：repeating-linear-gradient() 和 repeating-radial-gradient()。 它们的工作方式跟前两者类似，只有一点不同：**色标是无限循环重复的，直到填满整个背景**。

background: repeating-linear-gradient(60deg,#fb3, #fb3 15px, #58a 0, #58a 30px);

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-105343.png) 在这个方法中，不论条纹的角度如何，我们在创建双色条纹时都需要用到四个色标

### 灵活的同色系条纹

如果我们想要的条纹图案并不是由差异极大的几种颜色组成的，而是属于同一色系，只是在明度方面有轻微差异的话，我们可以**把最深的颜色指定为背景色，同时把半透明白色的条纹叠加在背景色之上来得到浅色条纹**：

background: #58a;
background-image: repeating-linear-gradient(30deg,
                    hsla(0,0%,100%,.1),
                    hsla(0,0%,100%,.1) 15px,
                    transparent 0, transparent 30px);

我们现在只需要修改一个地方就可以改变所有颜色了。我们还得到了一个额外的好处，对于那些不支持 CSS 渐变的浏览器来说，这里的背景色还起到了回退的作用

复杂的背景图案
-------

### 网格

做法：**把水平和垂直的条纹叠加起来**；在某些情况下，我们希望网格中每个格子的大小可以调整，而网格线条的粗细同时保持固定。此时可以使用长度而不是百分比作为色标。

background: #58a; 
background-image:linear-gradient(white 1px, transparent 0),linear-gradient(90deg, white 1px, transparent 0); 
background-size: 30px 30px;

### 波点

径向渐变能够创建的最简单的图案是圆点的阵列；我们可以生成两层圆点阵列图案，并把它们的背景定位错开，这样就可以得到真正的波点图案：

background: #655;
background-image: radial-gradient(tan 30%, transparent 0),radial-gradient(tan 30%, transparent 0); 
background-size: 30px 30px;
background-position: 0 0, 15px 15px;

### 棋盘

棋盘图案是可以通过平铺生成的，平铺成这个图案的典型贴片包含两种不同颜色的方块，且相互间隔，这里的窍门在于用两个直角三角形来拼合出我们想要的方块

background: #eee; 
background-image:
    linear-gradient(45deg, #bbb 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, #bbb 0),
    linear-gradient(45deg, #bbb 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, #bbb 0);
background-position: 0 0, 15px 15px,15px 15px, 30px 30px;
background-size: 30px 30px;

### CSS3图案库

[lea.verou.me/css3patterns](http://lea.verou.me/css3patterns/)，展示了CSS渐变早在2011年就能够实现的效果： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-111031.png)

### SVG图案库

[philbit.com/svgpatterns](http://philbit.com/svgpatterns)，这个网站是CSS图案库的SVG版实现

### Bennett Feely的图案库

[http://bennettfeely.com/gradients](http://bennettfeely.com/gradients)，采用混合模式生成的CSS图案库

伪随机背景
-----

重现大自然的随机性是一个挑战，因为 CSS 本身没有提供任何随机功能。

为了更真实地模拟条纹的随机性，我们接下来可能会想到，把这组条纹从一个平面拆散为多个图层:一种颜色作为底色，另三种颜色作为条纹，然后再让条纹以不同的间隔进行重复平铺：

background: hsl(20, 40%, 90%); 
background-image:
    linear-gradient(90deg, #fb3 10px, transparent 0),
    linear-gradient(90deg, #ab4 20px, transparent 0),
    linear-gradient(90deg, #655 20px, transparent 0);
background-size: 80px 100%, 60px 100%, 40px 100%;

但是我们很容易发现：**各层背景图像以不同间距重复数次后再次统一对齐，而贴片的尺寸实际上就是所有 background-size 的最小公倍数**，而 40、60 和 80 的最小公倍数正是 240。 所以为了模拟随机，我们需要把贴片的尺寸最大化：**为了让最小公倍数最大化，这些数字最好是“相对质数”。**这个技巧被 Alex Walker 定名为“蝉原则”，他最先提出了通过质数来 增加随机真实性的想法。请注意这个方法不仅适用于背景，还可以用于其他 涉及有规律重复的情况：

*   在照片图库中，为每幅图片应用细微的伪随机旋转效果时，可以使 用多个 :nth-child(a) 选择符，且让 a 是质数。
*   如果要生成一个动画，而且想让它看起来不是按照明显的规律在 循环时，我们可以应用多个时长为质数的动画。

连续的图像边框
-------

有时我们想把一幅图案或图片应用为边框，而不是背景，达到下面的展示效果： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-113444.png) 此时border-image是不可能做到的，因为它无法随着元素宽高和边框厚度的变化而变化。所以我们的思路是**在石雕背景图片之上，再叠加一层纯白的实色背景**。为了让下层的图片背景透过边框区域显示出来，我们需要给两层背景指定不同的 background-clip 值。最后一个要点在于，我们只能在多重背景的最底层设置背景色，因此需要用一道从白色过渡到白色的 CSS 渐变来模拟出纯白实色背景的效果：

padding: 1em;
border: 1em solid transparent; 
background: linear-gradient(white, white),url(stone-art.jpg); 
background-size: cover;
background-clip: padding-box, border-box; 
background-origin: border-box;

### [老式信封样式的边框](http://play.csssecrets.io/vintage-envelope)

将上面的技巧用在渐变图案上：

padding: 1em;
border: 1em solid transparent;
background: linear-gradient(white, white) padding-box,
            repeating-linear-gradient(-45deg,
              red 0, red 12.5%,
              transparent 0, transparent 25%,
              #58a 0, #58a 37.5%,
              transparent 0, transparent 50%)
              0 / 5em 5em;

### [蚂蚁行军边框](http://play.csssecrets.io/marching-ants)

为了创建蚂蚁行军效果，我们将会用到“老式信封”技巧的一个变种。我们将把条纹转变为黑白两色，并把边框的宽度减少至 1px，然后再把 background-size 改为某个合适的值。最后，我们把 background-position 以动画的方式改变为 100%，就可以让它滚动起来了

@keyframes ants { to { background-position: 100% } }
.marching-ants { 
    padding: 1em;
    border: 1px solid transparent; background:
        linear-gradient(white, white) padding-box,
        repeating-linear-gradient(-45deg,
          black 0, black 25%, white 0, white 50%
        ) 0 / .6em .6em;
    animation: ants 12s linear infinite; 
}

### [脚注](http://play.csssecrets.io/footnote)

我们可以用border-image搭配渐变图案实现顶部边框被裁切的效果，就像一般的脚注那样，我们所需要的就是 border-image 属性再加上一条由渐变生成的垂直条纹，并把要裁切的长度在渐变中写好。边框线的粗细交给 border-width 来控制：

border-top: .2em solid transparent;
border-image: 100% 0 0 linear-gradient(90deg,currentColor 4em,transparent 0);
padding-top: 1em;

形状
==

自适应的椭圆
------

我们想要达到这样效果：**如果宽高相等，就显示为一个圆；如果宽高不等，就显示为一个椭圆** border-radius可以单独指定水平和垂直半径，用一个斜杠（/）分隔这两个值即可；同时，它不仅可以接受长度值，还可以接受百分比值，这个百分比值会基于元素的尺寸进行解析。这意味着相同的百分比可能会计算出不同的水平和垂直半径，因此可以这样实现自适应椭圆：

border-radius: 50%;

半椭圆
---

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-115108.png) 我们可以为四个角提供完全不同的水平和垂直半径，这意味着当 border-radius 的值为 10px / 5px 20px 时，其效果相当于 10px 10px 10px 10px / 5px 20px 5px 20px；所以我们很容易写出半椭圆的CSS代码：

border-radius: 50% / 100% 100% 0 0;

举一反三，沿纵轴劈开的半椭圆：

border-radius: 100% 0 0 100% / 50%;

四分之一椭圆（其中一个角的水平和垂直半径值都需要是 100%，而其他三个角都不能设为圆角）：

border-radius: 100% 0 0 0;

但是很遗憾，**border-radius是无法生成八分之一椭圆，三分之一椭圆的**！

 平行四边形
------

我们可以通过skew()的变形属性来对某个矩形进行斜向拉伸，但是这回导致它的内容也发生了斜向变形。所以我们的思路是**把所有样式（背景、边框等）应用到伪元素上，然后再对伪元素进行变形**：

.button {
    position: relative;
    /\* 其他的文字颜色、内边距等样式...... */
} 
.button::before {
    content: ''; /* 用伪元素来生成一个矩形 */ 
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0; 
    z-index: -1; /* 防止伪元素的背景遮住内容 */
    background: #58a;
    transform: skew(45deg); 
}

这个技巧**适用于其他任何变形样式**，当我们想**变形一个元素而不想变形它的内容**时就很有用：

*   可以用[在IE下实现多重背景](http://nicolasgallagher.com/multiple-backgrounds-and-borders-with-css2/)
*   实现“边框内圆角”效果
*   可以用来为某一层“背景”[单独设置类似opacity这样的属性](http://nicolasgallagher.com/css-background-image-hacks)
*   模拟多层边框

[菱形图片](http://play.csssecrets.io/diamond-clip)
----------------------------------------------

主要思路是使用clip-path属性，它最大的缺陷在于其浏览器支持程度还很有限。但是，它可以平稳退化（只是没有裁切效果而已），因此它至少有资格成为我们的备选方案 我们将会使用polygon()（多边形）函数来指定一个菱形。实际上，它允许我们用一系列（以逗号分隔的）坐标点来指定任意的多边形。我们甚至可以使用百分比值，它们会解析为元素自身的尺寸：

clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);

clip-path 所能创造的奇迹还不止于此。这个属性甚至可以参与动画，只要我们的动画是在同一种形状函数(比如这里是 polygon())之间进行的，而且点的数量是相同的。因此，如果我们希望图片在鼠标悬停时平滑地扩展为完整的面积，只需要这样做：

img{
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    transition: 1s clip-path;
}
img:hover{
    clip-path: polygon(0 0, 100% 0, 100% 100%,0 100%);
}

MDN关于clip-path的文档：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)

切角效果
----

把角切掉不仅是为了省钱，它还是一种非常流行的设计风格，不论是在印刷媒介还是在网页设计中都是如此。

### 用渐变实现

假设我们只需要一个角被切掉，以右下角为例，可以充分利用渐变的一大特性：渐变可以接受一个角度（比如45deg）作为方向，而且色标的位置信息也可以是绝对的长度值，不受容器尺寸的影响；综上，我们需要一个线性渐变，把一个透明色标放在切角处，然后在相同位置设置另一个色标，并且把它的颜色设置为我们想要的背景色：

background: #58a;
background: linear-gradient(-45deg, transparent 15px, #58a 0);

**左下角和右下角都有切角效果**：

background: #58a;
background: linear-gradient(-45deg, transparent 15px, #58a 0)
                right,
            linear-gradient(45deg, transparent 15px, #58a 0)
                left;
background-size: 50% 100%; 
background-repeat: no-repeat;

**四个角都有切角效果**：

background: #58a; 
background:
    linear-gradient(135deg,  transparent 15px, #58a 0)
        top left,
    linear-gradient(-135deg, transparent 15px, #58a 0)
        top right,
    linear-gradient(-45deg, transparent 15px, #58a 0)
        bottom right,
    linear-gradient(45deg, transparent 15px, #58a 0)
        bottom left;
background-size: 50% 50%;
background-repeat: no-repeat;

上面这段代码的可维护性并不理想，使用**预处理器的mixin**可以帮助我们减少代码的重复度

### 弧形切角

很多人也把这种效果成为“内凹圆角”，因为它看起来就像是圆角的反向版本。唯一的区别在于，我们会用**径向渐变**来替代上述线性渐变： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-144815.png)

background: #58a; 
background:
    radial-gradient(circle at top left,
             transparent 15px, #58a 0) top left,
    radial-gradient(circle at top right,
             transparent 15px, #58a 0) top right,
    radial-gradient(circle at bottom right,
             transparent 15px, #58a 0) bottom right,
    radial-gradient(circle at bottom left,
             transparent 15px, #58a 0) bottom left;
background-size: 50% 50%; 
background-repeat: no-repeat;

### clip-path实现切角

裁切路径最神奇的地方在于我们**可以同时使用百分比数值（它会以元素自身的宽高作为基数度进行换算）和绝对长度值**，从而提供巨大的灵活性。举个例子，如果用裁切路径将一个元素切出20px大小的斜面切角，代码如下：

background: #58a; 
clip-path: polygon(
    20px 0, calc(100% - 20px) 0, 100% 20px,
    100% calc(100% - 20px), calc(100% - 20px) 100%,
    20px 100%, 0 calc(100% - 20px), 0 20px
);

但是它有一个很明显的缺点，就是**当内边距不够宽时，它会裁切掉文本**，因为它只能对元素做统一的裁切，并不能区分元素的各个部分

[梯形标签页](http://play.csssecrets.io/trapezoid-tabs)
-------------------------------------------------

一直以来，梯形都是众所周知难以用CSS生成的形状，网页开发者如果没有用精心设计的背景图片来实现梯形，那多半就是在用伪元素的边框来模拟梯形两侧的斜边，而我们的思路是通过3D变形，将矩形进行3D旋转，就可以创建一个梯形。但由于旋转之后，元素的尺寸会变小，同时会稍微下移，所以我们需要让其在3D空间旋转时固定底边（transform-origin），同时通过scale()方法改变它的尺寸：

transform: scaleY(1.3) perspective(.5em) rotateX(5deg);
transform-origin: bottom;

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-150858.png) 同时，我们只需要把transform-origin改成bottom left或bottom right，就可以立即得到左侧倾斜或右侧倾斜的标签页

简单的饼图
-----

我们可以通过渐变来将一个圆形的左右两半设置为不同的颜色，然后通过伪元素的旋转不同角度来实现不同角度的简单饼图： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-152047.png)

由于已经找到了实现任意比率的方法，我们甚至可以用 CSS 动画来实现一个饼图从 0 变化到 100% 的动画，从而得到一个[炫酷的进度指示器](http://play.csssecrets.io/pie-animated):

@keyframes spin {
    to { transform: rotate(.5turn); }
}
@keyframes bg {
    50% { background: #655; }
}
.pie::before { 
    content: '';
    display: block;
    margin-left: 50%;
    height: 100%;
    border-radius: 0 100% 100% 0 / 50%; 
    background-color: inherit; 
    transform-origin: left;
    animation: spin 3s linear infinite, bg 6s step-end infinite;
}

如果我们需要一个静态的任意比率的饼图，可以利用**负的动画延时**来直接跳至动画中的任意时间 点，并且定格在那里。举例来说，如果动画持续时间定为 6s，我们只需要把 animation-delay 设置为 -1.2s，就能显示出 20% 的比率。最终的效果：[play.csssecrets.io/pie-static](http://play.csssecrets.io/pie-static) 我们还可以通过SVG实现简单的饼图，与伪元素相比，SVG的方案具有不少优点：

*   增加第三种颜色非常容易
*   不需要特别担心打印，因为SVG元素本身被视为页面内容
*   可以用内联样式指定颜色这意味着我们可以通过脚本控制颜色

SVG方案实现的效果：[play.csssecrets.io/pie-svg](http://play.csssecrets.io/pie-svg)

视觉效果
====

[单侧投影](http://play.csssecrets.io/shadow-one-side)
-------------------------------------------------

解决方案来自box-shadow鲜为人知的第四个长度参数，称作扩张半径。这个参数会根据你指定的值去扩大或 (当指定负值时)缩小投影的尺寸。举例来说，一个 -5px 的扩张半径会把投影的宽度和高度各减少 10px(即每边各 5px)。如果给投影应用一个正的垂直偏移量，我们就会在元素的底部看到一道投影，而元素的另外三侧是没有投影的：

box-shadow: 0 5px 4px -4px black;

### [邻边投影](http://play.csssecrets.io/shadow-2-sides)

把一个black、6px的投影设置到右侧和底部可以这样做：

box-shadow: 3px 3px 6px -3px black;

### [双侧投影](http://play.csssecrets.io/shadow-opposite-sides)

唯一的办法是用两块投影（每边各一块）来达到目的：

box-shadow: 5px 0 5px -5px black, 
            -5px 0 5px -5px black;

不规则投影
-----

当我们想给一个矩形或其他能用 border-radius 生成的形状加投影时，box-shadow 的表现都堪称完美。但是，当元素添加了一些伪元素或半透明的装饰之后，它就有些力不从心了，因为 border-radius 会无耻地忽视透明部分： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-154445.png) 我们的解决方案是利用filter的新属性来指定滤镜效果，比如上面的投影效果可以这样来写：

filter: drop-shadow(2px 2px 10px rgba(0,0,0,.5));

实现效果：[play.csssecrets.io/drop-shadow](http://play.csssecrets.io/drop-shadow)

染色效果
----

首先可以去[CSSConf官网](https://2014.cssconf.com/)欣赏一下讲师照片的染色效果，当鼠标悬停或获得焦点时，照片将显示为全彩的样式

### [基于滤镜的方案](http://play.csssecrets.io/color-tint-filter)

filter属性提供了多种关于色调调整的方法，下面的代码可以实现染色效果的过渡动画：

img {
    transition: .5s filter;
    filter: sepia(1) saturate(4) hue-rotate(295deg);
}
img:hover, 
img:focus {
    filter: none; 
}

### [基于混合模式的方案](http://play.csssecrets.io/color-tint)

使用background-blend-mode属性可以让每层背景跟它的下层背景进行混合： HTML代码：

<div class="tinted-image" 
     style="background-image:url(tiger.jpg)">
</div>

CSS代码：

.tinted-image {
    width: 640px; 
    height: 440px; 
    background-size: cover; 
    background-color: hsl(335, 100%, 50%); 
    background-blend-mode: luminosity; 
    transition: .5s background-color;
}
.tinted-image:hover { 
    background-color: transparent;
}

[毛玻璃效果](http://play.csssecrets.io/frosted-glass)
------------------------------------------------

我们想要达到下面这种效果： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170707-161805.png) 我们的实现方案是利用伪元素实现模糊背景，但由于模糊效果在接近边缘处会逐渐消退，所以我们需要让伪元素相对其宿主元素的尺寸再向外扩大至少模糊半径的距离，然后再对宿主元素应用overflow:hidden来将多余的模糊区域裁切掉，最终代码如下所示：

body, main::before {
    background: url("tiger.jpg") 0 / cover fixed;
}
main {
    position: relative;
    background: hsla(0,0%,100%,.3); 
    overflow: hidden;
}
main::before { 
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0; 
    filter: blur(20px);
    margin: -30px;
}

折角效果
----

### [45°折角的解决方案](http://play.csssecrets.io/folded-corner)

我们先根据“切角效果”一节中的渐变方案实现一个右上角的斜面切角，然后增加另一层渐变来生成一个三角形并将其定位在右上角，从而实现翻折效果，需要注意的是**这个渐变的两个色标需要在正中央重合**：

background: #58a; /* 回退样式 */ 
background:
    linear-gradient(to left bottom,
        transparent 50%, rgba(0,0,0,.4) 0)
        no-repeat 100% 0 / 2em 2em,
    linear-gradient(-135deg,
        transparent 1.5em, #58a 0);

### [其他角度的解决方案](http://play.csssecrets.io/folded-corner-realistic)

由于其他角度的切角需要旋转一定角度，所以我们需要借助伪元素来实现，同时还需要借助一些数学知识来计算角度和距离，具体实现过程比较复杂，大家可以看书中的解释或者直接看[实现效果](http://play.csssecrets.io/folded-corner-realistic)，最终代码如下所示：

.note {
    position: relative;
    background: #58a; /* 回退样式 */ 
background:
        linear-gradient(-150deg,
            transparent 1.5em, #58a 0);
    border-radius: .5em;
} 
.note::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    background: linear-gradient(to left bottom,
        transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4))
        100% 0 no-repeat; 
    width: 1.73em;
    height: 3em;
    transform: translateY(-1.3em) rotate(-30deg); 
    transform-origin: bottom right; 
    border-bottom-left-radius: inherit;
    box-shadow: -.2em .2em .3em -.1em rgba(0,0,0,.15);
}

字体排印
====

连字符断行
-----

text-align:justify可以实现两端对齐，但是对于英文字体来说，很容易出现“单词孤岛”现象，这样不仅看起来很糟糕，而且损伤了可读性。在打印媒介中，两端对齐总是和连字符断行相辅相成的，这样文本看起来就自然很多。 CSS文本（第三版）引入了一个新的属性hyphens：

> hyphens: none | manual | auto

manual是它的初始值，

其行为正好对应了现有的工作方式：我们可以在任何时候手工插入软连字符，来实现断词折行的效果。很显然hyphens: none;会禁用这种行为；而最为神奇的是，只需这短短一行 CSS 就可以产生我们梦寐以求的效果：

hyphens: auto;

为了确保它奏效，你需要在 HTML 标签的 lang 属性中指定合适的语言

如果需要更细粒度地控制连字符的行为（比如在简短的引文中），你仍然可以通过一些软连字符（&shy;）来辅助浏览器进行断词。这个 hyphens 属性会优先处理它们，然后再去计算其他可以断词的地方

[插入换行](http://play.csssecrets.io/line-breaks)
---------------------------------------------

HTML代码：

<dl> 
    <dt>Name:</dt>
    <dd>Lea Verou</dd> 
    <dt>Email:</dt>
    <dd>lea@verou.me</dd>
    <dt>Location:</dt>
    <dd>Earth</dd> 
</dl>

我们想让dt和后面的dd在同一行，每个dt所在的内容都单独占一行。 有一个 Unicode 字符是专门代表换行符的:0x000A1。在 CSS 中， 这个字符可以写作 "\\000A"，或简化为 "\\A"。我们可以用它来作为 ::after 伪元素的内容，并将其添加到每个 <dd> 元素的尾部

但是由于我们是在HTML代码中插入了换行符，所以这些换行符会和相邻的其他空白符进行合并，此时我们希望**保留源代码中的这些空白符和换行，**我们会用到white-space:pre。然而如果你的结构代码在多个连续的 <dd> 之间包含了(未加注释的)空白符，那么逗号前面会有一个空格。有很多方法可以修复这个问题，但都不够完美。其中一种方法是利用**负外边距**。最终CSS代码：

dt,dd{
    display: inline;
}
dd{
    margin: 0;
    font-weight: bold;
}
dd + dt::before { 
    content: '\\A';
    white-space: pre; 
}
dd + dd::before { 
    content: ', ';
    margin-left: -.25em;
    font-weight: normal; 
}

[文本行的斑马条纹](http://play.csssecrets.io/zebra-lines)
-------------------------------------------------

我们可以通过:nth-child()/:nth-of-type()伪类来实现表格的“斑马条纹”：

tr:nth-child(even){
    background: rgba(0,0,0,.2);
}

然而，这种实现方式无法应用到文本行。我们可以**在CSS中用渐变直接生成背景图像**，而且可以用em单位来设定背景尺寸，这样背景就可以**自动适应font-size的变化**了。水平条纹背景的background-size需要设置为line-height的两倍，因为每个背景贴片需要覆盖两行代码。同时我们希望让背景自动跟着内边距的宽度走，所以就需要background-origin告诉浏览器在解析background-position时以content box的外沿作为基准：

padding: .5em;
line-height: 1.5;
background: beige;
background-size: auto 3em;
background-origin: content-box;
background-image: linear-gradient(rgba(0,0,0,.2) 50%,
                                  transparent 0);

唯一可能破坏效果的情况可能就是在改变 line-height 时忘了相应地调整 background-size

[调整tab的宽度](http://play.csssecrets.io/tab-size)
----------------------------------------------

我们通常使用<pre>和<code>元素来显示代码，但是**浏览器会把tab的宽度显示为8个字符**！ 而在CSS文本（第三版）中，一个新的CSS属性tab-size可以控制这个情况。这个属性接受一个数字(表示字符数)或者一个长度值(这个不那么实用)。我们通常希望把它设置为4(表示 4 个字符的宽度)或2，后者是最近更为流行的缩进尺寸。

pre {
    tab-size: 2;
}

[连字](http://play.csssecrets.io/ligatures)
-----------------------------------------

### 什么是连字？（右侧为左侧连字写法）

i 的圆点往往会与 f 的升部发生冲突，导致两者都显示不清；为了缓解这个问题，字体设计师通常会在字体中包含一些额外的字形， 称作连字。这些字形被设计为双字形或三字形的单一组合体，专门提供给排版软件使用，代为显示特定的字符组合：

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-101020.png)

### 支持连字解决方案

在CSS字体（第三版）中，原有的 font- variant 被升级成了一个简写属性，由很多新的展开式属性组合而成。其中之一叫作 font-variant-ligatures，专门用来控制连字效果的开启和关闭。如果要启用所有可能的连字，需要同时指定这三个标识符:

font-variant-ligatures: common-ligatures 
                        discretionary-ligatures
                        historical-ligatures;

font-variant-ligatures 还接受 none 这个值，它会把所有的连字效果都关掉。千万不要使用 none，除非你绝对清楚自己是在做什么。如果要把 font- variant-ligatures 属性复位为初始值，应该使用 normal 而不是 none。

[华丽的&符号](http://play.csssecrets.io/ampersands)
----------------------------------------------

我们想要用另一种字体来单独美化某个特定字符（或是某个区间内的多个字符）： 首先，@font-face规则中的src描述符是可以接受local()函数的，用于指定本地字体的名称：

@font-face{
    font-family: Ampersand;
    src: local('Baskerville'),
         local('Goudy Old Style'),
         local('Garamond'),
         local('Palatino');
}

但是，整段文本会都被应用为我们指定的字体，所以需要一个描述符来声明我们想用这款字体来显示哪些字符，这个描述符叫做unicode-range；它是基于“Unicode码位”的，所以需要知道你想指定的字符的十六进制码位，你可以在控制台打印下面JS代码获取：

"&".charCodeAt(0).toString(16); // 返回26

还需要在前面加上 U+ 作为前缀，所以最终声明方式为：

unicode-range: U+26;

如果你想指定一个字符区间，还是要加上 U+ 前缀，比如 U+400-4FF。实际上对于这个区间来说，你还可以使用通配符，以这样的方式来写：U+4??。同时指定多个字符或多个区间也是允许的，把它们用逗号隔开即可，比如 U+26, U+4??, U+2665-2670

最后，为了指定某些字体的斜体版本，我们需要直接指定字体中我们想要的单个风格/字重所对应的“PostScript名称”：

@font-face {
    font-family: Ampersand;
    src: local('Baskerville-Italic'),
         local('GoudyOldStyleT-Italic'), 
         local('Palatino-Italic'), 
         local('BookAntiqua-Italic');
    unicode-range: U+26; }
h1 {
    font-family: Ampersand, Helvetica, sans-serif;
}

自定义下划线
------

text-decoration:underline实现的文本下划线不能够定制，同时**在不同浏览器下的渲染效果大相径庭**。所以为了得到更加定制化的下划线，我们可以通过background-image及其相关属性来实现（CSS渐变）

### 实线下划线

background: linear-gradient(gray, gray) no-repeat; 
background-size: 100% 1px;
background-position: 0 1.15em;

### 防止下划线穿过文本的降部

background: linear-gradient(gray, gray) no-repeat; 
background-size: 100% 1px;
background-position: 0 1.15em;
text-shadow: .05em 0 white, -.05em 0 white;

### [虚线下划线](http://play.csssecrets.io/underlines)

background: linear-gradient(90deg, gray 66%, transparent 0) repeat-x;
background-size: .2em 2px; 
background-position: 0 1em;

### [波浪型的下划线（两层渐变）](http://play.csssecrets.io/wavy-underlines)

background: linear-gradient(-45deg, transparent 40%, red 0, red 60%, transparent 0) 0 1em,
	    linear-gradient(45deg, transparent 40%, red 0, red 60%, transparent 0) .1em 1em;
background-repeat: repeat-x;
background-size: .2em .1em;
text-shadow: .05em 0 white, -.05em 0 white;

现实中的文字效果
--------

### [凸版印刷效果](http://play.csssecrets.io/letterpress)

我们通过text-shadow使人产生物体从平面上凸起的错觉 **当我们在浅色背景上使用深色文字时，在底部加上浅色投影通常效果最佳**：

background: hsl(210, 13%, 60%);
color: hsl(210, 13%, 30%);
text-shadow: 0 1px 1px hsla(0,0%,100%,.8);

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-104722.png) **当我们在深色背景上使用浅色文字时，在底部加上深色投影通常效果最佳**：

background: hsl(210, 13%, 40%); 
color: hsl(210, 13%, 75%); 
text-shadow: 0 -1px 1px black;

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-104933.png)

### [空心字效果](http://play.csssecrets.io/stroked-text)

我们一般使用多个text-shadow来模拟文字描边：

background: deeppink;
color: white;
text-shadow: 1px 1px black, -1px -1px black,
             1px -1px black, -1px 1px black;

但是，目前比较理想的方案是使用SVG，HTML代码可能是这样的：

<h1><svg width="2em" height="1.2em"> 
    <use xlink:href="#css" />
    <text id="css" y="1em">CSS</text>
</svg></h1>

CSS：

h1 {
    font: 500%/1 Rockwell, serif; 
    background: deeppink;
    color: white;
}
h1 text {
    fill: currentColor;
}
h1 svg { overflow: visible }
h1 use {
    stroke: black;
    stroke-width: 6;
    stroke-linejoin: round;
}

### [文字外发光效果](http://play.csssecrets.io/glow)

文字外发光效果常用于凸显标题，或给链接添加鼠标悬停效果。它是最容易生成的文字美化效果之一。这种方法有一个最简单的版本:你只需要准备几层重叠的 text-shadow 即可，不需要考虑偏移量，颜色也只需跟文字保持一致：

background: #203;
color: #ffc;
text-shadow: 0 0 .1em, 0 0 .3em;

或者使用CSS滤镜：

a{
    background: #203; 
    color: white; 
    transition: 1s;
} 
a:hover {
    filter: blur(.1em); 
}

### [文字凸起效果](http://play.csssecrets.io/extruded)

思路就是使用一长串累加的投影，不设模糊并以 1px 的跨度逐渐错开，使颜色逐渐变暗，然后在底部加一层强烈模糊的暗投影，从而模拟完整的立体效果：

background: #58a;
color: white;
text-shadow: 0 1px hsl(0,0%,85%),
             0 2px hsl(0,0%,80%), 
             0 3px hsl(0,0%,75%), 
             0 4px hsl(0,0%,70%), 
             0 5px hsl(0,0%,65%), 
             0 5px 10px black;

### 模拟复古标志牌：

color: white;
background: hsl(0,50%,45%);
text-shadow: 1px 1px black, 2px 2px black,
             3px 3px black, 4px 4px black,
             5px 5px black, 6px 6px black,
             7px 7px black, 8px 8px black;

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-111247.png)

[环形文字](http://play.csssecrets.io/circular-text)
-----------------------------------------------

目前我们没有很好的纯CSS方案实现环形问题，只能借助内联SVG来实现这种效果；

在 SVG 中，让文本按照路径排列的基本方法就是用一个 <textPath>元素来包裹住这段文本，再把它们装进一个<text>元素中。这个<textPath> 元素还需要在它的 ID 属性中引用一个 <path> 元素，然后就可以用这个 <path> 元素来定义我们想要的路径

<div class="circular">
    <svg viewBox="0 0 100 100">
        <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
    </svg>
</div>

这个效果的实现比较复杂，所以直接点击上面标题链接查看吧。。

用户体验
====

选用合适的鼠标光标
---------

在[CSS 基本UI 特性（第三版）](http://w3.org/TR/css3-ui/#cursor)中，我们获得了一大批新的内建光标： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-113201.png)

[扩大可点击区域](http://play.csssecrets.io/hit-area)
---------------------------------------------

[Fitts法则](http://simonwallner.at/ext/fitts/)：人类移动到某个目标区域所需的最短时间是由目标距离与目标宽度之比所构成的对数函数；所以将可点击区域（热区）向外扩张往往可以带来可用性的提升，我们还需要了解：**伪元素同样可以代表其宿主元素来响应鼠标交互**

所以，我们可以在按钮的上层覆盖一层透明的伪元素，并让伪元素在四个方向上都比宿主元素大出 10px：

button {
    position: relative;
    /\* \[其余样式\] */ 
}
button::before { 
    content: '';
    position: absolute;
    top: -10px; right: -10px; 
    bottom: -10px; left: -10px;
}

这个基于伪元素的解决方案极为灵活，我们基本上可以把热区设置为任何想要的尺寸、位置或形状，甚至可以脱离元素原有的位置!

自定义复选框
------

知识点：伪类选择符:checked和属性选择符\[checked\]之间的区别是**后者是不会根据用户的交互行为进行更新的，因为用户的交互并不会影响到 HTML 标签上的属性**。 下面是作者实现的效果： [自定义复选框](http://play.csssecrets.io/checkboxes) [开关式按钮](http://play.csssecrets.io/toggle-buttons)

通过阴影来弱化背景
---------

很多时候，我们需要通过一层半透明的遮罩层来把后面的一切整体调暗，以便凸显某个特定的 UI 元素，引导用户关注

### 伪元素方案

我们可以通过伪元素来添加：

body.dimmed::before { 
    position: fixed; 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: rgba(0,0,0,.8);
}

伪元素方案的缺点：**伪元素无法绑定独立的JavaScript事件处理函数；**同时::before伪元素有可能已经被占用；还需要一点JavaScript来给<body>添加dimmed这个类

### [box-shadow方案](http://play.csssecrets.io/dimming-box-shadow)

box-shadow 的扩张参数可以把元素的投影向各个方向延伸放大。具体做法就是生成一个巨大的投影，不偏移也不模糊，简单而拙劣地模拟出遮罩层的效果:

box-shadow: 0 0 0 50vmax rgba(0,0,0,.8);

但是它也存在两个非常严重的问题：当我们滚动页面时，遮罩层的边缘就露出来了；**它只能在视觉上起到引导注意力的作用，却无法阻止鼠标交互**

### [backdrop方案](http://play.csssecrets.io/native-modal)

如果你想引导用户关注元素就是一个模态的 <dialog> 元素，那么根据浏览器的默认样式，它会自带一个遮罩层。借助 ::backdrop 伪元素，这个原生的遮罩层也是可以设置样式的，比如可以把它变得更暗一些：

dialog::backdrop {
    background: rgba(0, 0, 0, .8);
}

唯一需要注意的地方在于，**浏览器对它的支持还极为有限**

[通过模糊来弱化背景](http://play.csssecrets.io/deemphasizing-blur)
---------------------------------------------------------

我们需要一个额外的HTML元素来实现这个效果：需要把页面上除了关键元素之外的一切都包裹起来，这样就可以只对这个容器元素进行模糊处理了：

<main>Bacon Ipsum dolor sit amet...</main> 
<dialog>
    O HAI, I'm a dialog. Click on me to dismiss.
</dialog>
<!\-\- 其他对话框都写在这里 -->

接下来，每当弹出一个对话框，都需要给<main>元素增加一个类，以便对它应用模糊滤镜：

main.de-emphasized { 
    filter: blur(5px);
}

[滚动提示](http://play.csssecrets.io/scrolling-hints)
-------------------------------------------------

我们需要实现的效果类似Google Reader中的一种用户体验模式：当侧边栏的容器还有更多内容时，一层淡淡的阴影会出现在容器的顶部和 / 或底部，用来提示侧边栏需要滚动才能看到完整的内容 ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-125918.png) 我们可以用纯CSS实现这种效果，利用的就是background-attachment属性的一个关键字：local，但是**我们需要两层背景**：一层用来生成那条阴影，另一层基本上就是一个用来遮挡阴影的白色矩形，其作用类似于遮罩层。生成阴影的那层背景将具有默认的 background-attachment 值(scroll)，因为我们希望它总是保持在原位。我们把遮罩背景的 background-attachment 属性设置为 local，这样它就会在我们滚动到最顶部时盖住阴影，在向下滚动时跟着滚动，从而露出阴影。

background: linear-gradient(white 30%, transparent), 
            radial-gradient(at 50% 0, rgba(0,0,0,.2),transparent 70%); 
background-repeat: no-repeat;
background-size: 100% 50px, 100% 15px; 
background-attachment: local, scroll;

但是为了完整地实现这个效果，我们**还需要再用两层渐变来实现底部的阴影和它配套的遮罩**，具体实现可以点击上面的链接查看

交互式的图片对比控件
----------

有时，我们需要展示两张图片的外观差异，通常是“之前和之后”形式的对比

### [CSS resize方案](http://play.csssecrets.io/image-slider)

resize属性可以让某个元素的大小变得可调整，我们的第一个念头可能是列出两个 <img> 元素。但是，直接对一个 <img> 元素应用 resize 看起来会很怪异，因为直接调整图片大小会导致其变形失真。如果用一个 <div> 作为它的容器，再对这个容器应用 resize 属性，那就合理多了：

<div class="image-slider"> 
    <div>
        <img src="adamcatlace-before.jpg" alt="Before" /> 
    </div>
    <img src="adamcatlace-after.jpg" alt="After" /> 
</div>

**resize起作用的前提条件是它的overflow属性不是visible；**同时我们可以通过伪元素改变调节手柄的样式；最后，我们可以对这两张图片应用 user-select: none，这样即使用户在没有点中调节手柄的情况下拖动鼠标，也不会误选图片：

.image-slider { 
    position:relative; 
    display: inline-block;
}
.image-slider > div { 
    position: absolute;
    top: 0; bottom: 0; left: 0; 
    width: 50%;
    max-width: 100%;
    overflow: hidden;
    resize: horizontal; 
}
.image-slider > div::before { 
    content: '';
    position: absolute; 
    bottom: 0; right: 0; 
    width: 12px; height: 12px; 
    padding: 5px;
    background: linear-gradient(-45deg, white 50%, transparent 0); 
    background-clip: content-box;
    cursor: ew-resize;
}
.image-slider img { 
    display: block;
    user-select: none; 
}

### 范围输入控件方案

上面的CSS resize方案有一些不足之处：

*   对键盘来说不可访问
*   调整上层图片的唯一方法就是拖动
*   用户只能在右下角进行调整大小的操作

我们可以将原生的滑块控件（HTML范围输入控件）覆盖在图片上，用它来控制上层图片的伸缩，这样就可以解决上述三个问题，同时为了让范围输入控件在视觉上与整个控件更加统一，可以用混合模式和滤镜来实现，最终实现效果： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-150108.png)

结构与布局
=====

[自适应内部元素](http://play.csssecrets.io/intrinsic-sizing)
-----------------------------------------------------

众所周知，如果不给元素指定一个具体的 height，它就会自动适应其内容的高度。假如我们希望 width 也具有类似的行为，该怎么做呢?

CSS内部与外部尺寸模型（第三版）为width和height属性定义了一些新的关键字，其中最有用的应该就是min-content了。这个关键字将解析为这个容器内部最大的不可断行元素的宽度(即最宽的单词、图片或具有固定宽度的盒元素)。这正是我们梦寐以求的！为了给那些旧版浏览器提供一个平稳的回退样式，我们需要在使用这个技巧的同时，提供一个固定的 max-width 值：

figure {
    max-width: 300px; 
    max-width: min-content; 
    margin: auto;
}
figure > img { max-width: inherit; }

关于width和height的新关键字，还有max-content，它的行为类似于我们在前面看到的display: inline-block；而 fit-content 的行为与浮动元素是相同的(和 min-content 的效果通常一致，但也有例外)。

[精确控制表格列宽](http://play.csssecrets.io/table-column-widths)
---------------------------------------------------------

对于不固定的内容来说，表格的布局是很难预测的，这是因为**列宽根据其内容进行调整**，即使我们显式地指定了 width。解决方案来自于CSS 2.1中一个鲜为人知的属性，叫做table-layout，它的默认值是 auto，其行为模式被称作自动表格布局算法，也就是我们最为熟悉的表格布局行为。不过，它还接受另外一个值 **fixed**，这个值的行为要明显可控一些，使用也很简单：

table {
    table-layout: fixed; 
    width: 100%;
}

[根据兄弟元素的数量来设置样式](http://play.csssecrets.io/styling-sibling-count)
-----------------------------------------------------------------

在某些场景下，我们需要根据兄弟元素的总数来为它们设置样式。

对于只有一个列表项的特殊场景来说，解决方案显然就是:only-child：

li:only-child {
    /\* 只有一个列表项时的样式 */
}

实际上，:only-child等效于:first-child:last-child，道理就是：如果第一项也是最后一项，那它就是唯一的那一项；而**:first-child:nth-last-child(4)会匹配到一个正好有四个列表项的列表中的第一个列表项**，所以下面的选择符就相当于**在这个列表正好包含四个列表项时，命中它的每一项**：

li:first-child:nth-last-child(4), 
li:first-child:nth-last-child(4) ~ li {
    /\* 当列表正好包含四项时，命中所有列表项 */ 
}

利用选择符的表达式，我们可以**在列表项的总数是4或更多时选中所有列表项**：

li:first-child:nth-last-child(n+4), 
li:first-child:nth-last-child(n+4) ~ li {
    /\* 当列表至少包含四项时，命中所有列表项 */ 
}

同理，-n+b这种形式的表达式可以选中开头的b个元素。因此，我们可以**在列表项的总数是4个或更少时选中所有列表项**：

li:first-child:nth-last-child(-n+4), 
li:first-child:nth-last-child(-n+4) ~ li { 
    /\* 当列表最多包含四项时，命中所有列表项 */
}

当然，我们还可以把这两种技巧组合起来使用，不过代码也会变得更加复杂。假设我们希望**在列表包含 2 ~ 6 个列表项时命中所有的列表项**，可以这样写:

li:first-child:nth-last-child(n+2):nth-last-child(-n+6), 
li:first-child:nth-last-child(n+2):nth-last-child(-n+6) ~ li {
    /\* 当列表包含2~6项时，命中所有列表项 */ 
}

[满幅的背景，定宽的内容](http://play.csssecrets.io/fluid-fixed)
----------------------------------------------------

背景宽度满幅，内容宽度固定的设计手法在网页的页脚中经常看到： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-155731.png) 绝大多数的网页设计师/工程师都是用两层元素来实现的，那么能不能用一层元素实现呢？其实我们可以用calc()来实现内容的居中：

footer {
    max-width: 900px;
    padding:1em;  /* 回退样式 */
    padding: 1em calc(50% - 450px); 
    background: #333;
}

垂直居中
----

> 44年前我们就把人类送上月球了，但现在我们仍然无法在CSS中实现垂直居中
> 
> ——James Anderson

### 几种十分流行的技巧：

*   表格布局法
*   行内块法

Chris Coyier写的[“不为人知的居中方法”](http://css-tricks.com/centering-in-the-unknown)详细讲述了这两种技巧

### [基于绝对定位的解决方案](http://play.csssecrets.io/vertical-centering-abs)

早期的垂直居中方法，它要求元素具有固定的宽度和高度：

main {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -3em; /* 6/2 = 3 */ 
    margin-left: -9em; /* 18/2 = 9 */ 
    width: 18em;
    height: 6em;
}

CSS 领域有一个很常见的现象，真正的解决方案往往来自于我们最意想不到的地方。当我们在translate() 变形函数中使用百分比值时，是以这个元素自身的宽度和高度为基准进行换算和移动的，所以就解除了对固定尺寸的依赖：

main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

上面这个方法有一些需要注意的地方：

*   有时不能选用绝对定位
*   如果需要居中的元素已经在高度上超过了视口，那它的顶部会被视口裁切掉
*   在某些浏览器中，这个方法可能会导致元素的显示有一些模糊

### [基于视口单位的解决方案](http://play.csssecrets.io/vertical-centering-vh)

main {
    width: 18em;
    padding: 1em 1.5em;
    margin: 50vh auto 0; 
    transform: translateY(-50%);
}

### [基于Flexbox的解决方案](http://play.csssecrets.io/vertical-centering)

这是毋庸置疑的最佳解决方案：

body {
    display: flex;
    min-height: 100vh;
    margin: 0; 
}
main {
    margin: auto;
}

当我们使用Flexbox时，margin:auto不仅在水平方向上将元素居中，垂直方向上也是如此

紧贴底部的页脚
-------

这是一个相当常见的问题：我们希望内容很长时，页脚在内容的尾部；而如果内容很短，页脚会在视口的底部。

### 一些解决方案（仍然有局限之处）：

[https://css-tricks.com/snippets/css/sticky-footer/](https://css-tricks.com/snippets/css/sticky-footer/) [https://pixelsvsbytes.com/2011/09/sticky-css-footers-the-flexible-way/](https://pixelsvsbytes.com/2011/09/sticky-css-footers-the-flexible-way/)

### [固定高度的解决方案](http://play.csssecrets.io/sticky-footer-fixed)

我们可以通过计算给内容指定最小高度，然后就可以将页脚“固定”到底部：

main {
    min-height: calc(100vh - 7em); /* 7em为页脚高度 */ 
    box-sizing: border-box;
}

### [Flexbox的解决方案](http://play.csssecrets.io/sticky-footer)

我们需要对<body>元素设置display:flex，然后将其min-height属性指定为100vh，这样它就至少会占据整个视口的高度；此时我们所期望的是，页头和页脚的高度由其内部元素来决定，而内容区块的高度应该可以自动伸展并占满所有的可用空间。我们只要给 <main>这个容器的 flex 属性指定一个大于 0 的值(比如 1 即可)，就可以实现这个效果了:

body {
    display: flex;
    flex-flow: column;
    min-height: 100vh; 
}
main { flex: 1; }

过渡与动画
=====

缓动效果
----

在现实世界中，物体从A点到B点的移动往往不是完全匀速的

### [弹跳动画](http://play.csssecrets.io/bounce)

CSS 提供了一个 cubic-bezier()函数，允许我们指定自定义的调速函数，借助该函数，我们可以近乎完美的实现回弹动画：

@keyframes bounce { 
    60%, 80%, to {
        transform: translateY(400px);
        animation-timing-function: ease; 
    }
    70% { transform: translateY(300px); }
    90% { transform: translateY(360px); } 
}
.ball {
    /\* 外观样式 */
    animation: bounce 3s cubic-bezier(.1,.25,1,.25); 
}

### [弹性过渡](http://play.csssecrets.io/elastic)

同样是cubic-bezier()函数的使用：

input:not(:focus) + .callout { 
    transform: scale(0); 
    transition: .25s transform;
}
.callout {
    transform-origin: 1.4em -.4em;
    transition: .5s cubic-bezier(.25,.1,.3,1.5) transform;
}

### [逐帧动画](http://play.csssecrets.io/frame-by-frame)

在很多时候，我们需要一个很难（或不可能）只通过某些CSS属性的过渡来实现的动画。但由于GIF不具备透明的特性，所以下面的加载提示只能用CSS动画实现： ![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-171610.png) 而如何实现这种逐帧动画效果呢？秘诀就是steps()这个调速函数，steps()函数会使整个动画在帧与帧之间硬切，所以只需把动画的代码修改为下面的形式：

animation: loader 1s infinite steps(8);

[闪烁效果](http://play.csssecrets.io/blink)
---------------------------------------

这里涉及到的知识点是animation-direction中的alternate属性，它的作用是反转第偶数个循环周期（包括调整函数）：

> animation-direction: normal | alternate | reverse | alternate-reverse

![](https://merrier.wang/wp-content/uploads/2017/07/WX20170710-172708.png)

[打字动画](http://play.csssecrets.io/typing)
----------------------------------------

CSS值与单位规范引入了一个新单位，表示“0”字形的宽度，叫做 ch ；在等宽字体中，“0”字形的宽度和其他所有字形的宽度是一样的，所以如果我们用 ch 单位来表达一段文本的宽度，那取值实际上就是字符的数量；最后，我们可以借助上面的闪烁动画的原理来实现文字后面闪烁的光标

[状态平滑的动画](http://play.csssecrets.io/state-animations)
-----------------------------------------------------

我们需要根据用户的交互行为来暂停动画和继续之前的动画状态，从而避免生硬的跳回现象，而animation-play-state正是为这种暂停动画的需求专门设计的：

@keyframes panoramic {
    to { background-position: 100% 0; }
}
.panoramic {
    width: 150px; height: 150px;
    background: url("img/naxos-greece.jpg"); 
    background-size: auto 100%;
    animation: panoramic 10s linear infinite alternate; 
    animation-play-state: paused;
}
.panoramic:hover, .panoramic:focus { 
    animation-play-state: running;
}

沿环形路径平移的动画
----------

我们需要让一个元素沿着环形路径动起来，同时元素中的内容（图片、文字）不能发生旋转

### [需要两个元素的解决方案](http://play.csssecrets.io/circular-2elements)

我们让元素旋转，同时让其中的内容以相反的方向进行自转，从而可以抵消元素旋转的影响，由此可见，我们可以用animation-direction来实现这样的效果：

@keyframes spin {
    to { transform: rotate(1turn); }
}
.avatar {
    animation: spin 3s infinite linear; 
    transform-origin: 50% 150px; /* 150px = 路径的半径 */
}
.avatar > img {
    animation: inherit; 
    animation-direction: reverse;
}

### [单个元素的解决方案](http://play.csssecrets.io/circular)

> “transform-origin只是一个语法糖而已。实际上你总是可以用translate()来代替它。”
> 
> ——Aryeh Gregor