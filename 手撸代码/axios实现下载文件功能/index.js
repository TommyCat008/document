// 首先设置一下axios的responseType为blob，然后做接下来的操作。

console.log(res);
this.loading = false;
let cont = res.data;
// 创建隐藏的可下载链接
var eleLink = document.createElement('a');
eleLink.download = 'sku.xlsx';
eleLink.style.display = 'none';
// 字符内容转变成blob地址
var blob = new Blob([cont], {
    type: 'application/vnd.ms-excel;charset=utf-8',
});
eleLink.href = URL.createObjectURL(blob);
// 触发点击
document.body.appendChild(eleLink);
eleLink.click();
// 然后移除
document.body.removeChild(eleLink);
