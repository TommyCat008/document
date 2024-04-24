const compileUtil = {
    getVal(expr, vm) {
        // 这么写就很666，累加计算得到对象的值 
        return expr.split('.').reduce((data, currentVal) => {
            // console.log(data, currentVal);
            return data[currentVal];
        }, vm.$data)
    },

    setVal(expr, vm, inputValue) {
        /**
         * person: {
         *     name: ''
         * }
         */
        return expr.split('.').reduce((data, currentVal, index, arr) => {
            if (arr.length - 1 === index) {
                data[currentVal] = inputValue;
            }
            return data[currentVal]
        }, vm.$data)
    },

    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
    },

    text(node, expr, vm) {
        let value;
        if (/\{\{(.+?)\}\}/.test(expr)) {
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                // 打印args可以知道第二个元素就是匹配到的{{}}中的内容
                // console.log(args)
                new Watcher(vm, args[1], (newVal) => {
                    this.updater.textUpdater(node, this.getContentVal(expr, vm));
                })
                return this.getVal(args[1], vm)
            })
        } else {
            value = this.getVal(expr, vm);
        }
        this.updater.textUpdater(node, value);
    },

    html(node, expr, vm) {
        const value = this.getVal(expr, vm);
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal);
        })
        this.updater.htmlUpdater(node, value);
    },

    model(node, expr, vm) {
        const value = this.getVal(expr, vm);
        // 绑定更新函数
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, newVal);
        })

        // 视图更新数据
        node.addEventListener('input', e => {
            // 修改值
            this.setVal(expr, vm, e.target.value)
        }, false)
        this.updater.modelUpdater(node, value);
    },

    on(node, expr, vm, eventName) {
        const fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName, fn.bind(vm), false)
    },

    bind(node, expr, vm, attrName) {
        const value = this.getVal(expr, vm);
        new Watcher(vm, expr, (newVal) => {
            this.updater.attrUpdater(node, attrName, newVal);
        })
        this.updater.attrUpdater(node, attrName, value);
    },

    updater: {
        attrUpdater(node, attrName, value) {
            node.setAttribute(attrName, value);
        },

        modelUpdater(node, value) {
            node.value = value
        },

        htmlUpdater(node, value) {
            // html赋值
            node.innerHTML = value;
        },

        textUpdater(node, value) {
            // 设置节点文本内容
            node.textContent = value;
        }
    }
}

class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 1、获取文档碎片对象，放入内存中会减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el);

        // 2、编译模板
        this.compile(fragment);

        // 3、追加子元素到根节点
        this.el.appendChild(fragment);
    }

    compile(fragment) {
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                // console.log('元素节点', child);
                this.compileElement(child);
            } else {
                // console.log('文本节点', child);
                this.compileText(child);
            }

            // 递归子节点内容
            if (child.childNodes && child.childNodes.length) {
                this.compile(child);
            }
        })
    }

    // 编译元素节点
    compileElement(node) {
        // <div v-text="msg"></div> 
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            const { name, value } = attr;
            if (this.isDirective(name)) { // 指令 v-text v-html v-model v-on:click
                const [, directive] = name.split('-'); // 拿到text、html、model、on:click
                /**
                 *  更新数据，   数据驱动视图
                 *  dirName : text, html, model, on
                 *  eventName: click
                 */
                const [dirName, eventName] = directive.split(':');
                compileUtil[dirName](node, value, this.vm, eventName);
                // 删除有指令的标签上的属性
                node.removeAttribute('v-' + directive);
            } else if (this.isEventName(name)) { // 判断@click开头的
                const [, eventName] = name.split('@');
                compileUtil['on'](node, value, this.vm, eventName);
            }
        })
    }

    // 编译文本节点
    compileText(node) {
        // 处理 {{}} 中对应的属性
        const content = node.textContent;

        // 先过滤content中含有{{}}的节点
        if (/\{\{(.+?)\}\}/.test(content)) {
            compileUtil['text'](node, content, this.vm);
        }
    }

    node2Fragment(el) {
        // 创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild;
        // 这里为什么能够循环，在调试过程中发现文档碎片会搜集el的所有子节点，类似一种剪切的功能，取走之后el就没有了这个节点
        // 所以就能实现循环功能
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild)

        }
        return f;
    }

    isEventName(attrName) {
        return attrName.startsWith('@')
    }

    isDirective(attrName) {
        return attrName.startsWith('v-')
    }

    isElementNode(node) {
        // 如果节点是元素节点返回1，如果是属性节点返回2
        return node.nodeType === 1
    }
}