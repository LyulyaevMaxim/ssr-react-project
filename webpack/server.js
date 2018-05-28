const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const nodeExternals = require('./scripts/node-externals');

const mode = process.env.NODE_ENV,
    isDev = mode === 'development';

module.exports = merge(common, {
    mode: mode,
    name: 'server',
    target: 'node',
    externals: nodeExternals,

    entry: [
        !isDev && 'babel-polyfill',
        join(__dirname, '../src/server/index')
    ].filter(Boolean),

    output: {
        filename: 'app.server.js',
        libraryTarget: 'commonjs2'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'css-loader/locals',
                        options: {
                            // importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]-[hash:base64:4]'
                            // sourceMap: isDev ? true : false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // ident: 'postcss',
                            config: {
                                path: 'postcss.config.js' //`${root}/configs/postcss.config.js`
                            }
                            // sourceMap: isDev ? 'inline' : false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
});
