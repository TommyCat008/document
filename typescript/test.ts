const b = [1, 2, 3];
const a = new Proxy(b, {
    get(target, prop) {
        console.log('我被查阅了');
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        console.log('我被设置了');
        Reflect.set(target, prop, value);
        return true;
    },
});

console.log(a[2]);
console.log((a.length = 0));