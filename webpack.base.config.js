const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
  target: 'electron-renderer',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: [{ loader: 'babel-loader' }],
        include: defaultInclude,
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          { loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' },
        ],
        include: defaultInclude,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
