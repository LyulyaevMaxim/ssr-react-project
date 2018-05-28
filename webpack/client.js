const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');

const mode = process.env.NODE_ENV,
    isDev = mode === 'development';

const root = path.resolve(__dirname, '../');
const assetsPath = 'assets';

module.exports = merge(common, {
    mode: mode,
    name: 'client',
    target: 'web',

    entry: [
        isDev && 'webpack-hot-middleware/client',
        path.join(__dirname, '../src/client/index')
    ].filter(Boolean),

    output: {
        filename: 'app.client.js',
        chunkFilename: `[name]${isDev ? '' : '.[chunkhash]'}.js`
    },

    plugins: [
        new CleanWebpackPlugin([`${root}/public/${assetsPath}`], {
            allowExternal: true
        }),
        isDev && new webpack.HotModuleReplacementPlugin(),
        !isDev && new StatsWebpackPlugin('stats.json'),
        !isDev &&
            new MiniCssExtractPlugin({
                filename: `css/[name].[contenthash].css`,
                chunkFilename: `css/[id].[contenthash].css`
            })
        // !isDev && new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
    ].filter(Boolean),

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]-[hash:base64:4]',
                            sourceMap: isDev ? true : false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: { path: 'postcss.config.js' },
                            sourceMap: isDev ? 'inline' : false
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        runtimeChunk: false,
        namedModules: true,
        noEmitOnErrors: true,
        concatenateModules: true,
        minimize: !isDev,
        splitChunks: {
            automaticNameDelimiter: '-',
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new (require('uglifyjs-webpack-plugin'))({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    mangle: true
                    // compress: false
                }
            }),
            new (require('optimize-css-assets-webpack-plugin'))({
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    zindex: {}
                }
            })
        ]
    }
});
