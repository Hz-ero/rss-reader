const dirVars = require('./base/dir-vars.config.js')

module.exports = {
  historyApiFallback: true,
  hot: true,
  inline: true,
  contentBase: dirVars.publicDir,
  port: 8080,
  stats: { colors: true },
  proxy: {
    '/rss/ithome': {
      target: 'https://www.ithome.com',
      secure: false,
      changeOrigin: false,
      pathRewrite: {
        '^/rss/ithome': '/rss/',
      },
    },
    '/rss/36kr': {
      target: 'http://36kr.com',
      changeOrigin: true,
      pathRewrite: {
        '^/rss/36kr': '/feed',
      },
    },
    '/rss/ifanr': {
      target: 'http://www.ifanr.com',
      changeOrigin: true,
      pathRewrite: {
        '^/rss/ifanr': '/feed',
      },
    },
  },
}
