# svg 进阶篇

## 前置工作

### defs 元素

SVG 允许我们定义以后需要重复使用的图形元素。 建议把所有需要再次使用的引用元素定义在 defs 元素里面。这样做可以增加 SVG 内容的易读性和可访问性。 在 defs 元素中定义的图形元素不会直接呈现。 你可以在你的视口的任意地方利用 <use>元素呈现这些元素。

其内支持以下元素：

#### 动画元素

```plain
<animate>
<animateColor>
<animateMotion>
<animateTransform>
<discard>
<mpath>
<set>
```

#### 描述性元素

```plain
<desc>
<metadata>
<title>
```

#### 形状元素

```plain
<circle>
<ellipse>
<line>
<mesh>
<path>
<polygon>
<polyline>
<rect>
```

#### 结构化元素

```plain
<defs>
<g>
<svg>
<symbol>
<use>
```

#### 渐变元素

```plain
<linearGradient>
<radialGradient>
<stop>
```

## 颜色渐变

### 线性渐变

linearGradient 意思就是沿着直线改变颜色，

<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
      <linearGradient id="Gradient1">
        <stop class="stop1" offset="0%"/>
        <stop class="stop2" offset="50%"/>
        <stop class="stop3" offset="100%"/>
      </linearGradient>
      <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="red"/>
        <stop offset="50%" stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color="blue"/>
      </linearGradient>
      <style type="text/css">
        #rect1 { fill: url(#Gradient1); }
        .stop1 { stop-color: red; }
        .stop2 { stop-color: black; stop-opacity: 0; }
        .stop3 { stop-color: blue; }
      </style>
  </defs>
  <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100"/>
  <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>
</svg>

```html
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="Gradient1">
            <stop class="stop1" offset="0%" />
            <stop class="stop2" offset="50%" />
            <stop class="stop3" offset="100%" />
        </linearGradient>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="red" />
            <stop offset="50%" stop-color="black" stop-opacity="0" />
            <stop offset="100%" stop-color="blue" />
        </linearGradient>
        <style type="text/css">
            #rect1 {
                fill: url(#Gradient1);
            }
            .stop1 {
                stop-color: red;
            }
            .stop2 {
                stop-color: black;
                stop-opacity: 0;
            }
            .stop3 {
                stop-color: blue;
            }
        </style>
    </defs>
    <!-- 可以使用id的方式引用style的样式 -->
    <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100" />
    <!-- 直接fill使用linearGradient的渐变内容 -->
    <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)" />
</svg>
```

### 径向渐变

径向渐变是从一个点开始发散，其中的 offset 表示渐变从开始到结束的位置，例如下面的代码中，从 0%开始是红色的，然后渐变到 50%到绿色过度，最后到 100%的蓝色。同时另外一个知识点，radialGradient 标签中 cx、cy 和 r 三个属性都是百分比的形式出现的，并且这三个属性用于定义最外一层的位置以及大小，所以这点要注意好。另外还有 fx 和 fy 这俩用于定义最内一层的位置。

<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
      <radialGradient id="RadialGradient1">
        <stop offset="0%" stop-color="red"/>
        <stop offset="50%" stop-color="green"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
      <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
        <stop offset="0%" stop-color="red"/>
        <stop offset="50%" stop-color="green"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
  </defs>

  <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)"/>
  <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient2)"/>

</svg>

```html
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="RadialGradient1">
            <stop offset="0%" stop-color="red" />
            <stop offset="100%" stop-color="blue" />
        </radialGradient>
        <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
            <stop offset="0%" stop-color="red" />
            <stop offset="100%" stop-color="blue" />
        </radialGradient>
    </defs>

    <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)" />
    <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient2)" />
</svg>
```
