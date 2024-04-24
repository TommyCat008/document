# vue3 的新用法

前言：目前在使用 vue3 来写新的项目，因为是第一次使用这个 vue3，所以有很多不熟练的地方，所以写下这个文章来加深一下自己的印象。

## setup 的使用？

`setup`是 vue3 的新的 API，官方的解释是作为一个组件选项，在创建组件之前执行。

setup 接受两个参数，`props`和`context`两个参数，前者是用来接收父组件的传值。后者是一个普通的 JavaScript 对象(非响应式)，它暴露组件的三个属性`attrs`、`slots`、`emit`。

### 生命周期的更新

`beforeCreate` -> `使用 setup()`

`created` -> `使用 setup()`

`beforeMount` -> `onBeforeMount`

`mounted` -> `onMounted`

`beforeUpdate` -> `onBeforeUpdate`

`updated` -> `onUpdated`

`beforeUnmount` -> `onBeforeUnmount`

`unmounted` -> `onUnmounted`

`errorCaptured` -> `onErrorCaptured`

`renderTracked` -> `onRenderTracked`

`renderTriggered` -> `onRenderTriggered`

`activated` -> `onActivated`

`deactivated` -> `onDeactivated`

### props 的解构

`因为props是使用proxy来代理的，所以不能进行解构，需要使用vue的toRefs来完成属性的解构`

eg:

```ts
import {toRefs} from 'vue';

// 还是要声明props的具体属性的，不然解构个寂寞。
props: {
    title: String
},

setup(props) {
    const { title } = toRefs(props)

    console.log(title.value)
}
```

当前，如果传的值是可选的话，toRefs 是不会解构出来的，这个时候需要用到`toRef`来做替代：

```ts
import { toRef } from 'vue'

props: {
    title?: String // 这样设置可选项？
},

setup(props) {
    const title = toRef(props, 'title')

    console.log(title.value)
}
```

### 官方的万金油类型声明示例

```ts
interface Data {
    [key: string]: unknown;
}

interface SetupContext {
    attrs: Data;
    slots: Slots;
    emit: (event: string, ...args: unknown[]) => void;
}

function setup(props: Data, context: SetupContext): Data;
```

## 如何创建响应式 data？

vue3 新增了`ref`和`reactive`来创建响应式对象。

### ref

接受一个内部值并返回一个响应式且可变的`ref`对象，ref 对象具有指向内部值的 property 的`.value`

eg：

```ts
const num = ref(0);

console.log(num.value); // 0

num.value = 6; // 赋值操作

console.log(num.value); // 6 取值
```

有的时候可能需要指定复杂的类型，那么就可以在定义的时候传值一个泛型参数，操作如下：

```ts
const foo = ref<string | number>('foo'); // foo 的类型：Ref<string | number>

foo.value = 123; // ok!
```

## watch 以及 watchEffect 的区别？在什么时候用更好？

### watch

官方文档上`watch` API 与选项式 API`this.$watch`完全等效，watch 需要监听特定的数据源，并且在单独的回调函数中执行副作用（我理解副作用也就是自己的业务逻辑）。默认情况下，watch 是惰性的--即回调仅仅在监听的数据源发生更改的时候被调用。

#### watch 监听一个数据源

```ts
// 侦听一个 getter，官方给的例子，目前未遇到使用场景。看到router监听params有用到。
const state = reactive({count: 0});
watch(
    () => state.count,
    (count, prevCount) => {
        /* ... */
    }
);

// 直接侦听一个 ref
const count = ref(0);
watch(count, (count, prevCount) => {
    /* ... */
});
```

#### watch 监听多个数据源

```ts
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
});
```

### watchEffect

官方解释：响应式的跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。

我是没有看懂，首先依赖项来源在哪里，如何标记依赖项？其次在依赖项有更改的时候重新运行，那么多个依赖项在更改都会重新运行吗？

#### 先看下官方给的例子

```ts
// 首先创建一个响应式数据源
const count = ref(0);

// 立即执行一次，此时肯定打印的是0.
watchEffect(() => console.log(count.value));

setTimeout(() => {
    // 数据变化的时候也会执行一次
    count.value++;
}, 100);
```

#### 自己测试的一个例子

```ts
const count = ref(0);
const num = ref(8);

watchEffect(() => {
    console.log(count.value);
    console.log(num.value);
});

setTimeout(() => {
    count.value++;
}, 1000);
setTimeout(() => {
    num.value++;
}, 1000);
```

先看下结果：

==第一次打印==：0，8  
==第二次打印==：1， 8， 1，9（1s 以后打印四个）

解释：第一次打印是 watchEffect 的特性，它会立即执行一次，所以这里会打印两个数据源的初始值。第二次打印四个是因为两个数据源都进行了赋值操作，count 在累加之后值有变动触发了一次`副作用`，同理 num 的值有变化的时候也出发了一次副作用。

#### 假设只打印 count 会发生什么事情

```ts
const count = ref(0);
const num = ref(8);

watchEffect(() => {
    console.log(count.value);
});

setTimeout(() => {
    count.value++;
}, 1000);

setTimeout(() => {
    num.value++;
}, 1000);
```

==第一次打印==： 0  
==第二次打印==： 1

解释：这个就很明显了，这个依赖项的来源就是只有写在 watchEffect 中才会产生副作用.

:muscle: 这节很大，你忍一下

#### 多个数据源对数据的影响

直接看下面的代码

```ts
const count = ref(0);
const num = ref(8);

watchEffect(() => {
    console.log(count.value);
    num.value++;
});

setTimeout(() => {
    count.value++;
}, 1000);

setTimeout(() => {
    num.value++;
}, 1000);

setTimeout(() => {
    console.log(num.value);
}, 4000);
```

==第一次==：0 也就是初始化的时候打印的内容  
==第二次==：1 1 两次 timeout 在 1s 以后同时打印出 count 的值为 1  
==第三次==：12

:question: 为什么会是 12

:bell: 首先明确第三次打印也就是 4s 之后打印的是 num 的值，在初始化的时候因为会执行一次 watchEffect，所以 num 变成了 9，然后 1s 之后 num 的值发生了变化使得 num 又变化了一次变成了 10，同时 num 的值因为定时器也加了一次变成了 11，但是这次仍然触发了副作用所以 num 累加了一次变成了最终的 12.

#### 延伸，如果写的是一个复杂的数据呢？

```ts
const state = reactive({
    count: 0,
    num: 1,
});

watchEffect(() => {
    // 如果是这么写，count或者num变化都会触发副作用
    console.log(state.count);
    console.log(state.num);

    // 如果这么写，只会在开始的时候执行一次，打印state的初始值
    console.log(state);

    // 如果只写这一个，count变化才会打印的
    console.log(state.count);
});

setTimeout(() => {
    state.count++;
}, 1000);

setTimeout(() => {
    state.num++;
}, 1000);
```

### watchEffect 执行的时机？

看了上面之后就会发现，这个 watchEffect 的执行时机就是在其内部写入的数据源在外部（赋值操作不写在 Effect 中，可以参考上面例子 num.value++写在了副作用中但是没有重复执行，这么做事合理的不然会造成无限互相调用的情况。）有发生变化就会触发。

### 最终：这俩的使用时机？

这俩可以按照需求来自行判定，如果涉及到多个对象的变化，并且每次每个变化都要做处理的话可以使用 watchEffect 这个 hook，但是也可以使用 watch 进行多个数据源监听，这两个我认为是没有什么区别的。

## computed 如何使用呢？

首先看下官方给的解释：接受一个 getter 函数，并为从 getter 返回的值返回一个不变的响应式 ref 对象。

官方例子：

```ts
const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

plusOne.value++; // 错误
```

这个例子给出的信息有以下两点：

1. computed 返回的也是一个响应式的对象，你可以通过内置 value 获取它的值；

2. computed 创建的对象是无法主动赋值的，这个跟之前是保持一致的；

### 通过其内置的`get`和`set`来创建可写的 ref 对象

```ts
const count = ref(1);

const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
        count.value = val - 1;
    },
});

// 在赋值的时候可以触发其内部的set函数
plusOne.value = 1;

console.log(count.value); // 0
```

## slot 在 vue3 废弃了，那应该如何使用？

### 快速使用

<!-- 如果想要详细了解一下这个指令可以看下这偏文档 -->

<https://www.cnblogs.com/recode-hyh/p/14544808.html>

## router 如何使用？

因为 vue3 是没有 this，所以就无法使用`this.$router`或者`this.$route`来进行路由操作。所以我们需要新的 API 来满足需求，官方当然能想到这种问题，看下如何实现。

```ts
// 类似react的操作，
import {useRouter, useRoute} from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();

        function pushWithQuery(query) {
            router.push({
                name: 'search',
                query: {
                    ...route.query,
                },
            });
        }
    },
};
```

剩下的其他操作感觉没有什么变化，例如路由守卫，以及懒加载相关的，就不在赘述。

## element plus 如何添加中文的时间选择器？

### 如果是按需加载，会有国际化的问题

```vue
<template>
    <div>
        <el-config-provider :locale="locale">
            <div class="operation-container"></div>
        </el-config-provider>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {ElConfigProvider} from 'element-plus';
import zhCh from 'element-plus/lib/locale/lang/zh-cn';

export default defineComponent({
    name: 'Operation',
    components: {
        [ElConfigProvider.name]: ElConfigProvider,
    },
    setup() {
        let locale = zhCh;

        return {
            locale,
        };
    },
});
</script>
```

## why Composition API？

### 个人觉得优雅的创建响应式 data 的方式

```ts
setup() {
    // 可以把需要的变量都放在这里
    const state = reactive({
        count: 0,
        num: 10
    })

    // toRefs把响应式的对象给解构，这样在template中就可以直接使用count作为数据了。
    return {
        ...toRefs(state)
    }
}
```

## vue 中使用 ts 的类型校验

### 在传参中设置 props 的属性类型

PropType 是 vue3 中新增的内容，可以通过解构 vue 来获取。

```vue
<script lang="ts">
import {defineComponent, reactive, toRefs, PropType, watchEffect, onMounted} from 'vue';
export default defineComponent({
    props: {
        selectTreeItem: {
            type: Object as PropType<BuildingProps>,
            required: true,
        },
    },
});
</script>
```

## vue 中如何使用 vuex 进行状态管理

参考文档：

<https://v3.cn.vuejs.org/api/computed-watch-api.html#computed>

<https://next.router.vuejs.org/zh/guide/advanced/composition-api.html>
