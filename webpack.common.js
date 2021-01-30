const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /^(?!.*\.spec\.js$).*\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: false,
      hash: true,
      inject: false,
      title: 'Request & Refound',
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
