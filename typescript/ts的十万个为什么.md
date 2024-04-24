# 十万个为什么

## ts 中 interface 和 type 有什么区别？

### 相同点

#### 都可以描述一个对象或者函数

##### interface

```ts
interface User {
    name: string;
    age: number;
}

interface SetUser {
    (name: string, age: number): void;
}
```

##### type

```ts
type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number): void;
```

#### 都允许拓展与交叉类型

##### interface 可以 extends， 但 type 是不允许 extends 和 implement 的，但是 type 缺可以通过交叉类型 实现 interface 的 extend 行为，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 与 interface 类型 交叉

###### interface extends interface

```ts
interface Name {
    name: string;
}

interface User extends Name {
    age: number;
}
```

###### type 与 type 交叉

```ts
type Name = {
    name: string;
};

type User = Name & {age: number};
```

###### interface extends type

```ts
type Name = {
    name: string;
};

interface User extends Name {
    age: number;
}
```

###### type 与 interface 交叉

```ts
interface Name {
    name: string;
}

type User = Name & {
    age: number;
};
```

### 不同点

#### type 的独享专利

##### type 可以声明基本类型别名，联合类型，元组等类型

```ts
// 基本类型别名
type Name = string;

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat;

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet];
```

##### type 可以使用 typeof 获取实例的类型进行赋值

```ts
const div = document.createElement('div');

type B = typeof div;
```

##### 其他使用方式

```ts
type StringOrNumber = string | number;
type Text = string | {text: string};
type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | {left: Tree<T>; right: Tree<T>};
```

#### interface 可以合并声明，也即可以定义多个同接口名，最终回合并

```ts
interface User {
    name: string;
    age: number;
}

interface User {
    sex: string;
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

参考文档：

<https://github.com/SunshowerC/blog/issues/7>

<https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases>

## ts 解构如何定义类型

具体操作如下

```ts
interface DataItem {
    ...
}

const res = {
    data: {
        ...
    }
}
const {data}: {data: DataItem} = res;
```

## ts 和 axios 的使用

### api 接口

```ts
import {AxiosPromise} from 'axios';
import request from '../utils/request';

export function queryUserInfo(params: unknown): AxiosPromise {
    return request({
        url: 'path',
        params,
    });
}

export function postSoftwares(data: unknown): AxiosPromise {
    return request({
        url: 'path',
        data,
        method: 'post',
    });
}

// 获取软件列表以及用户信息
export function querySoftwareList(): AxiosPromise {
    return request({
        url: '/api/software/declare/list',
    });
}
```

### 业务代码使用

```ts
...

async querySoftwareList(): Promise<void> {
    const {data}: {data: ResponseData} = await http.querySoftwareList();
    if (data.status === 0) {
        this.userName = data.data.user.name;
    }
}

...
```

## ts 中定义 interface 的时候对象为什么要用 Record？

定义一个对象的 key 和 value 类型的时候用到了 Record，举例如下：

```ts
interface PageInfo {
    title: string;
}

type Page = 'home' | 'about' | 'contact';

const nav: Record<Page, PageInfo> = {
    about: {title: 'about'},
    contact: {title: 'contact'},
    home: {title: 'home'},
};
```

## 参考文档

<https://blog.poetries.top/ts-axios/chapter4/response-data.html#transformresponse-%E5%87%BD%E6%95%B0%E5%AE%9E%E7%8E%B0%E5%8F%8A%E5%BA%94%E7%94%A8>
