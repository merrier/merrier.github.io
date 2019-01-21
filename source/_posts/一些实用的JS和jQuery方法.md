---
title: 一些实用的JS和jQuery方法
urlname: some-practical-js-and-jquery-methods
id: 114
categories:
  - JS
tags:
  - jQuery
  - JS
date: 2017-03-15 15:56:27
img: /images/hexo_thumbnail_74.jpeg
---

这里总结了一些常用的 JS/jQuery 方法，都是一些在项目中经常遇到的功能需求，如果你有更多的建议，欢迎留言

> 更新于 2018-02-11：在我的github（[common-js](https://github.com/merrier/common-js)）上对一些常用的方法进行了总结，都是一些短小精悍但是颇为实用的封装函数，欢迎 star 或 fork:)

## 1、简单的图片预览

这个方法就是普通的上传图片并预览功能，不包含进度条以及大小和格式的判断

```javascript
//------------------获取图片url地址---------------
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL!=undefined) { // basic
    url = window.createObjectURL(file) ;
  } else if (window.URL!=undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file) ;
  } else if (window.webkitURL!=undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file) ;
  }
  return url ;
};


//---------------上传图片按钮点击------------
$(".btn_upload_file").change(function(){
  var picurl = getObjectURL(this.files[0]);
  if(picurl){
    $(".div_show_pic").show().attr("src",picurl);
  }
});
```

## 2、实现 sleep 函数

很多语言都有 sleep 函数，显然 js 没有，所以需要其他的方法“模拟”实现 sleep 函数

### 方法一：通过比较当前时间

```javascript
function sleep(numberMillis) { 
  var now = new Date(); 
  var exitTime = now.getTime() + numberMillis; 
  while (true) { 
    now = new Date(); 
    if (now.getTime() > exitTime) 
      return; 
  } 
}
```

### 方法二：jQuery 中的 $.delay() 方法

下面这个例子：在 slideUp() 和 .fadeIn() 之间延时 800 毫秒

```javascript
$('#foo').slideUp(300).delay(800).fadeIn(400);
```

### 方法三：setTimeout

假设有三个步骤，步骤之间需要暂停一段时间；可以采用如下的方法：

```javascript
function firstStep() {
  //do something
  setTimeout("secondStep()", 1000);
}
function secondStep() {
  //do something
  setTimeout("thirdStep()", 1000);
}
function thirdStep() {
  //do something
}
```

### 方法四：ES6 的 promise

```javascript
async function test() {
  console.log('Hello')
  await sleep(1000)
  console.log('world!')
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

test();
```

## 3、复制内容后面附加额外内容

复制网页上面内容时，自动在剪切板内容后面加上网站信息，这样也利于 SEO 优化：

```javascript
document.body.oncopy = function () {  
  setTimeout(function (){   
    var text = clipboardData.getData("text");  
    if (text) {
      text = text + "\\r\\n本篇文章来源于 www.地址.COM 原文链接："+location.href;   
      clipboardData.setData("text", text); 
    }
  }, 100)
}
```

## 4、很简单的省略字数

```javascript
$(".omit_word_class").each(function(){
  var ntext = $(this).text();
  var nlen = $(this).text().length;
  if(nlen> 7){
    $(this).text(ntext.substring(0,7) + "...");
  }
});
```

## 5、JS 的动画帧

关于 requestAnimationFrame，我对它的理解也很浅层，推荐这篇[张鑫旭对于requestAnimationFrame的讲解](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)

```javascript
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
```

## 6、JS 判断字符串长度

方法一，给 String 的 prototype 添加方法

```javascript
String.prototype.gblen = function() {    
  var len = 0;    
  for (var i=0; i<this.length; i++) {    
    if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {    
      len += 2;    
    } else {    
      len ++;    
    }    
  }    
  return len;    
}
```

### 方法二，利用 ASCII 码

```javascript
function strlen(str){  
  var len = 0;  
  for (var i=0; i<str.length; i++) {   
    var c = str.charCodeAt(i);   
    //单字节加1   
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
      len++;   
    }else {   
      len+=2;   
    }   
  }   
  return len;  
}
```

### 方法三：把双字节的替换成两个单字节的然后再获得长度

```javascript
getBLen = function(str) {  
  if (str == null) return 0;  
  if (typeof str != "string"){  
    str += "";  
  }  
  return str.replace(/[^\\x00-\\xff]/g,"01").length;  
}
```

## 7、jQuery 控制超出规定长度显示省略号

给需要显示省略号的标签设置 class 为 displayPart，然后设置自定义属性 displayLength，该属性为可显示长度（不包含…），该方法会区分中英文，中文字符相当于两个字节

```javascript
$.fn.extend({ 
  displayPart:function () { 
    var displayLength = 100; 
    displayLength = this.attr("displayLength") || displayLength; 
    var text = this.text(); 
    if (!text) return ""; 

    var result = ""; 
    var count = 0; 
    for (var i = 0; i < displayLength; i++) { 
      var _char = text.charAt(i); 
      if (count >= displayLength) break; 
      if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文 
      result += _char; 
      count++; 
    } 
    if (result.length < text.length) { 
      result += "..."; 
    } 
    this.text(result); 
  } 
}); 

$(".displayPart").each(function(){
  $(this).displayPart();
});
```

## 8、去除字符串首尾的空白字符

如果引入了 jQuery，可以直接利用 $.trim() 方法，如果没有就需要用到下面的正则表达式

```javascript
function trim(ostr){
    return ostr.replace(/^\\s+|\\s+$/g,"");
}
```

## 9、判断数组中是否包含某个元素

```javascript
var arr = [ "xml", "html", "css", "js" ];  
$.inArray("js", arr);  // 返回 3, 如果不包含在数组中, 则返回 -1;
```

## 10、获取日期并格式化

```javascript
(function getDateStr(AddDayCount){
  var dd = new Date();
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth()+1;//获取当前月份的日期
  var d = dd.getDate();
  return y+"-"+m+"-"+d;
})(-2);
```

## 11、根据屏幕宽度改变 html 的 font-size 大小

结合 REM 可以很轻松的实现移动端的响应式大小效果

```javascript
(function(win) {
  function setUnitA() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 16 + "px";
  }
  var h = null;
  window.addEventListener("resize", function() {
    clearTimeout(h);
    h = setTimeout(setUnitA, 300);
  }, false);
  setUnitA();
})(window);
```

## 12、JS/jQuery 获取 url 参数

```javascript
//---------------javaseript获取url中的参数----------------
//\* 用法：
//\* var args = getArgs( ); // 从 URL 解析出参数
//\* var q = args.q || ""; // 如果定义了某参数，则使用其值，否则给它一个默认值
//\* var n = args.n ? parseInt(args.n) : 10;
//*/
var getArgs = function (){
    var args = new Object( ); //声明一个空对象
    var query = window.location.search.substring(1); // 取查询字符串，如从 http://www.snowpeak.org/testjs.htm?a1=v1&a2=&a3=v3#anchor 中截出 a1=v1&a2=&a3=v3。
    var pairs = query.split("&"); // 以 & 符分开成数组
    for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); // 查找 "name=value" 对
        if (pos == -1) continue; // 若不成对，则跳出循环继续下一对
        var argname = pairs[i].substring(0,pos); // 取参数名
        var value = pairs[i].substring(pos+1); // 取参数值
        value = decodeURIComponent(value); // 若需要，则解码
        args[argname] = value; // 存成对象的一个属性
    }
    return args; // 返回此对象
};
```

## 13、返回一个最小值与最大值中间的随机值

```javascript
function random(min,max){
  return min + (max - min) * Math.random();
}
```

## 14、限制上传文件格式和大小

```javascript
function fileChange(target) {
    var name=target.value;
    var fileType = name.substring(name.lastIndexOf(".")+1).toLowerCase();     // 获取文件格式
    var fileArr=name.split("\\\");
    var fileName=fileArr[fileArr.length-1];     // 获取文件名称
    if(fileType !="jpg" && fileType !="png"){
        alert("请选择jpg或者png格式图片文件上传！");
        target.value="";
        return false;
    }else{
        var fileSize = target.files[0].size/1024;           // 获取文件大小，单位为kb
        console.log(fileSize);
        if (fileSize > 40) {
            alert("图片文件大小不得超过40kb!");
            target.value="";
            return false;
        }else{
            var url=getObjectURL(target.files[0]);           // 获取图片url
            console.log(url);
            $(".modal_brand .upload_img").attr("src",url);      // 显示上传图片
            console.log($(".modal_brand .upload_img").attr("src"));
            $(".modal_brand .img_name p").text(fileName);          // 显示上传图片文件名
        }
    }
}
```

## 15、一个 HTML 转义函数

```javascript
function escapeHTML(text) {
    var replacements= {"<": "<", ">": ">","&": "&", "\\"": """};
    return text.replace(/[<>&"]/g, function(character) {
        return replacements[character];
    });
}
```