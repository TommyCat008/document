// 寄生组合方式继承，

// 原型继承

function Father(name) {
    this.name = name;
}

Father.prototype.eat = function () {
    console.log('吃饭')
}

function Son(name, like) {
    Father.call(this, name);
    this.like = like;
}

// 继承父类的原型方法
Son.prototype = Object.create(Father.prototype);
// 修正子类的构造函数
Son.prototype.constructor = Son;

// 直接继承父类的实例，也就是说子类的原型是父类的实例
// Son.prototype = new Father()

console.log(new Son('张三', '吃饭'))