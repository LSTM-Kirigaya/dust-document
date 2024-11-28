---
title: 4. 具有自定义返回类型的解析器
---

到目前为止，我们看到的大多数函数都接受一个 `&str`，并返回一个 `IResult<&str, &str>`。将字符串拆分成更小的字符串当然很有用，但这并不是 Nom 唯一能做的事情！

解析时的一个有用操作是在类型之间进行转换；例如从 解析为 `&str` 另一个原语，如 `bool`。

要使解析器返回不同的类型，我们需要做的就是将 `IResult` 的第二个类型参数更改为所需的返回类型。例如，要返回布尔值，则返回 `IResult<&str, bool>`。

回想一下， 的第一个类型参数 `IResult` 是输入类型，因此即使您返回不同的东西，如果您的输入是 `&str`， 的第一个类型参数 `IResult` 也应该是。

在您阅读有关 Errors 的章节之前，我们强烈建议您避免使用 Rust 内置的解析器（如 `str.parse`）；因为它们需要特殊处理才能与 Nom 很好地配合。

也就是说，进行类型转换的一种 Nom 原生方法是使用 [`value`](https://docs.rs/nom/latest/nom/combinator/fn.value.html) 组合器将成功解析转换为特定值。

以下代码将包含 `"true"` 或 `"false"` 的字符串转换为相应的 `bool`。

```rust
use nom::IResult;
use nom::bytes::complete::tag;
use nom::combinator::value;
use nom::branch::alt;

fn parse_bool(input: &str) -> IResult<&str, bool> {
    // either, parse `"true"` -> `true`; `"false"` -> `false`, or error.
    alt((
      value(true, tag("true")),
      value(false, tag("false")),
    ))(input)
}

fn main() -> Result<(), Box<dyn Error>> {
    // Parses the `"true"` out.
    let (remaining, parsed) = parse_bool("true|false")?;
    assert_eq!(parsed, true);
    assert_eq!(remaining, "|false");
   
    // If we forget about the "|", we get an error.
    let parsing_error = parse_bool(remaining);
    assert!(parsing_error.is_err());
    
    // Skipping the first byte gives us `false`!
    let (remaining, parsed) = parse_bool(&remaining[1..])?;
    assert_eq!(parsed, false);
    assert_eq!(remaining, "");
}
```

## Nom 的内置解析器函数

nom 内置了大量的解析器。这是 [识别特定字符的解析器](https://docs.rs/nom/latest/nom/character/complete/index.html) 的列表。我花了点时间转写成了简体中文的 markdown 如下

| 函数 | 描述 |
| --- | --- |
| [alpha0](fn.alpha0.html) | 识别零个或多个小写和大写 ASCII 字母字符：a-z, A-Z |
| [alpha1](fn.alpha1.html) | 识别一个或多个小写和大写 ASCII 字母字符：a-z, A-Z |
| [alphanumeric0](fn.alphanumeric0.html) | 识别零个或多个 ASCII 数字和字母字符：0-9, a-z, A-Z |
| [alphanumeric1](fn.alphanumeric1.html) | 识别一个或多个 ASCII 数字和字母字符：0-9, a-z, A-Z |
| [anychar](fn.anychar.html) | 匹配一个字节作为字符。注意，输入类型将接受 `str`，但不接受 `&[u8]`，与其他许多 nom 解析器不同。 |
| [char](fn.char.html) | 识别一个字符。 |
| [crlf](fn.crlf.html) | 识别字符串 “\r\n”。 |
| [digit0](fn.digit0.html) | 识别零个或多个 ASCII 数字字符：0-9 |
| [digit1](fn.digit1.html) | 识别一个或多个 ASCII 数字字符：0-9 |
| [hex_digit0](fn.hex_digit0.html) | 识别零个或多个 ASCII 十六进制数字字符：0-9, A-F, a-f |
| [hex_digit1](fn.hex_digit1.html) | 识别一个或多个 ASCII 十六进制数字字符：0-9, A-F, a-f |
| [i8](fn.i8.html) | 将文本形式的数字解析为数字 |
| [i16](fn.i16.html) | 将文本形式的数字解析为数字 |
| [i32](fn.i32.html) | 将文本形式的数字解析为数字 |
| [i64](fn.i64.html) | 将文本形式的数字解析为数字 |
| [i128](fn.i128.html) | 将文本形式的数字解析为数字 |
| [line_ending](fn.line_ending.html) | 识别行尾（‘\n’ 和 ‘\r\n’）。 |
| [multispace0](fn.multispace0.html) | 识别零个或多个空格、制表符、回车符和换行符。 |
| [multispace1](fn.multispace1.html) | 识别一个或多个空格、制表符、回车符和换行符。 |
| [newline](fn.newline.html) | 匹配换行符 ‘\n’。 |
| [none_of](fn.none_of.html) | 识别不在提供的字符中的一个字符。 |
| [not_line_ending](fn.not_line_ending.html) | 识别除 ‘\r\n’ 或 ‘\n’ 之外的任何字符的字符串。 |
| [oct_digit0](fn.oct_digit0.html) | 识别零个或多个八进制字符：0-7 |
| [oct_digit1](fn.oct_digit1.html) | 识别一个或多个八进制字符：0-7 |
| [one_of](fn.one_of.html) | 识别提供的字符中的一个字符。 |
| [satisfy](fn.satisfy.html) | 识别一个字符并检查它是否满足谓词。 |
| [space0](fn.space0.html) | 识别零个或多个空格和制表符。 |
| [space1](fn.space1.html) | 识别一个或多个空格和制表符。 |
| [tab](fn.tab.html) | 匹配制表符 ‘\t’。 |
| [u8](fn.u8.html) | 将文本形式的数字解析为数字 |
| [u16](fn.u16.html) | 将文本形式的数字解析为数字 |
| [u32](fn.u32.html) | 将文本形式的数字解析为数字 |
| [u64](fn.u64.html) | 将文本形式的数字解析为数字 |
| [u128](fn.u128.html) | 将文本形式的数字解析为数字 |

其中有些我们在第 2 章中已经见过，但现在我们还可以尝试返回不同类型的解析器，例如i32。下一节将展示此解析器的一个示例。

## 构建更复杂的例子

解析自定义类型的一个更复杂的例子可能是解析二维坐标。

让我们尝试弄清楚如何设计它。

- 我们知道我们想要获取一个字符串，比如 `"(3, -2)"`，并将其转换为一个 `Coordinate` 结构体。
- 我们可以将其分为三个部分：

```python
(vvvvvvvvvvvvv) # 外部的括号
  vvvv , vvvv   # 逗号，这是分隔符
    3     -2    # 真实的数字
```

- 因此，我们需要三个解析器来解决这个问题：
    1. 整数解析器，用于处理原始数字。
    2. 逗号分隔对的解析器，将其拆分为整数。
    3. 外括号的解析器。
- 下面我们可以看到我们如何实现这个目标：


```rust
extern crate nom;
use std::error::Error;
use nom::IResult;
use nom::bytes::complete::tag;
use nom::sequence::{separated_pair, delimited};

// 这是我们将解析成的类型。
#[derive(Debug,PartialEq)]
pub struct Coordinate {
  pub x:   i32,
  pub y:   i32,
}

// 1. Nom 内置了 i32 解析器。
use nom::character::complete::i32;

// 2. 使用 `separated_pair` 解析器来组合两个解析器（在本例中，两个 `i32`），忽略中间的内容。
fn parse_integer_pair(input: &str) -> IResult<&str, (i32, i32)> {
    separated_pair(
        i32,
        tag(", "),
        i32
    )(input)
}

// 3. 使用 `delimited` 解析器来应用一个解析器，忽略两个包围解析器的结果。
fn parse_coordinate(input: &str) -> IResult<&str, Coordinate> {
    let (remaining, (x, y)) = delimited(
        tag("("),
        parse_integer_pair,
        tag(")")
    )(input)?;
    
    // Note：我们可以通过在 `Coordinate` 上实现 `From` 来构造这个结构体，
    // 但我们没有这样做，只是为了让它更明显地展示发生了什么。
    Ok((remaining, Coordinate {x, y}))
    
}

fn main() -> Result<(), Box<dyn Error>> {
    let (_, parsed) = parse_coordinate("(3, 5)")?;
    assert_eq!(parsed, Coordinate {x: 3, y: 5});
   
    let (_, parsed) = parse_coordinate("(2, -4)")?;
    assert_eq!(parsed, Coordinate {x: 2, y: -4});
    
    let parsing_error = parse_coordinate("(3,)");
    assert!(parsing_error.is_err());
    
    let parsing_error = parse_coordinate("(,3)");
    assert!(parsing_error.is_err());
    
    let parsing_error = parse_coordinate("Ferris");
    assert!(parsing_error.is_err());
    

  Ok(())
}
```

作为练习，您可能想探索如何让这个解析器优雅地处理输入中的空格。