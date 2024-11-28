---
title: 7. 使用来自外部标准的错误
---

nom 的错误处理设计考虑了多种需求：
- 指示哪个解析器失败以及在输入数据中的位置
- 随着错误在解析器链中向上传递，积累更多上下文
- 具有非常低的开销，因为错误通常会被调用解析器丢弃（例如：`many0`、`alt`）
- 可以根据用户的需求进行修改，因为某些语言需要更多的信息

为了满足这些要求，nom 解析器必须返回以下结果类型：

```rust
pub type IResult<I, O, E=nom::error::Error<I>> = Result<(I, O), nom::Err<E>>;

pub enum Err<E> {
    Incomplete(Needed),
    Error(E),
    Failure(E),
}
```

结果要么是包含剩余输入和解析值的 `Ok((I, O))`，要么是包含错误类型的 `Err(nom::Err<E>)`。`nom::Err<E>` 是一个枚举，因为组合器可以根据值具有不同的行为。`Err<E>` 枚举表示解析器错误的 3 种条件：

- `Incomplete` 表示解析器没有足够的数据来决定。这可以由 streaming 子模块中的解析器返回，以指示我们应该从文件或套接字缓冲更多数据。`complete` 子模块中的解析器假设它们拥有整个输入数据，因此如果数据不足，它们将返回 `Err::Error`。当解析器返回 `Incomplete` 时，我们应该在缓冲区中积累更多数据（例如：从套接字读取），然后再次调用解析器
- `Error` 是正常的解析器错误。如果 `alt` 组合器的子解析器返回 `Error`，它将尝试另一个子解析器
- `Failure` 是我们无法恢复的错误：如果子解析器返回 `Failure`，`alt` 组合器将不会尝试其他分支。如果我们知道我们在正确的分支中（例如：我们找到了正确的字符前缀，但后面的输入是错误的），我们可以使用 `cut()` 组合器将 `Err::Error` 转换为 `Err::Failure`

如果我们运行一个解析器并且知道它不会返回 `Err::Incomplete`，我们可以使用 `finish()` 方法直接从 `Err::Error` 或 `Err::Failure` 中提取错误类型：

```rust
let parser_result: IResult<I, O, E> = parser(input);
let result: Result<(I, O), E> = parser_result.finish();
```

如果我们使用借用的类型作为输入，如 `&[u8]` 或 `&str`，我们可能希望将其转换为拥有的类型以传输它，使用 `to_owned()` 方法：

```rust
let result: Result<(&[u8], Value), Err<Vec<u8>>> =
  parser(data).map_err(|e: E<&[u8]>| e.to_owned());
```

nom 提供了一个强大的错误系统，可以适应您的需求：如果您想提高性能，可以获取减少的错误信息，或者您可以获取解析器应用的精确跟踪，并带有细粒度的位置信息。

这是通过 `IResult` 的第三个类型参数完成的，nom 的解析器结果类型：

```rust
pub type IResult<I, O, E=nom::error::Error<I>> = Result<(I, O), Err<E>>;

pub enum Err<E> {
    Incomplete(Needed),
    Error(E),
    Failure(E),
}
```

这个错误类型在 nom 的组合器中是完全通用的，因此您可以在定义解析器时选择要使用的错误类型，或者直接在调用站点选择。


## 常见的错误类型

### 默认错误类型：nom::error::Error

```rust
#[derive(Debug, PartialEq)]
pub struct Error<I> {
    /// 错误在输入数据中的位置
    pub input: I,
    /// nom 错误代码
    pub code: ErrorKind,
}
```

这个结构包含一个 `nom::error::ErrorKind`，指示哪种解析器遇到了错误（例如：`ErrorKind::Tag` 用于 `tag()` 组合器），以及错误的位置。

这种错误类型速度快且开销非常低，因此适用于重复调用的解析器，如网络协议中的解析器。但它非常有限，不会告诉你解析器调用的链，因此不足以编写用户友好的错误。

### 获取更多信息：nom::error::VerboseError

`VerboseError<I>` 类型积累了更多关于遇到错误的解析器链的信息：

```rust
#[derive(Clone, Debug, PartialEq)]
pub struct VerboseError<I> {
  /// 由 `VerboseError` 积累的错误列表，包含受影响的输入数据部分和一些上下文
  pub errors: crate::lib::std::vec::Vec<(I, VerboseErrorKind)>,
}

#[derive(Clone, Debug, PartialEq)]
/// `VerboseError` 的错误上下文
pub enum VerboseErrorKind {
    /// 由 `context` 函数添加的静态字符串
    Context(&'static str),
    /// 指示 `char` 函数期望的字符
    Char(char),
    /// 由各种 nom 解析器给出的错误类型
    Nom(ErrorKind),
}
```

它包含每个解析器的输入位置和错误代码。它不会从 `alt` 的不同分支积累错误，它只会包含它尝试的最后一个分支的错误。

它可以与 `nom::error::context` 组合器一起使用，以通知解析器链：

```rust
context(
  "string",
  preceded(char('\"'), cut(terminated(parse_str, char('\"')))),
)(i)
```

如果直接打印，它不是很可用：

```rust
// parsed verbose: Err(
//   Failure(
//       VerboseError {
//           errors: [
//               (
//                   "1\"hello\" : \"world\"\n  }\n  } ",
//                   Char(
//                       '}',
//                   ),
//               ),
//               (
//                   "{ 1\"hello\" : \"world\"\n  }\n  } ",
//                   Context(
//                       "map",
//                   ),
//               ),
//               (
//                   "{ \"a\"\t: 42,\n  \"b\": [ \"x\", \"y\", 12 ] ,\n  \"c\": { 1\"hello\" : \"world\"\n  }\n  } ",
//                   Context(
//                       "map",
//                   ),
//               ),
//           ],
//       },
//   ),
// )
println!("parsed verbose: {:#?}", json::<VerboseError<&str>>(data));
```

但通过查看原始输入和错误链，我们可以构建一个更用户友好的错误消息。nom::error::convert_error 函数可以构建这样的消息。

```rust
let e = json::<VerboseError<&str>>(data).finish().err().unwrap();
// 这里我们使用 `convert_error` 函数，将 `VerboseError<&str>` 转换为可打印的跟踪。
//
// 这将打印：
// verbose errors - `json::<VerboseError<&str>>(data)`:
// 0: at line 2:
//   "c": { 1"hello" : "world"
//          ^
// expected '}', found 1
//
// 1: at line 2, in map:
//   "c": { 1"hello" : "world"
//        ^
//
// 2: at line 0, in map:
//   { "a" : 42,
//   ^
println!(
  "verbose errors - `json::<VerboseError<&str>>(data)`:\n{}",
  convert_error(data, e)
);
```

请注意，`VerboseError` 和 `convert_error` 旨在作为语言错误的起点，但它们不能涵盖所有用例。因此，可能需要编写自定义的 `convert_error` 函数。

提高可用性：`nom_locate` 和 `nom-supreme`
这些 `crate` 旨在提高编写 nom 解析器时的用户体验。

#### nom_locate
[`nom_locate`](https://docs.rs/nom_locate) 将输入数据包装在一个 `Span` 类型中，该类型可以被 nom 解析器理解。该类型提供位置信息，如行和列。

#### nom-supreme
[`nom-supreme`](https://docs.rs/nom-supreme) 提供了 `ErrorTree<I>` 错误类型，该类型提供了与 `VerboseError` 相同的解析器错误链，但也积累了 alt 尝试的各种分支的错误。

使用这种错误类型，您可以探索解析器尝试的所有内容。


## `ParseError` trait

如果这些错误类型不够，我们可以通过实现 `ParseError<I>` trait 来定义自己的错误类型。所有 nom 组合器都对其错误进行了泛型化，因此我们只需要在解析器结果类型中定义它，它将在各处使用。

```rust
pub trait ParseError<I>: Sized {
    /// 从输入位置和 [ErrorKind] 创建错误
    fn from_error_kind(input: I, kind: ErrorKind) -> Self;

    /// 将现有错误与从输入位置和 [ErrorKind] 创建的新错误组合。这在回溯解析树时很有用，可以在过程中积累错误上下文
    fn append(input: I, kind: ErrorKind, other: Self) -> Self;

    /// 从输入位置和期望的字符创建错误
    fn from_char(input: I, _: char) -> Self {
        Self::from_error_kind(input, ErrorKind::Char)
    }

    /// 组合两个现有错误。此函数用于比较 `alt` 中生成的各种错误
    fn or(self, other: Self) -> Self {
        other
    }
}
```

任何错误类型都必须实现该 trait，该 trait 要求构建错误的方法：

- `from_error_kind`：从输入位置和指示哪个解析器出错的 `ErrorKind` 枚举构建错误
- `append`：允许在回溯解析树时创建错误链（各种组合器将添加更多上下文）
- `from_char`：创建指示我们期望的字符的错误
- `or`：在 `alt` 等组合器中，允许在各种分支的错误之间进行选择（或积累它们）

我们还可以实现 `ContextError` trait 以支持 `VerboseError<I>` 使用的 `context()` 组合器：

```rust
pub trait ContextError<I>: Sized {
    fn add_context(_input: I, _ctx: &'static str, other: Self) -> Self {
        other
    }
}
```

还有一个 `FromExternalError<I, E>` 用于 `map_res` 包装其他函数返回的错误：

```rust
pub trait FromExternalError<I, ExternalError> {
  fn from_external_error(input: I, kind: ErrorKind, e: ExternalError) -> Self;
}
```

### 示例用法

让我们定义一个调试错误类型，每次生成错误时都会打印一些内容。这将让我们很好地了解解析器尝试了什么。由于错误可以相互组合，我们希望它保留一些刚刚返回的错误信息。我们将其存储在一个字符串中：

```rust
struct DebugError {
    message: String,
}
```

现在让我们在它上面实现 `ParseError` 和 `ContextError`：

```rust
impl ParseError<&str> for DebugError {
    // 在一行中，我们显示错误代码和导致它的输入
    fn from_error_kind(input: &str, kind: ErrorKind) -> Self {
        let message = format!("{:?}:\t{:?}\n", kind, input);
        println!("{}", message);
        DebugError { message }
    }

    // 如果组合多个错误，我们将它们一个接一个地显示
    fn append(input: &str, kind: ErrorKind, other: Self) -> Self {
        let message = format!("{}{:?}:\t{:?}\n", other.message, kind, input);
        println!("{}", message);
        DebugError { message }
    }

    fn from_char(input: &str, c: char) -> Self {
        let message = format!("'{}':\t{:?}\n", c, input);
        println!("{}", message);
        DebugError { message }
    }

    fn or(self, other: Self) -> Self {
        let message = format!("{}\tOR\n{}\n", self.message, other.message);
        println!("{}", message);
        DebugError { message }
    }
}

impl ContextError<&str> for DebugError {
    fn add_context(input: &str, ctx: &'static str, other: Self) -> Self {
        let message = format!("{}\"{}\":\t{:?}\n", other.message, ctx, input);
        println!("{}", message);
        DebugError { message }
    }
}
```

因此，当使用这种错误类型调用我们的 JSON 解析器时，我们将获得解析器停止和回溯的所有时间的跟踪：

```rust
println!("debug: {:#?}", root::<DebugError>(data));
```

```
AlphaNumeric:   "\"\t: 42,\n  \"b\": [ \"x\", \"y\", 12 ] ,\n  \"c\": { 1\"hello\" : \"world\"\n  }\n  } "

'{':    "42,\n  \"b\": [ \"x\", \"y\", 12 ] ,\n  \"c\": { 1\"hello\" : \"world\"\n  }\n  } "

'{':    "42,\n  \"b\": [ \"x\", \"y\", 12 ] ,\n  \"c\": { 1\"hello\" : \"world\"\n  }\n  } "
"map":  "42,\n  \"b\": [ \"x\", \"y\", 12 ] ,\n  \"c\": { 1\"hello\" : \"world\"\n  }\n  } "

[..]

AlphaNumeric:   "\": { 1\"hello\" : \"world\"\n  }\n  } "

'"':    "1\"hello\" : \"world\"\n  }\n  } "

'"':    "1\"hello\" : \"world\"\n  }\n  } "
"string":       "1\"hello\" : \"world\"\n  }\n  } "

'}':    "1\"hello\" : \"world\"\n  }\n  } "

'}':    "1\"hello\" : \"world\"\n  }\n  } "
"map":  "{ 1\"hello\" : \"world\"\n  }\n  } "

'}':    "1\"hello\" : \"world\"\n  }\n  } "
"map":  "{ 1\"hello\" : \"world\"\n  }\n  } "
"map":  "{ \"a\"\t: 42,\n  \"b\": [ \"x\", \"y\", 12 ] ,\n  \"c\": { 1\"hello\" : \"world\"\n  }\n  } "

debug: Err(
    Failure(
        DebugError {
            message: "'}':\t\"1\\\"hello\\\" : \\\"world\\\"\\n  }\\n  } \"\n\"map\":\t\"{ 1\\\"hello\\\" : \\\"world
\\"\\n  }\\n  } \"\n\"map\":\t\"{ \\\"a\\\"\\t: 42,\\n  \\\"b\\\": [ \\\"x\\\", \\\"y\\\", 12 ] ,\\n  \\\"c\\\": { 1\
\"hello\\\" : \\\"world\\\"\\n  }\\n  } \"\n",
        },
    ),
)
```

在这里我们可以看到，当解析 `{ 1\"hello\" : \"world\"\n }\n }` 时，在通过初始的 `{` 之后，我们尝试了：

- 解析一个 `"`，因为我们期望一个键名，并且该解析器是 `"string"` 解析器的一部分
- 解析一个 `}`，因为映射可能是空的。当这失败时，我们回溯，通过 2 个递归映射解析器：

```
'}':    "1\"hello\" : \"world\"\n  }\n  } "
"map":  "{ 1\"hello\" : \"world\"\n  }\n  } "
"map":  "{ \"a\"\t: 42,\n  \"b\": [ \"x\", \"y\", 12 ] ,\n  \"c\": { 1\"hello\" : \"world\"\n  }\n  } "
```

## 调试解析器

在编写解析器时，有时需要跟踪解析器的哪一部分看到了输入的哪一部分。

为此，nom 提供了 `dbg_dmp` 函数，该函数将观察解析器的输入和输出，并在发生错误时打印输入的十六进制转储。以下是它可能返回的内容：

```rust
fn f(i: &[u8]) -> IResult<&[u8], &[u8]> {
    dbg_dmp(tag("abcd"), "tag")(i)
}

let a = &b"efghijkl"[..];

// 将打印以下消息：
// tag: Error(Error(Error { input: [101, 102, 103, 104, 105, 106, 107, 108], code: Tag })) at:
// 00000000        65 66 67 68 69 6a 6b 6c         efghijkl
f(a);
```

您可以更进一步，使用[ nom-trace crate](https://github.com/rust-bakery/nom-trace)

## 特别说明

使用 `map_res` 函数特别有用。它允许您将外部错误转换为 Nom 错误。有关示例，请参阅首页上的 Nom 示例。