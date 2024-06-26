---
title: Hugo 下的安装
---

## 了解和准备 live2d 文件

先准备一个 live2d 模型，一个 live2d 模型通常是一个包含了如下几类文件的文件夹：

- xxx.moc3
- xxx.model3.json (配置文件，live2d 最先读取的就是这个文件，可以认为它是 live2d 模型的入口文件，里面列举了所有模型需要使用的静态资源的相对路径)
- 其他

比如我的模型为一个小猫娘，文件夹为 cat，这个文件夹下包含了如下的文件：
```
/cat
    -| sdwhite cat b.model3.json
    -| SDwhite cat B.moc3
    -| xxx.exp3.json
    -| ...
    -| ...
```

> 模型版权申明：Lenore莱诺尔（B站：一个ayabe）

我把 `cat` 文件夹放在了 `./public` 文件夹下。那么我的模型的基本路径为：`./cat/sdwhite cat b.model3.json`，记住这个路径。

## 安装

先运行一次 hugo

```bash
hugo server
```

此时 hugo 会生成 public 文件夹，将我们的 live2d 文件夹（比如我的是 cat）放进 public。然后找到 主题文件夹，修改内部的 html 文件，比如我的主题是 `digital-garden-hugo-theme`，那么就是修改 `./themes/digital-garden-hugo-theme/layouts/index.html`，在 `{{ end }}` 前一行写入如下代码：

```html
{{ define "main" }}

...

<script src="https://cdn.jsdelivr.net/npm/live2d-render@0.0.5/bundle.js"></script>
<script>
    Live2dRender.initializeLive2D({
        // live2d 所在区域的背景颜色
        BackgroundRGBA: [0.0, 0.0, 0.0, 0.0],

        // live2d 的 model3.json 文件的相对路径
        ResourcesPath: './cat/sdwhite cat b.model3.json',

        // live2d 的大小
        CanvasSize: {
            height: 500,
            width: 400
        },

        
        ShowToolBox: true,

        // 是否使用 indexDB 进行缓存优化，这样下一次载入就不会再发起网络请求了
        LoadFromCache: true

    }).then(() => {
        console.log('finish load');
    });
</script>

{{ end }}
```

其他的主题类似，只需要修改一个最终会被编译进 public 的 html 文件即可。

此时重启 hugo，进入预览网站即可看到 live2d 模型：

![](https://picx.zhimg.com/80/v2-d5cb924fc08c8407515ec8690cc82c6f_1440w.png)