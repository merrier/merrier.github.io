---
title: 罗马数字转换成整数（JS）
urlname: roman-numerals-converted-into-integers
id: 313
categories:
  - 计算机基础
tags:
  - 罗马数字
date: 2017-03-24 22:40:12
img: /images/hexo_thumbnail_29.jpeg
---

在刷 Leetcode 时碰到了一道题，题目的大致意图就是将罗马数字转换成整数，但是我竟然连罗马数字是什么都不知道，所以就打算写一篇关于这道题的文章

## 题目要求

给定一个罗马数字 s，(I <= s <= MMMCMXCIX)（即1 到 3999），将罗马数字转换成整数。
输入：一个罗马数字
输出：对应的整数

## 知识储备

首先要来了解一下罗马数字表示法，基本字符有 7 个：I，V，X，L，C，D，M，分别表示 1，5，10，50，100，500，1000。并且在构成数字的时候，有下列规则：

* 相同的数字连写，所表示的数等于这些数字相加得到的数，如：Ⅲ= 3；
* 小的数字在大的数字的右边，所表示的数等于这些数字相加得到的数， 如：Ⅷ= 8；Ⅻ= 12；
* 小的数字，（限于 Ⅰ、X 和 C）在大的数字的左边，所表示的数等于大数减小数得到的数，如：Ⅳ=4；Ⅸ=9；
* 正常使用时，连写的数字重复不得超过三次。

所以，根据以上规则，可以发现其中的规律，就是只需要比较前后元素的大小，如果前面比后面大，这两个罗马字母代表的数字就相加；如果前面比后面小，就后面的减去前面的；如果相等也相加。再把每一对都相加，最后结果就是转换后的整数了（需要注意的是，最后一个字母是肯定要相加的）

## 代码实现

```javascript
/*
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    var opt = {'M': 1000,'D': 500 ,'C': 100,'L': 50,'X': 10,'V': 5,'I': 1},
        z = 0,
        n = s.length;
    for(var i = 0;i < n-1;i++){
        if(opt[s[i]] < opt[s[i+1]]){
            z -= opt[s[i]];
        }else{
            z += opt[s[i]];
        }
    }
    return z + opt[s[n-1]];
};
```

## 题目来源

Leetcode第 13 题：https://leetcode.com/problems/roman-to-integer/#/description