module.exports = {
    title:"Grace's Blog",
    description: '信仰、工作、生活',
    theme: 'reco',
    head: [
        // ['link', { rel: 'icon',href: 'theme/favicon.ico'}],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    themeConfig: {
      nav: [
            {text: '首页',link: '/'},
            { text: '生活', link: '/markTime/' },
            { text: '工作', link: '/techNology/' },
            { text: '归档', link: '/timeLine/' },
            { text: '分类',
            items: [
              { text: '生活', link: '/categories/Life' },
              { text: '信仰', link: '/categories/Faith' },
              { text: '工作', link: '/categories/Work' }
            ]
             },
            { text: '标签', link: '/tags/' },
            {text: '博客', items: [
                {
                    text: '山月行',
                    link: 'https://shanyue.tech/'
                },
                {
                  text: '刘向洋',
                  link: 'https://liuxiangyang.space/'
                },
                {
                  text: '唐巧',
                  link: 'http://blog.devtang.com/2020/01/01/2019-summary/'
                },
                {
                  text: '夜尽天明',
                  link: 'https://biaochenxuying.cn/'
                }
            ]},
            { text: '关于我', link: '/myNews/' },
            { text: 'Github', link: 'https://github.com/xilewangzi' },
      ],
       // 博客配置
      blogConfig: {
        markTime: {
          location: 5,     // 在导航栏菜单中所占的位置，默认2
          text: '生活' // 默认文案 “分类”
        },
        techNology: {
          location: 6,     // 在导航栏菜单中所占的位置，默认2
          text: '工作' // 默认文案 “分类”
        },
        category: {
          location: 2,     // 在导航栏菜单中所占的位置，默认2
          text: '分类' // 默认文案 “分类”
        },
        tag: {
          location: 3,     // 在导航栏菜单中所占的位置，默认3
          text: '标签'      // 默认文案 “标签”
        },
        timeLine: {
            location: 4,     // 在导航栏菜单中所占的位置，默认2
            text: '归档' // 默认文案 “分类”
          },
          myNews: {
            location: 1,     // 在导航栏菜单中所占的位置，默认2
            text: '关于我' // 默认文案 “分类”
          },

        author: 'Grace'
      },
      logo: '/images/chizhiyiheng.png',
      search: true,
      searchMaxSuggestions: 10,
    // 自动形成侧边导航
     sidebar: 'auto',
    // 最后更新时间
     lastUpdated: 'Last Updated',
    // 作者
     author: 'Zhangruibo',
    // 备案号
    // record: 'xxxx',
    // 项目开始时间
    startYear: '2017'
    },
    markdown: {
        lineNumbers: true
      },
    //   plugins: ['@vuepress/medium-zoom', 'flowchart']
  }  