---
title: 前端面试系列（6）——HTTP请求的状态码
urlname: status-code-of-http-request
id: 428
categories:
  - HTTP
tags:
  - HTTP
  - 前端面试
date: 2017-04-04 21:38:16
img: /images/hexo_thumbnail_2.jpg
---

首先说一下 HTTP，超文本传输协议（HTTP）是一种通信协议，它允许将超文本标记语言（HTML）文档从 Web 服务器传送到客户端的浏览器；而状态码在 Response 消息中的第一行（状态行），用来告诉 HTTP 客户端，HTTP 服务器是否产生了预期的 Response

## 类型

HTTP/1.1 中定义了 5 类状态码，状态码由三位数字组成，第一个数字定义了响应的类别

* 1XX  提示信息 - 表示请求已被成功接收，继续处理
* 2XX  成功 - 表示请求已被成功接收，理解，接受
* 3XX  重定向 - 要完成请求必须进行更进一步的处理
* 4XX  客户端错误 - 请求有语法错误或请求无法实现
* 5XX  服务器端错误 - 服务器未能实现合法的请求

## 状态码含义

**粗体为常见状态码，需要多留意**

| 状态码 | 英文解释 | 中文解释 | 备注 |
|:-----:|:-------:|:-------|:-----|
|  100  | Continue | 初始的请求已经接受，客户应当继续发送请求的其余部分 | HTTP 1.1 新 |
|  101  | Switching Protocols | 服务器将遵从客户的请求转换到另外一种协议 | HTTP 1.1 新 |
|  **200**  | **OK** | **一切正常，对GET和POST请求的应答文档跟在后面** |  |
|  201  | Created | 服务器已经创建了文档，Location头给出了它的URL |  |
|  202  | Accepted | 已经接受请求，但处理尚未完成 |  |
|  203  | Non-Authoritative Information | 文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝 | HTTP 1.1 新 |
|  204  | No Content | 没有新文档，浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而 Servlet 可以确定用户文档足够新，这个状态代码是很有用的 |  |
|  205  | Reset Content | 没有新的内容，但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容 | HTTP 1.1 新 |
|  206  | Partial Content | 客户发送了一个带有Range头的GET请求，服务器完成了它 | HTTP 1.1 新 |
|  300  | Multiple Choices | 客户请求的文档可以在多个位置找到，这些位置已经在返回的文档内列出。如果服务器要提出优先选择，则应该在Location应答头指明 |  |
|  **301**  | **Moved Permanently** | **客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL** |    |
|  **302**  | **Found** | **类似于 301，但新的URL应该被视为临时性的替代，而不是永久性的** | **在 HTTP1.0 中对应的状态信息是 “Moved Temporatily”** |
|  303  | See Other  | 类似于301/302，不同之处在于，如果原来的请求是 POST，Location 头指定的重定向目标文档应该通过 GET 提取 | HTTP 1.1 新 |
|  **304**  | **Not Modified** | **客户端有缓冲的文档并发出了一个条件性的请求（一般是提供 If-Modified-Since 头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用** |   |
|  305  | Use Proxy | 客户请求的文档应该通过 Location 头所指明的代理服务器提取 | HTTP 1.1 新 |
|  307  | Temporary Redirect | 和 302 相同。许多浏览器会错误地响应 302 应答进行重定向，即使原来的请求是 POST，即使它实际上只能在 POST 请求的应答是 303 时才能重定向。由于这个原因，HTTP 1.1 新增了 307，以便更加清除地区分几个状态代码：当出现 303 应答时，浏览器可以跟随重定向的 GET 和 POST 请求；如果是 307 应答，则浏览器只能跟随对 GET 请求的重定向 | HTTP 1.1 新 |
|  400  | Bad Request | 请求出现语法错误 |  |
|  401  | Unauthorized | 客户试图未经授权访问受密码保护的页面。应答中会包含一个 WWW-Authenticate 头，浏览器据此显示用户名字/密码对话框，然后在填写合适的 Authorization 头后再次发出请求 |  |
|  **403**  | **Forbidden** | **资源不可用。服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致** |  |
|  **404**  | **Not Found** | **无法找到指定位置的资源。这也是一个常用的应答** |  |
|  405  | Method Not Allowed | 请求方法（GET、POST、HEAD、Delete、PUT、TRACE 等）对指定的资源不适用。 | HTTP 1.1 新 |
|  406  | Not Acceptable | 指定的资源已经找到，但它的 MIME 类型和客户在 Accpet 头中所指定的不兼容 | HTTP 1.1 新 |
|  407  | Proxy Authentication Required | 类似于 401，表示客户必须先经过代理服务器的授权 | HTTP 1.1 新 |
|  408  | Request Timeout | 在服务器许可的等待时间内，客户一直没有发出任何请求。客户可以在以后重复同一请求 | HTTP 1.1 新 |
|  409  | Conflict | 通常和 PUT 请求有关。由于请求和资源的当前状态相冲突，因此请求不能成功 | HTTP 1.1 新 |
|  410  | Gone | 所请求的文档已经不再可用，而且服务器不知道应该重定向到哪一个地址 | HTTP 1.1 新 |
|  411  | Length Required | 服务器不能处理请求，除非客户发送一个 Content-Length 头 | HTTP 1.1 新 |
|  412  | Precondition Failed | 请求头中指定的一些前提条件失败 | HTTP 1.1 新 |
|  413  | Request Entity Too Large | 目标文档的大小超过服务器当前愿意处理的大小。如果服务器认为自己能够稍后再处理该请求，则应该提供一个 Retry-After 头 | HTTP 1.1 新 |
|  414  | Request URI Too Long | URI 太长 | HTTP 1.1 新 |
|  500  | Internal Server Error | 服务器遇到了意料不到的情况，不能完成客户的请求 |  |
|  501 | Not Implemented | 服务器不支持实现请求所需要的功能。例如，客户发出了一个服务器不支持的PUT请求 |  |
|  **502**  | **Bad Gateway** | **服务器作为网关或者代理时，为了完成请求访问下一个服务器，但该服务器返回了非法的应答** |  |
|  **503**  | **Service Unavailable** | **服务器由于维护或者负载过重未能应答。例如，Servlet 可能在数据库连接池已满的情况下返回503。服务器返回 503 时可以提供一个 Retry-After 头** |  |
|  **504**  | **Gateway Timeout** | **由作为代理或网关的服务器使用，表示不能及时地从远程服务器获得应答** | **HTTP 1.1 新** |
|  505  | HTTP Version Not Supported | 服务器不支持请求中所指明的 HTTP 版本 | HTTP 1.1 新 |

## 扩展阅读

* [一篇学习HTTP状态码的神文]（http://www.codeceo.com/article/http-code.html）