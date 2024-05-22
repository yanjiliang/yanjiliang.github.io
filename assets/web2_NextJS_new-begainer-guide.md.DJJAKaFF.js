import{_ as s,c as a,o as i,a3 as n}from"./chunks/framework.Dcugq_a2.js";const u=JSON.parse('{"title":"NextJS的入门教程","description":"","frontmatter":{},"headers":[],"relativePath":"web2/NextJS/new-begainer-guide.md","filePath":"web2/NextJS/new-begainer-guide.md"}'),e={name:"web2/NextJS/new-begainer-guide.md"},t=n(`<h1 id="nextjs的入门教程" tabindex="-1">NextJS的入门教程 <a class="header-anchor" href="#nextjs的入门教程" aria-label="Permalink to &quot;NextJS的入门教程&quot;">​</a></h1><div class="info custom-block"><p class="custom-block-title">INFO</p><p>NextJS+TS+Vercel+MongoDB的一个官方模版跟练教程，写这篇md是想，想梳理下NextJS的要点，以及Vercel相关的云开发流程等 将一些官方文档原文翻译了一下，练习下英文。鼓励大家看英文原文，因为国内很多的文档的翻译，其实也是加了个人的理解的。我的翻译也是自己理解的一个角度。</p></div><p>贴上链接<a href="https://nextjs.org/learn" target="_blank" rel="noreferrer">官方教程</a></p><p>You&#39;ll learn the main features of Next.js by building a full-stack web application.</p><p>For this course, we&#39;ll be building a simplified version of the financial dashboard that has: 这个教程中，我们将创建一个简单版本的金融仪表盘项目，包含以下页面：</p><ul><li>a public home page. 一个首页</li><li>a login page. 一个登录页</li><li>dashboard pages that are protected by authentication. 受身份权限保护的仪表盘页面</li><li>the ability for user to add,edit and delete invoices. 用户可以增删改发票信息</li></ul><p>The dashboard will also have an accompanying database, which you&#39;ll set up in a later chapter. 后面的章节，会让你创建一个与仪表盘相关的数据库</p><h2 id="overview-概述" tabindex="-1">Overview(概述) <a class="header-anchor" href="#overview-概述" aria-label="Permalink to &quot;Overview(概述)&quot;">​</a></h2><p>Here‘s an overview of features you&#39;ll learn about in this course:</p><ul><li>Styling: The different way to style your application in Next.js.</li></ul><p>样式：在NextJS中，不同的方式装扮你的应用</p><ul><li>Optimization: How to optimize images,links,fonts.</li></ul><p>优化：怎么去优化图片、链接和字体</p><ul><li>Routing: How to create nested layouts and pages using file-system routing.</li></ul><p>路由：怎么通过文件系统路由创建嵌套的布局和页面</p><ul><li>Data Fetching: How to set up a database on Vercel, and best practices for fetching and streaming.</li></ul><p>拉取数据：怎么在Vercel创建数据库，以及拉取和流式传输的最佳实践</p><ul><li>Search and Pagination: How to implement search and pagination using URL Search Params.</li></ul><p>搜索和分页：怎么使用URL Search Params应用搜索和分页</p><ul><li>Mutating Data: How to mutate data using React Server Actions,and revalidate the Next.js cache.</li></ul><p>修改数据：怎么使用React Server Actions更改数据，并重新验证Next的缓存</p><ul><li>Error handling: How to handle general and <code>404</code> not found errors.</li></ul><p>错误处理：怎么处理常规和404错误</p><ul><li>Form Validation and Accessibility: How to do server-side form validation and tips for improving accessibility.</li></ul><p>表单验证和易用性：怎么做服务侧的表单验证，以及提升易用性的技巧</p><ul><li>Authentication: How to add authentication to your application using <a href="https://next-auth.js.org/" target="_blank" rel="noreferrer">NextAuth.js</a> and Middleware.</li></ul><p>权限验证：怎么使用NextAuth.js和中间件给应用增加权限校验。</p><ul><li>Metadata: How to add metadata and prepare your application for social sharing.</li></ul><p>元数据：如何添加元数据，以及应用的社交分享</p><h3 id="chapter-1" tabindex="-1">Chapter 1 <a class="header-anchor" href="#chapter-1" aria-label="Permalink to &quot;Chapter 1&quot;">​</a></h3><p>通过create-next-app脚手架命令创建了一个模版项目</p><div class="language-zsh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create-next-app@latest</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nextjs-dashboard</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --use-npm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --example</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://github.com/vercel/next-learn/tree/main/dashboard/starter-example&quot;</span></span></code></pre></div><p>目录结构 <img src="https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Flearn-folder-structure.png&amp;w=3840&amp;q=75" alt="folder structure"></p><ul><li><code>/app</code>: 包含应用所有的路由、组件和逻辑，开发的主阵地，大部分都是在此目录下的操作</li><li><code>/app/lib</code>:放置应用的方法、函数，例如复用的函数和数据拉取函数</li><li><code>/app/ui</code>:放置UI组件</li><li><code>/pulic</code>:放置静态资源文件</li><li><code>/scripts</code>:放置脚本文件</li><li>Config Files: <code>next.config.js</code>配置项目文件</li></ul><h3 id="chapter-2-css-styling" tabindex="-1">Chapter 2 CSS Styling <a class="header-anchor" href="#chapter-2-css-styling" aria-label="Permalink to &quot;Chapter 2 CSS Styling&quot;">​</a></h3><div class="info custom-block"><p class="custom-block-title">INFO</p><ul><li>应用的全局样式文件</li><li>Taliwind和CSS modules</li><li>使用<code>clsx</code>条件渲染样式</li></ul></div><p>在<code>/app/ui</code>文件下的<code>global.css</code> 配置全局样式</p><p>Taliwind的使用便不再赘述，不会的同学去官方文档<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Taliwind</a>学吧，装了编辑器的提示插件，还是挺方便的。</p><p><code>clsx</code>的用法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// /app/ui/invoices/status.tsx</span></span>
<span class="line"><span>import clsx from &#39;clsx&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function InvoiceStatus({ status }: { status: string }) {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;span</span></span>
<span class="line"><span>      className={clsx(</span></span>
<span class="line"><span>        &#39;inline-flex items-center rounded-full px-2 py-1 text-sm&#39;,</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          &#39;bg-gray-100 text-gray-500&#39;: status === &#39;pending&#39;,</span></span>
<span class="line"><span>          &#39;bg-green-500 text-white&#39;: status === &#39;paid&#39;,</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      )}</span></span>
<span class="line"><span>    &gt;</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>)}</span></span></code></pre></div><h3 id="chapter-3-optimizing-fonts-and-images" tabindex="-1">Chapter 3 Optimizing Fonts and Images <a class="header-anchor" href="#chapter-3-optimizing-fonts-and-images" aria-label="Permalink to &quot;Chapter 3 Optimizing Fonts and Images&quot;">​</a></h3><h4 id="问什么要优化字体" tabindex="-1">问什么要优化字体？ <a class="header-anchor" href="#问什么要优化字体" aria-label="Permalink to &quot;问什么要优化字体？&quot;">​</a></h4><p>如果项目中使用了自定义字体，由于字体文件需要请求和加载，会影响性能 在页面初始化时，系统默认字体，转换为自定义字体，导致字体尺寸，间距或者布局发生变化。NextJS使用<code>next/font</code> 模块，对在项目中使用自定义字体进行自动优化。会在打包的时候下载字体文件，并缓存在静态文件下，这样当访问应用时，不再需要进行网络请求。</p><p>Next是将字体的配置文件，例如</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// /app/ui/fonts.ts</span></span>
<span class="line"><span>import { Inter } from &#39;next/font/google&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const inter = Inter({ subsets: [&#39;latin&#39;] });</span></span></code></pre></div><p>然后在布局文件的body标签应用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import &#39;@/app/ui/global.css&#39;;</span></span>
<span class="line"><span>import { inter } from &#39;@/app/ui/fonts&#39;;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>export default function RootLayout({</span></span>
<span class="line"><span>  children,</span></span>
<span class="line"><span>}: {</span></span>
<span class="line"><span>  children: React.ReactNode;</span></span>
<span class="line"><span>}) {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>      &lt;body className={\`\${inter.className} antialiased\`}&gt;{children}&lt;/body&gt;</span></span>
<span class="line"><span>    &lt;/html&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在上面的代码中，会发现有个一个样式类<code>antialiased</code>，这个是Taliwind的一个抗锯齿样式，可以让字体更顺滑，当然这个不是必需要加的，加了，体验会更好。</p><h4 id="为什么优化图片" tabindex="-1">为什么优化图片？ <a class="header-anchor" href="#为什么优化图片" aria-label="Permalink to &quot;为什么优化图片？&quot;">​</a></h4><p>在常规的HTML文件中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;img</span></span>
<span class="line"><span>    src=&quot;/hero.png&quot;</span></span>
<span class="line"><span>    alt=&quot;Screenshots of dashboard project showing desktop version&quot;</span></span>
<span class="line"><span>/&gt;</span></span></code></pre></div><p>我们必须得手动的设置以下几项：</p><ul><li>确定你的图片在不同屏幕尺寸下是响应式的</li><li>给不同的设备指定图片的尺寸</li><li>当图片加载时，防止页面回流</li><li>不在用户可见范围的图片进行懒加载</li></ul><p>图片优化一直是Web开发中老生常谈的问题，Next.js的<code>next/image</code>模块进行自动的优化操作，不再手动配置。 NextJS的<code>&lt;Image&gt;</code>组件是HTML的img标签的基础上进行了扩展，并且自动进行了图片优化：</p><ul><li>当图片加载时，防止回流。设定了图片的宽、高为必填属性，即设定了图片的尺寸，防止页面回流</li><li>调整不同viewport下图片的显示</li><li>懒加载</li><li>支持更多现代新的图片文件格式例如：WebP\\AVIF</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import AcmeLogo from &#39;@/app/ui/acme-logo&#39;;</span></span>
<span class="line"><span>import { ArrowRightIcon } from &#39;@heroicons/react/24/outline&#39;;</span></span>
<span class="line"><span>import Link from &#39;next/link&#39;;</span></span>
<span class="line"><span>import { lusitana } from &#39;@/app/ui/fonts&#39;;</span></span>
<span class="line"><span>import Image from &#39;next/image&#39;;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>export default function Page() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>    &lt;div className=&quot;flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12&quot;&gt;</span></span>
<span class="line"><span>      {/* Add Hero Images Here */}</span></span>
<span class="line"><span>      &lt;Image</span></span>
<span class="line"><span>        src=&quot;/hero-desktop.png&quot;</span></span>
<span class="line"><span>        width={1000}</span></span>
<span class="line"><span>        height={760}</span></span>
<span class="line"><span>        className=&quot;hidden md:block&quot;</span></span>
<span class="line"><span>        alt=&quot;Screenshots of the dashboard project showing desktop version&quot;</span></span>
<span class="line"><span>      /&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    //...</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="chapter-4" tabindex="-1">Chapter 4 <a class="header-anchor" href="#chapter-4" aria-label="Permalink to &quot;Chapter 4&quot;">​</a></h3><h4 id="nested-routing嵌套路由" tabindex="-1">Nested routing嵌套路由 <a class="header-anchor" href="#nested-routing嵌套路由" aria-label="Permalink to &quot;Nested routing嵌套路由&quot;">​</a></h4><p>Next.js使用文件系统路由，每个文件夹代表一个路由映射到URL，额，这么说有点模糊，上图示 <img src="https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffolders-to-url-segments.png&amp;w=3840&amp;q=75" alt="explain file-system route"></p><p>Next.js有两个特殊的命名文件：<code>layout.tsx</code>和<code>page.tsx</code></p><p><code>page.tsx</code>是一个特殊的NextJS文件，是一个组件的导出文件，举个栗子：</p><p><code>/app/page.tsx</code>对应的路由是<code>/</code></p><p><img src="https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fdashboard-route.png&amp;w=3840&amp;q=75" alt="file-system route example"></p><p>即：创建的文件夹名是路由名称，文件夹下的<code>page.tsx</code>是入口文件。<code>/app</code>则是根路由</p><p>如需嵌套子路由页面，即在该文件夹下，创建子路由的文件夹及对应的<code>page.tsx</code>文件</p><p><img src="https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Frouting-solution.png&amp;w=3840&amp;q=75" alt="nested route example"></p><p><img src="https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fpartial-rendering-dashboard.png&amp;w=3840&amp;q=75" alt="partial rendering"></p><p>显而易见的在<code>/app</code>文件夹根目录的<code>layout.tsx</code>便是整个项目的root layout</p><h3 id="chapter-5-navigating-between-pages页面之间的跳转" tabindex="-1">Chapter 5 Navigating Between Pages页面之间的跳转 <a class="header-anchor" href="#chapter-5-navigating-between-pages页面之间的跳转" aria-label="Permalink to &quot;Chapter 5 Navigating Between Pages页面之间的跳转&quot;">​</a></h3><p>最基础的我们可以是用a标签进行页面的跳转，但是使用a标签跳转，会导致页面的全面刷新。</p><p><code>next/link</code>模块为了提升跳转的体验，NextJS自动地通过路由将应用进行了code splits（代码拆分）.这不同于传统的SPA，初始化加载就加载了所有应用的代码。</p><p>通过路由进行的代码拆分，意味着每个页面都是独立的。如果一个页面出现了报错，其他页面依然正常工作。</p><p>此外，在生产环境下，NextJS会后台自动预拉取页面出现的<code>&lt;Link&gt;</code>标签涉及的code</p><h4 id="how-routing-and-navigation-works" tabindex="-1">How Routing and Navigation Works? <a class="header-anchor" href="#how-routing-and-navigation-works" aria-label="Permalink to &quot;How Routing and Navigation Works?&quot;">​</a></h4><ol><li><p>Code Splitting 通过路由拆分代码，只有当前路由所需的代码会加载，不会加载无关代码</p></li><li><p>Prefetching：只会在生产环境生效，dev环境不会</p></li></ol><p>可以在用户浏览前，后台提前预加载对应路由的代码，有两种方式会在NextJS中自动触发此机制：</p><ul><li><code>&lt;Link&gt;</code>组件：当出现在用户的可见范围内，则会在后台自动预加载<code>&lt;Link&gt;</code>对应的代码</li><li><code>router.prefetch()</code>：通过<code>useRouter</code>这个hook函数可以预加载指定的route</li></ul><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Prefetching is not enabled in development, only in production.</p></div><ol start="3"><li>Caching:预加载的以及浏览过的都会被缓存在Router Cache中</li><li>Partial Rendering:只会重新渲染有改变部分的，减少了数据传输量以及执行次数。提升渲染性能。</li><li>Soft Navigation:当变更的部分渲染时，不会影响preserved的State</li><li>Back and Forward Navigation:Router Cache维护前进及后退的路由，以及重用缓存</li><li>Routing between <code>pages</code> and <code>app/</code></li></ol><ul><li>usePathname()获取当前的link.href</li></ul><h3 id="chapter-6-setting-up-database-on-vercel" tabindex="-1">Chapter 6 Setting up database on Vercel <a class="header-anchor" href="#chapter-6-setting-up-database-on-vercel" aria-label="Permalink to &quot;Chapter 6 Setting up database on Vercel&quot;">​</a></h3><p>在Vercel部署了Next项目后，在Storage标签栏下，可以创建一个database，创建完成后，可以将<code>.env.local</code>下的内容：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">POSTGRES_URL</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*****&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">POSTGRES_PRISMA_URL</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*****&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">POSTGRES_URL_NO_SSL</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*****&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">POSTGRES_URL_NON_POOLING</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*****&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">POSTGRES_USER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*****&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">POSTGRES_HOST</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*****&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">POSTGRES_PASSWORD</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*****&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">POSTGRES_DATABASE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*****&quot;</span></span></code></pre></div><p>复制到项目中的<code>.env</code>文件中，该文件应该添加到<code>.gitignore</code>文件中，防止泄露</p><div class="language-zsh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @vercel/postgres</span></span></code></pre></div><p>在<code>/app/lib</code>定义fetch方法，例如：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Fetch the last 5 invoices, sorted by date</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">LatestInvoiceRaw</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  SELECT invoices.amount, customers.name, customers.image_url, customers.email</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  FROM invoices</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  JOIN customers ON invoices.customer_id = customers.id</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ORDER BY invoices.date DESC</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  LIMIT 5\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>应用：</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Card } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/app/ui/dashboard/cards&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RevenueChart </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/app/ui/dashboard/revenue-chart&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LatestInvoices </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/app/ui/dashboard/latest-invoices&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { lusitana } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/app/ui/fonts&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { fetchRevenue, fetchLatestInvoices } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@/app/lib/data&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Page</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> revenue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchRevenue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> latestInvoices</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchLatestInvoices</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="chapter-8-static-and-dynamic-rendering" tabindex="-1">Chapter 8 Static and Dynamic Rendering <a class="header-anchor" href="#chapter-8-static-and-dynamic-rendering" aria-label="Permalink to &quot;Chapter 8 Static and Dynamic Rendering&quot;">​</a></h3><p>使用next/cache中的unstable_noStore可以防止内容被缓存</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { unstable_noStore </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> noStore } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;next/cache&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchRevenue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // Add noStore() here to prevent the response from being cached.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // This is equivalent to in fetch(..., {cache: &#39;no-store&#39;}).</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  noStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchLatestInvoices</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  noStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchCardData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  noStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchFilteredInvoices</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  query</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  currentPage</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  noStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchInvoicesPages</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">query</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  noStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchFilteredCustomers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">query</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  noStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetchInvoiceById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">query</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  noStore</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p><code>unstable_noStore</code> is an experimental API and may change in the future. If you prefer to use a stable API in your own projects, you can also use the Segment Config Option export const dynamic = &quot;force-dynamic&quot;.</p></div>`,93),p=[t];function l(h,r,k,o,d,c){return i(),a("div",null,p)}const y=s(e,[["render",l]]);export{u as __pageData,y as default};
