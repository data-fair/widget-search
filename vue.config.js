module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: config => {
    config.output.filename = process.env.VUE_CLI_MODERN_BUILD ? 'widget.js' : 'widget-legacy.js'
  },
  css: {
    extract: {
      filename: 'widget.css',
    },
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
}
