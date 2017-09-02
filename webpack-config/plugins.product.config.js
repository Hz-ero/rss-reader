const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const dirVars = require('./base/dir-vars.config.js')

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = [
  new UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new CleanWebpackPlugin(['build/main.*.js'], {
    root: dirVars.staticRootDir,
  }),
  new CopyWebpackPlugin([{
    from: dirVars.publicDir,
  }]),
  new HtmlWebpackPlugin({
    title: 'RSS Reader',
    template: dirVars.templateHtml,
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: [
      'vendor.dll.js', 'base.css',
      { path: '/cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css', type: 'css' },
    ],
    append: false,
  }),
  new webpack.DllReferencePlugin({
    context: dirVars.staticRootDir,
    manifest: dirVars.dllManifest,
  }),
  // new BundleAnalyzerPlugin()
]
