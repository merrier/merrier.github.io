---
title: Leetcode的JS实现——Easy篇（上）
urlname: js-implementation-of-leetcode-easy-part1
tags:
  - JS
  - leetcode
  - 算法
id: 371
categories:
  - 总结
  - 算法
date: 2017-03-31 17:24:05
---

写在前面
====

由于要找实习，所以最近几周一直在刷leetcode（打算先把easy刷完，大概一天10道左右）；而作为一个前端码农，也就只能用js实现算法了，但是众所周知，js在算法实现方面是真的不如其他知名语言（java、python、c++），所以绝大多数题都没有js的标准答案，这让我在刷leetcode的过程变得异常艰难；为了方便和我一样用js刷leetcode的码农，打算写一篇纯干货（代码）的文章，对如何用js实现leetcode算法题进行总结。（鉴于我水平有限和js本身的局限性，有好多题目我虽然看到了，但是最终没有用js实现，如果你知道某些题目的js实现或有更优解法，请点击网站下方链接联系我，O(∩_∩)O谢谢）

介绍
==

leetcode地址：https://leetcode.com/problemset/algorithms/ 本文章不会贴出题目，可以点击标题链接查看原题目 排序方式：按照本难度中题目的accepted统计

JS代码实现
======

[461-Hamming distance](https://leetcode.com/problems/hamming-distance/#/description)
------------------------------------------------------------------------------------

方法一：利用replace()方法

/\*\*
 \* @param {number} x
 \* @param {number} y
 \* @return {number}
 */
var hammingDistance = function(x, y) {
    return (x^y).toString(2).replace(/0/g,"").length;
};

方法二：利用异或

/\*\*
 \* @param {number} x
 \* @param {number} y
 \* @return {number}
 */
var hammingDistance = function(x, y) {
    var xor = x ^ y, count = 0;
    for (var i=0;i<32;i++) count += (xor >> i) & 1;
    return count;
};

[476-Number Complement](https://leetcode.com/problems/number-complement/#/description)
--------------------------------------------------------------------------------------

方法一：利用二进制

/\*\*
 \* @param {number} num
 \* @return {number}
 */
var findComplement = function(num) {
    return num^(Math.pow(2,(num.toString(2).length))-1);
};

方法二：利用位运算中的移位

/\*\*
 \* @param {number} num
 \* @return {number}
 */
var findComplement = function(num) {
    var mask = num;
    mask |= mask >> 1;
    mask |= mask >> 2;
    mask |= mask >> 4;
    mask |= mask >> 8;
    mask |= mask >> 16;
    return num ^ mask;
};

[500-Keyboard Row](https://leetcode.com/problems/keyboard-row/#/description)
----------------------------------------------------------------------------

暂无

[412-Fizz Buzz](https://leetcode.com/problems/fizz-buzz/#/description)
----------------------------------------------------------------------

方法一：各种if

/\*\*
 \* @param {number} n
 \* @return {string\[\]}
 */
var fizzBuzz = function(n) {
    var arr = \[\];
    for(var i=1;i<n+1;i++){
        if(i%15 == 0){
            arr\[i-1\] = "FizzBuzz"
        }else if(i%5 == 0){
            arr\[i-1\] = "Buzz"
        }else if(i%3 == 0){
            arr\[i-1\] = "Fizz"
        }else{
            arr\[i-1\] = "" + i
        }
    }
    return arr;
};

[344-Reverse String](https://leetcode.com/problems/reverse-string/#/description)
--------------------------------------------------------------------------------

方法一：从后往前遍历

/\*\*
 \* @param {string} s
 \* @return {string}
 */
var reverseString = function(s) {
    var str = "";
    for(var i=1,n=s.length;i<n+1;i++){
        str += s\[n-i\];
    }
    return str;
};

方法二：递归

/\*\*
 \* @param {string} s
 \* @return {string}
 */
var reverseString = function(s) {
    var length = s.length;
    if (length <= 1) return s;
    var leftStr = s.substring(0, length / 2);
    var rightStr = s.substring(length / 2, length);
    return reverseString(rightStr) + reverseString(leftStr);
};

[496-Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/#/description)
------------------------------------------------------------------------------------------------

暂无

[463-Island Perimeter](https://leetcode.com/problems/island-perimeter/#/description)
------------------------------------------------------------------------------------

方法一：每块陆地都加4，遇到有相邻陆地时减2

/\*\*
 \* @param {number\[\]\[\]} grid
 \* @return {number}
 */
var islandPerimeter = function(grid) {
    var result=0;
    for(var i=0,n=grid.length;i<n;i++){
        for(var j=0,m=grid\[0\].length;j<m;j++){
            if(grid\[i\]\[j\] ==1){
                result +=4;
                if(i>0 && grid\[i-1\]\[j\] == 1){result -=2}
                if(j>0 && grid\[i\]\[j-1\] ==1 ){result -=2}
            }
        }
    }
    return result;
};

[292-Nim Game](https://leetcode.com/problems/nim-game/#/description)
--------------------------------------------------------------------

方法一：只要数字能被4整除就赢不了

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var canWinNim = function(n) {
    return !!(n%4)
};

[485-Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/#/description)
--------------------------------------------------------------------------------------------

方法一：看到0时就将max置为0，否则max加1

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    var result = 0;
    var num = 0;
    
    for(var i = 0;i<nums.length;i++){
        result = Math.max(result,num =(nums\[i\]==0) ? 0: num+1);
    }
    return result;
};

[136-Single Number](https://leetcode.com/problems/single-number/#/description)
------------------------------------------------------------------------------

方法一：利用位运算中的异或（异或运算可交换位置，且相同数字异或结果为0）

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var singleNumber = function(nums) {
    var result;
    for(var i=0,n=nums.length;i<n;i++){
        result ^= nums\[i\]
    }
    return result
};

[448-Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/#/description)
------------------------------------------------------------------------------------------------------------------------------------

方法一：利用哈希表将看到的数字变为负数

/\*\*
 \* @param {number\[\]} nums
 \* @return {number\[\]}
 */
var findDisappearedNumbers = function(nums) {
    var n= nums.length;
    var result = \[\];
    for(var i=0;i<n;i++){
        var j = Math.abs(nums\[i\]) -1;
        nums\[j\] = -Math.abs(nums\[j\]);
    }
    
    for(var k=0; k<n;k++){
        if(nums\[k\]>0){
            result.push(k+1);
        }
    }
    return result;
    
};

[520-Detect Capital](https://leetcode.com/problems/detect-capital/#/description)
--------------------------------------------------------------------------------

方法一：巧用indexOf

/\*\*
 \* @param {string} word
 \* @return {boolean}
 */
var detectCapitalUse = function(word) {
    return !(word.indexOf(word.toUpperCase()) && word.indexOf(word.toLowerCase()) && word.indexOf(word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase()))
};

方法二：正则 暂无

[104-Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/#/description)
------------------------------------------------------------------------------------------------------------

方法一：递归，其实很容易发现规律

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @return {number}
 */
var maxDepth = function(root) {
    return root === null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

[389-Find the Difference](https://leetcode.com/problems/find-the-difference/#/description)
------------------------------------------------------------------------------------------

方法一：依然是replace()

/\*\*
 \* @param {string} s
 \* @param {string} t
 \* @return {character}
 */
var findTheDifference = function(s, t) {
    for(var i=0,n=s.length;i<n;i++){
        t = t.replace(s\[i\],"");
    }
    return t;
};

方法二：位运算

/\*\*
 \* @param {string} s
 \* @param {string} t
 \* @return {character}
 */
var findTheDifference = function(s, t) {
    var n = t.length,c = t.charCodeAt(n - 1);
	for (var i = 0; i < n - 1; i++) {
		c ^= s.charCodeAt(i);
		c ^= t.charCodeAt(i);
	}
	return String.fromCharCode(c);
};

[371-Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/#/description)
------------------------------------------------------------------------------------------

方法一：位运算

/\*\*
 \* @param {number} a
 \* @param {number} b
 \* @return {number}
 */
var getSum = function(a, b) {
    return b==0? a:getSum(a^b, (a&b)<<1);
};

[226-Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/#/description)
----------------------------------------------------------------------------------------

方法一：二叉树基本上都是递归，只不过这次规律很容易发现

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @return {TreeNode}
 */
var invertTree = function(root) {
    if(!root){
        return null;
    }
    var left = root.left,
        right = root.right;
        
    root.left = invertTree(right);
    root.right = invertTree(left);
    return root;
};

[492-Construct the Rectangle](https://leetcode.com/problems/construct-the-rectangle)
------------------------------------------------------------------------------------

方法一：越和正方形相似越好，所以需要先求根值确定大致范围

/\*\*
 \* @param {number} area
 \* @return {number\[\]}
 */
var constructRectangle = function(area) {
    var w = Math.floor(Math.sqrt(area));
	while (area % w !== 0) {
	    w--;
	}
	return \[area/w,w\];
};

[283-Move Zeroes](https://leetcode.com/problems/move-zeroes)
------------------------------------------------------------

方法一：碰到0就先去掉再push进数组

/\*\*
 \* @param {number\[\]} nums
 \* @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    for(var i=0,m=0,n=nums.length;i<n;i++){
        if(nums\[m\] === 0){
            nums.splice(m,1);
            nums.push(0);
        }else{
            m++;
        }
    }
};

方法二：类似于冒泡

/\*\*
 \* @param {number\[\]} nums
 \* @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    var j = 0;
    for(var i = 0; i < nums.length; i++) {
        if(nums\[i\] !== 0) {
            var temp = nums\[j\];
            nums\[j\] = nums\[i\];
            nums\[i\] = temp;
            j++;
        }
    }
};

方法三：用一个变量记录当前多少个元素不为0

/\*\*
 \* @param {number\[\]} nums
 \* @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    if (nums === null || nums.length === 0) return;        
    var insertPos = 0;
    for (var i=0;i<nums.length;i++) {
        if (nums\[i\] !== 0) nums\[insertPos++\] = nums\[i\];
    }        
    while (insertPos < nums.length) {
        nums\[insertPos++\] = 0;
    }
};

[530-Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst)
----------------------------------------------------------------------------------------------------------

暂无

[506-Relative Ranks](https://leetcode.com/problems/relative-ranks)
------------------------------------------------------------------

 

[167-Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted)
--------------------------------------------------------------------------------------------------------

方法一：两个指针

/\*\*
 \* @param {number\[\]} numbers
 \* @param {number} target
 \* @return {number\[\]}
 */
var twoSum = function(numbers, target) {
    
    if (numbers === null || numbers.length < 2) return null;
    var left = 0, right = numbers.length - 1;
    while (left < right) {
        var v = numbers\[left\] + numbers\[right\];
        if (v == target) {
            return\[left+1,right+1\];
        } else if (v > target) {
            right --;
        } else {
            left ++;
        }
    }
    return null;
};

方法二：二分查找

/\*\*
 \* @param {number\[\]} numbers
 \* @param {number} target
 \* @return {number\[\]}
 */
var twoSum = function(numbers, target) {
    if(numbers.length<2) return null;
    for(var i=0; i<numbers.length-1; i++) {
        var start=i+1, end=numbers.length-1, gap=target-numbers\[i\];
        while(start <= end) {
            var m = Math.floor(start+(end-start)/2);
            if(numbers\[m\] == gap) return \[i+1,m+1\];
            else if(numbers\[m\] > gap) end=m-1;
            else start=m+1;
        }
    }
};

[455-Assign Cookies](https://leetcode.com/problems/assign-cookies)
------------------------------------------------------------------

方法一：Just assign the cookies starting from the child with less greediness to maximize the number of happy children .

/\*\*
 \* @param {number\[\]} g
 \* @param {number\[\]} s
 \* @return {number}
 */
var findContentChildren = function(g, s) {
    g.sort(function(a,b){return a-b});
    s.sort(function(a,b){return a-b});
    var i=0,m=g.length,n=s.length;
    for(var j=0;j<n&&i<m;j++){
        if(g\[i\]<=s\[j\]){
            i++;
        }
    }
    return i;
};

[453-Minimum Moves to Equal Array Elements](https://leetcode.com/problems/minimum-moves-to-equal-array-elements)
----------------------------------------------------------------------------------------------------------------

方法一：每次让n-1个元素+1，其实可以理解为每次让1个元素减1，知道都等于数组中的最小元素为止

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var minMoves = function(nums) {
    var min = Math.min.apply(null, nums),n=nums.length,result=0;
    for(i=0;i<n;i++){
        result += nums\[i\] -min;
    }
    return result;
};

[383-Ransom Note](https://leetcode.com/problems/ransom-note)
------------------------------------------------------------

方法一：用一个数组作为字典表（其实应该是哈希表，在js中就是数组）

/\*\*
 \* @param {string} ransomNote
 \* @param {string} magazine
 \* @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    var n = ransomNote.length;
    for(var i=0;i<n;i++){
        var s = ransomNote\[i\];
        if(magazine.indexOf(s) == -1){
            return false;
        }else{
            magazine = magazine.replace(s,"");
        }
    }
    return !!(magazine.length + 1);
};

[404-Sum of Left Leaves](https://leetcode.com/problems/sum-of-left-leaves)
--------------------------------------------------------------------------

方法一：将叶子节点区分出来就可以了

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @return {number}
 */
var sumOfLeftLeaves = function(root) {
    if(root === null) {return 0;}
    var ans = 0;
    if(root.left !== null) {
        if(root.left.left === null && root.left.right === null) {
            ans += root.left.val;
        }else {
            ans += sumOfLeftLeaves(root.left);
        }
    }
    ans += sumOfLeftLeaves(root.right);
    return ans;
};

[349-Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays)
------------------------------------------------------------------------------------------

方法一：两个指针进行遍历（哈希表，复杂度为O(n)）

/\*\*
 \* @param {number\[\]} nums1
 \* @param {number\[\]} nums2
 \* @return {number\[\]}
 */
var intersection = function(nums1, nums2) {
        nums1.sort(function(a,b){return a-b});
        nums2.sort(function(a,b){return a-b});
        var i = 0,
            j = 0,
            result = \[\];
        while (i < nums1.length && j < nums2.length) {
            if (nums1\[i\] < nums2\[j\]) {
                i++;
            } else if (nums1\[i\] > nums2\[j\]) {
                j++;
            } else {
                if(result.indexOf(nums1\[i\]) == -1){
                    result.push(nums1\[i\]);
                }
                i++;
                j++;
            }
        }
        return result.sort(function(a,b){return a-b});
};

方法二：二分查找（复杂度为O(nlgn)）

/\*\*
 \* @param {number\[\]} nums1
 \* @param {number\[\]} nums2
 \* @return {number\[\]}
 */
var intersection = function(nums1, nums2) {
    var result = \[\];
    nums2.sort(function(a,b){return a-b;});
    for (var i=0;i<nums1.length;i++) {
        if (binarySearch(nums2, nums1\[i\]) && result.indexOf(nums1\[i\]) == -1) {
            result.push(nums1\[i\]);
        }
    }
    return result;
};

var binarySearch = function(nums,target) {
    var low = 0,high = nums.length - 1;
    while (low <= high) {
        var mid = Math.floor(low + (high - low) / 2);
        if (nums\[mid\] == target) {
            return true;
        }
        if (nums\[mid\] > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return false;
};

[122-Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii)
----------------------------------------------------------------------------------------------------------

方法一：只要第二天价格比第一天价格高，就卖掉

/\*\*
 \* @param {number\[\]} prices
 \* @return {number}
 */
var maxProfit = function(prices) {
    var result=0,n=prices.length;
    for(var i=0;i<n-1;i++){
        if(prices\[i\]<prices\[i+1\]){
            result += prices\[i+1\] - prices\[i\];
            
        }
    }
    return result;
};

[387-First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string)
----------------------------------------------------------------------------------------------------------

方法一：用一个数组记录字符出现的位置及次数（哈希表）

/\*\*
 \* @param {string} s
 \* @return {number}
 */
var firstUniqChar = function(s) {
    var freq = new Array(26);
    var a = 'a'.charCodeAt();
    for(var i = 0; i < s.length; i ++) {
        if (freq \[s\[i\].charCodeAt() - a\] === undefined) {
            freq \[s\[i\].charCodeAt() - a\] = 1;
        } else {
            freq \[s\[i\].charCodeAt() - a\]++;
        }
    }
    for(var k = 0; k < s.length; k ++){
        if(freq \[s\[k\].charCodeAt() - a\] == 1){
            return k;
        }
    }
    return -1;
};

[171-Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number)
----------------------------------------------------------------------------------------

方法一：很容易发现规律，类似二进制转换成10进制

/\*\*
 \* @param {string} s
 \* @return {number}
 */
var titleToNumber = function(s) {
    var result = 0;
    for(var i=0,n=s.length;i<n;i++){
        result += Math.pow(26,n-i-1)*(s\[i\].charCodeAt() - 64);
    }
    return result;
};

[504-Base 7](https://leetcode.com/problems/base-7)
--------------------------------------------------

方法一：递归取余，很经典的一道题和解法，用的比较多

/\*\*
 \* @param {number} num
 \* @return {string}
 */
var convertToBase7 = function(num) {
    return num>=0 ? "" + (num>=7 ? convertToBase7(Math.floor(num/7)) + "" + num%7 : num) : '-'+convertToBase7(-num);
};

[237-Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list)
----------------------------------------------------------------------------------------------

方法一：很智障的一道题

/\*\*
 \* Definition for singly-linked list.
 \* function ListNode(val) {
 \*     this.val = val;
 \*     this.next = null;
 \* }
 \*/
/\*\*
 \* @param {ListNode} node
 \* @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

[100-Same Tree](https://leetcode.com/problems/same-tree)
--------------------------------------------------------

方法一：递归，相等的依据除了值相等之外还有不能为null

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} p
 \* @param {TreeNode} q
 \* @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p === null && q === null){
        return true;
    }
    return p !== null && q !== null && p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

[169-Maiority Element](https://leetcode.com/problems/majority-element)
----------------------------------------------------------------------

方法一：每找出两个不同的element，就成对删除即count--，最终剩下的一定就是所求的（O(n)）

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var majorityElement = function(nums) {
    var major=nums\[0\], count = 1;
        for(var i=1,n=nums.length; i<n;i++){
            if(count===0){
                count++;
                major=nums\[i\];
            }else if(major==nums\[i\]){
                count++;
            }else count--;
        }
    return major;
};

方法二：哈希表

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var majorityElement = function(nums) {
    var counts = \[\],n = nums.length;
    for (var i = 0; i < n; i++){
        if(counts\[nums\[i\]\] === undefined){
            counts\[nums\[i\]\] = 1;
        }else{
            if(counts\[nums\[i\]\] + 1> Math.floor(n / 2)) { return nums\[i\];}
            counts\[nums\[i\]\]++;
        }
    }
    return nums\[0\];
};

方法三：Since the majority element appears more than `n / 2` times, the `n / 2`-th element in the sorted `nums` must be the majority element.

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var majorityElement = function(nums) {
    nums.sort();
    return nums\[Math.floor(nums.length/2)\];
};

方法四：随机挑选一个元素，然后看它是否是多数元素

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var majorityElement = function(nums) {
    var n = nums.length;
    while (true) {
        var idx = Math.floor(Math.random()*n),candidate = nums\[idx\],counts = 0; 
        for (var i = 0; i < n; i++)
            if (nums\[i\] == candidate) {counts++;}
        if (counts > n / 2) return candidate;
    }
};

方法五：[摩尔投票算法](https://www.zhihu.com/question/44213758?sort=created)

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var majorityElement = function(nums) {
    var major, counts = 0, n = nums.length;
    for (var i = 0; i < n; i++) {
        if (!counts) {
            major = nums\[i\];
            counts = 1;
        }
        else counts += (nums\[i\] == major) ? 1 : -1;
    }
    return major;
};

方法六：位运算，The key lies in how to count the number of `1`'s on a specific bit. Specifically, you need a `mask` with a `1` on the `i`-the bit and `0` otherwise to get the `i`-th bit of each element in `nums`

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var majorityElement = function(nums) {
    var major = 0, n = nums.length;
    for (var i = 0, mask = 1; i < 32; i++, mask <<= 1) {
        var bitCounts = 0;
        for (var j = 0; j < n; j++) {
            if (nums\[j\] & mask) bitCounts++;
            if (bitCounts > n / 2) {
                major |= mask;
                break;
            }
        }
    } 
    return major;
};

[242-Valid Anagram](https://leetcode.com/problems/valid-anagram)
----------------------------------------------------------------

方法一：用一个数组作为桶，s中的字符用来加1，t中的字符用来减1；如果最后桶中没有元素就返回true

/\*\*
 \* @param {string} s
 \* @param {string} t
 \* @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s===""&&t===""){return true;}
    var alphabet = new Array(26);
        for(var m=0;m<alphabet.length;m++){
            alphabet\[m\] =0;
        }
        for (var i = 0; i < s.length; i++) {
            alphabet\[s\[i\].charCodeAt() - 97\]++;
        }
        for (var j = 0; j < t.length; j++) {
            alphabet\[t\[j\].charCodeAt() - 97\]--;
        }
        for (var k=0;k<alphabet.length;k++) {
            if (alphabet\[k\]!== 0) {
                return false;
            }
        }
    return true;
};

[409-Longest Palindrome](https://leetcode.com/problems/longest-palindrome)
--------------------------------------------------------------------------

方法一：将数组中的元素分为偶数和奇数两种情况，因为回文字符串的字符个数有这两种情况

/\*\*
 \* @param {string} s
 \* @return {number}
 */
var longestPalindrome = function(s) {
    var even = 0,odd = 0,arr = \[\];
    for(var i=0,n=s.length;i<n;i++){
        var c = s\[i\].charCodeAt() - 65;
        if(arr\[c\] === undefined){
            arr\[c\] = 1;
        }else{
            arr\[c\]++;
        }
        if(arr\[c\]%2 === 0){
            even += 2;
            odd--;
        }else{
            odd++;
        }
    }
    return even + (odd===0? 0 :1); 
};

[541-Reverse String II](https://leetcode.com/problems/reverse-string-ii)
------------------------------------------------------------------------

暂无

[401-Binary Watch](https://leetcode.com/problems/binary-watch)
--------------------------------------------------------------

方法一：从结果出发，满足条件时push进数组

/\*\*
 \* @param {number} num
 \* @return {string\[\]}
 */
var readBinaryWatch = function(num) {
    var result = \[\];
    for(var h=0;h<12;h++){
        for(var m=0;m<60;m++){
            if((h.toString(2) + m.toString(2)).replace(/0/g,"").length == num){
                m = m>9 ? m : "0" + m;
                item = h + ":" + m;
                result.push(item);
            }
        }
    }
    return result;
};

[217-Contains Duplicate](https://leetcode.com/problems/contains-duplicate)
--------------------------------------------------------------------------

方法一：哈希表

/\*\*
 \* @param {number\[\]} nums
 \* @return {boolean}
 */
var containsDuplicate = function(nums) {
    if(nums.length===0){return false;}
    var opt = {};
    for(var i=0,n=nums.length;i<n;i++){
        if(opt\[nums\[i\]\]){
            return true;
        }else{
            opt\[nums\[i\]\] = 1;
        }
    }
    return false;
};

方法二：先将数组排序，然后只需要比较相邻元素

/\*\*
 \* @param {number\[\]} nums
 \* @return {boolean}
 */
var containsDuplicate = function(nums) {
    nums.sort();
    for(var ind = 1; ind < nums.length; ind++) {
        if(nums\[ind\] == nums\[ind - 1\]) {
            return true;
        }
    }
    return false;
};

[13-Roman to Integer](https://leetcode.com/problems/roman-to-integer)
---------------------------------------------------------------------

方法一：知道罗马数字的规则之后就好写了

/\*\*
 \* @param {string} s
 \* @return {number}
 */
var romanToInt = function(s) {
    var opt = {'M': 1000,'D': 500 ,'C': 100,'L': 50,'X': 10,'V': 5,'I': 1},
        z = 0,
        n=s.length;
    for(var i=0;i<n-1;i++){
        if(opt\[s\[i\]\] < opt\[s\[i+1\]\]){
            z -= opt\[s\[i\]\];
        }else{
            z += opt\[s\[i\]\];
        }
    }
    return z + opt\[s\[n-1\]\];
};

[206-Reverse Linked List](https://leetcode.com/problems/reverse-linked-list)
----------------------------------------------------------------------------

方法一：反转的条件就是head.next.next = head和head.next = null

/\*\*
 \* Definition for singly-linked list.
 \* function ListNode(val) {
 \*     this.val = val;
 \*     this.next = null;
 \* }
 \*/
/\*\*
 \* @param {ListNode} head
 \* @return {ListNode}
 */
var reverseList = function(head) {
    if (!head || !(head.next)) {return head;}
    var node = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return node; 
};

[350-Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii)
------------------------------------------------------------------------------------------------

方法一：先对nums1遍历，生成哈希表，然后对nums2遍历

/\*\*
 \* @param {number\[\]} nums1
 \* @param {number\[\]} nums2
 \* @return {number\[\]}
 */
var intersect = function(nums1, nums2) {
    var arr = \[\],result=\[\];
    for(var i=0,n=nums1.length;i<n;i++){
        var numi = arr\[nums1\[i\]\];
        if(numi){
            arr\[nums1\[i\]\]++;
        }else{
            arr\[nums1\[i\]\] = 1;
        }
    }
    for(var j=0,m=nums2.length;j<m;j++){
        var numj = arr\[nums2\[j\]\];
        if(numj){
            result.push(nums2\[j\]);
            arr\[nums2\[j\]\]--;
        }
    }
    return result;
};

方法二：先进行排序，然后用两个指针遍历

/\*\*
 \* @param {number\[\]} nums1
 \* @param {number\[\]} nums2
 \* @return {number\[\]}
 */
var intersect = function(nums1, nums2) {
    nums1.sort(function(a,b){return a-b;});
    nums2.sort(function(a,b){return a-b;});
    var n1 = nums1.length, n2 = nums2.length,i1 = 0, i2 = 0,res = \[\];
    while(i1 < n1 && i2 < n2){
        if(nums1\[i1\] == nums2\[i2\]) {
            res.push(nums1\[i1\]);
            i1++;
            i2++;
        }
        else if(nums1\[i1\] > nums2\[i2\]){
            i2++;
        }
        else{
            i1++;
        }
    }
    return res;
};

[268-Missing Number](https://leetcode.com/problems/missing-number)
------------------------------------------------------------------

方法一：因为有且只有一个数字丢失，所以可以先排序再遍历，根据索引值和数值的关系判断

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var missingNumber = function(nums) {
    var sort = nums.sort(function(a,b){
        return a-b;
    }),n=nums.length;
    for(var i=0;i<n;i++){
        if(sort\[i\] != i){
            return i;
        }
    }
    return n;
};

方法二：位运算，利用异或

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var missingNumber = function(nums) {
    var xor = 0, i = 0;
	for (i = 0; i < nums.length; i++) {
		xor = xor ^ i ^ nums\[i\];
	}
	return xor ^ i;
};

方法三：因为数值范围确定，所以可以先求和，再减去数组中的元素，剩下的数字就是丢失数字

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var missingNumber = function(nums) {
    var len = nums.length,sum = (0+len)*(len+1)/2;
    for(var i=0; i<len; i++){
        sum-=nums\[i\];
    }
    return sum;
};

方法四：二分查找

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var missingNumber = function(nums) {
    nums.sort(function(a,b){return a-b;});
    var left = 0, right = nums.length, mid= Math.floor((left + right)/2);
    while(left<right){
        mid = Math.floor((left + right)/2);
        if(nums\[mid\]>mid) {right = mid;}
        else left = mid+1;
    }
    return left;
};

[447-Number of Boomerangs](https://leetcode.com/problems/number-of-boomerangs)
------------------------------------------------------------------------------

暂无

[543-Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree)
------------------------------------------------------------------------------------

暂无

[415-Add Strings](https://leetcode.com/problems/add-strings)
------------------------------------------------------------

方法一：遍历，用一个变量记录当前位进位情况

/\*\*
 \* @param {string} num1
 \* @param {string} num2
 \* @return {string}
 */
var addStrings = function(num1, num2) {
    var carry=0,str = '';
    for(var i=num1.length-1,j=num2.length-1;i>=0||j>=0||carry==1;i--,j--){
        var n1 = num1\[i\] ? num1\[i\] - '0' : 0,
            n2 = num2\[j\] ? num2\[j\] - '0' : 0;
        var sum = (n1 + n2 + carry)%10;
            carry = Math.floor((n1 + n2 + carry)/10);
        str = sum + str;
    }
    return str;
};

[108-Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree)
--------------------------------------------------------------------------------------------------------------------------

暂无

[405-Convert a Number to Hexadecimal](https://leetcode.com/problems/convert-a-number-to-hexadecimal)
----------------------------------------------------------------------------------------------------

暂无