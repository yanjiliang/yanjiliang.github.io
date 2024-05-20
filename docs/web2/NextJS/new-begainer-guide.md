# NextJS的入门教程

:::info
NextJS+TS+Vercel+MongoDB的一个官方模版跟练教程，写这篇md是想，想梳理下NextJS的要点，以及Vercel相关的云开发流程等
将一些官方文档原文翻译了一下，练习下英文。鼓励大家看英文原文，因为国内很多的文档的翻译，其实也是加了个人的理解的。我的翻译也是自己理解的一个角度。
:::

贴上链接[官方教程](https://nextjs.org/learn)

You'll learn the main features of Next.js by building a full-stack web application.

For this course, we'll be building a simplified version of the financial dashboard that has:
这个教程中，我们将创建一个简单版本的金融仪表盘项目，包含以下页面：
- a public home page. 一个首页
- a login page. 一个登录页
- dashboard pages that are protected by authentication. 受身份权限保护的仪表盘页面
- the ability for user to add,edit and delete invoices. 用户可以增删改发票信息

The dashboard will also have an accompanying database, which you'll set up in a later chapter.
后面的章节，会让你创建一个与仪表盘相关的数据库

## Overview(概述)
Here‘s an overview of features you'll learn about in this course:
- Styling: The different way to style your application in Next.js.

样式：在NextJS中，不同的方式装扮你的应用
- Optimization: How to optimize images,links,fonts.

优化：怎么去优化图片、链接和字体
- Routing: How to create nested layouts and pages using file-system routing.

路由：怎么通过文件系统路由创建嵌套的布局和页面
- Data Fetching: How to set up a database on Vercel, and best practices for fetching and streaming.

拉取数据：怎么在Vercel创建数据库，以及拉取和流式传输的最佳实践
- Search and Pagination: How to implement search and pagination using URL Search Params.

搜索和分页：怎么使用URL Search Params应用搜索和分页
- Mutating Data: How to mutate data using React Server Actions,and revalidate the Next.js cache.

修改数据：怎么使用React Server Actions更改数据，并重新验证Next的缓存
- Error handling: How to handle general and `404` not found errors.

错误处理：怎么处理常规和404错误
- Form Validation and Accessibility: How to do server-side form validation and tips for improving accessibility.

表单验证和易用性：怎么做服务侧的表单验证，以及提升易用性的技巧
- Authentication: How to add authentication to your application using [NextAuth.js](https://next-auth.js.org/) and Middleware.

权限验证：怎么使用NextAuth.js和中间件给应用增加权限校验。
- Metadata: How to add metadata and prepare your application for social sharing.

元数据：如何添加元数据，以及应用的社交分享


### Chapter 1
通过create-next-app脚手架命令创建了一个模版项目
```zsh
npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```
目录结构
![folder stucture](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Flearn-folder-structure.png&w=3840&q=75)

- `/app`: 包含应用所有的路由、组件和逻辑，开发的主阵地，大部分都是在此目录下的操作
- `/app/lib`:放置应用的方法、函数，例如复用的函数和数据拉取函数
- `/app/ui`:放置UI组件
- `/pulic`:放置静态资源文件
- `/scripts`:放置脚本文件
- Config Files: `next.config.js`配置项目文件

### Chapter 2 CSS Styling
::: info
- 应用的全局样式文件
- Taliwind和CSS modules
- 使用`clsx`条件渲染样式
:::

在`/app/ui`文件下的`global.css` 配置全局样式

Taliwind的使用便不再赘述，不会的同学去官方文档[Taliwind](https://tailwindcss.com/)学吧，装了编辑器的提示插件，还是挺方便的。

`clsx`的用法
```tsx
// /app/ui/invoices/status.tsx
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

### Chapter 3 Optimizing Fonts and Images

#### 问什么要优化字体？
如果项目中使用了自定义字体，由于字体文件需要请求和加载，会影响性能
在页面初始化时，系统默认字体，转换为自定义字体，导致字体尺寸，间距或者布局发生变化。NextJS使用`next/font`模块，对在项目中使用自定义字体进行自动优化。会在打包的时候下载字体文件，并缓存在静态文件下，这样当访问应用时，不再需要进行网络请求。

Next是将字体的配置文件，例如
```ts
// /app/ui/fonts.ts
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
```

然后在布局文件的body标签应用

```tsx
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```
在上面的代码中，会发现有个一个样式类`antialiased`，这个是Taliwind的一个抗锯齿样式，可以让字体更顺滑，当然这个不是必需要加的，加了，体验会更好。

#### 为什么优化图片？

在常规的HTML文件中
```html
<img
    src="/hero.png"
    alt="Screenshots of dashboard project showing desktop version"
/>
```
我们必须得手动的设置以下几项：
- 确定你的图片在不同屏幕尺寸下是响应式的
- 给不同的设备指定图片的尺寸
- 当图片加载时，防止页面回流
- 不在用户可见范围的图片进行懒加载

图片优化一直是Web开发中老生常谈的问题，Next.js的`next/image`模块进行自动的优化操作，不再手动配置。
NextJS的`<Image>`组件是HTML的img标签的基础上进行了扩展，并且自动进行了图片优化：
- 当图片加载时，防止回流。设定了图片的宽、高为必填属性，即设定了图片的尺寸，防止页面回流
- 调整不同viewport下图片的显示
- 懒加载
- 支持更多现代新的图片文件格式例如：WebP\AVIF

```tsx
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
 
export default function Page() {
  return (
    // ...
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </div>
    //...
  );
}
```

### Chapter 4

#### Nested routing嵌套路由
Nextjs使用文件系统路由，每个文件夹代表一个路由映射到URL，额，这么说有点模糊，上图示
![explain file-system route](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffolders-to-url-segments.png&w=3840&q=75)