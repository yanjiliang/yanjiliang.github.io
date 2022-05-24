import type { SidebarConfig } from '@vuepress/theme-default'

export const sideBar: SidebarConfig = {
    '/': [
        {
            text: "React",
            children: [
                '/react/demo01'
            ]
        }
    ]
}