const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

// const extractSass = new ExtractTextPlugin({
//   filename: 'assets/css/[name].[hash].css',
//   disable: false
// });

const extractSass = new MiniCssExtractPlugin({
  filename: 'assets/css/[name].[hash].css'
});

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: path.resolve(__dirname, '../src/index.js'),
  resolve: {
    modules: ['./node_modules'],
    alias: {}
  },
  stats: 'minimal',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    stats: {
       // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
      all: false,

      // Add build date and time information
      builtAt: true,

      // `webpack --colors` equivalent
      colors: true,

      // Add errors
      errors: true,

      // Add details to errors (like resolving log)
      errorDetails: true,

      // Add timing information
      timings: true,

      // Add warnings
      warnings: true,
    },
    hot: true
  },
  output: {
    filename: 'assets/js/bundle.[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        enforce: 'pre',
        loaders: ['eslint-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        include: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\/javascripts\/.*\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader?modules', 'postcss-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    }),
    extractSass,
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../static'), to: 'static' }
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: process.env.NODE_ENV !== 'production'
    })
  ]
};
