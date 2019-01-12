---
title: Git commit 中的Change-Id是什么
urlname: what-is-change-id-in-git-commit
id: 1145
categories:
  - Git
tags:
  - change-id
  - git
date: 2017-08-20 20:38:52
img: /images/hexo_thumbnail_16.jpg
---

之前在创业公司实习的时候代码管理很不规范，技术部负责人把每个人的 ssh key 添加到公司 github 中之后就可以执行 git 相关操作了，根本没有权限的概念；后来进入公司之后，才知道还有 Gerrit 这种东西，而第一次 push 代码的时候就遇到了 `ERROR: missing Change-Id in commit message` 的错误，后来才得知是因为没有 Change-Id 的缘故，下面就介绍一下 Change-Id 是什么东东：

## 什么是 Change-Id

Change-Id 其实就是一段形如 `I7cbfa01f5136b8815e5e2c6dc5dcda28ce49d13a` 的字符串，它的作用是：

> 保证已经提交审核的修订通过审核入库后，被别的分支 cherry-pick 后再推送至服务器时不会产生新的重复的评审任务。

Gerrit 设计了一套方法，即要求每个提交包含唯一的 Change-Id，这个 Change-Id 因为出现在日志中，当执行 cherry-pick 时也会保持，Gerrit 一旦发现新的提交包含了已经处理过的 Change-Id，就不再为该修订创建新的评审任务和 task-id，而直接将提交入库。
总之，Change-Id 就是 Gerrit 为了确保 cherry-pick 已提交审核的分支时不会在产生新的提交记录。

## 解决 `ERROR：missing Change-Id in commit message`

在一开始我们提到过，在执行 `git push origin Head:refs/for/xxxx` 时有时会报出上面标题这样的错误，也就是在 commit Message 仅仅包含如 `feature：xxxx` 等 title 这样的信息而缺少 Change-Id。那么怎样解决呢？

### 临时解决

git commit 有一个神奇的参数，叫做 `--amend`，如果我们遇到了上面的错误，可以执行下面的命令：

```bash
git commit --amend
```

然后我们可以看到最近一次 commit 的相关信息，在 title 下面空出一行（注意，一定要空出一行，否则 git 会把其作为 title 的一部分处理）后，将 `Change-Id: XXXX` 复制到 Message 中。然后就可以 push 了。你可能会问了，我哪知道 Change-Id 是什么呢？可以先查看一下之前的 commit 信息：

```bash
git log
```

然后你可能会看到这样一条信息：

<div align='center'><img src='/images/hexo_post_91.png' alt='' width='400' /></div>

现在你懂了吧，其实可以看到之前人提交 commit 信息的 Change-Id，我们只需要复制一下（注意 `Change-Id:` 后面有个空格）然后改一下其中某个字母就可以了（因为 Change-Id 不允许重复，如果重复了，可以再改一个字母，一般只需要改一个字母就可以了），这时我们就有了一个人工生成的 `Change-Id` 了。 注意，这种办法只是一种临时解决方案，下次如果你再想 commit 就需要再复制一个 Change-Id，然后 --amend 修改 commit 信息，是不是感觉每次这样修改很麻烦？没事，我们有一个永久解决方案：

### 自动生成 Change-Id

其实我们可以利用 commit-msg 这个 hook 文件自动生成 Change-Id，具体做法如下：

* 将文章下面的 commit-msg hook 脚本复制到 git 项目中 .git/hooks 下，并命名为 commit-msg（一般情况下 .git/hooks 下会包含一个叫 commit-msg.sample 的文件，可以把它删除）
* 添加完之后，执行

```bash
chmod u+x .git/hooks/commit-msg
```

激活 hook，以后提交的时候就会自动携带 Change-Id 了

```bash
#!/bin/sh
\# From Gerrit Code Review 2.6
#
\# Part of Gerrit Code Review (http://code.google.com/p/gerrit/)
#
\# Copyright (C) 2009 The Android Open Source Project
#
\# Licensed under the Apache License, Version 2.0 (the "License");
\# you may not use this file except in compliance with the License.
\# You may obtain a copy of the License at
#
\# http://www.apache.org/licenses/LICENSE-2.0
#
\# Unless required by applicable law or agreed to in writing, software
\# distributed under the License is distributed on an "AS IS" BASIS,
\# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
\# See the License for the specific language governing permissions and
\# limitations under the License.
#

unset GREP_OPTIONS

CHANGE\_ID\_AFTER="Bug|Issue"
MSG="$1"

\# Check for, and add if missing, a unique Change-Id
#
add_ChangeId() {
clean_message=`sed -e '
/^diff --git a\\/.*/{
s///
q
}
/^Signed-off-by:/d
/^#/d
' "$MSG" | git stripspace`
if test -z "$clean_message"
then
return
fi

\# Does Change-Id: already exist? if so, exit (no change).
if grep -i '^Change-Id:' "$MSG" >/dev/null
then
return
fi

id=`\_gen\_ChangeId`
T="$MSG.tmp.$$"
AWK=awk
if \[ -x /usr/xpg4/bin/awk \]; then
\# Solaris AWK is just too broken
AWK=/usr/xpg4/bin/awk
fi

\# How this works:
\# - parse the commit message as (textLine+ blankLine*)*
\# - assume textLine+ to be a footer until proven otherwise
\# - exception: the first block is not footer (as it is the title)
\# - read textLine+ into a variable
\# - then count blankLines
\# - once the next textLine appears, print textLine+ blankLine* as these
\# aren't footer
\# - in END, the last textLine+ block is available for footer parsing
$AWK '
BEGIN {
\# while we start with the assumption that textLine+
\# is a footer, the first block is not.
isFooter = 0
footerComment = 0
blankLines = 0
}

\# Skip lines starting with "#" without any spaces before it.
/^#/ { next }

\# Skip the line starting with the diff command and everything after it,
\# up to the end of the file, assuming it is only patch data.
\# If more than one line before the diff was empty, strip all but one.
/^diff --git a/ {
blankLines = 0
while (getline) { }
next
}

\# Count blank lines outside footer comments
/^$/ && (footerComment == 0) {
blankLines++
next
}

\# Catch footer comment
/^\\\[\[a-zA-Z0-9-\]+:/ && (isFooter == 1) {
footerComment = 1
}

/\]$/ && (footerComment == 1) {
footerComment = 2
}

\# We have a non-blank line after blank lines. Handle this.
(blankLines > 0) {
print lines
for (i = 0; i < blankLines; i++) {
print ""
}

lines = ""
blankLines = 0
isFooter = 1
footerComment = 0
}

\# Detect that the current block is not the footer
(footerComment == 0) && (!/^\\\[?\[a-zA-Z0-9-\]+:/ || /^\[a-zA-Z0-9-\]+:\\/\\//) {
isFooter = 0
}

{
\# We need this information about the current last comment line
if (footerComment == 2) {
footerComment = 0
}
if (lines != "") {
lines = lines "\\n";
}
lines = lines $0
}

\# Footer handling:
\# If the last block is considered a footer, splice in the Change-Id at the
\# right place.
\# Look for the right place to inject Change-Id by considering
\# CHANGE\_ID\_AFTER. Keys listed in it (case insensitive) come first,
\# then Change-Id, then everything else (eg. Signed-off-by:).
#
\# Otherwise just print the last block, a new line and the Change-Id as a
\# block of its own.
END {
unprinted = 1
if (isFooter == 0) {
print lines "\\n"
lines = ""
}
changeIdAfter = "^(" tolower("'"$CHANGE\_ID\_AFTER"'") "):"
numlines = split(lines, footer, "\\n")
for (line = 1; line <= numlines; line++) {
if (unprinted && match(tolower(footer\[line\]), changeIdAfter) != 1) {
unprinted = 0
print "Change-Id: I'"$id"'"
}
print footer\[line\]
}
if (unprinted) {
print "Change-Id: I'"$id"'"
}
}' "$MSG" > "$T" && mv "$T" "$MSG" || rm -f "$T"
}
\_gen\_ChangeIdInput() {
echo "tree \`git write-tree\`"
if parent=\`git rev-parse "HEAD^0" 2>/dev/null\`
then
echo "parent $parent"
fi
echo "author \`git var GIT\_AUTHOR\_IDENT\`"
echo "committer \`git var GIT\_COMMITTER\_IDENT\`"
echo
printf '%s' "$clean_message"
}
\_gen\_ChangeId() {
\_gen\_ChangeIdInput |
git hash-object -t commit --stdin
}

add_ChangeId
```