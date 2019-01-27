---
title: Mac下用Cron定时任务更新壁纸
urlname: updating-wallpaper-with-cron-timing-task-under-mac
id: 1014
categories:
  - 工具
date: 2017-07-26 15:08:17
tags:
  - Mac
img: /images/hexo_thumbnail_117.png
---

这个技巧的原文来自[Set Desktop to NASA Astronomy Picture of the Day](https://www.macosxautomation.com/automator/apod/index.html)，作者通过 Automator 脚本可以每天自动去 NASA（美国宇航局）下载“每日一图”，同时将其设置为桌面。是不是听起来很酷！当然了，我第一次看到的并不是上面那篇文章，而是另一位大神（harttle）的[用Cron定时任务更新壁纸](http://harttle.com/2015/11/20/crontab-desktop.html)，harttle 并没有用 Automator 方式，而是通过 Cron 定时任务实现了这个功能。美中不足的是，harttle 是 Linux 系统，然后我就在自己的 Mac 上试了一下，下面就跟着我一起来实现一把吧！

## 下载壁纸的脚本

首先，我们需要完成一个下载壁纸的脚本，在 Mac 环境下就是 shell 脚本了：

```bash
#!/usr/local/bin/bash

# 下载HTML到/tmp
base='http://apod.nasa.gov/apod/'
wget -O /tmp/nasa ${base}astropix.html

# 找到其中的<img>标签的src参数
href=${base}\`cat /tmp/nasa | grep -i '<img' | awk -F '"' '{print $2}'\`

# 计算src的文件后缀
ext=${href##*.}

# 计算保存到的文件地址
file=/Users/YourMacName/Pictures/nasa/\`date +"%Y-%m-%d"\`.$ext

# 下载img
wget -O $file $href
```

### 注意事项

* 不能完全复制粘贴上面的代码，需要注意将 `YourMacName` 换成你的真实文件夹名
* 需要提前安装 wget，可以通过 brew install wget 安装
* 需要将脚本保存到 /usr/local/bin 这个目录下，命名就随便了，可以取名为 nasa-pic-of-day.sh，运行一下，如果在 /Users/YourMacName/Pictures/nasa/ 下有一张图片那说明这一步已经成功了！

## Cron 定时任务

Cron 是 Unix 系统中用于周期执行任务的守护进程，被定时的任务由 crontab 文件提供。我们来写一个自己的 crontab 文件，保存为 ~/bin/daily.cron：

```bash
SHELL=/usr/local/bin/bash
30 8 * * * /usr/local/bin/nasa-pic-of-day.sh >> /usr/local/var/frontend/cron 2>&1
```

其中 30 表示分钟，6 表示小时，后面的依次是日、月、星期。同时将输出重定向到 /var/harttle/cron（当然你需要确保这个目录存在）。2>&1 是将错误输出重定向至标准输出，这样我们的日志中将会同时包含标准输出和错误输出。 然后通过 crontab 命令载入我们的这个文件：

```bash
crontab /usr/local/bin/daily.cron
```

此后呢，我们的脚本就会在每天早上 8:30 执行。如果有问题我们可以查看日志文件 /usr/local/var/YourMacName/cron，这里有脚本的一切输出。

## 编辑 crontab

crontab 会把刚才载入的文件保存起来，以后我们可以通过 `crontab -e` 直接更改它（注意更改原文件是不起作用的）。在 Mac 上保存更改时会有错误：

```bash
crontab: temp file must be edited in place
```

可以在 ~/.vimrc 后面加一行：

```bash
autocmd filetype crontab setlocal nobackup nowritebackup
```

## Cron 运行环境

Cron 运行脚本的环境和交互式 Shell 是不一样的，这一点需要注意。你的脚本可以在交互式 Shell 中正常运行，但 Cron 中可能会有错误。

> Cron always runs with a mostly empty environment. HOME, LOGNAME, and SHELL are set; and a very limited PATH.

推荐的做法是在 Cron 运行的脚本中显式地声明那些环境变量：`source ~/.bashrc`，来手动设置需要的环境。比如在 Mac 上，你可能会需要这一项设置：

```bash
PATH=/usr/local/bin:$PATH
```