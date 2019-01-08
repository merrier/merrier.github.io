---
title: Mac下的效率工具autojump
urlname: mac-efficiency-tool-autojump
tags:
  - autojump
  - mac
id: 1239
categories:
  - 工具
date: 2017-08-30 21:09:31
---

首先，这篇文章的封面图是我随便找的，好像是一个游戏的名字。。但是就连[autojump的github](https://github.com/wting/autojump)上面都没有一张图片，所以我也很无奈啊~

介绍
==

autojump是干什么的呢？从它的名字能看出来，它的功能类似“**自动跳转**”，比如我们之前曾经访问过一个目录：/Users/frontend/repos/mineProject，现在我们通过简单的一条指令：autojump mine就可以跳转到这个目录（注意：我们在任意位置都可以跳），autojump它自己是这么描述的：

> autojump is a faster way to navigate your filesystem. It works by maintaining a database of the directories you use the most from the command line.

autojump 就是通过记录你在 history 中的行为把你访问过的文件夹路径都 cache 下来，然后当你输入指令时再读取cache文件(**/Users/frontend/Library/autojump/autojump.txt**)，它还有一个快捷方式：j mine，总而言之，这个小工具可以让你游荡于文件夹之间不费吹灰之力！

安装
==

### 首先，安装homebrew

homebrew是一个mac上的一个软件包管理器，可以通过如下方式进行安装（粘贴至终端即可）：

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

更多关于homebrew可以查看[它的官网](https://brew.sh/index_zh-cn.html)

### 然后，安装zsh

给大家讲个笑话：

> Zsh全称为Z Shell，因为Z是最后一个字母，因此大家称之为——终极Shell。

我们可以通过brew安装zsh：

brew install zsh

### 安装autojump

brew install autojump

### 配置zshrc

在~/.zshrc中编辑以下内容：plugins=(autojump)，当然，如果你有其他zsh插件比如git，直接在后面添加即可：plugins=(git autojump)。然后继续在zshrc文件中添加如下内容：

\[\[ -s $(brew --prefix)/etc/profile.d/autojump.sh \]\] && . $(brew --prefix)/etc/profile.d/autojump.sh

还剩最后一步，使刚才的更改生效：

source ~/.zshrc

Enjoy coding:)

其他可能错误
======

.zshrc:3: command not found: ^M
-------------------------------

The temporary solution to that is changing your core.autocrlf git config setting to use input, given that you are on OSX. See [#4402 (comment)](https://github.com/robbyrussell/oh-my-zsh/issues/4402#issuecomment-143976458).

cd $ZSH 
git config core.autocrlf input 
git rm --cached -r . 
git reset --hard

PATH set to RVM ruby but GEM\_HOME and/or GEM\_PATH not set
-----------------------------------------------------------

[PATH set to RVM ruby but GEM\_HOME and/or GEM\_PATH not set](https://github.com/rvm/rvm/issues/3212) Add RVM set at `~/.zshrc`

export PATH="$PATH:$HOME/.rvm/bin" # Add RVM to PATH for scripting

##### 参考链接

[Mac下的效率工具autojump](http://www.barretlee.com/blog/2015/03/30/autojump-in-mac/) [mac终端快速启动Sublime/WebStrom/VS Code/Atom等编辑器](http://www.jianshu.com/p/5ced5876cba4) [MacOS X 安装 oh-my-zsh autojump](http://www.jianshu.com/p/0d265d9f914b)