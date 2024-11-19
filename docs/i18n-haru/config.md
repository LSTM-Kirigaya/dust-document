---
title: i18n Haru 插件配置
---

当你进入一个项目，准备使用我的插件配置 i18n 时，需要先让插件知道你的 i18n 配置文件根目录在哪里，假设你的项目如下：

```markdown
📦.vscode
 ┗ 📜settings.json
📦i18n
 ┣ 📜bundle.i18n.de.json
 ┣ 📜bundle.i18n.ja.json
 ┣ 📜bundle.i18n.en.json
 ┣ 📜bundle.i18n.zh-cn.json
 ┗ 📜bundle.i18n.zh-tw.json
```

显然，你的 i18n 配置根目录就是项目下的 `i18n`，那么你需要告诉插件 i18n 就是你的目录。

:::info
i18n Haru 默认就以当前项目根目录下的 `i18n` 作为 i18n 配置文件的根目录，此处只是演示。
:::

打开 vscode，按下 F1 进入命令行模式，输入 “配置 i18n”，可以找到下图第一个选项 “配置 i18n 的文件夹”，按下回车或者点击这个选项卡，会出现一个文件夹选择器，在选择器中选中你的 i18n 配置文件所在的文件夹，点击确定，就配置好了。下面是演示视频，当配置完成后，你写的代码中的 t 函数的自动补全，悬停提示，定义跳转，内嵌提示等等功能都会生效，这代表你的配置成功了。

<video controls width="100%">
  <source src="/i18n-haru/videos/configuration.mp4" type="video/mp4">
  您的浏览器不支持 video 标签。
</video>

除了通过命令来配置，你也可以直接修改 `.vscode/settings.json` 来配置，事实上，上述的过程也只是图形化地帮您完成了整个步骤。

打开 `.vscode/settings.json`，输入

```json
{
  "i18n-haru.root": "i18n"
}
```

其中，`i18n-haru.root` 是 i18n 文件的相对路径（相对于项目根目录）或者绝对路径。

通过上述步骤，阁下就能完成 i18n Haru 的基础配置。