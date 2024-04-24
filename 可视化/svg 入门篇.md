# svg 入门篇

## SVG 绘制图形

svg 绘制图形是通过`path`元素来生成的，其中有一个属性叫做`d`的用于设置具体的路径。

属性`d`有一下的一些命令：

### 设置落笔点

> M 命令：设置当前绘制的落笔点，当然 `svg` 的初始点和 `canvas`的初始点是一致的都是左上角为(0, 0)。

<svg style="background-color: #f1f1f1" width="400" height="200" xmlns="http://www.w3.org/2000/svg"> <path d="M10 10" /><circle cx="10" cy="10" r="2" fill="red" /></svg>

```html
<svg style="background-color: #f1f1f1" width="400" height="200" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10" />
    <circle cx="10" cy="10" r="2" fill="red" />
</svg>
```

### 绘制直线

> L 命令：绘制一条直线并且结束点是当前的控制点

<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 80 L 80 10 L 130 10 L 190 80 L 300 150 L360 80" stroke="black" fill="transparent" />
</svg>

```html
<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 80 L 80 10 L 130 10 L 190 80 L 300 150 L360 80" stroke="black" fill="transparent" />
</svg>
```

### 水平方向移动线条

> H 命令：绘制向水平方向移动并且在设置点停止

<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 80 H 80" stroke="black" fill="transparent" />
</svg>

```html
<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 80 H 80" stroke="black" fill="transparent" />
</svg>
```

### 垂直方向移动线条

> V 命令：绘制向垂直方向移动并且在设置点停止

<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 10 V 80" stroke="black" fill="transparent" />
</svg>

```html
<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 10 V 80" stroke="black" fill="transparent" />
</svg>
```

### 绘制三次贝塞尔曲线

> C 命令：绘制一条贝塞尔曲线，结束点是当前控制点。C x1 y1, x2 y2, x y 其中 x,y 代表曲线的终点，x1 y1, x2 y2 分别表示起点和终点的控制点。

---

> S 命令：这个命令说白了就是为了偷懒而产生的，如果抛开 S 命令不谈只用 C 命令去绘制曲线，也是完全可以的。但是在几何图形上，我们可以知道连续的曲线中上一个曲线的结束点和下一个曲线的开始点的是对称的，所以他俩的曲率是可以共用的，继而出现了 S 命令用于继承上一个曲线结束点的对称控制点。S x2 y2, x y

<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 80 C 80 10, 130 10, 190 80 C 250 150, 300 150, 360 80" stroke="black" fill="transparent" />
</svg>

```html
<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 80 C 80 10, 130 10, 190 80 C 250 150, 300 150, 360 80" stroke="black" fill="transparent" />
</svg>
```

===等效于===

<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg"> <path d="M 10 80 C 80 10, 130 10, 190 80 S 300 150, 360 80" stroke="black" fill="transparent" /> </svg>

```html
<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 80 C 80 10, 130 10, 190 80 S 300 150, 360 80" stroke="black" fill="transparent" />
</svg>
```

### 绘制二次贝塞尔曲线

> Q 命令：二次贝塞尔曲线只需要一个控制点即可，这个控制点控制了起点和终点的曲线斜率 Q x1 y1, x y （x1 y1 表示控制点，x y 表示是结束点）

---

> T 命令：同样的，二次贝塞尔曲线也会有自己的偷懒命令，有了 T 命令机器会自动推断出新的控制点的位置，这样你就不需要设置新的控制点，只需要设置结束点即可。当然 T 只能在 Q 后使用，如果单独使用 T 命令，那么你将会获取到一条直线。

<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 80 Q 80 10, 130 10 T 140 80" stroke="black" fill="transparent" />
</svg>

```html
<svg style="background-color: #f1f1f1" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 80 Q 80 10, 130 10 T 140 80" stroke="black" fill="transparent" />
</svg>
```

### 创建圆

> 创建圆的写法并不需要使用 path 来绘制路径，而是是使用 circle 标签即可。其中 cx，cy 表示圆的中点位置，r 表示圆的半径。

<svg style="background-color: #f1f1f1" width="400" height="400" xmlns="http://www.w3.org/2000/svg"><circle cx="200" cy="200" r="100" stroke="blue" fill="green" /> </svg>

```html
<svg style="background-color: #f1f1f1" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="100" stroke="blue" fill="green" />
</svg>
```

### 创建四边形

> 创建一个矩形，你可以通过 x,y 设置绘制的起点也就是矩形的左上角的位置，通过 width 和 height 设置矩形的宽高，当然你可以通过 rx 和 ry 设置矩形的圆角。

<svg style="background-color: #f1f1f1" width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect x="100" y="100" rx="10" width="200" height="200" fill="green" /> </svg>

```html
<svg style="background-color: #f1f1f1" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect x="100" y="100" width="200" height="200" fill="green" />
</svg>
```

### 创建多边形

> 多边形的创建通过使用 polygon 来创建多个线段作为连接，并且最后一个结束点会自动向起点作为结尾

<svg style="background-color: #f1f1f1;" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
<polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180" fill="green" />
</svg>

```html
<svg style="background-color: #f1f1f1;" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180" fill="green" />
</svg>
```
