var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
      './lib'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'ng-redux.amd.js',
      libraryTarget: 'var'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
    ],
    module: {loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: ['./lib'],
      exclude: /node_modules/,
      query: {
        presets: ['es2015-loose']
      }
    }]},
    externals: {
      'lodash.map': '_.map',
      'lodash.assign': '_.assign',
      'lodash.curry': '_.curry',
      'lodash.isarray': '_.isArray',
      'lodash.isfunction': '_.isFunction',
      'lodash.isobject': '_.isObject',
      'lodash.isplainobject': '_.isPlainObject',
      'redux': 'Redux'
      // 'lodash.map': {amd: 'lodash.map', root: '_.map', commonjs: 'lodash.map', commonjs: 'lodash.map'},
      // 'lodash.assign': {amd: '_.assign', root: '_.assign', commonjs: 'lodash.assign'},
      // 'lodash.curry': {amd: 'lodash.curry', root: '_.curry', commonjs: '_.curry'},
      // 'lodash.isarray': {amd: 'lodash.isArray', root: '_.isArray', commonjs: 'lodash.isArray'},
      // 'lodash.isfunction': {amd: 'lodash.isFunction', root: '_.isFunction', commonjs: 'lodash.isFunction'},
      // 'lodash.isobject': {amd: 'lodash.isObject', root: '_.isObject', commonjs: '_.isObject'},
      // 'lodash.isplainobject': {amd: 'lodash.isPlainObject', root: '_.isPlainObject', commonjs: 'lodash.isPlainObject'},
      // 'redux': {amd: 'redux', root: 'Redux', commonjs: 'redux'}
    },
};
