---
title: Mongo入门-1-原理
description: Mongo入门学习
authors: feng
---

关系型数据库遵循的ACID

*   A (Atomicity)原子性
*   C (Consisitency)一致性
*   I (Isolation)独立性
*   D (Durability)持久性

<!--truncate-->

为什么使用NoSql

    不不能是空字符串串("")。
    不不得含有' '(空格)、.、$、/、\和\0 (空字符)。
    应全部小小写。
    最多64字节。1234

有一些数据库名是保留的,可以直接访问这些有特殊作用的数据库

*   admin root数据库,将一个用户添加到这个数据库,这个用户自动继承所有数据库的权限.特定的命令只能够这个数据库运行(列出所有的数据库或关闭服务器)
*   local 这个数据永远不会被复制,可以用来存储限于本地单台服务器的任意集合
*   config:当Mongo用于分片设置时,config在内部使用,用于保存分片的相关信息

#### 文档

文档是一组kv(BSON).Mongo的文档不需要设置相同的字段,并且相同的字段不需要相同的数据类型,与关系型数据库有很大差别,也是MongoDB的特点

    {"site":"www.baidu.com"}
    {"site":"www.google.com","name":"Google"}
    {"site":"www.runoob.com","name":"菜⻦鸟教程","num":5}123

### MongoDB数据类型