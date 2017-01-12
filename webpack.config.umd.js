var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
      './lib'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'ng-redux.umd.js',
      libraryTarget: 'umd'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
    ],
    module: {loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: ['./lib'],
      query: {
        presets: ['es2015-loose']
      }
    }]},
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({whitelist: ['invariant'], importType: 'bower'})], // in order to ignore all modules in node_modules folder
};
