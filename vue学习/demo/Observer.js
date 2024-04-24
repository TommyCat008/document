class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldVal = this.getOldVal();
    }

    getOldVal() {
        // 这里会很迷惑，为什么要先挂载Dep？
        console.log('注册watcher', this.expr)
        Dep.target = this;
        let oldVal = compileUtil.getVal(this.expr, this.vm);
        Dep.target = null;
        return oldVal;
    }

    update() {
        let newVal = compileUtil.getVal(this.expr, this.vm);
        if (newVal !== this.oldVal) {
            this.cb(newVal);
        }
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }

    // 收集观察者
    addSub(watcher) {
        this.subs.push(watcher);
        console.log(this.subs)
    }

    notify() {
        this.subs.forEach(w => {
            w.update();
        })
    }
}

class Observer {
    constructor(data) {
        this.observe(data)
    }

    observe(data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key]);
            })
        }
    }

    defineReactive(obj, key, value) {
        // 递归遍历children
        this.observe(value);
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 订阅数据发生变化时候，在Dep中添加观察者
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set: newVal => {
                /**
                 * TODO: 这里有一个疑问，就是需要重新观测数据，但是需要理解一下。
                 */
                this.observe(newVal);
                if (newVal !== value) {
                    value = newVal;
                    // 告诉Dep，通知变化
                    dep.notify();
                }
            }
        })
    }
}