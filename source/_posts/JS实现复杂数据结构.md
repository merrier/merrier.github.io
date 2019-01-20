---
title: JS实现复杂数据结构
urlname: complex-data-structure-implemented-by-js
id: 319
categories:
  - JS
tags:
  - JS
  - 数据结构
  - 计算机基础
date: 2017-03-26 12:51:34
img: /images/hexo_thumbnail_38.jpeg
---

## 一、哈希表

### 简介

javascript 里面是没有哈希表的，而在 java、C#、C++ 中会经常用到这一种数据结构，同时在刷 Leetcode 过程中也会经常用到。细细看来，其实 javascript 的 object 的属性与哈希表非常类似。我们只需要在其基础上封装一些 HashTable 的函数，就能够得到一个精简版的哈希表。

### 加入函数

/daizhengli/
\[table id=3 /\]

### 代码实现

```javascript
function HashTable() {
    var size = 0;
    var entry = new Object();
    this.add = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }
    this.getValue = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }
    this.remove = function (key) {
        if (this.containsKey(key) && (delete entry[key])) {
            size--;
        }
    }
    this.containsKey = function (key) {
        return (key in entry);
    }
    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    }
    this.getValues = function () {
        var values = new Array();
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }
    this.getKeys = function () {
        var keys = new Array();
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }
    this.getSize = function () {
        return size;
    }
    this.clear = function () {
        size = 0;
        entry = new Object();
    }
}
```

### 使用示例

```javascript
var manHT = new HashTable();
manHT.add("p1","刘备");
manHT.add("p2","关羽");
$("#div1").text(manHT.getValue("p1"));
```

### 参考文章

* [javascript 实现HashTable(哈希表)](http://www.cnblogs.com/kissdodog/p/4666352.html)

## 二、栈

### 简介

栈是一种遵从后进先出原则(LIFO，全称为 Last In First Out)的有序集合。栈顶永远是最新的元素。

### 加入函数

/daizhengli/
\[table id=4 /\]

### 代码实现

```javascript
function Stack(){
  this.dataStore = [];//保存栈内元素  
  this.top = 0; 
  this.push=function (element) {  
      this.dataStore[this.top++] = element;//添加一个元素并将top+1  
  },  
  this.peek=function () {  
      return this.dataStore[this.top-1];//返回栈顶元素  
  },  
  this.pop=function () {  
      return this.dataStore[--this.top];//返回栈顶元素并将top-1  
  },  
  this.clear=function () {  
      this.top = 0;//将top归0     
  },  
  this.size=function () {  
      return this.top;//返回栈内的元素个数  
  },
  this.isAmpty = function() {
      return this.dataStore.length === 0;//确定栈是否为空
  };
  this.print = function(){
      console.log(this.dataStore.toString());
  }
}
```

### 使用示例

```javascript
var lk=new Stack();  
lk.push("likeke");  
lk.push("zhangsan");  
lk.push("wangwu");  
lk.peek();//"wangwu"  
lk.size();3  
lk.pop();//"wangwu"  
lk.peek();//"zhangsan"  
lk.clear();  
lk.peek();//undefind  
lk.size();0
```

### 参考文章

* [数据结构与算法－栈篇(js实现)](https://cobain-li.iteye.com/blog/2335935)
* [JavaScipt中栈的实现方法](http://www.jb51.net/article/79624.htm)

## 三、队列

### 简介

队列是一种先进先出的结构。队列也是一种表结构，不同的是队列只能在队尾插入元素，在队首删除元素；在 JS 中可以用数组来实现队列结构

### 加入函数

/daizhengli/
\[table id=6 /\]

### 代码实现

```javascript
function Queue(){
    this.dataStore = [],//队列数据
    this.enqueue = function(){ //入队，就是在数组的末尾添加一个元素
        this.dataStore.push(element);
    },
    this.dequeue = function(){//出队，就是删除数组的第一个元素
        return this.dataStore.shift();
    },
    this.front = function(){//取出数组的第一个元素
        return this.dataStore[0];
    },
    this.back = function(){//取出数组的最后一个元素
        return this.dataStore[this.dataStore.length-1];
    },
    this.toString = function(){//将数组中的元素以字符串形式输出
        var retStr = "";
        for (var i=0; i<this.dataStore.length; ++i) {
            retStr += this.dataStore[i] + "&nbsp;"
        }
        return retStr;
    },
    this.empty = function(){//判断数组是否为空
        if(this.dataStore.length == 0){
            return true;
        }else{
            return false;
        }    
    },
    this.count = function(){//返回数组中元素的个数
        return this.dataStore.length;
    },
    this.clear = function(){//清除队列
        this.dataStore = [];
    }
}
```

### 使用示例

```javascript
var q = new Queue();
q.enqueue("Meredith");
q.enqueue("Cynthia");
q.enqueue("Jennifer");
console.log(q.toString());//Meredith Cynthia Jennifer
console.log(q.front());//Meredith
console.log(q.back());//Jennifer
```

### 参考文章

* [javascript中的队列结构](http://www.cnblogs.com/tylerdonet/p/5837730.html)

## 四、单链表

### 简介

单链表是一种链式存取的数据结构。链表中的数据是以结点来表示的，每个结点的构成：元素(数据元素的映象) \+ 指针(指示后继元素存储位置)，元素就是存储数据的存储单元，指针就是连接每个结点的地址数据。

### 加入函数

/daizhengli/
\[table id=7 /\]

### 代码实现

```javascript
function linkNode(\_key, \_value) {// 链表类的节点类
    this.Key = _key;
    this.Value = _value;
    this.next = null;
}
function Link() {// 创建一个链表类
    this.root = new linkNode(null, null); //root永远是个空节点
    this.end = this.root;
}
Link.prototype = {
    count: 0,//key的数量
    value: function (_key) {//根据key的值来获取value值
        var i = this.root;
        while (Boolean(i = i.next)) {
            if (i.Key == _key)
                return i.Value;
        }
    },
    add: function (\_key, \_value) {// 往链表的尾部中加入一个节点
        var i = this.root;
        while (Boolean(i = i.next)) {
            if (i.Key == _key)
                return i.Value = _value;
        }
        var node = new linkNode(\_key, \_value);
        if (this.count == 0)
            this.root.next = node;
        else
            this.end.next = node;
        this.end = node;
        this.count++;
        return _value;
    },
    insert: function (_key, node) {// 从链表类的某节点之后插入新节点node.
        var i = this.root;
        while (Boolean(i = i.next)) {
            if (i.Key == _key) {
                var tmp = i.next;
                i.next = node;
                node.next = tmp;
                break;
            }
        }
    },
    insertBefore: function (_key, node) {// 从链表类的某节点之后插入新节点node.
        var i = this.root;
        while (Boolean(i = i.next)) {
            if (i.next.Key == _key) {
                var tmp = i.next;
                i.next = node;
                node.next = tmp;
                break;
            }
        }
    },
    remove: function (_key) {// 从链表类中移除一个key
        var i = this.root;
        do
        {
            if (i.next.Key == _key) {
                if (i.next.next == null)
                    this.end = i;
                i.next = i.next.next;
                this.count--;
                return;
            }
        } while (Boolean(i = i.next))
    },
    removeAt : function (n) {//删除指定位置的节点
        if (n <= 0) {
            return;
        }
        var preNode = this.getNodeByIndex(n - 1);
        preNode.next = preNode.next.next;
    },
    removeAll: function () {// 清空链表类
        this.root = new linkNode(null, null);
        this.end = this.root;
        this.count = 0;
    },
    exists: function (_key) {// 检查链表类中是否存在一个key
        var i = this.root;
        while (Boolean(i = i.next))
            if (i.Key == _key)
                return true;
        return false;
    },
    getJSON: function () {// 转换成JSON字符串，内部方法，用于递归
        var me = this;
        var getChild = function (node) {
            var str = "";
            str += "{\\"Key\\":\\"" + node.Key + "\\",\\"Value\\":" + me.Obj2str(node.Value);
            if (node.next != null)
                str += ",\\"next\\":" + getChild(node.next);
            else
                str += ",\\"next\\":\\"null\\"";
            str += "}";
            return str;
        };
        var link = "{\\"root\\":{\\"Key\\":\\"null\\",\\"Value\\":\\"null\\",\\"next\\":";
        if (this.count == 0)//如果空表
        {
            return "{\\"root\\":{\\"Key\\":\\"null\\",\\"Value\\":\\"null\\",\\"next\\":\\"null\\"},\\"end\\":{\\"Key\\":\\"null\\",\\"Value\\":\\"null\\",\\"next\\":\\"null\\"},\\"count\\":\\"0\\"}";
        }
        link += getChild(this.root.next) + "}";
        //加上end
        link += ",\\"end\\":{\\"Key\\":\\"" + this.end.Key + "\\",\\"Value\\":" + me.Obj2str(this.end.Value) + ",\\"next\\":\\"null\\"";
        link += "},\\"count\\":\\"" + this.count + "\\"}";
        return link;
    },
    getArrayJSON: function () {// 转所有节点的value换成JSON字符串,数组格式
        var link = "{'link':[";
        var i = this.root;
        while (Boolean(i = i.next)) {
            link += this.Obj2str(i.Value) + ",";
        }
        link = link.substr(0, link.length - 1);
        link += "]}";
        return link;
    },
    getNodeByIndex: function (n) {//取第N个位置的节点(约定头节点为第0个位置)，N大于链表元素个数时，返回最后一个元素
        var p = this.head;
        var i = 0;
        while (p.next != null && i < n) {
            p = p.next;
            i++;
        }
        return p;
    },
    getNodeByValue: function (v) {//查询值为V的节点，如果链表中有多个相同值的节点，返回第一个找到的
        var p = this.head;
        while (p.next != null) {
            p = p.next;
            if (p.data == v) {
                return p;
            }
        }
        return null;
    },
    print: function () {//打印输出所有节点
        var p = this.head;
        while (p.next != null) {
            p = p.next;
            print(p.data + " ");
        }
        println("");
    },
    sort: function (fn) {// 对链表进行排序
        if (fn != null) {
            var i = this.root;
            while (Boolean(i = i.next)) {
                var j = this.root;
                while (Boolean(j = j.next)) {
                    if (j.next != null) {
                        if (fn.call(this, j)) {
                            var Key = j.Key;
                            var Value = j.Value;
                            j.Key = j.next.Key;
                            j.Value = j.next.Value;
                            j.next.Key = Key;
                            j.next.Value = Value;
                        }
                    }
                }
                this.end = i;
            }
        }
    }
};
function print(msg) {//打印内容
    document.write(msg);
}

function println(msg) {//换行打印内容
    print(msg + "<br/>");
}

function hasSameValueNode(singleLink) {//测试单链表L中是否有重复元素
    var i = singleLink.head;
    while (i.next != null) {
        i = i.next;
        var j = i;
        while (j.next != null) {
            j = j.next;
            if (i.data == j.data) {
                return true;
            }
        }
    }
    return false;
}

function reverseSingleLink(singleLink) {//单链表元素反转
    var arr = new Array();
    var p = singleLink.head;
    //先跑一遍，把所有节点放入数组
    while (p.next != null) {
        p = p.next;
        arr.push(p.data);
    }
    var newLink = new SingleLink();
    //再从后向前遍历数组,加入新链表
    for (var i = arr.length - 1; i >= 0; i--) {
        newLink.insert(arr[i]);
    }
    return newLink;
}
```

### 使用示例

```javascript
var linkTest = new SingleLink();
    linkTest.insert('A');
    linkTest.insert('B');
    linkTest.insert('C');
    linkTest.insert('D');
    linkTest.print();//A B C D
 
    var newLink = reverseSingleLink(linkTest);
    newLink.print();//D C B A
```

### 参考文章

* [javascript:算法笔记](http://www.cnblogs.com/yjmyzz/archive/2013/05/21/3091653.html)
* [js单向链表的具体实现实例](http://www.jb51.net/article/38870.htm)