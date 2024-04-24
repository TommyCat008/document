class Mvue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if (this.$el) {
            // 实现数据的观察者
            new Observer(this.$data);

            // 实现一个编译器
            new Compile(this.$el, this);

            // 代理this.$data，可以直接访问this拿到data里面的值
            this.proxyData(this.$data);
        }
    }

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
}