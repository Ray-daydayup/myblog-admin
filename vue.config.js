module.exports = {
  transpileDependencies: ['vuetify'],
  productionSourceMap: false,
  devServer: {
    proxy: 'http://raydaydayup.cn:3000'
  }
}
