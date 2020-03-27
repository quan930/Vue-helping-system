const path = require('path')
const webpack = require('webpack')

module.exports = {
    publicPath: '/',   // 根路径  ====》   baseUrl: '/',已废弃
    outputDir: 'dist', // 构建输出目录文件名打包时生成的名字。
    assetsDir: 'assets',   // 静态资源目录（js，css，img，fonts）
    lintOnSave: false,  // 是否开启eslint保存检测，有效值：true || false || ‘error’
    devServer: {
        open: true,      // 运行项目时，是否自动开启新窗口。
        host: 'localhost',  // 默认端口号。
        port: 8081,
        https: false,      // 如果开启就会以https开头。
        hotOnly: false,      //安装模块更好的兼容，不需要配置。
        proxy: {
            // 配置跨域
            '/api': {
                target: 'http://apis.haoservice.com/',  // 配置跨域接口
                ws: true,  // 是否跨域。
                changOrigin: true,// 是否跨域。
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'assets': path.resolve(__dirname, './src/assets'),
                'components': path.resolve(__dirname, './src/components'),
                'views': path.resolve(__dirname, './src/views'),
            }
        },
        plugins: [
            // eslint-disable-next-line no-useless-escape
            new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
        ]
    }
};
