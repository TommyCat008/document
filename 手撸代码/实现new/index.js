// 实现一个new 方法
function _new(fn, ...args) {
    const obj = Object.create(fn.prototype);
    console.log(obj) // 在这个阶段的时候 obj还只是一个空对象，原型链上含有fn的原型
    const ref = fn.apply(obj, args); // fn如果存在return的话，ref才会存在值。
    console.log(obj, ref) // 在这个阶段是将fn的内置属性赋予obj
    // instanceof的作用就是在于判断ref的原型链是否有Object的原型
    // 这个判断 返回的是 obj
    return ref instanceof Object ? ref : obj;
}

// 测试
function Animals(name, age) {
    this.name = name;
    this.age = age;
    return {
        name: this.name
    }
}

Animals.prototype.eat = function () {
    console.log(this.name + '吃东西');
}

Animals.prototype.getAge = function () {
    console.log(`${this.name}${this.age}岁了`);
}

const animal = _new(Animals, '小猫', 5, { a: 123 });
