
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/app/app.tsx',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/templates/index.html'
        }),
        new MiniCssExtractPlugin(),
    ],
    output: {
        path: __dirname + '/public',
        filename: 'build/[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
              test: /\.less$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
                },
                {
                  loader: 'css-loader', // translates CSS into CommonJS
                },
                {
                  loader: 'less-loader', // compiles Less to CSS
                },
              ],
            },
        ]
    },
    devServer: {
        proxy: {
            '/socket.io': {
                target: 'http://localhost:8085/',
                ws: true,
            }
        }
    }
}
