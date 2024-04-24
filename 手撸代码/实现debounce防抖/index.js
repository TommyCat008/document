// 基础版，这个版本可以实现在一定时间段内只执行最后一次函数
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

// 进阶版的，这个版本需要第一次的时候立即执行函数

function debounce(fn, delay, immediate) {
    let timer;
    let result;
    return function (...args) {
        if (timer) clearTimeout(timer);

        if (immediate) {
            if (timer) {
                setTimeout(() => {
                    timer = null;
                }, delay)
            } else {
                result = fn.apply(this, args);
                return result;
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
}