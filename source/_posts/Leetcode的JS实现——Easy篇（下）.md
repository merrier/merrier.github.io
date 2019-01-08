---
title: Leetcode的JS实现——Easy篇（下）
urlname: js-implementation-of-leetcode-easy-part2
tags:
  - JS
  - leetcode
  - 算法
id: 317
categories:
  - 总结
  - 算法
date: 2017-03-26 12:40:52
---

写在前面
====

这是Leetcode的JS实现——Easy篇的后半部分，前半部分可以[点击这里](https://merrier.wang/?p=371)查看

介绍
==

leetcode地址：https://leetcode.com/problemset/algorithms/ 本文章不会贴出题目，可以点击标题链接查看原题目 排序方式：按照本难度中题目的accepted统计

JS代码实现
======

[121-Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/#/description)
------------------------------------------------------------------------------------------------------------------

方法一：动态规划

/\*\*
 \* @param {number\[\]} prices
 \* @return {number}
 */
var maxProfit = function(prices) {
    var maxPro = 0;
    var minPrice = prices\[0\];
    for(var i = 0 ,n = prices.length; i<n;i++){
        minPrice = Math.min(minPrice, prices\[i\]);
        maxPro = Math.max(maxPro, prices\[i\] - minPrice);
    }
    return maxPro;
};

方法二：Kadane's Algorithm

/\*\*
 \* @param {number\[\]} prices
 \* @return {number}
 */
var maxProfit = functon(pris)
    var maxCur = 0, maxSoFar = 0;
    for(var i = 1,n = prices.length;i<n; i++) {
        maxCur = Math.max(0, maxCur += prices\[i\] - prices\[i-1\])
        maxSoFar = Math.max(maxCur, maxSoFar);
    }
    return maxSoFar;
};

[202-Happy Number](https://leetcode.com/problems/happy-number/#/description)
----------------------------------------------------------------------------

方法一：Floyd Cycle detection algorithm

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isHappy = function(n) {
    var slow, fast;
    slow = fast = n;
    do {
        slow = digitSquareSum(slow);
        fast = digitSquareSum(fast);
        fast = digitSquareSum(fast);
    } while(slow != fast);
    if (slow == 1) {return true;}
    else {return false;}
};

var digitSquareSum = function(n){
    var sum = 0, tmp;
    while (n) {
        tmp = n % 10;
        sum += tmp * tmp;
        n = Math.floor(n / 10);
    }
    return sum;
};

方法二：O(1)space，如果快=慢，证明陷入了死循环

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isHappy = function(n) {
    var x = n,y = n;
    while(x>1){
        x = cal(x) ;
        if(x==1) {return true;}
        y = cal(cal(y));            
        if(y==1) {return true ;}
        if(x==y) {return false;}
    }        
    return true;
};

var cal = function(n){
    var sum = 0, tmp;
    while (n) {
        tmp = n % 10;
        sum += tmp * tmp;
        n = Math.floor(n / 10);
    }
    return sum;
};

方法三：Using fact all numbers in \[2, 6\] are not happy (and all not happy numbers end on a cycle that hits this interval)

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isHappy = function(n) {
    while(n>6){
        var next = 0;
        while(n){
            next+=(n%10)*(n%10); 
            n = Math.floor(n/10);
        }
        n = next;
    }
    return n==1;
};

[326-Power of Three](https://leetcode.com/problems/power-of-three/#/description)
--------------------------------------------------------------------------------

方法一：递归

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfThree = function(n) {
    return n>0 && (n==1 || (n%3===0 && isPowerOfThree(n/3)));
};

方法二：迭代

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfThree = function(n) {
    if(n>1)
        while(n%3===0) {n /= 3;}
    return n==1;
};

方法三：int型数字中最大的3的幂为1162261467

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfThree = function(n) {
    return n > 0 && (1162261467 % n === 0);
};

方法四：对n取根值

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfThree = function(n) {
    return (Math.log10(n) / Math.log10(3)) % 1 === 0;
};

方法五：正则表达式

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfThree = function(n) {
    var reg = new RegExp("^10*$","");
    return reg.test(n.toString(3));
};

[327-Power of Two](https://leetcode.com/problems/power-of-two/#/description)
----------------------------------------------------------------------------

方法一：Power of 2 means only one bit of n is '1', so use the trick n&(n-1)==0 to judge whether that is the case

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfTwo = function(n) {
    if(n<=0) {return false;}
    return !(n&(n-1));
};

方法二：同样利用二进制数字中只有1个"1"的特性，用replace()方法求二进制数字中1的数目

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfTwo = function(n) {
    return n>0 && n.toString(2).replace(/0/g,'').length == 1;
};

方法三：迭代

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfTwo = function(n) {
    if(n===0) {return false;}
    while(n%2===0) n/=2;
    return (n==1);
};

方法四：递归

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfTwo = function(n) {
    return n>0 && (n==1 || (n%2===0 && isPowerOfTwo(n/2)));
};

方法五：利用int型数字中最大的2的幂

/\*\*
 \* @param {number} n
 \* @return {boolean}
 */
var isPowerOfTwo = function(n) {
    return n>0 && (1073741824 % n === 0);
};

[83-Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/#/description)
-----------------------------------------------------------------------------------------------------------------------

方法一：递归

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
var deleteDuplicates = function(head) {
    if(head === null || head.next === null) {return head;}
    head.next = deleteDuplicates(head.next);
    return head.val == head.next.val ? head.next : head;
};

[70-Climbing Stairs](https://leetcode.com/problems/climbing-stairs/#/description)
---------------------------------------------------------------------------------

方法一：斐波那契数列

/\*\*
 \* @param {number} n
 \* @return {number}
 */
var climbStairs = function(n) {
    if(n <= 0) return 0;
    if(n == 1) return 1;
    if(n == 2) return 2;
    
    var one\_step\_before = 2;
    var two\_steps\_before = 1;
    var all_ways = 0;
    
    for(var i=2; i<n; i++){
    	all\_ways = one\_step\_before + two\_steps_before;
    	two\_steps\_before = one\_step\_before;
        one\_step\_before = all_ways;
    }
    return all_ways;
};

方法二：从终点向前循环，利用两个指针，a代表到达当前步所有可能方式的个数，b代表到达下一步所有可能方式的个数

/\*\*
 \* @param {number} n
 \* @return {number}
 */
var climbStairs = function(n) {
    a = b = 1;
    while (n--)
        a = (b += a) - a;
    return a;
};

[53-Maximum Subarray](https://leetcode.com/problems/maximum-subarray/#/description)
-----------------------------------------------------------------------------------

方法一：Basically, keep adding each integer to the sequence until the sum drops below 0.If sum is negative, then should reset the sequence.

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var maxSubArray = function(nums) {
    var ans=nums\[0\],i,j,sum=0;
    for(i=0;i<nums.length;i++){
        sum+=nums\[i\];            
        ans=Math.max(sum,ans);
        sum=Math.max(sum,0);
    }
    return ans;
};

方法二：动态规划

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var maxSubArray = function(nums) {
    var n = nums.length;
    var dp = \[\];//dp\[i\] means the maximum subarray ending with nums\[i\];
    dp\[0\] = nums\[0\];
    var max = dp\[0\];
    for(var i = 1; i < n; i++){
        dp\[i\] = nums\[i\] + (dp\[i - 1\] > 0 ? dp\[i - 1\] : 0);
        max = Math.max(max, dp\[i\]);
    }
    return max;
};

[437-Path Sum III](https://leetcode.com/problems/path-sum-iii/#/description)
----------------------------------------------------------------------------

方法一：用哈希表来建立所有的前缀路径之和跟其个数之间的映射，然后看子路径之和有没有等于给定值的

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @param {number} sum
 \* @return {number}
 */
var pathSum = function(root, sum) {
    var map = \[\];
    map\[0\] = 1;  //Default sum = 0 has one count
    return backtrack(root, 0, sum, map); 
};

var backtrack = function(root,sum,target,map){
    if(root === null) {return 0;}
    sum += root.val;
    var res = map\[sum-target\] === undefined ? 0 : map\[sum-target\];//See if there is a subarray sum equals to target
    map\[sum\] = (map\[sum\] === undefined ? 0 : map\[sum\])+1;//Extend to left and right child
    res += backtrack(root.left, sum, target, map) + backtrack(root.right, sum, target, map);
    map\[sum\]--;   //Remove the current node so it wont affect other path
    return res;
};

方法二：利用前序遍历，对于每个遍历到的节点进行处理，维护一个变量pre来记录之前路径之和，然后cur为pre加上当前节点值，如果cur等于sum，那么返回结果时要加1，然后对当前节点的左右子节点调用递归函数求解

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @param {number} sum
 \* @return {number}
 */
var pathSum = function(root, sum) {
    if (root === null) {return 0;}
    return sumUp(root, 0, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
};

var sumUp = function(node,pre,sum){
    if (node === null) {return 0;}
    var cur = pre + node.val;
    return (cur == sum) + sumUp(node.left, cur, sum) + sumUp(node.right, cur, sum);
};

[501-Find Mode in Binary Search Tree](https://leetcode.com/problems/find-mode-in-binary-search-tree/#/description)
------------------------------------------------------------------------------------------------------------------

方法一：Morris traversal（二叉树遍历方法，[参考链接](http://www.cnblogs.com/AnnieKim/archive/2013/06/15/MorrisTraversal.html)）

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @return {number\[\]}
 */
var currVal,
    currCount = 0,
    maxCount = 0,
    modeCount = 0,
    modes = \[\]; 
 
var findMode = function(root) {
    inorder(root);
    modes = new Array(modeCount);
    modeCount = 0;
    currCount = 0;
    inorder(root);
    return modes;
};

var handleValue = function(val) {
    if (val != currVal) {
        currVal = val;
        currCount = 0;
    }
    currCount++;
    if (currCount > maxCount) {
        maxCount = currCount;
        modeCount = 1;
    } else if (currCount == maxCount) {
        if (modes !== null)
            modes\[modeCount\] = currVal;
        modeCount++;
    }
};

var inorder = function(root) {
    var node = root;
        while (node !== null) {
            if (node.left === null) {
                handleValue(node.val);
                node = node.right;
            } else {
                var prev = node.left;
                while (prev.right !== null && prev.right != node)
                    prev = prev.right;
                if (prev.right === null) {
                    prev.right = node;
                    node = node.left;
                } else {
                    prev.right = null;
                    handleValue(node.val);
                    node = node.right;
                }
            }
        }
};

方法二：先用递归得到有多少个modes，然后再申请空间保证O(1)的空间复杂度

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @return {number\[\]}
 */
var currentModes = 0;
var currentValue = 0;
var currentCount = 0;
var modes = \[\];
var maxCount = 0;
 
var findMode = function(root) {
    helper(root);
    modes = new Array(currentModes);
    currentModes = 0;
    currentCount = 0;
    helper(root);
    return modes;
};

var helper = function (root) {
    if (root === null) return;
    helper(root.left);
    if (root.val != currentValue) {
        currentCount = 1;
        currentValue = root.val;
    } else {
        currentCount++;
    }
    if (currentCount > maxCount) {
        maxCount = currentCount;
        currentModes = 1;
    } else if (currentCount == maxCount) {
        if (modes !== null){
            modes\[currentModes\] = root.val;
            currentModes++;
        }
    }
    helper(root.right);
};

[191-Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/#/description)
------------------------------------------------------------------------------------

方法一：利用toString(2)和replace()

/\*\*
 \* @param {number} n - a positive integer
 \* @return {number}
 */
var hammingWeight = function(n) {
    return n.toString(2).replace(/0/g,'').length;
};

方法二：利用n=n&(n-1)

/\*\*
 \* @param {number} n - a positive integer
 \* @return {number}
 */
var hammingWeight = function(n) {
    var count = 0;
    for (;n!==0;n = n & (n-1))
        count++;
    return count;
};

方法三：位运算

/\*\*
 \* @param {number} n - a positive integer
 \* @return {number}
 */
var hammingWeight = function(n) {
    var ones = 0;
    while(n!==0) {
    	ones = ones + (n & 1);
    	n = n>>>1;
    }
    return ones;
};

[35-Search Insert Position](https://leetcode.com/problems/search-insert-position/#/description)
-----------------------------------------------------------------------------------------------

方法一：按部就班遍历

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} target
 \* @return {number}
 */
var searchInsert = function(nums, target) {
    for(var i=0,n=nums.length;i<n;i++){
        if(target<=nums\[i\]){
            return i;
        }
    }
    return n;
};

方法二：二分查找

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} target
 \* @return {number}
 */
var searchInsert = function(nums, target) {
    var low = 0, high = nums.length-1;
    while(low<=high){
        var mid = Math.floor((low+high)/2);
        if(nums\[mid\] == target) {return mid;}
        else if(nums\[mid\] > target) {high = mid-1;}
        else {low = mid+1;}
    }
    return low;
};

[107-Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/#/description)
----------------------------------------------------------------------------------------------------------------------------

暂无

[263-Ugly Number](https://leetcode.com/problems/ugly-number/#/description)
--------------------------------------------------------------------------

方法一：根据丑陋数的定义，我们将给定数除以2、3、5，直到无法整除，也就是除以2、3、5的余数不再为0时停止。这时如果得到1，说明是所有因子都是2或3或5，如果不是1，则不是丑陋数。

/\*\*
 \* @param {number} num
 \* @return {boolean}
 */
var isUgly = function(num) {
    for (var p of \[2, 3, 5\])
    while (num && num % p === 0)
        num /= p;
    return num == 1;
};

[459-Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/#/description)
--------------------------------------------------------------------------------------------------------

方法一：The idea is that when we see a character in _str_ that matches the very first character of _str_, we can start to hoping that _str_ is a built by copies of the substring composed by all characters before the reappearance of the its first character.

/\*\*
 \* @param {string} s
 \* @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    var l = s.length;
    if(l == 1) {
        return false;
    }
    var sb = '';
    var first = s.charAt(0);
    sb += first;
    var i = 1;
    while(i <= l / 2) {
        var c = s.charAt(i++);
        if(c == first && isCopies(s, sb)) {
            return true;
        }else {
            sb += c;
        }
    }
    return false;
};

var isCopies = function(str,substr) {
    if(str.length % substr.length !== 0) {
        return false;
    }
    for(var i = substr.length; i < str.length; i += substr.length){
        if(str.substring(i).slice(0,substr.length) !== substr){
            return false;
        }
    }
    return true;
};

其他方法仍在思考实现中

[21-Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/#/solutions)
---------------------------------------------------------------------------------------------

方法一：递归

/\*\*
 \* Definition for singly-linked list.
 \* function ListNode(val) {
 \*     this.val = val;
 \*     this.next = null;
 \* }
 \*/
/\*\*
 \* @param {ListNode} l1
 \* @param {ListNode} l2
 \* @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(l1 === null) return l2;
    if(l2 === null) return l1;
    if(l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l2.next, l1);
        return l2;
    }
};

[235-Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/#/description)
------------------------------------------------------------------------------------------------------------------------------------------------

方法：**递归**，因为这是一棵二叉搜索数，所以两个节点分别与共同的祖先节点相减所得的差应该是异号或等于0的，否则就根据节点与当前根节点的大小比较对其左子树或右子树进行递归

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @param {TreeNode} p
 \* @param {TreeNode} q
 \* @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    while ((root.val - p.val) * (root.val - q.val) > 0)
        root = p.val < root.val ? root.left : root.right;
    return root;
};

方法二：迭代，和递归类似，只不过代码更加简化

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @param {TreeNode} p
 \* @param {TreeNode} q
 \* @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    return (root.val - p.val) * (root.val - q.val) < 1 ? root :
           lowestCommonAncestor(p.val < root.val ? root.left : root.right, p, q);
};

[198-House Robber](https://leetcode.com/problems/house-robber/#/description)
----------------------------------------------------------------------------

方法一：根据房间数的奇偶进行分类存储最大值，并且有以下规律

> f(0) = nums\[0\] f(1) = max(num\[0\], num\[1\]) f(k) = max( f(k-2) \+ nums\[k\], f(k-1) )

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var rob = function(nums) {
    var a = 0,
        b = 0;
    for (var i=0; i<nums.length; i++)
    {
        if (i%2===0)
        {
            a = Math.max(a+nums\[i\], b);
        }
        else
        {
            b = Math.max(a, b+nums\[i\]);
        }
    }
    return Math.max(a, b);
};

[342-Power of Four](https://leetcode.com/problems/power-of-four/#/description)
------------------------------------------------------------------------------

方法一：因为能被4整除的数用二进制表示的话有且只有一个1在奇数位上

/\*\*
 \* @param {number} num
 \* @return {boolean}
 */
var isPowerOfFour = function(num) {
    return num > 0 && (num&(num-1)) === 0 && (num & 0x55555555) !== 0;
};

方法二：很好用的replace().length

/\*\*
 \* @param {number} num
 \* @return {boolean}
 */
var isPowerOfFour = function(num) {
    return num.toString(2).replace(/0/g,'').length === 1 && num.toString(2).length%2 ===1;
};

方法三：利用2的倍数减1无法整除3而4的倍数减1可以整除3的特性

/\*\*
 \* @param {number} num
 \* @return {boolean}
 */
var isPowerOfFour = function(num) {
    return num > 0 && (num & (num - 1)) === 0 && (num - 1) % 3 === 0;
};

[345-Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/#/solutions)
------------------------------------------------------------------------------------------------------

方法一：利用二分法和替代数组

/\*\*
 \* @param {string} s
 \* @return {string}
 */
var reverseVowels = function(s) {
    if(s.length <= 1){return s;}
    var arr = \['a','e','i','o','u','A','E','I','O','U'\],
        res = new Array(s.length);
        left = 0,
        right = s.length -1;
    while(left<=right){
        if(arr.indexOf(s\[left\]) < 0){
            res\[left\] = s\[left\];
            left++;
        }
        if(arr.indexOf(s\[right\]) < 0){
            res\[right\] = s\[right\];
            right--;
        }
        if(arr.indexOf(s\[left\]) >=0 && arr.indexOf(s\[right\]) >=0){
            res\[left\] = s\[right\];
            res\[right\] = s\[left\];
            left++;
            right--;
        }
    }
    return res.join('');
};

[367-Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square/#/description)
--------------------------------------------------------------------------------------------

方法一：完全平方数一定是1+3+5+7……O(sqrt(N))

/\*\*
 \* @param {number} num
 \* @return {boolean}
 */
var isPerfectSquare = function(num) {
    if (num < 1) {return false;}
    for (var i = 1; num > 0; i += 2){
        num -= i;
    }
    return num === 0;
};

方法二：二分查找，O(logN)

/\*\*
 \* @param {number} num
 \* @return {boolean}
 */
var isPerfectSquare = function(num) {
    if (num < 1) {return false;}
    var left = 1, right = num;
    while (left <= right) {
        var mid = Math.floor(left + (right - left) / 2);
        var t = mid * mid;
        if (t > num) {
          right = mid - 1;
        } else if (t < num) {
          left = mid + 1;
        } else {
          return true;
        }
    }
    return false;
};

方法三：[牛顿迭代法](https://en.wikipedia.org/wiki/Integer_square_root#Using_only_integer_division)，O(1)

/\*\*
 \* @param {number} num
 \* @return {boolean}
 */
var isPerfectSquare = function(num) {
    if (num < 1) {return false;}
    var t = Math.floor(num / 2);
    while (t * t > num) {
        t = Math.floor((t + num / t) / 2);
    }
    return t * t == num || num === 1;
};

[27-Remove Element](https://leetcode.com/problems/remove-element/#/description)
-------------------------------------------------------------------------------

方法一：在获得剩余长度的同时生成新数组

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} val
 \* @return {number}
 */
var removeElement = function(nums, val) {
    var cnt = 0;
    for(var i = 0 ; i < nums.length ; ++i) {
        if(nums\[i\] == val)
            cnt++;
        else
            nums\[i-cnt\] = nums\[i\];
    }
    return nums.length-cnt;
};

方法二：既短又快

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} val
 \* @return {number}
 */
var removeElement = function(nums, val) {
    var l = nums.length;
    for (var i=0; i<l; i++) {
        if (nums\[i\] == val) {
            nums\[i--\] = nums\[l-- -1\];
        }
    }
    return l;
};

[101-Symmetric Tree](https://leetcode.com/problems/symmetric-tree/#/description)
--------------------------------------------------------------------------------

  方法一：通过另外一个方法判断其左右子树是否都是"镜像数"

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @return {boolean}
 */
var isSymmetric = function(root) {
    if(root===null) {return true;}
    return isMirror(root.left,root.right);
};

var isMirror = function(p,q){
    if(p===null && q===null) return true;
    if(p===null || q===null) return false;
    return (p.val==q.val) && isMirror(p.left,q.right) && isMirror(p.right,q.left);
};

方法二：通过队列（在js中通过数组模拟）

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @return {boolean}
 */
var isSymmetric = function(root) {
    var q = \[\];
    if(root === null) return true;
    q.push(root.left);
    q.push(root.right);
    while(q.length > 1){
        var left = q.shift(),
            right = q.shift();
        if(left=== null&& right === null) continue;
        if(left=== null ^ right === null) return false;
        if(left.val != right.val) return false;
        q.push(left.left);
        q.push(right.right);
        q.push(left.right);
        q.push(right.left);            
    }
    return true;
};

[66-Plus One](https://leetcode.com/problems/plus-one/#/description)
-------------------------------------------------------------------

方法一：从n-1开始遍历，然后用一个变量表示前面一位是否进位

/\*\*
 \* @param {number\[\]} digits
 \* @return {number\[\]}
 */
var plusOne = function(digits) {
    var j=0,k;
    for(var n=digits.length,i=n-1;i>=0;i--){
        k = i==n-1 ? 1:0;
        var old = digits\[i\];
        digits\[i\] = (old + j + k)%10;
        j = Math.floor((old + j + k)/10);
    }
    if(j == 1){
        digits.unshift(1);
    }
    return digits;
};

[118-Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/#/description)
-------------------------------------------------------------------------------------

方法一：单独用一个方法生成某一行，再push进数组

/\*\*
 \* @param {number} numRows
 \* @return {number\[\]\[\]}
 */
var generate = function(numRows) {
    var arr = \[\];
    for(var i=0;i<numRows;i++){
        var item = f(i+1);
        arr.push(item);
    }
    console.info(f(1));
    return arr;
};

var f = function(n){
    var a = new Array(n);
    if(n==1){return \[1\];}
    else if(n==2){return \[1,1\];}
    else{
        var arr = f(n-1);
        for(var i=0;i<n-1;i++){
            a\[i+1\] = arr\[i\]+arr\[i+1\];
        }
        a\[0\] = a\[n-1\] = 1;
        return a;
    }
};

方法二：直接对二维数组进行赋值

/\*\*
 \* @param {number} numRows
 \* @return {number\[\]\[\]}
 */
var generate = function(numRows) {
    var r = \[\];
    for(var k=0;k<numRows;k++){    
        r\[k\]= \[\];  
    }
    for (var i = 0; i < numRows; i++) {
        r\[i\]\[0\] = r\[i\]\[i\] = 1;
        for (var j = 1; j < i; j++){
            r\[i\]\[j\] = r\[i - 1\]\[j - 1\] + r\[i - 1\]\[j\];
        }
    }
    return r;
};

[434\. Number of Segments in a String](https://leetcode.com/problems/number-of-segments-in-a-string/#/description)
------------------------------------------------------------------------------------------------------------------

方法一：先去掉首尾空格再将非空格替换成空字符

/\*\*
 \* @param {string} s
 \* @return {number}
 */
var countSegments = function(s) {
    var str = s.replace(/^\\s+|\\s+$/g,'');
    return str.length === 0 ? 0 : str.replace(/\\s+/g,' ').replace(/\\S/g,'').length +1;
};

方法二：先在首尾加一个空格，然后将非空格替换成空字符

/\*\*
 \* @param {string} s
 \* @return {number}
 */
var countSegments = function(s) {
    return (" " + s + " ").replace(/\\s+/g,' ').replace(/\\S/g,'').length - 1;
};

[110\. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/#/description)
----------------------------------------------------------------------------------------------

方法一：某节点的高度等于该节点的左子树和右子树的高度中的较大值再加一，O(N^2)

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @return {boolean}
 */
var isBalanced = function(root) {
    if (root === null) return true;
    var left=depth(root.left);
    var right=depth(root.right);
    return Math.abs(left - right) <= 1 && isBalanced(root.left) && isBalanced(root.right);
};

var depth = function(root){
    if (root === null) return 0;
    return Math.max(depth(root.left), depth (root.right)) + 1;
};

方法二：从底部向上遍历，O(N)

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @return {boolean}
 */
var isBalanced = function(root) {
    return dfsHeight(root) != -1;
};

var dfsHeight = function(root) {
    if (root === null) return 0;
    var leftHeight = dfsHeight (root.left);
    if (leftHeight == -1) return -1;
    var rightHeight = dfsHeight(root.right);
    if (rightHeight == -1) return -1;
    if (Math.abs(leftHeight - rightHeight) > 1)  return -1;
    return Math.max(leftHeight, rightHeight) + 1;
};

[257-Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/#/description)
--------------------------------------------------------------------------------------

暂无

[441-Arranging Coins](https://leetcode.com/problems/arranging-coins/#/description)
----------------------------------------------------------------------------------

方法一：根据公式直接求解(x * ( x + 1)) / 2 <= n

/\*\*
 \* @param {number} n
 \* @return {number}
 */
var arrangeCoins = function(n) {
    return Math.floor(((-1 + Math.sqrt(1 + 8 *n)) / 2));
};

方法二：先根据根值确定大致范围，然后二分查找

/\*\*
 \* @param {number} n
 \* @return {number}
 */
var arrangeCoins = function(n) {
    var start = 0,
        end = n,
        mid = 0;
    while (start <= end){
        mid = (start + end) >>> 1;
        if ((0.5 * mid * mid + 0.5 * mid ) <= n){
            start = mid + 1;
        }else{
            end = mid - 1;
        }
    }
    return start - 1;
};

[119-Pascal's Triangle II](https://leetcode.com/problems/pascals-triangle-ii/#/description)
-------------------------------------------------------------------------------------------

方法一：递归，直接计算

/\*\*
 \* @param {number} rowIndex
 \* @return {number\[\]}
 */
var getRow = function(rowIndex) {
    var A = \[\];
    A\[0\] = 1;
    for(var i=1; i<rowIndex+1; i++){
        for(var j=i; j>=1; j--){
            if(isNaN(A\[j\])){
                A\[j\] = 0;
            }
            if(isNaN(A\[j-1\])){
                A\[j-1\] = 0;
            }
            A\[j\] += A\[j-1\];
        }
    }     
    return A;
};

方法二：根据公式a(k+1) = a(k) * (n-k)/(k+1)，其中a(0)=1和a(1)=n很容易发现

/\*\*
 \* @param {number} rowIndex
 \* @return {number\[\]}
 */
var getRow = function(rowIndex) {
    if(rowIndex === 0) {return \[1\];}  
    var A=\[\];  
    A\[0\]=1;  
    A\[1\]=rowIndex;  
    for(var i=2;i<=rowIndex;i++) {  
        A\[i\]=Math.floor(A\[i-1\]*(rowIndex-(i-1))/i); //in case of overflow  
    }  
    return A; 
};

[232-Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/#/description)
------------------------------------------------------------------------------------------------------------

参见我的另外一篇文章：[JS实现复杂数据结构](https://merrier.wang/?p=319)

[141-Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/#/description)
--------------------------------------------------------------------------------------

方法一：一个快指针，一个慢指针

/\*\*
 \* Definition for singly-linked list.
 \* function ListNode(val) {
 \*     this.val = val;
 \*     this.next = null;
 \* }
 \*/

/\*\*
 \* @param {ListNode} head
 \* @return {boolean}
 */
var hasCycle = function(head) {
    if(head===null) return false;
    var walker = head,runner = head;
    while(runner.next!==null && runner.next.next!==null) {
        walker = walker.next;
        runner = runner.next.next;
        if(walker==runner) return true;
    }
    return false;
};

[26-Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/#/description)
-------------------------------------------------------------------------------------------------------------------------

方法一：遇到不同的元素时才进行赋值

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length===0) return 0;
    var j=0;
    for (var i=0; i<nums.length; i++)
        if (nums\[i\]!=nums\[j\]) nums\[++j\]=nums\[i\];
    return ++j;
};

方法二：用一个变量记录当前重复元素数量

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var removeDuplicates = function(nums) {
    var count = 0;
    for(var i = 1; i < nums.length; i++){
        if(nums\[i\] == nums\[i-1\]) count++;
        else nums\[i-count\] = nums\[i\];
    }
    return nums.length-count;
};

[172-Factorial Trailing Zeroes](https://leetcode.com/problems/factorial-trailing-zeroes/#/description)
------------------------------------------------------------------------------------------------------

方法一：产生0的可能性只有2*5，所以需要计算n！里有几个5，2是足够多的

/\*\*
 \* @param {number} n
 \* @return {number}
 */
var trailingZeroes = function(n) {
    return n === 0 ? 0 : Math.floor(n / 5) + trailingZeroes(n / 5);
};

[9-Palindrome Number](https://leetcode.com/problems/palindrome-number/#/description)
------------------------------------------------------------------------------------

方法一：二分查找

/\*\*
 \* @param {number} x
 \* @return {boolean}
 */
var isPalindrome = function(x) {
    var str = "" + x,left=0,right=str.length-1;
    while(right-left>=1){
        if(str\[left\] == str\[right\]){
            left++;
            right--;
        }else{
            return false;
        }
    }
    return true;
};

方法二：比较前一半数字和后一半数字是否相等

/\*\*
 \* @param {number} x
 \* @return {boolean}
 */
var isPalindrome = function(x) {
    if (x<0 || (x!==0 && x%10===0)) return false;
    var rev = 0;
    while (x>rev){
    	rev = rev*10 + x%10;
    	x = Math.floor(x/10);
    }
    return (x==rev || x==Math.floor(rev/10));
};

[374-Guess Number Higher or Lower](https://leetcode.com/problems/guess-number-higher-or-lower/#/description)
------------------------------------------------------------------------------------------------------------

方法一：二分查找（这道题不能用js，所以答案并没有在leetcode上验证）

// Forward declaration of guess API.
// @param n, your guess
// @return -1 if my number is lower, 1 if my number is higher, otherwise return 0
var guessNumber = function(n){
    var low = 1;
    while(low <= n){
        var mid = Math.floor(low + (n-low) / 2);
        var res = guess(mid);
        if(res == 0)
            return mid;
        else if(res == -1)
            n = mid - 1;
        else
        low = mid + 1;
    }
    return -1;
}

[438-Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/#/description)
--------------------------------------------------------------------------------------------------------------

暂无

[112-Path Sum](https://leetcode.com/problems/path-sum/#/description)
--------------------------------------------------------------------

方法一：知道sum和root.val，看左子树或右子树是否能够满足sum-root.val

/\*\*
 \* Definition for a binary tree node.
 \* function TreeNode(val) {
 \*     this.val = val;
 \*     this.left = this.right = null;
 \* }
 \*/
/\*\*
 \* @param {TreeNode} root
 \* @param {number} sum
 \* @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if (root === null) return false;
    if (root.val == sum && root.left === null && root.right === null) return true;
    return hasPathSum(root.left, sum-root.val) || hasPathSum(root.right, sum-root.val);
};

[38-Count and Say](https://leetcode.com/problems/count-and-say/#/description)
-----------------------------------------------------------------------------

/\*\*
 \* @param {number} n
 \* @return {string}
 */
var countAndSay = function(n) {
    if(n == 1) {return '1';}
    else{
        var s = countAndSay(n-1),res='',a=1;
        for(var i=0,len=s.length;i<len;i++){
            if(s\[i+1\] == s\[i\]){
                a++;
            }else{
                res += a + s\[i\];
                a=1;
            }
        }
        return res;
    }
};

[250-Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/#/solutions)
--------------------------------------------------------------------------------------

方法一：用哈希表判断重复出现的位置

/\*\*
 \* @param {string} s
 \* @param {string} t
 \* @return {boolean}
 */
var isIsomorphic = function(s, t) {
    return phic(s,t) && phic(t,s);
};

var phic = function(s,t){
    var arr = \[\];
    for(var i=0,n=s.length;i<n;i++){
        var code = s\[i\].charCodeAt() - 65;
        if(arr\[code\] === undefined){
            arr\[code\] = i;
        }else{
            if(t\[i\] != t\[arr\[code\]\]){
                return false;
            }
        }
    }
    return true;
};

方法二：用一个数组保存重复元素第一次出现的位置

/\*\*
 \* @param {string} s
 \* @param {string} t
 \* @return {boolean}
 */
var isIsomorphic = function(s, t) {
    var m = \[\];
    for (var i = 0; i < s.length; i++) {
        if (m\[s.charCodeAt(i)\] != m\[t.charCodeAt(i)+256\]) {return false;}
        m\[s.charCodeAt(i)\] = m\[t.charCodeAt(i)+256\] = i+1;
    }
    return true;
};

[20-Valid Parentheses](https://leetcode.com/problems/valid-parentheses/#/description)
-------------------------------------------------------------------------------------

/\*\*
 \* @param {string} s
 \* @return {boolean}
 */
var isValid = function(s) {
    var p = \[\];
    for(var i = 0; i < s.length; i++) {
        var q = "(){}\[\]".indexOf(s.substring(i, i + 1));
        if(q % 2 == 1) {
            if(p.length === 0 || p.shift() != q - 1) return false;
        } else p.unshift(q);
    }
    return !p.length;
};

[111-Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/#/description)
------------------------------------------------------------------------------------------------------------

方法一：We need to add the smaller one of the child depths - except if that's zero, then add the larger one.

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
var minDepth = function(root) {
    if (!root) return 0;
    var L = minDepth(root.left), R = minDepth(root.right);
    return 1 + (Math.min(L, R) || Math.max(L, R));
};

[290-Word Pattern](https://leetcode.com/problems/word-pattern/#/description)
----------------------------------------------------------------------------

/\*\*
 \* @param {string} pattern
 \* @param {string} str
 \* @return {boolean}
 */
var wordPattern = function(pattern, str) {
    var arr = str.split(" "),mid = \[\];
    
    for(var i=0,n=pattern.length;i<n;i++){
        var char = pattern\[i\].charCodeAt() - 97;
        if(mid\[char\] === undefined){
            if(inArray(arr\[i\],mid)){
                return false;
            }else{
                mid\[char\] = arr\[i\];
            }
        }else{
            if(mid\[char\] != arr\[i\]){
                return false;
            }
        }
    }
    return true && (pattern.length == arr.length);
};


var inArray = function(item,arr) {
    for(var i=0,n=arr.length;i<n;i++){
        if(arr\[i\] === item){
            return true;
        }
    }
    return false;
};

[234-Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/#/description)
------------------------------------------------------------------------------------------------

/\*\*
 \* Definition for singly-linked list.
 \* function ListNode(val) {
 \*     this.val = val;
 \*     this.next = null;
 \* }
 \*/
/\*\*
 \* @param {ListNode} head
 \* @return {boolean}
 */
var isPalindrome = function(head) {
    if(head === null) {
        return true;
    }
    var p1 = head,p2 = head,p3 = p1.next,pre = p1;
    //find mid pointer, and reverse head half part
    while(p2.next !== null && p2.next.next !== null) {
        p2 = p2.next.next;
        pre = p1;
        p1 = p3;
        p3 = p3.next;
        p1.next = pre;
    }
    //odd number of elements, need left move p1 one step
    if(p2.next === null) {
        p1 = p1.next;
    }
    else {   //even number of elements, do nothing
    }
    //compare from mid to head/tail
    while(p3 !== null) {
        if(p1.val != p3.val) {
            return false;
        }
        p1 = p1.next;
        p3 = p3.next;
    }
    return true;
};

[1.Two Sum](https://leetcode.com/problems/two-sum/#/description)
----------------------------------------------------------------

方法一：双层循环（其实应该用哈希表，但是js中没有，需要额外实现）

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} target
 \* @return {number\[\]}
 */
var twoSum = function(nums, target) {
    for(var i=0,n=nums.length;i<n;i++){
        for(var j=i+1;j<n;j++){
            if((nums\[i\] + nums\[j\]) == target){
                return \[i,j\];
            }
        }
    }
    return false;
};

[219-Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/#/description)
----------------------------------------------------------------------------------------------

方法一：只要读懂题意就差不多了，哈希表及时更新

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} k
 \* @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    var arr = \[\],res = false;
    for(var i=0,n=nums.length;i<n;i++){
        var item = nums\[i\];
        if(arr\[item\] === undefined){
            arr\[item\] = i;
        }else{
            if(Math.abs(arr\[item\] - i) <= k){
                return true;
            }
            arr\[item\] = i;
        }
    }
    return false;
};

[225-Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/#/description)
------------------------------------------------------------------------------------------------------------

参考我的另一篇文章[JS实现复杂数据结构](https://merrier.wang/?p=319)

[88.Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/#/description)
---------------------------------------------------------------------------------------

方法一：模仿归并排序，从后往前比较

/\*\*
 \* @param {number\[\]} nums1
 \* @param {number} m
 \* @param {number\[\]} nums2
 \* @param {number} n
 \* @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    while(n>0) nums1\[m+n-1\] = (m===0||nums2\[n-1\] > nums1\[m-1\]) ? nums2\[--n\] : nums1\[--m\];
};

[203-Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/#/solutions)
--------------------------------------------------------------------------------------------------------

方法一：递归

/\*\*
 \* Definition for singly-linked list.
 \* function ListNode(val) {
 \*     this.val = val;
 \*     this.next = null;
 \* }
 \*/
/\*\*
 \* @param {ListNode} head
 \* @param {number} val
 \* @return {ListNode}
 */
var removeElements = function(head, val) {
    if (head === null) return null;
    head.next = removeElements(head.next, val);
    return head.val == val ? head.next : head;
};

[58.Length of Last Word](https://leetcode.com/problems/length-of-last-word/#/description)
-----------------------------------------------------------------------------------------

方法一：利用split，需要提前去掉前后空格

/\*\*
 \* @param {string} s
 \* @return {number}
 */
var lengthOfLastWord = function(s) {
    return  s.replace(/^\\s+|\\s+$/g,'').split(' ')\[s.replace(/^\\s+|\\s+$/g,'').split(' ').length - 1\].length;
};

[507-Perfect Number](https://leetcode.com/problems/perfect-number/#/solutions)
------------------------------------------------------------------------------

方法一：先求根值，因为根值是遍历的界限

/\*\*
 \* @param {number} num
 \* @return {boolean}
 */
var checkPerfectNumber = function(num) {
    var sqrt = Math.sqrt(num),res = 0;
    for(var i=1;i<=sqrt;i++){
        if(num%i === 0){
            res += i+ num/i;
        }
    }
    console.info(res);
    return num>1 && res==2*num;
};

[67-Add Binary](https://leetcode.com/problems/add-binary/#/description)
-----------------------------------------------------------------------

方法一：对两个字符串循环遍历，同时用一个变量保存进位情况

/\*\*
 \* @param {string} a
 \* @param {string} b
 \* @return {string}
 */
var addBinary = function(a, b) {
    var s = "";
    var c = 0, i = a.length - 1, j = b.length - 1;
    while(i >= 0 || j >= 0 || c == 1)
    {
        c += i >= 0 ? a\[i --\] - '0' : 0;
        c += j >= 0 ? b\[j --\] - '0' : 0;
        s = c % 2 + s;
        c = Math.floor(c / 2);
    }
    return s;
};

[14-Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/#/description)
---------------------------------------------------------------------------------------------

方法一：对数组进行遍历，用indexOf判断字符串的前缀

/\*\*
 \* @param {string\[\]} strs
 \* @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs === null || strs.length === 0)    return "";
    var pre = strs\[0\],i = 1;
    while(i < strs.length){
        while(strs\[i\].indexOf(pre) !== 0){
            pre = pre.substring(0,pre.length-1);
        }
        i++;
    }
    return pre;
};

[160-Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/#/description)
--------------------------------------------------------------------------------------------------------------------

方法一：用两个指针进行遍历，循环结束条件为指针相等

/\*\*
 \* Definition for singly-linked list.
 \* function ListNode(val) {
 \*     this.val = val;
 \*     this.next = null;
 \* }
 \*/

/\*\*
 \* @param {ListNode} headA
 \* @param {ListNode} headB
 \* @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    var cur1 = headA,cur2 = headB;
    while(cur1 != cur2){
        cur1 = cur1?cur1.next:headB;
        cur2 = cur2?cur2.next:headA;
    }
    return cur1;
};

[400-Nth Digit](https://leetcode.com/problems/nth-digit/#/description)
----------------------------------------------------------------------

方法一：步骤为：确定数字是几位数->确定具体数字->返回这个数字的第几位数

/\*\*
 \* @param {number} n
 \* @return {number}
 */
var findNthDigit = function(n) {
    n -= 1;
    var digits = 1, first = 1;
    while (Math.floor(n / 9 / first / digits) >= 1) {
        n -= 9 * first * digits;
        digits++;
        first *= 10;
    }
    return (first + Math.floor(n/digits) + "").charAt(n%digits) - '0';
};

**[475\. Heaters](https://leetcode.com/problems/heaters/#/description)**
------------------------------------------------------------------------

方法一：在对房子进行循环的过程中移动加热器的指针

/\*\*
 \* @param {number\[\]} houses
 \* @param {number\[\]} heaters
 \* @return {number}
 */
var findRadius = function(houses, heaters) {
    var house = houses.sort(function(a,b){return a-b;}),
        heater= heaters.sort(function(a,b){return a-b;}),
        i = 0, 
        res = 0;
    for (var j=0,n=house.length;j<n;j++) {
        while (i < heater.length - 1 && heater\[i\] + heater\[i + 1\] <= house\[j\] * 2) {
            i++;
        }
        res = Math.max(res, Math.abs(heater\[i\] - house\[j\]));
    }
    return res;
};

[190-Reverse Bits](https://leetcode.com/problems/reverse-bits/#/description)
----------------------------------------------------------------------------

方法一：利用数组的reverse()进行反转

/\*\*
 \* @param {number} n - a positive integer
 \* @return {number} - a positive integer
 */
var reverseBits = function(n) {
    var zero = 32- n.toString(2).length;
    var bit = n.toString(2).split("").reverse().join("");
    while(zero>0){
        bit += '0';
        zero--;
    }
    return parseInt(bit,2);
};

[303-Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/#/description)
--------------------------------------------------------------------------------------------------------

方法一：用一个数组保存前面元素之和

/\*\*
 \* @param {number\[\]} nums
 */
var NumArray = function(nums) {
    for(var i = 1; i < nums.length; i++)
        nums\[i\] += nums\[i - 1\];
    
    this.nums = nums;
};

/\*\* 
 \* @param {number} i 
 \* @param {number} j
 \* @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    if(i === 0) {return this.nums\[j\];}
    return this.nums\[j\] - this.nums\[i - 1\];
};

/\*\* 
 \* Your NumArray object will be instantiated and called as such:
 \* var obj = Object.create(NumArray).createNew(nums)
 \* var param_1 = obj.sumRange(i,j)
 */

[28-Implement strStr()](https://leetcode.com/problems/implement-strstr/#/description)
-------------------------------------------------------------------------------------

方法一：利用js中的indexOf()

/\*\*
 \* @param {string} haystack
 \* @param {string} needle
 \* @return {number}
 */
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle);
};

方法二：老老实实遍历

/\*\*
 \* @param {string} haystack
 \* @param {string} needle
 \* @return {number}
 */
var strStr = function(haystack, needle) {
    for (var i = 0; ; i++) {
    for (var j = 0; ; j++) {
      if (j == needle.length) return i;
      if (i + j == haystack.length) return -1;
      if (needle.charAt(j) != haystack.charAt(i + j)) break;
    }
  }
};

[69-Sqrt(x)](https://leetcode.com/problems/sqrtx/#/description)
---------------------------------------------------------------

方法一：从x/2开始遍历（复杂度高，而且有可能会超时，不建议这种方法）

/\*\*
 \* @param {number} x
 \* @return {number}
 */
var mySqrt = function(x) {
    var t = Math.floor(x/2);  
    while(t*t>x && t>=0){
        t--;
    }
    return x==1 ? 1 : t;
};

方法二：二分查找

/\*\*
 \* @param {number} x
 \* @return {number}
 */
var mySqrt = function(x) {
    var begin = 0,end = x,result = 1,mid = 1;  
    while(Math.abs(result-x) > 0.000001){  
        mid = (begin+end)/2;  
        result = mid*mid;  
        if(result > x)   {end = mid;}
        else {begin = mid; }
    }  
    return Math.floor(mid);
};

方法三：[牛顿迭代法](https://www.zhihu.com/question/20690553)

/\*\*
 \* @param {number} x
 \* @return {number}
 */
var mySqrt = function(x) {
    r = x;
    while (r*r > x)
        r = ((r + x/r) / 2) | 0;
    return r;
};

[155-Min Stack](https://leetcode.com/problems/min-stack/#/description)
----------------------------------------------------------------------

参考我的另一篇文章[JS实现复杂数据结构](https://merrier.wang/?p=319)

[414-Third Maximum Number](https://leetcode.com/problems/third-maximum-number/#/description)
--------------------------------------------------------------------------------------------

方法一：遍历比较

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var thirdMax = function(nums) {
    var max1 = null,max2 = null,max3 = null;
    for (var i=0,len=nums.length;i<len;i++) {
        var n = nums\[i\];
        if (n == max1 || n == max2 || n == max3) continue;
        if (max1 === null || n > max1) {
            max3 = max2;
            max2 = max1;
            max1 = n;
        } else if (max2 === null || n > max2) {
            max3 = max2;
            max2 = n;
        } else if (max3 === null || n > max3) {
            max3 = n;
        }
    }
    return max3 === null ? max1 : max3;
};

方法二：先将数组排序再遍历

/\*\*
 \* @param {number\[\]} nums
 \* @return {number}
 */
var thirdMax = function(nums) {
    nums.sort(function(a,b){
        return b-a;
    });
    max1 = nums\[0\],i = 1,j=1;
    while(nums\[i\] == max1&&nums\[i\] !== undefined){
        i++;
        j++;
    }
    max2 = nums\[i\];
    while(nums\[j\] == max2&&nums\[j\] !== undefined){
        j++;
    }
    max3 = nums\[j\];
    return max3 === undefined ? max1 : max3;
};

[532-K-diff Pairs in an Array](https://leetcode.com/problems/k-diff-pairs-in-an-array/#/description)
----------------------------------------------------------------------------------------------------

方法一：两个指针，一个指针用来遍历，另一个指针用来寻找对应数字

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} k
 \* @return {number}
 */
var findPairs = function(nums, k) {
    var ans = 0;
    nums.sort(function(a,b){
        return a-b;
    });
    for (var i = 0, j = 0; i < nums.length; i++) {
        for (j = Math.max(j, i + 1); j < nums.length && nums\[j\] - nums\[i\] < k; j++) ;
        if (j < nums.length &&  nums\[j\] - nums\[i\] == k) ans++;
        while (i + 1 < nums.length && nums\[i\] == nums\[i + 1\]) {i++;}
    }
    return ans;
};

[204-Count Primes](https://leetcode.com/problems/count-primes/#/description)
----------------------------------------------------------------------------

方法一：质数（素数）判断思路->对正整数n，如果用2到根号n之间的所有整数去除，均无法整除，则n为质数

/\*\*
 \* @param {number} n
 \* @return {number}
 */
var countPrimes = function(n) {
    if (n < 3) return 0;
    var f = \[\],count = Math.floor(n / 2);
    for (var i = 3; i * i < n; i += 2) {
        if (f\[i\]) {continue;}
        for (var j = i * i; j < n; j += 2 * i) {
            if (!f\[j\]) {
                --count;
                f\[j\] = true;
            }
        }
    }
    return count;
};

[125-Valid Palindrome](https://leetcode.com/problems/valid-palindrome/#/description)
------------------------------------------------------------------------------------

方法一：二分查找

/\*\*
 \* @param {string} s
 \* @return {boolean}
 */
var isPalindrome = function(s) {
    if(s === ''){return true;}
    var low = s.replace(/\\W/g,'').toLowerCase();
    console.log(low);
    var left=0,right=low.length-1;
    while(left<=right){
        if(low\[left\] != low\[right\]){
            return false;
        }
        left++;
        right--;
    }
    return true;
};

[168-Excel Sheet Column Title](https://leetcode.com/problems/excel-sheet-column-title/#/description)
----------------------------------------------------------------------------------------------------

方法一：利用ASCII码进行递归，为了让余数为0-25，需要每次递归前将n减1

/\*\*
 \* @param {number} n
 \* @return {string}
 */
var convertToTitle = function(n) {
    var res = '';
    while(n>0){
        n--;
        res =  String.fromCharCode(n % 26 + 65)+res;
        n = Math.floor(n/26);
    }
    return res;
};

[278-First Bad Version](https://leetcode.com/problems/first-bad-version/#/description)
--------------------------------------------------------------------------------------

方法一：很常用的二分查找

/\*\*
 \* Definition for isBadVersion()
 \* 
 \* @param {integer} version number
 \* @return {boolean} whether the version is bad
 \* isBadVersion = function(version) {
 \*     ...
 \* };
 \*/

/\*\*
 \* @param {function} isBadVersion()
 \* @return {function}
 */
var solution = function(isBadVersion) {
    /\*\*
     \* @param {integer} n Total versions
     \* @return {integer} The first bad version
     */
    return function(n) {
        var left = 1,right=n;
        while(left<right){
            min = Math.floor((left+right)/2);
            if(isBadVersion(min)){
                right = min;
            }else{
                left=min+1;
            }
        }
        return left;
    };
};

[7-Reverse Integer](https://leetcode.com/problems/reverse-integer/#/description)
--------------------------------------------------------------------------------

方法一：利用数组的reverse()方法，需要注意的是符号位和int型溢出的处理

/\*\*
 \* @param {number} x
 \* @return {number}
 */
var reverse = function(x) {
    var res = Math.floor(('' + Math.abs(x)).split('').reverse().join().replace(/,/g,''));
    if(res > (Math.pow(2,31)-1)){
        return 0;
    }
    return x>0 ? res : 0- res;
};

方法二：利用数学计算进行反转

/\*\*
 \* @param {number} x
 \* @return {number}
 */
var reverse = function(x) {
    var rev= 0,pos = Math.abs(x);
    while( pos !== 0){
        rev= rev*10 + pos % 10;
        pos= Math.floor(pos/10);
        if(Math.abs(rev)>Math.pow(2,31)-1) return 0;
    }
    return x>0 ? Math.floor(rev) : 0- Math.floor(rev);
};

[189-Rotate Array](https://leetcode.com/problems/rotate-array/#/description)
----------------------------------------------------------------------------

方法一：利用数组的pop()和unshift()方法

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} k
 \* @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    var len = nums.length;
    while(k>0){
        nums.unshift(nums.pop());
        k--;
    }
};

方法二：三次反转

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} k
 \* @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
};

var reverse = function(nums,start,end) {
    while (start < end) {
        var temp = nums\[start\];
        nums\[start\] = nums\[end\];
        nums\[end\] = temp;
        start++;
        end--;
    }
};

方法三：非常巧妙的一种方式，看不懂的可以[点击这里](https://discuss.leetcode.com/topic/11349/my-three-way-to-solve-this-problem-the-first-way-is-interesting-java)看作者的解释

/\*\*
 \* @param {number\[\]} nums
 \* @param {number} k
 \* @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    if(nums.length <= 1){
        return;
    }
    //step each time to move
    var step = k % nums.length;
    //find GCD between nums length and step
    var gcd = findGcd(nums.length, step),position, count;
    //gcd path to finish movie
    for(var i = 0; i < gcd; i++){
        //beginning position of each path
        position = i;
        //count is the number we need swap each path
        count = Math.floor(nums.length / gcd) - 1;
        for(var j = 0; j < count; j++){
            position = (position + step) % nums.length;
            //swap index value in index i and position
            nums\[i\] ^= nums\[position\];
            nums\[position\] ^= nums\[i\];
            nums\[i\] ^= nums\[position\];
        }
    }
};

var findGcd = function(a,b){
    return (a === 0 || b === 0) ? a + b : findGcd(b, a % b);
};