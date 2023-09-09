const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  productionSourceMap: false,
  filenameHashing: true,
  lintOnSave: true,
  runtimeCompiler: true,
  css: {
    extract: false,
    sourceMap: false
  },
  configureWebpack: {
    cache: {
      type: 'filesystem', // Используйте тип 'filesystem' для инкрементальной пересборки
      buildDependencies: {
        config: [__filename] // Используйте эту строку, чтобы при изменении конфигурации Webpack также пересобирать проект
      }
    },
    optimization: {
      splitChunks: false
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .set('parser', { dataUrlCondition: { maxSize: 0 } })
  }
})
