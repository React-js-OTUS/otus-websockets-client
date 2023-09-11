const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ContextReplacementPlugin, DefinePlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('./src/config');

const publicPath = config.PUBLIC_PATH + '/';

const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');

module.exports = {
  entry: './index.tsx',
  context: src,
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      src,
    },
    fallback: { crypto: require.resolve('crypto-browserify'), stream: require.resolve('stream-browserify') },
  },
  output: {
    path: dist,
    publicPath,
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]-[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    new DefinePlugin({
      'process.env.LOCAL': JSON.stringify(process.env.LOCAL),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './favicon.svg',
    }),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en/),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.join(__dirname, 'tsconfig.json'),
      },
    }),
  ],
};
