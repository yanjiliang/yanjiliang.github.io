# Next.js的基础知识，主要特性

## 路由 - Routing Fundamentals
NextJS的路由有两种：APP router & pages router
- app router
app router是一个较新的路由模式，可以支持使用React最新的一些特性，例如：Server Components、Streaming
- pages router
最原始的路由模式，方便创建服务端渲染应用，以及兼容旧的Next项目应用

每个应用的骨架就是路由-Routing.默认的，在app目录下的page都是React Server Components,这是一个性能优化并且方便使用，当然也可以通过在文件的`顶部`声明来使用客户端渲染组件Client Components
```tsx
'use client'
```

### 文件夹和文件的角色 - Roles of folders and files

Next使用的是基于文件系统的路由：
- Folders: 用来定义路由，每个路由是由嵌套的文件夹路径，遵循文件系统的层次结构，从根文件夹一直到包含有`page.js`的leaf文件夹
- Files：则是一些Next官方定义的一些特殊命名的文件，包括像layout、page、loading、not-found、error、global-error、route、template、default等

用官网的一张图来解释这个基于文件系统的路由设定：
![file-system router](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=3840&q=75)

| Special file-name | Description                   |
|-------------------|-------------------------------|
| `layout`          | 布局                            |
| `page`            | 该路由下的页面UI，有了此文件，该路由才可访问       |
| `loading`         | 该路由的一个全局loading               |
| `not-found`       | 没有匹配到该路由下的子路由时展示              |
| `error`           | 在拦截到该路由下的页面报错时展示              |
| `global-error`    | 一个全局的拦截错误展示页面                 |
| `route`           | Server-side API的终点            |
| `template`        | 专用的重渲染的布局UI                   |
| `default`         | 用于Parallel Routes的Fallback UI |

#### Define Routes
![define a route](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=3840&q=75)
![create ui for every route](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fdefining-routes.png&w=3840&q=75)

#### Pages
特殊的`page`文件：
```tsx
// [app/page.tsx]
export default function Page() {
  return <h1>this is a page!</h1>
}
```
#### Root Layout - required
`app`目录下的`layout`会应用于所有的路由页面

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"> // 必须
      <body> // 必须
        <main>{children}</main>
      </body>
    </html>
  )
}
```

#### Nested layout
例如下图的嵌套的Layout设置
![nested layout](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layout.png&w=3840&q=75)

```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```
两个布局会生效在各自的管控范围，不会有冲突
![root layout and children layout](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layouts-ui.png&w=3840&q=75)

:::info
app router的优先级要高于Pages router,跨目录的路由不应该解析为相同的URL path，在build的过程中就会报错，防止冲突
:::
:::tip
`.js`,`.jsx`,or`.tsx`的文件扩展名也是可以用作特殊文件的
:::

### Component Hierarchy

上面这些特殊的文件的层次结构展示

![组件的层次结构](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=3840&q=75)

某一路由下的多子路由结构

![nested route](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-file-conventions-component-hierarchy.png&w=3840&q=75)

有效和无效的路由定义
![define route](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=3840&q=75)

### 高级路由模式 advanced routing patterns

- Parallel Routes: display two or more pages on the same view
- Intercepting Routes:


## 1. Streaming
:::info
Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.

流是一种可以让你把一个Route分解为小的chunks并逐渐的从Server流向Client的一种数据传输技术
:::
![difference between partial content with loading state and streaming in](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fserver-rendering-with-streaming.png&w=3840&q=75)

By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

通过流，你可以避免页面阻塞，允许用户查看或与部分页面内容进行交互，而无需等待所有的数据加载完成再向用户展示所有的UI内容

![time with streaming](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fserver-rendering-with-streaming-chart.png&w=3840&q=75)

两种方法可以在NextJS应用Streaming
- 在页面层级，是用loading文件
- 使用`<Suspense>`

1、使用loading组件
```js
export default function Loading() {
    return <div>loading...</div>
}
```
> 1. loading.tsx 是NextJS的一种特殊文件，在页面加载时，会展示`fallback UI`内容
> 2. 由于`<SideNav>`是一个静态的组件，所以他会立即展示，当页面的异步内容在加载的时候，用户可以与此静态展示的内容交互
> 3. 用户不用等页面加载完成，就可以导航跳转走

使用加载骨架屏（loading skeleton）
当`loading.tsx`文件在当前route页面的根文件处，即当前路由页面下的所有子页面也会应用生效
如果把`page.tsx`和`loading.tsx`放到`/(overview)`文件下，则只会在overview page生效

2、`<Suspense>`


## 2. Partial prerendering -- experimental feature

- What Partial Prerendering is?
- How Partial Prerendering works?

Next.js 14 contains a preview of Partial Prerendering – an experimental feature that allows you to render a route with a static loading shell, while keeping some parts dynamic. In other words, you can isolate the dynamic parts of a route. For example:

Next.js 14 包含对Partial Prerendering的预览，一个实验性的功能，可以让你用一个静态的loading渲染一个页面，并保持一部分是动态的。换句话所，就是在一个页面，将静态和动态的部分隔离开

![partial prerendering](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fthinking-in-ppr.png&w=3840&q=75)

- A static route shell is served, ensuring a fast initial load.
- The shell leaves holes where dynamic content will load in asynchronous.
- The async holes streamed in parallel,reducing the overall load time of the page


## 3. Route Handlers
官方文档：[Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

