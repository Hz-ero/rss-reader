module.exports = {
    devServer: require('./webpack-config/devServer.config.js'),
    
    entry: require('./webpack-config/entry.config.js'),

    output: require('./webpack-config/output.config.js'),

    module: require('./webpack-config/module.config.js'),

    resolve: require('./webpack-config/resolve.config.js'),

    plugins: require('./webpack-config/plugins.dev.config.js'),
};