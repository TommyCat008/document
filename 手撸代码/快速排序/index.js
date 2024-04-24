// 实现一个快速排序

// 时间复杂度在 O(nlogn) ~ O(n2)


function quickSort(array) {
    const sort = function (arr, left, right) {
        if (left >= right) {
            return;
        }
        let i = left;
        let j = right;
        let baseVal = arr[j];
        while (i < j) {
            while (i < j && arr[i] <= baseVal) {
                i++
            }
            arr[j] = arr[i];
            while (i < j && arr[j] >= baseVal) {
                j--
            }
            arr[i] = arr[j];
        }
        arr[j] = baseVal;
        sort(arr, left, j - 1);
        sort(arr, j + 1, right);
    }

    sort(array, 0, array.length - 1);
    return array
}

console.log(quickSort([9, 2, 1, 22, 1, 23]))