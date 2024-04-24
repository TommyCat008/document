var lengthOfLongestSubstring = function (s) {
    // 哈希集合，记录每个字符是否出现过

    const n = s.length;
    const occ = new Set();
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1,
        ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            console.log('11', s.charAt(rk + 1));
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    console.log(ans);
    return ans;
};

lengthOfLongestSubstring('abcbbcbb');


function add(num) {
    function sum(_num) {
        num = num + _num;
        return sum;
    }

    sum.valueOf = function () {
        console.log('valueOf')
        return num;
    };

    sum.toString = function () {
        console.log('toString')
        return num;
    };

    return sum;
}

console.log(+add(1)(2)(3)(4));