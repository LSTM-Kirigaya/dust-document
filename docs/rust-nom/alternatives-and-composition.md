---
title: 3. 替代和组合
---


在上一章中，我们了解了如何使用 `tag` 函数创建简单的解析器；以及一些 Nom 预构建的解析器。

在本章中，我们将探讨 Nom 的另外两个广泛使用的功能：替代和组合。

## 替代

有时，我们可能想在两个解析器之间进行选择；并且无论使用其中哪一种都可以解决问题。

Nom 通过组合器赋予我们类似的能力 `alt()`。

```rust
use nom::branch::alt;
```

组合器 `alt()` 将执行元组中的每个解析器，直到找到一个不出错的解析器。如果全部出错，则默认会给出最后一个错误的错误。

我们可以看到 `alt()` 下面的一个基本例子。

```rust
extern crate nom;
use nom::branch::alt;
use nom::bytes::complete::tag;
use nom::IResult;
use std::error::Error;

fn parse_abc_or_def(input: &str) -> IResult<&str, &str> {
    alt((
        tag("abc"),
        tag("def")
    ))(input)
}

fn main() -> Result<(), Box<dyn Error>> {
    let (leftover_input, output) = parse_abc_or_def("abcWorld")?;
    assert_eq!(leftover_input, "World");
    assert_eq!(output, "abc");

    assert!(parse_abc_or_def("ghiWorld").is_err());
  Ok(())
}
```

## 组合

现在我们可以创建更有趣的正则表达式了，我们可以将它们组合在一起。最简单的方法就是按顺序对它们进行解析：

```rust
extern crate nom;
use nom::branch::alt;
use nom::bytes::complete::tag;
use nom::IResult;
use std::error::Error;

fn parse_abc(input: &str) -> IResult<&str, &str> {
    tag("abc")(input)
}
fn parse_def_or_ghi(input: &str) -> IResult<&str, &str> {
    alt((
        tag("def"),
        tag("ghi")
    ))(input)
}

fn main() -> Result<(), Box<dyn Error>> {
    let input = "abcghi";
    let (remainder, abc) = parse_abc(input)?;
    let (remainder, def_or_ghi) = parse_def_or_ghi(remainder)?;
    println!("first parsed: {abc}; then parsed: {def_or_ghi};");
    
  Ok(())
}
```

编写标签是一项非常常见的要求，事实上，Nom 有一些内置的组合器可以做到这一点。其中最简单的是 `tuple()` 。`tuple()` 组合器接受一个解析器元组，要么返回 `Ok` 所有成功解析的元组，要么返回 `Err` 第一个失败解析器的。

```rust
use nom::sequence::tuple;
```

```rust
extern crate nom;
use nom::branch::alt;
use nom::sequence::tuple;
use nom::bytes::complete::tag_no_case;
use nom::character::complete::{digit1};
use nom::IResult;
use std::error::Error;

fn parse_base(input: &str) -> IResult<&str, &str> {
    alt((
        tag_no_case("a"),
        tag_no_case("t"),
        tag_no_case("c"),
        tag_no_case("g")
    ))(input)
}

fn parse_pair(input: &str) -> IResult<&str, (&str, &str)> {
    // 组合子 many_m_n 在这里也是正确的
    tuple((
        parse_base,
        parse_base,
    ))(input)
}

fn main() -> Result<(), Box<dyn Error>> {
    let (remaining, parsed) = parse_pair("aTcG")?;
    assert_eq!(parsed, ("a", "T"));
    assert_eq!(remaining, "cG");
 
    assert!(parse_pair("Dct").is_err());

  Ok(())
}
```

## 额外 Nom 工具

使用 `alt()` 和之后 `tuple()` ，您可能还会对其他一些执行类似操作的解析器感兴趣：

| 组合子 | 用法 | 输入 | 输出 | 注释 |
| --- | --- | --- | --- | --- |
| [delimited](https://docs.rs/nom/latest/nom/sequence/fn.delimited.html) | `delimited(char('('), take(2), char(')'))` | `"(ab)cd"` | `Ok(("cd", "ab"))` | 匹配来自第一个解析器的对象并丢弃它，然后从第二个解析器中获取一个对象，最后匹配来自第三个解析器的对象并丢弃它。 |
| [preceded](https://docs.rs/nom/latest/nom/sequence/fn.preceded.html) | `preceded(tag("ab"), tag("XY"))` | `"abXYZ"` | `Ok(("Z", "XY"))` | 匹配来自第一个解析器的对象并将其丢弃，然后从第二个解析器中获取一个对象。 |
| [terminated](https://docs.rs/nom/latest/nom/sequence/fn.terminated.html) | `terminated(tag("ab"), tag("XY"))` | `"abXYZ"` | `Ok(("Z", "ab"))` | 从第一个解析器获取一个对象，然后匹配来自第二个解析器的一个对象并丢弃它。 |
| [pair](https://docs.rs/nom/latest/nom/sequence/fn.pair.html) | `pair(tag("ab"), tag("XY"))` | `"abXYZ"` | `Ok(("Z", ("ab", "XY")))` | 从第一个解析器获取一个对象，然后从第二个解析器获取另一个对象。 |
| [separated_pair](https://docs.rs/nom/latest/nom/sequence/fn.separated_pair.html) | `separated_pair(tag("hello"), char(','), tag("world"))` | `"hello,world!"` | `Ok(("!", ("hello", "world")))` | 从第一个解析器获取一个对象，然后从 sep_parser 匹配一个对象并丢弃它，然后从第二个解析器获取另一个对象。 |