---
title: Apache配置二级域名及SSL证书
urlname: apache-configuration-of-secondary-domain-name-and-ssl-certificate
tags:
  - apache
id: 1760
categories:
  - 服务器
date: 2018-04-24 18:13:56
---

写在前面
====

前一段日子，我费了九牛二虎之力将“Merrier说”博客升级成了HTTPS，虽然回过头来看，其实申请SSL证书以及配置都是现成的轮子，别人已经为我们写好了脚本，不过对于第一次接触服务器相关的童鞋来说，确实会遇到很多麻烦，如果你也有这个需求，可以参考我的另一篇文章——[网站配置HTTPS踩坑记](https://merrier.wang/2018/04/16/%e7%bd%91%e7%ab%99%e9%85%8d%e7%bd%aehttps%e8%b8%a9%e5%9d%91%e8%ae%b0-2.html "网站配置HTTPS踩坑记-Merrier说")，不过这几天我又想配置一个二级域名（api.merrier.wang），用作爬虫输出的REST API所用。

Apache配置
========

首先，我们既然要配置二级域名，那肯定要更改服务器的配置了，这里我以Apache为例，介绍一下如何配置二级域名： 服务器的配置文件以.conf为后缀，首先找到apache配置文件（httpd.conf）所在位置：

find / -name httpd.conf

假如httpd.conf所在路径为/etc/httpd/conf/httpd.conf，在httpd.conf中加入这样一句代码：

Include /etc/httpd/conf/extra/*.conf

其含义是将/etc/httpd/conf/extra/路径下的所有以.conf为后缀的文件都作为apache的配置文件进行引入，这样我们就可以将除了httpd.conf之外的其他配置文件放到extra文件夹下，便于管理。 配置一下NameVirtualHost，将配置文件中的下面一行代码取消注释：

NameVirtualHost *:80

然后，我们在extra文件夹下新建一个配置文件，如果主域名为merrier.wang，而想配置的二级域名为api.merrier.wang的话，配置文件可以取名为httpd-api.conf，这样命名比较规范。在新建的配置文件中填入以下代码：

<VirtualHost *:80>
    ServerAdmin root@merrier.wang
    DocumentRoot "/var/www/html/merrier-api"
    <Directory "/var/www/html/merrier-api">
      AllowOverride all
      Order allow,deny
      Allow from all
    </Directory>
    ServerName api.merrier.wang
    ProxyRequests off
    <Proxy *>
      Order deny,allow
      Allow from all
    </Proxy>
    <Location />
      ProxyPass http://localhost:3000/
      ProxyPassReverse http://localhost:3000/
    </Location>
    ErrorLog logs/merrier.wang-error_log
    CustomLog logs/merrier-wang-access_log common
</VirtualHost>

其中有几个字段名需要按照真实情况进行修改：

*   DocumentRoot和Directory：你的文件存放路径
*   ServerAdmin：一般为root@主域名
*   ServerName：二级域名
*   ProxyPass和ProxyPassReverse：node服务占用的端口号，如果没有node服务，可以不填写
*   ErrorLog和CustomLog：log存放地址

这样修改之后重启服务器让配置生效：

service httpd restart

然后访问一下你的二级域名（http），如果一切顺利的话应该就可以看到页面了（如果有node服务的话，需要先启动node服务）

PM2及node相关配置
============

如果你需要启动node服务，那你肯定需要进行进程管理，尤其是如果你的网站需要占用多个端口有多个node服务的话，那在node进程管理工具中，业界使用最多的就是pm2了，下面就介绍一下如何合理的进行pm2以及node相关安装和配置（如果你没有node服务，那这一部分就可以跳过了）：

安装nodejs和npm
------------

centos默认是没有nodejs和npm的，所以需要进行安装：首先要通过 yum 来安装 nodejs 和 npm 需要先给 yum 添加 epel 源，添加方法在 [centos 添加epel和remi源](http://www.dahouduan.com/2014/12/25/centos-yum-add-epel-remi/) 中，安装完成后，执行：

yum -y install nodejs npm --enablerepo=epel

安装nvm
-----

在我们的日常开发中经常会遇到这种情况：手上有好几个项目，每个项目的需求不同，进而不同项目必须依赖不同版的 NodeJS 运行环境。如果没有一个合适的工具，这个问题将非常棘手。[nvm](https://github.com/creationix/nvm) 应运而生，nvm 是 Mac 下的 node 管理工具，有点类似管理 Ruby 的 rvm。在centos系统，我们可以通过curl的方式安装nvm：

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash

如果你看到以下报错，说明你的git版本太低了（可以通过git --version查看当前git的版本）：

=\> error: pathspec 'v0.29.0' did not match any file(s) known to git.
Your version of git is out of date. Please update it!

可以按照[centos 6.7 安装 最新版 git](https://segmentfault.com/a/1190000007134786)的教程进行最新版git的安装，讲解步骤很详细。 安装完nvm之后，我们对node的版本管理就非常简单了，例如，我们要安装8.1.3版本，可以用如下命令：

nvm install 8.1.3

列出远程服务器上所有的可用版本：

nvm ls-remote

列出本地已安装的版本：

nvm ls

切换到某个版本：

nvm use 8.1.3

nvm的更多用法参见：[使用 nvm 管理不同版本的 node 与 npm](http://bubkoo.com/2017/01/08/quick-tip-multiple-versions-node-nvm/)

安装pm2
-----

npm全局安装，一行命令不能再简单：

npm install -g pm2

配置pm2
-----

如果你的服务入口文件为app.js，在当前项目目录下启动pm2：

pm2 start app.js --watch

这里用了--watch参数，意味着当你的express应用代码发生变化时，pm2会帮你重启服务，多贴心。不过如果不经常改动，最好省去这个参数。关于pm2的其他命令可以查看[PM2实用入门指南](http://www.cnblogs.com/chyingp/p/pm2-documentation.html)。

### shell脚本启动多个服务

我们可以通过shell脚本控制多个服务的同时开启，比如新建一个bootstrap.sh文件：

#!/bin/bash
CURRENT\_DIR="$(cd -P "$(dirname "${BASH\_SOURCE\[0\]}")" && pwd)"
cd $CURRENT_DIR

. ~/.nvm/nvm.sh
nvm use v8.1

sleep 1
pm2 start app.json

而app.json中可以填入多个node服务的相关信息，名称、端口、log信息等等，这种玩法苏南大叔讲的很详细了，可以移步：[pm2 start命令进阶详解](https://newsn.net/say/node-pm2-start.html)

配置SSL证书
=======

接下来就是配置SSL证书的环节了，这里我们依然可以选择Let's entrypt的证书，同时利用certbot工具可以节省很多麻烦，如果你配置过顶级域名的SSL证书（如果没有配置过，可以参考我的另一篇文章：[网站配置HTTPS踩坑记](https://merrier.wang/2018/04/16/%e7%bd%91%e7%ab%99%e9%85%8d%e7%bd%aehttps%e8%b8%a9%e5%9d%91%e8%ae%b0-2.html)进行配置），可以进入之前已经生成好的certbot-auto目录，然后执行以下命令：

sudo certbot-auto --apache --duplicate

当你遇到以下信息时，建议单独选择你没有进行配置过HTTPS的域名，这样就不会覆盖掉原来申请过的证书：

Which names would you like to activate HTTPS for?

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

1: merrier.wang

2: api.merrier.wang

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

Select the appropriate numbers separated by commas and/or spaces, or leave input

blank to select all options shown (Enter 'c' to cancel):

配置完成之后，重启服务器就可以了：

service httpd restart

Have Fun！

##### 参考链接

[centos用 yum 方式安装 nodejs 和 npm](http://www.dahouduan.com/2014/12/25/centos-yum-install-nodejs-npm/)

[centos 添加 epel 和 remi 源](http://www.dahouduan.com/2014/12/25/centos-yum-add-epel-remi/)

[centos 使用 nvm 安装 nodejs （nvm安装时出错，git 版本太老）](https://segmentfault.com/a/1190000007135306)

[centos 6.7 安装 最新版 git](https://segmentfault.com/a/1190000007134786)

[PM2实用入门指南](http://www.cnblogs.com/chyingp/p/pm2-documentation.html)

[使用 nvm 管理不同版本的 node 与 npm](http://bubkoo.com/2017/01/08/quick-tip-multiple-versions-node-nvm/)