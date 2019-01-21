---
title: 十大排序算法的Javascript实现
urlname: js-implementation-of-ten-sorting-algorithms
id: 244
categories:
  - 算法
tags:
  - JS
  - 排序
  - 算法
date: 2017-03-18 23:13:55
img: /images/hexo_thumbnail_71.jpeg
---

我是在微信公众号-前端大全上面看到这篇文章的，大概过去半年时间了，之前看过好多关于排序算法的 JS 版，但是这篇文章是内容最全的，而且还有动图演示，对于算法“白痴”来说理解起来会更容易，所以强烈推荐这篇文章；前端开发者也可以关注一下这个微信公众号，基本上每天都会更新，而且有很多原创的文章，其中不乏面试经验以及关于 JS 和 CSS 的技巧规范以及前端未来发展趋势等等，是一个很好的前端学习工具。 原作者是伯乐在线专栏作者，而十大排序算法的 JS 代码在作者的 github 上也有一个库，想看源码的可以[戳这里](https://github.com/damonare/Sorts)，配合文章会加深对这些排序算法的理解

## 排序算法说明

### 对于评述算法优劣术语的说明

**稳定**：如果 a 原本在 b 前面，而 a=b，排序之后 a 仍然在 b 的前面；
**不稳定**：如果 a 原本在 b 的前面，而 a=b，排序之后 a 可能会出现在 b 的后面；
**内排序**：所有排序操作都在内存中完成；
**外排序**：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；
**时间复杂度**: 一个算法执行所耗费的时间。
**空间复杂度**: 运行完一个程序所需内存的大小。

### 排序算法图片总结

<div align='center'><img src='/images/hexo_post_220.png' alt='' width='550'/></div>

图片名词解释：

* n：数据规模
* k：“桶”的个数
* In-place：占用常熟内存，不占用额外内存
* Out-place：占用额外内存

### 排序分类

<div align='center'><img src='/images/hexo_post_139.png' alt='' width='450'/></div>

## 1. 冒泡排序（bubble Sort）

### 算法简介

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

### 算法具体描述

1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
3. 针对所有的元素重复以上的步骤，除了最后一个；
4. 重复步骤 1~3，直到排序完成。

### 动画演示

<div align='center'><img src='/images/hexo_post_90.gif' alt='' width='500'/></div>

### Javascript 源代码

#### 方法一
```javascript
/* 方法说明：冒泡排序
   参数：arr-排序数组
   说明：该方法为原始算法*/
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
var arr1=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort(arr1));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```
#### 方法二

```javascript
/* 方法说明：冒泡排序
 参数：arr-排序数组
 说明：该方法为改进算法（设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。由于pos位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到pos位置即可。）*/
function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时');
    var i = arr.length-1;  //初始时,最后位置保持不变
    while ( i> 0) {
        var pos= 0; //每趟开始时,无记录交换
        for (var j= 0; j< i; j++)
            if (arr[j]> arr[j+1]) {
                pos= j; //记录交换的位置
                var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        i= pos; //为下一趟排序作准备
    }
    console.timeEnd('改进后冒泡排序耗时');
    return arr;
}
var arr2 = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort2(arr2));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

#### 方法三

```javascript
/* 方法说明：冒泡排序
 参数：arr-排序数组
 说明：该方法为改进算法（传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,我们考虑利用在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者) , 从而使排序趟数几乎减少了一半。）*/
function bubbleSort3(arr) {
    var low = 0;
    var high= arr.length-1; //设置变量的初始值
    var tmp,j;
    console.time('2.改进后冒泡排序耗时');
    while (low < high) {
        for (j= low; j< high; ++j) //正向冒泡,找到最大者
            if (arr[j]> arr[j+1]) {
                tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        --high;                 //修改high值, 前移一位
        for (j=high; j>low; --j) //反向冒泡,找到最小者
            if (arr[j]<arr[j-1]) {
                tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
            }
        ++low;                  //修改low值,后移一位
    }
    console.timeEnd('2.改进后冒泡排序耗时');
    return arr3;
}
var arr3=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort3(arr3));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

### 算法复杂度分析

* 最佳情况：T(n)=O(n) => 当输入的数据已经是正序时
* 最差情况：T(n)=O(n2) => 当输入的数据是反序时
* 平均情况：T(n)=O(n2)

## 2. 选择排序

### 算法简介

选择排序（Selection-sort）是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

### 算法具体描述

1. 初始状态：无序区为 R[1..n]，有序区为空；
2. 第 i 趟排序 (i=1,2,3…n-1) 开始时，当前有序区和无序区分别为 R[1..i-1] 和 R(i..n）。该趟排序从当前无序区中选出关键字最小的记录 R[k]，将它与无序区的第 1 个记录 R 交换，使 R[1..i] 和 R[i+1..n) 分别变为记录个数增加 1 个的新有序区和记录个数减少 1 个的新无序区；
3. n-1 趟结束，数组有序化了。

### 动画演示

<div align='center'><img src='/images/hexo_post_219.gif' alt='' width='500'/></div>

### Javascript 源代码

```javascript
/* 方法说明：选择排序
   参数：arr-排序数组
   说明：无*/
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    console.time('选择排序耗时');
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.timeEnd('选择排序耗时');
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(selectionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

### 算法复杂度排序

* 最佳情况：T(n)=O(n2)
* 最差情况：T(n)=O(n2)
* 平均情况：T(n)=O(n2)

## 3. 插入排序

### 算法简介

插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用 in-place 排序（即只需用到 O(1) 的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

### 算法具体描述

1. 从第一个元素开始，该元素可以认为已经被排序；
2. 取出下一个元素，在已经排序的元素序列中从后向前扫描；
3. 如果该元素（已排序）大于新元素，将该元素移到下一位置；
4. 重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置；
5. 将新元素插入到该位置后；
6. 重复步骤 2~5。

### 动画演示

<div align='center'><img src='/images/hexo_post_110.gif' alt='' width='500'/></div>

### Javascript 源代码

#### 方法一
```javascript
/* 方法说明：插入排序
   参数：array-排序数组
   说明：无*/
function insertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('插入排序耗时：');
        for (var i = 1; i < array.length; i++) {
            var key = array[i];
            var j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
        console.timeEnd('插入排序耗时：');
        return array;
    } else {
        return 'array is not an Array!';
    }
}
var arr1=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(insertionSort(arr1));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

#### 方法二

```javascript
/* 方法说明：插入排序
 参数：array-排序数组
 说明：改进后的算法（查找插入位置时使用二分查找的方式）*/
function binaryInsertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('二分插入排序耗时：');
        for (var i = 1; i < array.length; i++) {
            var key = array[i], left = 0, right = i - 1;
            while (left <= right) {
                var middle = parseInt((left + right) / 2);
                if (key < array[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }
            for (var j = i - 1; j >= left; j--) {
                array[j + 1] = array[j];
            }
            array[left] = key;
        }
        console.timeEnd('二分插入排序耗时：');
        return array;
    } else {
        return 'array is not an Array!';
    }
}
var arr2=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(binaryInsertionSort(arr2));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

### 算法复杂度分析

* 最佳情况：T(n)=O(n) => 输入数组按升序排列
* 最差情况：T(n)=O(n2) => 输入数组按降序排列
* 平均情况：T(n)=O(n2)

## 4. 希尔排序

### 算法简介

希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。动态定义间隔序列的算法是《算法（第4版》的合著者 Robert Sedgewick 提出的。

### 算法具体描述

1. 选择一个增量序列 t1，t2，…，tk，其中 ti>tj，tk=1；
2. 按增量序列个数 k，对序列进行 k 趟排序；
3. 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

### 图示

<div align='center'><img src='/images/hexo_post_225.jpeg' alt='' width='550'/></div>

### Javascript 源代码

```javascript
/* 方法说明：希尔排序
   参数：arr-排序数组
   说明：无*/
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    console.time('希尔排序耗时:');
    while(gap < len/5) {          //动态定义间隔序列
        gap =gap*5+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(shellSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

### 算法复杂度分析

* 最佳情况：T(n) = O(nlog2n)
* 最差情况：T(n) = O(nlog2n)
* 平均情况：T(n) = O(nlogn)

## 5. 归并排序

### 算法简介

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为 2-路归并。

### 算法具体描述

1. 把长度为 n 的输入序列分成两个长度为 n/2 的子序列；
2. 对这两个子序列分别采用归并排序；
3. 将两个排序好的子序列合并成一个最终的排序序列。

### 动画演示

<div align='center'><img src='/images/hexo_post_119.gif' alt='' width='500'/></div>

### Javascript 源代码

```javascript
/* 方法说明：归并排序
   参数：arr-排序数组
   说明：无*/
function mergeSort(arr) {  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right)
{
    var result = [];
    console.time('归并排序耗时');
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());
    console.timeEnd('归并排序耗时');
    return result;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(mergeSort(arr));
```

### 算法复杂度分析

* 最佳情况：T(n)=O(n)
* 最差情况：T(n)=O(nlogn)
* 平均情况：T(n)=O(nlogn)

## 6. 快速排序

### 算法简介

快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

### 算法具体描述

1. 从数列中挑出一个元素，称为 “基准”（pivot）；
2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

### 动画演示

<div align='center'><img src='/images/hexo_post_217.gif' alt='' width='500'/></div>

### Javascript 源代码

#### 方法一

```javascript
/* 方法说明：快速排序
 参数：arr-排序数组
 说明：方法一*/
function quickSort(array, left, right) {
    console.time('1.快速排序耗时');
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array' && typeof left === 'number' && typeof right === 'number') {
        if (left < right) {
            var x = array[right],
                i = left - 1,
                temp;
            for (var j = left; j <= right; j++) {
                if (array[j] <= x) {
                    i++;
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            quickSort(array, left, i - 1);
            quickSort(array, i - 1, right);
        }
        console.timeEnd('1.快速排序耗时');
        return array;
    } else {
        return 'array is not an Array or left or right is not a number!';
    }
}
```

#### 方法二

```javascript
/* 方法说明：快速排序
 参数：arr-排序数组
 说明：方法二*/
function quickSort2(arr) {
    console.time('2.快速排序耗时');
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    console.timeEnd('2.快速排序耗时');
    return quickSort2(left).concat([pivot], quickSort2(right));
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(arr, 0, arr.length - 1));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log(quickSort2(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

### 算法复杂度分析

* 最佳情况：T(n)=O(nlogn)
* 最差情况：T(n)=O(n2)
* 平均情况：T(n)=O(nlogn)

## 7. 堆排序

### 算法简介

堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。

### 算法具体描述

1. 将初始待排序关键字序列 (R1,R2….Rn) 构建成大顶堆，此堆为初始的无序区；
2. 将堆顶元素 R[1] 与最后一个元素 R[n] 交换，此时得到新的无序区 (R1,R2,……Rn-1) 和新的有序区 (Rn),且满足 R[1,2…n-1]<=R[n]；
3. 由于交换后新的堆顶 R[1] 可能违反堆的性质，因此需要对当前无序区 R1,R2,……Rn-1) 调整为新堆，然后再次将 R[1] 与无序区最后一个元素交换，得到新的无序区 (R1,R2….Rn-2) 和新的有序区 (Rn-1,Rn)。不断重复此过程直到有序区的元素个数为 n-1，则整个排序过程完成。

### 动画演示

<div align='center'><img src='/images/hexo_post_106.gif' alt='' width='500'/></div>

### Javascript 源代码

```javascript
/* 方法说明：堆排序
 参数：array-排序数组
 说明：无*/
function heapSort(array) {
    console.time('堆排序耗时');
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        //建堆
        var heapSize = array.length, temp;
        for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
            heaping(array, i, heapSize);
        }
        //堆排序
        for (var j = heapSize - 1; j >= 1; j--) {
            temp = array[0];
            array[0] = array[j];
            array[j] = temp;
            heaping(array, 0, --heapSize);
        }
        console.timeEnd('堆排序耗时');
        return array;
    } else {
        return 'array is not an Array!';
    }
}

/* 方法说明：维护堆的性质
 参数：array-排序数组
 x-数组下标
 len-堆大小
 说明：无*/
function heaping(arr, x, len) {
    if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
        var l = 2 * x + 1,
            r = 2 * x + 2,
            largest = x,
            temp;
        if (l < len && arr[l] > arr[largest]) {
            largest = l;
        }
        if (r < len && arr[r] > arr[largest]) {
            largest = r;
        }
        if (largest != x) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;
            heaping(arr, largest, len);
        }
    } else {
        return 'arr is not an Array or x is not a number!';
    }
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(heapSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

### 算法复杂度分析

* 最佳情况：T(n)=O(nlogn)
* 最差情况：T(n)=O(nlogn)
* 平均情况：T(n)=O(nlogn)

## 8. 计数排序

### 算法简介

计数排序(Counting sort)是一种稳定的排序算法。计数排序使用一个额外的数组 C，其中第 i 个元素是待排序数组 A 中值等于 i 的元素的个数。然后根据数组 C 来将 A 中的元素排到正确的位置。它只能对整数进行排序。

### 算法具体描述

1. 找出待排序的数组中最大和最小的元素；
2. 统计数组中每个值为 i 的元素出现的次数，存入数组 C 的第 i 项；
3. 对所有的计数累加（从 C 中的第一个元素开始，每一项和前一项相加）；
4. 反向填充目标数组：将每个元素 i 放在新数组的第 C(i) 项，每放一个元素就将 C(i) 减去 1。

### 动画演示

<div align='center'><img src='/images/hexo_post_95.gif' alt='' width='500'/></div>

### Javascript 源代码

```javascript
/* 方法说明：计数排序
   参数：array-排序数组
   说明：无*/
function countingSort(array){
    var len = array.length,
        B = [],
        C = [],
        min = array[0],
        max = array[0];
    console.time('计数排序耗时');
    for(var i =0;i<len;i++){
        min= min<=array[i] ? min:array[i];
        max = max >=array[i] ? max : array[i];
        C[array[i]] = C[array[i]] ? C[array[i]] +1:1;
    }
    for(var j = min; j< max;j++){
        C[j+1] = (C[j+1] || 0) + (C[j] || 0);
    }
    for(var k = len -1 ;k >=0; k--){
        B[C[array[k]] - 1] = array[k];
        C[array[k]] --;
    }
    console.timeEnd('计数排序耗时');
    return B;
}
var arr=[2,2,3,8,7,1,2,2,2,7,3,9,8,2,1,4,2,4,6,9,2];
console.log(countingSort(arr));//[1,1,2,2,2,2,2,2,2,2,3,3,4,4,6,7,7,8,8,9,9]
```

### 算法复杂度分析

当输入的元素是 n 个 0 到 k 之间的整数时，它的运行时间是 O(n + k)。计数排序不是比较排序，排序的速度快于任何比较排序算法。由于用来计数的数组 C 的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上 1），这使得计数排序对于数据范围很大的数组，需要大量时间和内存。

* 最佳情况：T(n)=O(n+k)
* 最差情况：T(n)=O(n+k)
* 平均情况：T(n)=O(n+k)

## 9. 桶排序

### 算法简介

桶排序（Bucket sort）的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序）。

### 算法具体描述

1. 设置一个定量的数组当作空桶；
2. 遍历输入数据，并且把数据一个一个放到对应的桶里去；
3. 对每个不是空的桶进行排序；
4. 从不是空的桶里把排好序的数据拼接起来。

### 图示

<div align='center'><img src='/images/hexo_post_318.jpeg' alt='' width='500'/></div>

### Javascript 源代码

```javascript
/* 方法说明：桶排序
 参数：arr-排序数组
 num-桶的数量
 说明：无*/
function bucketSort(array, num) {
    if (array.length <= 1) {
        return array;
    }
    var len = array.length,
        buckets = [],
        result = [],
        min = array[0],
        max = array[0],
        regex = '/^[1-9]+[0-9]*$/',
        space,
        n = 0;
    num = num || ((num > 1 && regex.test(num)) ? num : 10);
    console.time('桶排序耗时');
    for (var i = 1; i < len; i++) {
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
    }
    space = (max - min + 1) / num;
    for (var j = 0; j < len; j++) {
        var index = Math.floor((array[j] - min) / space);
        if (buckets[index]) { //非空桶，插入排序
            var k = buckets[index].length - 1;
            while (k >= 0 && buckets[index][k] > array[j]) {
                buckets[index][k + 1] = buckets[index][k];
                k--;
            }
            buckets[index][k + 1] = array[j];
        } else {  //空桶，初始化
            buckets[index] = [];
            buckets[index].push(array[j]);
        }
    }
    while (n < num) {
        result = result.concat(buckets[n]);
        n++;
    }
    console.timeEnd('桶排序耗时');
    return result;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bucketSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

### 算法复杂度分析

桶排序最好情况下使用线性时间 O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为 O(n)。很显然，桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少。但相应的空间消耗就会增大。

* 最佳情况：T(n)=O(n+k)
* 最差情况：T(n)=O(n+k)
* 平均情况：T(n)=O(n2)

## 10. 基数排序

### 算法简介

基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。基数排序基于分别排序，分别收集，所以是稳定的。

### 算法具体描述

1. 取得数组中的最大数，并取得位数；
2. arr 为原始数组，从最低位开始取每个位组成 radix 数组；
3. 对 radix 进行计数排序（利用计数排序适用于小范围数的特点）；

### 动画演示

<div align='center'><img src='/images/hexo_post_218.gif' alt='' width='500'/></div>

### Javascript 源代码

```javascript
/* 方法说明：基数排序
 参数：arr-排序数组
 maxDigit-最大位数
 说明：基数排序适用于：
 （1）数据范围较小，建议小于1000
 （2）每个数值都要大于等于0*/
function radixSort(arr, maxDigit) {
    var mod = 10,
        dev = 1,
        counter = [];
    console.time('基数排序耗时');
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if (counter[bucket] == null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
    }
    var pos = 0;
    for (var k = 0; k < counter.length; k++) {
        var value = null;
        if (counter[k] != null) {
            while ((value = counter[k].shift()) != null) {
                arr[pos++] = value;
            }
        }
    }
    console.timeEnd('基数排序耗时');
    return arr;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(radixSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
```

### 算法复杂度分析

* 最佳情况：T(n)=O(n*k)
* 最差情况：T(n)=O(n*k)
* 平均情况：T(n)=O(n*k)