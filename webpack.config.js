/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

const ENV = process.env.NODE_ENV || 'dev';

const isProd = ENV != 'dev';

const plugins = [];

if (isProd) {
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

var VERSION = JSON.stringify(require('./package.json').version).replace(/["']/g, '');

module.exports = env => {
  console.log(
    `|******************* NODE_ENV: ${ENV.toUpperCase()} #### VERSION: ${VERSION} ***********************************|`
  );

  return {
    // entry: {
    //   application: path.join(__dirname, 'src/index.js'),
    //   vendor: ['react', 'react-dom'],
    // },
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      filename: 'react-tools.js',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.js$|\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
    plugins: plugins,
    optimization: {
      minimize: isProd,
      // runtimeChunk: true,
      // splitChunks: {
      //   cacheGroups: {
      //     commons: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendor',
      //       chunks: 'all',
      //     },
      //   },
      // },
    },
    externals: {
      react: 'commonjs react',
    },
  };
};
