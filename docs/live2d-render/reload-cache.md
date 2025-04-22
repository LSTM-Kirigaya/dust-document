---
title: 手动刷新 indexDB 缓存
---

点击工具栏那个转圈圈一样的图标，可以刷新 live2d 的缓存。

<div align=center>
<img src="https://picx.zhimg.com/80/v2-8915faa9bdbb65ff9361e45ccac350b6_1440w.png" style="width: 300px;"/>
</div>

如果你的模型文件在服务器上更新了，而且客户端还使用了 `LoadFromCache: true` 进行了缓存，那么这个时候你就算刷新网页也是没用的，因为网页的缓存停用功能并不作用于更加底层的 indexDB，所以我提供了这个功能，让你可以手动刷新 indexDB 缓存。