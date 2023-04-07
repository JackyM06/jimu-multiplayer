const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: {
        'jimu-heatmap': path.resolve(__dirname, './src/run-render.ts'),
    },
    output: {
        filename: 'jimu-heatmap.[hash].js',
        path: path.resolve(__dirname, 'dist'),
        libraryExport: 'default',
    },
    optimization: {
        splitChunks: {
            minSize: 3e10,
            maxAsyncRequests: 1,
        },
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.[tj]s$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        root: __dirname,
                    },
                },
            },
            {
                test: /\.less$/i,
                exclude: /node_modules/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': process.env.NODE_ENV !== 'production',
            'process.env.JIMU_ENV': process.env.JIMU_ENV || 'production',
        }),
    ],
};
