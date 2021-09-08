module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // vant插件：按需引入
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
