// 单例模式

// 概述

// 单例模式（Singleton Pattern）是 Java 中最简单的设计模式之一。
// 这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。
// 这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。
// 这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。

// 需要注意的事情：

// 1. 单例类只能有一个实例。
// 2. 单例类必须自己创建自己的唯一实例。
// 3. 单例类必须给所有其他对象提供这一实例。

class CreateSingleton {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(this.name + '正在吃东西')
    }
}

const Singleton = (function () {
    var instance = undefined;
    return function (name) {
        if (!instance) {
            instance =  new CreateSingleton(name);
        }
        return instance;
    }
})()

const a = new Singleton('小猫');
const b = new Singleton('小狗');

console.log(a === b)

