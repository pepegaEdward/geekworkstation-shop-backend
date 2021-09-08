const webpack = require('webpack')

module.exports = {
    target: 'node',
    mode: 'production',
    plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
}