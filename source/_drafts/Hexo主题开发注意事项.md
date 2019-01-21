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