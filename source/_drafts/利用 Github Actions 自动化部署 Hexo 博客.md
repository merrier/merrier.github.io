---
title: 利用 Github Actions 自动化部署 Hexo 博客
urlname: 英文标题
id: 独一无二的id，暂时没什么用
categories:
  - 分类
tags:
  - 标签
img: /images/
date: 2020-11-04 14:36:26
---


http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html

https://juejin.im/post/6844904067123150855

https://www.jianshu.com/p/7940fe40885d

https://blog.csdn.net/oschina_41790905/article/details/107447275

https://blog.lgf.im/2020/use-github-actions-to-auto-deploy-hexo.html


从 Travis CI 迁移到 GitHub Actions

https://docs.github.com/cn/actions/learn-github-actions/migrating-from-travis-ci-to-github-actions


## 如何配置两个 key

```bash
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
# You will get 2 files:
#   gh-pages.pub (public key)
#   gh-pages     (private key)
```

> 注意你的邮箱要和 deploy.yml 中的保持一致，否则会报错：

```bash
Warning: Permanently added the RSA host key for IP address '140.82.113.4' to the list of known hosts.
Load key "/root/.ssh/id_rsa": invalid format
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
Error: Warning: Permanently added the RSA host key for IP address '140.82.113.4' to the list of known hosts.
Load key "/root/.ssh/id_rsa": invalid format
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

    at ChildProcess.<anonymous> (/github/workspace/node_modules/hexo-util/lib/spawn.js:37:17)
    at ChildProcess.emit (events.js:315:20)
    at maybeClose (internal/child_process.js:1026:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:286:5)
```

具体见：https://github.com/peaceiris/actions-gh-pages#tips-and-faq

## actions 推荐

这个集成的挺好：https://github.com/yrpang/github-actions-hexo