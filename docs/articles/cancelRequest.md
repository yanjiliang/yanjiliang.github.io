# Axios and Fetch

## Axios
> Axios是一个基于Promise的网络请求库，可以用于浏览器和Node

- 在Node端是基于`http`库进行的封装
- 在浏览器客户端基于`XMLHttpRequests`进行封装

### 特性
- 支持Promise API
- 拦截请求或响应
- 转换请求或响应数据
- 取消请求
- 超时处理
- 查询参数序列化支持嵌套项处理
- 自动将请求体序列化为：
  - JSON(application/json)
  - Multipart/FormData(multipart/form-data)
  - URL encoded form(application/x-www-form-urlencoded)
- 将HTML Form转换成JSON进行请求
- 自动转换JSON数据
- 获取浏览器和node的请求进度，并提供额外的信息（速度、剩余时间）
- 为node设置带宽限制
- 兼容符合规范的FromData和Blob
- 客户端支持防御XSRF

```js
const axios = require('axios');

// 向给定ID的用户发起请求
axios.get('/user?ID=12345')
  .then(function (response) {
    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });

// 上述请求也可以按以下方式完成（可选）
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });  

// 支持async/await用法
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

### 取消请求

#### AbortController
从V`0.22.0`开始，支持fetch api--AbortController的形式取消请求
```js
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
```

#### CancelToken

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
```

```js
const controller = new AbortController();

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token,
  signal: controller.signal
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求 (message 参数是可选的)
source.cancel('Operation canceled by the user.');
// 或
controller.abort(); // 不支持 message 参数
```

## Fetch
> 现在浏览器内置最新的API,是对于`XMLHttpRequests`(XHR)的改进与替代。

### 特性

- 简化了异步编程：基于Promise，使得异步过程变得简洁、易懂
- 支持链式调用、响应流处理等新特性
- 直观、易于理解的语法
- 灵活和扩展性，拥抱未来

```js
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

```

### 取消请求
仅支持`AbortController`取消请求

```js
// 创建一个 AbortController 实例
const controller = new AbortController();
const signal = controller.signal;

// 发送 fetch 请求，并传入 signal 作为选项
fetch('https://api.example.com/data', { signal })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error('Fetch error:', error);
        }
    });

// 取消请求
controller.abort();

```