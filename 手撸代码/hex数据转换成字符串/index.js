function compile(str) {
    const arr = [];

    for (let i = 0; i < str.length; i += 2) {
        arr.push('' + str[i] + str[i + 1]);
    }
    return arr;
}

function change(array) {
    const arr = array.map((item) => {
        return parseInt(item, 16);
    });
    console.log(arr);
    return String.fromCharCode.apply(null, arr);
}

// 数据来源是socket传输的二进制ArrayBuffer被浏览器转换成16进制展示的数据，拷贝之后就是下方这个样子的。
console.log(
    change(
        compile('1b5d303b726f6f74406c69756c7534302d6c696e75783a207e07726f6f74406c69756c7534302d6c696e75783a7e232000')
    )
);
