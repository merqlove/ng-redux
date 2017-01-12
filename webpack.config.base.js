var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');

var env = process.env.NODE_ENV;

var externalHelper = {
  externals: {
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
  },

  generateExternal: function(toLib, fromLib, to) {
    var frontend, backend;

    if(!_.isEmpty(to)) {
      frontend = toLib + '.' + to;
      backend = fromLib + '.' + to;
    } else {
      frontend = toLib;
      backend = fromLib;
    }

    return {
      amd: backend,
      root: frontend,
      commonjs2: backend,
      commonjs: backend
    };
  }
};

var generateExternals = function(externals) {
  return _.reduce(externals, function(acc, methods, lib) {
    var toLib = methods;
    if(_.isString(methods)) {
      acc[lib] = externalHelper.generateExternal(toLib, lib);
    } else {
      toLib = methods[0];
      _.each(methods[1], function(to, from){
        acc[lib + '.' + from] = externalHelper.generateExternal(toLib, lib, to);
      });
    }
    return acc;
  }, {});
};

var config = {
    externalHelper: externalHelper,
    generateExternals: generateExternals,

    entry: [
      './lib/index'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'ng-redux.js'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ],
    module: {loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: ['./lib'],
      exclude: /node_modules/,
      query: {
        presets: ['es2015-loose']
      }
    }]},
    resolve: {
      modules: [
        path.join(__dirname, 'lib'),
        path.join(__dirname, 'node_modules')
      ]
    }
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        screw_ie8: false
      },
      mangle: {
        screw_ie8: false
      },
      output: {
        screw_ie8: false
      }
    })
  )
}

module.exports = config;
