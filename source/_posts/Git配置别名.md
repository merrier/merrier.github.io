---
title: Git配置别名
urlname: git-configuration-alias
id: 891
categories:
  - Git
tags:
  - git
date: 2017-06-28 11:04:28
img: /images/hexo_thumbnail_16.jpg
---

git 提供了各种各样的操作方法，但是我们常常会陷入“敲 git 命令敲的手疼”的困境，此时为 git 配置别名就显得尤为重要了，尤其是当我们的项目有各种各样的分支（master、dev、test...）时，经常需要 merge、rebase、add、commit，如果能用一两个字母代替这些命令的话，我相信会减轻很多打字的负担。

## 方法一：临时修改

我们只需要敲一行命令，告诉 git，以后 st 就表示 status：

```bash
git config --global alias.st status
```

--global 参数是全局参数，也就是这一行命令在这台电脑的所有 git 仓库下都有用；当然，如果你想只在当前项目中使用简写命令，可以在项目的目录下使用 git config 命令而不带 --global 选项，这样会在你当前项目目录下的 .git/config 文件增加一节 \[user\] 内容：

```bash
[user]
    name = Merrier
    eamil = 953075999@qq.com
```

只改了 status 不过瘾？没关系，我们还有别的命令可以简写，很多人用 co 表示 checkout，ci 表示 commit，br 表示 branch（每个人都有自己的简写习惯，不过最好和别人相同，否则别人在你的电脑上提交代码的话可能会有不必要的麻烦）

```bash
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
```

当然，除了上面这些简单的命令之外，我们还可以为一些复杂的命令设置别名，比如配置一个 git last，让其显示最后一次提交信息：

```bash
git config --global alias.last 'log -1'
```

这样，我们用 git last 就能显示最近一次的提交：

```bash
$ git last
commit adca45d317e6d8a4b23f9811c3d7b7f0f180bfe2
Merge: bd6ae48 291bea8
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Thu Aug 22 22:49:22 2013 +0800

    merge & fix hello.py
```

## 方法二：修改 .gitconfig

如果我们拿到的是一台新电脑，像上面那样一行一行敲设置简写的命令的话会将一件本来让自己方便的事变得很麻烦，所以有没有一次性设置全部简写命令的方法呢？当然是有的了（要不然我这个方法二从何而来），就是修改 .gitconfig 文件，其实我们上面那些命令就是在一次次的修改 .gitconfig 文件；.gitconfig 文件在哪呢？理论上就在你的主目录下：

<div align='center'><img src='/images/hexo_post_102.png' alt='' width='400'/></div>

从上图可以看到，可以通过 cat ~/.gitconfig 查看自己电脑的 .gitconfig 文件内容，而由于我已经设置了 git 别名，所以该文件中会有 \[alias\] 内容，那么你就可以通过在这个文件中添加类似的内容来配置你自己的别名了：

```bash
[alias]
    co = checkout
    ci = commit
    st = status
    pl = pull
    ps = push
    dt = difftool
    l = log --stat
    cp = cherry-pick
    ca = commit -a
    b = branch
```

和方法一一样，如果你只想要在某些项目中使用简写，可以进入项目的目录，然后编辑 .git/config 文件，加入上面的内容就可以了