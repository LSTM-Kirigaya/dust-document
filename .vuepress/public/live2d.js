if (window.hasLaunchLive2d === undefined) {
    window.hasLaunchLive2d = false;
}

function load(src) {
    const script = document.createElement('script');
    script.src = src;

    return new Promise((resolve, reject) => {
        script.onload = () => {
            console.log('finish loading lib from ' + src);
            resolve();
        };
        script.onerror = (error) => {
            console.error('Error loading lib from ' + src,  error);
            reject(error);
        };
        document.head.appendChild(script);
    });
}

async function launch() {
    if (!document.getElementById('live2d') && window.hasLaunchLive2d === false) {
        window.hasLaunchLive2d = true;
        await load('https://cdn.jsdelivr.net/npm/live2d-render@0.0.5/bundle.js');
        const config = {
            BackgroundRGBA: [0.0, 0.0, 0.0, 0.0],
            ResourcesPath: '/cat/sdwhite cat b.model3.json',
            CanvasSize: {
                height: 500,
                width: 400
            },
            loadIndex: 0,
            LoadFromCache: true,
            ShowToolBox: true,
        
            MinifiedJSUrl: 'https://kirigaya.cn/files/web/minified.js',
            Live2dCubismcoreUrl: 'https://kirigaya.cn/files/web/live2dcubismcore.min.js'
        }
        const screenWidth = Math.round(screen.width * window.devicePixelRatio);
        const scaleRatio = Math.max(0.76, screenWidth / 3840);
        const configSize = config.CanvasSize;
        config.CanvasSize.height = configSize.height * scaleRatio;
        config.CanvasSize.width = configSize.width * scaleRatio;

        await Live2dRender.initializeLive2D(config);
        console.log('finish load');
    }
}

launch();
window.onload = launch;