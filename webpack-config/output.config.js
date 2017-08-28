var dirVars = require('./base/dir-vars.config.js')

module.exports = {
    path: dirVars.buildDir,
    publicPath: '/',
    filename: 'bundle-[name].js'    
};