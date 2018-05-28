const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
console.info(`mode: ${mode}, isDev: ${isDev}`);

const root = path.resolve(__dirname, '../');
const initialPath = '/'; //isDev ? '/' : require('../src/js/constants.json').initialPath
const assetsPath = 'assets';

module.exports = {
    output: {
        path: path.join(__dirname, '../public/assets'),
        publicPath: initialPath
    },

    devtool: isDev ? 'inline-source-map' : 'none',

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        modules: [
            path.join(__dirname, '../node_modules'),
            path.join(__dirname, '../src')
        ]
    },

    plugins: [
        // new CopyWebpackPlugin([
        //     {
        //         context: `${root}/src/img`,
        //         from: '**/*',
        //         to: 'img'
        //     }
        // ]),
        new WriteFilePlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, '../src'),
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader?cacheDirectory'
                }
            },
            {
                test: /\.(woff2|woff)$/,
                include: `${root}/src/fonts`,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: `fonts`,
                            publicPath: `${initialPath}${assetsPath}/fonts`
                        }
                    }
                ]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                include: `${root}/src/img`,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: `img`,
                            publicPath: `${initialPath}img`
                        }
                    }
                ].filter(Boolean)
            }
        ]
    }
};
