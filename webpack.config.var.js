var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');

var externals = {
  lodash: [
    '_',
    {
      map: 'map',
      assign: 'assign',
      curry: 'curry',
      isarray: 'isArray',
      isfunction: 'isFunction',
      isobject: 'isObject',
      isplainobject: 'isPlainObject'
    }
  ],
  redux: 'Redux'
};

function generateExternal(toLib, fromLib, to) {
  var frontend, backend;

  if(to !== null) {
    frontend = toLib + '.' + to;
    backend = fromLib + '.' + to;
  } else {
    frontend = toLib;
    backend = fromLib;
  }

  return {
    amd: backend,
    root: frontend,
    var: frontend,
    commonjs: backend
  };
}

function generateExternals(externals) {
  return _.reduce(externals, function(acc, methods, lib) {
    var toLib = methods;
    if(_.isString(methods)) {
      acc[lib] = generateExternal(toLib, lib);
    } else {
      toLib = methods[0];
      _.each(methods[1], function(to, from){
        acc[lib + '.' + from] = generateExternal(toLib, lib, to);
      });
    }
    return acc;
  }, {});
}

module.exports = {
    entry: [
      './lib'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'ng-redux.var.js',
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
    externals: generateExternals(externals)
};
