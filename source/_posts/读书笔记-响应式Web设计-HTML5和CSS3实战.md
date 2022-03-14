---
title: 读书笔记-响应式Web设计-HTML5和CSS3实战
urlname: html5-and-css3-actual-warfare
id: 514
categories:
  - 笔记
tags:
  - CSS
  - HTML
  - 笔记
date: 2017-04-06 17:17:52
img: /images/hexo_thumbnail_106.jpg
---

## 1. 一句话概括响应式设计

如果要用一句话概括响应式网页设计，我觉得它是针对任意设备对网页内容进行完美布局的一种显示机制.相反，如果需要根据不同设备提供特定的内容和功能，那就需要一个真正的“手机版”网站.这种情况下，手机版网站会提供与桌面版网站完全不同的用户体验.

## 2. CSS reset 网站

* [http://meyerweb.com/eric/tools/css/reset/](http://meyerweb.com/eric/tools/css/reset/)，Eric Meyer的原版，主要针对HTML4
* [http://meyerweb.com/eric/tools/css/reset/ http://necolas.github.com/normalize.css/](http://meyerweb.com/eric/tools/css/reset/ http://necolas.github.com/normalize.css/)，针对HTML5

## 3. CSS 网格系统

<div align='center'><img src='/images/hexo_post_297.png' alt='' width='550'/></div>

## 4. 地标角色属性

role="" 针对文档结构的各部分分别有如下的地标角色：

* application：用来定义用作网页应用的区域；
* banner：用来定义一个站点级别(而不是某个特定文档的)的区域.如网站的头部和logo；
* complementary：一个对页面主要区域进行补充说明的区域；
* contentinfo：与页面主要内容相关的信息区域，例如页脚的网站版权信息区域；
* form：定义表单，但是如果表单用于搜索，请使用search来替代；
* main：页面的主体内容；
* navigation：链向当前文档或相关文档的导航链接；
* search：一个用于搜索的区域。

## 5. 导航栏使用 table 显示模式

```css
nav{
  display: table;
}
nav ul{
  display: table-row;
}
nav ul li{
  display: table-cell;
}
```

这样做可以保证如果有另外的列表项追加进来，同样会自动地调整它们之间的间距。最后，使用 CSS3 选择器将最后一个列表项的文字置为右对齐，将第一个列表项的文字置为左对齐。

```css
nav ul li:last-child {
  text-align: right;
}
nav ul li:first-child {
  text-align: left;
}
```

## 6. 在响应式设计中使用自定义 @font-face 字体的注意事项

唯一需要注意的，是在响应式设计中使用该技术时要考虑到字体文件大小。有些字体可能会非常庞大，如果你想保持网站的高性能，请注意控制自定义字体的文件尺寸。

## 7. 浮雕文字效果

```css
text-shadow: 0 1px 0 hsla(0， 0%， 100%， 0.75);
```

不要模糊，不要水平阴影，仅在垂直方向设置 1 或 2 像素的"白影"即可。

## 8. 让整个屏幕飞舞

```css
*{ transition: all 1s; }
```
<div align='center'><img src='/images/hexo_post_298.png' alt='' width='550'/></div>

## 9. CSS3 实现 3D 变形效果

### 在父级元素上设置透视，这样就开启了 3D 场景

```css
.father{ -webkit-perspective: 200; }
```

透视的值越大，就表示你的视点与 3D 场景之间的景深越大。因此，如果想要一点隐约的 3D 效果，就增大透视值；如果想要非常明显的 3D 效果，则减小透视值。

### 延续父元素的透视

```css
.son{ -webkit-transform-style: perserve-3d; -webkit-transition: 1s; }
```

.father 类中添加的透视声明只会应用到其第一个子元素上。因此，为了延续父元素的透视，我们给 .son 元素设定了 preserve-3d (这样可以设置一个 3D 场景)。

### 当鼠标悬停在 .father 模块上时，我们给 .son 这个 div 添加一个翻转效果

```css
.father:hover .son{ -webkit-transform: rotateY(180deg); }
```

### 当海报翻转之后隐藏在其背面内容

```css
.face { position: absolute; -webkit-backface-visibility: hidden; }
```

.face 必须使用绝对定位，这样海报才能盖在 .back 这个 div 的上面

### 给 .back 加上 rotateY

```css
.back { -webkit-transform: rotateY(180deg); }
```

不加这句的话，.back 这个 div 就会显示在正面海报之上。最终的 HTML 结构以及 CSS 样式如下:

```html
<section class="Qcontainer">
  <div class="film">
    <div class="face front">
      <img src="img/goonies.jpg" alt="The Goonies" />
    </div>
    <div class="face back">
      <h5>HOT!</h5>
    </div>
  </div>
</section>
```

```css
.Qcontainer {
  height: 100%;
  width: 28%;
  position: relative;
  -webkit-perspective: 800;
  float: left;
  margin-right: 2%;
}

.film {
  width: 100%;
  height: 15em;
  -webkit-transform-style: preserve-3d;
  -webkit-transition: 1s;
}

.Qcontainer:hover .film {
  -webkit-transform: rotateY(180deg);
}

.face {
  position: absolute;
  -webkit-backface-visibility: hidden;
}

.back {
  width: 66%;
  height: 127%;
  -webkit-transform: rotateY(180deg);
  background: #3b3b3b;
  background: -webkit-linear-gradient(top，
  rgba(0，0，0，0.65) 0%，
  rgba(0，0，0，0) 100%);
  padding: 15%;
}
```

## 10. list(及对应的 datalist 元素)

list 属性以及对应的 datalist 元素可以让用户在输入框中开始输入值的时候，显示一组备选值。下面是一个包含在 div 中的使用 list 属性及对应 datalist 元素的代码示例：

```html
<div>
  <label for="awardWon">Award Won</label>
  <input id="awardWon" name="awardWon" type="text" list="awards">
  <datalist id="awards">
    <select>
      <option value="Best Picture"></option>
      <option value="Best Director"></option>
      <option value="Best Adapted Screenplay"></option>
      <option value="Best Original Screenplay"></option>
    </select>
  </datalist>
</div>
```

list 属性中的值（awards）同时也是 datalist 元素的 id。这样就可以让 datalist 与输入项关联起来。虽然将 option 包裹在 select 中不是必需的，但这样做便于为老版本浏览器提供降级方案。

<div align='center'><img src='/images/hexo_post_299.png' alt='' width='550'/></div>