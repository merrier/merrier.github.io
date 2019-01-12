---
title: SSH connect to github fail解决方案
urlname: ssh-connect-to-gitHub-fail-solution
id: 1176
categories:
  - stackoverflow
tags:
  - dns
  - Github
  - ssh
date: 2017-08-20 21:22:16
img: /images/hexo_thumbnail_98.png
---

来自于[stackoverflow上的一个问题](https://stackoverflow.com/questions/21488137/ssh-connect-to-github-fail)，有位仁兄在命令行中输入了如下命令：

```bash
ssh -T git@github.com
```

然而报错了：

```bash
ssh: Could not resolve hostname github.com: nodename nor servname provided, or not known
```

其实，之前就有人碰到过 ssh fail 的问题，报错的原因是 **DNS 服务器设置**的问题，将 DNS 地址设置为 OpenDNS 或者 Google DNS 就可以了：

> OpenDNS 208.67.222.222 208.67.220.220 GoogleDNS 8.8.8.8 8.8.4.4

下面就介绍一下在 Mac 中如何设置 DNS（来自文章[How to Switch Mac OS X to Use OpenDNS or Google DNS](http://www.howtogeek.com/howto/38793/how-to-switch-mac-os-x-to-use-opendns-or-google-dns/)）：

## 首先，系统偏好设置-网络

<div align='center'><img src='/images/hexo_post_280.png' alt='' width='400' /></div>

## 点击高级选项

<div align='center'><img src='/images/hexo_post_281.png' alt='' width='400' /></div>


## DNS-添加按钮

<div align='center'><img src='/images/hexo_post_282.png' alt='' width='400' /></div>

设置为上面我们提到的 OpenDNS 或 GoogleDNS 地址中的一个就可以啦~