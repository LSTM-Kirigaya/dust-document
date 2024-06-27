---
title: 静态 HTML 下的安装（native）
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

## 安装 Live2dRender

首先新建文件夹，将我们的 live2d 文件夹（比如我的是 cat）放进来，然后创建 `index.html`，内容如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script src="https://cdn.jsdelivr.net/npm/live2d-render@0.0.5/bundle.js"></script>
    <script>
        Live2dRender.initializeLive2D({
            // live2d 所在区域的背景颜色
            BackgroundRGBA: [0.0, 0.0, 0.0, 0.0],

            // live2d 的 model3.json 文件的相对路径
            ResourcesPath: '/cat/sdwhite cat b.model3.json',

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

</head>
<body>
    <h1>
        live2d-render
    </h1>
</body>
</html>

<style>
html, body {
    color: white;
    background-color: var(--vscode);
}
</style>
```


在当前文件夹中输入

```bash
http-server -c-1 -p 8088
```

打开 `http://localhost:8088` 后效果如下：


![](https://pic1.zhimg.com/80/v2-2a26a487d97e2f33b8b887980230c6e0_1440w.png)