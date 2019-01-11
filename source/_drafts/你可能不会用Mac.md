---
title: 你可能不会用Mac
urlname: you-probably-dont-know-mac
tags:
  - mac
  - 技巧
id: 1274
categories:
  - 工具
date: 2017-09-04 18:50:15
---

mac 的终端下打开 Finder 到当前路径
-----------------------

在 Terminal 中进到一个比较深的路径，后面又想在 Finder 中处理些文件。之前都先 pwd ，复制下路径，然后在 Finder 的 “前往文件夹” 中粘贴，还是挺麻烦的。今天终于不能忍了，果然还是有是否便捷的方法的。只需在命令行输入 “open .” 就可以了。

软件推荐
====

http://www.orrafy.com/posts/app/disk-space 压缩图片-ImageOptim https://juejin.im/post/5b0e99436fb9a009e405dbb6

优酷视频的存放路径
=========

https://www.zhihu.com/question/53438149   hot corner(触发角) http://www.idownloadblog.com/2015/02/12/how-to-use-hot-corners-in-os-x/ 如何高效的使用Mac？http://www.jianshu.com/p/defd47135502   option+o或其他字母可以打出特殊符号   airdrop

在终端打开编辑器（以webstorm为例）
---------------------

1.  安装ZSH
2.  输入命令j, 会提示 zsh: command not found: j
    *   是因为没有安装autojump插件，在~/.zshrc文件中找到plugins=()改为plugins=(autojump)
    *   然后使用别名的方式为webstorm设置一下命令，如：alias ws=”wstorm”
3.  ### 还需要设置软链
    
    https://www.v2ex.com/t/97327 ln -s /Applications/WebStorm.app/Contents/MacOS/webstorm /usr/local/bin/webstorm
4.  全部配置好发现仍然无法用ws命令打开，这个时候需要配置webstorm，在”Tools” -> “Create Command Line Launcher…” 设置命令，这样就可以直接打开了，大功告成！
5.  都设置完之后需要重启zsh

必须全部设置，才能正常打开。

\[ -f /usr/local/etc/profile.d/autojump.sh \] && . /usr/local/etc/profile.d/autojump.sh

\[\[ -s $(brew --prefix)/etc/profile.d/autojump.sh \]\] && . $(brew --prefix)/etc/profile.d/autojump.sh

plugins=(autojump)

alias ws="/usr/local/bin/webstorm"

Alfred
------

https://mp.weixin.qq.com/s?\_\_biz=MzA3OTgyMDcwNg==&mid=2650633660&idx=2&sn=0feaf0ab177da0d702fe1ac06df81b6b&chksm=87a47771b0d3fe67e51e9496f632640285792013ccf3ec2a669fc5e409524aea03833c6edb1a&mpshare=1&scene=1&srcid=0103goYn2WmI21svg01Ynm3y&key=c8df9ea7f12e2238bcc4d01330f0cf2f595b74c9b2f91912adf8c5c10777a8b6a975928811be24b8669db510dc3b661cf3fa72e3d07dd1a81b299ac6530df6cfca6841c266dee6b9164b63e35e64c682&ascene=0&uin=MTMzNTc2NjIyMA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.13.2+build(17C88)&version=12020710&nettype=WIFI&lang=zh\_CN&fontScale=100&pass_ticket=l0UsBpASywvC83tRkNCFcXohxiiAWaeAwNErJ39lVT%2Br2MnNzTewpNPZbKzn5PtD

mac上双开微信
--------

https://www.jianshu.com/p/e767ea38ccf2