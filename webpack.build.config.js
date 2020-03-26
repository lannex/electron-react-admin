const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.base.config');

const defaultInclude = path.resolve(__dirname, 'src');

module.exports = merge.smart(base, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: defaultInclude,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'bundle.css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BabiliPlugin(),
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  },
});
