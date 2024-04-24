// 基本的用法
function throttle(fn, delay) {
    let timer;

    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null; //  确保一段时间内只执行一个函数
            }, delay)
        }
    }
}


// 进阶的，包含第一次也要执行
function throttle(fn, delay) {
    let timer;
    let last = 0;

    return function (...args) {
        let now = Date.now();
        if (now - last >= delay) { // 时间差大于delay的时间，既需要立即执行函数。
            fn.apply(this, args);
            last = now;
        } else {
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(this, args);
                    timer = null;
                    last = Date.now();
                }, delay)
            }
        }
    }
}

