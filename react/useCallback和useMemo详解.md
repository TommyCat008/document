# 缓存

## useCallback

作用：返回一个函数，只有在依赖项发生变化的时候才会更新

### 例子

```jsx
// 父组件
import React, {useState, useCallback} from 'react';
import Button from './Button';

export default function App() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);

    const handleClickButton1 = () => {
        setCount1(count1 + 1);
    };

    const handleClickButton2 = useCallback(() => {
        setCount2(count2 + 1);
    }, [count2]);

    return (
        <div>
            <div>
                <Button onClickButton={handleClickButton1}>Button1</Button>
            </div>
            <div>
                <Button onClickButton={handleClickButton2}>Button2</Button>
            </div>
            <div>
                <Button
                    onClickButton={() => {
                        setCount3(count3 + 1);
                    }}
                >
                    Button3
                </Button>
            </div>
        </div>
    );
}
```

```jsx
// 子组件
import React from 'react';

const Button = ({onClickButton, children, count}) => {
    return (
        <>
            <button onClick={onClickButton}>{children}</button>
            <span>{Math.random()}</span>
            {count && <span>count: {count}</span>}
        </>
    );
};

export default React.memo(Button);
```

代码地址：<https://codesandbox.io/s/usecallback1-yu1sp?file=/src/App.js:0-803>

==这里先说一下效果：==

1、点击 button1， button1 和 button3 会更新数据；

2、点击 button2， 三个都会更新；

3、点击 button3，button1 和 button3 会更新数据。

==为什么？==

当点击 button1 的时候，子组件会执行 props 传递的点击事件，这样在父组件在处理之后会变化数据，而数据变化了之后就会更新子组件。可以看到 button1 和 button3 都没有加限制，所以才会变化。

## useMemo

作用：传递一个创建函数和依赖项，创建函数会需要返回一个值，只有在依赖项发生改变的时候，才会重新调用此函数，返回一个新的值。

### useMemo 例子

```jsx
const [count, setCount] = useState(0);

const userInfo = useMemo(() => {
    return {
        name: "Jace",
        age: count
    };
}, [count]);

return <UserCard userInfo={userInfo}>
```

事实上在使用中 useMemo 的场景远比 useCallback 要广泛的很多，我们可以将 useMemo 的返回值定义为返回一个函数这样就可以变通的实现了 useCallback。在开发中当我们有部分变量改变时会影响到多个地方的更新那我们就可以返回一个对象或者数组，通过解构赋值的方式来实现同时对多个数据的缓存。

## 综合例子

```jsx
import React, {useState, useMemo, memo, useCallback} from 'react';

// 使用memo来优化Counter函数，只有当props的内容发生变化的时候才会从新渲染
const Counter = memo(function Counter(props) {
    console.log('Counter');
    return <h1 onClick={props.onClick}>Counter: {props.counter}</h1>;
});

function App() {
    const [count, setCount] = useState(0);

    // useMemo会根据传递的第二个参数来判定是否需要重新渲染，比如当count === 3时为true此时渲染一次，当count继续+1变成4的时候为false，此时也会重新渲染一次。
    const double = useMemo(() => {
        return count * 2;
    }, [count === 3]);

    // useMemo(() => fn, []) 就等于 useCallback(fn, [])
    const onClick = useCallback(() => {
        console.log('click');
    }, []);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>点我加一</button>
            <h1>count: {count}</h1>
            <Counter counter={double} onClick={onClick} />
        </div>
    );
}

export default App;
```
