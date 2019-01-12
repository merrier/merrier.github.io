---
title: 影响Cache的几个HTTP头信息
urlname: several-HTTP-headers-affecting-cache
id: 1167
categories:
  - HTTP
tags:
  - cache
  - HTTP
date: 2017-08-20 21:12:54
img: /images/hexo_thumbnail_2.jpg
---

HTTP 协议是前端工程师接触最多的一种协议，而它的内容又多的要命，所以很多前端童鞋在遇到 HTTP 的时候都会产生“畏惧”的心理，其实对于这种内容非常多又难以理解的知识点，我的建议是用到的时候再详查，而我接下来要介绍的这几个头信息则是非常重要的知识点，是每一个称职的前端工程师都需要掌握的~

## HTTP 的 cache 机制

HTTP 的 cache 机制总共有4个组成部分：**Cache-Control、Last-Modified（If-Modified-Since）、Etag（If-None-Match）、Expires**

* **服务器响应头**：Last-Modified、Etag
* **浏览器请求头**：If-Modified-Since、If-None-Match

**流程**：服务器发出 Etag，Last-Modified 头后，下次浏览器再进行同样的请求，则会发出 If-None-Match，If-Modified-Since头，而后服务器根据这些信息来判断是否需要发送数据，如果没有更新，服务器就简单的发送一个 304 状态告诉浏览器用缓存就OK了，不用下载数据了，从而节约了带宽。

### Last-Modified / If-Modified-Since

Last-Modified 是响应头，If-Modified-Since 是请求头。Last-Modified 把 Web 组件的最后修改时间告诉客户端，客户端在下次请求此Web组件的时候，会把上次服务端响应的最后修改时间作为 If-Modified-Since 的值发送给服务器，服务器可以通过这个值来判断是否需要重新发送，如果不需要，就简单的发送一个 304 状态码，客户端将从缓存里直接读取所需的Web组件。如果有更新，返回 HTTP 200 和更新的页面内容，并且携带新的 ETag 和 LastModified。

> 使用这个机制，能够避免重复发送文件给浏览器，不过仍然会产生一个 HTTP 请求。

### ETag / If-None-Match

ETag 是响应头，If-None-Match 是请求头。Last-Modified / If-Modified-Since 的主要缺点就是它只能精确到秒的级别，一旦在一秒的时间里出现了多次修改，那么 Last-Modified / If-Modified-Since 是无法体现的。相比较，ETag / If-None-Match 没有使用时间作为判断标准，而是使用一个特征串。Etag 把 Web 组件的特征串告诉客户端，客户端在下次请求此 Web 组件的时候，会把上次服务端响应的特征串作为 If-None-Match 的值发送给服务端，服务端可以通过这个值来判断是否需要从重新发送，如果不需要，就简单的发送一个 304 状态码，客户端将从缓存里直接读取所需的 Web 组件。 因此，HTTP/1.1 利用 Entity Tag 头提供了更加严格的验证。

### 当服务器发出响应的时候，可以通过两种方式来告诉客户端缓存请求：

**第一种是Expires**，比如：`Expires: Sun, 16 Oct 2016 05:43:02 GMT`，在此日期之前，客户端都会认为缓存是有效的。 不过 Expires 有缺点，比如说，服务端和客户端的时间设置可能不同，这就会使缓存的失效可能并不能精确的按服务器的预期进行。
**第二种是Cache-Control**，比如：`Cache-Control: max-age=3600`，这里声明的是一个相对的秒数，表示从现在起，3600 秒内缓存都是有效的，这样就避免了服务端和客户端时间不一致的问题。 但是 Cache-Control 是 HTTP1.1 才有的，不适用与 HTTP1.0，而 Expires 既适用于 HTTP1.0，也适用于 HTTP1.1，所以说在大多数情况下同时发送这两个头会是一个更好的选择，当客户端两种头都能解析的时候，会优先使用 Cache-Control。

## 基础知识

### 什么是 Last-Modified?

在浏览器第一次请求某一个 URL 时，服务器端的返回状态会是 200，内容是你请求的资源，同时有一个 Last-Modified 的属性标记 (**Http Reponse Header**），此文件在服务期端最后被修改的时间，格式类似这样：`Last-Modified: Fri, 12 May 2006 18:53:33 GMT`，客户端第二次请求此 URL 时，根据 HTTP 协议的规定，浏览器会向服务器传送 If-Modified-Since 报头（**Http Request Header**），询问该时间之后文件是否有被修改过：`If-Modified-Since: Fri, 12 May 2006 18:53:33 GMT`，如果服务器端的资源没有变化，则自动返回 **HTTP 304 （Not Changed.）** 状态码，内容为空，这样就节省了传输数据量。当服务器端代码发生改变或者重启服务器时，则重新发出资源，返回和第一次请求时类似。从而保证不向客户端重复发出资源，也保证当服务器有变化时，客户端能够得到最新的资源。

> 如果 If-Modified-Since 的时间比服务器当前时间（当前的请求时间 request_time）还晚，Apache 会认为是个非法请求

#### Last-Modified 和 Expires 的区别

让我们回过头来比较一下 Expires 和 Last-Modified 这两个东西，似乎 Last-Modified 比不上 Expires，因为虽然它能够节省一点带宽，但是还是逃不掉发一个 HTTP 请求出去，而 Expires 却使得浏览器干脆连 HTTP 请求都不用发，岂不痛快！那还要 Last- Modified 这个东西干什么？理想状况的确是这样，不过当用户在 IE 或者 Firefox 里面按 F5 或者点击 Refresh 按钮的时候（不是在 URL 栏里重新输入一遍 URL 然后回车），就算对于有 Expires 的 URI，一样也会发一个 HTTP 请求出去，所以，Last-Modified 还是要用的，而且要和 Expires 一起用。

### 什么是 Etag？

HTTP 协议规格说明定义 ETag 为“**被请求变量的实体值**” 。另一种说法是，ETag 是一个可以与 Web 资源关联的记号（token）。典型的 Web 资源可以是一个 Web 页，但也可能是 JSON 或 XML 文档。服务器单独负责判断记号是什么及其含义，并在 HTTP 响应头中将其传送到客户端，以下是服务器端返回的格式：

`ETag: "50b1c1d4f775c61:df3"` 

客户端的查询更新格式是这样的：

`If-None-Match: "50b1c1d4f775c61:df3"` 

如果 ETag 没改变，则返回状态 304，这也和 Last-Modified 一样。本人测试 **Etag 主要在断点下载时比较有用。**

#### Last-Modified和Etags如何帮助提高性能?

聪明的开发者会把 Last-Modified 和 ETags 请求的 HTTP 报头一起使用，这样可利用客户端（例如浏览器）的缓存。因为服务器首先产生 Last-Modified / Etag 标记，服务器可在稍后使用它来判断页面是否已经被修改。本质上，客户端通过将该记号传回服务器要求服务器验证其（客户端）缓存。过程如下:

1. 客户端请求一个页面（A）。
2. 服务器返回页面 A，并再给 A 加上一个 Last-Modified / ETag。
3. 客户端展现该页面，并将页面连同 Last-Modified / ETag 一起缓存。
4. 客户再次请求页面 A，并将上次请求时服务器返回的 Last-Modified / ETag 一起传递给服务器。
5. 服务器检查该 Last-Modified 或 ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应 304 和一个空的响应体。

**注意：**

1. Last-Modified 和 Etag 头都是由 Web Server 发出的 Http Reponse Header，Web Server 应该同时支持这两种头。
2. Web Server 发送完 Last-Modified / Etag 头给客户端后，客户端会缓存这些头；
3. 客户端再次发起相同页面的请求时，将分别发送与 Last-Modified / Etag 对应的 Http Request Header:If-Modified-Since 和 If-None-Match。我们可以看到这两个 Header 的值和 Web Server 发出的 Last-Modified，Etag 值完全一样；
4. 通过上述值到服务器端检查，判断文件是否继续缓存；

#### Etag的弊端

不过 ETag / If-None-Match 这点功能实在是个鸡肋，首先，Server 端的资源不大可能 Roll Back，更重要的是，有可能造成 Client Performance 下降。对于只有一个 Server 的网站，没什么问题，但是现在稍微上点规模的网站都需要 Scale Out，也就是说需要前端一个 Load Balancer，后面接多台 Server 来处理请求，俗称 Cluster，既然是 Cluster，那么每个请求到底返回什么结果应该和分配到哪个 Server 无关，不过这个 ETag 可能就坏事了。
假如用户的第一次请求分配给 Server A，返回 `ETag: "abcdefg1234:0001"`，但是第二次请求分配给了Server B，Server B 上这个资源和 Server A 上的一模一样，但是计算出这个资源的 ETag 是"abcdefg1234:0002"，这下麻烦了，虽然内容一样，但是 ETag 不匹配，还是浪费了带宽把资源发送了一遍，冤枉啊！而事实上，不同 Server 上的 ETag 很有可能不同，对于 Apache，ETag 的计算考虑了 inode；对于 IIS，ETag 考虑了 metabase 的修改版本，要保证不同 server 上的这些信息一致，有点小难。不过不是有 Last-Modified / If- Not-Modified 吗？Server 端看到 If-Modified-Since，对照一下时间对得上，不管 If-None-Match，可以直接返回 304(Not Modified) 呀，很不幸， [RFC2616对这种情况做了规定](HTTP://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html#sec13.3.4)，如果既有 If-None-Match 又有 If-Modified-Since，除非两者不冲突，不然不会返回 304。

#### Apache 中的 Etag 设置

Apache 默认开启 Etag，可以使用 FileEtag 来设置

## 扩展阅读

* [浅谈Web缓存](HTTP://www.alloyteam.com/2016/03/discussion-on-web-caching/)
* [浅谈浏览器HTTP的缓存机制](HTTP://www.cnblogs.com/vajoy/p/5341664.html)
* [浏览器缓存机制剖析](HTTP://louiszhai.github.io/2017/04/07/HTTP-cache/)