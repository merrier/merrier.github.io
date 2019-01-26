---
title: Hexo中图片处理正确姿势
urlname: image-skills-in-hexo
id: 34891
categories:
  - Hexo
tags:
  - Hexo
  - 技巧
date: 2019-01-11 15:12:56
img: /images/hexo_thumbnail_25.png
---

## 如何引用图片

在写文章时，常常有插入图片的需求。Hexo 有多种图片插入方式，可以将图片存放在本地引用或者将图片放在 CDN 上进行引用。

### 本地引用-绝对路径

这也是我目前采取的方式，我们可以将图片统一放在 `source/images` 文件夹中，通过 Markdown 语法访问它们:

```markdown
![](/images/image_name.jpg)
```

然后渲染出来的话也是绝对路径：

```html
<img src="/images/image.jpg">
```

### 本地引用-相对路径

图片除了可以放在统一的 images 文件夹中，还可以放在文章自己的目录中。文章的目录可以通过配置 _config.yml 来生成:

```yaml
# _config.yml
post_asset_folder: true
```

将 _config.yml 文件中的配置项 post_asset_folder 设为 true 后，执行命令 `$ hexo new post_name`，在 source/_posts 中会生成文章 post_name.md 和同名文件夹 post_name。将图片资源放在 post_name 中，文章就可以使用相对路径引用图片资源了。

```markdown
![](image_name.jpg)
```

上述是 Markdown 的引用方式，图片只能在文章中显示，但无法在首页中正常显示。如果希望图片在文章和首页中同时显示，可以使用标签插件语法：

```
{% asset_img image_name.jpg This is an image %}
```

当然，这种语法不太友好，所以有人写了一款插件：[hexo-asset-image](https://github.com/CodeFalling/hexo-asset-image)，这款插件可以自动将图片地址替换为绝对路径，使用方法也很简单：

1. 首先确保 `post_asset_folder: true`
2. 然后这样引用就可以了:

```markdown
![logo](logo.jpg)
```

### CDN 引用

除了引用本地图片，还可以将图片上传到一些免费的 CDN 服务中。关于如何上传至 CDN 服务这一问题，google 上面有很多回答了，就不在这里展开了。

## 图片命名

图片命名是一件很重要的事，因为如果命名不好，后期维护起来会比较麻烦；而我推荐的命名方式是 `hexo_{function}_{id}`，图片都放在 `source/images` 文件夹中：

* hexo_post_1: 表示这张图片被用在了文章中，1 是这张图片的id，依顺序递增
* hexo_thumbnail_1: 表示这张图片被用在了文章缩略图中，id 含义同上
* hexo_others_1: 表示这张图片既没有被用在文章中也不是文章缩略图，id 含义同上

## Markdown 中插入图片

如果想固定图片尺寸，可以插入 HTML 代码：

```html
<img src="./xxx.png" width = "300" height = "200" alt="图片名称"/>
```

如果只需要居中的话只要在外面包围 div 标签即可：

```markdown
<div  align="center">    
![图片名称](./xxx.png)
</div>
```