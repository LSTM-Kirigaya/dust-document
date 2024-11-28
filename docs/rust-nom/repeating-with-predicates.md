---
title: 5. 使用谓词进行重复
---

就像在编程时，简单的 while 循环可以解锁许多有用的功能一样；在 nom 中，多次重复解析器可能非常有用

然而，有两种方法可以将重复功能纳入 Nom —— 由谓词控制的解析器；以及重复解析器的组合器。

## 使用谓词的解析器

一个 `predicate` 是一个返回布尔值的函数（即，给定一些输入，它返回 `true` 或 `false`）。这些在解析时非常常见 - 例如，谓词 `is_vowel` 可能决定字符是否是英语元音（a、e、i、o 或 u）。

这些可用于制作 Nom 尚未内置的解析器。例如，下面的解析器将采用尽可能多的元音。

有几种不同类别的谓词解析器值得一提：

- 对于字节，有三种不同类别的解析器：`take_till`、`take_until` 和 `take_while`。 `take_till` 将继续使用输入，直到其输入满足谓词。 `take_while` 将继续使用输入，直到其输入不满足谓词。`take_until` 看起来很像谓词解析器，但只是使用直到第一次出现字节模式。
- 有些解析器有一个 “孪生兄弟”，其名称末尾带有 `1` —— 例如，`take_while` 有 `take_while1`。它们之间的区别在于，`take_while` 如果第一个字节不满足谓词，可能会返回一个空切片。`take_while1` 如果谓词不满足，则返回错误。
- 作为一个特例，`take_while_m_n` 类似于 `take_while`，但保证它将消耗至少m字节，并且不会超过n字节。

| 组合子 | 用法 | 输入 | 输出 | 注释 |
| --- | --- | --- | --- | --- |
| [take_while](https://docs.rs/nom/latest/nom/bytes/complete/fn.take_while.html) | `take_while(is_alphabetic)` | `"abc123"` | `Ok(("123", "abc"))` | 返回提供函数返回 true 的最长字节列表。`take_while1` 做同样的事情，但必须返回至少一个字符。`take_while_m_n` 做同样的事情，但必须返回介于 `m` 和 `n` 个字符之间。 |
| [take_till](https://docs.rs/nom/latest/nom/bytes/complete/fn.take_till.html) | `take_till(is_alphabetic)` | `"123abc"` | `Ok(("abc", "123"))` | 返回提供函数返回 true 之前的最长字节或字符列表。`take_till1` 做同样的事情，但必须返回至少一个字符。这是 `take_while` 的反向行为：`take_till(f)` 等价于 `take_while(|c| !f(c))` |
| [take_until](https://docs.rs/nom/latest/nom/bytes/complete/fn.take_until.html) | `take_until("world")` | `"Hello world"` | `Ok(("world", "Hello "))` | 返回提供标签被找到之前的最长字节或字符列表。`take_until1` 做同样的事情，但必须返回至少一个字符。 |