module.exports = {
  publicPath: './',
  outputDir: 'dist',
  runtimeCompiler: true,
  transpileDependencies: ['vuetify'],
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://raydaydayup.cn:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
