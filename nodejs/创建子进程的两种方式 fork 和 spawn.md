# child_process 创建子进程的两种方式

## spawn 创建子进程

### 用途

**spawn** 用于创建一个新子进程来运行一个命令，类似于在 shell 中运行命令。它通常用于运行外部程序或脚本。

### 使用场景

通常在需要执行外部程序或脚本时使用，尤其是非 Node.js 的进程。这可能包括运行 Python 脚本、执行 shell 命令或运行已编译的二进制文件。

### 通讯方式

与生成的子进程之间的通信是通过标准输入（stdin）、标准输出（stdout）和标准错误（stderr）流来完成的。你可以监听这些流来获取进程的输出或错误信息。

### 代码示例

```javascript
const {spawn} = require('child_process');

// 使用 `spawn` 创建一个新进程来运行 `ls` 命令
const ls = spawn('ls', ['-lh', '/usr']);

// 监听并输出子进程的标准输出
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

// 监听并输出子进程的标准错误
ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

// 监听子进程的关闭事件
ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
```

## fork 创建子进程

### 用途

**fork** 是 **spawn** 的一种特殊情况，专门用于创建新的 Node.js 进程。它用于生成新的 Node.js 实例，并允许父进程和子进程之间进行 IPC（进程间通信）。

### 使用场景

特别适用于需要在单独的进程中运行另一个 Node.js 脚本或模块的情况。它通常用于需要执行 CPU 密集型操作或并发运行任务的场景，这些任务可能会阻塞主进程的事件循环。

### 通讯方式

与 **spawn** 不同，**fork** 会在父进程和子进程之间设置一个通信通道，使用 **child.send** 和 **process.on('message')** 进行消息传递。这使得在进程之间发送和接收消息变得非常容易。

### 代码示例

```javascript
const {fork} = require('child_process');

// 使用 `fork` 创建一个新的 Node.js 进程来运行脚本
const child = fork('child_script.js');

// 监听子进程发送的消息
child.on('message', (message) => {
    console.log('Message from child:', message);
});

// 发送消息给子进程
child.send({hello: 'world'});
```

## 主要去呗

| 特性         | spawn                           | fork                                            |
| ------------ | ------------------------------- | ----------------------------------------------- |
| 用途         | 运行任何命令或可执行程序        | 运行 Node.js 脚本/模块                          |
| 通讯方式     | 标准流（stdin、stdout、stderr） | IPC 通道（process.send、process.on('message')） |
| 使用场景     | 运行 shell 命令、外部程序       | 在单独进程中运行 Node.js 脚本                   |
| Node.js 环境 | 没有特别为 Node.js 设置环境     | 继承父进程的 Node.js 环境                       |
| 内存共享     | 进程之间不共享内存              | 不共享内存；独立的 V8 实例                      |
