// ./webpack.config.js

const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        index: "./src/index.js",
        second: "./src/second.js"
    },
    output: {
        filename: "bundle/[name].[hash].js",
        path: path.resolve(__dirname + "/build")
    },
    optimization: {
        minimizer: [new TerserJSPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                }
            }),
              new OptimizeCSSAssetsPlugin({})
             ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                // Merge all the CSS into one file
                styles: {
                    name: 'styles',
                    test: /common\.css$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true,
                }
            }
        }
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: ["/node_modules"],
                use: ['babel-loader'],
      },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "/"
                    }
                }, 'css-loader']
      },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
          }
        ]
      },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'images/'
                    }
                }
        }
    ]
    },
    plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
            chunks: ['index'],
            template: './src/index.html',
            filename: 'index.html'
        }),
     new HtmlWebPackPlugin({
            chunks: ['second'],
            template: './src/second.html',
            filename: 'second.html'
        }),
    new MiniCssExtractPlugin({
            filename: "bundle/[name].[hash].css"
        }),
    new CopyWebpackPlugin([
            {
                from: './src/library/external_sample.js',
                to: 'library/external_sample.js'
        }
    ])
  ]
};
