---
title: 一篇绝对能看懂的Git入门教程
urlname: introduction-to-Git
id: 637
categories:
  - Git
tags:
  - git
  - 教程
date: 2017-04-17 21:35:16
img: /images/hexo_thumbnail_16.jpg
---

不管你是从事什么方面的程序猿，只要你属于这个神秘组织，就必须要对 SVN 或 Git 这种版本控制系统有所了解；和大部分人一样，当初项目负责人告诉我需要学 Git 的时候，只说了这样一句话：“网上很多教程，自己看着学吧”，当然，这句话直到今天我也无力反驳，因为对于一个新鲜的程序猿来说，只需要懂一些 Git 的基本指令就可以了，一些高端指令可能永远都用不到，所以，我就查阅了一些 Git 的教程和手册，整理出这篇对于新手很友好的 Git 入门教程

## 工作区与暂存区

很多 Git 教程都把这一部分的讲解放到很靠后的位置，所以我当初学习的时候并没有把这一部分放在心上；但是现在我觉得，这一部分才是最需要明白的，因为这一部分是非常“真实”的，对于一个之前从来没接触过命令行或一直在 windows 上打游戏、看直播的程序猿来说，这一部分也是最容易理解的

**工作区**：通俗易懂的来说就是你电脑里面的能看到的目录，比如 learngit 的目录。
**版本库**：工作区有一个隐藏的目录 .git，这是 Git 的版本库。版本库中存了很多东西，其中最重要的就是stage(index)的 **暂存区**。 下面这张图非常清晰的表明了这三者的关系，我就不多说了：

<div align='center'><img src='/images/hexo_post_237.png' alt='' width='400'/></div>

**请牢牢记住这三个概念，因为下面会经常用到**

## 初始化

### 生成 ssh

通过下面的指令可以生成 id_rsa 和 id_rsa.pub 两个文件，不同操作系统这两个文件所在位置不同，id_rsa.pub 里面的所有内容就是你的公钥，直接复制到 GitHub 的 Add SSH key 页面就可以愉快的进行玩耍了

```bash
ssh-keygen -t ras -C "email@xxx"
```

ssh 是一种协议，而 Git 目前支持[4种协议](http://www.cnblogs.com/lzxianren/p/git2.html)——ssh协议，http/s协议，git 协议，本地协议，ssh 协议配置简单，权限管理也比较全面，更重要的是无需密码和 linux 内置（git 是 linus 写的软件，linus 是 linux的作者，所以你懂得），至于 ssh 究竟怎么做的就不在本文介绍了，可以去阮一峰的博客中查找相关资料

### 设置用户名

和现实世界类似，你想和别人进行数据通信，首先得让别人知道你是谁，你的联系方式吧，而和现实世界不同的是，这里的联系方式只能填写邮箱，填写微信或者 QQ 号是木有用的

```bash
git config --global user.name "cc"
git config --global user.email "cc@xx"
```

### 初始化当前目录的项目

```bash
git init
```

还记得上面我们提到的三个概念吗，这里的初始化就是为了在本地目录中添加本地版本库，然后才可以后续的 git 操作。比如初始化之前你的目录是这样的（当前目录为空是因为我是在一个空文件夹的基础上进行初始化的，而实际情况是这里面会有你的项目文件）：

<div align='center'><img src='/images/hexo_post_189.png' alt='' width='700'/></div>

而执行初始化操作之后：

<div align='center'><img src='/images/hexo_post_190.png' alt='' width='700'/></div>

从上图可以看到，当前目录中多了 .git 文件夹，这个文件夹就是你的本地的版本库了，里面存储着很多东西，其中包括暂存区；通过短短的一行命令，初始化操作就已经完成了，同时 Git 也为我们创建了第一个分支 master，和一个指向 master 的指针 HEAD，接下来就是一些常用的命令

## 常用命令

### 查看工作区状态

```bash
git status
```

这是一条需要经常使用的命令，因为有时候工作区的改变可能会是“隐性”的，比如你的编辑器自己添加的文件或者其他类型的隐藏文件，而经常查看状态也是检验某些 git 命令是否执行的方法。通过执行这一命令，我们在终端中可能会看到：

<div align='center'><img src='/images/QQ20170417-153116@2x.png' alt='' width='700'/></div>

从终端的第四行我们可以看到，当我们查看状态时，Git 告诉我们当前分支为 master；第八行的意思是我们没有什么可以 commit 的，说明我们在当前目录下并没有进行修改，所以我们需要进行修改之后再进行后续操作：

<div align='center'><img src='/images/hexo_post_192.png' alt='' width='700'/></div>

从上图我们可以看到，我在当前目录中新添加了一个文件 octocat.txt，然后我们再通过 `git status` 查看一下当前工作区的状态：

<div align='center'><img src='/images/hexo_post_193.png' alt='' width='700'/></div>

这次好像和上次不一样了，Git 告诉我们有一个文件 untracked files 叫做 octocat.txt，同时还提醒你通过 `git add <file>...` 进行提交，那这里就稍微提一下 git status 时可能看到的当前工作区的文件的状态

* staged：已经添加到暂存区，等待提交的文件
* unstaged：已经发生了改变，但是还没有提交
* untracked：Git 都不知道还有这个文件，所以说明这是一个新添加的文件（就像上面的 octocat.txt）
* deleted：已经从本地删除的文件

### 提交工作区修改到暂存区

* git add .  // 将工作区所有修改添加到暂存区
* git add filename // 将指定文件添加到暂存区

还是一开始我们提到的那三个概念，我们在本地进行了修改（新建、修改、删除），但是此时还只是我们自己知道发生了哪些改变，Git 根本都不知道（本地的 Git 都不知道，更别提远程），所以需要进行提交；那么你可能有疑问了，为什么提交到暂存区？直接提交给远程不就完了吗？这里就是 Git 设计的巧妙之处，通过暂存区可以防止你的错误提交（事实证明，这一点很重要）。经过 git add 后，我们再通过 git status 查看一下状态：

<div align='center'><img src='/images/hexo_post_194.png' alt='' width='700'/></div>

Git 告诉我们它看到了一个新的文件 octocat.txt，并且 to be committed，那么你可能会问了，假如我当前的目录里有好多文件都需要 add 怎么办，难道一次次执行命令吗？当然不需要，从上面的代码块中可以看到，我们可以通过 `git add .` 提交所有修改，但是**不推荐这种操作**，因为有可能会将一些不想提交的隐藏文件也提交到暂存区了；假如我们当前目录下有很多 .txt 文件等待提交：

<div align='center'><img src='/images/hexo_post_195.png' alt='' width='700'/></div>

我们可以使用 “*.txt” 匹配到所有的 txt 文件，然后就可以将它们全部提交了：

```bash
git add '*.txt'
```

### 将暂存区修改添加到本地仓库

```bash
git commit -m '备注信息'
```

经过多次的 git add，此时的暂存区有好多本地的修改，通过上面的 commit 可以将所有的暂存区的修改添加到本地仓库，所以你可以简单理解为：需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

### push 到远程

经过上面的一顿折腾，仍然只有本地的 “Git” 知道了我们都做了些什么，如果想让远程仓库也知道，我们需要先和远程仓库建立联系：

```bash
git remote add origin https://github.com/try-git/try_git.git
```

在这里遇到一个问题：每次 push 都要输入用户名和密码，原因是我们是通过 https 方式进行 push，解决方法如下：

```bash
git remote rm origin      // 移除
git remote add origin git@github.com:try-git/test.git       // 添加
```

此后就不用再输入用户名和密码了，同时我们和远程建立联系以后就不用再 git remote add 了，这就好比你去别人家串门，第一次可能需要你需要查一下地图，第二次的话就直接去找他就行了。接下来就是 push 到远程了：

```bash
git push -u origin master
```

第一次 push 是需要加 -u 参数的，这个参数是告诉远程我是谁（[git push的-u参数具体含义](https://www.zhihu.com/question/20019419)），还是刚才串门的例子，第一次去别人家串门肯定需要表明身份的，第二次就不再需要了，因为已经知道你是谁了：

```bash
git push origin master
```

### 从远程 pull

```bash
git pull origin master
```

如果别人提交了他们的修改到远程仓库，我们需要从远程 pull 修改到我们的本地，从而保证大家的进度保持同步，比如别人提交了一个 yellow_octocat.txt 文件到远程，我们 git pull 之后：

<div align='center'><img src='/images/hexo_post_197.png' alt='' width='700'/></div>

Git 告诉我们，你 pull 成功了，新增加了一个文件叫做 yellow_octocat.txt，此时我们的当前目录就多了一个 yellow_octocat.txt（.git 也就是本地版本库也知道了这个文件）

<div align='center'><img src='/images/hexo_post_198.png' alt='' width='700'/></div>

### 查看修改的内容

```bash
git diff
```

有可能别人和我对同一文件进行了修改，所以在 pull 之后需要查看一下都发生了哪些修改:

<div align='center'><img src='/images/hexo_post_199.png' alt='' width='700'/></div>

其实，git diff 的用法不仅只有这一种，还可以查看暂存区的修改都有哪些：

```bash
git diff --staged
```

### 撤销修改

#### 丢弃工作区的修改

假如我们对之前的一个文件 readme.txt 进行了修改，但是现在我发现对这个文件进行的修改都是错的（经常会发生），此时我不想要我对这个文件的修改了，就可以执行下面的命令，然后 readme.txt 就可以回退到我修改之前的样子

```bash
git checkout readme.txt
```

#### 丢弃暂存区的修改

和刚才不一样的是，我已经将我的修改提交到暂存区了（也就是说已经执行了 git add readme.txt 命令），此时我想把这个文件的修改从暂存区放回到工作区，就需要执行下面的命令，然后此时的暂存区就不再有 readme.txt 的修改，就像没 git add 过

```bash
git reset HEAD readme.txt
```

## 分支相关

除了 Git，其他版本控制系统如 SVN 中也有分支管理，但是 Git 的分支是与众不同的，无论创建、切换和删除分支，Git 在 1 秒钟之内就能完成！无论你的版本库是 1 个文件还是 1 万个文件。每次提交，Git 都把它们串成一条时间线，这条时间线就是一个分支。但是截止到目前，只有一条时间线，在 Git 里，这个分支叫主分支，即`master` 分支。`HEAD` 严格来说不是指向提交，而是指向 `master`，`master` 才是指向提交的，所以，**`HEAD` 指向的就是当前分支**。每次提交，`master` 分支都会向前移动一步，这样，随着你不断提交，`master` 分支的线也越来越长。

<div align='center'><img src='/images/hexo_post_1.png' alt='' width='300'/></div>

### 新建分支

```bash
git branch clean_up
```

此时我们在本地创建了一个分支叫做 clean_up，对于 Git 来说，相当于新建了一个指针叫 clean_up，指向和 master 相同的提交，但是此时的 HEAD 仍然指向 master，因为此时我们只是新建了一个分支，并没有切换到 clean_up 分支

### 切换分支

```bash
git checkout clean_up
```

我们新创建了 clean_up 分支后，可以通过上面的命令将本地的分支切换到 clean_up，此时的 HEAD 就会指向 clean_up

### 删除文件

为了后面的分支命令展示，我们通过下面的命令将 .txt 文件（注意此时所在的分支仍然是 clean_up）删除

```bash
git rm '*.txt'
```

然后，我们将删除这些文件的修改进行提交（add + commit），此时本地的 clean_up 分支就没有这些 .txt 文件了：

<div align='center'><img src='/images/hexo_post_200.png' alt='' width='700'/></div>

此时我们再切换到 master 分支（git checkout master）：

<div align='center'><img src='/images/hexo_post_201.png' alt='' width='700'/></div>

通过上面两张图片，我们可以清晰的看到分支的作用，其实相当于两个平行世界（branch），而你所扮演的就是上帝的角色，想让哪个世界继续进行，就 checkout 哪个分支就可以了。此时如果我们想让 clean_up 分支上做出的改变合并到 master 分支该怎么办呢？

### 合并分支

```bash
git merge clean_up
```

上面这段命令执行的前提是你当前的分支是 master，而通过 git merge 某分支可以将某分支的改变合并到当前分支：

<div align='center'><img src='/images/hexo_post_202.png' alt='' width='700'/></div>

我们通过上面的结果可以看到此时的 master 分支已经没有了 .txt 文件

### 删除分支

```bash
git branch -d clean_up
```

既然我们已经把 clean_up 分支的改变合并到了 master 分支，所以此时我们就不再需要 clean_up 分支了，通过上面的命令可以将该分支删除

## 版本相关

较为复杂的分支命令的介绍就告一段落了，下面介绍一下和版本相关的一些常用命令

### 查看提交的历史记录

```bash
git log
```

我们可以通过 git log 查看提交的历史记录（每一次 commit 都是一次记录）：

<div align='center'><img src='/images/hexo_post_196.png' alt='' width='700'/></div>

从上面的图片可以看到，我们有两次 commit 记录，他们的 id 是很长的黄色字符串，这个 id 和每次提交是一一对应的，同时也对应着相应的版本，而除了 commit id，我们还可以看到提交的作者、日期以及备注信息（这里就体现出了备注信息是多么的重要）

### 回退版本

```bash
git reset --hard HEAD^
```

通过上面的命令，我们可以回退到上个版本，`HEAD` 为当前版本，`HEAD^` 为上一个版本，`HEAD^^` 为上上个版本，如果有 100 个版本 `HEAD~100`。当然，我们也可以通过上面提到的 commit id 来回到过去的某个版本

```bash
git reset --hard commit_id
```

是不是更感觉自己像是一个上帝了，在 Git 中，你可以随意控制平行世界的发展，需要做的只是输出一行命令而已

## 其他命令

上面就是一些我们最常用的 Git 命令，但是 Git 的强大之处远不止这些，下面就简单介绍几种我们可能会用到的命令：

### 建立本地分支与远程分支的追踪关系

当在本地新建分支的时候，可能远程并没有这个分支，所以你需要建立追踪关系，这样你 push 的时候才不会 push 到别的分支上去

```bash
git branch --set-upstream-to=<remote>/branchName  // 建立本地分支与远程分支的追踪关系
git branch --track branchName [remote branch]   // 新建一个分支，并与远程建立追踪关系
```

### cherry-pick

这是 Git 的又一神奇命令，它可以让你将任何一次 commit 的修改合并到当前分支

```bash
git cherry-pick commitId  // 将与 commitId 对应的提交合进当前分支
```

### bug 分支

当我们修复 bug 时，我们会通过创建新的 bug 分支进行修复，然后合并，最后删除分支；但是如果我们的手头工作没有完成呢，就需要暂时放弃当前没有提交的修改，然后去修复bug，修复完之后再回来恢复原样继续做刚才的工作

```bash
git stash     // 暂时放弃未提交的修改
git stash pop    // 恢复
```

## 实践步骤

/daizhengli/
\[table id=23 /\]

## 扩展阅读

* [图解Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)
* [廖雪峰-Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
* [在线练习git命令](https://try.github.io/levels/1/challenges/1)
* [Pro Git](https://git-scm.com/book/en/v2)
* [实用Git Workflow](http://www.jianshu.com/p/50892fac6cbc)
* [Git Community Book 中文版](http://gitbook.liuhui998.com/index.html)

## 另外一些关于 Git / Github 入门的文章

* [大白话解释 Git 和 GitHub](http://blog.jobbole.com/111187/)
* [git - the simple guide](http://rogerdudler.github.io/git-guide/)
* [GitHub: the beginner's guide](https://www.pluralsight.com/blog/software-development/github-tutorial)