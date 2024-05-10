# JavaScript Interview Questions

## 1. JS放在head中还是body中有什么区别？
- 放在head中，JS代码会在HTML完全加载之前，就加载并执行，可能阻塞页面HTML的渲染。
- 放在body中，JS代码会在HTML完全加载之后，再执行，不会阻塞页面HTML的渲染。特别是JS代码中如果有操作DOM。
- 可将用于初始化脚本放在head，将复杂、涉及DOM操作的脚本放在body底部。

## 2.什么是闭包？Closure
当一个函数在其定义时捕获了其外部作用域的变量，即使该外部作用域已经执行完毕，这个函数依然可以访问这些变量，这种行为称之为闭包。
- 函数可以访问定义它的外部函数中的变量，即使外部函数已经执行完毕。
- 闭包可以在函数的生命周期内保持对其所处环境的引用，这意味着在外部函数执行后，闭包仍然可以访问和修改外部函数的局部变量。
应用场景：
1、私有变量和方法：通过闭包可以实现私有变量和方法，这些变量和方法对外不可见。
2、回调函数：闭包经常用于常见回调函数，以便函数可以访问其定义时的上下文
3、模块化编程：通过闭包可以实现模块化编程，将相关的变量和方法封装在一个闭包中，使得代码更加模块化和可维护。
4、延迟执行：通过闭包可以实现延迟执行的效果，因为闭包可以捕获所在环境的变量，并在稍后执行时仍然可以访问这些变量。
闭包的缺点：
- 由于闭包保持对外部函数的引用，可能会导致内存泄漏，不需要闭包时及时释放内存

## 3. 什么是原型链？什么是显式原型和隐式原型？
原型：每个对象都有一个prototype属性，指向它的原型对象，原型对象也有自己的原型对象，直到一个对象的原型对象为null为止，根据原型对象层层向上查找，最终找到Object.prototype，根据Object.prototype的原型对象为null为止。
__proto__指向构造函数的prototype属性。
```js 
class Person {
    constructor() {
        this.name = "laosi"
        this.age = 18
    }
}

const person = new Person();

console.log(person.__proto__ === Person.prototype); // true
```
显式原型：即prototype属性，指向函数的显式原型。通常用于实现对象之间的继承关系。通过在构造函数的prototype属性上定义属性和方法，可以让所有通过该构造函数创建的对象共享这些属性和方法。
隐式原型：即__proto__属性，指向构造函数的显式原型
原型链：即沿着对象的__proto__属性向上查找，直到找到Object.prototype为止。

## 4. new操作符具体干了什么？
1、创建一个空对象
2、将这个空对象的原型对象，即prototype指向构造函数的prototype
3、通过apply改变this的指向，将构造函数的this指向这个空对象
4、判断函数的返回值类型，如果是值类型，返回创建的对象。如何是引用类型，就返回这个引用类型的对象。
```js
function myNew(constructor,...args) {
    // 创建一个空对象,并将它的原型指向构造函数的prototype
    const obj = Object.create(constructor.prototype);
    // 改变this的指向,将构造函数的this指向这个空对象
    const result = constructor.apply(obj, args);
    // 判断构造函数的返回
    return typeof result === 'object' ? result : obj;
}

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
}

Person.prototype.getName = function() {
    return this.name;
}

const person = myNew(Person, 'laosi', 18, 'Engineer');
person.getName(); // 'laosi'
```

## 5. 如何优化setInterval的倒计时不准确问题？
setInterval的不准确是由于JS的单线程问题。当执行了一些比较耗时的任务是，会导致定时器的回调函数不准确。为了解决这个问题，可以使用RAF(requestAnimationFrame)
```js
function countDown(endTime, updateCb, finishCb) {
    const startTime = Date.now();
    let timeRemaining = endTime - startTime;
    
    function update() {
        timeRemaining = endTime - Date.now();
        
        if(timeRemaining < 0) {
            if (typeof finishCb === 'function'){
                finishCb();
            }
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        if(typeof updateCb === 'function') {
            updateCb(days, hours, minutes, seconds);
        }
        requestAnimationFrame(update);
    }
    update();
}

const endTime = Date.now() + 60000;
countDown(endTime, (days, hours, minutes, seconds) => {
    console.log(`Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`);
}, () => {
    console.log('Countdown finished!');
}); 
```

## 6. Promise与async/await的区别？
- Promise是异步编程的一种解决方案，async/await是Promise的语法糖。
- async/await提高了代码的可读性，而Promise的链式调用则让代码更加清晰。
// TODO

## 7. script标签的defer和async属性有什么区别？
- defer属性表示延迟执行脚本，即在脚本加载完成后，但DOM解析之前，执行该脚本。
- async属性表示异步执行脚本，即在加载完成后，立即执行该脚本，但不保证脚本的执行顺序。
- 需要注意的是，使用defer或async属性时，脚本将不会阻塞页面的加载和渲染。
- 如果需要确保脚本的执行顺序，可以使用回调函数或Promise来实现。

# 8. 用JS实现一个cookies解析函数，输出结果为一个对象
```js
function parseCookies(cookieStr) {
    const res = {};
    // 分割字符串，并方便后续遍历键值对处理
    const cookies = cookieStr.split(';').map(i => i.trim());
    
    // 遍历处理
    cookies.forEach((cookie) => {
        // 有效键值对由 ‘=’ 连接
        const separatorIndex = cookie.indexOf('=');
        if(separatorIndex === -1) {
            return; // 说明不是有效的键值对
        }
        
        let key = cookie.substring(0, separatorIndex);
        let value = cookie.substring(separatorIndex + 1);
        
        key = decodeURLComponent(key);
        value = decodeURLComponent(value);
        
        res[key] = value
    })
    
    return res;
    
}
```

# 9. husky的原理是什么？
Husky是一个基于Node的Git钩子管理工具，用在工作流程中强制执行Git钩子。Husky允许自定义脚本，这些脚本会在不同的Git生命周期时间触发执行，比如提交、推送、合并前

使用场景：
- 提交前运行代码规范检查，保证代码提交质量
- 保持代码风格统一
- 自动化流程，如自动生成CHANGELOG、自动运行测试等
- 提交信息格式化检查
- 自动修复一些常见的代码错误

支持的Git钩子：
- apply -patch-msg:应用一个补丁到暂存区并生成提交信息
- pre-apply-patch: 应用一个补丁之前
- post-apply-patch: 应用补丁后
- pre-commit: 提交前，检查代码，分析代码风格
- prepare-commit-msg: 生成提交信息
- commit-msg: 提交信息格式化检查
- post-commit: 提交后
- pre-rebase: 变基之前
- post-checkout: 切换分支后
- post-merge: 合并分支后
- pre-push: 推送前
- pre-receive: 接收到推送前
- update: 远程分支更新时
- post-receive: 接收到推送后
- post-update: 远程分支更新后
