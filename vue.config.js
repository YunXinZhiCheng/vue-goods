module.exports = {
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        utils: '@/utils',
        views: '@/views',
      },
    },
  },
  publicPath: './',
}
