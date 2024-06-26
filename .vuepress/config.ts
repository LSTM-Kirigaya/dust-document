import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import katex from 'markdown-it-katex';

export default defineUserConfig({
    lang: "zh-CN",
    title: "锦恢的书籍&文档",
    extendsMarkdown: md => {
        md.set({ html: true });
        md.use(katex);
        md.linkify.set({ fuzzyEmail: false });
    },
    shouldPrefetch: false,
    
    head: [
        ['script', { src: 'https://cdn.jsdelivr.net/npm/live2d-render@0.0.5/bundle.js'}],
        ['script', { src: '/live2d.js' }],
    ],
    // head: [
    //     ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
    //     ['link', { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/2.2.1/github-markdown.min.css' }],
    //     ['script', { src: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js'}],
    // ],
    theme: recoTheme({
        style: "@vuepress-reco/style-default",
        logo: "/logo.png",
        authorAvatar: "/head.png",

        // series 为原 sidebar
        series: {
            "/blogs/no-longer-human/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/no-longer-human/chapter1",
                        "/docs/no-longer-human/chapter2",
                        "/docs/no-longer-human/chapter3",
                        "/docs/no-longer-human/chapter4",
                        "/docs/no-longer-human/chapter5",
                    ],
                },
            ],
            "/docs/no-longer-human/": [
                {
                    text: "目录",
                    children: [
                        "chapter1",
                        "chapter2",
                        "chapter3",
                        "chapter4",
                        "chapter5",
                    ],
                },
            ],
            "/blogs/counseling-psychology/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/counseling-psychology/chapter1/",
                        "/docs/counseling-psychology/chapter2/",
                        "/docs/counseling-psychology/chapter3/",
                        "/docs/counseling-psychology/chapter4/",
                        "/docs/counseling-psychology/chapter5/",
                        "/docs/counseling-psychology/chapter6/",
                        "/docs/counseling-psychology/chapter7/"
                    ]
                }
            ],
            "/docs/counseling-psychology/chapter1/": [
                {
                    text: "第一章 目录",
                    children: [
                        "s1",
                        "s2",
                        "s3",
                        "s4",
                        "s5",
                    ]
                }
            ],
            "/docs/counseling-psychology/chapter2/": [
                {
                    text: "第二章 目录",
                    children: [
                        "s1",
                        "s2",
                        "s3",
                        "s4",
                        "s5",
                    ]
                }
            ],
            "/blogs/system-for-ai/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/system-for-ai/di1zhang-rengongzhinenxitonggaishu/",
                        "/docs/system-for-ai/di2zhang-shenjingwangluojichu/",
                        "/docs/system-for-ai/di3zhang-shenduxuexikuangjiajichu/",
                        "/docs/system-for-ai/di4zhang-juzhenyunsuanyujisuanjitixijiegou/",
                        "/docs/system-for-ai/di5zhang-shenduxuexikuangjiadebianyiyuyouhua/",
                        "/docs/system-for-ai/di6zhang-fenbushixunliansuanfayuxitong/",
                        "/docs/system-for-ai/di7zhang-yigoujisuanjiqundiaoduyuziyuanguanlixitong/",
                        "/docs/system-for-ai/di8zhang-shenduxuexituilixitong/",
                        "/docs/system-for-ai/di9zhang-zidonghuajiqixuexixitong/",
                        "/docs/system-for-ai/di10zhang-qianghuaxuexixitong/",
                        "/docs/system-for-ai/di11zhang-moxingyasuoyujiasu/",
                        "/docs/system-for-ai/di12zhang-rengongzhinenanquanyuyinsi/",
                        "/docs/system-for-ai/di13zhang-rengongzhinenyouhuajisuanjixitong/"
                    ]
                }
            ],
            "/docs/system-for-ai/di10zhang-qianghuaxuexixitong/": [
                {
                    text: "第十章目录",
                    children: [
                        "10.1 qianghuaxuexidejibengainian",
                        "10.2.1-fenbushiqianghuaxuexisuanfa",
                        "10.2.2-fenbushiqianghuaxuexiduikuangjiadexuqiuhetaozhan",
                        "10.2.3-fenbushiqianghuaxuexikuangjiaheyingyong"
                    ]
                }
            ],
            "/docs/system-for-ai/di11zhang-moxingyasuoyujiasu/": [
                {
                    text: "第十一章目录",
                    children: [
                        "11.1-moxingyasuojianjie",
                        "11.2-jiyuxishuhuademoxingyasuo",
                        "11.3-moxingyasuoyuyingjianjiasu"
                    ]
                }
            ],
            "/docs/system-for-ai/di12zhang-rengongzhinenanquanyuyinsi/": [
                {
                    text: "第十二章目录",
                    children: [
                        "12.1-rengongzhinennazaianquanyuyinsi",
                        "12.2-rengongzhinenxunliananquanyuyinsi",
                        "12.3-rengongzhinenfuwuanquanyuyinsi"
                    ]
                }
            ],
            "/docs/system-for-ai/di13zhang-rengongzhinenyouhuajisuanjixitong/": [
                {
                    text: "第十三章目录",
                    children: [
                        "13.1-jianjieyuqushi",
                        "13.2-xuexizengqiangxitongdeyingyong",
                        "13.3-xuexizengqiangxitongdeluoditaozhan"
                    ]
                }
            ],
            "/docs/system-for-ai/di1zhang-rengongzhinenxitonggaishu/": [
                {
                    text: "第一章目录",
                    children: [
                        "1.1-shenduxuexidelishi，xianzhuangyufazhan",
                        "1.2-suanfa，kuangjia，tixijiegouyusuanlidejinbu",
                        "1.3-shenduxuexixitongzuchengyushengtai",
                        "1.4-shenduxuexiyanglibeihoudexitongwenti",
                        "1.5-yingxiangshenduxuexixitongshejidelilun，yuanzeyujiashe"
                    ]
                }
            ],
            "/docs/system-for-ai/di2zhang-shenjingwangluojichu/": [
                {
                    text: "第二章目录",
                    children: [
                        "2.1-shenjingwangluojibengainian",
                        "2.2-shenjingwangluodexunlian",
                        "2.3-jiejuehuiguiwenti",
                        "2.4-jiejuefenleiwenti",
                        "2.5-shendushenjingwangluo",
                        "2.6-tiduxiajiangyouhuasuanfa",
                        "2.7-juanjishenjingwangluo",
                        "2.8-xunhuanshenjingwangluo",
                        "2.9-zhuyilijizhiheTransformer"
                    ]
                }
            ],
            "/docs/system-for-ai/di3zhang-shenduxuexikuangjiajichu/": [
                {
                    text: "第三章目录",
                    children: [
                        "3.1-jiyushujuliutudeshenduxuexikuangjia",
                        "3.2-shenjingwangluojisuanzhongdekongzhiliu"
                    ]
                }
            ],
            "/docs/system-for-ai/di4zhang-juzhenyunsuanyujisuanjitixijiegou/": [
                {
                    text: "第四章目录",
                    children: [
                        "4.1-shenduxuexidejisuanmoshi",
                        "4.2-jisuanjitixijiegouyujuzhenyunsuan",
                        "4.3-GPUtixijiegouyujuzhenyunsuan"
                    ]
                }
            ],
            "/docs/system-for-ai/di5zhang-shenduxuexikuangjiadebianyiyuyouhua/": [
                {
                    text: "第五章目录",
                    children: [
                        "5.1-shendushenjingwangluobianyiqi",
                        "5.2-jisuantuyouhua",
                        "5.3-nacunyouhua",
                        "5.4-naheyouhua",
                        "5.5-suanzidiaoduyouhua"
                    ]
                }
            ],
            "/docs/system-for-ai/di6zhang-fenbushixunliansuanfayuxitong/": [
                {
                    text: "第六章目录",
                    children: [
                        "6.1-fenbushishenduxuexijisuanjianjie",
                        "6.2-fenbushixunliansuanfafenlei",
                        "6.3-shenduxuexibingxingxunliantongbufangshi",
                        "6.4-fenbushixunlianxitongjianjie",
                        "6.5-fenbushixunliandetongxinxiediao"
                    ]
                }
            ],
            "/docs/system-for-ai/di7zhang-yigoujisuanjiqundiaoduyuziyuanguanlixitong/": [
                {
                    text: "第七章目录",
                    children: [
                        "7.1-yigoujisuanjiqunguanlixitongjianjie",
                        "7.2-xunlianzuoye，jingxiangyurongqi",
                        "7.3-diaodu",
                        "7.4-mianxiangshenduxuexidejiqunguanlixitong",
                        "7.5-cunchu",
                        "7.6-kaifayuyunwei"
                    ]
                }
            ],
            "/docs/system-for-ai/di8zhang-shenduxuexituilixitong/": [
                {
                    text: "第八章目录",
                    children: [
                        "8.1-tuilixitongjianjie",
                        "8.2-moxingtuilidelixianyouhua",
                        "8.3-bushu",
                        "8.4-tuilixitongdeyunxingqiyouhua",
                        "8.5-kaifa、xunlianyubushudequanshengmingzhouqiguanli-MLOps",
                        "8.6-tuilizhuanyouxinpian"
                    ]
                }
            ],
            "/docs/system-for-ai/di9zhang-zidonghuajiqixuexixitong/": [
                {
                    text: "第九章目录",
                    children: [
                        "9.1-zidonghuajiqixuexi",
                        "9.2-zidonghuajiqixuexixitongyugongju"
                    ]
                }
            ],
            "/blogs/nuaa-ics-pa-2023/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/nuaa-ics-pa-2023/pa0/",
                        "/docs/nuaa-ics-pa-2023/pa1/",
                    ]
                }
            ],
            "/docs/nuaa-ics-pa-2023/pa0/": [
                {
                    text: "PA0",
                    children: [
                        "0.1",
                        "0.2",
                        "0.3",
                        "0.4",
                        "0.5",
                        "0.6",
                        "0.7",
                        "ScoringRule0"
                    ]
                }
            ],
            "/docs/nuaa-ics-pa-2023/pa1/": [
                {
                    text: "PA1",
                    children: [
                        "1.1",
                        "1.2",
                        "1.3",
                        "ScoringRule1.1",
                        "ScoringRule1.2"
                    ]
                }
            ],
            "/blogs/lake/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/lake/chapter1",
                        "/docs/lake/chapter2",
                        "/docs/lake/chapter3",
                        "/docs/lake/chapter4",
                        "/docs/lake/chapter5",
                        "/docs/lake/chapter6",
                        "/docs/lake/chapter7",
                        "/docs/lake/chapter8",
                        "/docs/lake/chapter9",
                        "/docs/lake/chapter10",
                        "/docs/lake/chapter11",
                        "/docs/lake/chapter12",
                    ],
                },

            ],
            "/docs/lake/": [
                {
                    text: "目录",
                    children: [
                        "chapter1",
                        "chapter2",
                        "chapter3",
                        "chapter4",
                        "chapter5",
                        "chapter6",
                        "chapter7",
                        "chapter8",
                        "chapter9",
                        "chapter10",
                        "chapter11",
                        "chapter12",
                    ],
                },
            ],
            "/blogs/snow-country/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/snow-country/chapter1",
                        "/docs/snow-country/chapter2",
                        "/docs/snow-country/chapter3",
                        "/docs/snow-country/chapter4",
                        "/docs/snow-country/chapter5",
                        "/docs/snow-country/chapter6",
                        "/docs/snow-country/chapter7",
                        "/docs/snow-country/chapter8",
                        "/docs/snow-country/chapter9",
                        "/docs/snow-country/chapter10",
                        "/docs/snow-country/chapter11",
                        "/docs/snow-country/chapter12",
                    ],
                },
            ],
            "/docs/snow-country/": [
                {
                    text: "目录",
                    children: [
                        "chapter1",
                        "chapter2",
                        "chapter3",
                        "chapter4",
                        "chapter5",
                        "chapter6",
                        "chapter7",
                        "chapter8",
                        "chapter9",
                        "chapter10",
                        "chapter11",
                        "chapter12",
                    ],
                },
            ],
            "/blogs/thousand-cranes/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/thousand-cranes/chapter1",
                        "/docs/thousand-cranes/chapter2",
                        "/docs/thousand-cranes/chapter3",
                        "/docs/thousand-cranes/chapter4",
                        "/docs/thousand-cranes/chapter5",
                        "/docs/thousand-cranes/chapter6",
                        "/docs/thousand-cranes/chapter7",
                        "/docs/thousand-cranes/chapter8",
                        "/docs/thousand-cranes/chapter9",
                        "/docs/thousand-cranes/chapter10",
                        "/docs/thousand-cranes/chapter11",
                        "/docs/thousand-cranes/chapter12",
                        "/docs/thousand-cranes/chapter13",
                        "/docs/thousand-cranes/chapter14",
                        "/docs/thousand-cranes/chapter15",
                        "/docs/thousand-cranes/chapter16",
                        "/docs/thousand-cranes/chapter17",
                        "/docs/thousand-cranes/chapter18",
                        "/docs/thousand-cranes/chapter19",
                    ],
                },
            ],
            "/docs/thousand-cranes/": [
                {
                    text: "目录",
                    children: [
                        "chapter1",
                        "chapter2",
                        "chapter3",
                        "chapter4",
                        "chapter5",
                        "chapter6",
                        "chapter7",
                        "chapter8",
                        "chapter9",
                        "chapter10",
                        "chapter11",
                        "chapter12",
                        "chapter13",
                        "chapter14",
                        "chapter15",
                        "chapter16",
                        "chapter17",
                        "chapter18",
                        "chapter19",
                    ],
                },
            ],
            "/blogs/the-Interpretation-of-dreams/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/the-Interpretation-of-dreams/chapter1",
                        "/docs/the-Interpretation-of-dreams/chapter2",
                        "/docs/the-Interpretation-of-dreams/chapter3",
                        "/docs/the-Interpretation-of-dreams/chapter4",
                        "/docs/the-Interpretation-of-dreams/chapter5",
                        "/docs/the-Interpretation-of-dreams/chapter6",
                        "/docs/the-Interpretation-of-dreams/chapter7",
                    ],
                },
            ],
            "/docs/the-Interpretation-of-dreams/": [
                {
                    text: "目录",
                    children: [
                        "chapter1",
                        "chapter2",
                        "chapter3",
                        "chapter4",
                        "chapter5",
                        "chapter6",
                        "chapter7",
                    ],
                },
            ],
            "/blogs/cpp-features/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/cpp-features/0",
                        "/docs/cpp-features/1",
                        "/docs/cpp-features/4",
                        "/docs/cpp-features/5",
                        "/docs/cpp-features/6",
                        "/docs/cpp-features/7",
                        "/docs/cpp-features/8",
                        "/docs/cpp-features/9",
                        "/docs/cpp-features/10",
                        "/docs/cpp-features/11",
                        "/docs/cpp-features/12",
                        "/docs/cpp-features/13",
                        "/docs/cpp-features/14",
                        "/docs/cpp-features/15",
                    ],
                },
            ],
            "/docs/cpp-features/": [
                {
                    text: "目录",
                    children: [
                        "0",
                        "1",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                    ],
                },
            ],
            "/blogs/lagrange.onebot/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/lagrange.onebot/0",
                        "/docs/lagrange.onebot/1",
                        "/docs/lagrange.onebot/2",
                        "/docs/lagrange.onebot/3",
                    ],
                },
            ],
            "/docs/lagrange.onebot/": [
                {
                    text: "目录",
                    children: [
                        "0",
                        "1",
                        "2",
                        "3",
                    ],
                },
            ],
            "/blogs/live2d-render/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/live2d-render/static-html",
                        "/docs/live2d-render/spa-install",
                        "/docs/live2d-render/hexo-install",
                        "/docs/live2d-render/hugo-install",
                        "/docs/live2d-render/vuepress-install",
                        "/docs/live2d-render/major-function",
                        "/docs/live2d-render/optimize",
                    ],
                },
            ],
            "/docs/live2d-render/": [
                {
                    text: "目录",
                    children: [
                        "static-html",
                        "spa-install",
                        "hexo-install",
                        "hugo-install",
                        "vuepress-install",
                        "major-function",
                        "optimize",
                    ],
                },
            ],
        },
        navbar: [
            { text: "首页", link: "/" },
            { text: "汇尘轩", link: "https://kirigaya.cn" }
        ],
        bulletin: {
            body: [
                {
                    type: "title",
                    content: "欢迎来到我的文档",
                },
                {
                    type: "text",
                    content: "这是为了快速分享一些静态文档资源临时搭建的，并不是我的个人博客，我的个人博客和应用部署网站仍然是 https://kirigaya.cn",
                    style: "font-size: 12px;",
                },
                {
                    type: "hr",
                },
                {
                    type: "buttongroup",
                    children: [
                        {
                            text: "赞助",
                            link: "https://kirigaya.cn/sponsor",
                        },
                    ],
                },
            ],
        },
    }),

    // debug: true,
});
