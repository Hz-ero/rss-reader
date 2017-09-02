const dirVars = require('./webpack-config/base/dir-vars.config.js')

const webpack = require('webpack')

const vendors = [
  'react',
  'react-dom',
  'react-loadable',
  'prop-types',
  'redux',
  'react-redux',
  'react-router-dom',
  'immutable',
  'redux-immutable',
  'cheerio',
  'xml2js',
  'semantic-ui-react',
];

module.exports = {
  entry: {
    vendor: vendors,
  },
  output: {
    path: dirVars.publicDir,
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: dirVars.dllManifest,
      name: '[name]_[hash]',
      context: __dirname,
    }),
  ],
}
