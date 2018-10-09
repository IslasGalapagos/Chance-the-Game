/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  Copyright © 2018 Evgeny Sysoletin. All rights reserved.
*/

const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const {NODE_ENV = 'development'} = process.env;
const isProduction = NODE_ENV === 'production';

const faviconEntries = {
  'android-chrome-192x192': 'android-chrome-192x192.png',
  'android-chrome-256x256': 'android-chrome-256x256.png',
  'apple-touch-icon': 'apple-touch-icon.png',
  browserconfig: 'browserconfig.xml',
  'favicon-16x16': 'favicon-16x16.png',
  'favicon-32x32': 'favicon-32x32.png',
  favicon: 'favicon.ico',
  'mstile-150x150': 'mstile-150x150.png',
  'safari-pinned-tab': 'safari-pinned-tab.svg',
  site: 'site.webmanifest'
};

for (const name in faviconEntries) {
  faviconEntries[name] = `./src/static/favicon/${faviconEntries[name]}`;
}

module.exports = {
  target: 'web',

  mode: NODE_ENV,
  devtool: isProduction ? 'cheap-source-map' : 'eval',

  entry: {
    bundle: './src/',
    normilize: './node_modules/normalize.css/normalize.css',

    ...faviconEntries
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
        test: /favicon\/[\W\w]+\.\w+$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/favicon/[name].[ext]'
          }
        }
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
        ],
        exclude: /favicon\/[\W\w]+\.\w+$/
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],

  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()]
  },

  devServer: {
    hot: true
  }
};
