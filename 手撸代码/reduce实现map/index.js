// 来一个reduce实现map的方法

Array.prototype._map = function (fn) {
    let res = []
    this.reduce((acc, item, index, arr) => {
        res.push(fn.call(this, item, index))
    }, '')

    return res;
}

const arr = [1, 2, 3, 4]._map((item, index) => {
    return item + index;
})

console.log(arr)