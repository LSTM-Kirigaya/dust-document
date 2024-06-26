
window.onload = async () => {
    if (!document.getElementById('live2d')) {

        await Live2dRender.initializeLive2D({
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
        
        });
        console.log('finish load');
    }
}
