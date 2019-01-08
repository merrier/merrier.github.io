---
title: JS中数组方法总结
urlname: summary-of-array-method-in-js
tags:
  - JS
  - 数组
id: 296
categories:
  - JS
  - 前端
  - 总结
date: 2017-03-22 22:12:57
---

写在前面
====

因为刷leetcode的时候，发现会经常用到数组，因为JS中没有明确的栈和队列，所以需要用数组进行模拟，在刷算法题的过程中碰到了好多关于数组的计算方法，所以就打算对算法中经常用的数组方法进行总结，可能会对刚开始用JS刷Leetcode的码农有好处，如果你有任何补充，请留言评论或直接给我发邮件。

1.JS自带数组方法
----------

*   concat()=>连接两个或更多的数组，并返回结果。
*   join()=>把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
*   pop()=>删除并返回数组的最后一个元素
*   push()=>向数组的末尾添加一个或更多元素，并返回新的长度。
*   reverse()=>颠倒数组中元素的顺序。
*   shift()=>删除并返回数组的第一个元素
*   slice()=>从某个已有的数组返回选定的元素
*   sort()=>对数组的元素进行排序
*   splice()=>删除元素，并向数组添加新元素。
*   toSource()=>返回该对象的源代码。
*   toString()=>把数组转换为字符串，并返回结果。
*   toLocaleString()=>把数组转换为本地数组，并返回结果。
*   unshift()=>向数组的开头添加一个或更多元素，并返回新的长度。
*   valueOf()=>返回数组对象的原始值

2.排序
----

js数组对象排序有内置方法sort()，但是默认以字符串方式排序:

1、简单数组简单排序
    var arrSimple=new Array(1,8,7,6);
    arrSimple.sort();  //\[1,6,7,8\]
2、简单数组自定义排序
    var arrSimple2=new Array(1,8,7,6);
    arrSimple2.sort(function(a,b){return b-a});  //\[8,7,6,1\]
    //解释：a,b表示数组中的任意两个元素，若return > 0 b前a后；reutrn < 0 a前b后；a=b时存在浏览器兼容
    //简化一下：a-b输出从小到大排序，b-a输出从大到小排序。

3.删除重复的元素只保留一个（两种实现思路）
----------------------

//方法一：遍历要删除的数组arr, 把元素分别放入另一个数组tmp中，在判断该元素在arr中不存在才允许放入tmp中用到两个函数：for ...in 和 indexOf()
var test = \[2,4,4,5,"a","a"\];
function unique1(arr){
    // 遍历arr，把元素分别放入tmp数组(不存在才放)
    var tmp = new Array();
    for(var i in arr){
    //该元素在tmp内部不存在才允许追加
        if(tmp.indexOf(arr\[i\])==-1){
            tmp.push(arr\[i\]);
        }
    }
    return tmp;
}
unique1(test);  //\[2,4,5,"a"\]

//方法二：把目标数组arr的元素值和键的位置调换 自动就把重复的元素给删除掉了，调换后的样子：array('qiang'=>1,'ming'=>1,'tao'=>1)
function unique2(arr){
    var tmp = new Array();
    for(var m in arr){
        tmp\[arr\[m\]\]=1;
    }
    //再把键和值的位置再次调换
    var tmparr = new Array();
    for(var n in tmp){
        tmparr.push(n);
    }
    return tmparr;
}
unique2(test);  //\[2,4,5,"a"\]

//方法三：返回新数组，保证类型不变
function unique3(a){
    var hash=\[\],arr=\[\];
    for (var i = 0; i < a.length; i++) {
        hash\[a\[i\]\]!=null;
        if(!hash\[a\[i\]\]){
            arr.push(a\[i\]);
            hash\[a\[i\]\]=true;
        }
    }
    console.log(arr);
}
unique3(test);//\[2, 4, 5, "a"\]

4.获取数组中的最大值和最小值
---------------

可以用传统的遍历，也可以用math

var arr = \[54,65,43,21,12,34,45,58,97,24\];

//方法一、字符串拼接法
//利用toString和join把数组转换为字符串，再和Math的max和min方法分别进行拼接，最后执行eval方法
var maxN = eval("Math.max(" + arr.toString() + ")");
var minN = eval("Math.min(" + arr.toString() + ")");
//或者
var maxN = eval("Math.max(" + arr.join() + ")");
var minN = eval("Math.min(" + arr.join() + ")");

//方法二、排序法
//先把数组从小到大排序，数组第一个即为最小值，最后一个即为最大值
arr.sort(function(a,b){return a-b;});
var minN = arr\[0\];
var maxN = arr\[arr.length-1\];

//方法三、假设法
//假设数组第一个为最大（或最小值），和后边进行比较，若后边的值比最大值大（或比最小值小），则替换最大值（或最小值）
var maxN = arr\[0\];
var minN = arr\[0\];
for(var i=1;i<arr.length;i++){
    var cur = arr\[i\];
    cur>maxN ? maxN=cur : null;
    cur<minN ? minN=cur : null;
}

//方法四、Math的max和min方法
//使用apply方法使数组可以作为传递的参数
var maxN = Math.max.apply(null,arr);
var minN = Math.min.apply(null,arr);
//多维数组可以这样做：
var a=\[1,2,3,\[5,6\],\[1,4,8\]\];
var ta=a.join(",").split(",");//转化为一维数组
var maxN = Math.max.apply(null,ta);//最大值
var minN = Math.min.apply(null,ta);//最小值

//扩展：增加原型方法，同时为了避免其他库也实现了同名的原型方法，可以在生成函数之前进行重名判断
if (typeof Array.prototype\['max'\] == 'undefined') {
    Array.prototype.max = function() {
        return Math.max.apply({},this);
    }
}
if (typeof Array.prototype\['min'\] == 'undefined') {
    Array.prototype.min = function() {
        return Math.min.apply({},this);
    }
}

5.初始化二维数组
---------

//方法一：直接定义并且初始化
var _TheArray = \[\["0-1","0-2"\],\["1-1","1-2"\],\["2-1","2-2"\]\]

//方法二：未知长度的二维数组
var tArray = new Array();  //先声明一维
    for(var k=0;k<i;k++){    //一维长度为i,i为变量，可以根据实际情况改变
    tArray\[k\]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
    for(var j=0;j<p;j++){   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
        tArray\[k\]\[j\]="";    //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
    }
}

//以上方法都有问题，推荐方法三
var r = \[\];
for(var k=0;k<length;k++){    
   r\[k\]= \[\];  
}

6.数组随机排序
--------

来自[关于JavaScript的数组随机排序](https://blog.oldj.net/2017/01/23/shuffle-an-array-in-javascript/)

//方法一：Fisher–Yates shuffle 算法
function shuffle(arr) {
  var i = arr.length, t, j;
  while (i) {
    j = Math.floor(Math.random() * i--);
    t = arr\[i\];
    arr\[i\] = arr\[j\];
    arr\[j\] = t;
  }
}