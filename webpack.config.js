module.exports = {
    entry: './src/gameRunner.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /src\/.+\.js$/, loader: 'babel-loader?plugins=babel-plugin-rewire' }
        ]
    }
}