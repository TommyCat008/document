/**
 * 手动实现一个allSettled的函数，传递
 * @param promises
 * @example
 * const promise1 = Promise.resolve(3);
 * const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
 * const promises = [promise1, promise2];
 *
 * Promise.allSettled(promises).
 * then((results) => results.forEach((result) => console.log(result.status)));
 * 期望结果:
 * "fulfilled"
 * "rejected"
 */

function allSettled(promises) {
    let count = 0;
    const result = [];
    if (promises.length === 0) return Promise.resolve(result);
    return new Promise((resolve) => {
        for (const [index, promise] of Object.entries(promises)) {
            if (typeof promise !== 'object') {
                count++;
                result[index] = {
                    status: 'fulfilled',
                    value: promise,
                };
                if (count === promises.length) {
                    resolve(result);
                }
            } else {
                promise.then(
                    (res) => {
                        count++;
                        result[index] = {
                            status: 'fulfilled',
                            value: res,
                        };
                        if (count === promises.length) {
                            resolve(result);
                        }
                    },
                    (err) => {
                        count++;
                        result[index] = {
                            status: 'rejected',
                            reason: err,
                        };
                        if (count === promises.length) {
                            resolve(result);
                        }
                    }
                );
            }
        }
    });
}

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

console.log(
    allSettled(promises).then((res) => {
        console.log(res);
    })
);
