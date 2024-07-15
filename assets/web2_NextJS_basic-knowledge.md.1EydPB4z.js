import{_ as s,c as a,o as i,a3 as e}from"./chunks/framework.Dcugq_a2.js";const u=JSON.parse('{"title":"Next.js的基础知识，主要特性","description":"","frontmatter":{},"headers":[],"relativePath":"web2/NextJS/basic-knowledge.md","filePath":"web2/NextJS/basic-knowledge.md"}'),t={name:"web2/NextJS/basic-knowledge.md"},n=e(`<h1 id="next-js的基础知识-主要特性" tabindex="-1">Next.js的基础知识，主要特性 <a class="header-anchor" href="#next-js的基础知识-主要特性" aria-label="Permalink to &quot;Next.js的基础知识，主要特性&quot;">​</a></h1><h2 id="路由-routing-fundamentals" tabindex="-1">路由 - Routing Fundamentals <a class="header-anchor" href="#路由-routing-fundamentals" aria-label="Permalink to &quot;路由 - Routing Fundamentals&quot;">​</a></h2><p>NextJS的路由有两种：APP router &amp; pages router</p><ul><li>app router app router是一个较新的路由模式，可以支持使用React最新的一些特性，例如：Server Components、Streaming</li><li>pages router 最原始的路由模式，方便创建服务端渲染应用，以及兼容旧的Next项目应用</li></ul><p>每个应用的骨架就是路由-Routing.默认的，在app目录下的page都是React Server Components,这是一个性能优化并且方便使用，当然也可以通过在文件的<code>顶部</code>声明来使用客户端渲染组件Client Components</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;use client&#39;</span></span></code></pre></div><h3 id="文件夹和文件的角色-roles-of-folders-and-files" tabindex="-1">文件夹和文件的角色 - Roles of folders and files <a class="header-anchor" href="#文件夹和文件的角色-roles-of-folders-and-files" aria-label="Permalink to &quot;文件夹和文件的角色 - Roles of folders and files&quot;">​</a></h3><p>Next使用的是基于文件系统的路由：</p><ul><li>Folders: 用来定义路由，每个路由是由嵌套的文件夹路径，遵循文件系统的层次结构，从根文件夹一直到包含有<code>page.js</code>的leaf文件夹</li><li>Files：则是一些Next官方定义的一些特殊命名的文件，包括像layout、page、loading、not-found、error、global-error、route、template、default等</li></ul><p>用官网的一张图来解释这个基于文件系统的路由设定： <img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&amp;w=3840&amp;q=75" alt="file-system router"></p><table><thead><tr><th>Special file-name</th><th>Description</th></tr></thead><tbody><tr><td><code>layout</code></td><td>布局</td></tr><tr><td><code>page</code></td><td>该路由下的页面UI，有了此文件，该路由才可访问</td></tr><tr><td><code>loading</code></td><td>该路由的一个全局loading</td></tr><tr><td><code>not-found</code></td><td>没有匹配到该路由下的子路由时展示</td></tr><tr><td><code>error</code></td><td>在拦截到该路由下的页面报错时展示</td></tr><tr><td><code>global-error</code></td><td>一个全局的拦截错误展示页面</td></tr><tr><td><code>route</code></td><td>Server-side API的终点</td></tr><tr><td><code>template</code></td><td>专用的重渲染的布局UI</td></tr><tr><td><code>default</code></td><td>用于Parallel Routes的Fallback UI</td></tr></tbody></table><h4 id="define-routes" tabindex="-1">Define Routes <a class="header-anchor" href="#define-routes" aria-label="Permalink to &quot;Define Routes&quot;">​</a></h4><p><img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&amp;w=3840&amp;q=75" alt="define a route"><img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fdefining-routes.png&amp;w=3840&amp;q=75" alt="create ui for every route"></p><h4 id="pages" tabindex="-1">Pages <a class="header-anchor" href="#pages" aria-label="Permalink to &quot;Pages&quot;">​</a></h4><p>特殊的<code>page</code>文件：</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [app/page.tsx]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Page</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;this is a page!&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="root-layout-required" tabindex="-1">Root Layout - required <a class="header-anchor" href="#root-layout-required" aria-label="Permalink to &quot;Root Layout - required&quot;">​</a></h4><p><code>app</code>目录下的<code>layout</code>会应用于所有的路由页面</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// app/layout.tsx</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RootLayout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  children</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> React</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ReactNode</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lang</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;en&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; // 必须</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; // 必须</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{children}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="nested-layout" tabindex="-1">Nested layout <a class="header-anchor" href="#nested-layout" aria-label="Permalink to &quot;Nested layout&quot;">​</a></h4><p>例如下图的嵌套的Layout设置 <img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layout.png&amp;w=3840&amp;q=75" alt="nested layout"></p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DashboardLayout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  children</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  children</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> React</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ReactNode</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">section</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{children}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">section</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>两个布局会生效在各自的管控范围，不会有冲突 <img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layouts-ui.png&amp;w=3840&amp;q=75" alt="root layout and children layout"></p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>app router的优先级要高于Pages router,跨目录的路由不应该解析为相同的URL path，在build的过程中就会报错，防止冲突</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>.js</code>,<code>.jsx</code>,or<code>.tsx</code>的文件扩展名也是可以用作特殊文件的</p></div><h3 id="component-hierarchy" tabindex="-1">Component Hierarchy <a class="header-anchor" href="#component-hierarchy" aria-label="Permalink to &quot;Component Hierarchy&quot;">​</a></h3><p>上面这些特殊的文件的层次结构展示</p><p><img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&amp;w=3840&amp;q=75" alt="组件的层次结构"></p><p>某一路由下的多子路由结构</p><p><img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-file-conventions-component-hierarchy.png&amp;w=3840&amp;q=75" alt="nested route"></p><p>有效和无效的路由定义 <img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-colocation.png&amp;w=3840&amp;q=75" alt="define route"></p><h3 id="高级路由模式-advanced-routing-patterns" tabindex="-1">高级路由模式 advanced routing patterns <a class="header-anchor" href="#高级路由模式-advanced-routing-patterns" aria-label="Permalink to &quot;高级路由模式 advanced routing patterns&quot;">​</a></h3><ul><li>Parallel Routes: display two or more pages on the same view</li><li>Intercepting Routes:</li></ul><h2 id="_1-streaming" tabindex="-1">1. Streaming <a class="header-anchor" href="#_1-streaming" aria-label="Permalink to &quot;1. Streaming&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Streaming is a data transfer technique that allows you to break down a route into smaller &quot;chunks&quot; and progressively stream them from the server to the client as they become ready.</p><p>流是一种可以让你把一个Route分解为小的chunks并逐渐的从Server流向Client的一种数据传输技术</p></div><p><img src="https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fserver-rendering-with-streaming.png&amp;w=3840&amp;q=75" alt="difference between partial content with loading state and streaming in"></p><p>By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.</p><p>通过流，你可以避免页面阻塞，允许用户查看或与部分页面内容进行交互，而无需等待所有的数据加载完成再向用户展示所有的UI内容</p><p><img src="https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fserver-rendering-with-streaming-chart.png&amp;w=3840&amp;q=75" alt="time with streaming"></p><p>两种方法可以在NextJS应用Streaming</p><ul><li>在页面层级，是用loading文件</li><li>使用<code>&lt;Suspense&gt;</code></li></ul><p>1、使用loading组件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Loading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;loading...&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><blockquote><ol><li>loading.tsx 是NextJS的一种特殊文件，在页面加载时，会展示<code>fallback UI</code>内容</li><li>由于<code>&lt;SideNav&gt;</code>是一个静态的组件，所以他会立即展示，当页面的异步内容在加载的时候，用户可以与此静态展示的内容交互</li><li>用户不用等页面加载完成，就可以导航跳转走</li></ol></blockquote><p>使用加载骨架屏（loading skeleton） 当<code>loading.tsx</code>文件在当前route页面的根文件处，即当前路由页面下的所有子页面也会应用生效 如果把<code>page.tsx</code>和<code>loading.tsx</code>放到<code>/(overview)</code>文件下，则只会在overview page生效</p><p>2、<code>&lt;Suspense&gt;</code></p><h2 id="_2-partial-prerendering-experimental-feature" tabindex="-1">2. Partial prerendering -- experimental feature <a class="header-anchor" href="#_2-partial-prerendering-experimental-feature" aria-label="Permalink to &quot;2. Partial prerendering -- experimental feature&quot;">​</a></h2><ul><li>What Partial Prerendering is?</li><li>How Partial Prerendering works?</li></ul><p>Next.js 14 contains a preview of Partial Prerendering – an experimental feature that allows you to render a route with a static loading shell, while keeping some parts dynamic. In other words, you can isolate the dynamic parts of a route. For example:</p><p>Next.js 14 包含对Partial Prerendering的预览，一个实验性的功能，可以让你用一个静态的loading渲染一个页面，并保持一部分是动态的。换句话所，就是在一个页面，将静态和动态的部分隔离开</p><p><img src="https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fthinking-in-ppr.png&amp;w=3840&amp;q=75" alt="partial prerendering"></p><ul><li>A static route shell is served, ensuring a fast initial load.</li><li>The shell leaves holes where dynamic content will load in asynchronous.</li><li>The async holes streamed in parallel,reducing the overall load time of the page</li></ul><h2 id="_3-route-handlers" tabindex="-1">3. Route Handlers <a class="header-anchor" href="#_3-route-handlers" aria-label="Permalink to &quot;3. Route Handlers&quot;">​</a></h2><p>官方文档：<a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers" target="_blank" rel="noreferrer">Route Handlers</a></p>`,54),l=[n];function p(r,h,o,d,k,g){return i(),a("div",null,l)}const E=s(t,[["render",p]]);export{u as __pageData,E as default};