const dirVars = require('./base/dir-vars.config.js')

module.exports = {
  historyApiFallback: true,
  hot: true,
  inline: true,
  contentBase: dirVars.publicDir,
  port: 8080,
  stats: { colors: true },
  proxy: {
    '/fetch/ithome': {
      target: 'https://www.ithome.com',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/fetch/ithome': '/rss/'
      }
    },
    '/fetch/36kr': {
      target: 'http://36kr.com',
      changeOrigin: true,
      pathRewrite: {
        '^/fetch/36kr': '/feed'
      }
    },
    '/fetch/ifanr': {
      target: 'http://www.ifanr.com',
      changeOrigin: true,
      pathRewrite: {
        '^/fetch/ifanr': '/feed'
      }
    }
  }
}
