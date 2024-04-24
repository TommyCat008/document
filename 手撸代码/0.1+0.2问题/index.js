// 实现一个 0.1 + 0.2 的方法

// Q：为什么不等于0.3 呢？

// 对于计算机而言，两个数字在相加时是以二进制形式进行的。在呈现结果的时候才转换成十进制。

// JS中的数字是用 双精度64位浮点数来存储的，它是由64位组成，这64位由3部分组成（S:符号位，Exponent：指数域，Fraction：尾数域）

function floatAdd(arr) {
    let maxLength = 0;
    for (let i in arr) {
        let value = arr[i];
        let item2 = value.toString().split('.')[1]
        if (item2 && item2.length > maxLength) {
            maxLength = item2.length;
        }
    }
    let m = Math.pow(10, maxLength);
    let sum = 0;
    for (let i in arr) {
        sum += arr[i] * m;
    }
    return sum / m
}

console.log(floatAdd([0.1, 0.2]))