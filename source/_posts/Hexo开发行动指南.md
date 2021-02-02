---
title: Hexo开发行动指南
urlname: hexo-development-action-guide
categories:
  - Hexo
tags:
  - Hexo
  - 指南
date: 2019-01-08 20:09:14
img: /images/hexo_thumbnail_25.png
---

## 无后端评论系统

Valine - 一款快速、简洁且高效的无后端评论系统。

官网：https://valine.js.org/


## 托管静态网站

建议使用腾讯云cos托管静态网站，一个月才1毛钱，还能用CDN加速：https://cloud.tencent.com/document/product/436/9512

## Hexo 分类和标签的路径怎么设置成英文

参考：https://github.com/hexojs/hexo/issues/1162#issuecomment-88857896

## 构建静态文件无法生成 index.html 等文件

需要查看 `themes/{your-theme-document}` 目录下是否有主题相关内容，以及根目录下 `_config.yml` 中设置的主题和 `themes` 目录下的主题文件夹命名是否相同，如果无内容或者命名不同，都会有问题。

> 在利用 Travis CI 进行部署的时候发现 `index.html` 是空的，后来发现还是因为主题目录下内容为空，后来就在 `themes` 文件夹下新建了一个文件夹，然后把主题相关文件都拷贝过去了，这样就解决了这个问题，而内容为空的原因还不了解。

## disqus 报错 Cannot read property 'appendChild' of null

很多 Hexo 主题中都会内置 Disqus 评论模块，但是有时候会发现评论模块没有加载出来，然后控制台报错 `Cannot read property 'appendChild' of null`，经过排查发现，是因为有一个 div 并没有加载，需要在模板中加入以下代码：

```html
<div id="disqus_thread">
  <noscript>Please enable JavaScript to view the <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</div>
```

## gulp 报错 Task function must be specified

有人遇到过同样的问题，提了一个 issue：[Error - "Task function must be specified"](https://github.com/gulpjs/undertaker/issues/54)，看完之后发现最后的解决方案是将 gulp 回滚到 v3 。。回滚之后确实不报错了。。

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

经过上面的设置后，404 界面已生效，其编辑方式与一般文章无异。我们可以在 .md 文件正文中插入一些 CSS 样式，使得该页面与博客中的一般文章有所区别。

### 参考文章

* [Hexo博客设置404页面](http://www.ly554.com/hexosls.html)
* [hexo添加404公益界面](https://blog.csdn.net/liu1340308350/article/details/81744824)
* [在 Hexo 中创建匹配主题的404页面](http://moxfive.xyz/2015/10/16/hexo-404-page/)

## 运行 `hexo g` 出错

报错为以下所示：

```
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html
TypeError: Cannot set property 'lastIndex' of undefined
    at highlight (/home/travis/build/merrier/merrier.github.io/node_modules/highlight.js/lib/highlight.js:523:35)
    at /home/travis/build/merrier/merrier.github.io/node_modules/highlight.js/lib/highlight.js:573:21
```

从上面的错误栈可以看到应该是 `highlight.js` 报的错，后来我在 hexo 的 issue 中找到了解决方案：[_config.yml中auto_detect设为false](https://github.com/hexojs/hexo/issues/1913#issuecomment-245480139)

## Template render error: (unknown path)

执行 `hexo s` 时报上面的错，在 [hexo 的 github issue](https://github.com/hexojs/hexo/issues/2384#issuecomment-277494121) 中找到了解决方案（尝试一下全局搜索）

## 当文章中出现 Nunjucks 中的语法符号时无法生成网页

参考：http://www.one-more-tech.info/hexo-%E4%B8%AD%7B%7Bcontent%7D%7D-%E5%AF%BC%E8%87%B4%E6%96%87%E7%AB%A0%E5%86%85%E5%AE%B9%E5%BC%82%E5%B8%B8/index/ 和 https://hoxis.github.io/hexo-unexpected-token.html

## 扩展阅读

* [Easy Hexo | 轻松使用 Hexo 建站](https://github.com/EasyHexo/Easy-Hexo)
* [hexo 摸爬滚打之进阶教程](http://muyunyun.cn/posts/f55182c5/)
* [hexo搭建博客最全攻略](https://juejin.im/entry/5a9144896fb9a063523e0e97)
* [Hexo 入门指南](https://wizardforcel.gitbooks.io/markdown-simple-world/hexo-tutor-1.html)
* [hexo链接持久化终极解决之道](https://blog.csdn.net/yanzi1225627/article/details/77761488)
* [实战--迁移wordpress 到hexo](https://www.m690.com/archives/1135/)
* [hexo是怎么工作的](http://coderunthings.com/2017/08/20/howhexoworks/)
* [Hexo Seo优化让你的博客在google搜索排名第一](http://hunao.info/2016/06/01/Hexo-Seo%E4%BC%98%E5%8C%96%E8%AE%A9%E4%BD%A0%E7%9A%84%E5%8D%9A%E5%AE%A2%E5%9C%A8google%E6%90%9C%E7%B4%A2%E6%8E%92%E5%90%8D%E7%AC%AC%E4%B8%80/)