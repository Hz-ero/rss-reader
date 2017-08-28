var dirVars = require('./base/dir-vars.config.js')

module.exports = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: dirVars.buildDir,
    port: 8080,
    proxy: {
        "/feed": {
            target: "http://www.ifanr.com",
            changeOrigin: true
        }
    }
}