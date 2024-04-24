# react 的状态管理器 mobx

写在前面的话，

## 安装依赖包

```shell
# 安装mobx
yarn add mobx

# 提供装饰器、Provider等功能组件
yarn add mobx-react
```

## 安装 babel 相关依赖

1、安装以下两个依赖

```shell

yarn add @babel/plugin-proposal-decorators

yarn add @babel/plugin-proposal-class-properties

```

2、babel 引入插件的依赖

```json
"babel": {
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": true
            }
        ]
    ]
}
```

3、eslint 配置

```json
"eslintConfig": {
    "parserOptions": {
        "ecmaFeatures": {
            "legacyDecorators": true
        }
    }
}
```

## 创建一个 mobx 状态管理文件

可以在当前工程 src 目录下创建一个 mobx 目录，用于统一管理全局状态。

```ts
// 以下是mobx 5.x版本的写法，使用装饰器。
import {action, observable} from 'mobx';

class Todos {
    // observable 是定义一个可观测的变量
    @observable todos: string[] = [];

    // 创建一个动作，可以用于改变可观测变量的值
    @action addTodos(todo: string) {
        this.todos.push(todo);
    }

    // 计算可观测变量并得到其衍生的值
    @computed get total() {
        return this.todos.length;
    }
}

export default new Todos();
```

```ts
// mobx升级到6.x版本，以后版本取消了装饰器的概念，因此写法已经变成如下。
import {makeAutoObservable} from 'mobx';

class Todos {
    constructor() {
        // 新版本需要在此写下这么一句话
        makeAutoObservable(this);
    }
    public todos: string[] = [];

    addTodos(todo: string) {
        this.todos.push(todo);
    }
}

export default new Todos();
```

## 在主入口添加 mobx 管理

依赖包 mobx-react 提供了 Provider 组件用于包裹需要使用状态管理数据的组件

```tsx
// 引入Provider
import {Provider} from 'mobx-react';
// 引入自己写好的状态管理文件
import store from './mbox/todos';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
```

## 在组件中如何使用状态管理器？

```tsx
import React from 'react';
import {inject, observer} from 'mobx-react';
import {Button} from 'antd';

interface StoreItems {
    todos: string[];
    addTodos: Function;
}

interface IRecipeProps {
    store?: StoreItems;
}

// 即使更新到了6.x版本，此处的装饰器也不可删除
@inject('store')
@observer
export default class Todos extends React.Component<IRecipeProps> {
    handleAddTodo() {
        let {store} = this.props;
        if (store) {
            store.addTodos('添加一条数据');
        }
    }

    render() {
        let {store} = this.props;
        return (
            <div>
                <div className='buttons'>
                    <Button type='primary' onClick={this.handleAddTodo.bind(this)}>
                        添加一条Todo
                    </Button>
                    <Button type='primary' danger>
                        删除一条Todo
                    </Button>
                    <Button>清除Todo</Button>
                </div>
                <div>
                    {store &&
                        store.todos.map((ele, index) => {
                            return <div>{ele}</div>;
                        })}
                </div>
            </div>
        );
    }
}
```

## 已有的老项目如何升级使用 hook 以及 mobx？

对于函数式编程的内容可以用如下的写法：

```tsx
import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {Button} from 'antd';

interface StoreItems {
    todos: string[];
    addTodos: Function;
    total: Function;
}

interface IRecipeProps {
    store?: StoreItems;
}

const Todos: React.FC<IRecipeProps> = ({store}) => {
    const handleAddTodo = () => {
        if (store) {
            store.addTodos('添加一条数据');
        }
    };

    useEffect(() => {
        console.log('我是hook的钩子');
    }, []);
    return (
        <div>
            <div className='buttons'>
                <Button type='primary' onClick={handleAddTodo}>
                    添加一条Todo
                </Button>
                <Button type='primary' danger>
                    删除一条Todo
                </Button>
                <Button>清除Todo</Button>
            </div>
            <div>{store && store.total}</div>
            <div>
                {store &&
                    store.todos.map((ele, index) => {
                        return <div>{ele}</div>;
                    })}
            </div>
        </div>
    );
};

// 需要在导出的时候获取store实例，并且把Todos变成可以观测的。
export default inject('store')(observer(Todos));
```

## mobx-react-lite 适配 react hook 的实践

现在 react 已经开始力推以 hook 的方式开发，因此需要 mobx 适配一下。此时我们需要使用一个轻量级的插件来帮助我们完成状态管理。

1、首先 mobx 文件不用修改。

```ts
import {makeAutoObservable} from 'mobx';

class Todo {
    constructor() {
        // 此处仍然需要做数据观测
        makeAutoObservable(this);
    }
    public todos: string[] = [];

    addTodos(todo: string) {
        this.todos.push(todo);
    }

    get total(): number {
        return this.todos.length;
    }
}

export default new Todo();
```

2、删除掉 Provider，这里已经不需要 Provider 来传值

```tsx
<Provider store={store}></Provider>
```

3、在引入组件传值

```tsx
import React from 'react';
import './App.css';
import Todos from './components/todo';
import store from './mbox/todos';

const App: React.FC = () => {
    return (
        <div className='App'>
            <header className='App-header'>
                {/* 这里需要传值mobx */}
                <Todos store={store} />
            </header>
        </div>
    );
};

export default App;
```

4、在组件内部引入插件，并且观测整个组件

```tsx
import * as React from 'react';
import {Button} from 'antd';
import {observer} from 'mobx-react-lite';

interface StoreItems {
    todos: string[];
    addTodos: Function;
    total: Number;
}

type IRecipeProps = {
    store?: StoreItems;
};

// 在此处用observer包裹整个组件函数
const Todos: React.FC<IRecipeProps> = observer(({store}) => {
    const handleAddTodo = () => {
        if (store) {
            store.addTodos('添加一条数据');
        }
    };

    return (
        <div>
            <div className='buttons'>
                <Button type='primary' onClick={handleAddTodo}>
                    添加一条Todo
                </Button>
                <Button type='primary' danger>
                    删除一条Todo
                </Button>
                <Button>清除Todo</Button>
            </div>
            <div>{store && store.total}</div>
            <div>
                {store &&
                    store.todos.map((ele, index) => {
                        return <div>{ele}</div>;
                    })}
            </div>
        </div>
    );
});

export default Todos;
```

5、当然，第三步可以不引入 store 传值子组件，而可以直接在第四步中引入，效果是一样的，只是引入的时机不同而已。

## 发现类型检测的问题

在测试 mobx-react-lite 插件功能的过程中，在第三步组件传值的中一直报错，具体内容如下：

```shell
Type 'Todo' is not assignable to type 'StoreItems'.
Types of property 'total' are incompatible.
Type 'number' is not assignable to type 'Function'.  TS2322
```

其实具体的解法应该考虑定义接口处处理的有问题，首先是`Type 'number' is not assignable to type 'Function'.`这句话导致上层 StoreItems 无法使用。经过排查问题得出结果是定义接口有问题，取值函数 total 应该是 number 类型而不是 Function 类型。

```ts
import {makeAutoObservable} from 'mobx';

class Todo {
    constructor() {
        makeAutoObservable(this);
    }
    public todos: string[] = [];

    addTodos(todo: string) {
        this.todos.push(todo);
    }

    // 这里是类的一个取值函数，使用方法应该是实例上的一个属性而不是一个方法，所以在定义类型的时候此处应该是一个number类型而不是Function类型。
    get total(): number {
        return this.todos.length;
    }
}

export default new Todo();
```

## 写在结尾的话

1. ts的类型校验还是要多学习，以及报错解决方案的积累；
2. mobx的使用很简单，但是后续还需要研究一下其实现原理；

参考文档：

https://cn.mobx.js.org/faq/faq.html
