# qiankun 初步实践

## 微前端的应用场景

### 什么是微前端？

==微前端是一种类似于微服务的架构，它将微服务的理念应用于浏览器端，即将 web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。各个前端应用可以独立运行、独立开发、独立部署。微前端不是单纯的前端框架或者工具，而是一套架构体系。==

### why 微前端

1、==整合历史系统==：公司业务会存在很多历史遗留的项目，它们有可能还正在运行，而且有可能采用的框架也不一致。我们开发者对于老的系统不一定要花费时间去重构，这样毕竟成本会很大。微前端的功能就是将这些老旧的项目和新的业务整合，在不改变原有代码逻辑的基础上兼容新旧系统。

2、==拆分以及细化==：在当下的前端环境，单页应用是普遍的项目形态，但是一个系统如果随着时间的推移逐渐丰富和完善，那么单页将会变得越来越庞大和难以维护。微前端的出现可以将这些庞大的应用进行拆分，降低耦合，这样维护成本会大大降低。

### 目前微前端的方案有哪些？

| 方案 | 描述 | 优点 | 缺点 |
| :-- | :-- | :-- | :-- |
| Nginx 路由转发 | Nginx 配置反向代理 | 简单，快捷 | 切换应用会重新加载，刷新页面，用户体验较差 |
| IFrame 嵌套 | 父应用是一个页面，每个子应用是一个嵌套的 iframe，可以使用 postMessage 或者 contentWindow 方式进行通讯 | 实现简单，子应用之间互相不影响 | iframe 的显示样式、兼容性有局限性 |
| Web Components | 每个子应用需要采用纯 Web Components 技术编写组件 | 每个子应用有独立的 script 和 css，也可以单独部署 | 对于历史系统改造成本高，子应用通信较为复杂  且易踩坑 |
| 组合式应用路由分发 | 每个子应用独立构建和部署，运行时由父应用来进行路由管理，应用加载，启动，卸载，以及通信机制 | 纯前端改造，体验良好，可无感知切换，子应用相互隔离 | 需要设计和开发，由于父子应用处于同一页面运行，需要解决子应用的样式冲突，变量对象污染，通信机制等技术点 |

上述方案中，每种都有自己的优劣，最原始的 Nginx 配置反向代理是从接入层的角度来将系统进行分离，但是需要运维配置，而 iframe 嵌套是最简单和最快速的方案，但是 iframe 的弊端也是无法避免的，而 Web Components 的方案则需要大量的改造成本，最后的组合式应用路由分发方案改造成本中等并且能满足大部分需求，也不影响各前端应用的体验，是当下各个业务普遍采用的一种方案，本文后面的内容也是主要基于这种方案进行阐述。

作者：吕小鸣  
链接：<https://juejin.cn/post/6844904162509979662>

### 组合式应用路由方案

![image](https://user-gold-cdn.xitu.io/2020/5/15/1721766ee9a543cf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

简单描述下就是基座应用中有一些菜单项，点击每个菜单项可以展示对应的微应用，这些应用的切换是纯前端无感知的，所以，基于目前的方案来说，一个微前端的基座框架需要解决以下问题：

1. 路由切换的分发问题。
1. 主微应用的隔离问题。
1. 通信问题。

#### 微前端路由分发

作为微前端的基座应用，是整个应用的入，负责承载当前微应用的展示和对其他路由微应用的转发，对于当前微应用的展示，一般由一下几步构成：

1、作为一个SPA的基座应用，本身是一套纯前端项目，要想展示微应用的页面除了采用iframe之外，要能先拉取到微应用的页面内容， 这就需要远程拉取机制。

2、远程拉取机制通常会采用fetch API来首先获取到微应用的HTML内容，然后通过解析将微应用的JavaScript和CSS进行抽离，采用eval方法来运行JavaScript，并将CSS和HTML内容append到基座应用中留给微应用的展示区域，当微应用切换走时，同步卸载这些内容，这就构成的当前应用的展示流程。

#### 微前端的应用隔离

应用隔离问题主要分为主应用和微应用，微应用和微应用之间的JavaScript执行环境隔离，CSS样式隔离，我们先来说下CSS的隔离。

==CSS隔离==：当主应用和微应用同屏渲染时，就可能会有一些样式会相互污染，如果要彻底隔离CSS污染，可以采用CSS Module 或者命名空间的方式，给每个微应用模块以特定前缀，即可保证不会互相干扰，可以采用webpack的postcss插件，在打包时添加特定的前缀。
而对于微应用与微应用之间的CSS隔离就非常简单，在每次应用加载时，将该应用所有的link和style 内容进行标记。在应用卸载后，同步卸载页面上对应的link和style即可。

==JavaScript隔离==：每当微应用的JavaScript被加载并运行时，它的核心实际上是对全局对象Window的修改以及一些全局事件的改变，例如jQuery这个js运行后，会在Window上挂载一个window.$对象，对于其他库React，Vue也不例外。为此，需要在加载和卸载每个微应用的同时，尽可能消除这种冲突和影响，最普遍的做法是采用沙箱机制（SandBox）。

沙箱机制的核心是让局部的JavaScript运行时，对外部对象的访问和修改处在可控的范围内，即无论内部怎么运行，都不会影响外部的对象。通常在Node.js端可以采用vm模块，而对于浏览器，则需要结合with关键字和window.Proxy对象来实现浏览器端的沙箱。

## qiankun 相关 API

## 主应用添加 qiankun

### 安装 qiankun

```shell
yarn add qiankun # 或者 npm i qiankun -S
```

### 1、在主入口注入 qiankun 微应用内容

在这里可以考虑分拆 qiankun 的内容。具体操作如下

```ts
// 主应用入口文件
import {registerMicroApps, start, setDefaultMountApp} from 'qiankun';
import microApps from './microApps';

registerMicroApps(microApps);

// 设置主应用启动后默认进入的微应用。
setDefaultMountApp('/base');

// 启动qiankun
start();
```

### 2、拆分子应用配置文件

```ts
// microApps.ts文件
const microApps = [
    {
        name: '主应用', // 随便填写的name
        entry: '//localhost:9000', // 引用微应用的地址
        activeRule: '/base', // path
    },
];

const apps = microApps.map((item) => {
    return {
        ...item,
        container: '#sub-root', // 子应用挂载的div
        props: {
            routerBase: item.activeRule, // 下发基础路由
        },
    };
});

export default apps;
```

### 3、添加子应用加载容器

```tsx
import React from 'react';
import Header from 'Components/Header';
import './App.scss';

interface IProps {
    name: string;
    age: number;
}

function App(props: IProps) {
    const {name, age} = props;
    return (
        <div className='app'>
            <Header />
            <span> {`Hello! I'm ${name}, ${age} yearssss old.`}</span>
            {/* 重要：这里需要配合添加一个容器，以便子应用有加载的地方。 */}
            <div id='sub-root' />
        </div>
    );
}

export default App;
```

### 4、注意：因为微应用需要开启 history 路由模式，因此需要在 webpack 的 devServer 下配置一下重定向

```js
// 配置webpack的开发模式
output: {
    ...
    publicPath: '/', // 这里需要设置一下全局的地址
},
devServer: {
    ...
    // history模式下的重定向 https://webpack.docschina.org/configuration/dev-server/#devserverhistoryapifallback
    historyApiFallback: true,
},
```

## 子应用支持 qiankun

### 1、主入口文件添加配置

```ts
import './public-path';

declare global {
    interface Window {
        __POWERED_BY_QIANKUN__: boolean;
    }
}

function render() {
    ReactDOM.render(<App />, document.querySelector('#root'));
}

// 这里考虑的就是如果当前项目没有装载qiankun中，那么就直接渲染就成了，否则的话需要在qiankun的回调那里做渲染。
// eslint-disable-next-line no-underscore-dangle
if (window && !window.__POWERED_BY_QIANKUN__) {
    render();
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
    console.log('react app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
    render();
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
    const dom = document.querySelector('#root');
    if (dom) {
        ReactDOM.unmountComponentAtNode(dom);
    }
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
    console.log('update props', props);
}
```

### 2、项目目录添加全局 path

```ts
declare global {
    interface Window {
        __INJECTED_PUBLIC_PATH_BY_QIANKUN__: any;
    }
}

if (window && window.__POWERED_BY_QIANKUN__) {
    // 这里其实可以自己定义，根据不同的环境设置不同的地址
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;

    // 下面这个是根据业务来进行定义的
    if (process.env.NODE_ENV === 'production') {
        __webpack_public_path__ =
            process.env.MODE === '' ? '//ait.weiyun.baidu.com/chart/' : '//ait.dev.weiyun.baidu.com/chart/';
    } else {
        __webpack_public_path__ = 'http://localhost:9421/';
    }
}
```

### 3、修改 webpack 配置文件的 output 内容

```js
// 查询文档 https://webpack.docschina.org/configuration/output/#outputlibrarytarget
output: {
    library: `${name}-[name]`,  // 这里取得是package.json文件中的name
    libraryTarget: 'umd', // 可以查看文档umd的作用
    globalObject: 'window',
},
```

## 添加主应用和子应用之间的通信

### 主应用添加通信

#### 在应用的 entry 入口添加如下代码

```ts
// 引用通信API
import {initGlobalState, MicroAppStateActions} from 'qiankun';

// 初始化状态值
const initialState = {
    user: {
        name: '我的名字叫做张三',
    },
};

// 初始化 state
const actions: MicroAppStateActions = initGlobalState(initialState);

// 子应用向主应用发送消息的回调
actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('主应用接收数据', state, prev);
});

// 模拟向子应用发送数据
setTimeout(() => {
    actions.setGlobalState(initialState);
}, 2000);
```

### 子应用添加通信

#### 在应用的 entry 入口添加通信

```ts
export async function mount(props: any) {
    // 通过在mount函数的参数中，可以监听主应用的状态变化，以及做相应的操作。
    props.onGlobalStateChange((state: any, prev: any) => {
        console.log('子应用的值', state, prev);
    });
    render(props);
}
```

### 第二种方法，父应用添加 props

```js
const isDevelopment = process.env.NODE_ENV !== 'production';
const host = isDevelopment ? '//localhost:9421' : '//ait.dev.weiyun.baidu.com';
const microApps = [
    {
        name: '我的审批',
        entry: `${host}/chart/process/approve`,
        activeRule: '/base/chart/process/approve',
        props: {
            processType: 'approve',
        },
    },
    {
        name: '我的流程',
        entry: `${host}/chart/process/initiate`,
        activeRule: '/base/chart/process/initiate',
        props: {
            processType: 'initiate',
        },
    },
    {
        name: '软件合规统计',
        entry: `${host}/chart/home`,
        activeRule: '/base/chart/home',
    },
];

const apps = microApps.map((item) => {
    return {
        ...item,
        container: '#sub-root', // 子应用挂载的div
        props: {
            routerBase: item.activeRule, // 下发基础路由
            params: item.props || {}, // 可以在这里把需要的props传递到子应用
        },
    };
});

export default apps;
```

## 遇到的问题

### 1、webpack-dev-server 版本升级问题

因为子应用在加载过程中会出现`Application died in status LOADING_SOURCE_CODE: You need to export the functional lifecycles in xxx entry`这个问题，所以被迫升级了版本到 4.0.0 以适配 webpack5。升级之后出现了 devServer 的部分配置失效，原因是新版本对某些配置项不再支持或者改成别的使用方式，所以需要查看升级说明文档以适应新的版本。

<https://github.com/umijs/qiankun/issues/1092>

### 2、在配置过程中出现子应用资源加载路径 404 问题

出现的原因还是因为没有配置好，子应用有一个 public-path 配置的过程，其主要作用就是为了能够注入全局的 public-path

### 3、为什么会出现跨域问题

因为主应用在请求子应用的时候是通过 fetch 请求的，所以会出现跨域的问题，因此在开发和部署的时候都需要去支持跨域。

### 4、本地模拟部署，出现 png 资源不加载的问题

问题产生原因，主应用引入子应用的时候，子应用中 css 是以相对路径引用的图片资源。这样会出现一个问题就是这些被引用的资源会使用主应用的 IP 加端口号，因此无法引入资源。

目前的解决方案是在打包的时候将 publicPath 修改成绝对的线上路径，这样加载的文件就可以访问自己的域名下的资源。但是如果是同域下的资源（域名端口相同，资源地址目录不同）就不会出现此问题。

### 5、本地调试问题

#### 本地无法加载子应用

本地调试无法加载子应用调试确实费时间，最后修改主应用的注册文件如下：

```js
// 主应用的注册路由文件
const isDevelopment = process.env.NODE_ENV !== 'production';
const host = isDevelopment ? '//localhost:9421' : '//ait.dev.weiyun.baidu.com';
const microApps = [
    {
        name: '我的审批',
        // 这里设置了路径entry和activeRule保持一致，不然无法加载（貌似路径要一致的时候子应用才能在mount函数内执行）。
        entry: `${host}/chart/process/approve`,
        activeRule: '/base/chart/process/approve',
        props: {
            processType: 'approve',
        },
    },
    {
        name: '我的流程',
        entry: `${host}/chart/process/initiate`,
        activeRule: '/base/chart/process/initiate',
        props: {
            processType: 'initiate',
        },
    },
    {
        name: '软件合规统计',
        entry: `${host}/chart/home`,
        activeRule: '/base/chart/home',
    },
];
```

```js
// 子应用的render函数，可以看到被qiankun控制下，修改basename为'/base/chart'。
function render(props: any = {}) {
    const basename = window && !window.__POWERED_BY_QIANKUN__ ? '/chart' : '/base/chart';
    ReactDOM.render(<App basename={basename} parentProps={props} />, document.querySelector('#root'));
}
```

### 6、qiankun 注入全局 public——path 的问题

```js
// 目前这个状态是最终的写法，根据开发环境以及生产环境的不同设置webpack的public_path
if (window && window.__POWERED_BY_QIANKUN__) {
    if (process.env.NODE_ENV === 'production') {
        __webpack_public_path__ =
            process.env.MODE === '' ? '//ait.weiyun.baidu.com/chart/' : '//ait.dev.weiyun.baidu.com/chart/';
    } else {
        __webpack_public_path__ = 'http://localhost:9421/';
    }
}
```

### 7、父子应用传值的问题

在子应用使用`onGlobalStateChange`监听传值的时候，发现刚初始化的时候监听不到数据，当时给父应用的`setGlobalState`添加了定时器才会有值。这个问题发生还是因为没有认真看文档：onGlobalStateChange 接受两个参数一个是`callback`用于处理数据变化，一个是`fireImmediately`用于设置是否立即触发状态监听。

## 参考文档

qiankun 官方网站 <https://qiankun.umijs.org/zh/guide/getting-started>
