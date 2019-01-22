---
title: 与MySQL的零距离接触
urlname: zero-distance-contact-with-mysql
id: 810
categories:
  - 慕课网
tags:
  - mysql
  - 数据库
date: 2017-05-09 10:02:40
img: /images/hexo_thumbnail_85.jpeg
---

## MySQL 基础

由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司，MySQL 是一个开源的**关系型**数据库管理系统，分为社区版和企业版

## MySQL 一些常用参数

| 参数                   | 描述         | 
|----------------------|------------| 
| -D，--database=name   | 打开指定数据库    | 
| --delimiter=name     | 指定分隔符      | 
| -h，--host=name       | 服务器名称      | 
| -p，--password[=name] | 密码         | 
| -P，--port=#          | 端口号        | 
| --prompt=name        | 设置提示符      | 
| -u，--user=name       | 用户名        | 
| -V，--version         | 输出版本信息并且退出 | 


### MySQL退出

* mysql > exit;
* mysql > quit;
* mysql > \\q;

### 修改 MySQL 提示符

连接客户端时通过参数指定提示符：

```bash
shell>mysql -uroot -proot --prompt
```

连接上客户端后，通过 prompt 命令修改提示符：mysql>prompt，MySQL 提示符修改时可以用到的一些参数：

| 参数 | 描述    | 
|----|-------| 
| \D | 完整的日期 | 
| \d | 当前数据库 | 
| \h | 服务器名称 | 
| \u | 当前用户  | 

<div align='center'><img src='/images/hexo_post_207.png' alt='' width='500'/></div>

### 修改数据表的默认存储引擎

找到 MySQL 配置文件：default-storage-engine=INNODB，修改完之后需要重启 MySQL

## MySQL 语句的规范

* 关键字与函数名称全部大写
* 数据库名称、表名称、字段名称全部小写
* SQL 语句必须以分号结尾

## 数据类型

1. 字符型
2. 整型
3. 浮点型
4. 日期时间型

## MySQL 常用命令

* 显示当前服务器版本：SELECT VERSION();
* 显示当前日期时间：SELECT NOW();
* 显示当前用户：SELECT USER();

### 创建数据库

* |：表示可以互换的两项
* \[\]：表示可选项
* {}：表示必选项

```bash
CREATE {DATABASE | SCHEMA} \[IF NOT EXISTS\] db\_name \[DEFAULT\] CHARACTER SET \[=\] charset\_name
```

DATABASE | SCHEMA：这两个完全相同，任选其一即可
IF NOT EXISTS：可选项，如果存在就不创建，不存在才会创建
CHARACTER：设置编码格式，例如 utf-8，gbk

### 查看当前服务器下的数据表列表

```bash
SHOW {DATABASES | SCHEMAS} \[LIKE 'pattern' | WHERE expr\]
```

### 修改数据库

```bash
ALTER {DATABASE | SCHEMA} \[db\_name\] \[DEFAULT\] CHARACTER SET \[=\] charset\_name
```

通过以上语句可以修改某个数据库的编码格式

### 删除数据库

```bash
DROP {DATABASE | SCHEMA} \[IF EXISTS\] db_name
```

### 打开数据库

```bash
USE db_name
```

### 创建数据表

```bash
CREATE TABLE \[IF NOT EXISTS\] table\_name( column\_name data_type, .... )
```

### 查看数据表列表

```bash
SHOW TABLES \[FROM db_name\] \[LIKE 'pattern' | WHERE expr\]
```

FROM db_name：不仅可以查看当前数据库中的数据表，还可以查看其他数据库中的数据表

### 查看数据表结构

```bash
SHOW COLUMNS FROM tbl_name
```

tbl_name：数据表的名称

### 插入记录

```bash
INSERT \[INFO\] tbl\_name \[(col\_name,...)\] VALUES(val,...)
```

如果省略 col_name (列名称)，就必须为所有字段都赋值

### 记录查找

```bash
SELECT expr,... FROM tbl_name
```

expr：表达式

## 字段属性设置

### 空值与非空

* NULL：字段值可以为空（默认值）
* NOT NULL：字段值禁止为空

```bash
CREATE TABLE tbl_name(username VARCHAR(20) NOT NULL,age TINYINT UNSIGNED NULL);
```

<div align='center'><img src='/images/hexo_post_208.png' alt='' width='400'/></div>

## 表级约束与列级约束

对一个数据列建立的约束，称为列级约束 对多个数据列建立的约束，称为表级约束 列级约束既可以在列定义时声明，也可以在列定义后声明 表级约束只能在列定义后声明

### 主键约束

PRIMARY KEY：每张数据表只能存在一个主键，主键保证记录的唯一性，主键自动为 NOT NULL，主键不一定和下面的自动编号一起使用，但是不能赋相同的值

### 自动编号

AUTO_INCREMENT：必须与主键组合使用，默认情况下，起始值为 1，每次的增量为 1，该字段的数据类型必须为数字，如果是浮点数必须小数位数为 0

### 唯一约束

UNIQUE KEY：可以保证记录的唯一性，字段可以为空值（NULL），每张数据表可以存在多个唯一约束

### 默认约束

DEFAULT：当插入记录时，如果没有明确为字段赋值，则自动赋予默认值

```bash
sex enum('1','2','3') DEFAULT '3'
```

### 外键约束

FOREIGN KEY：保持数据一致性和完整性，实现一对一或一对多关系

#### 外键约束的要求

1. 父表和子表必须使用相同的存储引擎，而且禁止使用临时表
2. 数据表的存储引擎只能为 InnoDB
3. 外键列和参照列必须具有相似的数据类型，其中数字的长度或是否有符号位必须相同；而字符的长度则可以不同
4. 外键列和参照列必须创建索引，如果外键列不存在索引的话，MySQL 将自动创建索引

#### 外键约束的参照操作

1. CASCADE：从父表删除或更新且自动删除或更新子表中匹配的行
2. SET NULL：从父表删除或更新行，并设置子表中的外键列为 NULL。如果使用该选项，必须保证子表列没有指定NOT NULL
3. RESTRICT：拒绝对父表的删除或更新操作
4. NO ACTION：标准 SQL 的关键字，在 MySQL 中与 RESTRICT 相同

pid INT,FOREIGN KEY (pid) REFERENCES provinces (id) ON DELETE CASCADE => pid 为外键约束，参照数据表 provinces 中的 id 字段；并且删除时的参照操作为 CASCADE

## 修改数据表

### 添加单列

```bash
ALTER TABLE tbl\_name ADD \[COLUMN\] col\_name column\_definition \[FIRST | AFTER col\_name\]
```

FIRST：新添加的列将置于最前面
AFTER col_name：新添加的列将置于某一列后面
如果省略以上两项，新添加的列将位于所有列最后面

### 添加多列

```bash
ALTER TABLE tbl\_name ADD \[COLUMN\] (col\_name column_definition,...)
```

添加多列时无法指定位置，只能位于最后面

### 删除列

```bash
ALTER TABLE tbl\_name DROP \[COLUMN\] col\_name
```

ALTER TABLE tbl_name DROP age,DROP password => 可以同时删除 age 列和 password 列

### 添加约束

#### 添加主键约束

```bash
ALTER TABLE tbl\_name ADD \[CONSTRAINT \[symbol\] \] PRIMARY KEY \[index\_type\] (index\_col\_name,...)
```

#### 添加唯一约束

```bash
ALTER TABLE tbl\_name ADD \[CONSTRAINT \[symbol\] \] UNIQUE \[INDEX | KEY\] \[index\_name\] \[index\_type\] (index\_col_name,...)
```

唯一约束可以给多列添加

#### 添加外键约束

```bash
ALTER TABLE tbl\_name ADD \[CONSTRAINT \[symbol\] \] FOREIGN KEY \[index\_name\] (index\_col\_name,...) reference_definition
```

#### 添加/删除默认约束

```bash
ALTER TABLE tbl\_name ALTER \[COLUMN\] col\_name {SET DEFAULT literal | DROP DEFAULT}
```

SET DEFAULT literal：添加默认约束
DROP DEFAULT：删除默认约束

### 删除约束

#### 删除主键约束

```bash
ALTER TABLE tbl_name DROP PRIMARY KEY
```

#### 删除唯一约束

```bash
ALTER TABLE tbl\_name DROP {INDEX | KEY} index\_name
```

一张表可以有多个唯一约束，所以需要查看约束的名字 => SHOW INDEXES FROM tbl_name \[\\G\];

#### 删除外键约束

```bash
ALTER TABLE tbl\_name DROP FOREIGN KEY fk\_symbol
```

fk_symbol：约束的名字，需要提前查看 => SHOW CREATE tbl_name

### 修改列定义

```bash
ALTER TABLE tbl\_name MODIFY \[COLUMN\] col\_name column\_definition \[FIRST | AFTER col\_name\]
```

可以修改数据类型以及数据列的位置

### 修改列名称

```bash
ALTER TABLE tbl\_name CHANGE \[COLUMN\] old\_col\_name new\_col\_name column\_definition \[FIRST | AFTER col_name\]
```

修改列名称的同时也可以修改列类型和位置，所以其功能要强大于修改列定义

### 数据表更名

尽量少更改数据表和数据列名字，因为如果创建过索引和约束，会影响到正常使用

#### 方法1

```bash
ALTER TABLE tbl\_name RENAME \[TO | AS\] new\_tbl_name
```

#### 方法2

```bash
RENAME TABLE tbl\_name TO new\_tbl\_name \[,tbl\_name2 TO new\_tbl\_name2\] ...
```

### 总结

<div align='center'><img src='/images/hexo_post_209.png' alt='' width='400'/></div>

## 记录操作

### 插入记录

#### 第一种

```bash
INSERT \[INTO\] tbl\_name \[(col\_name,...)\] {VALUES | VALUE} ({expr | DEFAULT},...},(...),...
```

可以插入一条记录，也可以插入多条记录 INSERT users VALUES(NULL,'John','456',25,1); => NULL 为空值，也可以为自增字段赋值（DEFAULT也可以）

INSERT users VALUES(DEFAULT,'Tom','123',3*7-5,1),(NULL,'Rose',md5('123'),DEFAULT,0); => 插入多条记录，可以用表达式，也可以用函数、NULL、DEFAULT

#### 第二种

```bash
INSERT \[INTO\] tbl\_name SET col\_name={expr | DEFAULT},...
```

与第一种方式的区别在于，此方法可以使用子查询(SubQuery)，但是此方法只能插入一条记录
INSERT users SET username='Ben',password='456'; => 将这两条数据列插入users，其他数据列为默认值
INSERT test(username) SELECT username FROM users WHERE age>=30; => 将 users 数据表中的 age >= 30 的记录中的 username 数据列插入到 test 的 username 数据列中

### 第三种

```bash
INSERT \[INTO\] tbl\_name \[(col\_name,...)\] SELECT ...
```

此方法可以将查询结果插入到指定数据表

### 更新记录（单表更新）

```bash
UPDATE \[LOW\_PRIORITY\] \[IGNORE\] table\_reference SET col\_name1={expr1 | DEFAULT} \[,col\_name2={expr2 | DEFAULT}\] ... \[WHERE where_condition\]
```

UPDATE users SET age=age-id,sex=0 WHERE id%2=0; => 将 id 为偶数的记录的 age 设置为 age-id，sex 设置为 0

### 删除记录（单表删除）

```bash
DELETE FROM tbl\_name \[WHERE where\_condition\]
```

### 查找记录

查找记录占据了 MySQL 语句的 80% 频率

```bash
SELECT select\_expr \[,select\_expr ...\] \[ FROM table\_references \[WHERE where\_condition\] \[GROUP BY {col\_name | position} \[ASC | DESC\],...\] \[HAVING where\_condition\] \[ORDER BY {col\_name | expr | position} \[ASC | DESC\],...\] \[LIMIT {\[offset,\] row\_count | row_count OFFSET offset}\] \]
```

#### select_expr

查询表达式

* 每一个表达式表示想要的一列，必须有至少一个
* 多个列之间以英文逗号分隔
* 星号(*)表示所有列；tbl\_name.* 可以表示命名表的所有列
* 查询表达式可以使用 \[AS\] alias_name 为其赋予别名

```bash
SELECT username AS uname FROM users;
```

* 别名可用于 GROUP BY,ORDRE BY 或 HAVING 子句

#### WHERE

条件表达式 对记录进行过滤，如果没有指定WHERE子句，则显示所有记录 在 WHERE 表达式中，可以使用 MySQL 支持的函数或运算符

#### GROUP BY

查询结果分组

```bash
\[GROUP BY {col_name | position} \[ASC | DESC\], ...\]
```

既可以指定列名，也可以指定列的位置 ASC 为升序（默认），DESC 为降序

#### HAVING

分组条件

```bash
\[HAVING where_condition\]
```

#### ORDER BY

对查询结果进行排序

```bash
\[ORDER BY {col_name | expr | position} \[ASC | DESC\],...\]
```

可以指定多个数据列进行排序，当第一个数据列的值相同时，按照第二个数据列进行排序，以此类推……

#### LIMIT

限制查询结果返回的数量

```bash
\[LIMIT {\[offset,\] row\_count | row\_count OFFSET offset}\]
```

SELECT * FROM users LIMIT 3,2; => 从索引值为 3（第四条记录）的记录开始返回两条记录

## 子查询

子查询(Subquery)是指出现在其他 SQL 语句内的 SELECT 子句
SELECT * FROM t1 WHERE col1 = (SELECT col2 FROM t2); => 其中SELECT * FROM t1 称为 Outer Query/Outer Statement,SELECT col2 FROM t2 称为 SubQuery

* 子查询指嵌套在查询内部，且必须始终出现在圆括号内
* 子查询可以包含多个关键字或条件，如 DISTINCT、GROUP BY、ORDER BY、LIMIT 函数等
* 子查询的外层查询可以是：SELECT，INSERT，UPDATE，SET 或 DO

### 子查询返回值

子查询可以返回标量、一行、一列或子查询

### 使用比较运算法的子查询

=、>、<、>=、<=、<>、!=、<=>

### 语法结构

```bash
operand comparison_operator subquery
```

### 用 ANY、SOME 或 ALL 修饰的比较运算符

1. operand comparison_operator ANY (subquery)
2. operand comparison_operator SOME (subquery)
3. operand comparison_operator ALL (subquery)

运算符和关键字相结合之后的结果类型：

<div align='center'><img src='/images/hexo_post_210.png' alt='' width='400'/></div>

### 使用 \[NOT\] IN 的子查询

#### 语法结构

```bash
operand comparison_operator \[NOT\] IN (subquery)
```

* =ANY 运算符与 IN 等效
* !=ALL 或 <>ALL 运算符与 NOT IN 等效

### 使用 \[NOT\] EXISTS 的子查询

如果子查询返回任何行，EXISTS 将返回 TRUE，否则为 FALSE

## 多表操作

### 多表更新

```bash
UPDATE table\_references SET col\_name1 = {expr1 | DEFAULT} \[,col\_name2= {expr2 | DEFAULT}\] ...\[WHERE where\_condition\]
```

### CREATE...SELECT

创建数据表同时将查询结果写入到数据表

```baash
CREATE TABLE \[IF NOT EXISTS\] tbl\_name \[(create\_definition,...)\] select_statement
```

CREATE TABLE tdb\_goods\_brands(brand\_id SMALLINT UNSIGNED PRIMARY KEY AUTO\_INCREMENT,brand\_name VARCHAR(40) NOT NULL) SELECT brand\_name FROM tdb\_goods GROUP BY brand\_name; => 创建表 tdb\_goods\_brands 的同时将 tdb\_goods 中的 brand\_name 数据列的值赋给新表 tdb\_goods\_brands 中的 brand_name 数据列

### 表的连接

```bash
table\_reference {\[INNER | CROSS\] JOIN | {LEFT | RIGHT} \[OUTER\] JOIN} table\_reference ON conditional_expr
```

table_reference：连接的两张表的名字
conditional_expr：连接条件，使用 ON 关键字来设定连接条件，也可以使用 WHERE 来代替：通常使用 ON 关键字来设定连接条件，使用 WHERE 关键字进行结果集记录的过滤

#### 连接类型

1. INNER JOIN，内连接，在 MySQL 中，JOIN，CROSS JOIN 和 INNER JOIN 是等价的
2. LEFT \[OUTER\] JOIN，左外连接
3. RIGHT \[OUTER\] JOIN，右外连接

UPDATE tdb\_goods AS g INNER JOIN tdb\_goods\_brands AS b ON g.brand\_name=b.brand\_name SET g.brand\_name=b.brand_id; => 按照 tdb\_goods\_brands (设置别名为 b)表更新 tdb\_goods (设置别名为 g)表，连接条件为表 g 的brand\_name 和表 b 的 brand\_name 字段值相等，更新操作为将 g 中的 brand\_name 更改为 b 中的 brand_id

#### 内连接

仅显示左表及右表符合连接条件的记录（交集、公共部分）

#### 左（右）外连接

显示左（右）表的全部记录及右（左）表符合连接条件的记录 A LEFT JOIN B join_condition 如果数据表 A 的某条记录符合 WHERE 条件，但是在数据表B不存在符合连接条件的记录，将生成一个所有列为空的额外的B行

### 多表删除

```bash
DELETE tbl\_name\[.*\] \[,tbl\_name\[.*\]\] ... FROM table\_references \[WHERE where\_condition\]
```

## 系统内置函数

### 字符函数

| 函数名称        | 描述             | 
|-------------|----------------| 
| CONCAT()    | 字符连接           | 
| CONCAT_WS() | 使用指定的分隔符进行字符连接 | 
| FORMAT()    | 数字格式化          | 
| LOWER()     | 转换成小写字母        | 
| UPPER()     | 转换成大写字母        | 
| LEFT()      | 获取左侧字符         | 
| RIGHT()     | 获取右侧字符         | 
| LENGTH()    | 获取字符串长度        | 
| LTRIM()     | 删除前导空格         | 
| RTRIM()     | 删除后续空格         | 
| TRIM()      | 删除前导和后续空格      | 
| SUBSTRING() | 字符串截取          | 
| \[NOT\] LIKE  | 模式匹配           | 
| REPLACE()   | 字符串替换          | 

### CONCAT()

SELECT CONCAT(first\_name,last\_name) AS fullname FROM test; => 将数据表 test 中的 first\_name 和 last\_name 中的数据连接到一起进行输出，并命名为 fullname

### FORMAT()

SELECT FORMAT(12560.75,2); => 转换成 12,560.75（千分位）
SELECT FORMAT(12560.75,1); => 转换成 12,560.8（四舍五入）
SELECT FORMAT(12560.75,0); => 转换成 12,561（取整）

### TRIM()

除了删除首尾空格，还可以删除指定其他字符 SELECT TRIM(LEADING '?' FROM '??MySQL???'); => MySQL???，LEADING 关键字代表前导，所以这句话的含义是删除字符串前面的'?'字符；将 LEADING 换为 TRAILING 表示去掉尾部相应字符，换为 BOTH 表示去掉首尾相应字符

### \[NOT\] LIKE

SELECT * FROM test WHERE first_name LIKE '%o%'; =\> tom%，%相当于*，所以 LIKE 有点类似于正则匹配

### 数值运算符与函数

| 名称         | 描述      | 
|------------|---------| 
| CEIL()     | 进一取整    | 
| DIV        | 整数除法    | 
| FLOOR()    | 舍一取整    | 
| MOD        | 取余数（取模） | 
| POWER()    | 幂运算     | 
| ROUND()    | 四舍五入    | 
| TRUNCATE() | 数字截取    | 


### TRUNCATE()

数字截取，不会进行运算，TRUNCATE(125.89,0); =\> 125，TRUNCATE(125.89,-1); =\> 120

### 比较运算符与函数

| 名称                     | 描述         | 
|------------------------|------------| 
| \[NOT\] BETWEEN...AND... | \[不\]在范围之内   | 
| \[NOT\] IN()             | \[不\]在列出值范围内 | 
| IS \[NOT\] NULL          | \[不\]为空      | 

### 日期时间函数

| 名称            | 描述      | 
|---------------|---------| 
| NOW()         | 当前日期和时间 | 
| CURDATE()     | 当前日期    | 
| CURTIME()     | 当前时间    | 
| DATE_ADD()    | 日期变化    | 
| DATEDIFF()    | 日期差值    | 
| DATE_FORMAT() | 日期格式化   | 


### DATE_ADD()

DATE_ADD('2014-3-12',INTERVAL 3 WEEK); => 2014-04-02
DATE_ADD('2014-3-12',INTERVAL -365 DAY); => 2013-3-12

### DATEDIFF()

DATEDIFF('2013-3-12','2014-3-12'); =>-365

### DATE_FORMAT()

DATE_FORMAT('2014-3-2','%m/%d/%Y'); =>03/02/2014

### 信息函数

| 名称               | 描述         | 
|------------------|------------| 
| CONNECTION_ID()  | 连接ID       | 
| DATABASE()       | 当前数据库      | 
| LAST_INSERT_ID() | 最后插入记录的ID号 | 
| USER()           | 当前用户       | 
| VERSION()        | 版本信息       | 


### LAST\_INSERT\_ID()

当使用该函数时，当前数据表中必须存在一个自增的字段，字段名可以不为 id，当同时写入多条记录时，只返回插入的第一条记录的 ID 值

### 聚合函数

| 名称      | 描述  | 
|---------|-----| 
| AVG()   | 平均值 | 
| COUNT() | 计数  | 
| MAX()   | 最大值 | 
| MIN()   | 最小值 | 
| SUM()   | 求和  | 

#### AVG()

SELECT AVG(age) FROM test; => 返回 test 数据表中的 age 平均值

## 自定义函数

用户自定义函数（user-defined function,UDF）是一种对 MySQL 扩展的途径，其用法与内置函数相同

### 必要条件

1. 参数（理论上不超过 1024 个参数）
2. 返回值

函数可以返回任意类型的值，同样可以接收这些类型的参数

### 创建自定义函数

```bash
CREATE FUNCTION function\_name RETURNS {STRING | INTERGER | REAL | DECIMAL} routine\_body
```

CREATE FUNCTION f1() RETURNS VARCHAR(30) RETURN DATE_FORMAT(NOW(),'%Y年%m月%d日 %H点:%i分:%s秒'); => 不带有参数的函数，返回格式为 '2017年05月09日 21点:26分:15秒'

### 关于函数体

1. 函数体由合法的 SQL 语句构成
2. 函数体可以是简单的 SELECT 或 INSERT 语句
3. 函数体如果为复合结构，则使用 BEGIN...END 语句
4. 复合结构可以包含声明，循环，控制结构

### 删除函数

```bash
DROP FUNCTION \[IF EXISTS\] function_name
```

## MySQL命令执行过程

<div align='center'><img src='/images/hexo_post_211.png' alt='' width='400'/></div>

## 存储过程

存储过程是 SQL 语句和控制语句的预编译集合，以一个名称存储并作为一个单元处理

### 存储过程的优点

1. 增强 SQL 语句的功能和灵活性
2. 实现较快的执行速度
3. 减少网络流量

### 创建存储过程

```bash
CREATE \[DEFINER = {user | CURRENT\_USER}\] PROCEDURE sp\_name (\[proc\_parameter\[,...\]\]) \[characteristic ...\] routine\_body
```

和创建自定义函数类似，最大的不同就是参数部分不同

```bash
proc\_parameter:\[IN | OUT | INOUT\] param\_name type
```

IN -> 表示该参数的值必须在调用存储过程时指定
OUT -> 表示该参数的值可以被存储过程改变，并且可以返回
INOUT -> 表示该参数的调用时指定，并且可以被改变和返回

### 过程体

1. 过程体由合法的 SQL 语句构成
2. 过程体可以是任意 SQL 语句
3. 过程体如果为复合结构则使用 BEGIN...END 语句
4. 复合结构可以包含声明，循环，控制结构

### 调用存储过程

* CALL sp_name(\[parameter\[,...\]\])
* CALL sp_name\[()\]

### 修改存储过程

```bash
ALTER PROCEDURE sp_name \[characteristic ...\] COMMENT 'string' | {CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA} | SQL SECURITY { DEFINER | INVOKER }
```

### 删除存储过程

```bash
DROP PROCEDURE \[IF EXISTS\] sp_name
```

### 实例

CREATE PROCEDURE sp1() SELECTION VERSION(); -> 创建存储体
CALL sp1; -> 调用存储体