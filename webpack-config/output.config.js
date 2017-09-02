const dirVars = require('./base/dir-vars.config.js')

module.exports = {
  path: dirVars.buildDir,
  publicPath: '/',
  filename: '[name].[hash].js',
  library: '[name]_[hash]',
}
