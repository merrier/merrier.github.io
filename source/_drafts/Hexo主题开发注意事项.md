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


## CSS 解决方案

https://github.com/tailwindlabs/tailwindcss，这个看上去很酷

## 代码高亮解决方案

彩虹：https://craig.is/making/rainbows

## 网站 Logo 特效

https://alephjs.org/，中间的三角很有意思，hover 上去的时候会加速，可以借鉴

## 无后端评论系统


Valine - 一款快速、简洁且高效的无后端评论系统。https://valine.js.org/


### 暗黑模式切换动画

https://www.joshwcomeau.com/，切换颜色时的 icon 动画

### 网站自定义配置

https://wproxy.org/whistle/，左上角有字体大小、颜色、字体的设置


### 极客式功能

https://supercodepower.com/，这个站点的搜索很有意思，颇有极客风范


### 文章中可以点赞，并且可以一直点击，还有不错的反馈动效

类似于：https://joshwcomeau.com/css/full-bleed/，滑到文章中间的时候右边出现的爱心可以点击


### 添加底部备案信息链接

【阿里云】尊敬的客户，您好。根据《非经营性互联网信息服务备案管理办法》（原信息产业部令第33号令）规定，请您做好已备案网站主页备案编号的悬挂和链接工作。若未及时整改，将面临监管部门处罚风险。具体通知已发送至贵单位备案联系人邮箱。操作指南：http://a.aliyun.com/f1.jeiMW（此短信可转发给实际网站维护人员参考操作指南来完成操作）

### 自动压缩图片

可以利用 https://github.com/imagemin/imagemin，可以压缩 JPG 和 PNG 类型的图片，同时还支持格式转换，比如讲 JPG 类型的图片转换成 Webp 格式，具体参见：https://juejin.im/post/5df184da518825125e1bad11

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

类似于 https://overreacted.io/ 和 https://www.meckodo.com/，最好是可以跟随系统


## 图文类型的列表页

图片的样式最佳实践，高度 100% 和宽度 100% 都不可取

## 文章加密

可参考：https://github.com/X-Nicolo/X-Nicolo.github.io/blob/master/mcommon.js

主题是 Next

## 全站字数统计

https://x-nicolo.github.io/

## Algolia搜索

https://juejin.im/post/5cd7d3286fb9a0323a01d29a#heading-54

## google site verification

参考：http://hunao.info/2016/06/01/Hexo-Seo%E4%BC%98%E5%8C%96%E8%AE%A9%E4%BD%A0%E7%9A%84%E5%8D%9A%E5%AE%A2%E5%9C%A8google%E6%90%9C%E7%B4%A2%E6%8E%92%E5%90%8D%E7%AC%AC%E4%B8%80/

需要读取 _config.yml 中的配置，进行自动添加

## 扩展阅读

* [Hexo 主题开发指南](http://chensd.com/2016-06/hexo-theme-guide.html)
* [Hexo主题开发经验杂谈](https://molunerfinn.com/make-a-hexo-theme/)

## 需要参考的博客

* [楠哥的个人博客](https://mikelin.cn/)