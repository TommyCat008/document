/**
 * 计算和为K 的子数组个数
 * @param {*} nums
 * @param {*} k
 */
var subarraySum = function (nums, k) {
    const num = 0;
    const prefix = [0];

    for (let i = 0; i < nums.length; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    for (let i = 0; i < prefix.length; i++) {
        for (let j = i + 1; j < prefix.length; j++) {
            if (prefix[j] - prefix[i] === k) {
                num++;
            }
        }
    }
    return num;
};
