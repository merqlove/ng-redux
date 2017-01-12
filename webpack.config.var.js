var path = require('path');
var _ = require('lodash/core');

var env = process.env.NODE_ENV;
var config  = require('./webpack.config.base');

config.externalHelper.generateExternal = function (toLib, fromLib, to) {
  var frontend;

  if(!_.isEmpty(to)) {
    frontend = toLib + '.' + to;
  } else {
    frontend = toLib;
  }

  return frontend;
};

config.externals = config.generateExternals(config.externalHelper.externals);

config.output = {
  path: path.join(__dirname, 'dist'),
  filename: env === 'production' ? 'ng-redux.var.min.js' : 'ng-redux.var.js',
  libraryTarget: 'var',
};

module.exports = config;
