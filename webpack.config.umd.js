var path = require('path');
// var _ = require('lodash');

var config  = require('./webpack.config.base');

// config.externalHelper.externals = {
//   lodash: [
//     'lodash',
//     {
//       map: 'map',
//       assign: 'assign',
//       curry: 'curry',
//       isarray: 'isArray',
//       isfunction: 'isFunction',
//       isobject: 'isObject',
//       isplainobject: 'isPlainObject'
//     }
//   ],
//   redux: 'Redux'
// };

// config.externalHelper.generateExternal = function (toLib, fromLib, to) {
//   var frontend;
//
//   if(!_.isEmpty(to)) {
//     frontend = fromLib + '.' + to;
//   } else {
//     frontend = fromLib;
//   }
//
//   return frontend;
// };

config.output = {
  path: path.join(__dirname, 'dist'),
  filename: 'ng-redux.umd.js',
  libraryTarget: 'umd',
  library: 'ngRedux'
};

config.externals = config.generateExternals(config.externalHelper.externals);

module.exports = config;
