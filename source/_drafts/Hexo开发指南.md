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

# 构建静态文件无法生成 index.html 等文件

需要查看 `themes/{{your-theme-document}}` 目录下是否有主题相关内容，以及根目录下 `_config.yml` 中设置的主题和 `themes` 目录下的主题文件夹命名是否相同，如果无内容或者命名不同，都会有问题。

> 在利用Travis CI进行部署的时候发现`index.html`是空的，后来发现还是因为主题目录下内容为空，后来就在`themes`文件夹下新建了一个文件夹，然后把主题相关文件都拷贝过去了，这样就解决了这个问题，而内容为空的原因还不了解。

# disqus 报错 Cannot read property 'appendChild' of null

很多Hexo主题中都会内置 Disqus 评论模块，但是有时候会发现评论模块没有加载出来，然后控制台报错 `Cannot read property 'appendChild' of null`，经过排查发现，是因为有一个div并没有加载，需要在模板中加入以下代码：

```html
<div id="disqus_thread">
  <noscript>Please enable JavaScript to view the <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</div>
```

# 如何引用图片

在写文章时，常常有插入图片的需求。Hexo有多种图片插入方式，可以将图片存放在本地引用或者将图片放在CDN上进行引用。

## 本地引用-绝对路径

> 这也是我目前采取的方式

我们可以将图片统一放在 `source/images` 文件夹中，通过markdown语法访问它们:

```markdown
![](/images/image.jpg)
```

然后渲染出来的话也是绝对路径：

```html
<img src="/images/image.jpg">
```

## 本地引用-相对路径

图片除了可以放在统一的images文件夹中，还可以放在文章自己的目录中。文章的目录可以通过配置_config.yml来生成:

```yaml
# _config.yml
post_asset_folder: true
```

将_config.yml文件中的配置项post_asset_folder设为true后，执行命令$ hexo new post_name，在source/_posts中会生成文章post_name.md和同名文件夹post_name。将图片资源放在post_name中，文章就可以使用相对路径引用图片资源了。

```markdown
![](image.jpg)
```

上述是markdown的引用方式，图片只能在文章中显示，但无法在首页中正常显示。如果希望图片在文章和首页中同时显示，可以使用标签插件语法：

```
{% asset_img image.jpg This is an image %}
```

当然，这种语法不太友好，所以有人写了一款插件：[hexo-asset-image](https://github.com/CodeFalling/hexo-asset-image)，这款插件可以自动将图片地址替换为绝对路径，使用方法也很简单：
1. 首先确保`post_asset_folder: true`
2. 然后这样引用就可以了:
```markdown
![logo](logo.jpg)
```

## CDN引用

除了引用本地图片，还可以将图片上传到一些免费的CDN服务中。关于如何上传至CDN服务这一问题，google上面有很多回答了，就不在这里展开了。