---
title: Mac下用Cron定时任务更新壁纸
urlname: updating-wallpaper-with-cron-timing-task-under-mac
id: 1014
categories:
  - 其他
date: 2017-07-26 15:08:17
tags:
---

写在前面
====

这个技巧的原文来自[Set Desktop to NASA Astronomy Picture of the Day](https://www.macosxautomation.com/automator/apod/index.html)，作者通过Automator脚本可以每天自动去NASA（美国宇航局）下载“每日一图”，同时将其设置为桌面。是不是听起来很酷！当然了，我第一次看到的并不是上面那篇文章，而是另一位大神（harttle）的[用Cron定时任务更新壁纸](http://harttle.com/2015/11/20/crontab-desktop.html)，harttle并没有用Automator方式，而是通过Cron定时任务实现了这个功能。美中不足的是，harttle是Linux系统，然后我就在自己的Mac上试了一下，下面就跟着我一起来耍酷吧！

下载壁纸的脚本
=======

首先，我们需要完成一个下载壁纸的脚本，在Mac下就是shell脚本了：

#!/usr/local/bin/bash

\# 下载HTML到/tmp
base='http://apod.nasa.gov/apod/'
wget -O /tmp/nasa ${base}astropix.html

\# 找到其中的<img>标签的src参数
href=${base}\`cat /tmp/nasa | grep -i '<img' | awk -F '"' '{print $2}'\`

\# 计算src的文件后缀
ext=${href##*.}

\# 计算保存到的文件地址
file=/Users/YourMacName/Pictures/nasa/\`date +"%Y-%m-%d"\`.$ext

\# 下载img
wget -O $file $href

### 注意事项

*   不能完全复制粘贴上面的代码，需要注意将YourMacName换成你的真实文件夹名
*   需要提前安装wget，可以通过brew install wget安装
*   需要将脚本保存到/usr/local/bin这个目录下，命名就随便了，可以取名为nasa-pic-of-day.sh，运行一下，如果在/Users/YourMacName/Pictures/nasa/下有一张图片那说明这一步已经成功了！

Cron定时任务
========

Cron是Unix系统中用于周期执行任务的守护进程，被定时的任务由crontab文件提供。我们来写一个自己的crontab文件，保存为~/bin/daily.cron：

SHELL=/usr/local/bin/bash
30 8 * * * /usr/local/bin/nasa-pic-of-day.sh >> /usr/local/var/frontend/cron 2>&1

其中30表示分钟，6表示小时，后面的依次是日、月、星期。同时将输出重定向到/var/harttle/cron（当然你需要确保这个目录存在）。 2>&1是奖错误输出重定向至标准输出，这样我们的日志中将会同时包含标准输出和错误输出。 然后crontab命令载入我们的这个文件：

crontab /usr/local/bin/daily.cron

此后呢，我们的脚本就会在每天早上8:30执行。如果有问题我们可以查看日志文件/usr/local/var/YourMacName/cron，这里有脚本的一切输出。

编辑crontab
=========

crontab会把刚才载入的文件保存起来，以后我们可以通过`crontab -e`直接更改它（注意更改原文件是不起作用的）。 在Mac上保存更改时会有错误：

crontab: temp file must be edited in place

并且编辑确实未保存，可以在~/.vimrc后面加一行：

autocmd filetype crontab setlocal nobackup nowritebackup

Cron运行环境
========

Cron运行脚本的环境和交互式Shell是不一样的，这一点需要注意。你的脚本可以在交互式Shell中正常运行，但Cron中可能会有错误。

> Cron always runs with a mostly empty environment. HOME, LOGNAME, and SHELL are set; and a very limited PATH.

推荐的做法是在Cron运行的脚本中显式地声明那些环境变量、source ~/.bashrc，来手动设置需要的环境。 比如在Mac上，你可能会需要这一项设置：

PATH=/usr/local/bin:$PATH