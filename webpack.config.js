const webpack = require('webpack');
const path = require('path');

const {NODE_ENV = 'development'} = process.env;

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',

  mode: NODE_ENV,
  devtool: NODE_ENV === 'production' ? 'cheap-source-map' : 'eval',

  entry: [
    './src/'
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['react-hot-loader/babel']
            }
          },
          'ts-loader'
        ],
        sideEffects: false
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],

  devServer: {
    hot: true
  }
};
