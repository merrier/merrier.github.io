---
title: 与MySQL的零距离接触
urlname: zero-distance-contact-with-mysql
tags:
  - mysql
  - 数据库
id: 810
categories:
  - MySQL
  - 慕课网
  - 数据结构
date: 2017-05-09 10:02:40
---

MySQL基础
=======

由瑞典MySQL AB公司开发，目前属于Oracle公司 MySQL是一个开源的**关系型**数据库管理系统 分为社区版和企业版

MySQL一些常用参数
===========

mysql 参数 \[table id=24 /\]

MySQL退出
-------

*   mysql > exit;
*   mysql > quit;
*   mysql > \\q;

修改MySQL提示符
----------

连接客户端时通过参数指定：shell>mysql -uroot -proot --prompt 提示符 连接上客户端后，通过prompt命令修改：mysql>prompt 提示符 MySQL提示符修改时可以用到的一些参数： \[table id=25 /\] ![](/images/hexo_post_207.png)      

修改数据表的默认存储引擎
------------

找到MySQL配置文件：default-storage-engine=INNODB 修改完之后需要重启MySQL

MySQL语句的规范
==========

*   关键字与函数名称全部大写
*   数据库名称、表名称、字段名称全部小写
*   SQL语句必须以分号结尾

数据类型
====

1.  字符型
2.  整型
3.  浮点型
4.  日期时间型

MySQL常用命令
=========

*   显示当前服务器版本：SELECT VERSION();
*   显示当前日期时间：SELECT NOW();
*   显示当前用户：SELECT USER();

创建数据库
-----

*   |：表示可以互换的两项
*   \[\]：表示可选项
*   {}：表示必选项

> CREATE {DATABASE | SCHEMA} \[IF NOT EXISTS\] db\_name \[DEFAULT\] CHARACTER SET \[=\] charset\_name

DATABASE | SCHEMA：这两个完全相同，任选其一即可 IF NOT EXISTS：可选项，如果存在就不创建，不存在才会创建 CHARACTER：设置编码格式，例如utf-8，gbk

查看当前服务器下的数据表列表
--------------

> SHOW {DATABASES | SCHEMAS} \[LIKE 'pattern' | WHERE expr\]

修改数据库
-----

> ALTER {DATABASE | SCHEMA} \[db\_name\] \[DEFAULT\] CHARACTER SET \[=\] charset\_name

通过以上语句可以修改某个数据库的编码格式

删除数据库
-----

> DROP {DATABASE | SCHEMA} \[IF EXISTS\] db_name

打开数据库
-----

> USE db_name

创建数据表
-----

> CREATE TABLE \[IF NOT EXISTS\] table\_name( column\_name data_type, .... )

查看数据表列表
-------

> SHOW TABLES \[FROM db_name\] \[LIKE 'pattern' | WHERE expr\]

FROM db_name：不仅可以查看当前数据库中的数据表，还可以查看其他数据库中的数据表

查看数据表结构
-------

> SHOW COLUMNS FROM tbl_name

tbl_name：数据表的名称

插入记录
----

> INSERT \[INFO\] tbl\_name \[(col\_name,...)\] VALUES(val,...)

如果省略col_name(列名称)，就必须为所有字段都赋值

记录查找
----

> SELECT expr,... FROM tbl_name

expr：表达式

字段属性设置
======

空值与非空
-----

*   NULL：字段值可以为空（默认值）
*   NOT NULL：字段值禁止为空

CREATE TABLE tbl_name(username VARCHAR(20) NOT NULL,age TINYINT UNSIGNED NULL); ![](/images/hexo_post_208.png)

表级约束与列级约束
---------

对一个数据列建立的约束，称为列级约束 对多个数据列建立的约束，称为表级约束 列级约束既可以在列定义时声明，也可以在列定义后声明 表级约束只能在列定义后声明

主键约束
----

PRIMARY KEY：每张数据表只能存在一个主键，主键保证记录的唯一性，主键自动为NOT NULL 主键不一定和下面的自动编号一起使用，但是不能赋相同的值

自动编号
----

AUTO_INCREMENT：必须与主键组合使用，默认情况下，起始值为1，每次的增量为1 该字段的数据类型必须为数字，如果是浮点数必须小数位数为0

唯一约束
----

UNIQUE KEY：可以保证记录的唯一性，字段可以为空值（NULL），每张数据表可以存在多个唯一约束

默认约束
----

DEFAULT：当插入记录时，如果没有明确为字段赋值，则自动赋予默认值 sex enum('1','2','3') DEFAULT '3'

外键约束
----

FOREIGN KEY：保持数据一致性和完整性，实现一对一或一对多关系

### 外键约束的要求

1.  父表和子表必须使用相同的存储引擎，而且禁止使用临时表
2.  数据表的存储引擎只能为InnoDB
3.  外键列和参照列必须具有相似的数据类型，其中数字的长度或是否有符号位必须相同；而字符的长度则可以不同
4.  外键列和参照列必须创建索引，如果外键列不存在索引的话，MySQL将自动创建索引

### 外键约束的参照操作

1.  CASCADE：从父表删除或更新且自动删除或更新子表中匹配的行
2.  SET NULL：从父表删除或更新行，并设置子表中的外键列为NULL。如果使用该选项，必须保证子表列没有指定NOT NULL
3.  RESTRICT：拒绝对父表的删除或更新操作
4.  NO ACTION：标准SQL的关键字，在MySQL中与RESTRICT相同

pid INT,FOREIGN KEY (pid) REFERENCES provinces (id) ON DELETE CASCADE=>pid为外键约束，参照数据表provinces中的id字段；并且删除时的参照操作为CASCADE

修改数据表
=====

添加单列
----

> ALTER TABLE tbl\_name ADD \[COLUMN\] col\_name column\_definition \[FIRST | AFTER col\_name\]

FIRST：新添加的列将置于最前面 AFTER col_name：新添加的列将置于某一列后面 如果省略以上两项，新添加的列将位于所有列最后面

添加多列
----

> ALTER TABLE tbl\_name ADD \[COLUMN\] (col\_name column_definition,...)

添加多列时无法指定位置，只能位于最后面

删除列
---

> ALTER TABLE tbl\_name DROP \[COLUMN\] col\_name

ALTER TABLE tbl_name DROP age,DROP password=>可以同时删除age列和password列

添加约束
----

### 添加主键约束

> ALTER TABLE tbl\_name ADD \[CONSTRAINT \[symbol\] \] PRIMARY KEY \[index\_type\] (index\_col\_name,...)

### 添加唯一约束

> ALTER TABLE tbl\_name ADD \[CONSTRAINT \[symbol\] \] UNIQUE \[INDEX | KEY\] \[index\_name\] \[index\_type\] (index\_col_name,...)

唯一约束可以给多列添加

### 添加外键约束

> ALTER TABLE tbl\_name ADD \[CONSTRAINT \[symbol\] \] FOREIGN KEY \[index\_name\] (index\_col\_name,...) reference_definition

### 添加/删除默认约束

> ALTER TABLE tbl\_name ALTER \[COLUMN\] col\_name {SET DEFAULT literal | DROP DEFAULT}

SET DEFAULT literal：添加默认约束 DROP DEFAULT：删除默认约束

删除约束
----

### 删除主键约束

> ALTER TABLE tbl_name DROP PRIMARY KEY

### 删除唯一约束

> ALTER TABLE tbl\_name DROP {INDEX | KEY} index\_name

一张表可以有多个唯一约束，所以需要查看约束的名字=>SHOW INDEXES FROM tbl_name \[\\G\];

### 删除外键约束

> ALTER TABLE tbl\_name DROP FOREIGN KEY fk\_symbol

fk_symbol：约束的名字，需要提前查看=>SHOW CREATE tbl_name

修改列定义
-----

> ALTER TABLE tbl\_name MODIFY \[COLUMN\] col\_name column\_definition \[FIRST | AFTER col\_name\]

可以修改数据类型以及数据列的位置

修改列名称
-----

> ALTER TABLE tbl\_name CHANGE \[COLUMN\] old\_col\_name new\_col\_name column\_definition \[FIRST | AFTER col_name\]

修改列名称的同时也可以修改列类型和位置，所以其功能要强大于修改列定义

数据表更名
-----

尽量少更改数据表和数据列名字，因为如果创建过索引和约束，会影响到正常使用

### 方法1

> ALTER TABLE tbl\_name RENAME \[TO | AS\] new\_tbl_name

### 方法2

> RENAME TABLE tbl\_name TO new\_tbl\_name \[,tbl\_name2 TO new\_tbl\_name2\] ...

总结
--

![](/images/hexo_post_209.png)

记录操作
====

插入记录
----

### 第一种

> INSERT \[INTO\] tbl\_name \[(col\_name,...)\] {VALUES | VALUE} ({expr | DEFAULT},...},(...),...

可以插入一条记录，也可以插入多条记录 INSERT users VALUES(NULL,'John','456',25,1);=>NULL为空值，也可以为自增字段赋值（DEFAULT也可以） INSERT users VALUES(DEFAULT,'Tom','123',3*7-5,1),(NULL,'Rose',md5('123'),DEFAULT,0);=>插入多条记录，可以用表达式，也可以用函数、NULL、DEFAULT

### 第二种

> INSERT \[INTO\] tbl\_name SET col\_name={expr | DEFAULT},...

与第一种方式的区别在于，此方法可以使用子查询(SubQuery)，但是此方法只能插入一条记录 INSERT users SET username='Ben',password='456'; =>将这两条数据列插入users，其他数据列为默认值 INSERT test(username) SELECT username FROM users WHERE age>=30; =>将users数据表中的age>=30的记录中的username数据列插入到test的username数据列中

### 第三种

> INSERT \[INTO\] tbl\_name \[(col\_name,...)\] SELECT ...

此方法可以将查询结果插入到指定数据表

更新记录（单表更新）
----------

> UPDATE \[LOW\_PRIORITY\] \[IGNORE\] table\_reference SET col\_name1={expr1 | DEFAULT} \[,col\_name2={expr2 | DEFAULT}\] ... \[WHERE where_condition\]

UPDATE users SET age=age-id,sex=0 WHERE id%2=0;=>将id为偶数的记录的age设置为age-id，sex设置为0

删除记录（单表删除）
----------

> DELETE FROM tbl\_name \[WHERE where\_condition\]

查找记录
----

查找记录占据了MySQL语句的80%频率

> SELECT select\_expr \[,select\_expr ...\] \[ FROM table\_references \[WHERE where\_condition\] \[GROUP BY {col\_name | position} \[ASC | DESC\],...\] \[HAVING where\_condition\] \[ORDER BY {col\_name | expr | position} \[ASC | DESC\],...\] \[LIMIT {\[offset,\] row\_count | row_count OFFSET offset}\] \]

### select_expr

查询表达式

*   每一个表达式表示想要的一列，必须有至少一个
*   多个列之间以英文逗号分隔
*   星号(*)表示所有列。tbl_name.*可以表示命名表的所有列
*   查询表达式可以使用\[AS\] alias_name为其赋予别名

SELECT username AS uname FROM users;

*   别名可用于GROUP BY,ORDRE BY或HAVING子句

### WHERE

条件表达式 对记录进行过滤，如果没有指定WHERE子句，则显示所有记录 在WHERE表达式中，可以使用MySQL支持的函数或运算符

### GROUP BY

查询结果分组

> \[GROUP BY {col_name | position} \[ASC | DESC\], ...\]

既可以指定列名，也可以指定列的位置 ASC为升序（默认），DESC为降序

### HAVING

分组条件

> \[HAVING where_condition\]

### ORDER BY

对查询结果进行排序

> \[ORDER BY {col_name | expr | position} \[ASC | DESC\],...\]

可以指定多个数据列进行排序，当第一个数据列的值相同时，按照第二个数据列进行排序，以此类推……

### LIMIT

限制查询结果返回的数量

> \[LIMIT {\[offset,\] row\_count | row\_count OFFSET offset}\]

SELECT * FROM users LIMIT 3,2;=>从索引值为3（第四条记录）的记录开始返回两条记录

子查询
===

子查询(Subquery)是指出现在其他SQL语句内的SELECT子句 SELECT * FROM t1 WHERE col1 = (SELECT col2 FROM t2); =>其中SELECT * FROM t1称为Outer Query/Outer Statement,SELECT col2 FROM t2称为SubQuery

*   子查询指嵌套在查询内部，且必须始终出现在圆括号内
*   子查询可以包含多个关键字或条件，如DISTINCT、GROUP BY、ORDER BY、LIMIT函数等
*   子查询的外层查询可以是：SELECT，INSERT，UPDATE，SET或DO

子查询返回值
------

子查询可以返回标量、一行、一列或子查询

使用比较运算法的子查询
-----------

=、>、<、>=、<=、<>、!=、<=>

### 语法结构

> operand comparison_operator subquery

### 用ANY、SOME或ALL修饰的比较运算符

1.  operand comparison_operator ANY (subquery)
2.  operand comparison_operator SOME (subquery)
3.  operand comparison_operator ALL (subquery)

运算符和关键字相结合之后的结果类型： ![](/images/hexo_post_210.png)

使用\[NOT\] IN的子查询
----------------

### 语法结构

> operand comparison_operator \[NOT\] IN (subquery)

*   =ANY运算符与IN等效
*   !=ALL或<>ALL运算符与NOT IN等效

使用\[NOT\] EXISTS的子查询
--------------------

如果子查询返回任何行，EXISTS将返回TRUE，否则为FALSE

多表操作
====

多表更新
----

> UPDATE table\_references SET col\_name1 = {expr1 | DEFAULT} \[,col\_name2= {expr2 | DEFAULT}\] ...\[WHERE where\_condition\]

CREATE...SELECT
---------------

创建数据表同时将查询结果写入到数据表

> CREATE TABLE \[IF NOT EXISTS\] tbl\_name \[(create\_definition,...)\] select_statement

CREATE TABLE tdb\_goods\_brands(brand\_id SMALLINT UNSIGNED PRIMARY KEY AUTO\_INCREMENT,brand\_name VARCHAR(40) NOT NULL) SELECT brand\_name FROM tdb\_goods GROUP BY brand\_name; =>创建表tdb\_goods\_brands的同时将tdb\_goods中的brand\_name数据列的值赋给新表tdb\_goods\_brands中的brand_name数据列

表的连接
----

> table\_reference {\[INNER | CROSS\] JOIN | {LEFT | RIGHT} \[OUTER\] JOIN} table\_reference ON conditional_expr

table_reference：连接的两张表的名字 conditional_expr：连接条件 使用ON关键字来设定连接条件，也可以使用WHERE来代替：通常使用ON关键字来设定连接条件，使用WHERE关键字进行结果集记录的过滤

连接类型
----

1.  INNER JOIN，内连接，在MySQL中，JOIN，CROSS JOIN和INNER JOIN是等价的
2.  LEFT \[OUTER\] JOIN，左外连接
3.  RIGHT \[OUTER\] JOIN，右外连接

UPDATE tdb\_goods AS g INNER JOIN tdb\_goods\_brands AS b ON g.brand\_name=b.brand\_name SET g.brand\_name=b.brand_id; =>按照tdb\_goods\_brands(设置别名为b)表更新tdb\_goods(设置别名为g)表，连接条件为表g的brand\_name和表b的brand\_name字段值相等，更新操作为将g中的brand\_name更改为b中的brand_id

### 内连接

仅显示左表及右表符合连接条件的记录（交集、公共部分）

### 左（右）外连接

显示左（右）表的全部记录及右（左）表符合连接条件的记录 A LEFT JOIN B join_condition 如果数据表A的某条记录符合WHERE条件，但是在数据表B不存在符合连接条件的记录，将生成一个所有列为空的额外的B行

多表删除
----

> DELETE tbl\_name\[.*\] \[,tbl\_name\[.*\]\] ... FROM table\_references \[WHERE where\_condition\]

系统内置函数
======

字符函数
----

\[table id=26 /\]

### CONCAT()

SELECT CONCAT(first\_name,last\_name) AS fullname FROM test; =>将数据表test中的first\_name和last\_name中的数据连接到一起进行输出，并命名为fullname

### FORMAT()

SELECT FORMAT(12560.75,2); =>转换成 12,560.75（千分位） SELECT FORMAT(12560.75,1); =>转换成 12,560.8（四舍五入） SELECT FORMAT(12560.75,0); =>转换成 12,561（取整）

### TRIM()

除了删除首尾空格，还可以删除指定其他字符 SELECT TRIM(LEADING '?' FROM '??MySQL???'); =>MySQL???，LEADING关键字代表前导，所以这句话的含义是删除字符串前面的'?'字符；将LEADING换为TRAILING表示去掉尾部相应字符，换为BOTH表示去掉首尾相应字符

### \[NOT\] LIKE

SELECT * FROM test WHERE first_name LIKE '%o%'; =\> tom%，%相当于*，所以LIKE有点类似于正则匹配

数值运算符与函数
--------

\[table id=27 /\]

### TRUNCATE()

数字截取，不会进行运算，TRUNCATE(125.89,0); =\> 125，TRUNCATE(125.89,-1); =\> 120

比较运算符与函数
--------

\[table id=28 /\]

日期时间函数
------

\[table id=29 /\]

### DATE_ADD()

DATE_ADD('2014-3-12',INTERVAL 3 WEEK); =>2014-04-02 DATE_ADD('2014-3-12',INTERVAL -365 DAY); =>2013-3-12

### DATEDIFF()

DATEDIFF('2013-3-12','2014-3-12'); =>-365

### DATE_FORMAT()

DATE_FORMAT('2014-3-2','%m/%d/%Y'); =>03/02/2014

信息函数
----

\[table id=30 /\]

### LAST\_INSERT\_ID()

当使用该函数时，当前数据表中必须存在一个自增的字段，字段名可以不为id 当同时写入多条记录时，只返回插入的第一条记录的ID值

聚合函数
----

\[table id=31 /\]

### AVG()

SELECT AVG(age) FROM test; =>返回test数据表中的age平均值

自定义函数
=====

用户自定义函数（user-defined function,UDF）是一种对MySQL扩展的途径，其用法与内置函数相同

必要条件
----

1.  参数（理论上不超过1024个参数）
2.  返回值

函数可以返回任意类型的值，同样可以接收这些类型的参数

创建自定义函数
-------

> CREATE FUNCTION function\_name RETURNS {STRING | INTERGER | REAL | DECIMAL} routine\_body

CREATE FUNCTION f1() RETURNS VARCHAR(30) RETURN DATE_FORMAT(NOW(),'%Y年%m月%d日 %H点:%i分:%s秒'); =>不带有参数的函数，返回格式为'2017年05月09日 21点:26分:15秒'

关于函数体
-----

1.  函数体由合法的SQL语句构成
2.  函数体可以是简单的SELECT或INSERT语句
3.  函数体如果为复合结构，则使用BEGIN...END语句
4.  复合结构可以包含声明，循环，控制结构

删除函数
----

> DROP FUNCTION \[IF EXISTS\] function_name

MySQL命令执行过程
===========

![](/images/hexo_post_211.png)

存储过程
====

存储过程是SQL语句和控制语句的预编译集合，以一个名称存储并作为一个单元处理

存储过程的优点
-------

1.  增强SQL语句的功能和灵活性
2.  实现较快的执行速度
3.  减少网络流量

创建存储过程
------

> CREATE \[DEFINER = {user | CURRENT\_USER}\] PROCEDURE sp\_name (\[proc\_parameter\[,...\]\]) \[characteristic ...\] routine\_body

和创建自定义函数类似，最大的不同就是参数部分不同

> proc\_parameter:\[IN | OUT | INOUT\] param\_name type

IN->表示该参数的值必须在调用存储过程时指定 OUT->表示该参数的值可以被存储过程改变，并且可以返回 INOUT->表示该参数的调用时指定，并且可以被改变和返回

过程体
---

1.  过程体由合法的SQL语句构成
2.  过程体可以是任意SQL语句
3.  过程体如果为复合结构则使用BEGIN...END语句
4.  复合结构可以包含声明，循环，控制结构

调用存储过程
------

*   CALL sp_name(\[parameter\[,...\]\])
*   CALL sp_name\[()\]

修改存储过程
------

> ALTER PROCEDURE sp_name \[characteristic ...\] COMMENT 'string' | {CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA} | SQL SECURITY { DEFINER | INVOKER }

删除存储过程
------

> DROP PROCEDURE \[IF EXISTS\] sp_name

实例
--

CREATE PROCEDURE sp1() SELECTION VERSION(); ->创建存储体 CALL sp1; ->调用存储体