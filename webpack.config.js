const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const {version} = require('./package.json');

module.exports = (env, argv) => {
    const config = {
        entry: './src/index.tsx',

        output: {
            filename: 'js/[name].[chunkhash:8].js',
            path: path.resolve(__dirname, 'dist'),
        },

        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                title: `Sorting animation ${version}`,
                template: 'src/index.html',
                inject: false
            }),
            new ManifestPlugin({
                seed: {
                    name: 'Sorting animation',
                    version,
                    developer: {
                        name: 'Lin Fang',
                        url: 'http://www.fanglin.me'
                    },
                    icons: [{
                        src: 'images/icon.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }]
                },
                filter: () => false
            })
        ],

        module: {
            rules: [{
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            }, {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.(woff2)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {

                        },
                    },
                ],
            }]
        },

        devServer: {
            contentBase: path.resolve('src'),
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
    };

    if (argv.mode !== 'development') {
        config.devtool = 'none';
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                },
                chunks: 'async',
                minChunks: 1,
                minSize: 30000,
                name: true
            },
            minimizer: [new TerserPlugin()]
        };
    }

    return config;
};