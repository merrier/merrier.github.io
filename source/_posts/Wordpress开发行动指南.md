---
title: Wordpress开发行动指南
urlname: wordpress-development-action-guide
id: 180
categories:
  - wordpress
tags:
  - wordpress
  - 指南
date: 2017-03-15 23:26:18
img: /images/hexo_thumbnail_104.jpeg
---

本人玩 Wordpress 到目前为止也只有 3 天，但是发现 Wordpress 是异常庞大的，可能在开发的过程中会遇到各种各样的 bug，同时也会运用到各种小技巧和“黑科技”，所以就索性写篇文章用来记录我在这个过程中的收获与教训吧。

## 1. Wordpress 的插件

Wordpress 的插件使 Wordpress 的功能得到了无限扩展，所以想用 Wordpress 搭建网站或者开发插件的话，一定要多用它的插件，并且多了解一些插件的功能，其中我在做博客的过程中用到的一些好用的插件都在我的另一篇文章里了，可以点击查看 ->：[Wordpress插件推荐](/daizhengli/1234.html)

## 2. 自动为 WordPress 文章设置特色图像代码

这里有一段很实用的代码，可以自动将文章中的第一张图片设置为特色图像，如果你手动设置了特色图像，可以覆盖这段代码。将下面的代码丢到当前主题的 functions.php 里，以后就不用担心忘记设置特色图像了。（这个到底有什么用呢，反正我没用= =）

```php
function autoset_featured() {
  global $post;
  $already_has_thumb = has_post_thumbnail($post->ID);
  if (!$already_has_thumb)  {
    $attached_image = get_children( "post_parent=$post->ID&post_type=attachment&post_mime_type=image&numberposts=1" );
    if ($attached_image) {
      foreach ($attached_image as $attachment_id => $attachment) {
        set_post_thumbnail($post->ID, $attachment_id);
      }
    }
  }
}  //end function
add_action('the_post', 'autoset_featured');
add_action('save_post', 'autoset_featured');
add_action('draft_to_publish', 'autoset_featured');
add_action('new_to_publish', 'autoset_featured');
add_action('pending_to_publish', 'autoset_featured');
add_action('future_to_publish', 'autoset_featured');
```

## 3. 为某篇文章添加特定的样式或 js 代码

将下面代码添加到你的 WordPress 主题模板的 functions.php 中：

```php
/*
为特定文章添加特定css最简单的方式.
*/
/*添加自定义CSS的meta box*/
add_action('admin_menu', 'cwp_add_my_custom_css_meta_box');
/*保存自定义CSS的内容*/
add_action('save_post', 'cwp_save_my_custom_css');
/*将自定义CSS添加到特定文章(适用于Wordpress中文章、页面、自定义文章类型等)的头部*/
add_action('wp_head','cwp_insert_my_custom_css');
function cwp_add_my_custom_css_meta_box() {
add_meta_box('my_custom_css', '自定义CSS', 'cwp_output_my_custom_css_input_fields', 'post', 'normal', 'high');
add_meta_box('my_custom_css', '自定义CSS', 'cwp_output_my_custom_css_input_fields', 'page', 'normal', 'high');
}
function cwp_output_my_custom_css_input_fields() {
  global $post;
  echo '<input type="hidden" name="my_custom_css_noncename" id="my_custom_css_noncename" value="'.wp_create_nonce('custom-css').'" />';
  echo '<textarea name="my_custom_css" id="my_custom_css" rows="5" cols="30" style="width:100%;">'.get_post_meta($post->ID,'_my_custom_css',true).'</textarea>';
}
function cwp_save_my_custom_css($post_id) {
  if (!wp_verify_nonce($_POST['my_custom_css_noncename'], 'custom-css')) return $post_id;
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return $post_id;
  $my_custom_css = $_POST['my_custom_css'];
  update_post_meta($post_id, '_my_custom_css', $my_custom_css);
}
function cwp_insert_my_custom_css() {
  if (is_page() || is_single()) {
    if (have_posts()) : while (have_posts()) : the_post();
    echo '<style type="text/css">'.get_post_meta(get_the_ID(), '_my_custom_css', true).'</style>';
    endwhile; endif;
    rewind_posts();
  }
}
```

然后在文章的编辑页面就会出现如下输入框：

<div align='center'><img src='/images/hexo_post_135.png' alt='' width='500'/></div>

它是在字数统计的下面，我一开始没注意到，以为没生效呢，差点就把这段代码否定了，不过这个方法只能用来定义特定 CSS 样式，如果想插入特定 js 代码的话，可以考虑用下面一个方法：

首先还是要将下面代码添加到你的 WordPress 主题模板的 functions.php 中

```php
add_action("wp_head","ruikeedu_custom_head");
function ruikeedu_custom_head(){
  if (is_single() || is_page()) {
    global $post;
    $custom_head = get_post_meta($post->ID, 'custom_head', true);
    echo $custom_head;
  }
}
```

然后在文章的编辑页面设置显示自定义栏目：

<div align='center'><img src='/images/hexo_post_136.png' alt='' width='700'/></div>

然后在文章编辑的后面会出现自定义栏目的输入框，名称为 custom_head，值就是你想插入的 css 代码或 js 代码（css 代码需要有 `<style></style>`，js 代码同理，因为该方法不会自动添加标签）

总结：网上虽然关于这个问题的回答很多，但是基本上都是抄来抄去，而且有的方法亲测不可用，所以推荐以上这两种方法一起用，既可以添加 css 代码又可以添加 js 代码。

## 4. 允许分类描述添加 html 代码

出于安全等因素考虑，WordPress 后台的文本框一般是不允许添加 html 代码的（也就是被过滤掉）。所以如果有 WP 用户需要在分类描述中添加 html 代码，下面这个实现方法就可以实现。直接将下面的代码添加到当前主题的 functions.php 文件即可：

```php
/*
 * 允许分类描述添加html代码
 * https://www.wpdaxue.com/category-description-support-html.html
*/
remove_filter('pre_term_description', 'wp_filter_kses');
remove_filter('term_description', 'wp_kses_data');
```

如果你还想让 链接描述和备注、用户描述 也一样支持 html 代码，可以试试下面的代码，同样是添加到 functions.php：

```php
// Disables Kses only for textarea saves
foreach (array('pre_term_description', 'pre_link_description', 'pre_link_notes', 'pre_user_description') as $filter) {
  remove_filter($filter, 'wp_filter_kses');
}// Disables Kses only for textarea admin displays
foreach (array('term_description', 'link_description', 'link_notes', 'user_description') as $filter) {
  remove_filter($filter, 'wp_kses_data');
}
```

如果你需要进一步了解实现原理，可以自己阅读以下文档：
* [http://codex.wordpress.org/Function_Reference/wp_filter_kses](http://codex.wordpress.org/Function_Reference/wp_filter_kses)
* [http://codex.wordpress.org/Function_Reference/wp_kses_data](http://codex.wordpress.org/Function_Reference/wp_kses_data)

## 5. 在文章中插入动图

Wordpress 对于文章中的图片是默认进行缩略处理的，而文章中的 gif 动图在经过处理后就变成了静态文件，就不会“动”了，所以需要插入动图之后对其进行编辑，然后选择完整尺寸就可以了，如果在编辑文章时，该 gif 动图就已经“动”了起来，那证明已经成功了。

<div align='center'><img src='/images/hexo_post_8.png' alt='' width='500'/></div>

## 6.编辑文章上传图片时提示 HTTP 错误

这个错误发生在我刚把项目从本地部署到服务器之后，然后我就上网搜了一下，有的人说是因为图片太长或太大了，但是我将图片压缩之后还是提示这个错误，所以又尝试了一些其他方法：

1. 如果使用的是服务器，那应该是安全设置问题，修改服务器的 httpd.conf 文件，删除里面关于 mod_security 部分就可以了
2. 如果使用的是虚拟主机，在 .htaccess 文件里面加上一行（这个方法亲测有效）：

> SetEnvIfNoCase Request_URI /wp-admin/async-upload.php$ MODSEC_ENABLE=Off

3. 如果上述方法都不能解决，有可能你的图片确实是太长或者太大了，还是压缩一下再上传试一下吧

## 7. 更改新域名

这个问题的故事是这样的：因为想给自己的网站备案，所以就买了一个可以备案的域名 merrier.wang，而之前是 merrier.online，在买完域名并解析之后，在 Wordpress 后台将域名配置成 merrier.wang 之后就出现问题了，因为 merrier.wang 是没有备案的，所以就无法访问：

<div align='center'><img src='/images/hexo_post_144.png' alt='' width='500'/></div>

但是访问之前的 merrier.online 又会重定向到 merrier.wang（应该是 Wordpress 自带的重定向），所以就相当于连后台也访问不了了，只能修改域名。在这里顺便提醒一下，如果你也给域名申请备案中，先不要在后台修改 Wordpress 的域名，因为备案不成功是访问不了的；接下来总结一下网上几种更改新域名的方法：

### 方法一：修改 wp-config.php

在 wp-config.php 中，添加以下两行内容：

```php
define('WP_HOME','http://yourwebsite');
define('WP_SITEURL','http://yourwebsite');
```

然后登录后台，在 “常规 -> 设置”重新配置新博客地址（HOME）和安装地址（SITEURL），**成功后一定记得删除上面添加的内容。**

### 方法二：修改 functions.php

functions.php 位于当前博客主题目录内，在其中添加以下两行内容：

```php
update_option('siteurl','http://yourwebsite');
update_option('home','http://yourwebsite');
```

然后登录后台，在 “常规 -> 设置”重新配置新博客地址（HOME）和安装地址（SITEURL），**成功后一定记得删除上面添加的内容。**

### 方法三：修改 wp-config.php（自动更新地址）

在 wp-config.php 中，添加下面一行内容

```php
define('RELOCATE',true);
```

然后登录后台地址，WP 将自动更新安装地址（SITEURL），手动修改博客地址（HOME）地址即可，**成功后一定要记得删除上面添加的内容**

### 方法四：修改数据库

通过某些方法（phpmyadmin 等）登陆到数据库，找到 wp_options 表，将表中的 siteurl 和 home 字段修改为当前的新域名

## 8.页面下开启评论框

我在更新了一些页面（比如标签云、读者墙、网址导航）之后，发现这些页面下没有评论框，非常的不爽，就上网查了一下，然后大部分答案都是修改代码，我试了之后发现还是不行，后来在 [wordpress吧](http://tieba.baidu.com/p/2309858682)发现了问题出在了哪里：

首先，在后台的页面设置界面，显示讨论栏目：

<div align='center'><img src='/images/hexo_post_145.png' alt='' width='700'/></div>

然后在文章的下面开启允许评论：

<div align='center'><img src='/images/hexo_post_146.png' alt='' width='700'/></div>

经过这两个步骤之后刷新页面（别忘了更新），就会发现评论框出现了！

## 9. Wordpress 后台安装主题或插件时需要 FTP 帐号怎么办

在我把代码部署到服务器上之后发现在更新插件或者安装插件的时候需要输入 FTP 用户名和密码，去阿里云控制台也没有找到，所以就上网找了一些解决教程，试了一下下面的解决方法，实测有效：

主要原因是 Wordpress 主目录的权限所有者不属于 apache 造成的；

第一步：找到 apache 服务所使用的用户名和用户组，具体做法为打开终端，输入：

```bash
ps -aux
```

找到 `/usr/sbin/apach`（或 `/usr/sbin/httpd`）的用户名，它就是 apache 的所有者，我这里是 apache

第二步：终端输入：

```bash
sudo chown apache:apache -R /var/www/
```

这里的 `/var/www/` 是我的 web 主目录也是 Wordpress 主目录；
好了，这样就 OK 了，再进入 Wordpress 后台安装主题和插件就不再需要 FTP 帐户和密码了！！

## 10. WordPress 数据库及各表结构

转载自 [csdn](http://blog.csdn.net/ppiao1970hank/article/details/6301812)，相信知道这些数据表的结构之后，可以对自己的 Wordpress 网站进行更加个性化的设置，当然如果你的英文还可以的话，推荐 [WordPress官方文档](https://codex.wordpress.org/Database_Description#Table_Overview)，官方已经给出了比较详细的表格

## 11. 建立数据库连接时出错

某一天，我心血来潮想搞个 https，结果刷新网页的时候发现显示“建立数据库连接时出错”，后来在服务器上重启 mysql 就没问题了= =。。

## 12. 升级至 HTTPS 时图片路径仍然为 HTTP

前几天把网站升级至 HTTPS 了，不过随之而来的就是一堆 bug 报错，首先就是文章中的图片路径，仍然是 HTTP 的话浏览器会报 `Mixed Content` 错，但是我通过修改数据库的方式仍然不管用，后来不知不觉把两个插件禁用了，然后就好了，这两个插件就是七牛云的相关插件：**WPJAM BASIC、WPJAM 七牛镜像存储**，不过禁用掉之后就用不了七牛云了，后续有时间我再深入研究一下= =

## 13. WordPress：基于 JWT 的身份验证

如果你想基于 WordPress 去创建前端 App 或者移动端 App，解决用户的身份验证可以使用 JWT 这种方法，它是一种基于 Token 的验证身份的方法。