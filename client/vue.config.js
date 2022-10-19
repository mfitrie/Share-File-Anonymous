const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.PUBLIC_URL || '/',
  devServer: {
    // proxy: 'https://anonfiles.com/',
    proxy: {
      '/download': {
        target: 'https://anonfiles.com/',
        pathRewrite: {'^/download' : ''}
      },
      '/api': {
        target: 'https://api.anonfiles.com/v2/file/',
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      },
    }
  }
})
