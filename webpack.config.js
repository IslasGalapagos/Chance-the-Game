const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const {NODE_ENV = 'development'} = process.env;
const isProduction = NODE_ENV === 'production';

module.exports = {
  target: 'web',

  mode: NODE_ENV,
  devtool: isProduction ? 'cheap-source-map' : 'eval',

  entry: {
    bundle: './src/',
    normilize: './node_modules/normalize.css/normalize.css'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isProduction ? '[name].[hash].js' : '[name].js'
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
        sideEffects: false,
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {cleanupAttrs: true},
                {removeMetadata: true},
                {removeTitle: true},
                {removeDesc: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false}
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      // TODO: remove normilize.js injection
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css'
    })
  ],

  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()]
  },

  devServer: {
    hot: true
  }
};
