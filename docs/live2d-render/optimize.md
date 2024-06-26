---
title: live2d 的加载速度优化
---

新版本的 live2d 模型虽然更加精美，但是材质文件和模型文件更大，这会严重影响首屏加载速度，特别对于大部分博客网站而言，首屏加载速度是非常重要的。为了解决这个问题，我做出了两个优化，以供阁下参考。


## indexDB 硬缓存

为何采用 indexDB 而不是 localStorage 亦或是 websql 的原因和 indexDB 的技术文章请看这篇：

<detail-url
    href="https://kirigaya.cn/blog/article?seq=202"
    title="indexDB 封装"
    desc="汇尘轩"
></detail-url>

在 Live2dRender 中，通过初始化的 `LoadFromCache` 参数可以开启 indexDB 硬缓存。

```js
live2d.initializeLive2D({
    // ...
    
    // 是否使用 indexDB 进行缓存优化，这样下一次载入就不会再发起网络请求了
    LoadFromCache: true,

    // ...
});
```

这么做会让 live2d 文件在第一次加载后 **永久性地** 把 live2d 的一切资源文件保存到本地电脑的磁盘。 indexDB 支持超大的存储空间 (> 200 MB)，无论你的 live2d 多大，基本都能存下来。这样，用户第二次加载你的网站时，就不会再发起请求请求你的服务器内的 live2d 文件了。

如果你的 live2d 模型或者是表情文件 更新了，可以重新把 LoadFromCache 设置为 `false` 来优化掉这部分缓存，如果你觉得这个做法非常丑陋，可以提 issue，提的人足够多了，我会去解决，我只是一个学生，没有那么多时间来进行开发。

<div align=center>
<img src="https://picx.zhimg.com/80/v2-eac4ea307c22de913763bf8c2b95c21a_1440w.webp?source=c8b7c179"/>
</div>



## 压缩材质文件

indexDB 虽然可以做大优化二次加载，但是无法优化首屏加载，为了让用户第一次加载就能获得很好的

live2d 主要的大小除了 `model3.json` 模型控制点描述文件外，最大的一般是材质文件，也就是 `model3.json` 文件中定义的 `FileReferences.Textures` 路径。比如我的是：

```json
{
    "FileReferences": {
		"Moc": "SDwhite cat B.moc3",
		"Textures": [
			"SDwhite cat B.4096/texture_00.png"
		],
    }
}
```

说明材质文件为 `model3.json` 同目录下的 `SDwhite cat B.4096/texture_00.png`，根据计算机的二八定律，我们只需要把最主要的部分进行优化即可。很多同学看到 png 文件，可能激动地说要用 jpeg 进行压缩。但是请注意，jpeg 文件是不支持透明度通道的，这里我们只能用 `webp` 进行压缩，`webp` 不仅拥有优秀的压缩比，还支持透明度，实际使用下来，能让 live2d 的材质文件大小下降至少一半。

使用 python 可以很方便地将 png 转成 webp：

```python
# pip install imageio
import imageio

image = imageio.imread_v2('stardust.png')  
imageio.imwrite('stardust.webp', image, format='webp')  
```

Live2dRender 内部自动支持对于 webp 的请求和解析，不用太担心。

将 png 转成 webp 后，首屏请求速度能提升不少。


## 其他方法

后面有空再来写吧，你要说希望用 protobuf 进行超级二进制压缩，也不是不行，但是还是那句话，我现在只是学生，事情很多。

