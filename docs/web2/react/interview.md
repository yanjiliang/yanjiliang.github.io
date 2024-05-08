# 面试题

1、React18有哪些新特性？
- 自动批处理（Automatic batching）
- 并发渲染（Concurrent rendering）
- 异步渲染（Suspense for Data Fetching）
- startTransition
- useDeferredValue
- useId
- useTransition
2、React19有哪些新特性？

3、React合成事件 SyntheticEvent
:::info
React搞出合成事件这个东西，最主要的是要做跨平台cross-browser,抹平各个浏览器之间的差异。官方文档也是这么说的
a cross-browser wrapper around the browser's native event.
把浏览器的原生事件进行了包裹，使得在各个浏览器可以保持统一的执行逻辑。
React normalizes events so that they have consistent properties across different browsers.
:::

4、