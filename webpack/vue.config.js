const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

function resolve(src) {
    return path.resolve(__dirname, src);
}

/**
 * TODO: 当使用vue inspect > output.js 导出配置文件的时候，这里的解析操作会导致错误。
 * 尝试了添加了 if 判断但是没有用
 */
const npm_config_argv = JSON.parse(process.env.npm_config_argv);
const commandName = npm_config_argv.original[0];

/**
 * 一些基本的配置内容
 */

// 生产环境是否需要sourceMap
const isOpenProdSourceMap = true;

// 是否开启运行时的编译器的vue版本
// https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
const isOpenRuntimeCompiler = false;

// 在百度的微云部署时，经常会出现二级目录的情况，所以这里你可能需要根据当前环境变量设置共有path名
const publicPath = isDev ? '/' : '/onlineName/';

/**
 * 基础配置项
 * see: https://cli.vuejs.org/zh/config/#vue-config-js
 */
const defaultConfigs = {
    publicPath,
    productionSourceMap: isOpenProdSourceMap,
    runtimeCompiler: isOpenRuntimeCompiler,
};

/**
 * 对webpack的更细粒度的修改
 * see: https://cli.vuejs.org/zh/guide/webpack.html#链式操作-高级
 */
const chainWebpack = (config) => {
    // 关闭index.html中的prefetch的功能，注释掉之后可以在index.html中查看引入策略
    config.plugins.delete('prefetch');

    // 文件分析工具，并且判断只有在执行分析命令的时候才打开这个服务。
    if (commandName === 'analyzer') {
        config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
};

/**
 * 自定义webpack的配置，会被webpack-merge到最终的配置中
 */
const configureWebpack = (config) => {
    // 为生产环境配置的内容
    config.optimization = {
        // https://webpack.docschina.org/plugins/split-chunks-plugin/#optimizationsplitchunks
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // 单独打包的时候，这里可以使用enforce来强制把vue打包出来。
                // vue: {
                //     name: 'vue',
                //     test: /[\\/]node_modules[\\/]vue[\\/]/,
                //     priority: 20,
                //     enforce: true,
                // },
                'vue-router': {
                    name: 'vue-router',
                    test: /[\\/]node_modules[\\/]vue-router[\\/]/,
                    priority: 20,
                },
                'element-plus': {
                    name: 'element-plus',
                    test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                    priority: 20,
                },
                echarts: {
                    name: 'echarts',
                    test: /[\\/]node_modules[\\/]echarts[\\/]/,
                    priority: 20,
                },
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'all',
                },
                /**
                 * 之前打包的时候出现一个问题：就是怎么打都会出现数字文件。
                 * 这个问题可以看下自己的cacheGroup的配置项，大概率是没有命中你自己的所有的配置项，所以webpack才会自己生成一个chunkId作为文件名。
                 */
                commons: {
                    name: 'commons',
                    test: resolve('src'),
                    minChunks: 2,
                    priority: 5,
                    reuseExistingChunk: true,
                },
            },
        },
    };
    config.output.filename = 'js/[name].[contenthash:8].js';
    config.output.chunkFilename = 'js/[name].[contenthash:8].js';
};

/**
 * 开发模式下的配置项
 */
const devServer = {
    proxy: {
        '/api/': {
            target: 'http://ait.dev.weiyun.baidu.com/',
            headers: {
                // 如果需要传递cookie，可以在此添加
                // Cookie: cookies
            },
        },
    },
};

module.exports = {
    ...defaultConfigs,
    chainWebpack,
    configureWebpack,
    devServer,
};
