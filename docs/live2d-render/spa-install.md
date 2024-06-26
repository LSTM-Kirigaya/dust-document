---
title: vue/react 项目下的安装
---

## 安装

:::: code-group
::: code-group-item NPM
```bash
npm install live2d-render
```
:::
::: code-group-item YARN
```bash
yarn add live2d-render
```
:::
::::


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

## 使用 live2d-render 展示 live2d

此处以 vue 项目为例，通过如下代码初始化 live2d

```javascript
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue';
import * as live2d from 'live2d-render';

defineComponent({
    name: 'App'
});

onMounted(async () => {
    await live2d.initializeLive2D({
        // live2d 所在区域的背景颜色
        BackgroundRGBA: [0.0, 0.0, 0.0, 0.0],

        // live2d 的 model3.json 文件的相对 根目录 的路径
        ResourcesPath: './cat/sdwhite cat b.model3.json',

        // live2d 的大小
        CanvasSize: {
            height: 500,
            width: 400
        },
        
        // 展示工具箱（可以控制 live2d 的展出隐藏，使用特定表情）
        ShowToolBox: true,

        // 是否使用 indexDB 进行缓存优化，这样下一次载入就不会再发起网络请求了
        LoadFromCache: true
    });
    
    console.log('finish loading');
});

</script>
```

效果如下

![](https://picx.zhimg.com/80/v2-e4e1faa75ffec1165ce9845f1f6284d7_1440w.png)
