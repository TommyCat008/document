// 这个写法是不对的，因为每次里面for循环完成之后，都会把数组最右边的值对比为最大值，所以j = i 这个赋值可能控制不到正确的顺序。
function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j < array.length - 1; j++) {
            if (array[i] > array[j + 1]) {
                let temp = array[i];
                array[i] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

// 这个写法是正确的
function bubbleSort(arr) {
    var i = (j = 0);
    for (i = 0; i < arr.length - 1; i++) {
        for (j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
// 测试一下，发现也可以。
console.log(123, bubbleSort([1, 2, 4, 3, 2, 8, 4, -1]));