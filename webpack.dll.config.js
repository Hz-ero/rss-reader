var path = require("path"),
    webpack = require("webpack");
var vendors = [
    "core.js",
    'react',
    'react-dom',
    'react-loadable',
    'prop-types',
    'redux',
    'react-redux',
    'react-router-dom',
    'immutable',
    'redux-immutable'
];

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].dll.js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "build", "manifest.json"),
            name: "[name]_[hash]",
            context: __dirname
        })
    ]
}; 