const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  filenameHashing: false,
  productionSourceMap: false,
  outputDir: '../client_packages/spa',
  // configureWebpack: {
  //   devServer: {
  //     overlay: false
  //   }
  // }
})
