// 测试promise的结果

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123);
//     }, 1000);
// });

// console.log(typeof promise1)

// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(123123123);
//     }, 2000);
// });

// Promise.allSettled([promise1, promise2])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

function allSettled(promises) {
    // your code here
    let result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        if (promises.length === 0) resolve(result);
        for (const index in promises) {
            const promise = promises[index];
            if (typeof promise !== "object") {
                result[index] = { status: "fulfilled", value: promise };
                count++;
                if (count === promises.length) {
                    resolve(result);
                }
            } else {
                promise.then(
                    (res) => {
                        result[index] = {
                            status: "fulfilled",
                            value: res,
                        };
                        count++;
                        if (count === promises.length) {
                            resolve(result);
                        }
                    },
                    (err) => {
                        result[index] = {
                            status: "rejected",
                            reason: err,
                        };
                        count++;
                        if (count === promises.length) {
                            resolve(result);
                        }
                    }
                );
            }
        }
    });
}

allSettled([1, 2, 3, Promise.resolve(4)])
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

for (let i = 0; i < 7; i++) {
    if (i == 2) {
        return;
    }
    console.log(i);
}

console.log(88 % 1000000007);

var findContinuousSequence = function (target) {
    let left = 1;
    let right = Math.ceil(target / 2);
    const result = [];
    while (right < target) {
        let sum = ((left + right) * (right - left + 1)) / 2;
        if (sum > target) {
            left++;
        } else if (sum < target) {
            right++;
        } else {
            const temp = [];
            for (let i = left; i <= right; i++) {
                temp.push(i);
            }
            result.push(temp);
        }
    }

    return result;
};


var firstUniqChar = function(s) {
    let obj = {};
    for (let item of s) {
        if (obj.hasOwnProperty(item)) {
            obj[item] = false;
        } else {
            obj[item] = true;
        }
    }
    console.log(obj)
    for (let [key, item] of Object.entries(obj)) {
        if (item) {
            return key
        }
    }

    return ' '
};

firstUniqChar("loveleetcode")