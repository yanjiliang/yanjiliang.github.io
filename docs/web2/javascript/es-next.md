# ES6

## let const
let声明变量，const声明常量

| 特性 | var | let | const |
| :--- | :--- | :--- | :--- |
| 变量提升 | 是 | 否 | 否 |
| 重复声明 | 是 | 否 | 否 |
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 暂时性死区 | 否 | 是 | 是 |
| 全局对象属性 | 是 | 否 | 否 |

## 解构赋值
1、数组解构
```js
// 具有Iterator接口的数据结构
const [a, [[b],c]] = [1, [[2], 3]];
console.log(a, b, c) // 1, 2, 3
```
// 不完全解构
```js
const [,a,b] = [1,2,3];
console.log(a, b) // 2, 3
```
// 剩余运算符
```js
const [a, ...b] = [1,2,3]
console.log(a, b) // 1, [2, 3]
```
// 解构赋值的默认值
```js
const [a,b,c=3] = [1,2]
console.log(a, b, c) // 1, 2, 3
```
2、对象解构
```js
const {a, b, c} = {a: 1, b: 2, c: 3}
console.log(a, b, c) // 1, 2, 3
```
// 剩余运算符
```js
const {a,...b} = {a: 1, b: 2, c: 3}
console.log(a, b) // 1, {b: 2, c: 3}
```

3、其他赋值解构
- 字符串解构
```js
const [a, b, c, d, e] = 'hello'
console.log(a, b, c, d, e) // h, e, l, l, o

const {length: len} = 'hello'
console.log(len) // 5
```

## 箭头函数
箭头函数是一个匿名函数，它的this指向其所在的上下文，而不是全局对象。