# sass-loader 版本问题记录

## 故事背景

由一个项目导致的问题，项目中样式有使用/deep/来修改 UI 组件的样式，但是由别的同事在 clone 代码并且 install 依赖包之后出现了编译错误。具体的原因是因为高版本的 sass-loader 已经不支持了对于/deep/写法的编译，但是可以使用推荐的 v-deep 写法来做穿透。但是问题是当前项目已经有很多文件写了/deep/穿透，因此全量替换会可能出现未知的问题（其实替换后就是出了问题）。基于以上问题，需要考虑别的兼容方案。

## 解决问题

这个编译问题很有意思的是一个同事编译成功，但是另外一个同事是编译失败了，那么极有可能是因为依赖包的版本导致的。于是在网上搜索了 sass-loader 的版本问题，发现 6.0.7 版本的 sass-loader 是可以支持编译/deep/穿透的，于是就做了版本降级处理。删除当前版本 8.0.2，固化低版本 6.0.7。

但是：还是出问题了，降级之后编译出现不识别 style 变量的问题，经过排查之后发现原来项目中 sass 的变量是全局引入的，这样可以在各个组件引用 sass 变量。但是低版本对于此操作的设置略有不同，具体的区别如下：

```js
// 根目录下vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                // 注意：在 sass-loader v7 中，这个选项名是 "data"，但是8.0以上版本是 “prependData”
                data: '@import "src/styles/variables.scss";', // 8.0以下
                // prependData: '@import "src/styles/variables.scss";', // 8.0以上
            },
        },
    },
};
```

修改之后即可编译成功。

## npm、cnpm、yarn 版本控制

会出现此问题无非是安装的依赖包不同导致的，那么看下 npm 是如何安装依赖包的？npm 通过读取 package.json 文件来安装相关的依赖包，具体规则如下：

```json
// 以react为例
"react": "17.0.1", // 固化当前版本
"react": "^17.0.1", // 安装17.X.X的最新版
"react": "~17.0.1", // 安装 17.0.X的最新版
"react": "*17.0.1", // 安装最新版
```

### npm vs cnpm

npm 是包管理工具，而 cnpm 是国内的镜像，每 10 分钟同步一次 npm。

### npm vs yarn

yarn 是新推出的一款新的包管理工具，也是为了弥补 npm 的一些缺陷而生的。

yarn 弥补了 npm 缺陷，具有速度快、版本统一、单一源的优势。

建议安装包都是用 yarn 来安装，效率高速度快。

### yarn.lock

文件会锁定你安装的每个依赖项的版本，这可以确保你不会意外获得不良依赖，避免由于开发人员意外更改或则更新版本，而导致糟糕的情况！
