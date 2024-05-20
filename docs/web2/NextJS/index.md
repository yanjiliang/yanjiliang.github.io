# Next Guide

[入门教程](./new-begainer-guide.md)

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


