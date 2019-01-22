---
title: 一些常用邮箱的IMAP&SMTP&POP3地址
urlname: imap-smtp-pop3-addresses-for-some-common-mailboxes
id: 662
categories:
  - 总结
tags:
  - SMTP
  - 邮箱地址
date: 2017-04-20 10:05:49
img: /images/hexo_thumbnail_54.jpeg
---

我们在客户端设置邮箱或者使用 PHPMailer 发送邮件的时候，我们都会去查找这些邮箱的 IMAP / SMTP / POP3 地址，这里列出了一些常用邮箱的这些地址，方便自己和大家以后设置邮箱时候使用。

## Gmail

Gmail 的 IMAP / SMTP / POP3 协议默认都是开启，它的详细地址如下：

| 服务器名称 | 服务器地址          | SSL协议端口 | 非SSL协议端口 | 
|-------|----------------|---------|----------| 
| IMAP  | imap.gmail.com | 993     | /        | 
| SMTP  | smtp.gmail.com | 465     | /        | 
| POP3  | pop.gmail.com  | 995     | /        |

## QQ邮箱

QQ邮箱的 IMAP / SMTP / POP3 协议默认是不开启的，你需要登陆到 QQ邮箱，然后到“设置” > “账户” 将其开启。

| 服务器名称 | 服务器地址       | SSL协议端口 | 非SSL协议端口 | 
|-------|-------------|---------|----------| 
| IMAP  | imap.qq.com | 993     | 143      | 
| SMTP  | smtp.qq.com | 465或587 | 25       | 
| POP3  | pop.qq.com  | 995     | 110      | 


## 163 邮箱

| 服务器名称 | 服务器地址        | SSL协议端口 | 非SSL协议端口 | 
|-------|--------------|---------|----------| 
| IMAP  | imap.163.com | 993     | 143      | 
| SMTP  | smtp.163.com | 465或994 | 25       | 
| POP3  | pop.163.com  | 995     | 110      | 


## 阿里云邮箱

| 服务器名称 | 服务器地址           | SSL协议端口 | 非SSL协议端口 | 
|-------|-----------------|---------|----------| 
| POP3  | pop3.aliyun.com | 110     | 995      | 
| SMTP  | smtp.aliyun.com | 25      | 465      | 
| IMAP  | imap.aliyun.com | 143     | 993      | 


## 139邮箱

| 服务器名称 | 服务器地址         | SSL协议端口 | 非SSL协议端口 | 
|-------|---------------|---------|----------| 
| IMAP  | imap.10086.cn | 143     | /        | 
| POP3  | pop.10086.cn  | 110     | 995      | 
| SMTP  | smtp.10086.cn | 25      | 465      | 


## sina邮箱

| 服务器名称 | 服务器地址         | SSL协议端口 | 非SSL协议端口 | 
|-------|---------------|---------|----------| 
| IMAP  | imap.sina.com | 143     | 993      | 
| SMTP  | smtp.sina.com | 25      | /        | 
| POP3  | pop.sina.com  | 110     | /        | 

## 扩展阅读

* [常用邮箱的 IMAP/POP3/SMTP 设置](http://www.cnblogs.com/shangdawei/p/4305989.html)