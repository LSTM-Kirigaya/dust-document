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
        // ['script', { src: 'https://cdn.jsdelivr.net/npm/live2d-render@0.0.5/bundle.js'}],
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
                    text: "安装",
                    children: [
                        "/docs/live2d-render/static-html",
                        "/docs/live2d-render/vue-install",
                        "/docs/live2d-render/react-install",
                        "/docs/live2d-render/hexo-install",
                        "/docs/live2d-render/hugo-install",
                        "/docs/live2d-render/vuepress-install",
                    ]
                },
                {
                    text: "基本使用",
                    children: [
                        "/docs/live2d-render/major-function",
                        "/docs/live2d-render/optimize",
                    ]
                }
            ],
            "/docs/live2d-render/": [
                {
                    text: "安装",
                    children: [
                        "static-html",
                        "vue-install",
                        "react-install",
                        "hexo-install",
                        "hugo-install",
                        "vuepress-install",
                    ]
                },
                {
                    text: "基本使用",
                    children: [
                        "major-function",
                        "optimize",
                    ]
                }
            ],
            "/blogs/rust-tutorial/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/rust-tutorial/foreword",
                        "/docs/rust-tutorial/ch00-00-introduction",
                        "/docs/rust-tutorial/ch01-00-getting-started",
                        "/docs/rust-tutorial/ch02-00-guessing-game-tutorial",
                        "/docs/rust-tutorial/ch03-00-common-programming-concepts",
                        "/docs/rust-tutorial/ch04-00-understanding-ownership",
                        "/docs/rust-tutorial/ch05-00-structs",
                        "/docs/rust-tutorial/ch06-00-enums",
                        "/docs/rust-tutorial/ch07-00-managing-growing-projects-with-packages-crates-and-modules",
                        "/docs/rust-tutorial/ch08-00-common-collections",
                        "/docs/rust-tutorial/ch09-00-error-handling",
                        "/docs/rust-tutorial/ch10-00-generics",
                        "/docs/rust-tutorial/ch11-00-testing",
                        "/docs/rust-tutorial/ch12-00-an-io-project",
                        "/docs/rust-tutorial/ch13-00-functional-features",
                        "/docs/rust-tutorial/ch14-00-more-about-cargo",
                        "/docs/rust-tutorial/ch15-00-smart-pointers",
                        "/docs/rust-tutorial/ch16-00-concurrency",
                        "/docs/rust-tutorial/ch17-00-oop",
                        "/docs/rust-tutorial/ch18-00-patterns",
                        "/docs/rust-tutorial/ch19-00-advanced-features",
                        "/docs/rust-tutorial/ch20-00-final-project-a-web-server",
                        "/docs/rust-tutorial/appendix-00"
                    ]
                }
            ],
            "/docs/rust-tutorial/": [
                {
                    text: "简介",
                    children: [
                        "ch00-00-introduction",
                    ],
                },
                {
                    text: "入门指南",
                    children: [
                        "ch01-00-getting-started",
                        "ch01-01-installation",
                        "ch01-02-hello-world",
                        "ch01-03-hello-cargo",
                    ],
                },
                {
                    text: "写个猜数字游戏",
                    children: [
                        "ch02-00-guessing-game-tutorial",
                    ],
                },
                {
                    text: "常见编程概念",
                    children: [
                        "ch03-00-common-programming-concepts",
                        "ch03-01-variables-and-mutability",
                        "ch03-02-data-types",
                        "ch03-03-how-functions-work",
                        "ch03-04-comments",
                        "ch03-05-control-flow",
                    ],
                },
                {
                    text: "认识所有权",
                    children: [
                        "ch04-00-understanding-ownership",
                        "ch04-01-what-is-ownership",
                        "ch04-02-references-and-borrowing",
                        "ch04-03-slices",
                    ],
                },
                {
                    text: "使用结构体组织相关联的数据",
                    children: [
                        "ch05-00-structs",
                        "ch05-01-defining-structs",
                        "ch05-02-example-structs",
                        "ch05-03-method-syntax",
                    ],
                },
                {
                    text: "枚举和模式匹配",
                    children: [
                        "ch06-00-enums",
                        "ch06-01-defining-an-enum",
                        "ch06-02-match",
                        "ch06-03-if-let",
                    ],
                },
                {
                    text: "使用包、Crate 和模块管理不断增长的项目",
                    children: [
                        "ch07-00-managing-growing-projects-with-packages-crates-and-modules",
                        "ch07-01-packages-and-crates",
                        "ch07-02-defining-modules-to-control-scope-and-privacy",
                        "ch07-03-paths-for-referring-to-an-item-in-the-module-tree",
                        "ch07-04-bringing-paths-into-scope-with-the-use-keyword",
                        "ch07-05-separating-modules-into-different-files",
                    ],
                },
                {
                    text: "常见集合",
                    children: [
                        "ch08-00-common-collections",
                        "ch08-01-vectors",
                        "ch08-02-strings",
                        "ch08-03-hash-maps",
                    ],
                },
                {
                    text: "错误处理",
                    children: [
                        "ch09-00-error-handling",
                        "ch09-01-unrecoverable-errors-with-panic",
                        "ch09-02-recoverable-errors-with-result",
                        "ch09-03-to-panic-or-not-to-panic",
                    ],
                },
                {
                    text: "泛型、Trait 和生命周期",
                    children: [
                        "ch10-00-generics",
                        "ch10-01-syntax",
                        "ch10-02-traits",
                        "ch10-03-lifetime-syntax",
                    ],
                },
                {
                    text: "编写自动化测试",
                    children: [
                        "ch11-00-testing",
                        "ch11-01-writing-tests",
                        "ch11-02-running-tests",
                        "ch11-03-test-organization",
                    ],
                },
                {
                    text: "一个 I/O 项目：构建一个命令行程序",
                    children: [
                        "ch12-00-an-io-project",
                        "ch12-01-accepting-command-line-arguments",
                        "ch12-02-reading-a-file",
                        "ch12-03-improving-error-handling-and-modularity",
                        "ch12-04-testing-the-librarys-functionality",
                        "ch12-05-working-with-environment-variables",
                        "ch12-06-writing-to-stderr-instead-of-stdout",
                    ],
                },
                {
                    text: "Rust 中的函数式语言功能：迭代器与闭包",
                    children: [
                        "ch13-00-functional-features",
                        "ch13-01-closures",
                        "ch13-02-iterators",
                        "ch13-03-improving-our-io-project",
                        "ch13-04-performance",
                    ],
                },
                {
                    text: "进一步认识 Cargo 和 Crates.io",
                    children: [
                        "ch14-00-more-about-cargo",
                        "ch14-01-release-profiles",
                        "ch14-02-publishing-to-crates-io",
                        "ch14-03-cargo-workspaces",
                        "ch14-04-installing-binaries",
                        "ch14-05-extending-cargo",
                    ],
                },
                {
                    text: "智能指针",
                    children: [
                        "ch15-00-smart-pointers",
                        "ch15-01-box",
                        "ch15-02-deref",
                        "ch15-03-drop",
                        "ch15-04-rc",
                        "ch15-05-interior-mutability",
                        "ch15-06-reference-cycles",
                    ],
                },
                {
                    text: "无畏并发",
                    children: [
                        "ch16-00-concurrency",
                        "ch16-01-threads",
                        "ch16-02-message-passing",
                        "ch16-03-shared-state",
                        "ch16-04-extensible-concurrency-sync-and-send",
                    ],
                },
                {
                    text: "Rust 的面向对象特性",
                    children: [
                        "ch17-00-oop",
                        "ch17-01-what-is-oo",
                        "ch17-02-trait-objects",
                        "ch17-03-oo-design-patterns",
                    ],
                },
                {
                    text: "模式与模式匹配",
                    children: [
                        "ch18-00-patterns",
                        "ch18-01-all-the-places-for-patterns",
                        "ch18-02-refutability",
                        "ch18-03-pattern-syntax",
                    ],
                },
                {
                    text: "高级特征",
                    children: [
                        "ch19-00-advanced-features",
                        "ch19-01-unsafe-rust",
                        "ch19-03-advanced-traits",
                        "ch19-04-advanced-types",
                        "ch19-05-advanced-functions-and-closures",
                        "ch19-06-macros",
                    ],
                },
                {
                    text: "最后的项目：构建多线程 web server",
                    children: [
                        "ch20-00-final-project-a-web-server",
                        "ch20-01-single-threaded",
                        "ch20-02-multithreaded",
                        "ch20-03-graceful-shutdown-and-cleanup",
                    ],
                },
                {
                    text: "附录",
                    children: [
                        "appendix-00",
                        "appendix-01-keywords",
                        "appendix-02-operators",
                        "appendix-03-derivable-traits",
                        "appendix-04-useful-development-tools",
                        "appendix-05-editions",
                        "appendix-06-translation",
                        "appendix-07-nightly-rust",
                    ],
                },
            ],
            "/blogs/i18n-haru/main.html": [
                {
                    text: "目录",
                    children: [
                        "/docs/i18n-haru/introduction",
                        "/docs/i18n-haru/config",
                        "/docs/i18n-haru/usage"
                    ]
                }
            ],
            "/docs/i18n-haru/": [
                {
                    text: "一、基本介绍",
                    children: [
                        "introduction",
                        "introduction.message",
                        "introduction.install"
                    ],
                },
                {
                    text: "二、插件配置",
                    children: [
                        "config",
                        "config.display",
                        "config.custom-iso639",
                    ],
                },
                {
                    text: "三、基础使用",
                    children: [
                        "usage",
                        "usage.lsp",
                        "usage.manage",
                        "usage.translation"
                    ],
                }
            ]
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
