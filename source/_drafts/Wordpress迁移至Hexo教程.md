---
title: Wordpress迁移至Hexo教程
categories:
  - 分类
tags:
  - 标签
comments: true
date: 2019-01-20 10:23:16
img:
---

## 需要进行的修改

### 代码块

迁移之后的 Markdown 文件中的代码块是不会自动加上 \`\`\` 的，所以需要手动修正；其实也可以通过脚本进行修正，但是很难判断代码块所属语言类型，同时还需要二次确认，这样的话反而还不如逐篇文章进行修正。

除此之外，迁移之后的代码块中可能会出现很多错误的转义符，多表现为：

* `_` 变成了 `\_`
* `<` 变成了 `\<`
* `>` 变成了 `\>`
* `[` 变成了 `\[`
* `]` 变成了 `\]`

其实还会有其他情况，就不一一列举了，所以在迁移之后我们需要手动进行修复，最好不要直接暴力地全局替换，因为有时候转义符还是需要的，我们只需要替换代码块中出现的即可。

### categories 字段

如果您有过使用 WordPress 的经验，就很容易误解 Hexo 的分类方式。WordPress 支持对一篇文章设置多个分类，而且这些分类可以是同级的，也可以是父子分类。但是 Hexo 不支持指定多个同级分类。下面的指定方法：

```yaml
categories:
  - Diary
  - Life
```

会使分类Life成为Diary的子分类，而不是并列分类。因此，迁移之后需要对 categories 字段进行筛选，否则会出现分类过多的问题。

Hexo官方文档：[分类方法的分歧](https://hexo.io/zh-cn/docs/front-matter#%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE)

### 站内链接

wordpress 的 URL 命名规则和 Hexo 不一致，所以在迁移之后我们需要对 Markdown 中的站内网页链接进行修正替换；我也没想到什么好的方案，只能手动修正了。

### 表格

在用 wordpress 的时候，表格用了 TablePress 插件，迁移之后在 Markdown 中就无法展示了，不过 TablePress 提供了导出为 CSV 文件的功能，导出后我们可以借助一些在线工具（推荐一个：[https://donatstudios.com/CsvToMarkdownTable](https://donatstudios.com/CsvToMarkdownTable)）将其转换成 Markdown 格式的表格。


## 扩展阅读

* [从wordpress迁移到hexo填坑](https://wangheng.org/migrating-from-wordpress-to-hexo.html)
* [实战--迁移wordpress 到hexo](https://www.m690.com/archives/1135/)