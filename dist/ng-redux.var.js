/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ((undefined) !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Redux;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(8), __webpack_require__(9), __webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports, require('../utils/shallowEqual'), require('../utils/wrapActionCreators'), require('invariant'), require('lodash'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports, global.shallowEqual, global.wrapActionCreators, global.invariant, global.lodash);
	    global.connector = mod.exports;
	  }
	})(this, function (module, exports, _shallowEqual, _wrapActionCreators, _invariant, _lodash) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = Connector;

	  var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	  var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

	  var _invariant2 = _interopRequireDefault(_invariant);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  var defaultMapStateToTarget = function defaultMapStateToTarget() {
	    return {};
	  };
	  var defaultMapDispatchToTarget = function defaultMapDispatchToTarget(dispatch) {
	    return { dispatch: dispatch };
	  };

	  function Connector(store) {
	    return function (mapStateToTarget, mapDispatchToTarget) {

	      var finalMapStateToTarget = mapStateToTarget || defaultMapStateToTarget;

	      var finalMapDispatchToTarget = (0, _lodash.isPlainObject)(mapDispatchToTarget) ? (0, _wrapActionCreators2.default)(mapDispatchToTarget) : mapDispatchToTarget || defaultMapDispatchToTarget;

	      (0, _invariant2.default)((0, _lodash.isFunction)(finalMapStateToTarget), 'mapStateToTarget must be a Function. Instead received %s.', finalMapStateToTarget);

	      (0, _invariant2.default)((0, _lodash.isPlainObject)(finalMapDispatchToTarget) || (0, _lodash.isFunction)(finalMapDispatchToTarget), 'mapDispatchToTarget must be a plain Object or a Function. Instead received %s.', finalMapDispatchToTarget);

	      var slice = getStateSlice(store.getState(), finalMapStateToTarget, false);
	      var isFactory = (0, _lodash.isFunction)(slice);

	      if (isFactory) {
	        finalMapStateToTarget = slice;
	        slice = getStateSlice(store.getState(), finalMapStateToTarget);
	      }

	      var boundActionCreators = finalMapDispatchToTarget(store.dispatch);

	      return function (target) {

	        (0, _invariant2.default)((0, _lodash.isFunction)(target) || (0, _lodash.isObject)(target), 'The target parameter passed to connect must be a Function or a object.');

	        //Initial update
	        updateTarget(target, slice, boundActionCreators);

	        var unsubscribe = store.subscribe(function () {
	          var nextSlice = getStateSlice(store.getState(), finalMapStateToTarget);
	          if (!(0, _shallowEqual2.default)(slice, nextSlice)) {
	            slice = nextSlice;
	            updateTarget(target, slice, boundActionCreators);
	          }
	        });
	        return unsubscribe;
	      };
	    };
	  }

	  function updateTarget(target, StateSlice, dispatch) {
	    if ((0, _lodash.isFunction)(target)) {
	      target(StateSlice, dispatch);
	    } else {
	      (0, _lodash.assign)(target, StateSlice, dispatch);
	    }
	  }

	  function getStateSlice(state, mapStateToScope) {
	    var shouldReturnObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	    var slice = mapStateToScope(state);

	    if (shouldReturnObject) {
	      (0, _invariant2.default)((0, _lodash.isPlainObject)(slice), '`mapStateToScope` must return an object. Instead received %s.', slice);
	    } else {
	      (0, _invariant2.default)((0, _lodash.isPlainObject)(slice) || (0, _lodash.isFunction)(slice), '`mapStateToScope` must return an object or a function. Instead received %s.', slice);
	    }

	    return slice;
	  }
	  module.exports = exports['default'];
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports);
	    global.digestMiddleware = mod.exports;
	  }
	})(this, function (module, exports) {
	  "use strict";

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = digestMiddleware;
	  function digestMiddleware($rootScope) {
	    return function (store) {
	      return function (next) {
	        return function (action) {
	          $rootScope.$evalAsync(next(action));
	        };
	      };
	    };
	  }
	  module.exports = exports["default"];
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports, require('./connector'), require('invariant'), require('redux'), require('./digestMiddleware'), require('lodash'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports, global.connector, global.invariant, global.redux, global.digestMiddleware, global.lodash);
	    global.ngRedux = mod.exports;
	  }
	})(this, function (module, exports, _connector, _invariant, _redux, _digestMiddleware, _lodash) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = ngReduxProvider;

	  var _connector2 = _interopRequireDefault(_connector);

	  var _invariant2 = _interopRequireDefault(_invariant);

	  var _digestMiddleware2 = _interopRequireDefault(_digestMiddleware);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  };

	  var typeIs = (0, _lodash.curry)(function (type, val) {
	    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === type;
	  });
	  var isObject = typeIs('object');
	  var isString = typeIs('string');

	  function ngReduxProvider() {
	    var _reducer = undefined;
	    var _middlewares = undefined;
	    var _storeEnhancers = undefined;
	    var _initialState = undefined;
	    var _reducerIsObject = undefined;

	    this.createStoreWith = function (reducer, middlewares, storeEnhancers, initialState) {
	      (0, _invariant2.default)((0, _lodash.isFunction)(reducer) || isObject(reducer), 'The reducer parameter passed to createStoreWith must be a Function or an Object. Instead received %s.', typeof reducer === 'undefined' ? 'undefined' : _typeof(reducer));

	      (0, _invariant2.default)(!storeEnhancers || (0, _lodash.isArray)(storeEnhancers), 'The storeEnhancers parameter passed to createStoreWith must be an Array. Instead received %s.', typeof storeEnhancers === 'undefined' ? 'undefined' : _typeof(storeEnhancers));

	      _reducer = reducer;
	      _reducerIsObject = isObject(reducer);
	      _storeEnhancers = storeEnhancers;
	      _middlewares = middlewares || [];
	      _initialState = initialState;
	    };

	    this.$get = function ($injector) {
	      var resolveMiddleware = function resolveMiddleware(middleware) {
	        return isString(middleware) ? $injector.get(middleware) : middleware;
	      };

	      var resolvedMiddleware = (0, _lodash.map)(_middlewares, resolveMiddleware);

	      var resolveStoreEnhancer = function resolveStoreEnhancer(storeEnhancer) {
	        return isString(storeEnhancer) ? $injector.get(storeEnhancer) : storeEnhancer;
	      };

	      var resolvedStoreEnhancer = (0, _lodash.map)(_storeEnhancers, resolveStoreEnhancer);

	      if (_reducerIsObject) {
	        (function () {
	          var getReducerKey = function getReducerKey(key) {
	            return isString(_reducer[key]) ? $injector.get(_reducer[key]) : _reducer[key];
	          };

	          var resolveReducerKey = function resolveReducerKey(result, key) {
	            var _assign;

	            return (0, _lodash.assign)({}, result, (_assign = {}, _assign[key] = getReducerKey(key), _assign));
	          };

	          var reducersObj = Object.keys(_reducer).reduce(resolveReducerKey, {});

	          _reducer = (0, _redux.combineReducers)(reducersObj);
	        })();
	      }

	      var finalCreateStore = resolvedStoreEnhancer ? _redux.compose.apply(undefined, resolvedStoreEnhancer)(_redux.createStore) : _redux.createStore;

	      //digestMiddleware needs to be the last one.
	      resolvedMiddleware.push((0, _digestMiddleware2.default)($injector.get('$rootScope')));

	      var store = _initialState ? _redux.applyMiddleware.apply(undefined, resolvedMiddleware)(finalCreateStore)(_reducer, _initialState) : _redux.applyMiddleware.apply(undefined, resolvedMiddleware)(finalCreateStore)(_reducer);

	      return (0, _lodash.assign)({}, store, { connect: (0, _connector2.default)(store) });
	    };

	    this.$get.$inject = ['$injector'];
	  }
	  module.exports = exports['default'];
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports, require('./components/ngRedux'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports, global.ngRedux);
	    global.index = mod.exports;
	  }
	})(this, function (module, exports, _ngRedux) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _ngRedux2 = _interopRequireDefault(_ngRedux);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  exports.default = angular.module('ngRedux', []).provider('$ngRedux', _ngRedux2.default).name;
	  module.exports = exports['default'];
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports);
	    global.shallowEqual = mod.exports;
	  }
	})(this, function (module, exports) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = shallowEqual;
	  function shallowEqual(objA, objB) {
	    if (objA === objB) {
	      return true;
	    }

	    /* $$hashKey is added by angular when using ng-repeat, we ignore that*/
	    var keysA = Object.keys(objA).filter(function (k) {
	      return k !== '$$hashKey';
	    });
	    var keysB = Object.keys(objB).filter(function (k) {
	      return k !== '$$hashKey';
	    });

	    if (keysA.length !== keysB.length) {
	      return false;
	    }

	    // Test for A's keys different from B.
	    var hasOwn = Object.prototype.hasOwnProperty;
	    for (var i = 0; i < keysA.length; i++) {
	      if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	        return false;
	      }
	    }

	    return true;
	  }
	  module.exports = exports['default'];
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, exports, require('redux'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, mod.exports, global.redux);
	    global.wrapActionCreators = mod.exports;
	  }
	})(this, function (module, exports, _redux) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = wrapActionCreators;
	  function wrapActionCreators(actionCreators) {
	    return function (dispatch) {
	      return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	    };
	  }
	  module.exports = exports['default'];
	});

/***/ }
/******/ ]);