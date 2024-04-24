# 为什么 vue2 中 this 能访问 data 和 methods?

## data 是如何绑定的？

> 首先先看一下 vue2 的代码

```js
const vm = new Vue({
    data: {
        name: '我是张三',
    },
    methods: {
        sayName() {
            console.log(this.name);
        },
    },
});

console.log(vm.name); // 我是张三
console.log(vm.sayName()); // 我是张三
```

> 那么我们实现这个类似的构造函数应该如何实现呢？

```js
function Person(options) {
    ...
}

const person = new Person({
    data: {
        name: '我是张三',
    },
    methods: {
        sayName() {
            console.log(this.name);
        },
    },
})

console.log(p.name, p.sayName());
```

> 根据需求我们可以通过事件委托(bind)来将事件绑定到实例上面，而对于 data 的属性，可以通过 Object.defineProperty 来进行事件绑定。

```js

    proxyData(data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(newVal) {
                    data[key] = newVal;
                }
            })
        }
    }
```

参考文章：

<https://mp.weixin.qq.com/s/VIVEirWTMepL8-2uat-aOg>
