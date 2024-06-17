import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "老四的社畜挣扎Blog",
  description: "努力活的自我一些，摆脱企业决定个人生死的时期，记录一些乱七八糟的开发文章，以及学习笔记",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '随想文章', link: '/articles/index' },
      { text: '英语', link: '/language/index' },
      { text: '后端', link: '/backend/index' },
      { text: '算法', link: '/algorithm/index' }
    ],

    sidebar: {
      '/web2/': [
        {
          text: 'Web2相关',
          items: [
            // { text: 'Web2', link:'/web2/index' }
            { text: 'JavaScript', link: '/web2/javascript/index' },
            { text: 'TypeScript', link: '/web2/typescript/index' },
            { text: 'Node', link: '/web2/node/index' },
            { text: 'React', link: '/web2/react/index' },
            { text: 'Vue', link: '/web2/vue/index' },
            { text: 'PackTools', link: '/web2/pack-tools/index' },
            { text: 'NextJS', link: '/web2/NextJS/index' },
            { text: '小程序', link: '/web2/miniProgram/index' },
            { text: 'Prisma', link: '/web2/Prisma/index' },
          ]
        }
      ],
      '/web2/NextJS/': [
        {
          text: 'Next.js',
          items: [
            { text: '基础知识', link: '/web2/NextJS/basic-knowledge.md' },
            { text: 'clsx', link: '/web2/NextJS/clsx.md' },
            { text: '上手教程解析', link: '/web2/NextJS/new-begainer-guide.md' },
          ]
        }
      ],
      '/web3/': [
        {
          text: 'Web3',
          items: [
            { text: '基础知识', link: '/web3/basic/index' },
          ]
        }
      ],
      '/articles/': [
        {
          text: '随想文章',
          items: [
            {}
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yanjiliang/yanjiliang.github.io/' }
    ]
  }
})
