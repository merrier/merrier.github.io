---
title: Hexo开发指南
categories:
  - 分类
tags:
  - 标签
comments: true
date: 2019-01-08 20:09:14
img:
---

## 构建静态文件无法生成 index.html 等文件

需要查看 `themes/{{your-theme-document}}` 目录下是否有主题相关内容，以及根目录下 `_config.yml` 中设置的主题和 `themes` 目录下的主题文件夹命名是否相同，如果无内容或者命名不同，都会有问题。

> 在利用Travis CI进行部署的时候发现`index.html`是空的，后来发现还是因为主题目录下内容为空，后来就在`themes`文件夹下新建了一个文件夹，然后把主题相关文件都拷贝过去了，这样就解决了这个问题，而内容为空的原因还不了解。

## disqus 报错 Cannot read property 'appendChild' of null

很多Hexo主题中都会内置 Disqus 评论模块，但是有时候会发现评论模块没有加载出来，然后控制台报错 `Cannot read property 'appendChild' of null`，经过排查发现，是因为有一个div并没有加载，需要在模板中加入以下代码：

```html
<div id="disqus_thread">
  <noscript>Please enable JavaScript to view the <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</div>
```