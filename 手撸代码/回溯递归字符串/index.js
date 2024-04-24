// 有这么一个数组
let array = [
    ['A', 'B', 'C'],
    ['1', '2', '3'],
    ['x', 'y', 'z']
]

// 求输出所有的可能字符串
function getAllStrings(array) {
    let result = [];
    function cycle(s, index) {
        if (s.length === array.length) {
            result.push(s);
        } else {
            for (let item of array[index]) {
                cycle(s + item, index + 1)
            }
        }
    }

    cycle('', 0)

    return result;
}

console.log(getAllStrings(array))