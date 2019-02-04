---
title: 最好用的工具和NPM库都在这里了
urlname: some-useful-npm-libraries
id: 2067
date: 2018-12-20 10:38:58
categories:
  - JS
tags:
  - npm
  - 推荐
---

分享一些我用过或者同事推荐的 NPM 库或者其他实用的工具

## Cloc

Github 地址：https://github.com/AlDanial/cloc

> Cloc是一款使用Perl语言开发的开源代码统计工具，支持多平台使用、多语言识别，能够计算指定目标文件或文件夹中的文件数(files)、空白行数(blank)、注释行数(comment)和代码行数(code)。

虽然这是一个命令行工具，但是其作用非常强大，具体使用参考：[代码统计利器 Cloc](https://www.hi-linux.com/posts/4004.html)，如果是前端工程，可以如此使用：

```bash
cloc --exclude-dir=node_modules .
```

## http-server

NPM 地址：https://www.npmjs.com/package/http-server
Github地址：https://github.com/indexzero/http-server

只需要一行命令就可以起一个 HTTP Server

## live-server

NPM 地址：https://www.npmjs.com/package/live-server
Github 地址：https://github.com/tapio/live-server

也是起一个 HTTP Server，只不过带 live reload 的功能

## glyphhanger

NPM 地址：https://www.npmjs.com/package/glyphhanger
Github 地址：https://github.com/filamentgroup/glyphhanger

一个 `.ttf` 转 WOFF/WOFF2 等 Web 字体格式的命令行工具，可以：

* 抓取远程或本地文件并分析其中包含的文字
* 将分析结果去重排序并转换为 Unicode 码点
* 根据指定的源字体生成对应格式的子集（需要安装另一个工具，稍后介绍）
* 同时也生成包含 `@font-face` 规则的 CSS 文件

具体用法参见：[前端字体截取](https://juejin.im/post/5c1783216fb9a049b07d4330)

## google-translate-api

Github地址：https://github.com/matheuss/google-translate-api

免费且无限制的谷歌翻译 API 库

## changelog

NPM 地址：https://www.npmjs.com/package/changelog
Github 地址：https://github.com/dylang/changelog

根据 commit 信息生成 changelog 文件，其实具有类似功能的还有

* [standard-version](https://github.com/conventional-changelog/standard-version)
* [@semantic-release/changelog](https://github.com/semantic-release/changelog)

## svg-term-cli

NPM 地址：https://www.npmjs.com/package/svg-term-cli
Github 地址：https://github.com/marionebl/svg-term-cli

可以将 terminal 中的操作和输出生成对应的 svg，类似下面这张图片所展示的：

<div align='center'><img src='//camo.githubusercontent.com/bc42bdae37fb7d47b934f8027c121e3bc3fb3ed3/68747470733a2f2f63646e2e7261776769742e636f6d2f6d6172696f6e65626c2f7376672d7465726d2d636c692f31323530663963312f6578616d706c65732f706172726f742e737667' alt='' width='500'/></div>

## rimraf

Github 地址：https://github.com/isaacs/rimraf

`rm -rf` 命令 for nodejs

## roa

Github 地址：https://github.com/sindresorhus/ora

定制化 terminal 中展示的 loading 动画：

<div align='center'><img src='//github.com/sindresorhus/ora/raw/master/screenshot.svg?sanitize=true' alt='' width='400'/></div>

## gwm

NPM 地址：https://www.npmjs.com/package/gwm
Github 地址：https://github.com/loadchange/gwm

试用过好几款添加水印的库，只有这一款我能用，demo：http://yanfu.vip/gwm/

## youtube-dl

NPM 地址：https://www.npmjs.com/package/youtube-dl
Github 地址：https://github.com/przemyslawpluta/node-youtube-dl

可以下载 youtube 视频，同时下载完成之后会展示该视频的相关信息

## husky

Github 地址：https://github.com/typicode/husky

可以很方便的添加 git hook，目前已被各大开源库使用，实用性可见一斑

## cz-cli

Github 地址：https://github.com/commitizen/cz-cli

不知道 commit message 怎么写？cz-cli 以可视化的方式帮助你提交合适的语义化的 message

## Lighthouse

Github 地址：https://github.com/GoogleChrome/lighthouse

Lighthouse 是一个 Google Chrome 开源的自动化工具，用于改进网络应用的质量。可以将其作为一个 Chrome 扩展程序运行，或从命令行运行。当为 Lighthouse 提供一个要审查的网址，它将针对此页面运行一连串的测试，然后生成一个有关页面性能的报告。可以参考失败的测试，看看可以采取哪些措施来改进应用。

运行 Lighthouse 的方式有两种：作为 Chrome 扩展程序运行，或作为命令行工具运行：

```bash
npm install -g lighthouse
lighthouse https://merrier.wang
```

## speedracer

Github 地址：https://github.com/speedracer/speedracer

SpeedRacer 是一款性能测试工具，它在 Chrome 中运行脚本，并生成详细的性能报告。SpeedRacer 是直接借助浏览器来实际测试性能的工具，在实际工作中，可以与其它模拟用户访问流量来评估性能的工具配合使用。