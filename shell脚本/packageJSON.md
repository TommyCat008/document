### 认识 package.json 文件

在现代化的项目中，一般都会有一个 package.json 文件，其定义了项目运行所需要的各种依赖和项目的配置信息（如：名称、版本、许可证等元数据）

我们对文件的理解可能有如下：

1. 项目名称、项目构建版本、许可证的定义；
2. 依赖内容包含`dependencies`和`devDependencies`；
3. 使用`scripts`指定运行脚本的命令。

##### 初始化项目信息

当新建项目的时候，可以使用`npm init`来新增一个配置文件。当然你可以直接使用`npm init -y`来省略输入过程。

```powershell
{
  "name": "zhangyaqi", # 项目名称
  "version": "1.0.0", # 项目版本号（格式：大版本.次要版本.小版本）
  "description": "", # 项目描述信息
  "main": "index.js", # 入口文件
  "directories": {
    "test": "test"
  },
  "scripts": { # 指定运行脚本命令的npm命令行缩写
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [], # 关键词
  "author": "", # 作者
  "license": "ISC" # 许可证
}
```

###### 必备属性（name & version）

package.json 中有很多的配置项，其中必备的两个字段分别是 name 和 version。

###### name 字段

name 字段定义了模块的名称，命名时需要遵循官方的一些规范和建议。

###### version 字段

npm 包中模块版本都需要遵循`SemVer`规范，该规范的标准版本号采用`X.Y.Z`的格式，其中 X、Y 和 Z 均为非负的正数，且禁止在数字前方补零。

1. X 是主版本号（major）：修改了不兼容的 API

2. Y 是次版本号（minor）：新增了向下兼容的功能

3. Z 为修订号（patch）：修正了向下兼容的问题

当摸个版本改动比较大，并非稳定而且可能无法满足预期的兼容性需求时，我们可以发布一个先行版本。先行版本号可以加到`主版本号.次版本号.修订号`的后面，通过 `-` 号连接一连串以句点分隔的标识符合版本编译信息。

1. 内部版本（alpha）
2. 公测版本（beta）
3. 正式版本的候选版本 rc（release candiate）

###### 描述信息以及关键字（description & keywords）

-   `description`字段用于添加模块的描述信息，便于用户了解该模块
-   `keywords`字段用于给模块添加关键字

###### 安装项目依赖（dependencies & devDependencies）

-   `dependencies`字段指定了子项目运行所依赖的模块（生产环境使用），例如 antd、react 等
-   `devDependencies`字段指定了项目开发所需要的模块，例如 webpack、typescript、babel 等

如果一个模块不在文件中，那么可以单独安装这个模块，并使用相应的参数，将其写入 dependencies 和 devDependencies 字段中。

```powershell
# 使用npm安装包

# 写入到dependencies中
npm install <package...> --save
# 写入到devDependencies中
npm install <package...> --save-dev

# 使用yarn安装包类
# 写入到dependencies中
yarn add <package...>
# 写入到devDependencies中
yarn add <package...> --dev
```

###### 终端命令（scripts）

scripts 是 package.json 中的一种元数据功能，它接受一个对象，对象的属性可以通过`npm run`运行的脚本，值为实际运行的命令。例如：

```json
"scripts": {
	"start": "node index.js"
}
```

###### 项目入口（main）

main 字段是 package.json 中的另外一种元数据功能，可以用于指定加载的入口文件。假如你的项目是一个 npm 包，当用户安装你的包后，require('my-module')返回的是 main 字段中所列出文件的 module.exports 属性。

###### 发布文件配置（files）

files 字段用于描述我们使用`npm publish`命令后推送到 npm 服务器的文件列表，如果指定文件夹，则文件夹内的所有内容都会包含进来。例如下：

```json
"files": [
	"dist",
	"lib",
	"es"
]
```

> 当然，可以通过配置一个.npmignore 文件来排除一些文件，防止大量的垃圾文件推送到 npm 上

###### 指定 node 版本（engines）

不同版本的 node 在开发过程中会产生很多奇怪的 bug，因此可以通过 engines 字段来指定项目 node 的版本

```json
"engines": {
	"node": ">= 8.16.0",
	"npm": ">= 6.9.0"
}
```

> 需要注意的是，engines 属性仅起到了一个说明的作用，当用户版本不符合指定值时也不影响依赖的安装的。

###### 自定义命令（bin）

bin 字段用来指定各个内部命令对应的可执行文件的位置，当 package.json 提供了 bin 字段后，即相当于做了一个命令名和本地文件名的映射。

当用户安装带有 bin 字段的包时：

-   如果是全局安装，npm 将会使用符号链接把这些文件连接到`/usr/local/node_modules/.bin/`;
-   如果是本地安装，会链接到`./node_modules/.bin/`

参考文档：

https://mp.weixin.qq.com/s/69BD_3kuZZVl8YA9JLAT4A
