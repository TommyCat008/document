# 认识 Composition Api

## Vue2 中的 Option Api

在 vue2 中标准的写法大致如下，有标准的生命周期钩子、响应式对象、子组件、计算属性等。这样的结构就被称之为 Option Api，这样的写法确实很简单，我们只需要关注业务然后在这个 template 中添加对应的逻辑即可。

```js
export default {
    components: {

    },
    data() {
        return {
            ...
        }
    },
    watch: {

    },
    methods: {

    },
    created() {

    },
    mounted() {

    }
}
```

### 有什么弊端？

同样的，弊端也是很明显的，比如一个 template 中要处理很多的业务逻辑（比如说多个表单处理在一个页面），那么我们就需要在这里加入很多的代码而且不同逻辑的代码容易交叉错乱，这样就导致了文件整体很臃肿并且长时间后再看这里的代码就变得很难梳理和维护。

### 有弥补方案吗？

#### 加入子组件

我们可以以拆分成子组件的方式来减少臃肿讲很多的逻辑放入到子组件中，但是有会有如下的一些遗憾：

1、太多的传值和回调写在子组件上，导致子组件要多写代码处理；

2、如果兄弟组件需要互相交互，那逻辑就更复杂了。

#### 引入 mixin

mixin 的引入是为了抽离相同的逻辑从而实现逻辑的复用，但是也会有如下的问题：

1、命名覆盖，相同命名的可能会被覆盖掉，除非你用工厂模式；

2、含蓄的属性增加，在他人维护的过程中，会疑惑于为何会莫名出现未定义的属性，并且还是可用的。

## Vue3 的新用法

Composition Function 允许你将相同逻辑的代码写在一个函数中，这样可以避免逻辑混乱减少耦合。

举个例子：

```ts
import {queryAverageScore, queryPercentScore} from '@/apis/vip';
import {IChartResultProps} from '@/utils/interfaces';
import {ElMessage} from 'element-plus';
import {reactive, Ref, toRefs} from 'vue';

export default (): {
    state: {
        averageScoreData: IChartResultProps[];
        goodScoreData: IChartResultProps[];
        badScoreData: IChartResultProps[];
    };
    averageScoreData: Ref<IChartResultProps[]>;
    _queryAverageScore: (times: number[]) => Promise<void>;
    _queryPercentScore: (times: number[]) => Promise<void>;
} => {
    const state = reactive({
        averageScoreData: [] as IChartResultProps[],
        goodScoreData: [] as IChartResultProps[],
        badScoreData: [] as IChartResultProps[],
    });

    // 获取平均分
    const _queryAverageScore = async (times: number[]) => {};

    // 获取分位趋势
    const _queryPercentScore = async (times: number[]) => {};

    return {
        state,
        _queryAverageScore,
        _queryPercentScore,
    };
};
```

```ts
import useHook from './useHook';

export default defineComponent({
    setup() {
        // 使用hook
        const {averageScoreData, goodScoreData, badScoreData} = useHook();

        return {averageScoreData, goodScoreData, badScoreData};
    },
});
```

看着是不是清爽了很多，通过引用 hook 的方式来注入到主逻辑中，而 hook 内部处理单一逻辑内容，减少耦合。
