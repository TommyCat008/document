// 使用reduce来实现一个filter功能

Array.prototype._filter = function (fn) {
    return this.reduce((acc, item, index, arr) => {
        fn.call(this, item) ? acc.push(item) : '';
        return acc
    }, [])
}

const arr = [1, 2, 3, 4]._filter(num => num > 2);
console.log(arr);