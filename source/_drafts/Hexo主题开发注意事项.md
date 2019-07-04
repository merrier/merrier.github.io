---
title: Hexo主题开发注意事项
categories:
  - 分类
tags:
  - 标签
comments: true
date: 2019-01-21 11:24:45
img:
---

## 需要提供的功能

### 弹幕功能

类似于博客：https://www.bestvist.com/p/59

### 1、复制内容后面附加额外内容

复制网页上面内容时，自动在剪切板内容后面加上网站信息，这样也利于 SEO 优化：

```javascript
document.body.oncopy = function () {
  setTimeout(function (){
    var text = clipboardData.getData("text");
    if (text) {
      text = text + "\\r\\n本篇文章来源于 www.地址.COM 原文链接："+location.href;
      clipboardData.setData("text", text);
    }
  }, 100)
}
```


### 自定义网站在 iPhone 上的“添加至主屏幕”的图标

https://blog.wpjam.com/m/apple-touch-icon/

为网站添加 iOS 图标：https://www.jianshu.com/p/ff35c7d016e2


### 百度自动推送site.map

https://juejin.im/post/590b451a0ce46300588c43a0


### 文章排序方式多样化

默认按时间倒序，可以随机排序，按照浏览器进行排序

### 支持夜间模式

类似于 https://overreacted.io/