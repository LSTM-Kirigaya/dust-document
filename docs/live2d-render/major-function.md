---
title: Live2dRender 功能一览
---

## 发送消息

发送信息非常简单，使用 `live2d.initializeLive2D` 初始化模型完成后，使用 `setMessageBox` 方法展示对话框，下面是例子：

```js
live2d.setMessageBox('想要知道我的故事?好故事很贵的，我的朋友。', 3000);
```

3000 的意思是消息只会展示 3000 ms，3000 ms 过后，对话框会自动消失。

效果如下。

![](https://picx.zhimg.com/80/v2-579b49c995c523267910526e052a1753_1440w.png)


如果将该值设为 `0 | undefined | null`，那么消息框就会永远停留。这种情况下，阁下可以通过 `live2d`下的这两个**同步方法**来控制对话框的出现和消失。

```typescript
// 隐藏对话框
live2d.hideMessageBox();

// 展示对话框
live2d.revealMessageBox();
```



## 自定义消息框样式

你可以在项目中输入 css 来覆盖默认的消息框样式，下面是一个例子：

```css
#live2dMessageBox-content {
    background-color: #FF95BC;
    color: white;
    font-family: var(--base-font);
    padding: 10px;
    height: fit-content;
    border-radius: .7em;
    word-break: break-all;
    border-right: 1px solid transparent;
}

.live2dMessageBox-content-hidden {
    opacity: 0;
    transform: scaleY(0.2);
    transition: all 0.35s ease-in;
    -moz-transition: all 0.35s ease-in;
    -webkit-transition: all 0.35s ease-in;
}

.live2dMessageBox-content-visible {
    opacity: 1;
    transition: all 0.35s ease-out;
    -moz-transition: all 0.35s ease-out;
    -webkit-transition: all 0.35s ease-out;
}
```

## 展示表情

第四代 Live2d 模型开始可以定义表情，表情文件通常以 `exp3.json` 结尾，且和你的 `model3.json` 文件同目录。 Live2dRender 在读入你的模型时，也会读入你的表情文件（如果有的话）。表情文件内部如下：

```json
{
	"Type": "Live2D Expression",
	"Parameters": [
		{
			"Id": "Param5",
			"Value": 1,
			"Blend": "Add"
		}
	]
}
```

只需要控制 `Id` 为指定参数，就能实现对应表情，因此，你可以自己编写表情文件。

程序中，你可以通过如下

比如你有一个表情文件叫做 `M baiyan.exp3.json`，你可以如此让你的模型装载这个表情：

```js
live2d.setExpression('M baiyan');
```

如果你的表情足够多，可以使用 `setRandomExpression` 来随即设置一个表情：

```js
live2d.setRandomExpression();
```

事实上，当你点击你的 live2d 模型时，Live2dRender 每次就会调用 `setRandomExpression` 这个函数。

## 工具箱

`live2d-render@0.0.5` 之后，当你在初始化时 live2d 时，可以通过设置 `ShowToolBox` 为 true 来开启工具箱。

```js
live2d.initializeLive2D({
    // ...
    
    // 展示工具箱（可以控制 live2d 的展出隐藏，使用特定表情）
    ShowToolBox: true,

    // ...
});
```

此时，当你把光标移动到模型上时，工具箱会透明度渐变动画自动浮现在模型左侧：

<div align=center>
<img src="https://pic1.zhimg.com/80/v2-8501d5198ae145e64a11af77a1222c1e_1440w.png" style="width: 300px;"/>
</div>

最上面的蓝色箭头用于 隐藏/展示 live2d 模型。

下面一堆 E 开头的按钮用于展示表情，比如点击 `E2` 就是让模型表演预设的 2 号表情。