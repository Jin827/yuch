const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  entry: [
    'babel-register',
    'babel-runtime/regenerator',
    // activate HMR for React
    'react-hot-loader/patch',
    // bundle the client for webpack-hot-middleware and connect to the provided endpoint
    'webpack-hot-middleware/client?reload=true',
    './client/index.js',
  ],
  devServer: {
    publicPath: '/',
    contentBase: 'dist',
    overlay: true,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      reasons: true,
      chunks: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],
};

module.exports = merge(baseConfig, config);
