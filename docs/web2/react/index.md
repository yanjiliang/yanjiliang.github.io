
# React

[面试题](./interview.md)

## 1.React生命周期相关
- UNSAFE_componentWillMount
- UNSAFE_componentWillReceiveProps
- UNSAFE_componentWillUpdate

由于V16.0的异步渲染机制，渲染可中断，导致`componentWillMount`会执行多次。如在`componentWillMount`周期执行事件绑定，I/O请求等操作，会重复创建监听和请求，造成性能浪费和网络资源浪费。

原`componentWillUpdate`与`componentDidUpdate`配合使用，可获取渲染更新前后状态，进行相应的逻辑处理。但由于异步渲染机制，被分割成多个切片去执行，还可中断或回溯，导致两个周期中间的执行时间不定，如果在此期间，用户又进行了额外操作导致状态的变更，可能会导致难以定位的BUG。

新增的`getSnapshotBeforeUpdate`就是为了解决这一问题，取代componentWillUpdate，在真正修改DOM前执行，获取到的组件信息更为可靠。return的返回结果，会作为第三个参数传入`componentDidUpdate`
```js
getSnapshotBeforeUpdate(preProps, preState)
{
    // preProps last props
    // preState last state
}

componentDidUpdate(preProps, preState, snapshot)
{
    // preProps last props
    // preState last state
    // snapshot the return result with getSnapshotBeforeUpdate
}
```

## 2.Suspense and ErrorBoundary
- `<Suspense />`提供一个应急计划，类似Plan B,当包裹的children组件未完成载入时，展示`fallback`配置的内容
```js
<Suspense fallback={() => 'loading...'}>
    <ChildrenComponent />
</Suspense>
```

多个嵌套的`Suspense`,会执行最近的生效，例如
```js
<Suspense fallback={<BigSpinner />}> // 会先展示BigSpinner内容，待Biography载入完成，展示Biography和AlbumsGlimmer
    <Biography artistId={artist.id} />
    <Suspense fallback={<AlbumsGlimmer />}> // 子组件载入完成，展示真实的内容
      <Panel>
        <Albums artistId={artist.id} />
      </Panel>
    </Suspense>
</Suspense>
```

- `ErrorBoundary`
```js
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // 发生错误则: 更新 state
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 捕获到错误: 可以打印或者上报错误
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>深感抱歉, 系统出现错误!! 开发小哥正在紧急维护中.... </h1>;
    }
    return this.props.children; 
  }
}

// 错误边界使用
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>

```