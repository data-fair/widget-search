module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: config => {
    config.output.filename = process.env.VUE_CLI_MODERN_BUILD ? 'search-widget-modern.js' : 'search-widget.js'
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
