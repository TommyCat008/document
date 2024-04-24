/*
 * @Author: 汤米猫
 * @Date: 2020-06-09 09:28:07
 * @Last Modified by: zhangyaqi
 * @Last Modified time: 2022-06-07 10:25:19
 */

// arguments
function testArguments(num) {
    console.log(arguments);
    console.log(Array.prototype.slice.call(arguments));
}

testArguments(12312); // { '0': 12312 }

// 测试异步 类似Promise.all()的功能实现
async function somethingAsync(val) {
    // 此处有问题，不能直接return promise，因为没有办法处理reject的情况。因此可以在这里定义一个变量来处理失败的问题。
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            // 异步请求内容
            console.log(val); // console array promises val
            resolve(val);
        }, 1000);
    });
}

(async () => {
    const promises = [1, 2];
    console.log('start');
    for await (res of promises.map((val) => {
        return somethingAsync(val);
    })) {
        console.log('res', res);
    }
    console.log('end');
})();

/**
 * 考察原型以及原型链的使用情况，以及this指向的问题
 */
function Parent() {
    this.a = 1;
    this.b = [1, 2, this.a];
    this.c = {demo: 5};
    this.show = function () {
        console.log(this.a, this.b, this.c.demo);
    };
}
function Child() {
    this.a = 2;
    this.change = function () {
        this.b.push(this.a);
        this.a = this.b.length;
        this.c.demo = this.a++;
    };
}
Child.prototype = new Parent();
var parent = new Parent();
var child1 = new Child();
var child2 = new Child();
child1.a = 11;
child2.a = 12;
parent.show();
child1.show();
child2.show();
child1.change();
child2.change();
parent.show();
child1.show();
child2.show();

function MyPromise(executor) {
    this.status = 'pending';
    this.successVal = '';
    this.failReason = '';
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];

    const resolve = (value) => {
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.successVal = value;
            for (let fn of this.resolveCallbacks) {
                fn(this.successVal);
            }
        }
    };

    const reject = (error) => {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.failReason = error;
            for (let fn of this.rejectCallbacks) {
                fn(this.failReason);
            }
        }
    };

    executor(resolve, reject);
}

MyPromise.prototype.then = function (fn1, fn2) {
    if (this.status === 'fulfilled') {
        fn1(this.successVal);
    }
    if (this.status === 'rejected') {
        fn2(this.failReason);
    }
    if (this.status === 'pending') {
        this.resolveCallbacks.push(() => {
            fn1(this.successVal);
        });
        this.rejectCallbacks.push(() => {
            fn2(this.failReason);
        });
    }
};

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 1000);
}).then((data) => {
    console.log('data', data);
});

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
                i++;
            }
            arr[j] = arr[i];
            while (i < j && arr[j] >= baseVal) {
                j--;
            }
            arr[i] = arr[j];
        }
        arr[j] = baseVal;
        sort(arr, left, j - 1);
        sort(arr, j + 1, right);
    };
    sort(array, 0, array.length - 1);
    return array;
}

console.log(quickSort([1, 2, 4, 3, 2, 8, 4]));

function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}
console.log(bubbleSort([1, 2, 4, 3, 2, 8, 4, -1]));

// 电话号码  回溯递归法
var letterCombinations = function (digits) {
    if (!digits) {
        return [];
    }
    const res = [];
    const map = {2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz'};
    const combineStr = function (i, s) {
        if (s.length === digits.length) {
            res.push(s);
        } else {
            const str = map[digits.charAt(i)];
            i += 1;
            for (let index in str) {
                combineStr(i, s + str[index]);
            }
        }
    };
    combineStr(0, '');
    return res;
};

letterCombinations('23');

function a(nums) {
    let res = nums[0];
    for (let i = 1; i < nums.length; i++) {
        nums[i] = nums[i] + Math.max(nums[i - 1], 0);
        console.log(i + 1, nums[i]);
        res = Math.max(res, nums[i]);
    }
    return res;
}

a([-2, 1, -3, 4, -1, 2, 1, -5, 4]);

var reverseWords = function (s) {
    return s
        .trim()
        .split(' ')
        .reverse()
        .filter((item) => {
            console.log(item, item.length);
            return item !== '';
        })
        .join(' ');
};

reverseWords('a good   example');

// const map = new Map();
// const weakMap = new WeakMap();

// (function () {
//     const foo = {foo: 1};
//     const bar = {bar: 2};

//     map.set(foo, 1);
//     weakMap.set(bar, 2);

//     console.log(123, bar);
// })();


