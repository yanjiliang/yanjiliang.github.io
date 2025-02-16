# 手写面试题

## 1.手写一个new
```js
function myNew(fn, ...args) {
    // 创建一个新对象obj，原型指向构造函数的原型对象
    const obj = Object.create(fn.prototype);
    // 执行一次构造函数，改变this指向obj
    const res = obj.apply(fn, args);
    // 判断构造函数的返回类型，如果是一个对象就直接返回，否则返回obj
    return res instanceof 'Object' ? res : obj;
}
```

## 2.手写实现一个instanceOf
```js
function myInstanceOf(target, obj) {
    // 获取原型
    let proto = Object.getPrototypeOf(target);
    while (proto !== null){
        // 判断
        if(proto === obj.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}
```

## 3.Object.create()
```js
function create(obj) {
    // 创建一个中间构造函数
    function Temp() {};
    Temp.prototype = obj;
    return new Temp();
}
```

## 4.实现一个发布订阅模式
```JS
class EventEmitter {
    construcotr() {
        this.events = new Map();
    }
    on(key, fn) {
        // 监听
        if(this.events.has(key)){
            const val = this.events.get(key);
            this.events.set(key, [...val, fn])
            return;
        }
        this.events.set(key, [fn]);
    }
    emit(key) {
        // 触发
        if(this.events.get(key)) {
            const _fns = this.events.get(key);
            if(Array.isArray(_fn)) {
                _fns.forEach(_fn => _fn());
                return;
            }
            _fns()
        }
    }
    off(key) {
        // 销毁监听
        if(this.events.has(key)) {
            this.events.delete(key);
        }
    }
    once(key) {
        // 只执行一次
        this.emit(key);
        this.off(key);
    }
}
```

## 5.手写call\apply\bind
```js
Function.prototype.myCall = function (context, ...args) {
    const _context = context || window;
    _context.fn = this;
    const res = _context.fn(...args);
    delete _context.fn;
    return res;
}

Fuction.prototype.myApply = function(context, args) {
    const _context = context || window;
    _context.fn = this;
    const res = _context.fn(...args);
    delete _context.fn;
    return res;
}
Fuction.prototype.myBind = function(context, ...args) {
    const _this = this;
    return function(...args1) {
        return _this.myApply(context, ...args, ...args1);
    }
}
```

## 6.手写Promise
```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class myPromise {
    // 构造函数,初始化
    constructor(excutor) {
        // status
        this.status = PENDING;
        // success queue
        this.resolveQueue = [];
        // failure queue
        this.rejectQueue = [];
        
        // 成功
        let _resolve = (val) => {
            if(this.status !== PENDING) return;
            
            this.status = RESOLVED;
            
            while (this.resolveQueue.length) {
                const fn = this.resolveQueue.shift();
                fn(val);
            }
        }
        
        // 失败
        let _resjected = (err) => {
            if(this.status !== PENDING) return;
            
            this.status = REJECTED;
            
            while (this.rejectQueue.length) {
                const fn = this.rejectQueue.shift();
                fn(err);
            }
        }
        
        excutor(_resolve, _resjected);
    }
    
    then(resolveFn, rejectFn){
        this.resolveQueue.push(resolveFn);
        this.rejectQueue.push(rejectFn);
    }
}
```

## 7.判断一个对象是否为空
```js
Object.getOwnPropertyNames().length !== 0
Object.getOwnPropertySymbols().length !== 0
// 不考虑Symbol类型属性
Object.keys(obj).length !== 0
JSON.stringify(obj) !== '{}'

// 考虑Symbol属性
Reflect.ownKeys(obj).length !== 0
```

## 8.数组扁平化
```js
const flatArr = function(arr) {
    const res = [];
    // 递归遍历所有项
    (function helper(_arr) {
        _arr.forEach(i => {
            if(Array.isArray(i)){
                helper(i);
            } else {
                res.push(i);
            }
        })
    })(arr);
    return res
}

// 扩展：指定展开到第n层
const flatArrN = function(arr, n = 1) {
    const res = [];
    (function helper(_arr, _n){
        _arr.forEach(i => {
            if(Array.isArray(i) && _n >0){
                helper(i, _n-1);
            } else {
                res.push(i)
            }
        })
    })(arr, n)
    return res;
}
```

## 9.拍平对象
```js

```

## 10.手写实现useEffect
```ts
// 依赖收集
const allDeps: Array<any[] | undefined> = [];
// 副作用
let effectCursor: number = 0

function useEffect(fn: () => void, deps?: any[]) {
    if(!deps){
      fn();
      allDeps[effectCursor] = deps;
      effectCursor++;
      return;
    }
    const _deps = deps[effectCursor];
    const hasChangeDeps = _deps
      ? deps.some((el, i) => el !== _deps[i])
      : true
  
    if(hasChangedDeps) {
        fn();
        allDeps[effectCursor] = deps;
    }
    effectCursor++;
}

```

## 11. 实现一个add函数完成大数相加
```ts
function add(a: string, b: string){
    let carry = 0; // 进位
    let result = ''; // 最终结果
    const lenA = a.length || 0;
    const lenB = b.length || 0;
    // 因为不知道A,B两个位数是否相等，所以从后往前开始遍历
    while(lenA >= 0 || lenB >= 0 || carry){
        const a1 = lenA >= 0 ? parseInt(a[lenA--], 10) : 0;
        const b1 = lenB >= 0 ? parseInt(b[lenB--], 10) : 0;

        let sum = a1 + b1 + carry;
        carry = Math.floor(sum / 10);
        sum = sum % 10;
        result = result + sum;
    }
    return result;
}
```

## 12. 水仙花数
水仙花数是指一个n位数（n≥3），其每个位上的数字的n次幂之和等于它本身‌
```ts
    function daffodilsNumber() {
        let result: number[] = [];
        for(let i = 100; i < 100; i++) {
            let unit = i % 10;
            let ten = Math.floor(i / 10) - Math.floor(i / 100) * 10;
            let hundred = Math.floor(i / 100)

            if (i === (unit * unit * unit + ten * ten * ten + hundred * hundred * hundred)){
                result.push(i)
            }
        }
        return result;
    }
```

## 13. 九九乘法表
```ts
    function multiplicationTable(){
        let result: string[][] = [];

        for(let i = 1; i <= 9; i++){
            let idx = string[];
            for(let j = 1; j <= i; j++){
                const str = i + '*' + j + '=' (i*j);
                idx.push(str)
            }
            result.push(idx)
        }
        return result;
    }
```

## 14. 判断是否是回文字符串
```ts
    function is
```