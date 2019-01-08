---
title: Git撤销操作
urlname: revocation-operation-in-git
tags:
  - git
id: 912
categories:
  - Git
date: 2017-06-29 10:46:13
---

前言
==

Git中提供了几个相关的撤销操作的命令，如clean、checkout、reset和revert；在看这篇文章之前，我希望你能够浏览一下我的另一篇文章：[Git工作区、暂存区和历史记录区](https://merrier.wang/?p=908)，看完之后理解这篇文章会更简单一些

git clean
=========

git clean 命令用来从你的工作目录中删除所有没有tracked过的文件

参数说明
----

git clean -n

是一次clean的演习, 告诉你哪些文件会被删除. 记住他不会真正的删除文件, 只是一个提醒.

git clean -f

删除当前目录下所有没有track过的文件. 他不会删除.gitignore文件里面指定的文件夹和文件, 不管这些文件有没有被track过.

" >git clean -f <path>

删除指定路径下的没有被track过的文件.

git clean -df

删除当前目录下没有被track过的文件和文件夹.

git clean -xf

删除当前目录下所有没有track过的文件. 不管他是否是.gitignore文件里面指定的文件夹和文件.

应用场景
----

### 假如你要删除所有工作目录下面的修改，包括新添加的文件：

git reset --hard
git clean -df

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态, git status会告诉你这是一个干净的工作目录, 又是一个新的开始了.

git checkout
============

git checkout 命令用来丢弃本地修改

参数说明
----

git checkout -- files

把文件从暂存区域复制到工作目录，用来丢弃本地修改

git checkout .

会用暂存区全部的文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区的改动

git checkout HEAD .

会用 HEAD 指向的 master 分支中的全部文件替换暂存区以及工作区中的文件。**这个命令也是极具危险性的，因为不但会清除工作区中未提交的改动，也会清除暂存区中未提交的改动**

应用场景
----

有时候我们的工作区会增加一些不想要的文件（多数为隐藏文件），比如.idea/、.DS_Store文件，此时我们不想将这些无关紧要的文件添加到暂存区，所以就像将它们从工作区丢弃，此时就可以利用下面的命令将该文件夹丢弃：

git checkout .idea/

当然，这种总是会自动生成的文件最好写到.gitignore里，否则每次都要checkout会很烦的

git reset
=========

git reset 命令撤销对于暂存区/历史记录区的修改，也就是撤销你本地的add，commit操作

参数说明
----

git reset

撤销所有暂存区域文件

git reset -- files

用来撤销最后一次的git add files（因为每git add file一次，暂存区的文件都会被更改一次）

" >git reset --mixed <commit id>

会保留源码,只是将git commit和index信息回退到了某个版本.（相当于撤销了add和commit操作，提交的修改都回到了工作区）

" >git reset --soft <commit id>

保留源码,只回退到commit 信息到某个版本.不涉及index的回退,如果还需要提交,直接commit即可.（也就是只撤销了commit，并没有撤销add）

git reset --hard <commit id>

**源码也会回退到某个版本**,commit和index 都回回退到某个版本.(注意,这种方式是改变本地代码仓库源码) 当然有人在push代码以后,也可以使用 reset --hard <commit id> 回退本地的代码到某个版本之前,但是这样会有一个问题,你线上的代码没有变,线上commit,index都没有变,当你把本地代码修改完提交的时候你会发现全是冲突.....（此时就需要用到下面要介绍的git revert 了）

应用场景
----

### 当我们在使用pull的时候，可能会出现冲突，就需要merge，而在冲突状态下，需要解决冲突的文件会从index暂存区打回到工作区，如果我们想放弃index和工作区的改动，就可以执行下面这条命令：

git reset --hard HEAD

上面这条命令用来撤销还没commit 的merge，就放弃了index暂存区和工作区的改动

### 当我们在本地进行了add和commit操作之后，发现本地的修改都是错误的，想要回到前一版本，就可以执行下面这条命令：

git reset --hard HEAD^

上面这条命令用来撤销已经commit 的内容（等价于git reset --hard HEAD~1）。原理就是放弃工作区和index的改动，同时HEAD指针指向前一个commit对象

### 如果我们已经用add命令将某个文件加入暂存区了，此时想撤销对这个文件的add操作，就可以用下面的命令：

" >git reset HEAD <file>

上面这条命令用来撤销对单个文件的git add，执行之后该文件会从暂存区回到工作区中

git revert
==========

git revert用于反转提交,执行revert命令时要求工作树必须是干净的.git revert用一个新提交来消除一个历史提交所做的任何修改.

参数说明
----

" >git revert <commit id>

revert 使用,需要先找到你想回滚版本唯一的commit标识代码,可以用 git log进行查看，commit id是一串40位的字符串，通常用前几位即可（6位就差不多保证唯一了）；执行完之后，revert的那一次commit被撤销，原理是git revert用一次逆向的commit“中和”之前的提交，所以此时HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容；这样在日后合并老的branch时，导致这部分改变不会再次出现，就不会出现类似git reset带来的冲突问题

应用场景
----

### 对于已经把代码push到线上仓库，但是此时发现push的代码有问题，你想回退本地代码的同时也回退线上代码，回滚到某个指定的版本，使得线上和线下代码保持一致：

" >git revert <commit id>

执行完此命令之后，再执行git push就可以将线上代码回滚到某个指定版本，同时不会像git reset一样可能会导致一大堆冲突

git的其它删除命令
==========

这些命令类似于Linux的命令，是一种物理层面的删除，也会经常遇到：

git rm --cached readme.txt

只从缓存区中删除readme.txt，保留物理文件

git rm readme.txt

不但从缓存区中删除，同时删除物理文件

git mv a.txt b.txt

把a.txt改名为b.txt

##### 参考链接

[git clean(转载)](http://www.cnblogs.com/pingfan1990/p/5454757.html)

[git reset revert 回退回滚取消提交返回上一版本](http://yijiebuyi.com/blog/8f985d539566d0bf3b804df6be4e0c90.html)

[详解Git工作区、暂存区、历史记录区以及git reset、git revert、git checkout等撤销命令的区别](http://josh-persistence.iteye.com/blog/2215214)