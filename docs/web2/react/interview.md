# 面试题

# 1、React18有哪些新特性？
- 自动批处理（Automatic batching）
- 并发渲染（Concurrent rendering）
- 异步渲染（Suspense for Data Fetching）
- startTransition
- useDeferredValue
- useId
- useTransition
# 2、React19有哪些新特性？

# 3、React合成事件 SyntheticEvent
:::info
React搞出合成事件这个东西，最主要的是要做跨平台cross-browser,抹平各个浏览器之间的差异。官方文档也是这么说的
a cross-browser wrapper around the browser's native event.
把浏览器的原生事件进行了包裹，使得在各个浏览器可以保持统一的执行逻辑。
React normalizes events so that they have consistent properties across different browsers.
:::

在React的底层处理中，主要做了事件委派和自动绑定
- 事件委派：
  - 事件代理机制
  - 不会把事件处理函数直接绑定真实DOM，而是绑定到结构的最外层，可以使用统一的事件监听器，维持了一个映射来保存组件内所有的事件监听和处理函数。
  - 当组件挂载和卸载时，只是在统一的事件监听器上插入和删除一些对象
  - 当事件触发时，由统一事件监听器处理，在映射中找到对应的事件处理函数调用，
- 自动绑定：
  - 在 React 组件中，每个方法的上下文都会指向该组件的实例，即自动绑定 this 为当前组件。 而且 React 还会对这种引用进行缓存，以达到 CPU 和内存的最优化。在使用 ES6 Class 或者纯函数时，这种自动绑定就不复存在了，我们需要手动实现 this 的绑定。

# 4、介绍下HOC
:::info
React HOC是一个用于复用组件逻辑的函数，它接收一个组件作为参数，并返回一个新的组件，新组件会拥有原始组件的所有功能，并且可以对原始组件的功能进行扩展。
:::

# 5. 介绍下MutationObserver
> 浏览器的MutationObserver API
```js
// 回调函数
function cb(mutationsList, observer) {
    // mutationsList 是一个数组，包含所有变动的节点
    // observer 是一个MutationObserver实例，包含有 observe() 方法
    for(let mutation of mutationsList) {
        if(mutation.type === 'childList') {
            // 子节点变动
        } else if (mutation.type === 'attributes') {
            // 属性变动
        }
    }
}

// 创建一个观察者实例
var observer = new MutationObserver(cb)


const config = {
    attrubutes: true, // 观察属性变动
    characterData: true, // 观察文本内容变动
    childList: true, // 观察子节点变动
    subtree: true, // 观察所有后代节点
    attributeOldValue: true, // 观察属性变动的旧值
    characterDataOldValue: true, // 观察
}

const targetNode = document.getElementById('test');

observer.observe(targetNode, config);

// 停止观察
observer.disconnect();
```

:::warning
- 使用MutationObserver应该慎用，如果监听的是大型DOM树或频繁变动，会产生性能问题
- 最好精确指定需要观察的变动type和节点，例如config中的childList和attributes
:::

# 6. 常见的样式隔离有哪些？
- CSS Modules: 在构建时将CSS类名局部作用域化。通常通过添加哈希值来实现，当导入一个CSS模块，会得到一个包含生成的类名的对象。这样可以确保样式的唯一性，防止样式冲突。
- Shadow DOM：Web components规范，允许将一段不受外界影响的DOM附加到元素上，Shadow DOM的样式是局部的，不会影响外部的文档样式。
- CSS-in-JS：使用JavaScript来生成CSS类名，可以实现样式的局部作用域和样式隔离。
- BEM block element modifier：BEM是一种前端命名约定的方式，通过给元素添加前缀、后缀和修饰符来确保样式的唯一性和可维护性。
- CSS Scoped：CSS Modules的语法糖，通过在HTML标签上添加一个特殊的属性来将CSS样式限制在当前组件中。
- iframe：iframe本身的样式、脚本隔离。但使用过多会有性能问题，并且组件通信较为困难
- postCSS：自动为CSS添加唯一前缀、变量等从而实现隔离
- 封装的CSS架构：准确的使用CSS选择器，严格的CSS命名规范

# 7. Portals是什么？使用场景有哪些？
React Portals提供了一种将子节点渲染到父组件之外的DOM节点。通常组件的渲染输出会被插入到其父组件下，但是Portals提供了一种穿透组件层次结构，直接渲染到任意DOM节点的方法

- 【父子结构逃逸】：允许将子组件渲染到父组件的DOM结构之外的DOM节点上
- 【样式继承独立】：可以不受父组件样式的影响，易于控制和自定义样式
- 【事件冒泡正常】：可以正常触发事件冒泡

使用场景：
- 模态框组件
- 浮动菜单
- 提示、通知组件
- 全屏组件

```js
ReactDOM.createPortal(child, container);
```

# 8. React和React-DOM的区别？
ReactDOM是React库的一部分，专门用于与浏览器DOM交互，包括DOM的渲染、更新和删除。

# 9. 手动实现一个Schedule模拟React调度器
```js
let tasks = [];
let currentTask = null;

function schedule({ task, priority }) {
    tasks.push({ task, priority });
    tasks.sort((a, b) => a.priority - b.priority);
}

function workloop(deadline) {
    if(tasks.length > 0 && deadline.timeRemaining > 0) {
        currentTask = tasks.shift().task();
        currentTask();
        workloop(deadline);
    } else {
        currentTask = null;
        requestIdleCallback(workloop);
    }
}

requestIdleCallback(workloop);
```

# 10. HOC高阶组件的几个应用场景
1、代码复用
```jsx
const withFetching = fetching => WrappedComponent => {
    return class extends React.Component {
        state = {
            data: []
        }
    }
    
    async UNSAFE_componentWillMount() {
        this.data = await fetching();
        this.setState({ data })
    }
    
    render() {
        return <WrappedComponent {...this.props} data={this.state.data} />
    }
}

// page-a.js
export default withFetching(fetchData('action-movie'))(MovieList);
// page-b.js
export default withFetching(fetchData('comedy-movie'))(MovieList);
// page-c.js
export default withFetching(fetchData('love-movie'))(MovieList);
```
2、反向继承

```jsx
const withTiming = WrappedComponent => {
    return class extends WrappedComponent {
        constructor(props) {
            super(props);
            this.start = 0;
            this.end = 0;
        }
        
        UNSAFE_componentWillMount() {
            super.componentWillMount && super.componentWillMount();
            this.start = Date.now();
        }
        
        componentDidMount() {
            super.componentDidMount && super.componentDidMount();
            this.end = Date.now();
            console.log(`渲染时间为${this.end - this.start}ms`);
        }
        
        render() {
            return super.render();
        }
    }
}

class PageA extends React.Component{
    render() {
        return <div>hello Page a!</div>
    }
}

export default withTiming(PageA);
```
3、条件渲染
```jsx
const withAuth = WrappedComponent => {
    return class extends WrappedComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLogin: false
            }
        }
        async UNSAFE_componentWillMount() {
            const isLogin = await getLoginStatus();
            this.setState({
                isLogin
            })
        }
        
        render() {
            if(!isLogin) {
                return <div>请先登录</div>
            }
            return super.render();
        }
    }
}
```

# 11. useEffect与useLayoutEffect的区别

- useEffect
  - 在浏览器完成绘制和布局之后执行，异步的执行回调，不会阻塞浏览器
  - 适用于不改变布局场景的操作，I/O、订阅等
```jsx
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // 组件挂载时执行
    console.log('Component did mount');

    // 组件卸载时执行
    return () => {
      console.log('Component will unmount');
    };
  }, []); // 依赖项数组为空，表示仅在组件挂载和卸载时执行

  return <div>My Component</div>;
}

```
- useLayoutEffect
  - 在DOM变更后，浏览器绘制前执行，同步的执行回调，会阻塞浏览器
  - 通常用于需要读取布局信息或进行同步DOM操作的场景（例如测量DOM元素尺寸、计算布局等）

# 12. 生命周期详解
分三大阶段：
- 挂载阶段
  - constructor: 构造函数，初始化组件状态
  - static getDerivedStateFromProps: 
    - 每次渲染前调用，包括初始渲染和后续更新
    - 根据props更新state，即返回一个新的state对象,返回null则不更新
    - 此为静态方法，无法访问实例this
  - render: 渲染组件
  - componentDidMount: 
    - 组件挂载到DOM后执行
    - 数据获取、订阅等操作
- 更新阶段
  - static getDerivedStateFromProps
  - shouldComponentUpdate
  - render
  - getSnapshotBeforeUpdate(prevProps, prevState)
  - componentDidUpdate(prevProps, prevState, snapshot)
- 卸载阶段
  - componentWillUnmount
- 错误处理
  - static getDerivedStateFromError(error)
  - componentDidCatch(error, errorInfo)

![react lifecycle](https://tsejx.github.io/react-guidebook/static/react-lifecycle-methods-diagram.ae211f59.jpg)

V16.3废弃了三个UN_SAFE生命周期：
React的异步渲染模式（Concurrent Mode），会多次调用以下三个生命周期，导致额外的性能开销。并且每次调用的结果不一定相同。
- UNSAFE_componentWillMount
  - 可改用constructor\componentDidMount
- UNSAFE_componentWillReceiveProps
  - 可改用static getDerivedStateFromProps
- UNSAFE_componentWillUpdate
  - 可改用getSnapshotBeforeUpdate\componentDidUpdate

```jsx
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('constructor');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return nextProps.value !== this.props.value;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.list.length < this.props.list.length) {
      return this.listRef.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    if (snapshot !== null) {
      this.listRef.scrollTop = this.listRef.scrollHeight - snapshot;
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    console.log('render');
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default MyComponent;

```

# 13. setState的流程
setState 流程还是很复杂的，设计也很精巧，避免了重复无谓的刷新组件。它的主要流程如下

1、enqueueSetState 将 state 放入队列中，并调用 enqueueUpdate 处理要更新的 Component
2、如果组件当前正处于 update 事务中，则先将 Component 存入 dirtyComponent 中。否则调用 batchedUpdates 处理。
3、batchedUpdates 发起一次 transaction.perform() 事务
4、开始执行事务初始化，运行，结束三个阶段
  - 初始化：事务初始化阶段没有注册方法，故无方法要执行
  - 运行：执行 setSate 时传入的 callback 方法，一般不会传 callback 参数
  - 结束：更新 isBatchingUpdates 为 false，并执行 FLUSH_BATCHED_UPDATES 这个 wrapper 中的 close 方法
5、FLUSH_BATCHED_UPDATES 在 close 阶段，会循环遍历所有的 dirtyComponents，调用 updateComponent 刷新组件，并执行它的 pendingCallbacks, 也就是 setState 中设置的 callback。
