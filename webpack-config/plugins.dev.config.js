const webpack = require('webpack');
var dirVars = require('./base/dir-vars.config.js')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ 
        url: 'http://localhost:8080' 
    })
]