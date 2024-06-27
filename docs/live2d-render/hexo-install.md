---
title: Hexo 下的安装
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

Hexo 中安装 Live2dRender 非常简单，找到你的主题文件夹，此处以 next 为例，在 `./themes/next/layout/_layout.swig` 的 head 标签中：

```html
<!DOCTYPE html>
<html lang="{{ config.language }}">
<head>
{{ partial('_partials/head/head.swig', {}, {cache: theme.cache.enable}) }}
{% include '_partials/head/head-unique.swig' %}
{{- next_inject('head') }}
<title>{% block title %}{% endblock %}</title>
{{ partial('_third-party/analytics/index.swig', {}, {cache: theme.cache.enable}) }}
{{ partial('_scripts/noscript.swig', {}, {cache: theme.cache.enable}) }}

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
```

然后先生成文件

```bash
hexo g
```

把之前 live2d 文件夹，比如我的是 cat，复制进生成 public 文件夹内。在 public 内启动预览：

```bash
http-server -c-1 -p 8088
```

打开 `http://localhost:8088` 后效果如下：


![](https://picx.zhimg.com/80/v2-cec4e124d57ee35d358ffe659c368059_1440w.png)