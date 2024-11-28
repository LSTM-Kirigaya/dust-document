---
title: 2. 标签与字符类
---

## 标签 Tag

您可以编写的最简单、最实用的解析器是没有特殊字符的解析器，它只匹配字符串。

在 nom 中，我们将简单的字节集合称为标签（tag）。由于这些字符非常常见，nom 提供一个名为 `tag()` 的函数。此函数返回给定字符串的解析器。


:::warning
警告：nom有多个不同的定义tag，请确保暂时使用这个！
```rust
pub use nom::bytes::complete::tag;
```
:::

例如，解析字符串的代码 `"abc"` 可以表示为 `tag("abc")`。

如果你没有使用以函数为值的语言进行编程，那么标记函数的类型签名可能会让你感到惊讶：

```rust
pub fn tag<T, Input, Error: ParseError<Input>>(
    tag: T
) -> impl Fn(Input) -> IResult<Input, Input, Error> where
    Input: InputTake + Compare<T>,
    T: InputLength + Clone, 
```

或者，对于 `T` 和 `Input` 均为 `&str` 的情况，稍微简化一下：

```rust
fn tag(tag: &str) -> (impl Fn(&str) -> IResult<&str, Error>)
```

换句话说，这个函数 `tag` 返回一个函数。它返回的函数是一个解析器，接受一个 `&str` 并返回一个 `IResult`。函数创建解析器并返回它们是 nom 中的常见模式，因此调用它很有用。

下面，我们实现了一个使用 `tag` 的函数。

```rust
fn parse_input(input: &str) -> IResult<&str, &str> {
    // 注意，这里实际上是在创建一个函数，即解析器 "abc"
    //  vvvvv 
    //        这个解析器在这里被调用，返回一个 IResult<&str, &str>
    //         vvvvv
    tag("abc")(input)
}

fn main() -> Result<(), Box<dyn Error>> {
    let (leftover_input, output) = parse_input("abcWorld")?;
    assert_eq!(leftover_input, "World");
    assert_eq!(output, "abc");

    assert!(parse_input("defWorld").is_err());
}
```

如果您愿意，您还可以使用 [tag_no_case](https://docs.rs/nom/latest/nom/bytes/complete/fn.tag_no_case.html) 函数检查不区分大小写的标签。

## 字符类 Character Class

标签非常有用，但也非常受限。Nom 功能的另一端是预先编写的解析器，它允许我们接受一组字符中的任何一个，而不仅仅是接受定义序列中的字符。

以下是其中的一部分：

- [`alpha0`](https://docs.rs/nom/latest/nom/character/complete/fn.alpha0.html)：识别零个或多个小写和大写字母字符：`/[a-zA-Z]/`. [`alpha1`](https://docs.rs/nom/latest/nom/character/complete/fn.alpha1.html) 执行相同操作，但返回至少一个字符
- [`alphanumeric0`](https://docs.rs/nom/latest/nom/character/complete/fn.alphanumeric0.html)：识别零个或多个数字和字母字符：`/[0-9a-zA-Z]/`. [`alphanumeric1`](https://docs.rs/nom/latest/nom/character/complete/fn.alphanumeric1.html) 执行相同操作，但返回至少一个字符
- [`digit0`](https://docs.rs/nom/latest/nom/character/complete/fn.digit0.html)：识别零个或多个数字字符：`/[0-9]/`. [`digit1`](https://docs.rs/nom/latest/nom/character/complete/fn.digit1.html) 执行相同操作，但返回至少一个字符
- [`multispace0`](https://docs.rs/nom/latest/nom/character/complete/fn.multispace0.html)：识别零个或多个空格、制表符、回车符和换行符。[`multispace1`](https://docs.rs/nom/latest/nom/character/complete/fn.multispace1.html) 执行相同操作，但返回至少一个字符
- [`space0`](https://docs.rs/nom/latest/nom/character/complete/fn.space0.html)：识别零个或多个空格和制表符。[`space1`](https://docs.rs/nom/latest/nom/character/complete/fn.space1.html)执行相同操作，但返回至少一个字符
- [`line_ending`](https://docs.rs/nom/latest/nom/character/complete/fn.line_ending.html)：识别行尾（`\n` 和 `\r\n`）
- [`newline`](https://docs.rs/nom/latest/nom/character/complete/fn.newline.html)：匹配换行符`\n`
- [`tab`](https://docs.rs/nom/latest/nom/character/complete/fn.tab.html)：匹配制表符 `\t`

我们可以使用它们

```rust
pub use nom::character::complete::alpha0;
fn parser(input: &str) -> IResult<&str, &str> {
    alpha0(input)
}

fn main() -> Result<(), Box<dyn Error>> {
    let (remaining, letters) = parser("abc123")?;
    assert_eq!(remaining, "123");
    assert_eq!(letters, "abc");
}
```

需要注意的一点是，由于这些函数的类型签名，最好在返回的函数中使用它们 `IResult` 。

如果不这样做，就必须手动指定一些有关函数类型的信息tag，这可能会导致冗长的代码或令人困惑的错误。

