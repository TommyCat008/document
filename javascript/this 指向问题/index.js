/**
 * 测试 对象方法中 this 的指向问题
 */

var name = '外部的值';
const obj = {
    name: '内部的值',
    fun: function () {
        console.log(this.name);
    },
};

obj.fun(); // 输出 "内部的值"

// 变换一下，注意这块儿代码需要在浏览器中执行，在 node 中执行会 undefined
var name_3 = '外部的值';
var obj1 = {
    name_3: '内部的值',
    fun: function () {
        return function () {
            console.log(this, this.name_3);
        };
    },
};

var _fun = obj1.fun();
_fun(); // 外部的值

// 赋值操作等价于 将 return 的匿名函数返回给 _fun
// _fun 也就等价于变成了一个 具名函数 function _fun() { console.log(this, this.name_3); }

/**
 * 测试 函数内部的 this 指向问题
 */
var name_1 = '外部';
function fun() {
    var name_1 = '内部';
    console.log(this.name_1);
}

fun(); // 输出 "外部"

/**
 * 测试 箭头函数的妙用
 */

var name = 'window';

var A = {
    name: 'A',
    sayHello: function () {
        var s = () => console.log(this.name);
        return s; //返回箭头函数s
    },
};

var sayHello = A.sayHello();
sayHello(); // 输出A

var B = {
    name: 'B',
};

sayHello.call(B); //还是A
sayHello.call(); //还是A

// 为什么 sayHello.call(B) 的结果还是 A 呢？

// 因为在 sayHello 函数被调用时，this 的值由函数的调用方式确定。在这个例子中，sayHello 函数是作为 A 对象的方法定义的，所以当它被调用时，this 被绑定到 A 对象上。
// 即使你使用 call() 方法来改变 this 的指向，它也不会生效。这是因为箭头函数 s 的 this 始终指向其定义时的上下文，而不是调用时的上下文。因此，无论你如何调用 sayHello 函数，s 函数中的 this 始终指向 A 对象。
// 这是箭头函数的一个特性，它们的 this 值在定义时就已经确定，而不会受到调用方式的影响。

// 最后看这篇文章就够用了
// https://www.cnblogs.com/suihung/p/16244584.html
// https://zhuanlan.zhihu.com/p/42145138
