const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const {version} = require('./package.json');

module.exports = (env, argv) => {
    const config = {
        entry: './src/index.tsx',

        devtool: 'source-map',

        output: {
            filename: 'js/[name].[chunkhash:8].js',
            path: path.resolve(__dirname, 'dist'),
        },

        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                title: `algoRYTHM ${version}`,
                template: 'src/index.html',
                inject: false
            }),
            new ManifestPlugin({
                seed: {
                    name: 'algoRYTHM',
                    version,
                    developer: {
                        name: 'Lin Fang',
                        url: 'https://www.fanglin.me'
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
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }, {
                test: /\.(woff2)$/i,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            }, {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
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
                        test: /([\\/]node_modules[\\/]|[\\/]fonts)/,
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
