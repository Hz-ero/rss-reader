const webpack = require('webpack');
var dirVars = require('./base/dir-vars.config.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = [
    new uglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.DllReferencePlugin({
        context: dirVars.staticRootDir,
        manifest: require('../build/manifest.json')
    }),
    new BundleAnalyzerPlugin()
]