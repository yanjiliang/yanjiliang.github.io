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


