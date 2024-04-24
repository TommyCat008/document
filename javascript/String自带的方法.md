[TOC]

## 本文研究一下String原型上的方法都有哪些？

#### 1、~~anchor()~~

##### String.prototype.anchor()

> anchor() 方法创建一个 <a> HTML 锚元素，被用作超文本靶标（hypertext target）

```js
// 示例
var myString = "Table of Contents";
document.body.innerHTML = myString.anchor("contents_anchor");
```

```html
<!-- 输入结果 -->
<a name="contents_anchor">Table of Contents</a>
```

------

#### 2、~~big()~~

##### String.prototype.big()

> big()方法的作用是创建一个使字符串显示大号字体的<big>标签。

```js
var worldString = 'Hello, world';

console.log(worldString.big());       // <big>Hello, world</big>
```

------

#### 3、~~blink()~~

##### String.prototype.blink()

> blink()方法创建使字符串闪烁的 <blink> HTML 元素。

```js
var worldString = 'Hello, world';

console.log(worldString.blink());   // <blink>Hello, world</blink>
```

------

#### 4、~~bold()~~

##### String.prototype.bold()

> bold() 方法会创建 HTML 元素 “b”，并将字符串加粗展示。

```js
var worldString = 'Hello, world';

console.log(worldString.bold());    // <b>Hello, world</b>
```

------

#### 5、charAt(index)

##### String.prototype.charAt(index)

> charAt() 方法从一个字符串中返回指定的字符。index的值是一个介于0 和字符串长度减1之间的整数 (0~length-1)。
> 如果没有提供索引，charAt() 将使用0。

```js
var anyString = "Brave new world";

console.log("The character at index 0   is '" + anyString.charAt(0)   + "'"); // The character at index 0 is 'B'
console.log("The character at index 1   is '" + anyString.charAt(1)   + "'"); // The character at index 1 is 'r'
console.log("The character at index 2   is '" + anyString.charAt(2)   + "'"); // The character at index 2 is 'a'
console.log("The character at index 3   is '" + anyString.charAt(3)   + "'"); // The character at index 3 is 'v'
console.log("The character at index 4   is '" + anyString.charAt(4)   + "'"); // The character at index 4 is 'e'
console.log("The character at index 999 is '" + anyString.charAt(999) + "'"); // The character at index 999 is ''
```

-------

#### 6、charCodeAt(index)

##### String.prototype.charCodeAt(index)

> charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元。一个大于等于 0，小于字符串长度的整数。如果不是一个数值，则默认为 0。
>
> 返回值：
>
> 指定 `index` 处字符的 UTF-16 代码单元值的一个数字；如果 `index` 超出范围，`charCodeAt()` 返回 ==NaN==。

```js
"ABC".charCodeAt(0) // returns 65

"ABC".charCodeAt(1) // returns 66

"ABC".charCodeAt(2) // returns 67

"ABC".charCodeAt(3) // returns NaN
```

------

#### 7、codePointAt(pos)

##### String.prototype.codePointAt(pos)

> codePointAt() 方法返回 一个 Unicode 编码点值的非负整数。pos是这个字符串中需要转码的元素的位置
> 返回值：
> 返回值是在字符串中的给定索引的编码单元体现的数字，如果在索引处没找到元素则返回 undefined 。

```js
'ABC'.codePointAt(1);          // 66
'\uD800\uDC00'.codePointAt(0); // 65536

'XYZ'.codePointAt(42); // undefined 超出长度返回undefined
```

------

#### 8、concat()

##### String.prototype.concat(str1, [, ...strN])

> concat() 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。
> concat 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。 concat 方法并==不影响==原字符串。
> 强烈建议使用赋值操作符（+, +=）代替 concat 方法。（mdn性能解释）

```js
let hello = 'Hello, '
console.log(hello.concat('Kevin', '. Have a nice day.'))
// Hello, Kevin. Have a nice day.

let greetList = ['Hello', ' ', 'Venkat', '!']
"".concat(...greetList)  // "Hello Venkat!"

"".concat({})    // [object Object]
"".concat([])    // ""
"".concat(null)  // "null"
"".concat(true)  // "true"
"".concat(4, 5)  // "45"
```

------

#### 9、endsWith()

##### String.prototype.endsWith()

> endsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。

```js
const str1 = 'Cats are the best!';

console.log(str1.endsWith('best!'));
// expected output: true

console.log(str1.endsWith('best', 17));
// expected output: true

const str2 = 'Is this a question';

console.log(str2.endsWith('?'));
// expected output: false
```

------

#### 10、~~fixed()~~

##### String.prototype.fixed()

> fixed()方法创建了一个<tt>标签元素将字符串包裹起来，从而让这个字符串里面的内容具有固定间距。

```js
var worldString = 'Hello, world';
console.log(worldString.fixed()); // "<tt>Hello, world</tt>"
```

------

#### 11、~~fontcolor()~~

##### String.prototype.fontcolor()

> fontcolor()方法创建一个<font>的HTML元素让字符串被显示成指定的字体颜色。

```js
var worldString = "Hello, world"

console.log(worldString.fontcolor('red') + ' is red in this line');
// <font color="red">Hello, world </font> is red in this line"

console.log（worldString.fontcolor('FF00') + ' is red in hexadecimal'
// <font color="FF00">Hello，world </font> is red in hexadecimal
```

------

#### 12、~~fontsize()~~

##### String.prototype.fontsize(size)

> 创建一个<font>HTML标签，并根据size指定其大小。

```js
var worldString = 'Hello, world';

console.log(worldString.fontsize(7)); // <font size="7">Hello, world</fontsize>
```

------

#### 13、includes()

##### String.prototype.includes(searchString[, position])

> includes() 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。
> searchString 要在此字符串中搜索的字符串。
> position 可选、从当前字符串的哪个索引位置开始搜寻子字符串，默认值为 0。

```js
var str = 'To be, or not to be, that is the question.';

console.log(str.includes('To be'));       // true
console.log(str.includes('question'));    // true
console.log(str.includes('nonexistent')); // false
console.log(str.includes('To be', 1));    // false
console.log(str.includes('TO BE'));       // false, 区分大小写
```

------

#### 14、indexOf()

##### String.prototype.indexOf(searchValue [, fromIndex])

> indexOf() 方法返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。
> searchValue 如果没有提供确切地提供字符串，searchValue 会被强制设置为 "undefined"， 然后在当前字符串中查找这个值。
> fromIndex 可选项，数字表示开始查找的位置。可以是任意整数，默认值为 0。

```js
const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

const searchTerm = 'dog';
const indexOfFirst = paragraph.indexOf(searchTerm);

console.log(`The index of the first "${searchTerm}" from the beginning is ${indexOfFirst}`);
// expected output: "The index of the first "dog" from the beginning is 40"

console.log(`The index of the 2nd "${searchTerm}" is ${paragraph.indexOf(searchTerm, (indexOfFirst + 1))}`);
// expected output: "The index of the 2nd "dog" is 52"
```

------

#### 15、~~italics()~~

##### String.prototype.italics()

> 创建一个<i>标签

```js
var worldString = 'Hello, world'; console.log(worldString.blink());  // Hello, world
console.log(worldString.italics()); //Hello, world
```

------

#### 16、lastIndexOf()

##### String.prototype.lastIndexOf(searchValue[, fromIndex])

>  lastIndexOf() 方法返回调用String 对象的指定值最后一次出现的索引，在一个字符串中的指定位置 fromIndex处从后向前搜索。如果没找到这个特定值则返回-1 。该方法将从尾到头地检索字符串 str，看它是否含有子串 searchValue。开始检索的位置在字符串的 fromIndex 处或字符串的结尾（没有指定 fromIndex 时）。如果找到一个 searchValue，则返回 searchValue 的第一个字符在 str 中的位置。str中的字符位置是从 0 开始的。
>  searchValue 一个字符串，表示被查找的值。如果searchValue是空字符串，则返回fromIndex。
>  fromIndex 可选项 待匹配字符串searchValue的开头一位字符从 str的第fromIndex位开始向左回向查找。fromIndex默认值是 +Infinity。如果 fromIndex >= str.length ，则会搜索整个字符串。如果 fromIndex < 0 ，则等同于 fromIndex == 0。

```js
var anyString = "Brave new world";

console.log("The index of the first w from the beginning is " + anyString.indexOf("w"));
// Displays 8

console.log("The index of the first w from the end is " + anyString.lastIndexOf("w")); 
// Displays 10

console.log("The index of 'new' from the beginning is " + anyString.indexOf("new"));   
// Displays 6

console.log("The index of 'new' from the end is " + anyString.lastIndexOf("new"));
// Displays 6
```

------

#### 17、~~link()~~

##### String.prototype.link()

> link() 方法创建一个 HTML 元素 <a> ，用该字符串作为超链接的显示文本，参数作为指向另一个 URL 的超链接。

```js
var hotText = 'MDN';
var URL = 'https://developer.mozilla.org/';

document.write('Click to return to ' + hotText.link(URL));
// Click to return to <a href="https://developer.mozilla.org/">MDN</a>
```

------

#### 18、localeCompare()

##### String.prototype.localeCompare(compareString[, locales[, options]])

> localeCompare() 方法返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。
> compareString 用来比较的字符串
> locales 可选项 用来表示一种或多种语言或区域的一个符合 BCP 47 标准的字符串或一个字符串数组。
> options 可选项

==这个我没有看懂，后续研究看看==

------

#### 19、match()

##### String.prototype.match(regexp)

> match() 方法检索返回一个字符串匹配正则表达式的结果。
> regexp 一个正则表达式对象。如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp 。如果你没有给出任何参数并直接使用match() 方法 ，你将会得到一 个包含空字符串的 Array ：[""] 。

###### 示例一
```js
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);

// logs [ 'see Chapter 3.4.5.1',
//        'Chapter 3.4.5.1',
//        '.1',
//        index: 22,
//        input: 'For more information, see Chapter 3.4.5.1' ]

// 'see Chapter 3.4.5.1' 是整个匹配。
// 'Chapter 3.4.5.1' 被'(chapter \d+(\.\d)*)'捕获。
// '.1' 是被'(\.\d)'捕获的最后一个值。
// 'index' 属性(22) 是整个匹配从零开始的索引。
// 'input' 属性是被解析的原始字符串。
```

###### 示例二

```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);

console.log(matches_array);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
```

==示例一和示例二返回结果不一致的问题，正则里面有全局匹配设置的会返回匹配到的数组，如果没有全局匹配项的时候返回的是第一个匹配到的值得相关信息，例如index和input等信息。==

######  示例三

```js
var str = "Nothing will come of nothing.";
str.match();   // returns [""]
```

###### 示例四

```js
// 当参数是一个字符串或一个数字，它会使用new RegExp(obj)来隐式转换成一个 RegExp。如果它是一个有正号的正数，RegExp() 方法将忽略正号。
var str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
    str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
    str3 = "The contract was declared null and void.";
str1.match("number");   // "number" 是字符串。返回["number"]
str1.match(NaN);        // NaN的类型是number。返回["NaN"]
str1.match(Infinity);   // Infinity的类型是number。返回["Infinity"]
str1.match(+Infinity);  // 返回["Infinity"]
str1.match(-Infinity);  // 返回["-Infinity"]
str2.match(65);         // 返回["65"]
str2.match(+65);        // 有正号的number。返回["65"]
str3.match(null);       // 返回["null"]
```

------

#### 20、matchAll()

##### String.prototype.matchAll()

> matchAll() 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

```js
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';
const array = [...str.matchAll(regexp)];

console.log(array[0]);
// expected output: Array ["test1", "e", "st1", "1"]

console.log(array[1]);
// expected output: Array ["test2", "e", "st2", "2"]
```

------

#### 21、normalize(form)

##### String.prototype.normalize(form)

> normalize() 方法会按照指定的一种 Unicode 正规形式将当前字符串正规化。（如果该值不是字符串，则首先将其转换为一个字符串）。
> form 四种 Unicode 正规形式（Unicode Normalization Form）"NFC"、"NFD"、"NFKC"，或 "NFKD" 其中的一个, 默认值为 "NFC"。

```js
const name1 = '\u0041\u006d\u00e9\u006c\u0069\u0065';
const name2 = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065';

console.log(`${name1}, ${name2}`);
// expected output: "Amélie, Amélie"

console.log(name1 === name2);
// expected output: false

console.log(name1.length === name2.length);
// expected output: false

const name1NFC = name1.normalize('NFC');
const name2NFC = name2.normalize('NFC');

console.log(`${name1NFC}, ${name2NFC}`);
// expected output: "Amélie, Amélie"

console.log(name1NFC === name2NFC);
// expected output: true

console.log(name1NFC.length === name2NFC.length);
// expected output: true
```

#### 22、padEnd()

##### String.prototype.padEnd(targetLength [, padString])

> padEnd()  方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。
> targetLength 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
> padString 可选 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "（U+0020）。

```js
const str1 = 'Breaded Mushrooms';

console.log(str1.padEnd(25, '.'));
// expected output: "Breaded Mushrooms........"

const str2 = '200';

console.log(str2.padEnd(5));
// expected output: "200  "
```

------

#### 23、padStart()

##### String.prototype.padStart(targetLength [, padString])

> padStart() 方法用另一个字符串填充当前字符串(如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。
> targetLength 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
padString 可选 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "（U+0020）。

```js
const str1 = '5';

console.log(str1.padStart(2, '0'));
// expected output: "05"

const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

console.log(maskedNumber);
// expected output: "************5581"
```

------

#### 24、repeat()

##### String.prototype.repeat(count)

> repeat() 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
> count 介于 0 和 +Infinity 之间的整数。表示在新构造的字符串中重复了多少遍原字符串。

```js
"abc".repeat(-1)     // RangeError: repeat count must be positive and less than inifinity
"abc".repeat(0)      // ""
"abc".repeat(1)      // "abc"
"abc".repeat(2)      // "abcabc"
"abc".repeat(3.5)    // "abcabcabc" 参数count将会被自动转换成整数，并且是向下取整.
"abc".repeat(1/0)    // RangeError: repeat count must be positive and less than inifinity
```

------

#### 25、replace()

##### String.prototype.replace(regexp|substr, newSubStr|function)

> replace() 方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果pattern是字符串，则仅替换第一个匹配项。

==原字符串不会改变==

> regexp (pattern)
一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
> substr (pattern) 
一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。
> newSubStr (replacement)
> 用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数。
> function (replacement)
一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数。

###### 使用字符串作为参数

| 变量名 | 代表的值                                                     |
| ------ | ------------------------------------------------------------ |
| $$     | 插入一个 "$"。                                               |
| $&     | 插入匹配的子串。                                             |
| $`     | 插入当前匹配的子串左边的内容。                               |
| $'     | 插入当前匹配的子串右边的内容。                               |
| $n     | 假如第一个参数是 `RegExp`对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始 |

###### 指定一个函数作为参数

| 变量名            | 代表的值                                                     |
| ----------------- | ------------------------------------------------------------ |
| match             | 匹配的子串。（对应于上述的$&。）                             |
| p1,p2, ...        | 假如replace()方法的第一个参数是一个[`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp) 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）例如，如果是用 `/(\a+)(\b+)/` 这个来匹配，`p1` 就是匹配的 `\a+`，`p2` 就是匹配的 `\b+`。 |
| offset            | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 `'abcd'`，匹配到的子字符串是 `'bc'`，那么这个参数将会是 1） |
| string            | 被匹配的原字符串。                                           |
| NamedCaptureGroup | 命名捕获组匹配的对象                                         |

```js
// replace() 中使用了正则表达式及忽略大小写标示
var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas');
console.log(newstr);  // Twas the night before Christmas...

// 例子演示了如何交换一个字符串中两个单词的位置，这个脚本使用$1 和 $2 代替替换文本。
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
// Smith, John
console.log(newstr);

// 在这个例子中，所有出现的大写字母转换为小写，并且在匹配位置前加一个连字符。重要的是，在返回一个替换了的字符串前，在匹配元素前进行添加操作是必要的。
function styleHyphenFormat(propertyName) {
  function upperToHyphenLower(match) {
    return '-' + match.toLowerCase();
  }
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}
styleHyphenFormat('borderTop'); //  'border-top'

// 将华氏温度转换为对等的摄氏温度
function f2c(x)
{
  function convert(str, p1, offset, s)
  {
    return ((p1-32) * 5/9) + "C";
  }
  var s = String(x);
  var test = /(\d+(?:\.\d*)?)F\b/g;
  return s.replace(test, convert);
}
```

------

#### 26、replaceAll()

##### String.prototype.replaceAll()

> replaceAll() 方法返回一个新字符串，新字符串所有满足 pattern 的部分都已被replacement 替换。pattern可以是一个字符串或一个 RegExp， replacement可以是一个字符串或一个在每次匹配被调用的函数。

==原始字符串保持不变。==

```js
const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

const regex = /dog/gi;

console.log(p.replaceAll(regex, 'ferret'));
// expected output: "The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?"

console.log(p.replaceAll('dog', 'monkey'));
// expected output: "The quick brown fox jumps over the lazy monkey. If the monkey reacted, was it really lazy?"

```

------

#### 27、search()

##### String.prototype.search(regexp)

> search() 方法执行正则表达式和 String 对象之间的一个搜索匹配，返回首次匹配项的索引。
> regexp
一个正则表达式（regular expression）对象
如果传入一个非正则表达式对象 regexp，则会使用 new RegExp(regexp) 隐式地将其转换为正则表达式对象。

```js

const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

// any character that is not a word character or whitespace
const regex = /[^\w\s]/g;

console.log(paragraph.search(regex));
// expected output: 43

console.log(paragraph[paragraph.search(regex)]);
// expected output: "."
```

------

#### 28、slice()

##### String.prototype.slice(beginIndex[, endIndex])

> slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
> beginIndex
从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待，这里的strLength 是字符串的长度（例如， 如果 beginIndex 是 -3 则看作是：strLength - 3）
> endIndex
可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度(例如，如果 endIndex 是 -3，则是, strLength - 3)。

```js
const str = 'The quick brown fox jumps over the lazy dog.';

console.log(str.slice(31));
// expected output: "the lazy dog."

console.log(str.slice(4, 19));
// expected output: "quick brown fox"

console.log(str.slice(-4));
// expected output: "dog."

console.log(str.slice(-9, -5));
// expected output: "lazy"
```

------

#### 29、~~small()~~

##### String.prototype.small()

> small() 方法的作用是创建一个使字符串显示小号字体的 <small> 标签。

------

#### 30、split()

##### String.prototype.split([separator[, limit]])

> split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。 
> separator
指定表示每个拆分应发生的点的字符串。separator 可以是一个字符串或正则表达式。 如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。如果在str中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将str原字符串中每个字符的数组形式返回。
> limit
一个整数，限定返回的分割片段数量。当提供此参数时，split 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。


```js
const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');
console.log(words[3]);
// expected output: "fox"

const chars = str.split('');
console.log(chars[8]);
// expected output: "k"

const strCopy = str.split();
console.log(strCopy);
// expected output: Array ["The quick brown fox jumps over the lazy dog."]
```

------

#### 30、startsWith()

##### String.prototype.startsWith(searchString[, position])

> startsWith() 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。
> searchString
要搜索的子字符串。
> position 可选
在 str 中搜索 searchString 的开始位置，默认值为 0。

```js
const str1 = 'Saturday night plans';

console.log(str1.startsWith('Sat'));
// expected output: true

console.log(str1.startsWith('Sat', 3));
// expected output: false
```

------

#### 31、~~strike()~~

##### String.prototype.strike()

> strike()方法创建<strike> HTML 元素，使字符串展示为被删除的文本。

------

#### 32、~~sub()~~

##### String.prototype.sub()

> sub()方法创建一个 <sub> HTML 元素，使字符串展示为下标。

------

#### 33、~~substr()~~

##### String.prototype.substr()

> substr() 方法返回一个字符串中从指定位置开始到指定字符数的字符。

------

#### 34、substring()

##### String.prototype.substring(indexStart[, indexEnd])

> substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
> indexStart
需要截取的第一个字符的索引，该索引位置的字符作为返回的字符串的首字母。
> indexEnd
可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内。

```js
var anyString = "Mozilla";

// 输出 "Moz"
console.log(anyString.substring(0,3));
console.log(anyString.substring(3,0));
console.log(anyString.substring(3,-3));
console.log(anyString.substring(3,NaN));
console.log(anyString.substring(-2,3));
console.log(anyString.substring(NaN,3));

// 输出 "lla"
console.log(anyString.substring(4,7));
console.log(anyString.substring(7,4));

// 输出 ""
console.log(anyString.substring(4,4));

// 输出 "Mozill"
console.log(anyString.substring(0,6));

// 输出 "Mozilla"
console.log(anyString.substring(0,7));
console.log(anyString.substring(0,10));
```

------

#### 35、~~sup()~~

##### String.prototype.sup()

> sup()方法创建 一个<sup>HTML 元素，使字符串显示为上标。

------

#### 36、toLocaleLowerCase()

##### String.prototype.toLocaleLowerCase(locale)

> toLocaleLowerCase()方法根据任何指定区域语言环境设置的大小写映射，返回调用字符串被转换为小写的格式。
> 参数 `locale` 指明要转换成小写格式的特定语言区域
> 语法
> str.toLocaleLowerCase()
> str.toLocaleLowerCase(locale) 
> str.toLocaleLowerCase([locale, locale, ...])

------

#### 37、toLocaleUpperCase()

##### String.prototype.toLocaleUpperCase()

> toLocaleUpperCase() 方法根据本地主机语言环境把字符串转换为大写格式，并返回转换后的字符串。

```js
const city = 'istanbul';

console.log(city.toLocaleUpperCase('en-US'));
// expected output: "ISTANBUL"

console.log(city.toLocaleUpperCase('TR'));
// expected output: "İSTANBUL"
```

------ 

#### 38、toLowerCase()

##### String.prototype.toLowerCase()

> toLowerCase() 会将调用该方法的字符串值转为小写形式，并返回。

-------

#### 39、toString()

##### String.prototype.toString()

> toString() 方法返回指定对象的字符串形式。

```js
var x = new String("Hello world");

alert(x.toString())      // 输出 "Hello world"
```

------

#### 40、toUpperCase()

##### String.prototype.toUpperCase()

> toUpperCase() 方法将调用该方法的字符串转为大写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。

-------

#### 41、trim()

##### String.prototype.trim()

> trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。

------

#### 42、trimRight()

##### String.prototype.trimRight()

> trimEnd() 方法从一个字符串的末端移除空白字符。trimRight() 是这个方法的别名。

------

#### 43、trimStart()

##### String.prototype.trimStart()

> trimStart() 方法从字符串的开头删除空格。trimLeft() 是此方法的别名。

------

#### 44、valueOf()

##### String.prototype.valueOf()

> valueOf() 方法返回  String  对象的原始值

```js
const stringObj = new String('foo');

console.log(stringObj);
// expected output: String { "foo" }

console.log(stringObj.valueOf());
// expected output: "foo"
```

-----

#### 45、String.raw()

> String.raw() 是一个模板字符串的标签函数，它的作用类似于 Python 中的字符串前缀 r 和 C# 中的字符串前缀 @（还是有点区别的，详见隔壁 Chromium 那边的这个 issue），是用来获取一个模板字符串的原始字符串的，比如说，占位符（例如 ${foo}）会被处理为它所代表的其他字符串，而转义字符（例如 \n）不会。
> 
```js
String.raw(callSite, ...substitutions)

String.raw`templateString`;

String.raw`Hi\n${2+3}!`;
// 'Hi\n5!'，Hi 后面的字符不是换行符，\ 和 n 是两个不同的字符

String.raw `Hi\u000A!`;             
// "Hi\u000A!"，同上，这里得到的会是 \、u、0、0、0、A 6个字符，
// 任何类型的转义形式都会失效，保留原样输出，不信你试试.length

let name = "Bob";
String.raw `Hi\n${name}!`;             
// "Hi\nBob!"，内插表达式还可以正常运行


// 正常情况下，你也许不需要将 String.raw() 当作函数调用。
// 但是为了模拟 `t${0}e${1}s${2}t` 你可以这样做:
String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
// 注意这个测试, 传入一个 string, 和一个类似数组的对象
// 下面这个函数和 `foo${2 + 3}bar${'Java' + 'Script'}baz` 是相等的.
String.raw({
  raw: ['foo', 'bar', 'baz'] 
}, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'
```










