# 升级 Vue-cli

## 第一步升级本地的 vue-cli

```shell
npm install -g @vue/cli@next
OR
yarn global add @vue/cli@next
```

## 第二步升级工程中插件依赖

```shell
vue upgrade --next
```

## 升级体验

整体升级下来，兼容性没有发现有什么不同的，除了 vue.config.js 中有一个配置需要修改路径外，别的都是正常的。
