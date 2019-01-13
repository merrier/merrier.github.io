---
title: 为什么随机字符串“chucknorris”会被识别为红色？
urlname: why-is-the-random-string-chucknorris-recognized-as-red
id: 1039
categories:
  - stackoverflow
tags:
  - CSS
  - stackoverflow
  - 计算机基础
date: 2017-08-01 18:35:30
img: /images/hexo_thumbnail_6.jpg
---

这个问题来源于 [stackoverflow](https://stackoverflow.com/questions/8318911/why-does-html-think-chucknorris-is-a-color)，就是有位学者无意中发现随机字符串会被 html 识别为特定的一些颜色，于是就在 stackoverflow 发起了讨论，这个问题也引起了我的兴趣，虽然是一个比较偏的知识点，但是了解一下还是没坏处的。

## 题目解释

从下图我们可以看到，“chucknorris” 是一个随机的字符串，但是 body 却被渲染成了红色，是不是很有趣？

<div align='center'><img src='/images/hexo_post_274.png' alt='' width='600'/></div>

## 原理

首先你需要知道 css 中的颜色值是十六进制的（比如最通常的白色："#FFFFFF"，黑色："#000000"），所以对于随机的字符串来说，其中有可能会包含不属于十六进制字母的那些字母（比如 h、u、k 等等），那么就会有如下的规则对“随机字符串颜色”进行替换（以随机字符串 “chucknorris” 为例）：

### 首先，用'0'替换所有的非十六进制字母

chucknorris -> c00c0000000  

### 然后将替换后的字符串分为三组（从前往后进行划分，不能平分就在后面加 '0'，比如上面的 "c00c0000000" 就只有 11 个字母，需要在尾部添加一个 '0'）

c00c 0000 0000  

### 最后，对于每一组内的字符串，只取前两位字母作为最终的 “R”、“G”、“B” 的值

c00c 0000 0000 -> RGB(c0, 00, 00)

所以，最终的结果是 #c00000/rgb(192,0,0),就是最开始那张图显示的深红色。

## 还没完

所以这个问题的答案就是一个歇后语：王八的屁股——规定！当然了，对于那种不足六个字母的颜色值来说，就会有额外的处理规则了：#aaa -> #aaaaaa、#aaa3 -> #aaa300、#aaa35 -> #aaa350，有一个“很有想法”的哥们专门为这个转换做了一个网页，可以[点击这里](http://randomstringtocsscolor.com/)试玩一下，输入任意的字符串可以看到背景颜色的变化，同时可以看到最终的颜色值

<div align='center'><img src='/images/hexo_post_275.png' alt='' width='500'/></div>