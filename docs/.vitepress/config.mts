import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Laosi Remote Web3",
  description: "Record my transition from Web2 to Web3.",
  base: "/yanjiliang.github.io/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Web2', link: '/Web2/index' },
      { text: 'Web3', link: '/Web3/index' }
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    sidebar: {
      '/Web2/': { base: '/Web2/', items: [
          {
            text: '简介',
            collapsed: false,
            items: [
              { text: 'ES6', link: 'es6' },
            ]
          },
        ] },
      '/Web3/': { base: '/Web3/', items: [
          {
            text: '简介',
            collapsed: false,
            items: [
              { text: '区块链基础', link: 'basic-block-chain' }
            ]
          },
        ]}
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yanjiliang/yanjiliang.github.io' }
    ]
  }
})
