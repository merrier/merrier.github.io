---
title: JS几种数组遍历方式
urlname: several-array-traversal-modes-of-js
id: 224
categories:
  - JS
tags:
  - JS
  - 数组
date: 2017-03-18 16:50:29
img: /images/hexo_thumbnail_17.jpg
---

这是从 Lichun Dai 博客中看到的一篇文章，作者对 JS 中的数组遍历方式进行了总结，同时进行了性能对比。但根据评论者的回答，性能分析需要结合具体环境，单纯在浏览器中进行测试是难下结论的，所以我只会展示实现的方式，至于在浏览器中的性能可以点击文末的链接跳转至原作者的分析工具 demo。

## 第一种：普通 for 循环

```javascript
for(j = 0; j < arr.length; j++) {
   
}
```

简要说明：最简单的一种，也是使用频率最高的一种，虽然性能不弱，但仍有优化空间

## 第二种：优化版 for 循环

```javascript
for(j = 0,len=arr.length; j < len; j++) {
   
}
```

简要说明: 使用临时变量，将长度缓存起来，避免重复获取数组长度，当数组较大时优化效果才会比较明显。 **这种方法基本上是所有循环遍历方法中性能最高的一种**

## 第三种：弱化版 for 循环

```javascript
for(j = 0; arr\[j\]!=null; j++) {
   
}
```

简要说明: 这种方法其实严格上也属于 for 循环，只不过是没有使用 length 判断，而使用变量本身判断 **实际上，这种方法的性能要远远小于普通 for 循环**

## 第四种：foreach 循环

```javascript
arr.forEach(function(e){  
   
});
```

简要说明: 数组自带的 foreach 循环，使用频率较高，实际上性能比普通 for 循环弱

## 第五种：foreach 变种

```javascript
Array.prototype.forEach.call(arr,function(el){  
   
});
```

简要说明: 由于 foreach 是 Array 型自带的，对于一些非这种类型的，无法直接使用(如 NodeList)，所以才有了这个变种，使用这个变种可以让类似的数组拥有 foreach 功能。 实际性能要比普通 foreach 弱

## 第六种：forin 循环

```javascript
for(j in arr) {
   
}
```

简要说明: 这个循环很多人爱用，但实际上，经分析测试，在众多的循环遍历方式中 **它的效率是最低的**

## 第七种：map 遍历

```javascript
arr.map(function(n){  
   
});
```

简要说明: 这种方式也是用的比较广泛的，虽然用起来比较优雅，但实际效率还比不上 foreach

## 第八种：forof 遍历（ES6）

```javascript
for(let value of arr) {  
   
});
```

简要说明: 这种方式是 ES6 里面用到的，性能要好于 forin，但仍然比不上普通 for 循环

## 结论

**普通 for 循环才是最优雅的**

## 参考链接

* [JS几种数组遍历方式以及性能分析对比](https://dailc.github.io/2016/11/25/baseKnowlenge_javascript_jsarrayGoThrough.html)
* [Js中几种常用数组遍历方式分析比较工具](https://dailc.github.io/jsfoundation-perfanalysis/html/performanceAnalysis/demo_performanceAnalysis_jsarrayGoThrough.html)