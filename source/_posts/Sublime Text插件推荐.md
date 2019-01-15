---
title: Sublime Text插件推荐
urlname: sublime-text-plugin-recommendation
id: 844
categories:
  - 工具
tags:
  - sublime
  - 推荐
date: 2017-05-14 20:44:19
img: /images/hexo_thumbnail_100.jpeg
---

## 安装sublime text2 插件的方法

### 直接安装

安装 Sublime text 2 插件很方便，可以直接下载安装包解压缩到 Packages 目录（菜单 -> preferences -> packages）。

### 使用 Package Control 组件安装

也可以安装 package control 组件，然后直接在线安装：

1. 按 Ctrl+` 调出 console（注：安装有 QQ 输入法的话这个快捷键会有冲突，输入法属性设置-输入法管理-取消热键切换至 QQ 拼音）
2. 粘贴以下代码到底部命令行并回车：

```bash
import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed\_packages\_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
```

3. 重启 Sublime Text 2。
4. 如果在 Perferences -> package settings 中看到 package control 这一项，则安装成功。

## 用 Package Control 安装插件的方法

1. 按下 Ctrl + Shift + P 调出命令面板
2. 输入 install，调出 Install Package 选项并回车，然后在列表中选中要安装的插件。

不爽的是，有的网络环境可能会不允许访问陌生的网络环境从而设置一道防火墙，而 Sublime Text 2 貌似无法设置代理，可能就获取不到安装包列表了。好，方法介绍完了，下面是本文正题，推荐一些 Sublime Text 2 插件：

## 插件推荐

### Emmet

HTML / CSS 代码快速编写神器，Emmet 的前身是大名鼎鼎的 Zen coding，如果你从事 Web 前端开发的话，对该插件一定不会陌生。它使用仿 CSS 选择器的语法来生成代码，大大提高了 HTML / CSS代码编写的速度，比如下面的演示：

<div align='center'><img src='/images/hexo_post_7.gif' alt='' width='400'/></div>

关于这一插件的牛逼之处就不再多言，这里有一篇讲解 Emmet 的文章讲的很详细：[Emmet：HTML/CSS代码快速编写神器](http://www.iteye.com/news/27580)

### Git

git 应该是必备的插件之一，而 sublime 对于 git 的支持也是很好的，关于如何在 sublime 中使用 git，可以查看下面这篇文章：[sublime中git的使用](http://www.jianshu.com/p/c3fabbeebbeb)，我就不再过多描述了

### Vue Syntax Highlight

这是一款可以让你的 .vue 文件也可以高亮的插件，鉴于最近在自学 vue，所以还是推荐一下这款插件吧，在 Package 里面搜索 vue 即可