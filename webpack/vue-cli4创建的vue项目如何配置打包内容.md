# cli4 版本的脚手架打包配置相关

## 故事背景

因为 vue-cli4 版本的脚手架默认封装了 webpack 的配置内容，所以一般配置即可满足大部分的开发需求所以也并未考虑这个事情，但是开发者还是需要知道这个配置是如何来做的。

## 如何配置自定义 webpack 的内容

> 通过查询官方文档得出相关的操作还是需要在 vue.config.js 中配置相关内容，具体的内容如下所示。

### 简单的配置方式

```js
// vue.config.js
module.exports = {
    configureWebpack: {
        plugins: [new MyAwesomeWebpackPlugin()],
    },
};
```

> configureWebpack 的配置内容会被`webpack-merge`插件合入到最终的 webpack 的配置项中

### 函数回调式配置项

> 如果 configureWebpack 的值是对象但不能满足配置需求的时候，可以将其换成一个函数（函数会在环境变量被设置之后懒执行）。函数的第一个参数是已经解析好的配置，具体代码如下：

```js
// vue.config.js
module.exports = {
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
};
```

### 链式操作

> vue cli 内部的 webpack 配置是通过`webpack-chain`维护的，这个库可以定义具名的 loader 规则和具名 plugin，并且有机会在后期进入这些规则并对选项进行修改，具体的代码如下：

#### 修改 loader 选项

```js
// vue.config.js
module.exports = {
    chainWebpack: (config) => {
        // 例如使用loader去解析vue文件的操作如下
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap((options) => {
                // 修改它的选项...
                return options;
            });
    },
};
```

> #### 提示
>
> 对于 CSS 相关 loader 来说，推荐使用 css.loaderOptions 而不是直接链式指定 loader。这是因为每种 CSS 文件类型都有多个规则，而 css.loaderOptions 可以确保你通过一个地方影响所有的规则。

具体的代码如下：

```js
// 此demo演示了如何引入全局的变量
// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
                additionalData: `@import "~@/variables.sass"`,
            },
            // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
            // 因为 `scss` 语法在内部也是由 sass-loader 处理的
            // 但是在配置 `prependData` 选项的时候
            // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
            // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
            scss: {
                additionalData: `@import "~@/variables.scss";`,
            },
            // 给 less-loader 传递 Less.js 相关选项
            less: {
                // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
                // `primary` is global variables fields name
                globalVars: {
                    primary: '#fff',
                },
            },
        },
    },
};
```

```js
// 这个例子描述使用css的自定义生成的名字
// vue.config.js
module.exports = {
    css: {
        // 支持去掉`.module`的方式引入文件
        requireModuleExtension: false,
    },
    loaderOptions: {
        css: {
            // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
            // Vue CLI v3 用户可参考 css-loader v1 文档
            // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
            modules: {
                localIdentName: '[name]-[hash]',
            },
            localsConvention: 'camelCaseOnly',
        },
    },
};
```

#### 添加一个新的 loader

```js
// vue.config.js
module.exports = {
    chainWebpack: (config) => {
        // GraphQL Loader
        config.module
            .rule('graphql')
            .test(/\.graphql$/)
            .use('graphql-tag/loader')
            .loader('graphql-tag/loader')
            .end()
            // 你还可以再添加一个 loader
            .use('other-loader')
            .loader('other-loader')
            .end();
    },
};
```

#### 替换一个规则里的 Loader

```js
// vue.config.js
module.exports = {
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');

        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear();

        // 添加要替换的 loader
        svgRule.use('vue-svg-loader').loader('vue-svg-loader');
    },
};
```

参考文档：

<https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F>
