/**
 * JS大数的计算，计算直接引入插件即可
 */

const Decimal = require('decimal.js');

const a = 9.99;
const b = 8.03;

// 直接使用现成的轮子，真香
// 加法
let c = new Decimal(a).add(new Decimal(b)).toNumber();

// 减法
let d = new Decimal(a).sub(new Decimal(b)).toNumber();

// 乘法
let e = new Decimal(a).mul(new Decimal(b)).toNumber();

// 除法
let f = new Decimal(a).div(new Decimal(b)).toNumber();
