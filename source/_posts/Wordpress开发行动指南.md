---
title: Wordpress开发行动指南
urlname: wordpress-development-action-guide
tags:
  - wordpress
  - 指南
id: 180
categories:
  - wordpress
  - 总结
date: 2017-03-15 23:26:18
---

本人玩wordpress到目前为止也只有3天，但是发现wordpress是异常庞大的，可能在开发的过程中会遇到各种各样的bug，同时也会运用到各种小技巧和“黑科技”，所以就索性写篇文章用来记录我在这个过程中的收获与教训吧。

1.wordpress的插件
==============

wordpress的插件使wordpress的功能得到了无限扩展，所以想用wordpress搭建网站或者开发插件的话，一定要多用它的插件，并且多了解一些插件的功能，其中我在做博客的过程中用到的一些好用的插件都在我的另一篇文章里了，可以点击查看->：[wordpress插件推荐](https://merrier.wang/?p=35)

2.自动为WordPress文章设置特色图像代码
========================

这里有一段很实用的代码，可以自动将文章中的第一张图片设置为特色图像，如果你手动设置了特色图像，可以覆盖这段代码。将下面的代码丢到当前主题的functions.php里，以后就不用担心忘记设置特色图像了。（这个到底有什么用呢，反正我没用= =）

function autoset_featured() {
  global $post;
    $already\_has\_thumb = has\_post\_thumbnail($post->ID);
      if (!$already\_has\_thumb)  {
        $attached\_image = get\_children( "post\_parent=$post->ID&post\_type=attachment&post\_mime\_type=image&numberposts=1" );
          if ($attached_image) {
            foreach ($attached\_image as $attachment\_id => $attachment) {
              set\_post\_thumbnail($post->ID, $attachment_id);
            }
          }
        }
      }  //end function
add\_action('the\_post', 'autoset_featured');
add\_action('save\_post', 'autoset_featured');
add\_action('draft\_to\_publish', 'autoset\_featured');
add\_action('new\_to\_publish', 'autoset\_featured');
add\_action('pending\_to\_publish', 'autoset\_featured');
add\_action('future\_to\_publish', 'autoset\_featured');

3.为某篇文章添加特定的样式或js代码
===================

将下面代码添加到你的WordPress主题模板的functions.php 中：

/*
为特定文章添加特定css最简单的方式.
*/
/*添加自定义CSS的meta box*/
add\_action('admin\_menu', 'cwp\_add\_my\_custom\_css\_meta\_box');
/*保存自定义CSS的内容*/
add\_action('save\_post', 'cwp\_save\_my\_custom\_css');
/*将自定义CSS添加到特定文章(适用于Wordpress中文章、页面、自定义文章类型等)的头部*/
add\_action('wp\_head','cwp\_insert\_my\_custom\_css');
function cwp\_add\_my\_custom\_css\_meta\_box() {
add\_meta\_box('my\_custom\_css', '自定义CSS', 'cwp\_output\_my\_custom\_css\_input\_fields', 'post', 'normal', 'high');
add\_meta\_box('my\_custom\_css', '自定义CSS', 'cwp\_output\_my\_custom\_css\_input\_fields', 'page', 'normal', 'high');
}
function cwp\_output\_my\_custom\_css\_input\_fields() {
global $post;
echo '<input type="hidden" name="my\_custom\_css\_noncename" id="my\_custom\_css\_noncename" value="'.wp\_create\_nonce('custom-css').'" />';
echo '<textarea name="my\_custom\_css" id="my\_custom\_css" rows="5" cols="30" style="width:100%;">'.get\_post\_meta($post->ID,'\_my\_custom_css',true).'</textarea>';
}
function cwp\_save\_my\_custom\_css($post_id) {
if (!wp\_verify\_nonce($\_POST\['my\_custom\_css\_noncename'\], 'custom-css')) return $post_id;
if (defined('DOING\_AUTOSAVE') && DOING\_AUTOSAVE) return $post_id;
$my\_custom\_css = $\_POST\['my\_custom_css'\];
update\_post\_meta($post\_id, '\_my\_custom\_css', $my\_custom\_css);
}
function cwp\_insert\_my\_custom\_css() {
if (is\_page() || is\_single()) {
if (have\_posts()) : while (have\_posts()) : the_post();
echo '<style type="text/css">'.get\_post\_meta(get\_the\_ID(), '\_my\_custom_css', true).'</style>';
endwhile; endif;
rewind_posts();
}
}

然后在文章的编辑页面就会出现如下输入框： ![](/images/hexo_post_135-300x174.png) 是在字数统计的下面，我一开始没注意到，以为没生效呢，差点就把这段代码否定了，不过这个方法只能用来定义特定CSS样式，如果想插入特定js代码的话，可以考虑用下面一个方法： 首先还是要将下面代码添加到你的WordPress主题模板的functions.php 中

add\_action("wp\_head","ruikeedu\_custom\_head");
function ruikeedu\_custom\_head(){
    if (is\_single() || is\_page()) {
        global $post;
        $custom\_head = get\_post\_meta($post->ID, 'custom\_head', true);
        echo $custom_head;
    }
}

然后在文章的编辑页面设置显示自定义栏目： ![](/images/hexo_post_136-300x89.png) 然后在文章编辑的后面会出现自定义栏目的输入框，名称为custom_head，值就是你想插入的css代码或js代码（css代码需要有<style></style>，js代码同理，因为该方法不会自动添加标签） 总结：网上虽然关于这个问题的回答很多，但是基本上都是抄来抄去，而且有的方法亲测不可用，所以推荐以上这两种方法一起用，既可以添加css代码又可以添加js代码。

4.允许分类描述添加 html 代码
==================

出于安全等因素考虑，WordPress 后台的文本框一般是不允许添加 html 代码的（也就是被过滤掉）。所以如果有WP用户需要在分类描述中添加 html 代码，下面这个实现方法就可以实现。直接将下面的代码添加到当前主题的 functions.php 文件即可：

/\*\*
\* 允许分类描述添加html代码
\* https://www.wpdaxue.com/category-description-support-html.html
*/
remove\_filter('pre\_term\_description', 'wp\_filter_kses');
remove\_filter('term\_description', 'wp\_kses\_data');

如果你还想让 链接描述和备注、用户描述 也一样支持 html 代码，可以试试下面的代码，同样是添加到functions.php：

// Disables Kses only for textarea saves
foreach (array('pre\_term\_description', 'pre\_link\_description', 'pre\_link\_notes', 'pre\_user\_description') as $filter) {
remove\_filter($filter, 'wp\_filter_kses');
}// Disables Kses only for textarea admin displays
foreach (array('term\_description', 'link\_description', 'link\_notes', 'user\_description') as $filter) {
remove\_filter($filter, 'wp\_kses_data');
}

如果你需要进一步了解实现原理，可以自己阅读以下文档： [http://codex.wordpress.org/Function\_Reference/wp\_filter_kses](http://codex.wordpress.org/Function_Reference/wp_filter_kses) [http://codex.wordpress.org/Function\_Reference/wp\_kses_data](http://codex.wordpress.org/Function_Reference/wp_kses_data)

5.在文章中插入动图
==========

wordpress对于文章中的图片是默认进行缩略处理的，而文章中的gif动图在经过处理后就变成了静态文件，就不会“动”了，所以需要插入动图之后对其进行编辑，然后选择完整尺寸就可以了，如果在编辑文章时，该gif动图就已经“动”了起来，那证明已经成功了。 ![](/images/hexo_post_8-300x229.png)

6.编辑文章上传图片时提示HTTP错误
===================

这个错误发生在我刚把项目从本地部署到服务器之后，然后我就上网搜了一下，有的人说是因为图片太长或太大了，但是我将图片压缩之后还是提示这个错误，所以又尝试了一些其他方法： （1）如果使用的是服务器，那应该是安全设置问题，修改服务器的httpd.conf文件，删除里面关于mod_security部分就可以了 （2）如果使用的是虚拟主机，在.htaccess文件里面加上一行（这个方法亲测有效）

> SetEnvIfNoCase Request\_URI /wp-admin/async-upload.php$ MODSEC\_ENABLE=Off

（3）如果上述方法都不能解决，有可能你的图片确实是太长或者太大了，还是压缩一下再上传试一下吧，[网站导航](https://merrier.wang/?page_id=100)里有好多图片在线压缩工具

7.更改新域名
=======

这个问题的故事是这样的：因为想给自己的网站备案，所以就买了一个可以备案的域名merrier.wang，而之前是merrier.online，在买完域名并解析之后，在wordpress后台将域名配置成merrier.wang之后就出现问题了，因为merrier.wang是没有备案的，所以就无法访问： ![](/images/hexo_post_144.png) 但是访问之前的merrier.online又会重定向到merrier.wang（应该是wordpress自带的重定向功能吧），所以就相当于连后台也访问不了了，只能修改域名。在这里顺便提醒一下，如果你也给域名申请备案中，先不要在后台修改wordpress的域名，因为备案不成功是访问不了的；接下来总结一下网上的几种更改新域名的方法：

### 方法一：修改wp-config.php

在wp-config.php中，添加以下两行内容：

define('WP_HOME','http://yourwebsite');
define('WP_SITEURL','http://yourwebsite');

然后登录后台，在 “常规 -\> 设置”重新配置新博客地址（HOME）和安装地址（SITEURL），**成功后一定记得删除上面添加的内容。**

### 方法二：修改functions.php

functions.php位于当前博客主题目录内，在其中添加以下两行内容：

update_option('siteurl','http://yourwebsite');
update_option('home','http://yourwebsite');

然后登录后台，在 “常规 -\> 设置”重新配置新博客地址（HOME）和安装地址（SITEURL），**成功后一定记得删除上面添加的内容。**

### 方法三：修改wp-config.php（自动更新地址）

在wp-config.php中，添加下面一行内容

define('RELOCATE',true);

然后登录后台地址，WP将自动更新安装地址（SITEURL），手动修改博客地址（HOME）地址即可，**成功后一定要记得删除上面添加的内容**

### 方法四：修改数据库

通过某些方法（phpmyadmin等）登陆到数据库，找到wp_options表，将表中的siteurl和home字段修改为当前的新域名

8.页面下开启评论框
==========

我在更新了一些页面（比如标签云、读者墙、网址导航）之后，发现这些页面下没有评论框，非常的不爽，就上网查了一下，然后大部分答案都是修改代码，我试了之后发现还是不行，后来在[wordpress吧](http://tieba.baidu.com/p/2309858682)发现了问题出在了哪里： 首先，在后台的页面设置界面，显示讨论栏目： ![](/images/hexo_post_145.png) 然后再文章的下面开启允许评论： ![](/images/hexo_post_146.png) 经过这两个步骤之后刷新页面（别忘了更新），就会发现评论框出现了！

9.wordpress后台安装主题或插件时需要FTP帐号怎么办
===============================

在我把代码部署到服务器上之后发现在更新插件或者安装插件的时候需要输入FTP用户名和密码，去阿里云控制台也没有找到，所以就上网找了一些解决教程，试了一下下面的解决方法，实测有效： 主要原因是wordpress主目录的权限所有者不属于apache造成的； 第一步：找到apache服务所使用的用户名和用户组，具体做法为打开终端，输入：

ps -aux

找到/usr/sbin/apach （或/usr/sbin/httpd）的用户名，它就是apache的所有者，我这里是apache 第二部：终端输入：

sudo chown apache:apache -R /var/www/

这里的/var/www/是我的web主目录也是wordpress主目录； 好了，这样就OK了，再进入wordpress后台安装主题和插件不在需要FTP帐户和密码了！！

10.WordPress数据库及各表结构
====================

转载自[csdn](http://blog.csdn.net/ppiao1970hank/article/details/6301812)，相信知道这些数据表的结构之后，可以对自己的wordpress网站进行更加个性化的设置，当然如果你的英文还可以的话，推荐[WordPress官方文档](https://codex.wordpress.org/Database_Description#Table_Overview)，官方已经给出了比较详细的表格

11.建立数据库连接时出错
=============

某一天，我心血来潮想搞个https，结果刷新网页的时候发现显示“建立数据库连接时出错”，后来在服务器上重启mysql就没问题了= =。。

12\. 升级至HTTPS时图片路径仍然为HTTP
=========================

前几天把网站升级至HTTPS了，不过随之而来的就是一堆bug报错，首先就是文章中的图片路径，仍然是HTTP的话浏览器会报Mixed Content错，但是我通过修改数据库的方式仍然不管用，后来不知不觉把两个插件禁用了，然后就好了，这两个插件就是七牛云的相关插件：**WPJAM BASIC、WPJAM 七牛镜像存储**，不过禁用掉之后就用不了七牛云了，后续有时间我再深入研究一下= =

13\. WordPress：基于 JWT 的身份验证
===========================

如果你想基于 WordPress 去创建前端 App 或者移动端 App，解决用户的身份验证可以使用 JWT 这种方法，它是一种基于 Token 的验证身份的方法。