# clsx

```zsh
npm i --save clsx
```
支持TailwindCSS
# 用法
```tsx
import clsx from 'clsx';
// or
import { clsx } from 'clsx';

// 1、字符串形式传入+变量控制
clsx('foo', true & 'far', 'faz') // => 'foo far faz'

// 2、对象形式传入
clsx({ foo: true, far: false, faz: isTrue() }) // => 'foo faz'

// 3、对象形式+变量控制
clsx({ foo: true }, { far: false }, null, { '--foo': 'str' }) // => 'foo --foo'

// 4、数组形式
clsx(['foo', 0, false, 'faz']) // => 'foo faz'

// 5、数组形式+变量控制
clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]); // => 'foo bar baz hello there'

// 6、混合使用
clsx('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya');
// => 'foo bar hello world cya'
```