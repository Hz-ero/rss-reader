const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

module.exports = [
  new webpack.HotModuleReplacementPlugin(),
  new OpenBrowserPlugin({
    url: 'http://localhost:8080',
  }),
  new HtmlWebpackPlugin({
    title: 'RSS Reader',
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: [
      'base.css',
      { path: '/cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css', type: 'css' },
    ],
    append: false,
  }),
]
