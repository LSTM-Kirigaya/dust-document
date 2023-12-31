---
title: NUAA ICS 评分细则 PA1.2&1.3
---


##  ⼀、操作题 （满分100分） 

#### 1. 编写匹配规则(1) (5分)

所有的正则表达式，不要分开写

#### 2. 添加 p 命令 (5分)

编写`cmd_p()`函数

#### 3. 识别并存储 token (10分)

完善`make_token()`函数

#### 4. 实现括号匹配 (5分)

编写`check_parentheses()`函数

#### 5. 实现子表达式拆分 (5分)

编写`find_dominated_op()`函数

#### 6. 实现表达式求值 (15分)

编写`eval()`函数；

测试⽤例：先贴当前`info r`命令的截图，然后执⾏下列命令（每个运算符都要覆盖到， 自行设计更多测试样例）

```
p $eax
p $eip == 0x100000
p *0x100000
p *$eip
p 2 * ($eax + $ebx)
```

#### 7. 实现指针解引用 (5分)

#### 8. 实现负数 (加分项，5分)

#### 9. 实现x命令使用表达式求值 (加分项，5分)

测试用例：当 eip = 0x100000 时，命令`x 4 $eip`显示的结果与`x 4 0x100000`相同

#### 10. 监视点结构体 (5分)

#### 11. 监视点池的管理 (10分)

```c
WP* new_wp();
void free_wp(WP *wp);
```

#### 12. 监视点加入调试器 (15分)

`cmd_w()`函数、`cmd_d()`函数、`info w`命令

#### 13. 监视点主要功能 (20分)

```c
int set_watchpoint(char *e);
bool delete_watchpoint(int NO);
void list_watchpoint(void);
WP* scan_watchpoint(void);
```

#### 14. 实现软件断点 (加分项，10分)



## 二、思考题和git（满分100分）

#### 1. 有什么办法？（5分）

#### 2. 一些简单的正则表达式（10分）

#### 3. 这是为什么？（5分）

#### 4. 如何处理以上的问题（5分）

#### 5. 递归求值的过程？（5分）

#### 6. 体验监视点（5分）

#### 7. 科学起名（5分）

#### 8. 温故而知新（5分）

#### 9. 一点也不能长？（10分）

#### 10. “随心所欲”的断点（10分）

#### 11. NEMU的前世今生（5分）

#### 12. 尝试通过目录定位关注的问题（5分）

#### 13. 理解基础设施（5分）

#### 14. 查阅i386手册（5分）

#### 15. shell 命令（5分）

#### 16. 使用`man`（5分）

#### 17. `git log`和远程git仓库提交截图（5分）

