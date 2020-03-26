const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const { spawn } = require('child_process');
const base = require('./webpack.base.config');

const defaultInclude = path.resolve(__dirname, 'src');

module.exports = merge.smart(base, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
        include: defaultInclude,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    before() {
      spawn('electron', ['.'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', (code) => process.exit(0))
        .on('error', (spawnError) => console.error(spawnError));
    },
  },
});
