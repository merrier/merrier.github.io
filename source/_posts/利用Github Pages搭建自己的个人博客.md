---
title: 利用Github Pages搭建自己的个人博客
urlname: build-your-own-personal-blog-with-github-pages
id: 930
categories:
  - Git
tags:
  - Github
date: 2017-07-04 12:03:49
img: /images/hexo_thumbnail_16.jpg
---

这篇文章以我的亲身实验为基础，为大家讲解如何利用 Github Pages 搭建一个自己的个人博客，由于[我的个人博客](http://merrier.wang)已经拿 wordpress 搭建完成好久了，所以我就拿我 [github] (https://github.com/merrier/)中的另外一个项目作为试验，一步一步的截图引导大家将自己的 github 中的项目放到网上供其他人浏览，请注意，这都是免费的哦！不需要你购买域名和服务器，因为 github 帮你搞定了一切，最终实现的效果是下面这样的（可以看到，域名是 merrier.github.io，这是 github 为你提供的域名，该页面可以[点击这里](https://merrier.github.io/Magical-CSS/)查看）：

<div align='center'><img src='/images/hexo_post_242.png' alt='' width='400'/></div>

## 准备工作

* 你需要有一个 github 账号
* 如果想看到效果的话，你需要一个有 README.md / index.html 的项目

## 好戏开场

### gh-pages 分支

基于上面的准备工作，我认为你现在应该在自己的 github 中有了一个用来向他人展示的项目，然后进入自己的项目，切换到 gh-pages 分支，没有的话创建一个就可以了：

<div align='center'><img src='/images/hexo_post_243.png' alt='' width='400'/></div>

### Theme 选择

然后点击上面的 Settings 按钮，向下找到 Github Pages 模块：

<div align='center'><img src='images/hexo_post_244.png' alt='' width='400'/></div>

然后在这里你可以选择一个主题（点击 Change theme 按钮，然后你就可以跳转到选择主题的页面），这些主题都是 github 给你免费提供的，我选择的是下面这款蓝色的主题，效果就是文章开头截图那样的：

<div align='center'><img src='/images/hexo_post_245.png' alt='' width='400'/></div>

### Done

选择完主题之后再回到刚才有 Github Pages 的页面，github 会提示你现在可以通过某个URL访问你的页面了，此时你通过 github 提示的 URL 进行访问的话，显示的就是你项目根目录的 README.md / index.html 文件中的内容，这样就完成了！是不是很 easy！：

<div align='center'><img src='/images/hexo_post_246.png' alt='' width='400'/></div>

## 注意事项

### 现在已经不需要新建gh-pages分支了，任意分支都可以
* 在你选择完主题之后，github 会自动在你的项目根目录下创建一个 _config.yml 文件，内容大概是下面这个样子，合并代码时需要注意一下：

```yaml
theme: jekyll-theme-architect
```

### 在 Github Pages 模块，你可以设置你自己的 custom domain

比如设置成 www.example.com，此时别人就可以通过访问 www.example.com 访问到你刚刚用 Github Pages 搭建的个人博客了

## 扩展阅读

[一步步在GitHub上创建博客主页](http://www.pchou.info/ssgithubPage/2013-01-03-build-github-blog-page-01.html)
[Git托管 代码托管 Pages服务 静态网站托管](https://www.netnr.com/home/list/105)