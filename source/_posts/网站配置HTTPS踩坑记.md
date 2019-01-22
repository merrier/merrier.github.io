---
title: 网站配置HTTPS踩坑记
urlname: website-configuration-https
id: 1685
categories:
  - HTTP
tags:
  - HTTP
  - Wordpress
  - 指南
date: 2018-04-16 14:36:36
img: /images/hexo_thumbnail_18.png
---

近两年来 HTTPS 取代 HTTP 已经成为大势所趋。早在 2014 年 Google Chromium 安全团队提议将所有的 HTTP 协议网站标注为不安全。现在，Chrome 浏览器已经开始执行这一标准了。从 Chrome 56 开始，任何网页，如果有输入密码或者信用卡资料的，却没有使用 HTTPS，将被 Chrome 浏览器标识为不安全；逐步的，任何没有使用 HTTPS 协议的网页 Chrome 浏览器都会被标识为”不安全”，或者 “Not Secure”。所以处女座的我打算将 merrier.wang 升级成 HTTPS，以下对升级过程中遇到的问题和坑进行一下总结，如果你也有类似需求，希望这篇文章能够帮到你一二~

## SSL证书选择

1、对于国内用户来说，可以使用与百度云、腾讯云、阿里云合作的赛门铁克签署的证书，一年免费，申请和使用都很方便。 （**不过我一开始用腾讯云的免费证书，发现chrome浏览器还是标记不安全，所以我就放弃用国内的证书- -**） 2、自从 [Let’s Encrypt](https://letsencrypt.org/) 免费签发证书后，SSL 证书的价格就开始平民化了，有不少免费和收费的 SSL 可以选择。Let’s Encrypt 的证书虽然只有90的天，不过自动续期也很方便，对于小站来说，是很不错的选择。而我使用的就是 Lets Encrypt 颁发的证书，下面就主要记录一下申请证书，配置证书到 apache，以及自动续期的实现步骤，供有兴趣的童鞋参考。

## 申请证书

Certbot 是一个简单易用的 SSL 证书部署工具，由 EFF 开发，前身即 Let’s Encrypt 官方（Python）客户端。简单来说，certbot 就是一个简化 Let’s Encrypt 部署，和管理 Let’s Encrypt 证书的工具。所以我们可以通过 Certbot 非常方便的生成证书并借助脚本实现自动续费。 首先来到 [Certbot官网](https://certbot.eff.org/)，在下面的蓝色箭头处选择操作系统和服务器型号：

<div align='center'>
![](/images/hexo_post_290.png)
</div>

以我的阿里云 ECS 举例，操作系统是 CentOS 6，服务器是 Apache，选择完之后页面下方会出现指引；按照其指引，我们首先需要安装 certbot-auto，在你想要安装的目录（这个目录最好是一个简单好找的目录，比如 `/etc/httpd/conf`，因为后面还要用到）下执行以下命令：

```bash
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
```

然后我们通过certbot获取证书：

```bash
sudo ./path/to/certbot-auto --apache
```

期间会让你填一些自己的信息，比如个人邮箱等等，按照自己的实际情况填写即可，然后过程中可能会遇到下面这条信息：

```
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
```

这里我强烈建议选择第二个 Redirect 选项，因为这样 Certbot 会对 apache 配置文件进行修改，当用户访问 HTTP 链接时，强制重定向到 HTTPS 链接，就不需要我们自己进行修改了。 如果一切顺利的话，当我们看到下面的提示信息时，就证明我们的证书已经申请成功并配置成功了：

```
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
Congratulations! You have successfully enabled https://merrier.wang

You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=merrier.wang
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-
```

## 自动续费

此时我们可以访问一下 HTTPS 的链接，看看证书是否生效，如果不生效，可以尝试一下重启 apache：

```bash
service httpd restart
```

Let’s Encrypt 的证书，默认的有效期是 90 天，不过官方推荐每 60 天续期。到期之后，我们需要用命令来为证书续期，不过我们是懒人，这种体力活还是交给机器来完成比较合适。所以，我们可以用 Linux 的 cron job 来完成这类的任务。

### 安装

如果服务器上没有安装 crontabs，需要手动安装，centos 系统建议通过 yum 安装：

```bash
yum install crontabs
```

### 启动服务

```bash
service crond start
chkconfig crond start
```

### 添加新的任务

```bash
crontab \[-u user\] -e
```

其中：-u user：用来设定某个用户的 crontab 服务，例如，“-u ixdba”表示设定 ixdba 用户的 crontab 服务，此参数一般由 root 用户来运行。即执行 `crontab -u root -e` 来添加任务，此时会打开一个新的文件，填入以下脚本信息：

```
0 0,12 * * * python -c 'import random; import time; time.sleep(random.random() * 3600)' && ./path/to/certbot-auto renew --post-hook "service httpd restart"
```

如果出现 crontab: installing new crontab 就说明我们的脚本已经生效了，自动续费就配置好了。关于更多 crontab 的内容可以[点击这里](https://www.jianshu.com/p/838db0269fd0)查看，你可以利用他做更多有意思的事情。如果你不确定自己的定时任务是否设置成功，可以通过执行 `crontab -l` 进行查看，如果出现上面的那段 python 代码，说明定时任务已经设置成功；有时候可能 crond 服务莫名的挂掉，我们可以通过上面的命令手动启动，同时也可以通过下面的命令手动更新证书：

```bash
/etc/httpd/conf/certbot-auto renew
```

## Wordpress配置https

如果你的网站是通过 wordpress 搭建的，除了进行上面的流程之外，还需要进行额外的配置：

### 修改wordpress后台配置中的地址改为https版本

<div align='center'>
![](/images/hexo_post_291.png) 
</div>

**注意：一定要保证https和http两种方式都能正常访问网站，才能改这个配置，否则可能导致网站无法访问。**通过上面的设置，绝大部分导航中的链接就由 wordpress 系统会自动改为 HTTPS 版本。

### 替换正文的内部链接和其他静态资源

对于这部分链接需要手工修改，修改的方法有两种：

#### （1）直接在数据库中更新，更新的sql如下：

```mysql
update wp\_posts set post\_content = replace(post_content, ‘http://your-website-name/’,‘https://your-website-name/’)
```

对于数据库不熟悉的童鞋不推荐这种方法，对数据库错误的更新对网站可能是毁灭性的打击，建议**更新前最好备份数据库**。

#### （2）利用wordpress提供的api来重写链接

在使用的主题（themes）的目录下的 functions.php 加入如下代码：

```php
if ( function\_exists('add\_theme\_support') )add\_theme_support('post-thumbnails');

add\_filter('script\_loader\_src', 'agnostic\_script\_loader\_src', 20,2);
function agnostic\_script\_loader_src($src, $handle) {
    return preg_replace('/^(http|https):/', '', $src);
}

add\_filter('style\_loader\_src', 'agnostic\_style\_loader\_src', 20,2);
function agnostic\_style\_loader_src($src, $handle) {
    return preg_replace('/^(http|https):/', '', $src);
}
```

这个方法优点是可逆，不会对网站的数据库有什么影响，推荐使用这种方法。 调整完内部链接后，检查整个网站的页面，包括首页，栏目页，内容页，sitemap，页面head部分内容，比如：css，js，canonical 等，是否都转换成了 HTTPS 版本。

## 可能会遇到的问题

### Apache配置文件找不到

可能某些童鞋的 apache 配置文件不在 `/etc/httpd/conf` 目录下，可以通过 find 命令进行查找：

```bash
find / -name httpd.conf
```

其中“/”是指在根目录下进行查找，如果你知道在哪个目录下，可以自行修改，节省查找的时间


### Invalid command 'SSLEngine', perhaps misspelled or defined by a module not included in the server configuration

不管是在证书申请过程中还是在自己修改配置过程中遇到次报错，一般情况下是因为在 modules 文件夹下并没有 ssl 模块，那就需要自己安装了，我在[stackoverflow](https://stackoverflow.com/questions/5257974/how-to-install-mod-ssl-for-apache-httpd)上搜到了解决方案，代码如下：

```bash
yum install mod_ssl
```

当我们安装完毕之后，就可以看到 modules 文件夹下多了一个 mod_ssl.so 文件了，此时我们再重启 apache 就应该不报错了。


### \[warn\] module ssl_module is already loaded, skipping Address already in use: make_sock: could not bind to address 0.0.0.0:443 no listening sockets available, shutting down

出现该警告说明 ssl module 被多处使用，可以用如下命令检查：

```bash
grep ssl_module -rI /etc/httpd/*
```

此时会出现：

<div align='center'>
![](/images/hexo_post_289.png)
</div>

其中 `httpd.bk.conf` 是我自己建的备份，所以有两种解决方法：

1. httpd.conf 中去掉 `LoadModule ssl\_module modules/mod\_ssl.so`、去掉 `Listen 443`
2. 直接删除 `/etc/httpd/conf.d/ssl.conf`，推荐直接删除 ssl.conf

## 参考文章

[WordPress整站轻松开启HTTPS](https://www.watch-life.net/wordpress/wordpress-https-link.html)

[apache服务器添加https（针对ios10 https）](https://www.jianshu.com/p/909adc612fd4)

[通过Certbot配置Let’s Encrypt的SSL（Apache）](https://stringblog.com/%E9%80%9A%E8%BF%87certbot%E9%85%8D%E7%BD%AElets-encrypt%E7%9A%84ssl%EF%BC%88apache%EF%BC%89/)