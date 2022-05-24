import { defaultTheme, defineUserConfig } from 'vuepress'

import { navBar, sideBar } from './config/index'

export default defineUserConfig({
    title: "LemonPepsi",
    lang: "zh-CN",
    description: "日常的学习笔记",
    base: '/myBlog/',
    theme: defaultTheme({
        locales: {
            '/': {
                navbar: navBar,
                sidebar: sideBar
            }
        }
    })
})