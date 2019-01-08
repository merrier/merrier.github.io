---
title: Sublime Text插件推荐
urlname: sublime-text-plugin-recommendation
tags:
  - sublime
  - 推荐
id: 844
categories:
  - 总结
date: 2017-05-14 20:44:19
---

安装sublime text2 插件的方法
=====================

直接安装
----

安装Sublime text 2插件很方便，可以直接下载安装包解压缩到Packages目录（菜单->preferences->packages）。

使用Package Control组件安装
---------------------

也可以安装package control组件，然后直接在线安装：

1.  按Ctrl+`调出console（注：安装有QQ输入法的这个快捷键会有冲突的，输入法属性设置-输入法管理-取消热键切换至QQ拼音）
2.  粘贴以下代码到底部命令行并回车：
    
    > import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed\_packages\_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
    
3.  重启Sublime Text 2。
4.  如果在Perferences->package settings中看到package control这一项，则安装成功。

使用Package Control组件安装 也可以安装package control组件，然后直接在线安装：

1.  按Ctrl+`调出console（注：安装有QQ输入法的这个快捷键会有冲突的，输入法属性设置-输入法管理-取消热键切换至QQ拼音）
2.  粘贴以下代码到底部命令行并回车： import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed\_packages\_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
3.  重启Sublime Text 2。
4.  如果在Perferences->package settings中看到package control这一项，则安装成功。

用Package Control安装插件的方法
=======================

1.  按下Ctrl+Shift+P调出命令面板
2.  输入install 调出 Install Package 选项并回车，然后在列表中选中要安装的插件。

不爽的是，有的网络环境可能会不允许访问陌生的网络环境从而设置一道防火墙，而Sublime Text 2貌似无法设置代理，可能就获取不到安装包列表了。 好，方法介绍完了，下面是本文正题，一些有用的Sublime Text 2插件：

Emmet
-----

HTML/CSS代码快速编写神器 Emmet的前身是大名鼎鼎的Zen coding，如果你从事Web前端开发的话，对该插件一定不会陌生。它使用仿CSS选择器的语法来生成代码，大大提高了HTML/CSS代码编写的速度，比如下面的演示： ![](https://merrier.wang/wp-content/uploads/2017/05/301ff5c9-3604-3dd3-a206-6d3516861ec4.gif) 关于这一插件的牛逼之处就不再多言，这里有一篇讲解Emmet的文章讲的很详细：[Emmet：HTML/CSS代码快速编写神器](http://www.iteye.com/news/27580)

Git
---

git应该是必备的插件之一，而sublime对于git的支持也是很好的，关于如何在sublime中使用git，可以查看下面这篇文章：[sublime中git的使用](http://www.jianshu.com/p/c3fabbeebbeb)，我就不再过多描述了

Vue Syntax Highlight
--------------------

这是一款可以让你的.vue文件也可以高亮的插件，鉴于最近在自学vue，所以还是推荐一下这款插件吧，在Package里面搜索vue即可