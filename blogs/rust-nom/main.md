---
title: Rust Nom 教程 (Nominomicon)
date: 2024-11-28
heroImage: /logo.png
heroText: Welcome to hep.
categories:
 - 技术
tags:
 - rust
 - 技术文档

isShowTitleInHome: true
actionText: About
---

:::info
nom 是rust中相当流行的用于开发解析器和编译器前端的组合子框架库，苦于没有合适的中文文档，我决定在喝红茶的间隙翻译一本。这本教程的源地址：[The Nominomicon: A Guide To Using Nom](https://tfpk.github.io/nominomicon/introduction.html#the-nominomicon) 。翻译完全借由部分大模型和锦恢本人（没错，就是本人啦）精修。我也会在一些地方加入我自己的理解或者做出适当的补充。

其中 Nominomicon 是 nom 和 Necronomicon 组合而成的词语，而 "Necronomicon" 是 H.P. Lovecraft 的克苏鲁神话中提到的一本神秘且危险的魔法书。因此，Nominomicon 其实可以翻译成解析器秘籍，但是这也太无趣了！还是叫 Nominomicon 吧！
:::

欢迎来到 Nominomicon；这是一本使用 Nom 解析器从而收益颇丰的教程。本教程将从理论和实践教会您使用 Nom。

为了学习本教程，你需要：

- 想要学习 Nom，
- 已经熟悉 Rust。

nom 是一个解析器组合器库。换句话说，它为您提供了定义以下对象的工具：

- “解析器”（parsers, 接受输入并返回输出的函数）
- “组合器”（combinators, 也可以翻译为组合子，采用解析器并将它们组合在一起的函数！）。

通过将解析器与组合器相结合，您可以从简单的解析器构建复杂的解析器。这些复杂的解析器足以理解 HTML、mkv 或 Python！

在我们开始前，有必要列出一些注意事项：

- 本指南适用于 Nom7。Nom 经历了重大变化，因此如果您正在搜索文档或 StackOverflow 答案，您可能会找到较旧的文档。一些常见的迹象表明它是旧版本：
    - 2021 年 8 月 21 日之前的文档
    - `named!` 宏的使用
    - 使用 `CompleteStr` 或 `CompleteByteArray`。
- nom 可以解析（几乎）任何事物；但本指南几乎完全关注将完整事物解析 &str 为完整事物。(译者说明：nom 库开发的初衷是解析二进制代码的，但是后来慢慢转移到了对于字符串的支持，也就是 &str，我想，看这本教程的朋友大部分都是想要完成一个形式语言的解析器，形式语言大概率都是字符串吧)