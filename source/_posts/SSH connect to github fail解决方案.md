---
title: SSH connect to github fail解决方案
urlname: ssh-connect-to-gitHub-fail-solution
tags:
  - dns
  - Github
  - ssh
id: 1176
categories:
  - Git
  - stackoverflow
date: 2017-08-20 21:22:16
---

来自于[stackoverflow上的一个问题](https://stackoverflow.com/questions/21488137/ssh-connect-to-github-fail)，有位仁兄在命令行中输入了如下命令：

ssh -T git@github.com

然而报错了：

ssh: Could not resolve hostname github.com: nodename nor servname provided, or not known

其实，之前就有人碰到过ssh fail的问题，报错的原因是**DNS服务器设置**的问题，将DNS地址设置为OpenDNS或者Google DNS就可以了：

> OpenDNS 208.67.222.222 208.67.220.220 GoogleDNS 8.8.8.8 8.8.4.4

下面就介绍一下在mac中如何设置DNS（来自文章[How to Switch Mac OS X to Use OpenDNS or Google DNS](http://www.howtogeek.com/howto/38793/how-to-switch-mac-os-x-to-use-opendns-or-google-dns/)）：

首先，系统偏好设置-网络
------------

![](/images/hexo_post_280.png)

点击高级选项
------

![](/images/hexo_post_281.png)

DNS-添加按钮
--------

![](/images/hexo_post_282.png) 设置为上面我们提到的OpenDNS或GoogleDNS地址中的一个就可以啦~