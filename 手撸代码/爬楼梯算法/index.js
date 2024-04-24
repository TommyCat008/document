/**
 * 来写一个算法，计算n层楼梯
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * f(0) = 1 f(1) = 1 f(2) = 2 f(3) = 3 f(4) = 5 f(5) = 8
 * 所以下一个是前两个的合
 * 其实这个就是一个斐波那契数列，但是我发现直接写递归会导致函数指数倍的调用，所以看到别人写的简单版本的。
 */

const climbStairs = function (n) {
    let res = [];
    res[1] = 1;
    res[0] = 1;
    for (i = 2; i <= n; i++) {
        res[i] = (res[i - 1] + res[i - 2]) % 10000000007;
    }
    return res[n];
};

// 第二种方法，动态规划
const climbStairs2 = function (n) {
    if (n === 0 || n === 1) return 1;
    let a = 1;
    let b = 1;
    let c;
    for (i = 2; i <= n; i++) {
        c = (a + b) % 10000000007;
        a = b;
        b = c;
    }
    return c;
};

console.log(climbStairs(5));
