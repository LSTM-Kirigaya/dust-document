---
title: 自定义 ISO 639 配置文件载入
---


在绝大部分情况下， i18n Haru 能够正确地根据你的配置的 `i18n-Haru.root` 下的所有 json 文件根据它们的名字叫将它们识别为对应的 ISO 语言代码。

比如对于下面的工程

:::: code-group
::: code-group-item 项目结构
```markdown
📦.vscode
 ┗ 📜settings.json
📦l10n
 ┣ 📜bundle.l10n.de.json
 ┣ 📜bundle.l10n.ja.json
 ┣ 📜bundle.l10n.en.json
 ┣ 📜bundle.l10n.zh-cn.json
 ┗ 📜bundle.l10n.zh-tw.json
```
:::
::: code-group-item setting.json
```json
{
    "i18n-haru.root": "l10n"
}
```
:::
::::

i18n-Haru 往往会把 `l10n` 下的文件与它们的 ISO 代码解析为如下的对应关系：

```
🎯de    --> 📜bundle.l10n.de.json
🎯ja    --> 📜bundle.l10n.ja.json
🎯en    --> 📜bundle.l10n.en.json
🎯zh-cn --> 📜bundle.l10n.zh-cn.json
🎯zh-tw --> 📜bundle.l10n.zh-tw.json
```

基本的解析逻辑就是去除上面的 i18n 配置文件的后缀名和 **最长共同前缀**，然后用剩余部分去贪心地匹配所有的 ISO 639 代码，

:::info
不了解 ISO 639 代码的朋友，可以看下面的文章
<detail-url
    href="https://kirigaya.cn/blog/article?seq=68"
    title="自然语言的ID——ISO 639语言编码标准"
    logo="https://i0.hdslb.com/bfs/article/0979dbd7e735af424dd4b537cd29d9c184958ab9.png@942w_1061h_progressive.webp"
    desc="ISO 639 是用来分类语言的标准命名法（术语）"
></detail-url>
:::