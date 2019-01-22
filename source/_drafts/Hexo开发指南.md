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

## gulp 报错 Task function must be specified

有人遇到过同样的问题，提了一个issue：[Error - "Task function must be specified"](https://github.com/gulpjs/undertaker/issues/54)，看完之后发现最后的解决方案是将 gulp 回滚到 v3 。。

## 添加 404 页面

可以选择添加纯页面或匹配主题的 404 页面：

### 纯页面

与普通的 html 网页相同，放置在根目录（source/）下，同时文件命名为 404.html 即可；不过需要注意的是，要在文件顶部添加以下内容：

```markdown
---
title: 404 Not Found
layout: false
---
```

添加以上内容后，下面的内容就是普通的 html 了，大家用的比较多的是腾讯 404 公益页面，添加以下代码即可：

```html
<!DOCTYPE html>
<html>
    <head>
         <meta charset="UTF-8" />
         <title>404</title>                                                                                                                                        
    </head>
    <body>
         <script type="text/javascript"     src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" homePageName="返回首页" homePageUrl="https://merrier.wang"></script>
	</body>
</html>
```

**注意**：需要把上面代码中的 homePageUrl 换成你自己的博客主页地址。

### 匹配主题的 404 页面

有时候我们可能不想展示单纯的 html 页面，想展示能够匹配当前使用主题的页面，下面介绍一下操作流程：

首先，新建一个页面：

```bash
hexo new page 404
```

然后，进入刚新建的页面文件，路径一般为 `/source/404/index.md`；在顶部插入一行，写上 `permalink: /404`，这表示指定该页固定链接为 `http://"主页"/404.html`：

```markdown
---
title: 404 Not Found
comments: false
permalink: /404
---
```

经过上面的设置后，404界面已生效，其编辑方式与一般文章无异。我们可以在 .md 文件正文中插入一些 CSS 样式，使得该页面与博客中的一般文章有所区别。

### 参考文章

* [Hexo博客设置404页面](http://www.ly554.com/hexosls.html)
* [hexo添加404公益界面](https://blog.csdn.net/liu1340308350/article/details/81744824)
* [在 Hexo 中创建匹配主题的404页面](http://moxfive.xyz/2015/10/16/hexo-404-page/)

## 运行`hexo g`出错

报错为以下所示：

```
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html
TypeError: Cannot set property 'lastIndex' of undefined
    at highlight (/home/travis/build/merrier/merrier.github.io/node_modules/highlight.js/lib/highlight.js:523:35)
    at /home/travis/build/merrier/merrier.github.io/node_modules/highlight.js/lib/highlight.js:573:21
```

从上面的错误栈可以看到应该是 `highlight.js` 