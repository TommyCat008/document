/**
 * 需求：实现一个add函数，并且可以做到如下的事情。
 *
 * 例如： add(1)(2)(3)(4)
 * 输出结果：10
 */

function add(num) {
    function sum(_num) {
        num = num + _num;
        return sum;
    }

    sum.valueOf = function () {
        console.log('valueOf')
        return num;
    };

    sum.toString = function () {
        console.log('toString')
        return num;
    };

    return sum;
}

console.log(+add(1)(2)(3)(4));

// 函数解析

// 函数执行的顺序是从左到右

// 执行第一次add(1)

/**
 * 内部的num作为闭包变量被赋值为1，然后return了函数sum。
 */

// 第二次执行add(1)(2)

/**
 * 函数sum是add(1)的运算结果，所以sum被执行，并且参数2传入函数sum中。
 * sum做了两件事情，第一是累加num的值，第二件事是return 函数 sum 以用于下一次运算。
 */

// 第三次执行add(1)(2)(3)

/**
 * 同第二次一样的，首先累加num的结果，然后return sum为下一次执行做准备，这就是柯里化的含义。
 *
 * 柯里化就是保证函数的作用保持不变。
 */

// 为什么要重写valueOf 和 toString ?

/**
 * 因为valueOf和toString的特性决定了需要重写这个函数的作用。
 * 查看文档可以知道，这两个函数是对象上自带的并且是自动执行的。
 * 所以当你用+来做加法运算的时候，函数sum会调用valueOf，这样就可以拿到闭包变量num了。
 * 当然，按照优先级，valueOf要优先于toString，所以两个你重写一个就行的。
 * 
 * see: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
 */
