# JavaScript

[面试题](./interview.md)

[手写题](./code.md)

## 1. 暂时性死区（temporal dead zone TDZ）\
ES6明确规定，在使用let和const命令进行变量声明的时候，在当前区块，形成了封闭作用域，如果在\变量声明之前使用变量，则会报错
```js
var temp = "lalala";

if("cool") {
    // tdz开始
    temp = "i am the new value"; // Uncaught ReferenceError: cannot access 'temp' before initialization
    let temp; // tdz结束
    console.log(temp); // undefined
    
    temp = "initial value"
    console.log(temp); // initial value
}
```
其他常见tdz场景
```js
function add(x = y, y = 1) {
    return x + y
}
add();
```
```js
let x = x; // ReferenceError: x is not defined
```
> ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量


## 2. Symbol
```js
const s1 = Symbol();
typeof s1; // 'symbol'

const s2 = Symbol('s2');
s2.toString(); // 'Symbol(s1)'
```
Symbol.prototype.description
```js
const s3 = Symbol('s3');

s3.description; // 's3'
```

Symbol作为对象的属性名,该属性为公开属性，非私有属性
> Symbol作为属性，可以通过Object.getOwnPropertySymbols(obj)获取全部Symbol属性\
> 不会被for...in,for ...of循环拿不到，以及Object.Keys()、Object.getOwnPropertyNames()、JSON.stringify()获取
> Reflect.ownKeys()
```js
let symbol_key = Symbol();
let obj = {};

obj[symbol_key] = 'new symbol_key value';
console.log(obj[symbol_key]); // 'new symbol_key value'
```
Symbol登记机制
Symbol.for()与Symbol()
```js
const s1 = Symbol('s1');
const s2 = Symbol('s1');

s1 === s2; // true
```
> Symbol.for()的全局登记特性，可以在不同的iframe和service work中取到同一个值

## 3、Set
> Set类似数组，成员值唯一，没有重复的值，Set本身是一个构造函数，用来生成Set数据结构
```js
[...new Set(array)] // 用来对数组进行去重
const set1 = new Set()
set1.add('1');
set1.size(); // 1
set1.has('1'); // true
set1.clear(); // 清楚所有成员
```
- Set.prototype.keys 返回键名
- Set.prototype.values 返回键值
- Set.prototype.entries 返回键值对
- Set.prototype.forEach 遍历成员

WeakSet
> WeakSet成员只能是对象和Symbol值
> WeakSet没有size属性，无法遍历成员
```js
const ws = new WeakSet();

ws.add('new value'); // 报错
ws.add(Symbol('new value')); // 可以
```

## 4、Map
> 类似对象，但键值不在局限于字符串
> Map的键跟内存地址绑定，只要内存地址不一样，值相同也会视为两个键

- Map.prototype.size
- Map.prototype.set(key, value)
- Map.prototype.get(key)
- Map.prototype.has(key)
- Map.prototype.delete(key) // 成功返回true，失败false
- Map.prototype.clear

WeakMap
> 只能对象（非null）和Symbol作为键名

## 5.Generator生成器
Generator是ES6提供过的一种异步编程解决方案。执行Generator函数会返回一个遍历器对象。
```js
function* firstGenerator() {
    yield 'ha';
    yield 'haa';
    return 'end';
}

const haha = firstGenerator()

haha.next();
// { value: 'ha', done: false }
haha.next();
// { value: 'haa', done: false }
haha.next();
// { value: 'end', done: true }

haha.next();
// { value: undefined, done: true }
```
调用Generator函数，返回一个遍历器对象`haha`，代表Generator函数内部指针，每次遍历器对象调用`next`方法，就会返回一个有着`value`和`done`两个属性的对象。
`value`代表当前内部的状态取值，`done`属性表示遍历是否结束。

```js
function* gen(){}

const g = gen();

g[Symbol.iterator] === g // true
```

## 6.
