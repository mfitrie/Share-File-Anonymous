const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '',
  devServer: {
    proxy: 'https://anonfiles.com/',
  }
})
