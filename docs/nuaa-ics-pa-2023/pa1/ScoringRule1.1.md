---
title: NUAA ICS 评分细则 PA1.1
---


**PA1.1 特别提醒**：⼤家在读讲义时，⼀定要注意⽬录中 `1.1简易调试器` 上⽅的 `PA1 - 最简单的计算机` ，这⾥ 也有需要你做的操作；如果已经开始做了，之前没注意到，没关系，之后请注意。

##  ⼀、操作题 （满分100分） 

### 实现寄存器结构体(30分)

测试⽤例:执⾏命令 `make run` 能够通过 NEMU ⾃检进⼊ NEMU 界⾯。 

### 实现单步执⾏(15 分) 

需要测试的⽤例⾄少包括: `si 1` (运⾏1步)，` si `(运⾏1步)， `si -1 `(等同于 c)， `si 10` (运⾏10 步)。 

### 修改⼀次打印步数上限(10 分)

需要测试的⽤例⾄少包括: `si 5 `， `si 10` ， `si 15 `， `si 1000000` 。 

### 实现打印寄存器功能(15 分)

测试⽤例:先执⾏命令` info r` ， `si 5` 后再次执⾏` info r `。 

### 实现扫描内存功能(15 分)

测试⽤例:执⾏命令 `x 4 0x100000` 。 

### 实现扫描内存字节单位显示(15 分) 

测试⽤例:执⾏命令 `x 4 0x100000` 。

## ⼆、思考题及git（满分100分） 

### 1.存放的是什么？（15分） 

### 2.贵圈真乱（10分） 

### 3.虚拟机和模拟器的区别（15分）

### 4.从哪开始阅读代码呢（5分） 

### 5.究竟要执⾏多久（10分）

### 6.谁来指示程序的结束?（15分） 

### 7.为什么会这样？（15分） 

### 8.Git Log截图(5分) 在 pa1 分⽀下使⽤命令 git log --oneline 并截图，尽量完整。

### 9.Git Branch截图（5分） 使⽤命令 git branch 并截图，尽量完整。 

### 10.远程git仓库提交截图（5分） 做完后，把此次代码提交到 github (或国内基于 git 的仓库)上，并截图

