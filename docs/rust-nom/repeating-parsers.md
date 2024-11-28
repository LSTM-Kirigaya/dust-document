---
title: 6. 重复解析器
---

重复谓词的单个解析器很有用，但更有用的是重复解析器的组合器。Nom 有多个按照这一原则运行的组合器；其中最明显的是 `many0` ，它尽可能多地应用解析器；并返回这些解析结果的向量。这是一个例子：

```rust
extern crate nom;
use std::error::Error;
use nom::IResult;
use nom::multi::many0;
use nom::bytes::complete::tag;

fn parser(s: &str) -> IResult<&str, Vec<&str>> {
  many0(tag("abc"))(s)
}

fn main() {
    assert_eq!(parser("abcabc"), Ok(("", vec!["abc", "abc"])));
    assert_eq!(parser("abc123"), Ok(("123", vec!["abc"])));
    assert_eq!(parser("123123"), Ok(("123123", vec![])));
    assert_eq!(parser(""), Ok(("", vec![])));
}
```

有许多不同的解析器可供选择：

| 组合子 | 用法 | 输入 | 输出 | 注释 |
| --- | --- | --- | --- | --- |
| [count](https://docs.rs/nom/latest/nom/multi/fn.count.html) | `count(take(2), 3)` | `"abcdefgh"` | `Ok(("gh", vec!["ab", "cd", "ef"]))` | 将子解析器应用指定次数 |
| [many0](https://docs.rs/nom/latest/nom/multi/fn.many0.html) | `many0(tag("ab"))` | `"abababc"` | `Ok(("c", vec!["ab", "ab", "ab"]))` | 将解析器应用 0 次或更多次，并返回结果列表。`many1` 做同样的事情，但必须返回至少一个元素 |
| [many_m_n](https://docs.rs/nom/latest/nom/multi/fn.many_m_n.html) | `many_m_n(1, 3, tag("ab"))` | `"ababc"` | `Ok(("c", vec!["ab", "ab"]))` | 将解析器应用在 m 和 n 次之间（包括 n），并返回结果列表 |
| [many_till](https://docs.rs/nom/latest/nom/multi/fn.many_till.html) | `many_till(tag("ab"), tag("ef"))` | `"ababefg"` | `Ok(("g", (vec!["ab", "ab"], "ef")))` | 将第一个解析器应用到第二个解析器应用为止。返回一个包含第一个解析器结果列表和第二个解析器结果的元组 |
| [separated_list0](https://docs.rs/nom/latest/nom/multi/fn.separated_list0.html) | `separated_list0(tag(","), tag("ab"))` | `"ab,ab,ab."` | `Ok((".", vec!["ab", "ab", "ab"]))` | `separated_list1` 的工作方式与 `separated_list0` 类似，但必须返回至少一个元素 |
| [fold_many0](https://docs.rs/nom/latest/nom/multi/fn.fold_many0.html) | `fold_many0(be_u8, || 0, |acc, item| acc + item)` | `[1, 2, 3]` | `Ok(([], 6))` | 将解析器应用 0 次或更多次，并折叠返回值列表。`fold_many1` 版本必须至少应用一次子解析器 |
| [fold_many_m_n](https://docs.rs/nom/latest/nom/multi/fn.fold_many_m_n.html) | `fold_many_m_n(1, 2, be_u8, || 0, |acc, item| acc + item)` | `[1, 2, 3]` | `Ok(([3], 3))` | 将解析器应用在 m 和 n 次之间（包括 n），并折叠返回值列表 |
| [length_count](https://docs.rs/nom/latest/nom/multi/fn.length_count.html) | `length_count(number, tag("ab"))` | `"2ababab"` | `Ok(("ab", vec!["ab", "ab"]))` | 从第一个解析器获取一个数字，然后应用第二个解析器该次数 |