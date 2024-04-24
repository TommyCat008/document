/**
 * 问题：
 * 模仿Excel的列的命名规则从A开始计算
 * 例如：
 * A B ... Z AA .... AZ BA ...BZ
 *
 * 实现一个function，当我传入列的个数后，返回
 */

// 思路讲解，这个就是26进制的一个算法，26进一即可。

function getColumns(order) {
    if (!order) {
        return order;
    }
    var str = '';
    var arr = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];
    function calculate(num) {
        if (num > arr.length) {
            // 向下取整，也不考虑四舍五入的问题
            var rem = parseInt((num - 1) / 26);
            str = arr[(num - 1) % 26] + str;
            if (rem > arr.length) {
                return calculate(rem);
            } else {
                str = arr[rem - 1] + str;
                return str;
            }
        } else {
            return arr[num - 1];
        }
    }
    return calculate(order);
}

// 测试
// console.log(getColumns(10));
console.log(getColumns(678));
