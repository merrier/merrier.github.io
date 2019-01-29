---
title: 一些冷门但实用的NPM库
urlname: some-cold-but-useful-libraries
id: 2067
categories:
  - 其他
date: 2018-12-20 10:38:58
tags:
---

Cloc
====

用来统计代码行数和语言类型，https://www.hi-linux.com/posts/4004.html

http-server
===========

很方便的起一个server

live-server
===========

也是起一个server，只不过带live reload功能

**[glyphhanger](https://github.com/filamentgroup/glyphhanger)**
===============================================================

一个`.ttf`转WOFF/WOFF2等Web字体格式的命令行工具，可以：

*   抓取远程或本地文件并分析其中包含的文字
*   将分析结果去重排序并转换为Unicode码点
*   根据指定的源字体生成对应格式的子集（需要安装另一个工具，稍后介绍）
*   同时也生成包含`@font-face`规则的CSS文件

具体用法参见：[前端字体截取](https://juejin.im/post/5c1783216fb9a049b07d4330)

**[google-translate-api](https://github.com/matheuss/google-translate-api)**
============================================================================

免费且无限制的谷歌翻译API库

changelog
=========

https://github.com/semantic-release/changelog


## svg-term-cli

https://github.com/marionebl/svg-term-cli

生成 svg

## rimraf

https://github.com/isaacs/rimraf，`rm -rf`命令 for nodejs

## roa

https://github.com/sindresorhus/ora

## gwm

添加水印

## youtube-dl

可以下载youtube视频，同时下载完成之后会展示该视频的相关信息

## cloc

https://github.com/AlDanial/cloc
不是 JS 编写的，不过很实用，可以计算目录中的代码行数，会根据不同语言进行分门别类，如果是前端工程，可以如此使用：

```bash
cloc --exclude-dir=node_modules .
```

## husky

https://github.com/typicode/husky，可以很方便的添加 git hook，目前已被广泛使用

## standard-version

可以自动生成 CHANGELOG, 甚至是语义化的版本号

## cz-cli

https://github.com/commitizen/cz-cli，不知道 commit message 怎么写？cz-cli 以可视化的方式帮助你提交合适的语义化的 message

## Lighthouse

Lighthouse 是一个开源的自动化工具，用于改进网络应用的质量。 可以将其作为一个 Chrome 扩展程序运行，或从命令行运行。 当为 Lighthouse 提供一个要审查的网址，它将针对此页面运行一连串的测试，然后生成一个有关页面性能的报告。可以参考失败的测试，看看可以采取哪些措施来改进应用。

运行 Lighthouse 的方式有两种：作为 Chrome 扩展程序运行，或作为命令行工具运行。

## speedracer

https://github.com/speedracer/speedracer

SpeedRacer 是一款性能测试工具，它在 Chrome 中运行脚本，并生成详细的性能报告。

SpeedRacer 是直接借助浏览器来实际测试性能的工具，在实际工作中，可以与其它模拟用户访问流量来评估性能的工具配合使用。