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

- Authentication: How to add authentication to your application using [NextAuth.js](https://next-auth.js.org/) and
  Middleware.

权限验证：怎么使用NextAuth.js和中间件给应用增加权限校验。

- Metadata: How to add metadata and prepare your application for social sharing.

元数据：如何添加元数据，以及应用的社交分享

## Chapter 1

通过create-next-app脚手架命令创建了一个模版项目

```zsh
npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```

目录结构
![folder structure](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Flearn-folder-structure.png&w=3840&q=75)

- `/app`: 包含应用所有的路由、组件和逻辑，开发的主阵地，大部分都是在此目录下的操作
- `/app/lib`:放置应用的方法、函数，例如复用的函数和数据拉取函数
- `/app/ui`:放置UI组件
- `/pulic`:放置静态资源文件
- `/scripts`:放置脚本文件
- Config Files: `next.config.js`配置项目文件

## Chapter 2 CSS Styling

::: info

- 应用的全局样式文件
- Taliwind和CSS modules
- 使用`clsx`条件渲染样式
  :::

在`/app/ui`文件下的`global.css` 配置全局样式

Taliwind的使用便不再赘述，不会的同学去官方文档[Taliwind](https://tailwindcss.com/)学吧，装了编辑器的提示插件，还是挺方便的。

`clsx`的用法

```
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

## Chapter 3 Optimizing Fonts and Images

#### 问什么要优化字体？

如果项目中使用了自定义字体，由于字体文件需要请求和加载，会影响性能
在页面初始化时，系统默认字体，转换为自定义字体，导致字体尺寸，间距或者布局发生变化。NextJS使用`next/font`
模块，对在项目中使用自定义字体进行自动优化。会在打包的时候下载字体文件，并缓存在静态文件下，这样当访问应用时，不再需要进行网络请求。

Next是将字体的配置文件，例如

```
// /app/ui/fonts.ts
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
```

然后在布局文件的body标签应用

```
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

```
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

```
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

## Chapter 4

#### Nested routing嵌套路由

Next.js使用文件系统路由，每个文件夹代表一个路由映射到URL，额，这么说有点模糊，上图示
![explain file-system route](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffolders-to-url-segments.png&w=3840&q=75)

Next.js有两个特殊的命名文件：`layout.tsx`和`page.tsx`

`page.tsx`是一个特殊的NextJS文件，是一个组件的导出文件，举个栗子：

`/app/page.tsx`对应的路由是`/`

![file-system route example](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fdashboard-route.png&w=3840&q=75)

[//]: # ()
即：创建的文件夹名是路由名称，文件夹下的`page.tsx`是入口文件。`/app`则是根路由

[//]: # ()
如需嵌套子路由页面，即在该文件夹下，创建子路由的文件夹及对应的`page.tsx`文件

[//]: # ()
![nested route example](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Frouting-solution.png&w=3840&q=75)

[//]: # ()
![partial rendering](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fpartial-rendering-dashboard.png&w=3840&q=75)

[//]: # ()
显而易见的在`/app`文件夹根目录的`layout.tsx`便是整个项目的root layout

[//]: # ()

## Chapter 5 Navigating Between Pages页面之间的跳转

最基础的我们可以是用a标签进行页面的跳转，但是使用a标签跳转，会导致页面的全面刷新。

[//]: # ()
`next/link`模块为了提升跳转的体验，NextJS自动地通过路由将应用进行了code splits（代码拆分）.这不同于传统的SPA，初始化加载就加载了所有应用的代码。

[//]: # ()
通过路由进行的代码拆分，意味着每个页面都是独立的。如果一个页面出现了报错，其他页面依然正常工作。

此外，在生产环境下，NextJS会后台自动预拉取页面出现的`<Link>`标签涉及的code

#### How Routing and Navigation Works?

1. Code Splitting
   通过路由拆分代码，只有当前路由所需的代码会加载，不会加载无关代码

2. Prefetching：只会在生产环境生效，dev环境不会

可以在用户浏览前，后台提前预加载对应路由的代码，有两种方式会在NextJS中自动触发此机制：

- `<Link>`组件：当出现在用户的可见范围内，则会在后台自动预加载`<Link>`对应的代码
- `router.prefetch()`：通过`useRouter`这个hook函数可以预加载指定的route

:::info
Prefetching is not enabled in development, only in production.
:::

3. Caching:预加载的以及浏览过的都会被缓存在Router Cache中
4. Partial Rendering:只会重新渲染有改变部分的，减少了数据传输量以及执行次数。提升渲染性能。
5. Soft Navigation:当变更的部分渲染时，不会影响preserved的State
6. Back and Forward Navigation:Router Cache维护前进及后退的路由，以及重用缓存
7. Routing between `pages` and `app/`


- usePathname()获取当前的link.href

## Chapter 6 Setting up database on Vercel

在Vercel部署了Next项目后，在Storage标签栏下，可以创建一个database，创建完成后，可以将`.env.local`下的内容：

```js
POSTGRES_URL = "*****"
POSTGRES_PRISMA_URL = "*****"
POSTGRES_URL_NO_SSL = "*****"
POSTGRES_URL_NON_POOLING = "*****"
POSTGRES_USER = "*****"
POSTGRES_HOST = "*****"
POSTGRES_PASSWORD = "*****"
POSTGRES_DATABASE = "*****"
```

复制到项目中的`.env`文件中，该文件应该添加到`.gitignore`文件中，防止泄露

```zsh
npm i @vercel/postgres
```

在`/app/lib`定义fetch方法，例如：
```ts
// Fetch the last 5 invoices, sorted by date
const data = await sql<LatestInvoiceRaw>`
  SELECT invoices.amount, customers.name, customers.image_url, customers.email
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  ORDER BY invoices.date DESC
  LIMIT 5`;
```
应用：
```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data';
 
export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  // ...
}
```

## Chapter 8 Static and Dynamic Rendering

使用next/cache中的unstable_noStore可以防止内容被缓存
```ts
// ...
import { unstable_noStore as noStore } from 'next/cache';
 
export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
 
  // ...
}
 
export async function fetchLatestInvoices() {
  noStore();
  // ...
}
 
export async function fetchCardData() {
  noStore();
  // ...
}
 
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  // ...
}
 
export async function fetchInvoicesPages(query: string) {
  noStore();
  // ...
}
 
export async function fetchFilteredCustomers(query: string) {
  noStore();
  // ...
}
 
export async function fetchInvoiceById(query: string) {
  noStore();
  // ...
}
```

:::info
`unstable_noStore` is an experimental API and may change in the future. If you prefer to use a stable API in your own projects, you can also use the Segment Config Option export const dynamic = "force-dynamic".
:::

## Chapter 9 Static and Dynamic Content Rendering

NextJS对于静态和动态内容做了不同的渲染逻辑处理，不依赖数据请求的静态内容，可以快速、即时的进行渲染，提高用户体验。
而动态内容部分，利用`Suspense`包裹，并行的流传输，减少整个页面的加载时间，加载中则展示`fallback`

### 总结：
1. Created a database in the same region as your application code to reduce latency between your server and database.
应用与数据库创建在同一个地址，减少了服务端与数据库的延迟
2. Fetched data on the server with React Server Components. This allows you to keep expensive data fetches and logic on the server, reduces the client-side JavaScript bundle, and prevents your database secrets from being exposed to the client.
使用RSC请求数据，这样可以把敏感的数据请求和逻辑放在服务端，减少客户端代码块的体积，并且避免数据库的私密信息暴露在客户端。
3. Used SQL to only fetch the data you needed, reducing the amount of data transferred for each request and the amount of JavaScript needed to transform the data in-memory.
用SQL拉取真正需要的数据，减少每次请求的数据传输量和传输到内存数据的JS代码量
4. Parallelize data fetching with JavaScript - where it made sense to do so.
在真正需要，即有意义的场景，并行的用JS拉取数据
5. Implemented Streaming to prevent slow data requests from blocking your whole page, and to allow the user to start interacting with the UI without waiting for everything to load.
应用流传输避免慢速的数据请求阻塞整个页面，并允许用户无需等所有的内容全部加载即可与UI进行交互
6. Move data fetching down to the components that need it, thus isolating which parts of your routes should be dynamic in preparation for Partial Prerendering.
将数据请求放在具体需要的组件中，可以区分页面中哪些是动态部分，预渲染

## Add Search and Pagination

### URL search params
- Bookmarkable and Shareable URLs：由于搜索的参数在URL，当用户保存为书签的时候，会将当天的state一并保存了，包括搜索查询、过滤等，也便于分享
- Server-side rendering and initial load: 可以在服务端使用URL参数，进行初始化渲染。更好地进行服务端渲染。
- Analysing and Tracking: URL参数更便于追踪用户的行为，而不用额外的客户端逻辑

"use client" -- 表明这是一个客户端组件，可以使用时间监听和hooks

## Chapter 12 Server Actions

```tsx
// Server Component
export default function Page() {
  // Action
  async function create(formData: FormData) {
    'use server';
 
    // Logic to mutate data...
  }
 
  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>;
}
```

## Chapter 13 Handling Errors
通过创建指定名称的特定文件处理错误：`error.tsx`和`not-found.tsx`
`error.tsx`: 会拦截所有不可预测的报错
- error: 错误对象
- reset：重新渲染当前页面的方法

```tsx
'use client';
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
```

`not-found.tsx`则是细化了404这一错误场景的处理需搭配`notFound()`方法配合使用
```tsx
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { updateInvoice } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
 
  if (!invoice) {
    notFound();
  }
 
  // ...
}
```

```tsx
// not-found.tsx
import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
```

## Chapter 14 improving accessibility

