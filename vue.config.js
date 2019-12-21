const path = require('path')
// const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: '/',
  //   publicPath: '/student/',
  transpileDependencies: ['resize-detector', 'ant-design-vue'],

  // configureWebpack: {
  //   plugins: [
  //     // Ignore all locale files of moment.js
  //     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  //   ]
  // },

  chainWebpack: config => {
    config.resolve.alias
      .set('public', resolve('public'))
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088', // 后端服务器
        //   target: 'http://192.168.207.166:8081', // 后端测试服务器
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/minipro/user': ''
        }
      }
    }
  }
}
