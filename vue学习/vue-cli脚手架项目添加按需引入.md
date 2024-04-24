# vue-cli4 脚手架项目按需引入 element-ui

## 安装插件 babel-plugin-component 到开发依赖

```shell
yarn add babel-plugin-component -D
```

## 在根目录下的 babel.config.js 引用插件

```js
module.exports = {
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk',
            },
        ],
    ],
};
```

## 在主应用入口按需引入

```ts
import {Row, Col, Checkbox, CheckboxGroup, Button} from 'element-ui';

// 注意：不需要引入CSS，插件已经帮忙做了这个事情。

Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Button);
```
