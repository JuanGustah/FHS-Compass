const path= require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    devServer: {
        static: {
            directory: path.join(__dirname)
        },
        devMiddleware: {
            writeToDisk: true,
        }
    },
    output: {
        filename: 'bundle.js',
        // path: path.resolve(__dirname),
        // publicPath: '/dist/'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}