webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(7);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(9);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _app = __webpack_require__(10);

	var _app2 = _interopRequireDefault(_app);

	var _home = __webpack_require__(16);

	var _home2 = _interopRequireDefault(_home);

	var _button = __webpack_require__(244);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);
	// 组件


	//引入组件

	var app = _vue2.default.extend(_app2.default);
	var router = new _vueRouter2.default();

	//配置路由
	router.map({
	  '/home': {
	    component: _home2.default
	  },
	  '/button': {
	    component: _button2.default
	  }
	});

	//设置默认情况下打开的页面
	router.redirect({
	  '/': 'home'
	});

	router.start(app, '#app');

	//暴露路由接口调试
	window.router = router;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Vue.js v1.0.28
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delimited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([^-])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && UA.indexOf('trident') > 0;
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/* istanbul ignore next */
	function isNative(Ctor) {
	  return (/native code/.test(Ctor.toString())
	  );
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc = undefined;

	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var noop = function noop() {};
	    timerFunc = function () {
	      p.then(nextTickHandler);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) setTimeout(noop);
	    };
	  } else if (typeof MutationObserver !== 'undefined') {
	    // use MutationObserver where native Promise is not available,
	    // e.g. IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = setTimeout;
	  }

	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;

	  var entry = this.get(key, true);
	  if (!entry) {
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var len;
	var index;
	var chr;
	var state;
	var startState = 0;
	var filterState = 1;
	var filterNameState = 2;
	var filterArgState = 3;

	var doubleChr = 0x22;
	var singleChr = 0x27;
	var pipeChr = 0x7C;
	var escapeChr = 0x5C;
	var spaceChr = 0x20;

	var expStartChr = { 0x5B: 1, 0x7B: 1, 0x28: 1 };
	var expChrPair = { 0x5B: 0x5D, 0x7B: 0x7D, 0x28: 0x29 };

	function peek() {
	  return str.charCodeAt(index + 1);
	}

	function next() {
	  return str.charCodeAt(++index);
	}

	function eof() {
	  return index >= len;
	}

	function eatSpace() {
	  while (peek() === spaceChr) {
	    next();
	  }
	}

	function isStringStart(chr) {
	  return chr === doubleChr || chr === singleChr;
	}

	function isExpStart(chr) {
	  return expStartChr[chr];
	}

	function isExpEnd(start, chr) {
	  return expChrPair[start] === chr;
	}

	function parseString() {
	  var stringQuote = next();
	  var chr;
	  while (!eof()) {
	    chr = next();
	    // escape char
	    if (chr === escapeChr) {
	      next();
	    } else if (chr === stringQuote) {
	      break;
	    }
	  }
	}

	function parseSpecialExp(chr) {
	  var inExp = 0;
	  var startChr = chr;

	  while (!eof()) {
	    chr = peek();
	    if (isStringStart(chr)) {
	      parseString();
	      continue;
	    }

	    if (startChr === chr) {
	      inExp++;
	    }
	    if (isExpEnd(startChr, chr)) {
	      inExp--;
	    }

	    next();

	    if (inExp === 0) {
	      break;
	    }
	  }
	}

	/**
	 * syntax:
	 * expression | filterName  [arg  arg [| filterName arg arg]]
	 */

	function parseExpression() {
	  var start = index;
	  while (!eof()) {
	    chr = peek();
	    if (isStringStart(chr)) {
	      parseString();
	    } else if (isExpStart(chr)) {
	      parseSpecialExp(chr);
	    } else if (chr === pipeChr) {
	      next();
	      chr = peek();
	      if (chr === pipeChr) {
	        next();
	      } else {
	        if (state === startState || state === filterArgState) {
	          state = filterState;
	        }
	        break;
	      }
	    } else if (chr === spaceChr && (state === filterNameState || state === filterArgState)) {
	      eatSpace();
	      break;
	    } else {
	      if (state === filterState) {
	        state = filterNameState;
	      }
	      next();
	    }
	  }

	  return str.slice(start + 1, index) || null;
	}

	function parseFilterList() {
	  var filters = [];
	  while (!eof()) {
	    filters.push(parseFilter());
	  }
	  return filters;
	}

	function parseFilter() {
	  var filter = {};
	  var args;

	  state = filterState;
	  filter.name = parseExpression().trim();

	  state = filterArgState;
	  args = parseFilterArguments();

	  if (args.length) {
	    filter.args = args;
	  }
	  return filter;
	}

	function parseFilterArguments() {
	  var args = [];
	  while (!eof() && state !== filterState) {
	    var arg = parseExpression();
	    if (!arg) {
	      break;
	    }
	    args.push(processFilterArg(arg));
	  }

	  return args;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  dir = {};
	  len = str.length;
	  index = -1;
	  chr = '';
	  state = startState;

	  var filters;

	  if (str.indexOf('|') < 0) {
	    dir.expression = str.trim();
	  } else {
	    dir.expression = parseExpression().trim();
	    filters = parseFilterList();
	    if (filters.length) {
	      dir.filters = filters;
	    }
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;
	var formatComponentName = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';

	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };

	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        // Firefox returns unknown for some "Interactive elements."
	        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
	      parent = mergeOptions(parent, mixinOptions, vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE: isIE,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIOS: isIOS,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to register itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression$1(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression$1(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\"']|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

	function noop() {}

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here because the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
	      } else {
	        warn('Invalid expression. ' + 'Generated function body: ' + body);
	      }
	    }
	    return noop;
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression$1(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat literal values as paths
	  !literalValueRE$1.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression$1,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  var _again = true;

	  _function: while (_again) {
	    _again = false;

	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression$1(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	var commentRE = /<!--/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	  var commentMatch = commentRE.test(templateString);

	  if (!tagMatch && !entityMatch && !commentMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('v-if')) {
	      warn('<' + this.el.tagName.toLowerCase() + ' v-for="' + this.expression + '" v-if="' + this.el.getAttribute('v-if') + '">: ' + 'Using v-if and v-for on the same element is not recommended - ' + 'consider filtering the source Array instead.', this.vm);
	    }

	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new instance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * watcher's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */

	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    // #3029 only update when the value changes. This prevent
	    // browsers from overwriting values like selectionStart
	    value = _toString(value);
	    if (value !== this.el.value) this.el.value = value;
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var _this = this;

	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', function () {
	      nextTick(_this.forceUpdate);
	    });
	    if (!inDoc(el)) {
	      nextTick(this.forceUpdate);
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.get();
	      if (isArray(model)) {
	        var val = self.getValue();
	        var i = indexOf(model, val);
	        if (el.checked) {
	          if (i < 0) {
	            self.set(model.concat(val));
	          }
	        } else if (i > -1) {
	          self.set(model.slice(0, i).concat(model.slice(i + 1)));
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;

	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// logic control
	// two-way binding
	// event handling
	// attributes
	// ref & el
	// cloak
	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },

	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },

	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};

	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */

	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}

	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */

	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var propsData = vm.$options.propsData;
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (propsData && (value = propsData[name] || propsData[path]) !== null) {
	      // has propsData
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required && (!propsData || !(name in propsData) && !(path in propsData))) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */

	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value, vm);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}

	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */

	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */

	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value, vm) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  if (typeof coerce === 'function') {
	    return coerce(value);
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
	    return value;
	  }
	}

	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */

	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}

	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */

	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}

	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    oldId = oldId || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    removeClass(el, oldId + '-transition');
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  sortDirectives(dirs);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * sort directives by priority (stable sort)
	 *
	 * @param {Array} dirs
	 */
	function sortDirectives(dirs) {
	  if (dirs.length === 0) return;

	  var groupedMap = {};
	  var i, j, k, l;
	  var index = 0;
	  var priorities = [];
	  for (i = 0, j = dirs.length; i < j; i++) {
	    var dir = dirs[i];
	    var priority = dir.descriptor.def.priority || DEFAULT_PRIORITY;
	    var array = groupedMap[priority];
	    if (!array) {
	      array = groupedMap[priority] = [];
	      priorities.push(priority);
	    }
	    array.push(dir);
	  }

	  priorities.sort(function (a, b) {
	    return a > b ? -1 : a === b ? 0 : 1;
	  });
	  for (i = 0, j = priorities.length; i < j; i++) {
	    var group = groupedMap[priorities[i]];
	    for (k = 0, l = group.length; k < l; k++) {
	      dirs[index++] = group[k];
	    }
	  }
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;

	      var componentName = options.el.tagName.toLowerCase();
	      if (componentName === 'component' && options.name) {
	        componentName += ':' + options.name;
	      }

	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + componentName + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    // a textarea which has v-pre attr should skip complie.
	    if (getAttr(el, 'v-pre') !== null) {
	      return skip;
	    }
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = _toString(value);
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for, v-if and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    if (!replacer) {
	      return frag;
	    }
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop$1() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop$1;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression$1(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression$1(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression$1(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Order filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */

	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);

	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }

	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }

	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }

	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */

	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    var length = args.length;
	    if (length > 1) {
	      var index = value % 10 - 1;
	      return index in args ? args[index] : args[length - 1];
	    } else {
	      return args[0] + (value === 1 ? '' : 's');
	    }
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          if (!definition.name) {
	            definition.name = id;
	          }
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.28';

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.13
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';

	  var babelHelpers = {};

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }

	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;

	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }

	      this.matcher.add(this.path, target);

	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };

	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }

	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },

	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;

	      var match = generateMatch(path, matcher, delegate);

	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }

	      callback(match);
	    }
	  };

	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;

	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }

	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }

	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }

	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;

	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);

	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }

	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();

	    callback(generateMatch("", matcher, this.delegate));

	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }

	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

	  var noWarning = false;
	  function warn(msg) {
	    if (!noWarning && typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  function tryDecode(uri, asComponent) {
	    try {
	      return asComponent ? decodeURIComponent(uri) : decodeURI(uri);
	    } catch (e) {
	      warn('malformed URI' + (asComponent ? ' component: ' : ': ') + uri);
	    }
	  }

	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }

	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat

	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;

	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },

	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },

	    generate: function generate() {
	      return this.string;
	    }
	  };

	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },

	    regex: function regex() {
	      return "([^/]+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },

	    regex: function regex() {
	      return "(.+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };

	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }

	    var segments = route.split("/"),
	        results = [];

	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';

	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;

	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }

	    specificity.val = +specificity.val;

	    return results;
	  }

	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.

	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }

	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];

	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	        if (isEqual) {
	          return child;
	        }
	      }
	    },

	    put: function put(charSpec) {
	      var state;

	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }

	      // Make a new state for the character spec
	      state = new State(charSpec);

	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);

	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }

	      // Return the new state
	      return state;
	    },

	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;

	      // DEBUG "  " + debugState(this)
	      var returned = [];

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];

	        charSpec = child.charSpec;

	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }

	      return returned;
	    }

	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };

	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }

	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/

	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }

	  function recognizeChar(states, ch) {
	    var nextStates = [];

	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];

	      nextStates = nextStates.concat(state.match(ch));
	    }

	    return nextStates;
	  }

	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };

	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });

	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);

	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};

	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }

	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }

	    return result;
	  }

	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;

	      currentState = currentState.put(ch);
	    });

	    return currentState;
	  }

	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return tryDecode(part, true);
	  }

	  // The main interface

	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };

	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;

	      var isEmpty = true;

	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];

	        var segments = parse(route.path, names, specificity);

	        allSegments = allSegments.concat(segments);

	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];

	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }

	          isEmpty = false;

	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";

	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }

	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }

	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }

	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;

	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },

	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }

	      return result;
	    },

	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },

	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      var segments = route.segments;

	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];

	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }

	        output += "/";
	        output += segment.generate(params);
	      }

	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }

	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }

	      return output;
	    },

	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }

	      if (pairs.length === 0) {
	        return '';
	      }

	      return "?" + pairs.join("&");
	    },

	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },

	    recognize: function recognize(path, silent) {
	      noWarning = silent;
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;

	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        if (queryString) {
	          queryParams = this.parseQueryString(queryString);
	        }
	      }

	      path = tryDecode(path);
	      if (!path) return;

	      // DEBUG GROUP path

	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }

	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }

	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }

	      // END DEBUG GROUP

	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }

	      states = sortSolutions(solutions);

	      var state = solutions[0];

	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };

	  RouteRecognizer.prototype.map = map;

	  var genQuery = RouteRecognizer.prototype.generateQueryString;

	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */

	  function warn$1(msg) {
	    /* istanbul ignore next */
	    if (typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */

	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }

	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */

	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }

	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */

	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }

	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */

	  var resolver = undefined;

	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }

	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */

	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};

	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      /* istanbul ignore if */
	      if (!val) {
	        warn$1('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }

	  var hashRE = /#.*$/;

	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);

	      if (root && root !== '/') {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }

	    HTML5History.prototype.start = function start() {
	      var _this = this;

	      this.listener = function (e) {
	        var url = location.pathname + location.search;
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };

	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };

	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '', location.href);
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };

	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };

	    return HTML5History;
	  })();

	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);

	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }

	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(path.replace(/^#!?/, '') + query);
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };

	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };

	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };

	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };

	    return HashHistory;
	  })();

	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);

	      this.onChange = onChange;
	      this.currentPath = '/';
	    }

	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };

	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };

	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };

	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };

	    return AbstractHistory;
	  })();

	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */

	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }

	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }

	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }

	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }

	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */

	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      saveChildView(view);
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }

	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');

	    view.depth = depth;
	    view.activated = false;

	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);

	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;

	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      saveChildView(view);

	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);

	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        },
	        created: function created() {
	          this._routerView = view;
	        }
	      });

	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedChildView = component._keepAliveRouterView;
	        if (cachedChildView) {
	          view.childView = cachedChildView;
	          component._keepAliveRouterView = null;
	        }
	      }
	    }

	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };

	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };

	    var afterData = function afterData() {
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      insert();
	    };

	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, afterData, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        afterData();
	      }
	    };

	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup,
	        postActivate: true
	      });
	    } else {
	      afterActivate();
	    }
	  }

	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */

	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }

	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */

	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function () {
	      component.$loadingRouteData = false;
	      component.$emit('route-data-loaded', component);
	      cb && cb();
	    }, {
	      cleanup: cleanup,
	      postActivate: true,
	      processData: function processData(data) {
	        // handle promise sugar syntax
	        var promises = [];
	        if (isPlainObject(data)) {
	          Object.keys(data).forEach(function (key) {
	            var val = data[key];
	            if (isPromise(val)) {
	              promises.push(val.then(function (resolvedVal) {
	                component.$set(key, resolvedVal);
	              }));
	            } else {
	              component.$set(key, val);
	            }
	          });
	        }
	        if (promises.length) {
	          return promises[0].constructor.all(promises);
	        }
	      }
	    });
	  }

	  /**
	   * Save the child view for a kept-alive view so that
	   * we can restore it when it is switched back to.
	   *
	   * @param {Directive} view
	   */

	  function saveChildView(view) {
	    if (view.keepAlive && view.childVM && view.childView) {
	      view.childVM._keepAliveRouterView = view.childView;
	    }
	    view.childView = null;
	  }

	  /**
	   * Check plain object.
	   *
	   * @param {*} val
	   */

	  function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */

	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);

	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	    }

	    /**
	     * Abort current transition and return to previous location.
	     */

	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };

	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */

	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };

	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;

	      // determine the queue of views to deactivate
	      var deactivateQueue = [];
	      var view = this.router._rootView;
	      while (view) {
	        deactivateQueue.unshift(view);
	        view = view.childView;
	      }
	      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

	      // determine the queue of route handlers to activate
	      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
	        return match.handler;
	      });

	      // 1. Reusability phase
	      var i = undefined,
	          reuseQueue = undefined;
	      for (i = 0; i < reverseDeactivateQueue.length; i++) {
	        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = reverseDeactivateQueue.slice(0, i);
	        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
	        activateQueue = activateQueue.slice(i);
	      }

	      // 2. Validation phase
	      transition.runQueue(deactivateQueue, canDeactivate, function () {
	        transition.runQueue(activateQueue, canActivate, function () {
	          transition.runQueue(deactivateQueue, deactivate, function () {
	            // 3. Activation phase

	            // Update router current route
	            transition.router._onTransitionValidated(transition);

	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              return reuse(view, transition);
	            });

	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (deactivateQueue.length) {
	              var _view = deactivateQueue[deactivateQueue.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(_view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };

	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };

	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} postActive
	     *                 - {Function} processData
	     *                 - {Function} cleanup
	     */

	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$postActivate = _ref.postActivate;
	      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
	      var processData = _ref.processData;
	      var cleanup = _ref.cleanup;

	      var transition = this;
	      var nextCalled = false;

	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };

	      // handle errors
	      var onError = function onError(err) {
	        postActivate ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn$1('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };

	      // since promise swallows errors, we have to
	      // throw it in the next tick...
	      var onPromiseError = function onPromiseError(err) {
	        try {
	          onError(err);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          }, 0);
	        }
	      };

	      // advance the transition to the next step
	      var next = function next() {
	        if (nextCalled) {
	          warn$1('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb();
	      };

	      var nextWithBoolean = function nextWithBoolean(res) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (isPromise(res)) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onPromiseError);
	        } else if (!hook.length) {
	          next();
	        }
	      };

	      var nextWithData = function nextWithData(data) {
	        var res = undefined;
	        try {
	          res = processData(data);
	        } catch (err) {
	          return onError(err);
	        }
	        if (isPromise(res)) {
	          res.then(next, onPromiseError);
	        } else {
	          next();
	        }
	      };

	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: processData ? nextWithData : next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };

	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }

	      if (expectBoolean) {
	        // boolean hooks
	        nextWithBoolean(res);
	      } else if (isPromise(res)) {
	        // promise
	        if (processData) {
	          res.then(nextWithData, onPromiseError);
	        } else {
	          res.then(next, onPromiseError);
	        }
	      } else if (processData && isPlainOjbect(res)) {
	        // data promise sugar
	        nextWithData(res);
	      } else if (!hook.length) {
	        next();
	      }
	    };

	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */

	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;

	      if (Array.isArray(hooks)) {
	        this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, next, options);
	          }
	        }, cb);
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };

	    return RouteTransition;
	  })();

	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	  }

	  var internalKeysRE = /^(component|subRoutes|fullPath)$/;

	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */

	  var Route = function Route(path, router) {
	    var _this = this;

	    babelHelpers.classCallCheck(this, Route);

	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // internal reference to router
	    Object.defineProperty(this, 'router', {
	      enumerable: false,
	      value: router
	    });
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };

	  function applyOverride (Vue) {
	    var _Vue$util = Vue.util;
	    var extend = _Vue$util.extend;
	    var isArray = _Vue$util.isArray;
	    var defineReactive = _Vue$util.defineReactive;

	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      options = options || {};
	      var root = options._parent || options.parent || this;
	      var router = root.$router;
	      var route = root.$route;
	      if (router) {
	        // expose router
	        this.$router = router;
	        router._children.push(this);
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          defineReactive(this, '$route', route);
	        }
	      }
	      init.call(this, options);
	    };

	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed && this.$router) {
	        this.$router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    };

	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;

	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }

	  function View (Vue) {

	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);

	    // with some overrides
	    _.extend(viewDef, {

	      _isRouterView: true,

	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn$1('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);

	        // locate the parent view
	        var parentView = undefined;
	        var parent = this.vm;
	        while (parent) {
	          if (parent._routerView) {
	            parentView = parent._routerView;
	            break;
	          }
	          parent = parent.$parent;
	        }
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          this.parentView = parentView;
	          parentView.childView = this;
	        } else {
	          // this is the root view!
	          var router = route.router;
	          router._rootView = this;
	        }

	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },

	      unbind: function unbind() {
	        if (this.parentView) {
	          this.parentView.childView = null;
	        }
	        componentDef.unbind.call(this);
	      }
	    });

	    Vue.elementDirective('router-view', viewDef);
	  }

	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;

	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	    var _Vue$util = Vue.util;
	    var _bind = _Vue$util.bind;
	    var isObject = _Vue$util.isObject;
	    var addClass = _Vue$util.addClass;
	    var removeClass = _Vue$util.removeClass;

	    var onPriority = Vue.directive('on').priority;
	    var LINK_UPDATE = '__vue-router-link-update__';

	    var activeId = 0;

	    Vue.directive('link-active', {
	      priority: 9999,
	      bind: function bind() {
	        var _this = this;

	        var id = String(activeId++);
	        // collect v-links contained within this element.
	        // we need do this here before the parent-child relationship
	        // gets messed up by terminal directives (if, for, components)
	        var childLinks = this.el.querySelectorAll('[v-link]');
	        for (var i = 0, l = childLinks.length; i < l; i++) {
	          var link = childLinks[i];
	          var existingId = link.getAttribute(LINK_UPDATE);
	          var value = existingId ? existingId + ',' + id : id;
	          // leave a mark on the link element which can be persisted
	          // through fragment clones.
	          link.setAttribute(LINK_UPDATE, value);
	        }
	        this.vm.$on(LINK_UPDATE, this.cb = function (link, path) {
	          if (link.activeIds.indexOf(id) > -1) {
	            link.updateClasses(path, _this.el);
	          }
	        });
	      },
	      unbind: function unbind() {
	        this.vm.$off(LINK_UPDATE, this.cb);
	      }
	    });

	    Vue.directive('link', {
	      priority: onPriority - 2,

	      bind: function bind() {
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn$1('v-link can only be used inside a router-enabled app.');
	          return;
	        }
	        this.router = vm.$route.router;
	        // update things when the route changes
	        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
	        // check v-link-active ids
	        var activeIds = this.el.getAttribute(LINK_UPDATE);
	        if (activeIds) {
	          this.el.removeAttribute(LINK_UPDATE);
	          this.activeIds = activeIds.split(',');
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        this.handler = _bind(this.onClick, this);
	        this.el.addEventListener('click', this.handler);
	      },

	      update: function update(target) {
	        this.target = target;
	        if (isObject(target)) {
	          this.append = target.append;
	          this.exact = target.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = target.activeClass;
	        }
	        this.onRouteUpdate(this.vm.$route);
	      },

	      onClick: function onClick(e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) return;

	        var target = this.target;
	        if (target) {
	          // v-link with expression, just go
	          e.preventDefault();
	          this.router.go(target);
	        } else {
	          // no expression, delegate for an <a> inside
	          var el = e.target;
	          while (el.tagName !== 'A' && el !== this.el) {
	            el = el.parentNode;
	          }
	          if (el.tagName === 'A' && sameOrigin(el)) {
	            e.preventDefault();
	            var path = el.pathname;
	            if (this.router.history.root) {
	              path = path.replace(this.router.history.rootRE, '');
	            }
	            this.router.go({
	              path: path,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      },

	      onRouteUpdate: function onRouteUpdate(route) {
	        // router.stringifyPath is dependent on current route
	        // and needs to be called again whenver route changes.
	        var newPath = this.router.stringifyPath(this.target);
	        if (this.path !== newPath) {
	          this.path = newPath;
	          this.updateActiveMatch();
	          this.updateHref();
	        }
	        if (this.activeIds) {
	          this.vm.$emit(LINK_UPDATE, this, route.path);
	        } else {
	          this.updateClasses(route.path, this.el);
	        }
	      },

	      updateActiveMatch: function updateActiveMatch() {
	        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      },

	      updateHref: function updateHref() {
	        if (this.el.tagName !== 'A') {
	          return;
	        }
	        var path = this.path;
	        var router = this.router;
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      },

	      updateClasses: function updateClasses(path, el) {
	        var activeClass = this.activeClass || this.router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass && this.prevActiveClass !== activeClass) {
	          toggleClasses(el, this.prevActiveClass, removeClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        }
	      },

	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });

	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }

	    // this function is copied from v-bind:class implementation until
	    // we properly expose it...
	    function toggleClasses(el, key, fn) {
	      key = key.trim();
	      if (key.indexOf(' ') === -1) {
	        fn(el, key);
	        return;
	      }
	      var keys = key.split(/\s+/);
	      for (var i = 0, l = keys.length; i < l; i++) {
	        fn(el, keys[i]);
	      }
	    }
	  }

	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };

	  // late bind during install
	  var Vue = undefined;

	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */

	  var Router = (function () {
	    function Router() {
	      var _this = this;

	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);

	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }

	      // Vue instances
	      this.app = null;
	      this._children = [];

	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();

	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];

	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;

	      // history mode
	      this._root = root;
	      this._abstract = abstract;
	      this._hashbang = hashbang;

	      // check if HTML5 history is available
	      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	      this._history = history && hasPushState;
	      this._historyFallback = history && !hasPushState;

	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

	      var History = historyBackends[this.mode];
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          _this._match(path, state, anchor);
	        }
	      });

	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	    }

	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */

	    // API ===================================================

	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */

	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	      return this;
	    };

	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */

	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	      return this;
	    };

	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */

	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this.stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };

	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */

	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };

	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */

	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn$1('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        /* istanbul ignore if */
	        if (App instanceof Vue) {
	          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }

	      // handle history fallback in browsers that do not
	      // support HTML5 history API
	      if (this._historyFallback) {
	        var _location = window.location;
	        var _history = new HTML5History({ root: this._root });
	        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
	        if (path && path !== '/') {
	          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
	          return;
	        }
	      }

	      this.history.start();
	    };

	    /**
	     * Stop listening to route changes.
	     */

	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };

	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */

	    Router.prototype.stringifyPath = function stringifyPath(path) {
	      var generatedPath = '';
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var extend = Vue.util.extend;
	          var currentParams = this._currentTransition && this._currentTransition.to.params;
	          var targetParams = path.params || {};
	          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
	          generatedPath = encodeURI(this._recognizer.generate(path.name, params));
	        } else if (path.path) {
	          generatedPath = encodeURI(path.path);
	        }
	        if (path.query) {
	          // note: the generated query string is pre-URL-encoded by the recognizer
	          var query = this._recognizer.generateQueryString(path.query);
	          if (generatedPath.indexOf('?') > -1) {
	            generatedPath += '&' + query.slice(1);
	          } else {
	            generatedPath += query;
	          }
	        }
	      } else {
	        generatedPath = encodeURI(path ? path + '' : '');
	      }
	      return generatedPath;
	    };

	    // Internal methods ======================================

	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */

	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };

	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */

	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };

	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */

	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };

	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */

	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };

	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */

	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this2 = this;

	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this2, realPath);
	        }
	      }]);
	    };

	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */

	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path, true);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };

	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this3 = this;

	      if (this._checkGuard(path)) {
	        return;
	      }

	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;

	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }

	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);

	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;

	      if (!this.app) {
	        (function () {
	          // initial render
	          var router = _this3;
	          _this3.app = new _this3._appConstructor({
	            el: _this3._appContainer,
	            created: function created() {
	              this.$router = router;
	            },
	            _meta: {
	              $route: route
	            }
	          });
	        })();
	      }

	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this3._postTransition(route, state, anchor);
	        });
	      };

	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this3._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }

	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }

	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };

	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */

	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };

	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };

	    return Router;
	  })();

	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn$1('invalid component for route "' + path + '".');
	    }
	  }

	  /* Installation */

	  Router.installed = false;

	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */

	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn$1('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };

	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }

	  return Router;

	}));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(11)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/app.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(15)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5a18023c/app.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(12);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div class="main">
	//         <router-view
	//           keep-alive
	//           :transition="transitions"
	//         ></router-view>
	//     </div>
	// </template>
	//
	// <script>
	var ROUTERKEY = "routerkey";
	exports.default = {
	    data: function data() {
	        return {
	            'transition': 'vux-pop-in'
	        };
	    },

	    computed: {
	        transitions: function transitions() {
	            return this.transition;
	        }
	    },
	    ready: function ready() {
	        var self = this;
	        var transDirect = 'vux-pop-in';
	        var routerData = {
	            push: function push(hashStr) {
	                var routerArr = this.get() || [];
	                if (routerArr.pop != hashStr) {
	                    routerArr.push(hashStr);
	                }
	                this.set(routerArr);
	            },
	            get: function get() {
	                return JSON.parse(window.localStorage.getItem(ROUTERKEY) || '[]');
	            },
	            set: function set(items) {
	                window.localStorage.setItem(ROUTERKEY, (0, _stringify2.default)(items));
	            },
	            pop: function pop() {
	                var routerArr = this.get();
	                routerArr.pop();
	                this.set(routerArr);
	            },
	            clear: function clear() {
	                this.set([]);
	            },
	            change: function change(hasStr) {
	                var routerArr = this.get();
	                var arrPop = routerArr.pop();
	                if (arrPop) {
	                    var newPop = routerArr.pop();
	                    if (newPop) {
	                        if (newPop == hasStr) {
	                            transDirect = 'vux-pop-out';
	                            self.transition = transDirect;
	                            this.pop();
	                        } else {
	                            transDirect = 'vux-pop-in';
	                            self.transition = transDirect;
	                            this.push(hasStr);
	                        }
	                    } else {
	                        transDirect = 'vux-pop-in';
	                        self.transition = transDirect;
	                        this.push(hasStr);
	                    }
	                } else {
	                    this.push(hasStr);
	                }

	                if (location.hash == '#!/home') {
	                    this.clear();
	                    this.push(location.hash);
	                }
	            }
	        };

	        if (window.onpopstate) {
	            (function () {
	                var oldCall = window.onpopstate;
	                window.onpopstate = function () {
	                    oldCall();
	                    routerData.change(location.hash);
	                };
	            })();
	        } else {
	            window.onpopstate = function () {
	                routerData.change(location.hash);
	            };
	        }

	        routerData.clear();
	        routerData.push(location.hash);
	    },
	    destroyed: function destroyed() {},

	    methods: {}
	};
	// </script>

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(14)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"main\">\n    <router-view\n      keep-alive\n      :transition=\"transitions\"\n    ></router-view>\n</div>\n";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(17)
	__vue_script__ = __webpack_require__(21)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/home.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(243)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d149a80e/home.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./home.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./home.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".home-list .home-list-title {\n  height: 0.45rem;\n  line-height: 0.45rem;\n  border-bottom: 1px solid #e6e6e6;\n  padding-left: 0.1rem;\n  font-size: 0.16rem;\n  color: #aaa;\n}\n.home-list ul li {\n  height: 0.45rem;\n  line-height: 0.45rem;\n  border-bottom: 1px solid #e6e6e6;\n  padding-left: 0.2rem;\n  font-size: 0.13rem;\n  background: white;\n  color: black;\n}\n.home-list ul li a {\n  display: block;\n}\n", ""]);

	// exports


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _hometitle = __webpack_require__(22);

	var _hometitle2 = _interopRequireDefault(_hometitle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {};
	    },

	    components: {
	        Hometitle: _hometitle2.default
	    },
	    route: {
	        data: function data() {
	            /*每次切换路由，在渲染出页面前都会执行*/
	        }
	    }
	};
	// </script>
	// <style lang="less">
	//     .home-list {
	//         .home-list-title{
	//             height: 0.45rem;
	//             line-height: 0.45rem;
	//             border-bottom: 1px solid #e6e6e6;
	//             padding-left:0.1rem;
	//             font-size: 0.16rem;
	//             color: #aaa;
	//         }
	//         ul li{
	//             height: 0.45rem;
	//             line-height: 0.45rem;
	//             border-bottom: 1px solid #e6e6e6;
	//             padding-left:0.2rem;
	//             font-size: 0.13rem;
	//             background: white;
	//             color: black;
	//             a{
	//                 display: block
	//             }
	//         }
	//     }
	// </style>
	//
	// <template>
	// <div class="home">
	//     <div class="home-list">
	//         <div class="home-list-title">base</div>
	//         <ul>
	//             <li><a v-link="{path:'/button' , activeClass:'active'}">Button 按钮</a></li>
	//         </ul>
	//     </div>
	// </div>
	// </template>
	// <script>

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(23)
	__vue_script__ = __webpack_require__(25)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/common/hometitle.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(242)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-fac3e262/hometitle.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./hometitle.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./hometitle.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "header {\n  height: 0.45rem;\n  line-height: 0.45rem;\n  color: #1da7fe;\n  background: white;\n  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);\n  text-align: center;\n  font-size: 0.16rem;\n  font-weight: bold;\n}\n.home-img {\n  height: 0.5rem;\n  position: relative;\n  top: 0px;\n}\n.mv-icon-class {\n  font-size: 0.28rem;\n  color: #1da7fe;\n  position: absolute;\n  left: 0.1rem;\n}\n", ""]);

	// exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mvui = __webpack_require__(26);

	exports.default = {
	    props: {
	        icon: {
	            type: Boolean,
	            default: true
	        }
	    },
	    components: {
	        Icon: _mvui.Icon
	    }
	};
	// </script>
	// <style lang="less">
	//     header{
	//         height: 0.45rem;
	//         line-height: 0.45rem;
	//         color: #1da7fe;
	//         background: white;
	//         box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
	//         text-align: center;
	//         font-size: 0.16rem;
	//         font-weight: bold;
	//     }
	//     .home-img{
	//         height: 0.5rem;
	//         position: relative;
	//         top: 0px;
	//     }
	//     .mv-icon-class{
	//         font-size: 0.28rem;
	//         color: #1da7fe;
	//         position: absolute;
	//         left: 0.1rem;
	//     }
	// </style>
	// <template>
	//     <header>
	//         <a v-link="{path:'/home' , activeClass:'active'}">
	//             <Icon v-if="icon" class="mv-icon-arrow-left mv-icon-class"></Icon>
	//         </a>
	//         <slot></slot>
	//     </header>
	// </template>
	// <script>

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _button = __webpack_require__(39);

	var _button2 = _interopRequireDefault(_button);

	var _gotop = __webpack_require__(44);

	var _gotop2 = _interopRequireDefault(_gotop);

	var _loadding = __webpack_require__(141);

	var _loadding2 = _interopRequireDefault(_loadding);

	var _tip = __webpack_require__(146);

	var _tip2 = _interopRequireDefault(_tip);

	var _modal = __webpack_require__(151);

	var _modal2 = _interopRequireDefault(_modal);

	var _index = __webpack_require__(156);

	var _index2 = _interopRequireDefault(_index);

	var _progress = __webpack_require__(166);

	var _progress2 = _interopRequireDefault(_progress);

	var _circle = __webpack_require__(171);

	var _circle2 = _interopRequireDefault(_circle);

	var _inputbox = __webpack_require__(176);

	var _inputbox2 = _interopRequireDefault(_inputbox);

	var _radio = __webpack_require__(181);

	var _radio2 = _interopRequireDefault(_radio);

	var _checkbox = __webpack_require__(186);

	var _checkbox2 = _interopRequireDefault(_checkbox);

	var _selector = __webpack_require__(191);

	var _selector2 = _interopRequireDefault(_selector);

	var _switch = __webpack_require__(196);

	var _switch2 = _interopRequireDefault(_switch);

	var _panel = __webpack_require__(201);

	var _panel2 = _interopRequireDefault(_panel);

	var _accordion = __webpack_require__(206);

	var _accordion2 = _interopRequireDefault(_accordion);

	var _scroll = __webpack_require__(211);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _pullrefresh = __webpack_require__(216);

	var _pullrefresh2 = _interopRequireDefault(_pullrefresh);

	var _pullload = __webpack_require__(222);

	var _pullload2 = _interopRequireDefault(_pullload);

	var _slider = __webpack_require__(227);

	var _slider2 = _interopRequireDefault(_slider);

	var _page = __webpack_require__(232);

	var _page2 = _interopRequireDefault(_page);

	var _uploader = __webpack_require__(237);

	var _uploader2 = _interopRequireDefault(_uploader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import Imager from './components/imager/imager.vue';
	// import Calendar from './components/calendar/calendar.vue';
	// import Chart from './components/chart/chart.vue';
	// import Countdown from './components/countdown/countdown.vue';
	// import Drag from './components/drag/drag.vue';
	// import LoaddingBar from './components/loaddingbar/loaddingbar.vue';
	// import Music from './components/music/music.vue';
	// import Table from './components/table/table.vue';
	// import Tree from './components/tree/tree.vue';
	// import Turntable from './components/turntable/turntable.vue';
	// import Address from './components/address/address.vue';


	// import Popup from './components/popup/popup.vue';
	// import Uploader from './components/uploader/uploader.vue';
	// import Validate from './components/validate/validate.vue';
	// import Tab from './components/tab/tab.vue';

	// import Page from './components/page/page.vue';
	// import Lazyload from './components/lazyload/lazyload.vue';
	// import Scroll from './components/scroll/scroll.vue';
	// import Slider from './components/slider/slider.vue';


	// View

	module.exports = {
	    Icon: _icon2.default,
	    Button: _button2.default,
	    Gotop: _gotop2.default,
	    Loadding: _loadding2.default,
	    Tip: _tip2.default,
	    Modal: _modal2.default,
	    Alert: _index2.default,
	    Progress: _progress2.default,
	    Circle: _circle2.default,
	    // 表单
	    Inputbox: _inputbox2.default,
	    Radio: _radio2.default,
	    Checkbox: _checkbox2.default,
	    Selector: _selector2.default,
	    Switch: _switch2.default,
	    // View
	    Panel: _panel2.default,
	    Accordion: _accordion2.default,
	    Scroll: _scroll2.default,
	    Pullrefresh: _pullrefresh2.default,
	    Pullload: _pullload2.default,
	    Slider: _slider2.default,
	    Page: _page2.default,
	    Uploader: _uploader2.default
	};

	// Form

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(28)
	__webpack_require__(35)
	__vue_script__ = __webpack_require__(37)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/icon/icon.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(38)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-60e6f4a7/icon.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./icon.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./icon.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports
	exports.i(__webpack_require__(30), "");

	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n", ""]);

	// exports


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\n@font-face {font-family: \"mvfont\";\n  src: url(" + __webpack_require__(31) + "); /* IE9*/\n  src: url(" + __webpack_require__(31) + "#iefix) format('embedded-opentype'), \n  url(" + __webpack_require__(32) + ") format('woff'), \n  url(" + __webpack_require__(33) + ") format('truetype'), \n  url(" + __webpack_require__(34) + "#mvfont) format('svg'); /* iOS 4.1- */\n}\n\n.mvfont {\n  font-family:\"mvfont\" !important;\n  font-size:16px;\n  font-style:normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.mv-icon-arrow-right:before { content: \"\\E642\"; }\n\n.mv-icon-arrow-left:before { content: \"\\E643\"; }\n\n.mv-icon-loading-7:before { content: \"\\E61B\"; }\n\n.mv-icon-arrow-bottom:before { content: \"\\E6A1\"; }\n\n.mv-icon-arrow-top:before { content: \"\\E6A2\"; }\n\n.mv-icon-check:before { content: \"\\E645\"; }\n\n.mv-icon-close:before { content: \"\\E646\"; }\n\n.mv-icon-favor-fill:before { content: \"\\E64B\"; }\n\n.mv-icon-favor:before { content: \"\\E64C\"; }\n\n.mv-icon-loading-1:before { content: \"\\E64F\"; }\n\n.mv-icon-round-check-fill:before { content: \"\\E656\"; }\n\n.mv-icon-round-close-fill:before { content: \"\\E658\"; }\n\n.mv-icon-round-close:before { content: \"\\E659\"; }\n\n.mv-icon-notificationfill:before { content: \"\\E66A\"; }\n\n.mv-icon-notification:before { content: \"\\E66B\"; }\n\n.mv-icon-home:before { content: \"\\E6B8\"; }\n\n.mv-icon-square-check-fill:before { content: \"\\E6D4\"; }\n\n.mv-icon-square:before { content: \"\\E6D5\"; }\n\n.mv-icon-square-check:before { content: \"\\E6D6\"; }\n\n.mv-icon-round:before { content: \"\\E6D7\"; }\n\n.mv-icon-round-add-fill:before { content: \"\\E6D8\"; }\n\n.mv-icon-round-add:before { content: \"\\E6D9\"; }\n\n.mv-icon-add:before { content: \"\\E6DA\"; }\n\n.mv-icon-reduce:before { content: \"\\E644\"; }\n\n.mv-icon-arrow-up-c:before { content: \"\\E62A\"; }\n\n.mv-icon-caret-bottom:before { content: \"\\E607\"; }\n\n.mv-icon-caret-left:before { content: \"\\E609\"; }\n\n.mv-icon-caret-right:before { content: \"\\E60A\"; }\n\n.mv-icon-loading-6:before { content: \"\\E7F9\"; }\n\n.mv-icon-round-radio:before { content: \"\\E75B\"; }\n\n.mv-icon-loading-5:before { content: \"\\E677\"; }\n\n.mv-icon-arrow-down-c:before { content: \"\\E693\"; }\n\n.mv-icon-caret-top:before { content: \"\\E61E\"; }\n\n.mv-icon-loading-4:before { content: \"\\E624\"; }\n\n.mv-icon-loading-3:before { content: \"\\E61C\"; }\n\n.mv-icon-loading-2:before { content: \"\\E60D\"; }\n\n.mv-icon-uploader:before { content: \"\\E688\"; }\n\n", ""]);

	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9792205194453e28090605bf67de8279.eot";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fe44fc5f846cd74f0f80883d4ce5f7ad.woff";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5b78da673d91bd758e52f144e552e01d.ttf";

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ae651d1fc2af47d285cf944ab8d15116.svg";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=1!./icon.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=1!./icon.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".mvfont {\n  font-size: 0.14rem;\n}\n", ""]);

	// exports


/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// @import "../../assets/fonts/iconfont.css";
	// </style>
	// <template>
	//     <i :class="classes" :style="style"></i>
	// </template>
	// <script>
	exports.default = {
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return "mvfont " + this.class;
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// .mvfont {
	//     font-size: 0.14rem;
	// }
	// </style>

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n<i :class=\"classes\" :style=\"style\"></i>\n";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(40)
	__vue_script__ = __webpack_require__(42)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/button/button.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(43)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-66c295f2/button.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./button.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./button.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\nbutton.mv-btn {\n  position: relative;\n  display: inline-block;\n  padding: 0.06rem 0.12rem;\n  margin-bottom: 0;\n  font-size: 0.13rem;\n  color: #525558;\n  text-align: center;\n  line-height: 1.4;\n  white-space: nowrap;\n  background-color: #fff;\n  border: 1px solid #d7dde4;\n  outline: 0;\n  vertical-align: top;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-transition: all 0.2s linear 0s;\n  transition: all 0.2s linear 0s;\n  -ms-transition: all 0.2s linear 0s;\n  border-radius: 0px;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -o-appearance: none;\n  -ms-appearance: none;\n  appearance: none;\n  -o-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -o-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\nbutton.mv-btn::after {\n  background-color: black;\n  content: \" \";\n  opacity: 0;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  width: 100%;\n  height: 100%;\n}\nbutton.mv-btn:not(.disabled):active::after {\n  opacity: 0.4;\n}\nbutton.mv-btn .mv-icon {\n  font-size: 0.13rem;\n  color: #333;\n  margin-right: 0.03rem;\n}\nbutton.mv-btn.disabled,\nbutton.mv-btn[disabled] {\n  opacity: .5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\nbutton.mv-btn.mv-border-round {\n  border-radius: 0.03rem;\n}\nbutton.mv-btn.mv-btn-primary {\n  color: #fff;\n  background-color: #1da7fe;\n  border-color: #1da7fe;\n  border-style: solid;\n  border-width: 1px;\n}\nbutton.mv-btn.mv-btn-primary.mv-btn-plain {\n  color: #1da7fe;\n}\nbutton.mv-btn.mv-btn-primary .mv-icon {\n  color: white;\n}\nbutton.mv-btn.mv-btn-success {\n  color: #fff;\n  background-color: #13CE66;\n  border-color: #13CE66;\n  border-style: solid;\n  border-width: 1px;\n}\nbutton.mv-btn.mv-btn-success.mv-btn-plain {\n  color: #13CE66;\n}\nbutton.mv-btn.mv-btn-success .mv-icon {\n  color: white;\n}\nbutton.mv-btn.mv-btn-warning {\n  color: #fff;\n  background-color: #F7BA2A;\n  border-color: #F7BA2A;\n  border-style: solid;\n  border-width: 1px;\n}\nbutton.mv-btn.mv-btn-warning.mv-btn-plain {\n  color: #F7BA2A;\n}\nbutton.mv-btn.mv-btn-warning .mv-icon {\n  color: white;\n}\nbutton.mv-btn.mv-btn-danger {\n  color: #fff;\n  background-color: #FF4949;\n  border-color: #FF4949;\n  border-style: solid;\n  border-width: 1px;\n}\nbutton.mv-btn.mv-btn-danger.mv-btn-plain {\n  color: #FF4949;\n}\nbutton.mv-btn.mv-btn-danger .mv-icon {\n  color: white;\n}\nbutton.mv-btn.mv-btn-royal {\n  color: #fff;\n  background-color: #ac6efe;\n  border-color: #ac6efe;\n  border-style: solid;\n  border-width: 1px;\n}\nbutton.mv-btn.mv-btn-royal.mv-btn-plain {\n  color: #ac6efe;\n}\nbutton.mv-btn.mv-btn-royal .mv-icon {\n  color: white;\n}\nbutton.mv-btn.mv-btn-plain {\n  background-color: transparent;\n  color: #525558;\n  border-width: 0.01rem;\n}\nbutton.mv-btn.mv-btn-radius {\n  border-radius: 0.03rem;\n}\n", ""]);

	// exports


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        disabled: Boolean,
	        type: String,
	        shape: [String],
	        plain: {
	            type: Boolean,
	            default: false
	        },
	        icon: String,
	        iconStyle: [Object, String]
	    },
	    computed: {
	        classes: function classes() {
	            return "mv-btn " + (this.shape ? 'mv-border-' + this.shape : '') + " " + (this.plain ? 'mv-btn-plain' : '') + " " + this.class;
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .p-custom-btn(@custome) {
	//     color: #fff;
	//     background-color: @custome;
	//     border-color: @custome;
	//     border-style: solid;
	//     border-width: 1px;
	//     &.mv-btn-plain {
	//         color: @custome;
	//     }
	//     .mv-icon {
	//         color: white;
	//     }
	// }
	//
	// button.mv-btn {
	//     position: relative;
	//     display: inline-block;
	//     padding: 0.06rem 0.12rem;
	//     margin-bottom: 0;
	//     font-size: 0.13rem;
	//     color: @color-theme-font;
	//     text-align: center;
	//     line-height: 1.4;
	//     white-space: nowrap;
	//     background-color: #fff;
	//     border: 1px solid @color-border-theme;
	//     outline: 0;
	//     vertical-align: top;
	//     -webkit-tap-highlight-color: transparent;
	//     .x-transition(all, 0.2s, linear, 0s);
	//     .x-prefix(border-radius;
	//     0px);
	//     .x-prefix(appearance;
	//     none);
	//     .x-prefix(box-sizing;
	//     border-box);
	//     .x-user-select();
	//     &::after {
	//         background-color: black;
	//         content: " ";
	//         opacity: 0;
	//         position: absolute;
	//         left: 0px;
	//         top: 0px;
	//         width: 100%;
	//         height: 100%;
	//     }
	//     &:not(.disabled):active::after {
	//         opacity: .4
	//     }
	//     .mv-icon {
	//         font-size: 0.13rem;
	//         color: #333;
	//         margin-right: 0.03rem;
	//     }
	//     &.disabled,
	//     &[disabled] {
	//         opacity: .5;
	//         cursor: not-allowed;
	//         pointer-events: none;
	//     }
	//     &.mv-border-round {
	//         .x-border-radius(0.03rem)
	//     }
	//     &.mv-btn-primary {
	//         .p-custom-btn(@color-primary);
	//     }
	//     &.mv-btn-success {
	//         .p-custom-btn(@color-success);
	//     }
	//     &.mv-btn-warning {
	//         .p-custom-btn(@color-warning);
	//     }
	//     &.mv-btn-danger {
	//         .p-custom-btn(@color-danger);
	//     }
	//     &.mv-btn-royal {
	//         .p-custom-btn(@color-royal);
	//     }
	//     &.mv-btn-plain {
	//         background-color: transparent;
	//         color: @color-theme-font;
	//         border-width: 0.01rem;
	//     }
	//     &.mv-btn-radius {
	//         .x-border-radius(0.03rem);
	//     }
	// }
	// </style>
	// <template>
	//     <button :type="type" :class="classes" :style="style" :disabled="disabled">
	//         <Icon v-if="icon" :class="icon" :style="iconStyle"></Icon>
	//         <label>
	//             <slot></slot>
	//         </label>
	//     </button>
	// </template>
	// <script>

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "\n<button :type=\"type\" :class=\"classes\" :style=\"style\" :disabled=\"disabled\">\n    <Icon v-if=\"icon\" :class=\"icon\" :style=\"iconStyle\"></Icon>\n    <label>\n        <slot></slot>\n    </label>\n</button>\n";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(45)
	__vue_script__ = __webpack_require__(47)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/gotop/gotop.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(140)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6f71aeba/gotop.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(46);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./gotop.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./gotop.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-gotop {\n  background-color: rgba(0, 0, 0, 0.6);\n  border-radius: 0.02rem;\n  -o-box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);\n  -webkit-transition: all 0.2s ease-in-out 0s;\n  transition: all 0.2s ease-in-out 0s;\n  -ms-transition: all 0.2s ease-in-out 0s;\n  position: fixed;\n  bottom: 0.2rem;\n  right: 0.2rem;\n  text-align: center;\n  padding: 0.06rem 0.1rem;\n  color: white;\n}\n.mv-gotop:hover,\n.mv-gotop:active {\n  background-color: rgba(0, 0, 0, 0.8);\n}\n.mv-gotop .mv-icon {\n  display: inline-block;\n  padding: 0.06rem 0.12rem;\n  font-size: 0.18rem;\n  color: white;\n  text-align: center;\n}\n.mv-gotop.gotop-fade-transition {\n  display: inline-block;\n  /* 否则 scale 动画不起作用 */\n  -webkit-transition: opacity 0.3s ease;\n  transition: opacity 0.3s ease;\n  opacity: 1;\n}\n.mv-gotop.gotop-fade-enter {\n  opacity: 0;\n}\n.mv-gotop.gotop-fade-leave {\n  opacity: 0;\n}\n", ""]);

	// exports


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div v-if="isShow" :type="type" :class="classes" :style="style" :disabled="disabled" @click="gotop" transition="gotop-fade">
	//         <slot>
	//             <Icon :class="icon" :style="iconStyle"></Icon>
	//         </slot>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    components: { Icon: _icon2.default },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        icon: {
	            type: String,
	            default: "mv-icon-arrow-top"
	        },
	        iconStyle: {
	            type: [Object, String],
	            default: ""
	        },
	        height: {
	            type: Number,
	            default: 100
	        }
	    },
	    data: function data() {
	        return {
	            isShow: false
	        };
	    },

	    computed: {
	        classes: function classes() {
	            return 'mv-gotop ' + this.class;
	        }
	    },
	    ready: function ready() {
	        window.addEventListener('scroll', this.throttleFunc, false);
	        window.addEventListener('resize', this.throttleFunc, false);
	    },
	    beforeDestroy: function beforeDestroy() {
	        window.removeEventListener('scroll', this.throttleFunc, false);
	        window.removeEventListener('resize', this.throttleFunc, false);
	    },

	    methods: {
	        gotop: function gotop(e) {
	            window.scrollTo(0, 0);
	            this.$emit('on-click', e);
	        },

	        throttleFunc: (0, _utils.throttle)(function () {
	            this.handleScroll();
	        }, 300),
	        handleScroll: function handleScroll() {
	            var self = this;
	            var isShow = self.isShow;
	            var scrollTopNum = (0, _utils.scrollTop)(window);
	            if (self.height <= scrollTopNum && !isShow) {
	                self.isShow = true;
	            } else if (self.height > scrollTopNum && isShow) {
	                self.isShow = false;
	            }
	        }
	    }
	};
	// </script>
	// <style lang="less">
	//     @import "../../assets/css/common.less";
	//     .mv-gotop{
	//         background-color: rgba(0,0,0,.6);
	//         .x-border-radius(0.02rem);
	//         .x-box-shadow(0, 1px, 3px, rgba(0,0,0,.2));
	//         .x-transition(all ,0.2s ,ease-in-out ,0s);
	//         position: fixed;
	//         bottom: 0.2rem;
	//         right: 0.2rem;
	//         text-align: center;
	//         padding: 0.06rem 0.1rem;
	//         color: white;
	//         &:hover, &:active{
	//             background-color: rgba(0,0,0,.8);
	//         }
	//         .mv-icon{
	//             display: inline-block;
	//             padding: 0.06rem 0.12rem;
	//             font-size: 0.18rem;
	//             color: white;
	//             text-align: center;
	//         }
	//         &.gotop-fade-transition {
	//             display: inline-block; /* 否则 scale 动画不起作用 */
	//             .x-prefix(transition; opacity .3s ease);
	//             opacity: 1;
	//         }
	//         &.gotop-fade-enter {
	//             opacity: 0;
	//         }
	//         &.gotop-fade-leave {
	//             opacity: 0; 
	//         }
	//     }
	//
	// </style>
	//

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _from = __webpack_require__(49);

	var _from2 = _interopRequireDefault(_from);

	var _set = __webpack_require__(101);

	var _set2 = _interopRequireDefault(_set);

	var _typeof2 = __webpack_require__(123);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.debug = debug;
	exports.device = device;
	exports.isObject = isObject;
	exports.isArray = isArray;
	exports.isBoolean = isBoolean;
	exports.isString = isString;
	exports.isEmptyObject = isEmptyObject;
	exports.camelCase = camelCase;
	exports.nowTime = nowTime;
	exports.getUUID = getUUID;
	exports.debounce = debounce;
	exports.throttle = throttle;
	exports.trim = trim;
	exports.indexOf = indexOf;
	exports.validate = validate;
	exports.getStyle = getStyle;
	exports.scrollTop = scrollTop;
	exports.scrollLeft = scrollLeft;
	exports.attr = attr;
	exports.css = css;
	exports.windowHeight = windowHeight;
	exports.windowWidth = windowWidth;
	exports.getStyleByElem = getStyleByElem;
	exports.getHeight = getHeight;
	exports.getWidth = getWidth;
	exports.getFullHeight = getFullHeight;
	exports.getFullWidth = getFullWidth;
	exports.resetCss = resetCss;
	exports.restoreCss = restoreCss;
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Vue属于vm框架，主要避免dom的操作，但是某些dom的操作我们确是不可避免的。例如获取一个x高度，例如获取鼠标的位置
	 * 本库主要封装一些vue对类型判断、样式、以及事件event的一些封装，简称vlib.js 
	 * api主要兼容jquery，当然有的用户还是想使用jquery也没有问题。
	 */

	function debug(str) {
	    document.querySelector('header').innerText = str;
	}

	function device() {
	    var userAgent = window.navigator.userAgent;
	    return {
	        mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/),
	        ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	        android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1,
	        iPhone: userAgent.indexOf('iPhone') > -1,
	        iPad: userAgent.indexOf('iPad') > -1
	    };
	}

	function isObject(obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj);
	    return type === 'function' || type === 'object' && !!obj;
	}

	function isArray(obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	}

	function isBoolean(obj) {
	    return obj === false || obj === true || Object.prototype.toString.call(obj) === '[object Boolean]';
	}

	function isString(obj) {
	    return Object.prototype.toString.call(obj) === '[object String]';
	}

	function isEmptyObject(obj) {
	    for (var _key in obj) {
	        return false;
	    }
	    return true;
	}

	function camelCase(str) {
	    str = str.replace(/-+(.)?/g, function (matchStr, targetChar) {
	        return targetChar ? targetChar.toUpperCase() : '';
	    });
	    return str;
	}

	function nowTime() {
	    if (Date.now) {
	        return Date.now();
	    } else {
	        return new Date().getTime();;
	    }
	}

	var uuid = 0;
	function getUUID() {
	    return ++uuid;
	}

	/**
	 * 延迟执行，采用的underscore的方法
	 */
	function debounce(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function later() {
	        var last = nowTime() - timestamp;

	        if (last < wait && last >= 0) {
	            timeout = setTimeout(later, wait - last);
	        } else {
	            timeout = null;
	            if (!immediate) {
	                result = func.apply(context, args);
	                if (!timeout) context = args = null;
	            }
	        }
	    };

	    return function () {
	        context = this;
	        args = arguments;
	        timestamp = nowTime();
	        var callNow = immediate && !timeout;
	        if (!timeout) timeout = setTimeout(later, wait);
	        if (callNow) {
	            result = func.apply(context, args);
	            context = args = null;
	        }

	        return result;
	    };
	}

	/**
	 *  节流函数 underscore的方法
	 *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
	 *  options.leading = true;
	 *  表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
	 *  options.trailing = true; 
	 *  注意：当options.trailing = false时，效果与上面的简单实现效果相同
	 */
	function throttle(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function later() {
	        previous = options.leading === false ? 0 : nowTime();
	        timeout = null;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	    };

	    return function () {
	        var now = nowTime();
	        if (!previous && options.leading === false) previous = now;
	        var remaining = wait - (now - previous);
	        context = this;
	        args = arguments;
	        if (remaining <= 0 || remaining > wait) {
	            clearTimeout(timeout);
	            timeout = null;
	            previous = now;
	            result = func.apply(context, args);
	            if (!timeout) context = args = null;
	        } else if (!timeout && options.trailing !== false) {
	            timeout = setTimeout(later, remaining);
	        }
	        return result;
	    };
	}

	function trim(str) {
	    if (isString(str)) {
	        if (String.prototype.trim) {
	            return String.prototype.trim.call(str);
	        } else {
	            return str.replace(/(^\s*)|(\s*$)/g, "");
	        }
	    } else {
	        return '';
	    }
	}

	function indexOf(value, arr) {
	    if (isArray(arr)) {
	        if (arr.indexOf(value) > -1) {
	            return value;
	        } else {
	            return "";
	        }
	    }
	}

	function validate(value, arr) {
	    if (indexOf(value, arr) == "") {
	        throw "mvui组件参数" + value + "错误," + "不在" + arr.join(',') + "可选参数中";
	        return false;
	    } else {
	        return true;
	    }
	}

	function getStyle(styles) {
	    if (isObject(styles)) {
	        return styles;
	    }
	    if (isString(styles)) {
	        var obj = {};
	        var arr = styles.split(';');
	        arr.forEach(function (v, k) {
	            if (v) {
	                var t = v.split(":");
	                obj[t[0]] = t[1];
	            }
	        });
	        return obj;
	    } else {
	        return {};
	    }
	}

	//获取滚动条的位置。
	function scrollTop(elem) {
	    return elem && elem.scrollTop || elem.pageYOffset || document.body.scrollTop;
	}
	function scrollLeft(elem) {
	    var de = document.documentElement;
	    return elem && elem.scrollLeft || elem.pageXOffset || document.body.scrollLeft;
	}

	// 获取属性值
	function attr(elem) {
	    return typeof name == 'string' && !(1 in arguments) ? 0 in elem && elem[0].nodeType == 1 && (result = elem[0].getAttribute(name)) != null ? result : undefined : elem.each(function (idx) {
	        if (elem.nodeType !== 1) return;
	        if (isObject(name)) for (key in name) {
	            setAttribute(elem, key, name[key]);
	        } else setAttribute(elem, name, funcArg(elem, value, idx, elem.getAttribute(name)));
	    });
	}

	// 获取样式
	function css(elem, name) {
	    if (elem.style[name]) {
	        return elem.style[name];
	    } else if (elem.currentStyle) {
	        return elem.currentStyle[name];
	    } else if (document.defaultView && document.defaultView.getComputedStyle) {
	        name = name.replace(/([A-Z])/g, "-$1");
	        name = name.toLowerCase();
	        var s = document.defaultView.getComputedStyle(elem, "");
	        return s && s.getPropertyValue(name);
	    } else {
	        return null;
	    }
	}

	//可视区域的高度、宽度
	function windowHeight() {
	    var de = document.documentElement;
	    return self.innerHeight || de && de.offsetHeight || document.body.offsetHeight;
	}
	function windowWidth() {
	    var de = document.documentElement;
	    return self.innerWidth || de && de.offsetWidth || document.body.offsetWidth;
	}

	//获取元素的样式值。
	function getStyleByElem(elem, name) {
	    if (elem.style[name]) {
	        return elem.style[name];
	    } else if (elem.currentStyle) {
	        return elem.currentStyle[name];
	    } else if (document.defaultView && document.defaultView.getComputedStyle) {
	        name = name.replace(/([A-Z])/g, "-$1");
	        name = name.toLowerCase();
	        var s = document.defaultView.getComputedStyle(elem, "");
	        return s && s.getPropertyValue(name);
	    } else {
	        return null;
	    }
	}

	//获取元素使用css控制大小的高度和宽度
	function getHeight(elem) {
	    return parseInt(getStyleByElem(elem, "height"));
	}
	function getWidth(elem) {
	    return parseInt(getStyleByElem(elem, "width"));
	}

	//获取元素可能，完整的高度和宽度
	function getFullHeight(elem) {
	    if (getStyleByElem(elem, "display") != "none") {
	        return getHeight(elem) || elem.offsetHeight;
	    } else {
	        var old = resetCss(elem, { display: "block", visibility: "hidden", position: "absolute" });
	        var h = elem.clientHeight || getHeight(elem);
	        restoreCss(elem, old);
	        return h;
	    }
	}
	function getFullWidth(elem) {
	    if (getStyleByElem(elem, "display") != "none") {
	        return getWidth(elem) || elem.offsetWidth;
	    } else {
	        var old = resetCss(elem, { display: "block", visibility: "hidden", position: "absolute" });
	        var w = elem.clientWidth || getWidth(elem);
	        restoreCss(elem, old);
	        return w;
	    }
	}

	//设置css，并保存旧的css
	function resetCss(elem, prop) {
	    var old = {};
	    for (var i in prop) {
	        old[i] = elem.style[i];
	        elem.style[i] = prop[i];
	    }
	    return old;
	}
	function restoreCss(elem, prop) {
	    for (var i in prop) {
	        elem.style[i] = prop[i];
	    }
	}

	// hasClass
	function hasClass(elem, prop) {
	    if (elem.className.indexOf(prop) > -1) {
	        return true;
	    } else {
	        return false;
	    }
	}

	// addClass
	function addClass(elem, prop) {
	    var className = trim(elem.className).replace(/\s+/g, ' ');
	    var classSet = new _set2.default(className.split(' '));
	    classSet.add(prop);
	    elem.className = trim((0, _from2.default)(classSet).join(' '));
	}

	// removeClass
	function removeClass(elem, prop) {
	    var className = trim(elem.className).replace(/\s+/g, ' ');
	    var classSet = new _set2.default(className.split(' '));
	    classSet.delete(prop);
	    elem.className = trim((0, _from2.default)(classSet).join(' '));
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	__webpack_require__(94);
	module.exports = __webpack_require__(14).Array.from;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(52)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(55)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(53)
	  , defined   = __webpack_require__(54);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(56)
	  , $export        = __webpack_require__(57)
	  , redefine       = __webpack_require__(71)
	  , hide           = __webpack_require__(61)
	  , has            = __webpack_require__(72)
	  , Iterators      = __webpack_require__(73)
	  , $iterCreate    = __webpack_require__(74)
	  , setToStringTag = __webpack_require__(90)
	  , getPrototypeOf = __webpack_require__(92)
	  , ITERATOR       = __webpack_require__(91)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(58)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(59)
	  , hide      = __webpack_require__(61)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 58 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(60);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(62)
	  , createDesc = __webpack_require__(70);
	module.exports = __webpack_require__(66) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(63)
	  , IE8_DOM_DEFINE = __webpack_require__(65)
	  , toPrimitive    = __webpack_require__(69)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(66) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(64);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(66) && !__webpack_require__(67)(function(){
	  return Object.defineProperty(__webpack_require__(68)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(67)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(64)
	  , document = __webpack_require__(58).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(64);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(61);

/***/ },
/* 72 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(75)
	  , descriptor     = __webpack_require__(70)
	  , setToStringTag = __webpack_require__(90)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(61)(IteratorPrototype, __webpack_require__(91)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(63)
	  , dPs         = __webpack_require__(76)
	  , enumBugKeys = __webpack_require__(88)
	  , IE_PROTO    = __webpack_require__(85)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(68)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(89).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(62)
	  , anObject = __webpack_require__(63)
	  , getKeys  = __webpack_require__(77);

	module.exports = __webpack_require__(66) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(78)
	  , enumBugKeys = __webpack_require__(88);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(72)
	  , toIObject    = __webpack_require__(79)
	  , arrayIndexOf = __webpack_require__(82)(false)
	  , IE_PROTO     = __webpack_require__(85)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(80)
	  , defined = __webpack_require__(54);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(81);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(79)
	  , toLength  = __webpack_require__(83)
	  , toIndex   = __webpack_require__(84);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(53)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(53)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(86)('keys')
	  , uid    = __webpack_require__(87);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(58)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 88 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(58).document && document.documentElement;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(62).f
	  , has = __webpack_require__(72)
	  , TAG = __webpack_require__(91)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(86)('wks')
	  , uid        = __webpack_require__(87)
	  , Symbol     = __webpack_require__(58).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(72)
	  , toObject    = __webpack_require__(93)
	  , IE_PROTO    = __webpack_require__(85)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(54);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(59)
	  , $export        = __webpack_require__(57)
	  , toObject       = __webpack_require__(93)
	  , call           = __webpack_require__(95)
	  , isArrayIter    = __webpack_require__(96)
	  , toLength       = __webpack_require__(83)
	  , createProperty = __webpack_require__(97)
	  , getIterFn      = __webpack_require__(98);

	$export($export.S + $export.F * !__webpack_require__(100)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(63);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(73)
	  , ITERATOR   = __webpack_require__(91)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(62)
	  , createDesc      = __webpack_require__(70);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(99)
	  , ITERATOR  = __webpack_require__(91)('iterator')
	  , Iterators = __webpack_require__(73);
	module.exports = __webpack_require__(14).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(81)
	  , TAG = __webpack_require__(91)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(91)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(103);
	__webpack_require__(51);
	__webpack_require__(104);
	__webpack_require__(108);
	__webpack_require__(120);
	module.exports = __webpack_require__(14).Set;

/***/ },
/* 103 */
/***/ function(module, exports) {

	

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(105);
	var global        = __webpack_require__(58)
	  , hide          = __webpack_require__(61)
	  , Iterators     = __webpack_require__(73)
	  , TO_STRING_TAG = __webpack_require__(91)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(106)
	  , step             = __webpack_require__(107)
	  , Iterators        = __webpack_require__(73)
	  , toIObject        = __webpack_require__(79);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(55)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 106 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 107 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(109);

	// 23.2 Set Objects
	module.exports = __webpack_require__(115)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(62).f
	  , create      = __webpack_require__(75)
	  , redefineAll = __webpack_require__(110)
	  , ctx         = __webpack_require__(59)
	  , anInstance  = __webpack_require__(111)
	  , defined     = __webpack_require__(54)
	  , forOf       = __webpack_require__(112)
	  , $iterDefine = __webpack_require__(55)
	  , step        = __webpack_require__(107)
	  , setSpecies  = __webpack_require__(113)
	  , DESCRIPTORS = __webpack_require__(66)
	  , fastKey     = __webpack_require__(114).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(61);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(59)
	  , call        = __webpack_require__(95)
	  , isArrayIter = __webpack_require__(96)
	  , anObject    = __webpack_require__(63)
	  , toLength    = __webpack_require__(83)
	  , getIterFn   = __webpack_require__(98)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(58)
	  , core        = __webpack_require__(14)
	  , dP          = __webpack_require__(62)
	  , DESCRIPTORS = __webpack_require__(66)
	  , SPECIES     = __webpack_require__(91)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(87)('meta')
	  , isObject = __webpack_require__(64)
	  , has      = __webpack_require__(72)
	  , setDesc  = __webpack_require__(62).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(67)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(58)
	  , $export        = __webpack_require__(57)
	  , meta           = __webpack_require__(114)
	  , fails          = __webpack_require__(67)
	  , hide           = __webpack_require__(61)
	  , redefineAll    = __webpack_require__(110)
	  , forOf          = __webpack_require__(112)
	  , anInstance     = __webpack_require__(111)
	  , isObject       = __webpack_require__(64)
	  , setToStringTag = __webpack_require__(90)
	  , dP             = __webpack_require__(62).f
	  , each           = __webpack_require__(116)(0)
	  , DESCRIPTORS    = __webpack_require__(66);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(59)
	  , IObject  = __webpack_require__(80)
	  , toObject = __webpack_require__(93)
	  , toLength = __webpack_require__(83)
	  , asc      = __webpack_require__(117);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(118);

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(64)
	  , isArray  = __webpack_require__(119)
	  , SPECIES  = __webpack_require__(91)('species');

	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(81);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(57);

	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(121)('Set')});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(99)
	  , from    = __webpack_require__(122);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(112);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(124);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(127);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	__webpack_require__(104);
	module.exports = __webpack_require__(126).f('iterator');

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(91);

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(128), __esModule: true };

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(129);
	__webpack_require__(103);
	__webpack_require__(138);
	__webpack_require__(139);
	module.exports = __webpack_require__(14).Symbol;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(58)
	  , has            = __webpack_require__(72)
	  , DESCRIPTORS    = __webpack_require__(66)
	  , $export        = __webpack_require__(57)
	  , redefine       = __webpack_require__(71)
	  , META           = __webpack_require__(114).KEY
	  , $fails         = __webpack_require__(67)
	  , shared         = __webpack_require__(86)
	  , setToStringTag = __webpack_require__(90)
	  , uid            = __webpack_require__(87)
	  , wks            = __webpack_require__(91)
	  , wksExt         = __webpack_require__(126)
	  , wksDefine      = __webpack_require__(130)
	  , keyOf          = __webpack_require__(131)
	  , enumKeys       = __webpack_require__(132)
	  , isArray        = __webpack_require__(119)
	  , anObject       = __webpack_require__(63)
	  , toIObject      = __webpack_require__(79)
	  , toPrimitive    = __webpack_require__(69)
	  , createDesc     = __webpack_require__(70)
	  , _create        = __webpack_require__(75)
	  , gOPNExt        = __webpack_require__(135)
	  , $GOPD          = __webpack_require__(137)
	  , $DP            = __webpack_require__(62)
	  , $keys          = __webpack_require__(77)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(136).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(134).f  = $propertyIsEnumerable;
	  __webpack_require__(133).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(56)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(61)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(58)
	  , core           = __webpack_require__(14)
	  , LIBRARY        = __webpack_require__(56)
	  , wksExt         = __webpack_require__(126)
	  , defineProperty = __webpack_require__(62).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(77)
	  , toIObject = __webpack_require__(79);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(77)
	  , gOPS    = __webpack_require__(133)
	  , pIE     = __webpack_require__(134);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 133 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 134 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(79)
	  , gOPN      = __webpack_require__(136).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(78)
	  , hiddenKeys = __webpack_require__(88).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(134)
	  , createDesc     = __webpack_require__(70)
	  , toIObject      = __webpack_require__(79)
	  , toPrimitive    = __webpack_require__(69)
	  , has            = __webpack_require__(72)
	  , IE8_DOM_DEFINE = __webpack_require__(65)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(66) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(130)('asyncIterator');

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(130)('observable');

/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = "\n<div v-if=\"isShow\" :type=\"type\" :class=\"classes\" :style=\"style\" :disabled=\"disabled\" @click=\"gotop\" transition=\"gotop-fade\">\n    <slot>\n        <Icon :class=\"icon\" :style=\"iconStyle\"></Icon>\n    </slot>\n</div>\n";

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(142)
	__vue_script__ = __webpack_require__(144)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/loadding/loadding.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(145)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-18beb207/loadding.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(143);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./loadding.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./loadding.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-loadding {\n  z-index: 1080;\n}\n.mv-loadding.mv-line {\n  width: 0.49rem;\n  height: 0.17rem;\n}\n.mv-loadding.mv-line.mv-center {\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -0.245rem;\n  margin-top: -0.085rem;\n}\n.mv-loadding.mv-line span {\n  width: 0.14rem;\n  height: 0.14rem;\n  display: inline-block;\n  background-color: #575f6c;\n  -webkit-animation: lineFrames 1.4s infinite ease-in-out both;\n  animation: lineFrames 1.4s infinite ease-in-out both;\n}\n.mv-loadding.mv-line span:nth-child(1) {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n.mv-loadding.mv-line span:nth-child(1) {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n.mv-loadding.mv-circle {\n  width: 0.28rem;\n  height: 0.28rem;\n  display: inline-block;\n  position: relative;\n}\n.mv-loadding.mv-circle.mv-center {\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -0.14rem;\n  margin-top: -0.14rem;\n}\n.mv-loadding.mv-circle span {\n  width: 7.14285714%;\n  height: 28.57142857%;\n  min-width: 1px;\n  min-height: 1px;\n  background-color: #b2b2b2;\n  display: block;\n  position: absolute;\n  left: 50%;\n  margin-left: -3.57142857%;\n  top: 0;\n  -webkit-transform-origin: 50% 175%;\n  transform-origin: 50% 175%;\n  opacity: 0;\n}\n.mv-loadding.mv-circle span:nth-child(1) {\n  -webkit-transform: rotate(0deg);\n  transform: rotate(0deg);\n  -webkit-animation: circleFrames 900ms 0ms infinite;\n  animation: circleFrames 900ms 0ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(2) {\n  -webkit-transform: rotate(30deg);\n  transform: rotate(30deg);\n  -webkit-animation: circleFrames 900ms 75ms infinite;\n  animation: circleFrames 900ms 75ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(3) {\n  -webkit-transform: rotate(60deg);\n  transform: rotate(60deg);\n  -webkit-animation: circleFrames 900ms 150ms infinite;\n  animation: circleFrames 900ms 150ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(4) {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg);\n  -webkit-animation: circleFrames 900ms 225ms infinite;\n  animation: circleFrames 900ms 225ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(5) {\n  -webkit-transform: rotate(120deg);\n  transform: rotate(120deg);\n  -webkit-animation: circleFrames 900ms 300ms infinite;\n  animation: circleFrames 900ms 300ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(6) {\n  -webkit-transform: rotate(150deg);\n  transform: rotate(150deg);\n  -webkit-animation: circleFrames 900ms 375ms infinite;\n  animation: circleFrames 900ms 375ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(7) {\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg);\n  -webkit-animation: circleFrames 900ms 450ms infinite;\n  animation: circleFrames 900ms 450ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(8) {\n  -webkit-transform: rotate(210deg);\n  transform: rotate(210deg);\n  -webkit-animation: circleFrames 900ms 525ms infinite;\n  animation: circleFrames 900ms 525ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(9) {\n  -webkit-transform: rotate(240deg);\n  transform: rotate(240deg);\n  -webkit-animation: circleFrames 900ms 600ms infinite;\n  animation: circleFrames 900ms 600ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(10) {\n  -webkit-transform: rotate(270deg);\n  transform: rotate(270deg);\n  -webkit-animation: circleFrames 900ms 675ms infinite;\n  animation: circleFrames 900ms 675ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(11) {\n  -webkit-transform: rotate(300deg);\n  transform: rotate(300deg);\n  -webkit-animation: circleFrames 900ms 750ms infinite;\n  animation: circleFrames 900ms 750ms infinite;\n}\n.mv-loadding.mv-circle span:nth-child(12) {\n  -webkit-transform: rotate(330deg);\n  transform: rotate(330deg);\n  -webkit-animation: circleFrames 900ms 825ms infinite;\n  animation: circleFrames 900ms 825ms infinite;\n}\n.mv-loadding.mv-loadding-primary span {\n  background-color: #1da7fe;\n}\n.mv-loadding.mv-loadding-success span {\n  background-color: #13CE66;\n}\n.mv-loadding.mv-loadding-warning span {\n  background-color: #F7BA2A;\n}\n.mv-loadding.mv-loadding-danger span {\n  background-color: #F7BA2A;\n}\n.mv-loadding.mv-loadding-royal span {\n  background-color: #F7BA2A;\n}\n@-webkit-keyframes lineFrames {\n  0%,\n  80%,\n  to {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n  40% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n@keyframes lineFrames {\n  0%,\n  80%,\n  to {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n  40% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n@-webkit-keyframes circleFrames {\n  0% {\n    opacity: 1;\n    filter: alpha(opacity=100);\n  }\n  90% {\n    opacity: 0;\n    filter: alpha(opacity=0);\n  }\n  100% {\n    opacity: 1;\n    filter: alpha(opacity=100);\n  }\n}\n@keyframes circleFrames {\n  0% {\n    opacity: 1;\n    filter: alpha(opacity=100);\n  }\n  90% {\n    opacity: 0;\n    filter: alpha(opacity=0);\n  }\n  100% {\n    opacity: 1;\n    filter: alpha(opacity=100);\n  }\n}\n", ""]);

	// exports


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(48);

	exports.default = {
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        type: {
	            type: String,
	            default: "circle",
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['line', 'circle']);
	            }
	        },
	        show: {
	            type: Boolean,
	            default: false
	        },
	        position: {
	            type: String,
	            default: ""
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return "mv-loadding mv-" + this.type + " " + this.class + " " + (this.position == 'center' ? 'mv-' + this.position : '');
	        }
	    }
	};
	// </script>
	// <style lang="less">
	//     @import "../../assets/css/common.less";
	//     .mv-loadding{
	//         z-index: @zindex-loadding;
	//         &.mv-line{
	//             width: 0.49rem;
	//             height: 0.17rem;
	//             &.mv-center{
	//                 position: fixed;
	//                 left: 50%;
	//                 top: 50%;
	//                 margin-left: -0.245rem;
	//                 margin-top: -0.085rem;
	//             }
	//             span{
	//                 width: 0.14rem;
	//                 height: 0.14rem;
	//                 display: inline-block;
	//                 background-color: #575f6c;
	//                 .x-prefix(animation;lineFrames 1.4s infinite ease-in-out both);
	//                 &:nth-child(1) {
	//                     -webkit-animation-delay: -.32s;
	//                     animation-delay: -.32s
	//                 }
	//                 &:nth-child(1) {
	//                     -webkit-animation-delay: -.16s;
	//                     animation-delay: -.16s
	//                 }
	//             }
	//         }
	//         &.mv-circle{
	//             width: 0.28rem;
	//             height: 0.28rem;
	//             display: inline-block;
	//             position: relative;
	//             &.mv-center{
	//                 position: fixed;
	//                 left: 50%;
	//                 top: 50%;
	//                 margin-left: -0.14rem;
	//                 margin-top: -0.14rem;
	//             }
	//             span {
	//                 width: 7.14285714%;
	//                 height: 28.57142857%;
	//                 min-width: 1px;
	//                 min-height: 1px;
	//                 background-color: @color-icon-theme;
	//                 display: block;
	//                 position: absolute;
	//                 left: 50%;
	//                 margin-left: -3.57142857%;
	//                 top: 0;
	//                 .x-prefix(transform-origin;50% 175%);
	//                 opacity: 0;
	//                 &:nth-child(1) {
	//                     .x-prefix(transform;rotate(0deg));
	//                     .x-prefix(animation;circleFrames 900ms 0ms infinite);
	//                 }
	//                 &:nth-child(2) {
	//                     .x-prefix(transform;rotate(30deg));
	//                     .x-prefix(animation;circleFrames 900ms 75ms infinite);
	//                 }
	//                 &:nth-child(3) {
	//                     .x-prefix(transform;rotate(60deg));
	//                     .x-prefix(animation;circleFrames 900ms 150ms infinite);
	//                 }
	//                 &:nth-child(4) {
	//                     .x-prefix(transform;rotate(90deg));
	//                     .x-prefix(animation;circleFrames 900ms 225ms infinite);
	//                 }
	//                 &:nth-child(5) {
	//                     .x-prefix(transform;rotate(120deg));
	//                     .x-prefix(animation;circleFrames 900ms 300ms infinite);
	//                 }
	//                 &:nth-child(6) {
	//                     .x-prefix(transform;rotate(150deg));
	//                     .x-prefix(animation;circleFrames 900ms 375ms infinite);
	//                 }
	//                 &:nth-child(7) {
	//                     .x-prefix(transform;rotate(180deg));
	//                     .x-prefix(animation;circleFrames 900ms 450ms infinite);
	//                 }
	//                 &:nth-child(8) {
	//                     .x-prefix(transform;rotate(210deg));
	//                     .x-prefix(animation;circleFrames 900ms 525ms infinite);
	//                 }
	//                 &:nth-child(9) {
	//                     .x-prefix(transform;rotate(240deg));
	//                     .x-prefix(animation;circleFrames 900ms 600ms infinite);
	//                 }
	//                 &:nth-child(10) {
	//                     .x-prefix(transform;rotate(270deg));
	//                     .x-prefix(animation;circleFrames 900ms 675ms infinite);
	//                 }
	//                 &:nth-child(11) {
	//                     .x-prefix(transform;rotate(300deg));
	//                     .x-prefix(animation;circleFrames 900ms 750ms infinite);
	//                 }
	//                 &:nth-child(12) {
	//                     .x-prefix(transform;rotate(330deg));
	//                     .x-prefix(animation;circleFrames 900ms 825ms infinite);
	//                 }
	//             }
	//         }
	//
	//
	//         &.mv-loadding-primary{
	//             span{
	//                 background-color: @color-primary;
	//             }
	//         }
	//         &.mv-loadding-success{
	//             span{
	//                 background-color: @color-success;
	//             }
	//         }
	//         &.mv-loadding-warning{
	//             span{
	//                 background-color: @color-warning;
	//             }
	//         }
	//         &.mv-loadding-danger{
	//             span{
	//                 background-color: @color-warning;
	//             }
	//         }
	//         &.mv-loadding-royal{
	//             span{
	//                 background-color: @color-warning;
	//             }
	//         }
	//
	//     }
	//
	//
	//     @keyframes lineFrames {
	//         0%,80%,to {
	//             -webkit-transform: scale(0);
	//             transform: scale(0)
	//         }
	//
	//         40% {
	//             -webkit-transform: scale(1);
	//             transform: scale(1)
	//         }
	//     }
	//
	//     .x-keyframes (circleFrames, {
	//         0% {
	//             .x-opacity(1);
	//         }
	//         90% {
	//             .x-opacity(0);
	//         }
	//         100% {
	//             .x-opacity(1);
	//         }
	//     });
	//
	// </style>
	//
	// <template>
	//     <span v-if="show" :class="classes" :style="style">
	//         <slot>
	//             <template v-if="type == 'circle'">
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//             </template>
	//             <template v-if="type == 'line'">
	//                 <span></span>
	//                 <span></span>
	//                 <span></span>
	//             </template>
	//         </slot>
	//     </span>
	// </template>
	// <script>

/***/ },
/* 145 */
/***/ function(module, exports) {

	module.exports = "\n<span v-if=\"show\" :class=\"classes\" :style=\"style\">\n    <slot>\n        <template v-if=\"type == 'circle'\">\n            <span></span>\n            <span></span>\n            <span></span>\n            <span></span>\n            <span></span>\n            <span></span>\n            <span></span>\n            <span></span>\n            <span></span>\n            <span></span>\n            <span></span>\n            <span></span>\n        </template>\n        <template v-if=\"type == 'line'\">\n            <span></span>\n            <span></span>\n            <span></span>\n        </template>\n    </slot>\n</span>\n";

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(147)
	__vue_script__ = __webpack_require__(149)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/tip/tip.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(150)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4a540502/tip.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(148);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./tip.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./tip.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-tip {\n  margin: 0 auto 0;\n  color: white;\n  background-color: rgba(30, 30, 30, 0.8);\n  padding: 0.1rem 0.18rem;\n  font-size: 0.13rem;\n  z-index: 1050;\n}\n.mv-tip.mv-top {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n}\n.mv-tip.mv-center {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  max-width: 3rem;\n  border-radius: 0.03rem;\n}\n.mv-tip.mv-bottom {\n  position: fixed;\n  bottom: 0px;\n  left: 0px;\n  width: 100%;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n}\n.tip-top-transition {\n  display: inline-block;\n  /* 否则 scale 动画不起作用 */\n  position: fixed;\n  top: 0px;\n  -webkit-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n  -webkit-transform: translate(0, 0);\n  transform: translate(0, 0);\n  opacity: 1;\n  left: 0px;\n}\n.tip-top-enter {\n  -webkit-transform: translate(0, -100%);\n  transform: translate(0, -100%);\n}\n.tip-top-leave {\n  -webkit-transform: translate(0, -100%);\n  transform: translate(0, -100%);\n}\n.tip-center-transition {\n  display: inline-block;\n  /* 否则 scale 动画不起作用 */\n  position: fixed;\n  top: 0px;\n  -webkit-transition: opacity 0.5s ease;\n  transition: opacity 0.5s ease;\n  opacity: 1;\n}\n.tip-center-enter {\n  opacity: 0;\n}\n.tip-center-leave {\n  opacity: 0;\n}\n.tip-bottom-transition {\n  display: inline-block;\n  /* 否则 scale 动画不起作用 */\n  position: fixed;\n  bottom: 0px;\n  -webkit-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n  -webkit-transform: translate(0, 0);\n  transform: translate(0, 0);\n  opacity: 1;\n  left: 0px;\n}\n.tip-bottom-enter {\n  -webkit-transform: translate(0, 100%);\n  transform: translate(0, 100%);\n}\n.tip-bottom-leave {\n  -webkit-transform: translate(0, 100%);\n  transform: translate(0, 100%);\n}\n", ""]);

	// exports


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div :class="classes" v-show="show" :style="styles" :transition="tipTransition">
	//         <slot>提示框框</slot>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        position: {
	            type: String,
	            default: "top",
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['top', 'center', 'bottom']);
	            }
	        },
	        show: Boolean,
	        auto: {
	            type: Boolean,
	            default: true
	        }
	    },
	    data: function data() {
	        return {
	            styles: {}
	        };
	    },

	    computed: {
	        classes: function classes() {
	            return 'mv-tip ' + this.class + ' mv-' + this.position;
	        },
	        tipTransition: function tipTransition() {
	            return 'tip-' + this.position;
	        }
	    },
	    watch: {
	        show: function show(val) {
	            var _this = this;

	            if (val === true) {
	                (function () {
	                    var stylels = (0, _utils.getStyle)(_this.style),
	                        self = _this;
	                    if (_this.position === 'center') {
	                        // 获取可视区域宽度
	                        var selfWidth = (0, _utils.getFullWidth)(_this.$el),
	                            seflHeight = (0, _utils.getFullHeight)(_this.$el);
	                        stylels['margin-left'] = '-' + selfWidth / 2 + 'px';
	                        stylels['margin-top'] = '-' + seflHeight / 2 + 'px';
	                    }
	                    self.styles = stylels;
	                    if (_this.auto === true) {
	                        setTimeout(function () {
	                            self.show = false;
	                        }, 1500);
	                    }
	                })();
	            }
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-tip {
	//     margin: 0 auto 0;
	//     color: white;
	//     background-color: rgba(30, 30, 30, 0.8);
	//     padding: 0.1rem 0.18rem;
	//     font-size: 0.13rem;
	//     z-index: @zindex-modal;
	//     &.mv-top {
	//         position: fixed;
	//         top: 0px;
	//         left: 0px;
	//         width: 100%;
	//         .x-box-sizing(border-box);
	//     }
	//     &.mv-center {
	//         position: fixed;
	//         top: 50%;
	//         left: 50%;
	//         .x-box-sizing(border-box);
	//         max-width: 3rem;
	//         .x-border-radius(0.03rem);
	//     }
	//     &.mv-bottom {
	//         position: fixed;
	//         bottom: 0px;
	//         left: 0px;
	//         width: 100%;
	//         .x-box-sizing(border-box);
	//     }
	// }
	//
	// .tip-top-transition {
	//     display: inline-block;
	//     /* 否则 scale 动画不起作用 */
	//     position: fixed;
	//     top: 0px;
	//     .x-prefix(transition;
	//     all .5s ease);
	//     .x-prefix(transform;
	//     translate(0, 0));
	//     opacity: 1;
	//     left: 0px;
	// }
	//
	// .tip-top-enter {
	//     .x-prefix(transform;
	//     translate(0, -100%));
	// }
	//
	// .tip-top-leave {
	//     .x-prefix(transform;
	//     translate(0, -100%));
	// }
	//
	// .tip-center-transition {
	//     display: inline-block;
	//     /* 否则 scale 动画不起作用 */
	//     position: fixed;
	//     top: 0px;
	//     .x-prefix(transition;
	//     opacity .5s ease);
	//     opacity: 1;
	// }
	//
	// .tip-center-enter {
	//     opacity: 0;
	// }
	//
	// .tip-center-leave {
	//     opacity: 0;
	// }
	//
	// .tip-bottom-transition {
	//     display: inline-block;
	//     /* 否则 scale 动画不起作用 */
	//     position: fixed;
	//     bottom: 0px;
	//     .x-prefix(transition;
	//     all .5s ease);
	//     .x-prefix(transform;
	//     translate(0, 0));
	//     opacity: 1;
	//     left: 0px;
	// }
	//
	// .tip-bottom-enter {
	//     .x-prefix(transform;
	//     translate(0, 100%));
	// }
	//
	// .tip-bottom-leave {
	//     .x-prefix(transform;
	//     translate(0, 100%));
	// }
	// </style>

/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" v-show=\"show\" :style=\"styles\" :transition=\"tipTransition\">\n    <slot>提示框框</slot>\n</div>\n";

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(152)
	__vue_script__ = __webpack_require__(154)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/modal/modal.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(155)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4f0c1723/modal.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(153);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./modal.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./modal.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-modal-wrapper .mv-modal-body {\n  padding: 0.1rem 0.05rem 0.1rem;\n}\n.mv-modal-wrapper .mv-modal-header {\n  font-size: 0.14rem;\n  font-weight: bold;\n  padding: 0.13rem 0.05rem 0rem;\n}\n.mv-modal-wrapper .mv-modal-footer {\n  -moz-border-bottom-left-radius: 0.03rem;\n  border-bottom-left-radius: 0.03rem;\n  -moz-border-bottom-right-radius: 0.03rem;\n  border-bottom-right-radius: 0.03rem;\n  overflow: hidden;\n}\n.mv-modal-wrapper .mv-modal-footer .mv-modal-footer-btn {\n  border: 0px;\n  width: 50%;\n  float: left;\n  padding: 0px;\n}\n.mv-modal-wrapper .mv-modal-footer .mv-modal-footer-btn button {\n  border: 0px;\n  width: 100%;\n  padding: 0.1rem 0px;\n  margin: 1px 0px 0px;\n  color: #1da7fe;\n}\n.mv-modal-wrapper .mv-modal {\n  position: fixed;\n  z-index: 1050;\n  width: 85%;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  background-color: white;\n  text-align: center;\n  border-radius: 3px;\n  overflow: hidden;\n}\n.mv-modal-wrapper .mv-modal.mv-modal-transition {\n  opacity: 1;\n  -webkit-transition-duration: 0.4s;\n  transition-duration: 0.4s;\n  -webkit-transform: translate(-50%, -50%) scale(1);\n  transform: translate(-50%, -50%) scale(1);\n  -webkit-transition-property: transform, opacity;\n  -webkit-transition-property: opacity, -webkit-transform;\n  transition-property: opacity, -webkit-transform;\n  transition-property: transform, opacity;\n  transition-property: transform, opacity, -webkit-transform;\n}\n.mv-modal-wrapper .mv-modal.mv-modal-enter {\n  -webkit-transform: translate(-50%, -50%) scale(1.185);\n  transform: translate(-50%, -50%) scale(1.185);\n  opacity: 0;\n}\n.mv-modal-wrapper .mv-modal.mv-modal-leave {\n  -webkit-transform: translate(-50%, -50%) scale(1);\n  transform: translate(-50%, -50%) scale(1);\n  opacity: 0;\n}\n.mv-modal-wrapper .mv-modal-mask {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 1040;\n  background: rgba(0, 0, 0, 0.6);\n}\n", ""]);

	// exports


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _button = __webpack_require__(39);

	var _button2 = _interopRequireDefault(_button);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: {
	        Icon: _icon2.default,
	        Button: _button2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: [Object, String],
	        show: {
	            type: Boolean,
	            default: false
	        },
	        headerHide: {
	            type: Boolean,
	            default: false
	        },
	        footerHide: {
	            type: Boolean,
	            default: false
	        },
	        cancelText: {
	            type: String,
	            default: '取消'
	        },
	        okText: {
	            type: String,
	            default: '确定'
	        },
	        width: {
	            type: Number,
	            default: '80%'
	        },
	        autoClose: {
	            type: Boolean,
	            default: true
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return 'mv-modal ' + this.class;
	        },
	        styles: function styles() {
	            var styles = (0, _utils.getStyle)(this.style);
	            if (this.width) {
	                styles.width = this.width;
	            }
	            return styles;
	        }
	    },
	    methods: {
	        mask: function mask() {
	            if (this.autoClose) {
	                this.show = false;
	            }
	        },
	        cancel: function cancel() {
	            if (this.autoClose) {
	                this.show = false;
	            }
	            this.$emit('on-cancel');
	        },
	        ok: function ok() {
	            if (this.autoClose) {
	                this.show = false;
	            }
	            this.$emit('on-ok');
	        },

	        watch: {
	            show: function show(val) {
	                if (val === false) {
	                    setTimeout(function () {
	                        //this.wrapShow = false;
	                    }, 300);
	                    //this.removeScrollEffect();
	                } else {
	                        //this.wrapShow = true;
	                        //this.addScrollEffect();
	                    }
	            }
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-modal-wrapper {
	//     .mv-modal-body {
	//         padding: 0.1rem 0.05rem 0.1rem;
	//     }
	//     .mv-modal-header {
	//         font-size: 0.14rem;
	//         font-weight: bold;
	//         padding: 0.13rem 0.05rem 0rem;
	//     }
	//     .mv-modal-footer {
	//         .x-prefix(border-bottom-left-radius;
	//         0.03rem);
	//         .x-prefix(border-bottom-right-radius;
	//         0.03rem);
	//         overflow: hidden;
	//         .mv-modal-footer-btn {
	//             border: 0px;
	//             width: 50%;
	//             float: left;
	//             padding: 0px;
	//             button {
	//                 border: 0px;
	//                 width: 100%;
	//                 padding: 0.1rem 0px;
	//                 margin: 1px 0px 0px;
	//                 color: @color-theme;
	//             }
	//         }
	//     }
	//     .mv-modal {
	//         position: fixed;
	//         z-index: @zindex-modal;
	//         width: 85%;
	//         top: 50%;
	//         left: 50%;
	//         .x-prefix(transform;
	//         translate(-50%, -50%));
	//         background-color: white;
	//         text-align: center;
	//         border-radius: 3px;
	//         overflow: hidden;
	//         &.mv-modal-transition {
	//             opacity: 1;
	//             .x-prefix(transition-duration;0.4s);
	//             .x-prefix(transform;translate(-50%, -50%) scale(1));
	//             .x-prefix(transition-property;transform, opacity);
	//         }
	//         &.mv-modal-enter {
	//             .x-prefix(transform;translate(-50%, -50%) scale(1.185));
	//             opacity: 0;
	//         }
	//         &.mv-modal-leave {
	//             .x-prefix(transform;translate(-50%, -50%) scale(1));
	//             opacity: 0;
	//         }
	//     }
	//     .mv-modal-mask {
	//         position: fixed;
	//         width: 100%;
	//         height: 100%;
	//         top: 0;
	//         left: 0;
	//         z-index: @zindex-modal-background;
	//         background: rgba(0, 0, 0, .6);
	//     }
	//
	// }
	// </style>
	// <template>
	//     <div class="mv-modal-wrapper">
	//         <div class="mv-modal-mask" @click="mask" v-show="show" transition="mv-fade"></div>
	//         <div :class="classes" :style="styles" v-show="show" transition="mv-modal">
	//             <div class="mv-modal-header" v-if="!headerHide">
	//                 <slot name="header">
	//                     <p>{{ title }}</p>
	//                 </slot>
	//             </div>
	//             <div class="mv-modal-body">
	//                 <slot></slot>
	//             </div>
	//             <div class="mv-modal-footer" v-if="!footerHide">
	//                 <slot name="footer">
	//                     <div class="mv-modal-footer-btn mv-1px-t">
	//                         <Button class="mv-1px-r" @click="cancel">{{ cancelText }}</Button>
	//                     </div>
	//                     <div class="mv-modal-footer-btn mv-1px-t">
	//                         <Button @click="ok">{{ okText }}</Button>
	//                     </div>
	//                 </slot>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	// <script>

/***/ },
/* 155 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"mv-modal-wrapper\">\n    <div class=\"mv-modal-mask\" @click=\"mask\" v-show=\"show\" transition=\"mv-fade\"></div>\n    <div :class=\"classes\" :style=\"styles\" v-show=\"show\" transition=\"mv-modal\">\n        <div class=\"mv-modal-header\" v-if=\"!headerHide\">\n            <slot name=\"header\">\n                <p>{{ title }}</p>\n            </slot>\n        </div>\n        <div class=\"mv-modal-body\">\n            <slot></slot>\n        </div>\n        <div class=\"mv-modal-footer\" v-if=\"!footerHide\">\n            <slot name=\"footer\">\n                <div class=\"mv-modal-footer-btn mv-1px-t\">\n                    <Button class=\"mv-1px-r\" @click=\"cancel\">{{ cancelText }}</Button>\n                </div>\n                <div class=\"mv-modal-footer-btn mv-1px-t\">\n                    <Button @click=\"ok\">{{ okText }}</Button>\n                </div>\n            </slot>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _assign = __webpack_require__(157);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(161);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(162);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _vue = __webpack_require__(7);

	var _vue2 = _interopRequireDefault(_vue);

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _modal = __webpack_require__(151);

	var _modal2 = _interopRequireDefault(_modal);

	var _button = __webpack_require__(39);

	var _button2 = _interopRequireDefault(_button);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Alert = function () {
	    function Alert() {
	        (0, _classCallCheck3.default)(this, Alert);

	        this.options = {};
	        this.instance = null;
	        this.initAlert();
	    }

	    (0, _createClass3.default)(Alert, [{
	        key: 'initAlert',
	        value: function initAlert() {
	            var $div = document.createElement('div');
	            var self = this;
	            $div.innerHTML = '\n            <Modal :show.sync="show">\n                <div slot="header"><div>{{{ title }}}</div></div>\n                <div>\n                    {{{ content }}}\n                </div>\n                <div slot="footer">\n                    <Button class="mv-alert-btn mv-1px-t" style="border: 0px;background-color: transparent;width: 100%;height: 0.4rem;" @click="ok">{{ okText }}</Button>\n                </div>\n            </Modal>\n        ';

	            document.body.appendChild($div);
	            this.modal = new _vue2.default({
	                el: $div,
	                components: {
	                    Modal: _modal2.default,
	                    Button: _button2.default,
	                    Icon: _icon2.default
	                },
	                data: (0, _assign2.default)(this.options, {
	                    show: false,
	                    title: '',
	                    content: '',
	                    okText: '确定',
	                    onClose: function onClose() {}
	                }),
	                methods: {
	                    ok: function ok() {
	                        this.show = false;
	                        this.onClose && this.onClose.call(self);
	                    },
	                    destroy: function destroy() {
	                        this.$destroy();
	                        document.body.removeChild($div);
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'show',
	        value: function show(param) {
	            (0, _assign2.default)(this.options, param);
	        }
	    }, {
	        key: 'destory',
	        value: function destory() {
	            this.modal.destroy();
	            Alert.instance = null;
	        }
	    }], [{
	        key: 'getInstance',
	        value: function getInstance() {
	            if (!this.instance) {
	                this.instance = new Alert();
	            }
	            return this.instance;
	        }
	    }]);
	    return Alert;
	}();

	exports.default = {
	    show: function show() {
	        var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        var instance = Alert.getInstance();
	        param['show'] = true;
	        instance.show(param);
	    },
	    remove: function remove() {
	        var instance = Alert.getInstance();
	        instance.destory();
	    }
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(158), __esModule: true };

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(159);
	module.exports = __webpack_require__(14).Object.assign;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(57);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(160)});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(77)
	  , gOPS     = __webpack_require__(133)
	  , pIE      = __webpack_require__(134)
	  , toObject = __webpack_require__(93)
	  , IObject  = __webpack_require__(80)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(67)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 161 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(163);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(164), __esModule: true };

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(165);
	var $Object = __webpack_require__(14).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(57);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(66), 'Object', {defineProperty: __webpack_require__(62).f});

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(167)
	__vue_script__ = __webpack_require__(169)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/progress/progress.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(170)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-b82177b2/progress.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(168);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./progress.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./progress.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-progress .mv-progress-outer {\n  display: inline-block;\n  width: 100%;\n  margin-right: -0.4rem;\n  padding-right: 0.4rem;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n}\n.mv-progress .mv-progress-outer .mv-progress-iner {\n  width: 100%;\n}\n.mv-progress .mv-progress-outer .mv-progress-iner .mv-progress-percent {\n  -webkit-transition: width 0.25s linear 0s;\n  transition: width 0.25s linear 0s;\n  -ms-transition: width 0.25s linear 0s;\n}\n.mv-progress .mv-progress-text {\n  display: inline-block;\n  font-size: 0.13rem;\n}\n.mv-progress.mv-progress-round .mv-progress-iner {\n  border-radius: 0.1rem;\n}\n.mv-progress.mv-progress-round .mv-progress-iner .mv-progress-percent {\n  border-radius: 0.1rem;\n}\n.mv-progress.mv-progress-square .mv-progress-iner {\n  border-radius: 0rem;\n}\n.mv-progress.mv-progress-square .mv-progress-iner .mv-progress-percent {\n  border-radius: 0rem;\n}\n", ""]);

	// exports


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _button = __webpack_require__(39);

	var _button2 = _interopRequireDefault(_button);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: { Icon: _icon2.default, Button: _button2.default },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        height: {
	            type: Number,
	            default: 0.1
	        },
	        percent: {
	            type: Number,
	            default: 0
	        },
	        shape: {
	            type: String,
	            default: 'round',
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['round', 'square']);
	            }
	        },
	        strokeColor: {
	            type: String,
	            default: '#007aff'
	        },
	        bgColor: {
	            type: String,
	            default: '#f3f3f3'
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return 'mv-progress ' + this.class + ' mv-progress-' + this.shape;
	        },
	        styles: function styles() {
	            var styles = (0, _utils.getStyle)(this.style);
	            if (this.width) {
	                styles.width = this.width;
	            }
	            return styles;
	        },
	        inerStyles: function inerStyles() {
	            return {
	                'height': this.height + 'rem',
	                'width': this.percent + '%',
	                'background-color': this.strokeColor
	            };
	        },
	        bgStyles: function bgStyles() {
	            return {
	                'background-color': this.bgColor
	            };
	        }
	    }
	};
	// </script>
	// <style lang="less">
	//     @import "../../assets/css/common.less";
	//     .mv-progress{
	//         .mv-progress-outer{
	//             display: inline-block;
	//             width: 100%;
	//             margin-right: -0.4rem;
	//             padding-right: 0.4rem;
	//             .x-box-sizing(border-box);
	//             .mv-progress-iner{
	//                 width: 100%;
	//                 .mv-progress-percent{
	//                     .x-transition(width, 0.25s, linear, 0s);
	//                 }
	//             }
	//         }
	//         .mv-progress-text{
	//             display: inline-block;
	//             font-size: 0.13rem;
	//         }
	//         &.mv-progress-round{
	//             .mv-progress-iner{
	//                 .x-border-radius(0.1rem);
	//                 .mv-progress-percent{
	//                     .x-border-radius(0.1rem);
	//                 }
	//             }
	//         }
	//         &.mv-progress-square{
	//             .mv-progress-iner{
	//                 .x-border-radius(0rem);
	//                 .mv-progress-percent{
	//                     .x-border-radius(0rem);
	//                 }
	//             }
	//         }
	//     }
	//
	// </style>
	//
	// <template>
	//     <div :class="classes" :style="styles">
	//         <div class="mv-progress-outer">
	//             <div class="mv-progress-iner" :style="bgStyles">
	//                 <div class="mv-progress-percent" :style="inerStyles"></div>
	//             </div>
	//         </div>
	//         <div class="mv-progress-text">{{percent}}%</div>
	//     </div>
	// </template>
	// <script>

/***/ },
/* 170 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"styles\">\n    <div class=\"mv-progress-outer\">\n        <div class=\"mv-progress-iner\" :style=\"bgStyles\">\n            <div class=\"mv-progress-percent\" :style=\"inerStyles\"></div>\n        </div>\n    </div>\n    <div class=\"mv-progress-text\">{{percent}}%</div>\n</div>\n";

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(172)
	__vue_script__ = __webpack_require__(174)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/circle/circle.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(175)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6ea3a747/circle.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(173);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./circle.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./circle.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-circle {\n  position: relative;\n  display: inline-block;\n}\n.mv-circle svg {\n  width: 100%;\n}\n.mv-circle circle {\n  -webkit-transition: stroke-dasharray 0.25s linear 0s;\n  transition: stroke-dasharray 0.25s linear 0s;\n  -ms-transition: stroke-dasharray 0.25s linear 0s;\n}\n.mv-circle .mv-circle-text {\n  width: 100%;\n  text-align: center;\n  position: absolute;\n  left: 0;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  line-height: 1;\n}\n", ""]);

	// exports


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _button = __webpack_require__(39);

	var _button2 = _interopRequireDefault(_button);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: {
	        Icon: _icon2.default,
	        Button: _button2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: [Object, String],
	        percent: {
	            type: Number,
	            default: 0
	        },
	        size: {
	            type: Number,
	            default: 0.5
	        },
	        strokeWidth: {
	            type: Number,
	            default: 10
	        },
	        strokeColor: {
	            type: String,
	            default: '#007aff'
	        },
	        strokeLinecap: {
	            type: String,
	            default: 'round',
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['round', 'square']);
	            }
	        },
	        bgWidth: {
	            type: Number,
	            default: 10
	        },
	        bgColor: {
	            type: String,
	            default: '#ecf1f4'
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return 'mv-circle ' + this.class + ' mv-progress-' + this.strokeLinecap;
	        },
	        styles: function styles() {
	            var styles = (0, _utils.getStyle)(this.style);
	            styles.width = this.size + 'rem';
	            styles.height = this.size + 'rem';
	            return styles;
	        },
	        strokeRouter: function strokeRouter() {
	            var maxWidth = Math.max(this.strokeWidth, this.bgWidth);
	            return 50 - maxWidth / 2;
	        },
	        dashArray: function dashArray() {
	            this.percent = this.percent <= 0 ? 0 : this.percent;
	            this.percent = this.percent >= 100 ? 100 : this.percent;
	            var circleWidth = 2 * Math.PI * this.strokeRouter,
	                dashArray = circleWidth * this.percent / 100,
	                dashArrayTwo = circleWidth * (1 - this.percent / 100);
	            return dashArray + ' ' + dashArrayTwo;
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-circle {
	//     position: relative;
	//     display: inline-block;
	//     svg {
	//         width: 100%;
	//     }
	//     circle {
	//         .x-transition(stroke-dasharray, .25s, linear, 0s);
	//     }
	//     .mv-circle-text {
	//         width: 100%;
	//         text-align: center;
	//         position: absolute;
	//         left: 0;
	//         top: 50%;
	//         -webkit-transform: translateY(-50%);
	//         transform: translateY(-50%);
	//         line-height: 1;
	//     }
	// }
	// </style>
	// <template>
	//     <div :class="classes" :style="styles">
	//         <svg viewbox="0 0 100 100">
	//             <circle cx="50" cy="50" :r="strokeRouter" :stroke-width="bgWidth" :stroke="bgColor" fill="none"></circle>
	//             <circle cx="50" cy="50" :r="strokeRouter" :stroke-width="strokeWidth" :stroke="strokeColor" fill="none" transform="matrix(0,-1,1,0,0,100)" :stroke-dasharray="dashArray" :stroke-linecap="strokeLinecap"></circle>
	//         </svg>
	//         <div class="mv-circle-text">
	//             <slot>
	//                 {{ percent }}%
	//             </slot>
	//         </div>
	//     </div>
	// </template>
	// <script>

/***/ },
/* 175 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"styles\">\n    <svg viewbox=\"0 0 100 100\">\n        <circle cx=\"50\" cy=\"50\" :r=\"strokeRouter\" :stroke-width=\"bgWidth\" :stroke=\"bgColor\" fill=\"none\"></circle>\n        <circle cx=\"50\" cy=\"50\" :r=\"strokeRouter\" :stroke-width=\"strokeWidth\" :stroke=\"strokeColor\" fill=\"none\" transform=\"matrix(0,-1,1,0,0,100)\" :stroke-dasharray=\"dashArray\" :stroke-linecap=\"strokeLinecap\"></circle>\n    </svg>\n    <div class=\"mv-circle-text\">\n        <slot>\n            {{ percent }}%\n        </slot>\n    </div>\n</div>\n";

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(177)
	__vue_script__ = __webpack_require__(179)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/inputbox/inputbox.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(180)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-2b016ab2/inputbox.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(178);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./inputbox.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./inputbox.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-inputbox {\n  position: relative;\n  display: inline-block;\n  font-size: 0.13rem;\n}\n.mv-inputbox label {\n  word-wrap: break-word;\n  word-break: break-all;\n  margin-right: 0.05rem;\n}\n.mv-inputbox input {\n  width: 100%;\n  border: 0;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -o-appearance: none;\n  -ms-appearance: none;\n  appearance: none;\n  background-color: transparent;\n  font-size: inherit;\n  color: inherit;\n  line-height: normal;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  -moz-flex: 1;\n  -o-flex: 1;\n  -o-webkit-flex: 1;\n  flex: 1;\n  padding: 0.1rem 0.03rem;\n}\n.mv-inputbox .mv-inputbox-clear {\n  color: #b2b2b2;\n  font-size: 0.16rem;\n}\n.mv-inputbox i {\n  color: #b2b2b2;\n  font-size: 0.16rem;\n  position: absolute;\n  right: 0.1rem;\n  top: 0.045rem;\n}\n", ""]);

	// exports


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        value: {
	            type: String,
	            default: ""
	        },
	        type: {
	            type: String,
	            default: "text"
	        },
	        placeholder: {
	            type: String,
	            default: ""
	        },
	        closeIcon: {
	            type: Boolean,
	            default: true
	        }
	    },
	    data: function data() {
	        return {
	            status: 0
	        };
	    },

	    computed: {
	        classes: function classes() {
	            return "mv-inputbox " + this.class;
	        }
	    },
	    methods: {
	        cleanInput: function cleanInput() {
	            this.value = "";
	        }
	    },
	    watch: {
	        value: function value(val) {
	            if (val.length > 0) {
	                this.status = 1;
	            } else {
	                this.status = 0;
	            }
	            this.$emit('on-change');
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-inputbox {
	//     position: relative;
	//     display: inline-block;
	//     font-size: 0.13rem;
	//     label {
	//         word-wrap: break-word;
	//         word-break: break-all;
	//         margin-right: 0.05rem;
	//     }
	//     input {
	//         width: 100%;
	//         border: 0;
	//         outline: 0;
	//         .x-prefix(appearance;none);
	//         background-color: transparent;
	//         font-size: inherit;
	//         color: inherit;
	//         line-height: normal;
	//         .x-flex(1);
	//         padding: 0.1rem 0.03rem;
	//     }
	//     .mv-inputbox-clear {
	//         color: @color-icon-theme;
	//         font-size: 0.16rem;
	//     }
	//     i {
	//         color: @color-icon-theme;
	//         font-size: 0.16rem;
	//         position: absolute;
	//         right: 0.1rem;
	//         top: 0.045rem;
	//     }
	// }
	// </style>
	// <template>
	//     <div :class="classes" :style="style">
	//         <input :type="type" :placeholder="placeholder" v-model="value" :value="value" />
	//         <slot name="icon">
	//             <Icon v-if="status == 1 && closeIcon" class="mv-icon-round-close-fill mv-inputbox-clear" @click="cleanInput"></Icon>
	//         </slot>
	//     </div>
	// </template>
	// <script>

/***/ },
/* 180 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"style\">\n    <input :type=\"type\" :placeholder=\"placeholder\" v-model=\"value\" :value=\"value\" />\n    <slot name=\"icon\">\n        <Icon v-if=\"status == 1 && closeIcon\" class=\"mv-icon-round-close-fill mv-inputbox-clear\" @click=\"cleanInput\"></Icon>\n    </slot>\n</div>\n";

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(182)
	__vue_script__ = __webpack_require__(184)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/radio/radio.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(185)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1173ad82/radio.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(183);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./radio.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./radio.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-radio {\n  position: relative;\n  font-size: 0.15rem;\n  display: inline-block;\n}\n.mv-radio label {\n  word-wrap: break-word;\n  word-break: break-all;\n  display: block;\n}\n.mv-radio label .mv-radio-icon {\n  font-size: 0.2rem;\n  vertical-align: middle;\n  color: #ccc;\n}\n.mv-radio label .mv-radio-icon.selected {\n  color: #1da7fe;\n}\n.mv-radio label .mv-radio-icon.mv-radio-disabled {\n  color: #eee;\n}\n.mv-radio label input[type=\"radio\"] {\n  display: none;\n}\n.mv-radio label span {\n  vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div :class="classes" :style="style">
	//         <label :for="ids">
	//             <Icon :class="iconClasses" :style="iconStyles"></Icon>
	//             <input type="radio" :disabled="disabled" :id="ids" :value="value" :checked="checked" v-model="picked" @change="change">
	//             <slot>
	//                 <span>{{value}}</span>
	//             </slot>
	//         </label>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        picked: {
	            type: String,
	            default: ""
	        },
	        value: {
	            type: String,
	            default: ""
	        },
	        checked: {
	            type: Boolean,
	            default: false
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        selectIcon: {
	            type: String,
	            default: "mv-icon-round-radio"
	        },
	        noSelectIcon: {
	            type: String,
	            default: "mv-icon-round"
	        },
	        iconStyles: {
	            type: [String, Object],
	            default: ""
	        },
	        id: {
	            type: String,
	            default: ""
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return 'mv-radio ' + this.class;
	        },
	        ids: function ids() {
	            return this.id === "" ? "mv_radio_" + (0, _utils.getUUID)() : this.id;
	        },
	        iconClasses: function iconClasses() {
	            return (this.checked ? this.selectIcon + ' selected' : this.noSelectIcon) + ' ' + (this.disabled ? 'mv-radio-disabled' : '') + ' mv-radio-icon';
	        }
	    },
	    methods: {
	        change: function change(e) {
	            this.$emit('on-change', this.picked);
	        }
	    },
	    watch: {
	        picked: function picked(val) {
	            if (this.disabled === false) {
	                if (val != this.value) {
	                    this.checked = false;
	                } else {
	                    this.checked = true;
	                }
	            }
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-radio {
	//     position: relative;
	//     font-size: 0.15rem;
	//     display: inline-block;
	//     label {
	//         word-wrap: break-word;
	//         word-break: break-all;
	//         display: block;
	//         .mv-radio-icon {
	//             font-size: 0.2rem;
	//             vertical-align: middle;
	//             color: @color-no-select-theme;
	//             &.selected {
	//                 color: @color-select-theme;
	//             }
	//             ;
	//             &.mv-radio-disabled {
	//                 color: @color-disabled-theme;
	//             }
	//             ;
	//         }
	//         input[type="radio"] {
	//             display: none;
	//         }
	//         span {
	//             vertical-align: middle;
	//         }
	//     }
	// }
	// </style>

/***/ },
/* 185 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"style\">\n    <label :for=\"ids\">\n        <Icon :class=\"iconClasses\" :style=\"iconStyles\"></Icon>\n        <input type=\"radio\" :disabled=\"disabled\" :id=\"ids\" :value=\"value\" :checked=\"checked\" v-model=\"picked\" @change=\"change\">\n        <slot>\n            <span>{{value}}</span>\n        </slot>\n    </label>\n</div>\n";

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(187)
	__vue_script__ = __webpack_require__(189)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/checkbox/checkbox.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(190)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-74294ce7/checkbox.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(188);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./checkbox.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./checkbox.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-checkbox {\n  position: relative;\n  font-size: 0.15rem;\n  display: inline-block;\n}\n.mv-checkbox label {\n  word-wrap: break-word;\n  word-break: break-all;\n  margin-right: 0.05rem;\n  display: block;\n}\n.mv-checkbox label .mv-checkbox-icon {\n  font-size: 0.2rem;\n  vertical-align: middle;\n  color: #ccc;\n}\n.mv-checkbox label .mv-checkbox-icon.selected {\n  color: #1da7fe;\n}\n.mv-checkbox label .mv-checkbox-icon.mv-checkbox-disabled {\n  color: #eee;\n}\n.mv-checkbox label input[type=\"checkbox\"] {\n  display: none;\n}\n.mv-checkbox label span {\n  vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div :class="classes" :style="style">
	//         <label :for="ids">
	//             <Icon :class="iconClasses" :style="iconStyles"></Icon>
	//             <input type="checkbox" :id="ids" :disabled="disabled" :value="value" :checked="checked" v-model="picked" @change="change">
	//             <slot>
	//                 <span>
	//                     {{value}}
	//                 </span>
	//             </slot>
	//         </label>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        picked: {
	            type: Array,
	            default: []
	        },
	        value: {
	            type: String,
	            default: ""
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        checked: {
	            type: Boolean,
	            default: false
	        },
	        selectIcon: {
	            type: String,
	            default: "mv-icon-round-check-fill"
	        },
	        noSelectIcon: {
	            type: String,
	            default: "mv-icon-round"
	        },
	        iconStyles: {
	            type: [String, Object],
	            default: ""
	        },
	        id: {
	            type: String,
	            default: ""
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return 'mv-checkbox ' + this.class;
	        },
	        ids: function ids() {
	            return this.id === "" ? 'mv_checkbox_' + (0, _utils.getUUID)() : this.id;
	        },
	        iconClasses: function iconClasses() {
	            return (this.checked ? this.selectIcon + ' selected' : this.noSelectIcon) + ' ' + (this.disabled ? 'mv-checkbox-disabled' : '') + ' mv-checkbox-icon';
	        }
	    },
	    methods: {
	        change: function change(e) {
	            this.$emit('on-change', this.picked);
	        },
	        isTrue: function isTrue(val) {
	            if (val.indexOf(this.value) > -1) {
	                this.checked = true;
	            } else {
	                this.checked = false;
	            }
	        }
	    },
	    watch: {
	        picked: function picked(val) {
	            var self = this;
	            self.isTrue(val);
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-checkbox {
	//     position: relative;
	//     font-size: 0.15rem;
	//     display: inline-block;
	//     label {
	//         word-wrap: break-word;
	//         word-break: break-all;
	//         margin-right: 0.05rem;
	//         display: block;
	//         .mv-checkbox-icon {
	//             font-size: 0.2rem;
	//             vertical-align: middle;
	//             color: @color-no-select-theme;
	//             &.selected {
	//                 color: @color-select-theme;
	//             }
	//             &.mv-checkbox-disabled {
	//                 color: @color-disabled-theme;
	//             }
	//         }
	//         input[type="checkbox"] {
	//             display: none;
	//         }
	//         span {
	//             vertical-align: middle;
	//         }
	//     }
	// }
	// </style>

/***/ },
/* 190 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"style\">\n    <label :for=\"ids\">\n        <Icon :class=\"iconClasses\" :style=\"iconStyles\"></Icon>\n        <input type=\"checkbox\" :id=\"ids\" :disabled=\"disabled\" :value=\"value\" :checked=\"checked\" v-model=\"picked\" @change=\"change\">\n        <slot>\n            <span>\n                {{value}}\n            </span>\n        </slot>\n    </label>\n</div>\n";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(192)
	__vue_script__ = __webpack_require__(194)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/selector/selector.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(195)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-71ae2732/selector.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(193);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./selector.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./selector.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-selector {\n  position: relative;\n  font-size: 0.13rem;\n  display: inline-block;\n  border: solid 1px #d7dde4;\n  padding: 0rem 0.05rem;\n  border-radius: 0.02rem;\n  vertical-align: middle;\n}\n.mv-selector select {\n  vertical-align: middle;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -o-appearance: none;\n  -ms-appearance: none;\n  appearance: none;\n  -o-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -o-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border: 0px;\n  background: transparent;\n}\n.mv-selector .mv-arrow-icon {\n  vertical-align: middle;\n  color: #ccc;\n}\n", ""]);

	// exports


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        selected: {
	            type: String,
	            default: ''
	        },
	        placeholder: {
	            type: String,
	            default: ''
	        },
	        options: {
	            type: Array,
	            default: []
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        arrowIcon: {
	            type: String,
	            default: "mv-icon-arrow-bottom"
	        },
	        iconStyle: {
	            type: [String, Object],
	            default: ""
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return "mv-selector " + this.class;
	        },
	        optionArr: function optionArr() {
	            var self = this;
	            this.options.forEach(function (v) {
	                if (v.value == self.selected) {
	                    v.selected = "selected";
	                }
	            });
	            return this.options;
	        },
	        iconClasses: function iconClasses() {
	            return "mv-arrow-icon " + this.arrowIcon;
	        }
	    },
	    methods: {
	        change: function change(e) {
	            this.selected = e.target.value;
	            this.$emit('on-change', this.selected);
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-selector {
	//     position: relative;
	//     font-size: 0.13rem;
	//     display: inline-block;
	//     border: solid 1px @color-border-theme;
	//     padding: 0rem 0.05rem;
	//     border-radius: 0.02rem;
	//     vertical-align: middle;
	//     select {
	//         vertical-align: middle;
	//         .x-prefix(appearance;
	//         none);
	//         .x-prefix(box-sizing;
	//         border-box);
	//         .x-user-select();
	//         border: 0px;
	//         background: transparent;
	//     }
	//     .mv-arrow-icon {
	//         vertical-align: middle;
	//         color: @color-no-select-theme;
	//     }
	// }
	// </style>
	// <template>
	//     <div :class="classes" :style="style">
	//         <select @change="change" :disabled="disabled">
	//             <option v-if="placeholder" value="">{{placeholder}}</option>
	//             <option v-for="item in optionArr" :value="item.value" :selected="item.selected">{{ item.label }}</option>
	//         </select>
	//         <Icon :class="iconClasses" :style="iconStyle"></Icon>
	//     </div>
	// </template>
	// <script>

/***/ },
/* 195 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"style\">\n    <select @change=\"change\" :disabled=\"disabled\">\n        <option v-if=\"placeholder\" value=\"\">{{placeholder}}</option>\n        <option v-for=\"item in optionArr\" :value=\"item.value\" :selected=\"item.selected\">{{ item.label }}</option>\n    </select>\n    <Icon :class=\"iconClasses\" :style=\"iconStyle\"></Icon>\n</div>\n";

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(197)
	__vue_script__ = __webpack_require__(199)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/switch/switch.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(200)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-ef87a272/switch.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(198);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./switch.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./switch.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-switch {\n  width: 0.44rem;\n  height: 0.24rem;\n  line-height: 0.22rem;\n  border-radius: 0.4rem;\n  border: 0.01rem solid #d7dde4;\n  background-color: #d7dde4;\n  position: relative;\n  -webkit-transition: all 0.2s ease-in-out 0s;\n  transition: all 0.2s ease-in-out 0s;\n  -ms-transition: all 0.2s ease-in-out 0s;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -o-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  color: white;\n}\n.mv-switch:after {\n  content: '';\n  width: 0.22rem;\n  height: 0.22rem;\n  border-radius: 100%;\n  background-color: #fff;\n  position: absolute;\n  left: 0;\n  top: 0;\n  cursor: pointer;\n  -webkit-transition: transform 0.2s ease-in-out 0s;\n  -webkit-transition: -webkit-transform 0.2s ease-in-out 0s;\n  transition: -webkit-transform 0.2s ease-in-out 0s;\n  transition: transform 0.2s ease-in-out 0s;\n  transition: transform 0.2s ease-in-out 0s, -webkit-transform 0.2s ease-in-out 0s;\n  -ms-transition: transform 0.2s ease-in-out 0s;\n  /* IE 9 */\n  -webkit-transform: translate3d(0rem, 0rem, 0rem);\n  transform: translate3d(0rem, 0rem, 0rem);\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n}\n.mv-switch.mv-switch-checked {\n  border-color: #1da7fe;\n  background-color: #1da7fe;\n}\n.mv-switch.mv-switch-checked:after {\n  /* IE 9 */\n  -webkit-transform: translate3d(0.2rem, 0rem, 0rem);\n  transform: translate3d(0.2rem, 0rem, 0rem);\n}\n.mv-switch .mv-switch-open {\n  float: left;\n  margin-left: 0.04rem;\n}\n.mv-switch .mv-switch-close {\n  float: right;\n  margin-right: 0.04rem;\n}\n.mv-switch.mv-switch-disabled {\n  cursor: not-allowed;\n  background: #f3f3f3;\n  border-color: #f3f3f3;\n}\n.mv-switch.mv-switch-disabled:after {\n  background: #d7dde4;\n  cursor: not-allowed;\n}\n.mv-switch.mv-switch-disabled .mv-switch-inner {\n  color: #d7dde4;\n}\n", ""]);

	// exports


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        checked: {
	            type: Boolean,
	            default: false
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return "mv-switch " + (this.disabled ? 'mv-switch-disabled' : '') + " " + (this.checked ? 'mv-switch-checked' : '') + " " + this.class;
	        }
	    },
	    methods: {
	        change: function change(e) {
	            if (this.disabled) {
	                return false;
	            }
	            this.checked = !this.checked;
	            this.$emit('on-change', this.checked);
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-switch {
	//     width: 0.44rem;
	//     height: 0.24rem;
	//     line-height: 0.22rem;
	//     .x-border-radius(0.4rem);
	//     border: 0.01rem solid @color-border-theme;
	//     background-color: @color-border-theme;
	//     position: relative;
	//     .x-transition(all,.2s,ease-in-out);
	//     .x-user-select();
	//     .x-box-sizing(border-box);
	//     color: white;
	//     &:after {
	//         content: '';
	//         width: 0.22rem;
	//         height: 0.22rem;
	//         .x-border-radius(100%);
	//         background-color: #fff;
	//         position: absolute;
	//         left: 0;
	//         top: 0;
	//         cursor: pointer;
	//         .x-transition(transform,.2s,ease-in-out);
	//         .x-transform-translate3d(0rem,0rem,0rem);
	//         .x-box-sizing(border-box);
	//     }
	//     &.mv-switch-checked{
	//         border-color: @color-theme;
	//         background-color: @color-theme;
	//     }
	//     &.mv-switch-checked:after {
	//         .x-transform-translate3d(0.2rem,0rem,0rem);
	//     }
	//     .mv-switch-open{
	//         float: left;
	//         margin-left: 0.04rem;
	//     }
	//     .mv-switch-close{
	//         float: right;
	//         margin-right: 0.04rem;
	//     }
	//     &.mv-switch-disabled {
	//         cursor: not-allowed;
	//         background: @color-gray;
	//         border-color:@color-gray;
	//     }
	//     &.mv-switch-disabled:after {
	//         background: @color-border-theme;
	//         cursor: not-allowed
	//     }
	//     &.mv-switch-disabled .mv-switch-inner {
	//         color: @color-border-theme;
	//     }
	// }
	// </style>
	// <template>
	//     <div :class="classes" :style="style" @click="change">
	//         <span class="mv-switch-inner">
	//             <span v-if="checked" class="mv-switch-open">
	//                 <slot name="open"></slot>
	//             </span>
	//             <span v-if="!checked" class="mv-switch-close">
	//                 <slot name="close"></slot>
	//             </span>
	//         </span>
	//     </div>
	// </template>
	// <script>

/***/ },
/* 200 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"style\" @click=\"change\">\n    <span class=\"mv-switch-inner\">\n        <span v-if=\"checked\" class=\"mv-switch-open\">\n            <slot name=\"open\"></slot>\n        </span>\n        <span v-if=\"!checked\" class=\"mv-switch-close\">\n            <slot name=\"close\"></slot>\n        </span>\n    </span>\n</div>\n";

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(202)
	__vue_script__ = __webpack_require__(204)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/accordion/panel.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(205)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4dd6f056/panel.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(203);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./panel.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./panel.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-panel .mv-panel-title {\n  position: relative;\n  padding: 0.1rem;\n  color: #525558;\n  font-size: 0.13rem;\n}\n.mv-panel .mv-panel-title i {\n  position: absolute;\n  right: 0.12rem;\n  top: 0.08rem;\n  color: #b2b2b2;\n  -webkit-transition: all 0.2s ease 0s;\n  transition: all 0.2s ease 0s;\n  -ms-transition: all 0.2s ease 0s;\n  font-size: 0.16rem;\n}\n.mv-panel .mv-panel-content {\n  display: none;\n  padding: 0rem 0.1rem 0.1rem;\n  overflow: hidden;\n  -webkit-transition: all 0.2s ease 0s;\n  transition: all 0.2s ease 0s;\n  -ms-transition: all 0.2s ease 0s;\n  font-size: 0.13rem;\n  color: #555;\n}\n.mv-panel.mv-panel-open .mv-panel-title i {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.mv-panel.mv-panel-open .mv-panel-content {\n  display: block;\n}\n", ""]);

	// exports


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div :class="classes" :style="styles">
	//         <div class="mv-panel-title" @click="toggle">
	//             <slot name="title">
	//                 测试
	//             </slot>
	//             <Icon class="mv-icon-arrow-right"></Icon>
	//         </div>
	//         <div class="mv-panel-content">
	//             <slot>
	//                 测试一下啦啦
	//             </slot>
	//         </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        open: {
	            type: Boolean,
	            default: false
	        },
	        key: {
	            type: String,
	            default: ''
	        }
	    },
	    computed: {
	        styles: function styles() {
	            return (0, _utils.getStyle)(this.style);
	        },
	        classes: function classes() {
	            return 'mv-panel ' + (this.open ? 'mv-panel-open' : '') + ' ' + this.class;
	        }
	    },
	    methods: {
	        toggle: function toggle(e) {
	            this.open = !this.open;
	            this.$parent.toggle({
	                'key': this.key,
	                'open': this.open
	            });
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-panel {
	//     .mv-panel-title{
	//         position: relative;
	//         padding:0.1rem;
	//         color: @color-theme-font;
	//         font-size: 0.13rem;
	//         i{
	//             position: absolute;
	//             right: 0.12rem;
	//             top: 0.08rem;
	//             color: @color-icon-theme;
	//             .x-transition(all, 0.2s, ease);
	//             font-size: 0.16rem;
	//         }
	//     }
	//     .mv-panel-content{
	//         display: none;
	//         padding: 0rem 0.1rem 0.1rem;
	//         overflow: hidden;
	//         .x-transition(all, 0.2s, ease);
	//         font-size: 0.13rem;
	//         color: @color-theme-font-1;
	//     }
	//     &.mv-panel-open{
	//         .mv-panel-title{
	//             i{
	//                 .x-transform-rotate(90deg);
	//             }
	//         }
	//         .mv-panel-content{
	//             display: block;
	//         }
	//     }
	// }
	// </style>

/***/ },
/* 205 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"styles\">\n    <div class=\"mv-panel-title\" @click=\"toggle\">\n        <slot name=\"title\">\n            测试\n        </slot>\n        <Icon class=\"mv-icon-arrow-right\"></Icon>\n    </div>\n    <div class=\"mv-panel-content\">\n        <slot>\n            测试一下啦啦\n        </slot>\n    </div>\n</div>\n";

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(207)
	__vue_script__ = __webpack_require__(209)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/accordion/accordion.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(210)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-e49686ce/accordion.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(208);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./accordion.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./accordion.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-accordion {\n  background: white;\n}\n.mv-accordion .mv-panel {\n  border-bottom: solid 1px #eee;\n}\n.mv-accordion .mv-panel:last-child {\n  border-bottom: none;\n}\n", ""]);

	// exports


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div :class="classes" :style="styles">
	//         <slot></slot>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        accordion: {
	            type: Boolean,
	            default: false
	        }
	    },
	    computed: {
	        styles: function styles() {
	            return (0, _utils.getStyle)(this.style);
	        },
	        classes: function classes() {
	            return 'mv-accordion ' + this.class;
	        }
	    },
	    compiled: function compiled() {
	        this.$children.forEach(function (child, index) {
	            child.key = child.key || index;
	        });
	    },

	    methods: {
	        setOpen: function setOpen(data) {
	            this.$children.forEach(function (child, index) {
	                if (data.open) {
	                    child.open = false;
	                    if (child.key == data.key) {
	                        child.open = true;
	                    }
	                }
	            });
	        },
	        toggle: function toggle(data) {
	            if (this.accordion) {
	                this.setOpen(data);
	            }
	            this.$emit('on-change', data);
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-accordion {
	//     background: white;
	//     .mv-panel{
	//         border-bottom: solid 1px @color-disabled-theme;
	//         &:last-child{
	//         border-bottom: none;
	//         }
	//     }
	//
	// }
	// </style>

/***/ },
/* 210 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"styles\">\n    <slot></slot>\n</div>\n";

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(212)
	__vue_script__ = __webpack_require__(214)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/scroll/scroll.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(221)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-424130a7/scroll.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(213);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./scroll.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./scroll.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-scroll {\n  background: white;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-backface-perspective: 1000;\n  -moz-backface-perspective: 1000;\n  -o-backface-perspective: 1000;\n  -ms-backface-perspective: 1000;\n  backface-perspective: 1000;\n  /* IE 9 */\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  transform: translate3d(0px, 0px, 0px);\n}\n", ""]);

	// exports


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _from = __webpack_require__(49);

	var _from2 = _interopRequireDefault(_from);

	var _utils = __webpack_require__(48);

	var _bind = __webpack_require__(215);

	var _bind2 = _interopRequireDefault(_bind);

	var _pullrefresh = __webpack_require__(216);

	var _pullrefresh2 = _interopRequireDefault(_pullrefresh);

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div :class="classes" :style="styles">
	//         <Pullrefresh v-if="pullRefresh" scroll="scroll" :status.sync="refreshStatus">
	//             <div slot="down">
	//                 <Icon class="mv-icon-arrow-down-c"></Icon>
	//                 <span>松手更新...</span>
	//             </div>
	//             <div slot="up">
	//                 <slot name="up">
	//                     <Icon class="mv-icon-arrow-up-c"></Icon>
	//                     <span>下拉刷新...</span>
	//                 </slot>
	//             </div>
	//             <div slot="load">
	//                 <slot name="load">
	//                     <Loadding show="show" class="mv-refresh-loadding"><Icon class="mv-icon-loading-6"></Icon></Loadding>
	//                     <span>加载中...</span>
	//                 </slot>
	//             </div>
	//         </Pullrefresh>
	//         <slot></slot>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        /**
	         *  滚动距离
	         */
	        size: {
	            type: Number,
	            default: 0
	        },
	        /**
	         *  y 垂直，  x水平
	         */
	        direction: {
	            type: String,
	            default: 'y'
	        },
	        /**
	         *  desc 是否支持惯性
	         */
	        isMomentum: {
	            type: Boolean,
	            default: true
	        },
	        /**
	         *  超出边界是否还能拖动 默认true
	         */
	        isBounce: {
	            type: Boolean,
	            default: true
	        },
	        /**
	         *  回弹时间
	         */
	        bounceTime: {
	            type: Number,
	            default: 350
	        },
	        /**
	         *  是否阻止默认滚动事件
	         */
	        preventDefault: {
	            type: Boolean,
	            default: true
	        },
	        /**
	         *  是否禁用
	         */
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        // /**
	        //  *  是否显示滚动条
	        //  */
	        // showBar: {
	        //     type: Boolean,
	        //     default: false
	        // },
	        pullRefresh: {
	            type: Boolean,
	            default: false
	        },
	        /**
	         * 0 等待  1 刷新中 2刷新完成
	         */
	        refreshStatus: {
	            type: String,
	            default: 'ready',
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['ready', 'loading', 'move']);
	            }
	        },
	        /**
	         * 是否重新计算
	         */
	        isRefresh: {
	            type: Boolean,
	            default: false
	        }
	    },
	    components: {
	        Pullrefresh: _pullrefresh2.default,
	        Icon: _icon2.default
	    },
	    data: function data() {
	        var pos = {
	            'page': 'page' + this.direction.toUpperCase(),
	            'pointer': 'pointer' + this.direction.toUpperCase(),
	            'x': 0,
	            'y': 1
	        };

	        return {
	            startPos: 0, // 开始位置
	            pointPos: 0, // 手指位置
	            startTime: 0, // 开始的时间
	            maxDistance: 0, //滚动的最大距离
	            isTransition: false, // 是否在动画中,
	            pos: pos
	        };
	    },

	    computed: {
	        styles: function styles() {
	            return (0, _utils.getStyle)(this.style);
	        },
	        classes: function classes() {
	            return 'mv-scroll ' + this.class;
	        }
	    },
	    ready: function ready() {
	        this.bind = new _bind2.default(this, this.$el);
	        this.refresh();
	    },

	    methods: {
	        /**
	         *  初始化一些参数
	         */
	        refresh: function refresh() {
	            this.maxDistance = this.getMaxDistance();
	            this.endTime = 0;
	            this.bind.resetPos();
	            if (this.pullRefresh) {
	                this.refreshHeight = this.$el.children[0].children[0].offsetHeight;
	            }
	        },
	        getMaxDistance: function getMaxDistance() {
	            var sizeFunction = this.direction == 'y' ? _utils.getFullHeight : _utils.getFullWidth,
	                tag = this.direction == 'y' ? 'Height' : 'Width',
	                size = 0;
	            (0, _from2.default)(this.$el.children).forEach(function (v) {
	                size += sizeFunction(v);
	            });
	            return this.$el.parentNode['offset' + tag] - size;
	        },
	        start: function start(e) {
	            // 获取touches
	            var pointer = this.bind.getPointer(e);

	            // 暂停正在移动的动画
	            this.bind.transitionTime();

	            //如果以前的动画正在进行，则先停止
	            if (this.isTransition) {
	                this.bind.stopAnimate();
	            }

	            // 记录手指的位置
	            this.pointPos = pointer[this.pos['page']] || 0;

	            // 记录时间戳
	            this.startTime = e.timestamp || (0, _utils.nowTime)();

	            // 初始化缓存位置
	            this.startPos = this.size;
	            //this.moved = false;

	            this.$emit('scroll-start', e);
	        },
	        move: function move(e) {

	            // 获取手指
	            var pointer = this.bind.getPointer(e);

	            // 计算距离上一次拖动的距离
	            var diff = pointer[this.pos['page']] - this.pointPos;

	            // 保存手指的位置，覆盖start时的位置
	            this.pointPos = pointer[this.pos['page']];

	            // 如果距离较小，则不滑动
	            if (Math.abs(diff) < 5 && !this.pullRefresh) {
	                return;
	            }

	            // 计算新的位置，为原来的位置加上新的位置
	            var newPos = this.size + diff;

	            /**
	             * 如果拖动已经超出边界了,则减慢拖动的速度
	             */

	            if (newPos > 0 || newPos < this.maxDistance) {
	                newPos = this.isBounce ? this.size + diff / 3 : newPos > 0 ? 0 : this.maxDistance;
	            }

	            // 下拉刷新纪录
	            if (this.pullRefresh) {
	                if (this.size > this.refreshHeight) {
	                    this.refreshStatus = 'move';
	                } else {
	                    this.refreshStatus = 'ready';
	                }
	            }

	            // this.moved = true;
	            this.bind.translate(newPos);

	            this.$emit('scroll-move', e);

	            // 记录触摸时移动的时间，以及移动的距离，为缓动做准备, 借鉴iscroll
	            var timestamp = e.timestamp || (0, _utils.nowTime)();
	            if (timestamp - this.startTime > 300) {
	                this.startPos = this.size;
	                this.startTime = timestamp;
	            }
	        },
	        end: function end(e) {

	            // 设置惯性动画为false， 结束的时候，才是缓动的开始
	            this.isTransition = false;

	            // 是否支持下拉刷新
	            if (this.pullRefresh) {
	                if (this.size > this.refreshHeight) {
	                    this.refreshStatus = 'loading';
	                    this.bind.scrollTo(this.refreshHeight, 500, 'ease-out');
	                    this.$emit('on-refresh', e);
	                    return;
	                }
	            }

	            // 如果超出边界，需要做处理
	            if (this.bind.resetPos(this.bounceTime)) {
	                return;
	            }

	            // 修正位置
	            this.bind.scrollTo(this.size);

	            // 计算数据
	            var duration = (this.timestamp || (0, _utils.nowTime)()) - this.startTime;
	            var newPos = this.size;
	            var time = 0;
	            var diff = this.size - this.startPos;
	            var distance = Math.abs(diff);

	            if (duration < 250 && distance < 20) {
	                // 点击行为
	                return;
	            }

	            // 用距离加时间计算， 借鉴iscroll的方案，牛
	            if (this.isMomentum && duration < 300) {
	                // 动量计算公式 mv*v/2
	                var v = distance / duration;
	                var momentumSize = 1666 * v * v / 2;
	                time = momentumSize / v;
	                newPos = diff > 0 ? momentumSize : 0 - momentumSize;

	                newPos = this.size + newPos;
	                this.isTransition = true;
	            }

	            if (this.size != newPos) {
	                // 判断是否超出边界了
	                newPos = newPos > 0 ? 0 : newPos < this.maxDistance ? this.maxDistance : newPos;
	                this.bind.scrollTo(newPos, time, 'momentum');
	            }

	            this.$emit('scroll-end', e);
	        },
	        wheel: function wheel(e) {
	            // 滑轮滚动， 单独处理， 主要应用于pc，赞不处理，回头升级
	        },
	        transitionEnd: function transitionEnd(e) {
	            this.$emit('scroll-transition-end', e);
	        },
	        refreshEnd: function refreshEnd() {
	            // 如果超出边界，需要做处理
	            if (this.bind.resetPos(this.bounceTime, 'ease-out')) {
	                return;
	            }
	        }
	    },
	    watch: {
	        refreshStatus: function refreshStatus(val) {
	            if (val == 'ready') {
	                this.refreshEnd();
	            }
	        },
	        isRefresh: function isRefresh(val) {
	            if (val) {
	                this.refresh();
	                this.isRefresh = false;
	            }
	        }
	    }
	};

	// 流程，初始化 -》 绑定事件，判断是否支持3d，不支持直接用translate

	// 点击-》触发touchstart 

	// 判断是否开启滚动，没有返回

	// 如果阻止默认事件，则返回

	// 设置moved为false

	// 停止以前的动画

	// 记录开始时间

	// 如果惯性动画正在进行，则需要把动画停止在触摸位置

	// 计算开始位置

	// 设置滑动开关，start开关开启，记录

	// touchstart回调


	// ->> 触发touchmove事件，

	// 判断start开关是否开启，如果未开启不调用move事件

	// 判断滚动是否可用

	// 判断是否需要阻止事件


	// 记录拖动数据


	// 判断拖动时间如果大于300毫秒，则不拖动，返回，并且距离小于10像素的时候


	// 做方向判断


	// 判断是否超出边界，如果超出边界，则减慢拖动距离


	// 计算拖动距离，然后开始拖动


	// moved 为true


	// 触发end事件


	// 判断是否可用，

	// 判断是否组织冒泡


	// 手指离开之前，保存数据

	// 计算拖动耗时，用作动量计算


	// 重置是否处于动画状态

	// 计算结束时间

	// 处理超出边界的计算


	// 滚动到最后位置


	// 如果在动画得时间范围内，则动量动画


	// ==========
	// refresh 刷新，如果遇到了转屏等事件，需要重置参数


	// 兼容处理，需要处理css3 前缀


	// 参数
	// startX 开始x距离
	// startY 开始y距离
	// direction 滚动方向 默认是上下滚动 
	// isMomentum 是否有惯性 默认true
	// isBounce  超出边界是否还能拖动 默认true
	// bounceTime 回弹时间
	// preventDefault: true, 是否阻止默认滚动事件

	//当遇到表单元素则不阻止冒泡，而是弹出系统自带相应的输入控件
	//preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },


	// start


	// end


	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-scroll {
	//     background: white;
	//     .x-prefix(backface-visibility; hidden;);
	//     .x-prefix(backface-perspective; 1000;);
	//     .x-transform-translate3d(0px, 0px, 0px);
	// }
	// </style>

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(161);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(162);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _assign = __webpack_require__(157);

	var _assign2 = _interopRequireDefault(_assign);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Event = {
	    addEvent: function addEvent(el, type, callback, capture) {
	        el.addEventListener(type, callback, !!capture);
	    },
	    removeEvent: function removeEvent(el, type, callback, capture) {
	        el.removeEventListener(type, callback, !!capture);
	    }
	};

	// 获取带前缀的css样式
	var _prefix = function () {
	    var arr = ['webkitTransition', 'MozTransition', 'msTransition', 'OTransition', 'transition'];
	    var transform = '';
	    for (var i = 0; i < arr.length; i++) {
	        if (arr[i] in document.documentElement.style) {
	            transform = arr[i];
	            break;
	        }
	    }
	    return transform.substring(transform.length - "transition".length, 0);
	}();

	var getPrefixProp = function getPrefixProp(trans) {
	    return _prefix == '' ? _prefix + trans : _prefix + trans.replace(/( |^)[a-z]/g, function (L) {
	        return L.toUpperCase();
	    });
	};

	var transitionEndPro = {
	    '': 'transitionend',
	    'webkit': 'webkitTransitionEnd',
	    'Moz': 'transitionend',
	    'O': 'otransitionend',
	    'ms': 'MSTransitionEnd'
	};

	var Style = {
	    transition: getPrefixProp('transition'),
	    transform: getPrefixProp('transform'),
	    transitionEnd: transitionEndPro[_prefix],
	    transitionTimingFunction: getPrefixProp('transitionTimingFunction'),
	    transitionDuration: getPrefixProp('transitionDuration'),
	    transitionDelay: getPrefixProp('transitionDelay'),
	    transformOrigin: getPrefixProp('transformOrigin')
	};

	var Easing = {
	    'bounce': 'cubic-bezier(0.1, 0.83, 0.03, 0.8)',
	    'momentum': 'cubic-bezier(.1,.52,.27,.77)',
	    'ease-in': 'ease-in',
	    'ease-out': 'ease-out',
	    'ease-in-out': 'ease-in-out',
	    'ease': 'ease'
	};

	var EventType = function () {
	    var type = {
	        touchstart: 'touchstart',
	        touchmove: 'touchmove',
	        touchend: 'touchend',
	        touchcancel: 'touchcancel',
	        wheel: 'wheel',
	        DOMMouseScroll: 'DOMMouseScroll',
	        mousewheel: 'mousewheel',
	        transitionEnd: transitionEndPro[_prefix]
	    };
	    if (!('ontouchstart' in document)) {
	        (0, _assign2.default)(type, {
	            touchstart: 'mousedown',
	            touchend: 'mouseup',
	            touchmove: 'mousemove',
	            touchcancel: 'mouseleave'
	        });
	    }
	    return type;
	}();

	var Bind = function () {
	    function Bind(_this, scrollElem) {
	        (0, _classCallCheck3.default)(this, Bind);

	        this.delegate = _this;
	        if (!this.check(this.delegate)) {
	            return false;
	        }
	        this.$scrollElem = scrollElem;
	        this.Style = Style;
	        this.Easing = Easing;
	        this.init();
	    }

	    (0, _createClass3.default)(Bind, [{
	        key: 'init',
	        value: function init() {
	            this.bindEvent();
	        }
	        /**
	         *  检查代理需要实现的属
	         */

	    }, {
	        key: 'check',
	        value: function check(_delegate) {
	            var prop = ['direction', 'size', 'isTransition', 'bounceTime', 'maxDistance', 'pos', 'disabled', 'preventDefault'];
	            for (var i = 0; i < prop.length; i++) {
	                if (!_delegate.hasOwnProperty(prop[i])) {
	                    throw '\u4EE3\u7406\u5BF9\u8C61\u5FC5\u987B\u6709' + prop[i] + '\u5C5E\u6027';
	                    return false;
	                }
	            }
	            return true;
	        }

	        /**
	         *  绑定事件
	         */

	    }, {
	        key: 'bindEvent',
	        value: function bindEvent(destory) {
	            var self = this;
	            var type = destory ? 'removeEvent' : 'addEvent';
	            for (var i in EventType) {
	                Event[type](this.$scrollElem, EventType[i], self.touch.call(self));
	            }
	        }

	        /**
	         * touch事件绑定
	         */

	    }, {
	        key: 'touch',
	        value: function touch(event) {
	            var self = this;
	            return function (event) {
	                switch (event.type) {
	                    case EventType['touchstart']:
	                        self.start(event);
	                        break;
	                    case EventType['touchmove']:
	                        self.move(event);
	                        break;
	                    case EventType['touchend']:
	                    case EventType['touchcancel']:
	                        self.end(event);
	                        break;
	                    case EventType['wheel']:
	                    case EventType['DOMMouseScroll']:
	                    case EventType['mousewheel']:
	                        self.wheel(event);
	                        break;
	                    case EventType['transitionEnd']:
	                        self.transitionEnd(event);
	                }
	            };
	        }
	    }, {
	        key: 'start',
	        value: function start(e) {

	            this.flag = true;

	            if (this.delegate.disabled) {
	                return false;
	            }

	            if (this.delegate.preventDefault) {
	                e.preventDefault();
	            }
	            this.delegate.start && this.delegate.start(e);
	        }
	    }, {
	        key: 'move',
	        value: function move(e) {

	            if (e.type.indexOf('mouse') > -1) {
	                if (!this.flag) {
	                    return false;
	                }
	                e.preventDefault();
	            }

	            if (this.delegate.disabled) {
	                return false;
	            }
	            if (this.delegate.preventDefault) {
	                e.preventDefault();
	            }
	            this.delegate.move && this.delegate.move(e);
	        }
	    }, {
	        key: 'end',
	        value: function end(e) {

	            this.flag = false;

	            if (this.delegate.disabled) {
	                return false;
	            }
	            if (this.delegate.preventDefault) {
	                e.preventDefault();
	            }
	            this.delegate.end && this.delegate.end(e);
	        }
	    }, {
	        key: 'wheel',
	        value: function wheel(e) {
	            if (this.delegate.disabled) {
	                return false;
	            }
	            if (this.delegate.preventDefault) {
	                e.preventDefault();
	            }
	            this.delegate.wheel && this.delegate.wheel(event);
	        }
	    }, {
	        key: 'getPointer',
	        value: function getPointer(e) {
	            var touches = e.touches || e.targetTouches || e.changedTouches;
	            return touches ? touches[0] : e;
	        }
	    }, {
	        key: 'getDe',
	        value: function getDe(param) {
	            return param + this.delegate.direction.toUpperCase();
	        }
	    }, {
	        key: 'translate',
	        value: function translate(size) {
	            size = parseInt(size);
	            var translateStyle = {
	                'x': 'translate3d(' + size + 'px, 0px, 0px)',
	                'y': 'translate3d( 0px,' + size + 'px, 0px)'
	            };
	            this.$scrollElem.style[Style['transform']] = translateStyle[this.delegate.direction];
	            this.delegate.size = size;
	        }
	        /**
	         *  滚动到某地
	         */

	    }, {
	        key: 'scrollTo',
	        value: function scrollTo(size, time, ease) {
	            time = time || 0;
	            ease = Easing[ease] || Easing['bounce'];
	            this.delegate.isTransition = time > 0;
	            //如果有css动画 则直接调用css3移动
	            //设置相关的css3动画属性及位置 直接位移过去
	            this.transitionTimingFunction(ease);
	            this.transitionTime(time);
	            this.translate(size);
	        }
	        /**
	         *  滚动动画结束
	         */

	    }, {
	        key: 'transitionEnd',
	        value: function transitionEnd(e) {
	            // if (!this.delegate.isTransition) {
	            //     return;
	            // }
	            this.transitionTime();
	            this.delegate.isTransition = false;
	            // if (!this.resetPos(this.delegate.bounceTime)) {
	            //     this.delegate.isTransition = false;
	            // }
	            this.delegate.transitionEnd && this.delegate.transitionEnd(event);
	        }
	    }, {
	        key: 'transitionTime',
	        value: function transitionTime(time) {
	            time = time || 0;
	            this.$scrollElem.style[Style['transitionDuration']] = time + 'ms';
	        }
	    }, {
	        key: 'transitionTimingFunction',
	        value: function transitionTimingFunction(easing) {
	            easing = easing || Easing['bounce'];
	            this.$scrollElem.style[Style['transitionTimingFunction']] = easing;
	        }
	    }, {
	        key: 'resetPos',
	        value: function resetPos(time, ease) {
	            var size = this.delegate.size;
	            time = time || 0;
	            ease = Easing[ease] || Easing['bounce'];

	            if (this.delegate.size > 0) {
	                this.delegate.size = 0;
	            } else if (this.delegate.size < this.delegate.maxDistance) {
	                this.delegate.size = this.delegate.maxDistance;
	            } else {
	                return false;
	            }
	            this.scrollTo(this.delegate.size, time, ease);
	            return true;
	        }
	    }, {
	        key: 'stopAnimate',
	        value: function stopAnimate() {
	            // 获取现在的滚动x，y
	            var current = 0;
	            var transform = (0, _utils.css)(this.$scrollElem, Style['transform']);
	            if (transform != "") {
	                transform = transform.replace("translate3d(", "").replace(")", "");
	                var transArr = transform.split(',');
	                current = transArr[this.delegate.pos[this.delegate.direction]].replace('px', '');
	            }
	            this.translate(parseInt(current));
	        }
	    }]);
	    return Bind;
	}();

	exports.default = Bind;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(217)
	__vue_script__ = __webpack_require__(219)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/pullrefresh/pullrefresh.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(220)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3cb76eb5/pullrefresh.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(218);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./pullrefresh.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./pullrefresh.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-pullrefresh {\n  height: 0px;\n  position: relative;\n  text-align: center;\n  color: #666;\n  font-weight: normal;\n}\n.mv-pullrefresh .mv-pullrefresh-content {\n  height: 0.4rem;\n  line-height: 0.4rem;\n  position: absolute;\n  top: -0.4rem;\n  width: 100%;\n}\n.mv-pullrefresh .mv-refresh-loadding .mv-icon-loading-6 {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n  padding: 1px;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n", ""]);

	// exports


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _loadding = __webpack_require__(141);

	var _loadding2 = _interopRequireDefault(_loadding);

	var _utils = __webpack_require__(48);

	var _bind = __webpack_require__(215);

	var _bind2 = _interopRequireDefault(_bind);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div :type="type" :class="classes" :style="style" :disabled="disabled">
	//         <div class="mv-pullrefresh-content">
	//             <slot name="down" v-if="status == 'ready'">
	//                 <Icon class="mv-icon-arrow-down-c"></Icon>
	//                 <span>下拉刷新...</span>
	//             </slot>
	//             <slot name="up" v-if="status == 'move'">
	//                 <Icon class="mv-icon-arrow-up-c"></Icon>
	//                 <span>松手更新...</span>
	//             </slot>
	//             <slot name="load" v-if="status == 'loading'">
	//                 <Loadding show="show" class="mv-refresh-loadding mv-circular" style="width: auto;height: auto;"><Icon class="mv-icon-loading-6"></Icon></Loadding>
	//                 <span>加载中...</span>
	//             </slot>
	//         </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    name: "Pullrefresh",
	    components: {
	        Icon: _icon2.default,
	        Loadding: _loadding2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        preventDefault: {
	            type: Boolean,
	            default: false
	        },
	        /**
	         * 滚动条的类型 默认是window,scroll,other
	         */
	        scroll: {
	            type: String,
	            default: 'window',
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['window', 'scroll', 'other']);
	            }
	        },
	        direction: {
	            type: String,
	            default: 'y',
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['x', 'y']);
	            }
	        },
	        status: {
	            type: String,
	            default: 'ready',
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['ready', 'loading', 'move']);
	            }
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return 'mv-pullrefresh ' + this.class;
	        }
	    },
	    data: function data() {
	        var pos = {
	            'page': 'page' + this.direction.toUpperCase(),
	            'pointer': 'pointer' + this.direction.toUpperCase(),
	            'x': 0,
	            'y': 1
	        };

	        return {
	            startPos: 0, // 开始位置
	            pointPos: 0, // 手指位置
	            startTime: 0, // 开始的时间
	            maxDistance: 0, //滚动的最大距离
	            isTransition: false, // 是否在动画中,
	            pos: pos,
	            size: 0,
	            isBounce: true,
	            bounceTime: 300
	        };
	    },
	    ready: function ready() {

	        // 判断scroll是不是 原声滚动条，如果是原声的，更新监听事件，非原声的，靠监听器来判断到了更新的时候。
	        if (this.scroll === 'window') {
	            this.$el.parentNode.parentNode.insertBefore(this.$el, this.$el.parentNode);
	            this.bind = new _bind2.default(this, this.$el.parentNode);
	            this.refreshHeight = this.$el.children[0].offsetHeight;
	            if (this.status == 'loading') {
	                this.bind.scrollTo(this.refreshHeight, 500, 'ease-out');
	            }
	        }
	    },

	    methods: {
	        start: function start(e) {
	            var $elem = this.scroll == 'window' ? window : this.$el.parentNode;
	            if ((0, _utils.scrollTop)($elem) != 0) {
	                return;
	            }

	            // 获取touches
	            var pointer = this.bind.getPointer(e);

	            // 暂停正在移动的动画
	            this.bind.transitionTime();
	            //如果以前的动画正在进行，则先停止
	            if (this.isTransition) {
	                this.bind.stopAnimate();
	            }

	            // 记录手指的位置
	            this.pointPos = pointer[this.pos['page']] || 0;

	            // 记录时间戳
	            this.startTime = e.timestamp || (0, _utils.nowTime)();

	            // 初始化缓存位置
	            this.startPos = this.size;
	            //this.moved = false;
	        },
	        move: function move(e) {

	            var $elem = this.scroll == 'window' ? window : this.$el.parentNode;

	            if ((0, _utils.scrollTop)($elem) != 0) {
	                return;
	            }

	            this.bind.transitionTime();
	            // 获取手指
	            var pointer = this.bind.getPointer(e);

	            // 计算距离上一次拖动的距离
	            var diff = pointer[this.pos['page']] - this.pointPos;

	            // 保存手指的位置，覆盖start时的位置
	            this.pointPos = pointer[this.pos['page']];

	            // 计算新的位置，为原来的位置加上新的位置
	            var newPos = this.size + diff;

	            /**
	             * 如果拖动已经超出边界了,则减慢拖动的速度
	             */
	            if (newPos > 0 || newPos < this.maxDistance) {
	                if (diff > 0) {
	                    newPos = this.isBounce ? this.size + diff / 3 : newPos > 0 ? 0 : this.maxDistance;
	                }
	            }

	            if (this.size >= 0 && diff > 0) {
	                e.preventDefault();
	            } else if (diff < 0 && this.size < 0) {
	                this.size = 0;
	            }

	            if (this.size > this.refreshHeight) {
	                this.status = 'move';
	            } else {
	                this.status = 'ready';
	            }

	            if (newPos < 0) {
	                newPos = 0;
	            }

	            this.bind.translate(newPos);
	        },
	        end: function end(e) {
	            // 设置惯性动画为false， 结束的时候，才是缓动的开始
	            this.isTransition = false;
	            if (this.size > this.refreshHeight) {
	                this.status = 'loading';
	                this.bind.scrollTo(this.refreshHeight, 500, 'ease-out');
	                this.$emit('on-refresh', e);
	            } else {
	                this.bind.resetPos(this.bounceTime, 'ease-out');
	            }
	        },
	        wheel: function wheel(e) {
	            // 滑轮滚动， 单独处理， 主要应用于pc，赞不处理，回头升级
	        },
	        refreshEnd: function refreshEnd() {
	            // 如果超出边界，需要做处理
	            if (this.bind.resetPos(this.bounceTime, 'ease-out')) {
	                return;
	            }
	        }
	    },
	    watch: {
	        status: function status(val) {
	            if (val == 'ready' && this.scroll == 'window') {
	                this.refreshEnd();
	            }
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-pullrefresh {
	//     height: 0px;
	//     position: relative;
	//     text-align: center;
	//     color: #666;
	//     font-weight: normal;
	//     .mv-pullrefresh-content {
	//         height: 0.4rem;
	//         line-height: 0.4rem;
	//         position: absolute;
	//         top: -0.4rem;
	//         width: 100%;
	//     }
	//     .mv-refresh-loadding .mv-icon-loading-6{
	//         .x-animate-circular();
	//         padding: 1px;
	//     }
	// }
	// </style>

/***/ },
/* 220 */
/***/ function(module, exports) {

	module.exports = "\n<div :type=\"type\" :class=\"classes\" :style=\"style\" :disabled=\"disabled\">\n    <div class=\"mv-pullrefresh-content\">\n        <slot name=\"down\" v-if=\"status == 'ready'\">\n            <Icon class=\"mv-icon-arrow-down-c\"></Icon>\n            <span>下拉刷新...</span>\n        </slot>\n        <slot name=\"up\" v-if=\"status == 'move'\">\n            <Icon class=\"mv-icon-arrow-up-c\"></Icon>\n            <span>松手更新...</span>\n        </slot>\n        <slot name=\"load\" v-if=\"status == 'loading'\">\n            <Loadding show=\"show\" class=\"mv-refresh-loadding mv-circular\" style=\"width: auto;height: auto;\"><Icon class=\"mv-icon-loading-6\"></Icon></Loadding>\n            <span>加载中...</span>\n        </slot>\n    </div>\n</div>\n";

/***/ },
/* 221 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"styles\">\n    <Pullrefresh v-if=\"pullRefresh\" scroll=\"scroll\" :status.sync=\"refreshStatus\">\n        <div slot=\"down\">\n            <Icon class=\"mv-icon-arrow-down-c\"></Icon>\n            <span>松手更新...</span>\n        </div>\n        <div slot=\"up\">\n            <slot name=\"up\">\n                <Icon class=\"mv-icon-arrow-up-c\"></Icon>\n                <span>下拉刷新...</span>\n            </slot>\n        </div>\n        <div slot=\"load\">\n            <slot name=\"load\">\n                <Loadding show=\"show\" class=\"mv-refresh-loadding\"><Icon class=\"mv-icon-loading-6\"></Icon></Loadding>\n                <span>加载中...</span>\n            </slot>\n        </div>\n    </Pullrefresh>\n    <slot></slot>\n</div>\n";

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(223)
	__vue_script__ = __webpack_require__(225)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/pullload/pullload.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(226)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-704ed1e7/pullload.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(224);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./pullload.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./pullload.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n.mv-pullload {\n  height: 0.4rem;\n  line-height: 0.4rem;\n  text-align: center;\n  font-size: 0.12rem;\n  color: #525558;\n}\n.mv-pullload .ion-load-c {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n  margin-top: -1px;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n", ""]);

	// exports


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _loadding = __webpack_require__(141);

	var _loadding2 = _interopRequireDefault(_loadding);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: {
	        Loadding: _loadding2.default,
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ''
	        },
	        /**
	         *  ready 准备 loading 加载中 end 已结束
	         */
	        status: {
	            type: String,
	            default: 'start',
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['start', 'ready', 'loading', 'end']);
	            }
	        },
	        /**
	         *  看看滚动条状态，当window的时候，是浏览器默认的滚动条，scroll的时候是scroll滚动条，其他情况，取为parent的滚动条
	         */
	        scroll: {
	            type: String,
	            default: 'window',
	            validator: function validator(value) {
	                return (0, _utils.validate)(value, ['window', 'scroll', 'other']);
	            }
	        },
	        /**
	         *  滚动条滚动的距离 只有当scroll为scroll的时候起作用
	         */
	        size: {
	            type: Number,
	            default: 0
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return 'mv-pullload ' + this.class;
	        }
	    },
	    ready: function ready() {
	        if (this.scroll != 'scroll') {
	            this.bind();
	        }
	    },
	    beforeDestroy: function beforeDestroy() {
	        this.bind('destory');
	    },

	    methods: {
	        bind: function bind(destory) {
	            var self = this,
	                $elem = this.scroll == 'window' ? window : this.$el.parentNode;

	            if (!destory) {
	                $elem.addEventListener('scroll', this.throttleFunc, false);
	            } else {
	                $elem.removeEventListener('scroll', this.throttleFunc, false);
	            }
	        },
	        getHeight: function getHeight() {
	            var height = 0,
	                childrens = this.$el.parentNode.children;
	            Array.prototype.slice.call(childrens).forEach(function (v) {
	                return height += v.offsetHeight;
	            });
	            return height;
	        },

	        throttleFunc: (0, _utils.throttle)(function () {
	            var self = this,
	                $elem = this.scroll == 'window' ? window : this.$el.parentNode;
	            this.statusChange($elem, (0, _utils.scrollTop)($elem));
	        }, 300),
	        statusChange: function statusChange($elem, scrollTops) {
	            var self = this;
	            if (self.status == 'ready') {
	                if (scrollTops > self.getHeight() - ($elem.innerHeight || $elem.ofssetHeight || $elem.clientHeight) - 50) {
	                    self.status = 'loading';
	                    self.$emit('on-load');
	                }
	            }
	        }
	    },
	    watch: {
	        size: function size(val) {
	            if (Math.abs(val) > 0 && this.scroll == 'scroll') {
	                var $elem = this.$el.parentNode.parentNode;
	                this.statusChange($elem, Math.abs(val));
	            }
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// .mv-pullload {
	//     height: 0.4rem;
	//     line-height: 0.4rem;
	//     text-align: center;
	//     font-size: 0.12rem;
	//     color: @color-theme-font;
	//     .ion-load-c{
	//         .x-animate-circular();
	//         margin-top: -1px;
	//     }
	// }
	// </style>
	// <template>
	//     <div :type="type" :class="classes" :style="style" v-show="status == 'loading' || status == 'ready'">
	//         <slot name="load">
	//             <Loadding show="show" class="mv-refresh-loadding mv-circular" style="width: auto;height: auto;"><Icon class="mv-icon-loading-6"></Icon></Loadding>
	//             <span>加载中...</span>
	//         </slot>
	//     </div>
	//     <div :type="type" :class="classes" :style="styles" v-if="status == 'end'">
	//         <slot name="end">
	//             <span>已完成</span>
	//         </slot>
	//     </div>
	// </template>
	// <script>

/***/ },
/* 226 */
/***/ function(module, exports) {

	module.exports = "\n<div :type=\"type\" :class=\"classes\" :style=\"style\" v-show=\"status == 'loading' || status == 'ready'\">\n    <slot name=\"load\">\n        <Loadding show=\"show\" class=\"mv-refresh-loadding mv-circular\" style=\"width: auto;height: auto;\"><Icon class=\"mv-icon-loading-6\"></Icon></Loadding>\n        <span>加载中...</span>\n    </slot>\n</div>\n<div :type=\"type\" :class=\"classes\" :style=\"styles\" v-if=\"status == 'end'\">\n    <slot name=\"end\">\n        <span>已完成</span>\n    </slot>\n</div>\n";

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(228)
	__vue_script__ = __webpack_require__(230)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/slider/slider.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(231)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-39b3b227/slider.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(229);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./slider.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./slider.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\ndiv.mv-slider {\n  position: relative;\n}\ndiv.mv-slider .mv-slider-ul {\n  position: relative;\n  overflow: hidden;\n  *zoom: 1;\n  *overflow: hidden;\n}\ndiv.mv-slider .mv-slider-ul:after,\ndiv.mv-slider .mv-slider-ul:before {\n  display: table;\n  content: \"\";\n}\ndiv.mv-slider .mv-slider-ul:after {\n  clear: both;\n}\ndiv.mv-slider .mv-slider-ul li {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  width: 100%;\n  z-index: 0;\n}\ndiv.mv-slider .mv-slider-ul li img {\n  display: block;\n  width: 100%;\n}\ndiv.mv-slider .mv-slider-ul li span {\n  width: 100%;\n  padding: 0.1rem;\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  position: absolute;\n  bottom: 0px;\n  color: white;\n  background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.7));\n  background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7));\n  color: #fff;\n  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);\n}\ndiv.mv-slider .mv-slider-index {\n  position: absolute;\n  bottom: 0.03rem;\n  right: 0.02rem;\n  height: 0.2rem;\n  width: 100%;\n  display: inline-block;\n  text-align: right;\n  z-index: 10;\n}\ndiv.mv-slider .mv-slider-index li {\n  display: inline-block;\n  width: 0.08rem;\n  height: 0.08rem;\n  border-radius: 0.08rem;\n  background-color: white;\n  margin-right: 0.04rem;\n  border: 0px;\n}\ndiv.mv-slider .mv-slider-index li.selected {\n  background-color: #1da7fe;\n}\ndiv.mv-slider.mv-slider-x .mv-slider-ul li.mv-slider-active {\n  z-index: 1;\n  position: relative;\n}\ndiv.mv-slider.mv-slider-x .mv-slider-ul li.mv-slider-prev {\n  z-index: 1;\n  -webkit-transform: translate3d(-100%, 0, 0);\n  transform: translate3d(-100%, 0, 0);\n}\ndiv.mv-slider.mv-slider-x .mv-slider-ul li.mv-slider-next {\n  z-index: 1;\n  -webkit-transform: translate3d(100%, 0, 0);\n  transform: translate3d(100%, 0, 0);\n}\ndiv.mv-slider.mv-slider-y .mv-slider-ul li.mv-slider-active {\n  z-index: 1;\n  position: relative;\n}\ndiv.mv-slider.mv-slider-y .mv-slider-ul li.mv-slider-prev {\n  z-index: 1;\n  -webkit-transform: translate3d(0, -100%, 0);\n  transform: translate3d(0, -100%, 0);\n}\ndiv.mv-slider.mv-slider-y .mv-slider-ul li.mv-slider-next {\n  z-index: 1;\n  -webkit-transform: translate3d(0, 100%, 0);\n  transform: translate3d(0, 100%, 0);\n}\n", ""]);

	// exports


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _from = __webpack_require__(49);

	var _from2 = _interopRequireDefault(_from);

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _utils = __webpack_require__(48);

	var _bind = __webpack_require__(215);

	var _bind2 = _interopRequireDefault(_bind);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        preventDefault: {
	            type: Boolean,
	            default: false
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        direction: {
	            type: String,
	            default: 'x'
	        },
	        index: {
	            type: Number,
	            default: 0
	        },
	        showIndex: {
	            type: Boolean,
	            default: true
	        },
	        loop: {
	            type: Boolean,
	            default: false
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return 'mv-slider ' + this.class + ' mv-slider-' + this.direction;
	        }
	    },
	    data: function data() {
	        var pos = {
	            'page': 'page' + this.direction.toUpperCase(),
	            'pointer': 'pointer' + this.direction.toUpperCase(),
	            'x': 0,
	            'y': 1
	        };

	        return {
	            startPos: 0, // 开始位置
	            pointPos: 0, // 手指位置
	            startTime: 0, // 开始的时间
	            maxDistance: 0, //滚动的最大距离
	            isTransition: false, // 是否在动画中,
	            pos: pos,
	            size: 0,
	            isBounce: true,
	            bounceTime: 300,
	            liWidth: 0,
	            liLength: 0
	        };
	    },

	    methods: {
	        init: function init() {
	            var $ul = this.$el.children[0];
	            this.refreshHeight = $ul.offsetHeight;
	            this.childrenElem = $ul.children;
	            this.liWidth = this.direction == 'y' ? (0, _utils.getFullHeight)(this.$el) : (0, _utils.getFullWidth)(this.$el);
	            this.initClass();
	            this.liLength = $ul.children.length;
	            this.prevSize = -this.liWidth;
	            this.nextSize = this.liWidth;
	        },
	        initClass: function initClass() {
	            (0, _from2.default)(this.childrenElem).forEach(function (v) {
	                (0, _utils.removeClass)(v, 'mv-slider-active');
	                (0, _utils.removeClass)(v, 'mv-slider-next');
	                (0, _utils.removeClass)(v, 'mv-slider-prev');
	            });
	            (0, _utils.addClass)(this.getElem(this.index), 'mv-slider-active');
	            (0, _utils.addClass)(this.getElem(this.index + 1), 'mv-slider-next');
	            (0, _utils.addClass)(this.getElem(this.index - 1), 'mv-slider-prev');
	        },
	        initSize: function initSize() {
	            this.size = 0;
	            this.prevSize = -this.liWidth;
	            this.nextSize = this.liWidth;
	        },
	        selectIndex: function selectIndex() {
	            var indexElem = this.$el.children[1];
	            if (indexElem) {}
	        },
	        getElem: function getElem(index) {
	            index = this.getIndex(index);
	            return this.childrenElem[index];
	        },
	        getIndex: function getIndex(index) {
	            var len = this.childrenElem.length;
	            if (index < 0) {
	                index = len + index;
	            } else if (index >= len) {
	                index = index - len;
	            }
	            return index;
	        },
	        start: function start(e) {

	            // 获取touches
	            var pointer = this.bind.getPointer(e);

	            // 暂停正在移动的动画
	            this.bind.transitionTime();

	            //如果以前的动画正在进行，则先停止
	            if (this.isTransition) {
	                this.bind.stopAnimate();
	            }

	            // 记录手指的位置
	            this.pointPos = pointer[this.pos['page']] || 0;

	            // 记录时间戳
	            this.startTime = e.timestamp || (0, _utils.nowTime)();

	            // 初始化缓存位置
	            this.startPos = this.size;
	            //this.moved = false;
	        },
	        move: function move(e) {
	            //this.bind.transitionTime();

	            // 获取手指
	            var pointer = this.bind.getPointer(e),

	            // 计算距离上一次拖动的距离
	            diff = this.diff = pointer[this.pos['page']] - this.pointPos;

	            // 保存手指的位置，覆盖start时的位置
	            this.pointPos = pointer[this.pos['page']];

	            /**
	             * 如果拖动已经超出边界了,则减慢拖动的速度
	             */

	            this.scrollTo();

	            // 记录触摸时移动的时间，以及移动的距离，为缓动做准备, 借鉴iscroll
	            var timestamp = e.timestamp || (0, _utils.nowTime)();
	            if (timestamp - this.startTime > 300) {
	                this.startPos = this.size;
	                this.startTime = timestamp;
	            }
	        },
	        end: function end(e) {

	            if (Math.abs(this.size) < 10) {
	                return;
	            }

	            var diff = this.diff = this.size - this.startPos,
	                timestamp = e.timestamp || (0, _utils.nowTime)();
	            if (timestamp - this.startTime < 300 && Math.abs(this.size) > 30) {

	                this.initSize();
	                this.diff = this.diff > 0 ? this.liWidth : -this.liWidth;
	                this.scrollTo(600);
	                this.index = diff > 0 ? this.getIndex(this.index - 1) : this.getIndex(this.index + 1);
	                this.initClass();
	                this.initSize();
	                return;
	            }

	            var slider = Math.abs(this.size) / this.liWidth;
	            if (slider > 0.5) {
	                this.initSize();
	                this.diff = this.diff > 0 ? this.liWidth : -this.liWidth;
	                this.scrollTo(600);
	                this.index = diff > 0 ? this.getIndex(this.index - 1) : this.getIndex(this.index + 1);
	                this.initClass();
	                this.initSize();
	            } else {
	                this.initSize();
	                this.diff = 0;
	                this.scrollTo(600);
	                this.index = diff > 0 ? this.getIndex(this.index - 1) : this.getIndex(this.index + 1);
	                this.initClass();
	                this.initSize();
	            }
	        },
	        translate: function translate() {
	            //非循环
	            if (!this.loop) {
	                if (this.index == 0 && this.diff > 0 || this.index == this.liLength - 1 && this.diff < 0) {
	                    return;
	                }
	            }
	            // 计算新的位置，为原来的位置加上新的位置
	            var size = parseInt(this.size + this.diff);

	            this.prevSize = this.prevSize + this.diff;
	            this.nextSize = this.nextSize + this.diff;

	            this.getElem(this.index).style[this.bind.Style['transform']] = this.translateStyle(size)[this.direction];
	            this.getElem(this.index + 1).style[this.bind.Style['transform']] = this.translateStyle(this.nextSize)[this.direction];
	            this.getElem(this.index - 1).style[this.bind.Style['transform']] = this.translateStyle(this.prevSize)[this.direction];
	            this.size = size;
	        },
	        scrollTo: function scrollTo(time, ease) {
	            time = time || 0;
	            ease = this.bind.Easing[ease] || this.bind.Easing['bounce'];

	            //如果有css动画 则直接调用css3移动
	            //设置相关的css3动画属性及位置 直接位移过去
	            this.transitionTimingFunction(ease);
	            this.transitionTime(time);
	            this.translate();
	        },
	        transitionTime: function transitionTime(time) {
	            time = time || 0;
	            this.getElem(this.index).style[this.bind.Style['transitionDuration']] = time + 'ms';
	            this.getElem(this.index + 1).style[this.bind.Style['transitionDuration']] = time + 'ms';
	            this.getElem(this.index - 1).style[this.bind.Style['transitionDuration']] = time + 'ms';
	        },
	        transitionTimingFunction: function transitionTimingFunction(easing) {
	            easing = easing || this.bind.Easing['bounce'];
	            this.getElem(this.index).style[this.bind.Style['transitionTimingFunction']] = easing;
	            this.getElem(this.index + 1).style[this.bind.Style['transitionTimingFunction']] = easing;
	            this.getElem(this.index - 1).style[this.bind.Style['transitionTimingFunction']] = easing;
	        },
	        translateStyle: function translateStyle(size) {
	            return {
	                'x': 'translate3d(' + size + 'px, 0px, 0px)',
	                'y': 'translate3d( 0px,' + size + 'px, 0px)'
	            };
	        },
	        transitionEnd: function transitionEnd(e) {
	            this.transitionTime(0);
	        }
	    },
	    ready: function ready() {
	        this.bind = new _bind2.default(this, this.$el.children[0]);
	        this.init();
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// div.mv-slider {
	//     position: relative;
	//     .mv-slider-ul {
	//         position: relative;
	//         overflow: hidden;
	//         .x-clearfix();
	//         li {
	//             position: absolute;
	//             left: 0px;
	//             top: 0px;
	//             width: 100%;
	//             z-index: 0;
	//             img {
	//                 display: block;
	//                 width: 100%;
	//             }
	//             span {
	//                 width: 100%;
	//                 padding: 0.1rem;
	//                 .x-box-sizing(border-box);
	//                 position: absolute;
	//                 bottom: 0px;
	//                 color: white;
	//                 background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, .7));
	//                 background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, .7));
	//                 color: #fff;
	//                 text-shadow: 0 1px 0 rgba(0, 0, 0, .5);
	//             }
	//         }
	//     }
	//     .mv-slider-index {
	//         position: absolute;
	//         bottom: 0.03rem;
	//         right: 0.02rem;
	//         height: 0.2rem;
	//         width: 100%;
	//         display: inline-block;
	//         text-align: right;
	//         z-index: 10;
	//         li {
	//             display: inline-block;
	//             width: 0.08rem;
	//             height: 0.08rem;
	//             .x-border-radius(0.08rem);
	//             background-color: white;
	//             margin-right: 0.04rem;
	//             border: 0px;
	//             &.selected {
	//                 background-color: @color-primary;
	//             }
	//         }
	//     }
	//     &.mv-slider-x {
	//         .mv-slider-ul li {
	//             &.mv-slider-active {
	//                 z-index: 1;
	//                 position: relative;
	//             }
	//             &.mv-slider-prev {
	//                 z-index: 1;
	//                 .x-prefix(transform;
	//                 translate3d(-100%, 0, 0));
	//             }
	//             &.mv-slider-next {
	//                 z-index: 1;
	//                 .x-prefix(transform;
	//                 translate3d(100%, 0, 0));
	//             }
	//         }
	//     }
	//     &.mv-slider-y {
	//         .mv-slider-ul li {
	//             &.mv-slider-active {
	//                 z-index: 1;
	//                 position: relative;
	//             }
	//             &.mv-slider-prev {
	//                 z-index: 1;
	//                 .x-prefix(transform;
	//                 translate3d(0, -100%, 0));
	//             }
	//             &.mv-slider-next {
	//                 z-index: 1;
	//                 .x-prefix(transform;
	//                 translate3d(0, 100%, 0));
	//             }
	//         }
	//     }
	// }
	// </style>
	// <template>
	//     <div :class="classes" :style="style">
	//         <ul class="mv-slider-ul">
	//             <slot></slot>
	//         </ul>
	//         <ul v-if="showIndex" class="mv-slider-index">
	//             <template v-for="(k,v) in liLength">
	//                 <li v-if="k == index" class="selected"></li>
	//                 <li v-else="k == index"></li>
	//             </template>
	//         </ul>
	//     </div>
	// </template>
	// <script>

/***/ },
/* 231 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"style\">\n    <ul class=\"mv-slider-ul\">\n        <slot></slot>\n    </ul>\n    <ul v-if=\"showIndex\" class=\"mv-slider-index\">\n        <template v-for=\"(k,v) in liLength\">\n            <li v-if=\"k == index\" class=\"selected\"></li>\n            <li v-else=\"k == index\"></li>\n        </template>\n    </ul>\n</div>\n";

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(233)
	__vue_script__ = __webpack_require__(235)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/page/page.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(236)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-0ed71b32/page.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(234);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./page.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./page.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\ndiv.mv-page span {\n  position: relative;\n  display: inline-block;\n  padding: 0.07rem 0.18rem;\n  margin-bottom: 0;\n  font-size: 0.13rem;\n  font-weight: 400;\n  line-height: 1.42;\n  color: #333;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: top;\n}\ndiv.mv-page .mv-btn {\n  margin: 0px;\n}\n", ""]);

	// exports


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _button = __webpack_require__(39);

	var _button2 = _interopRequireDefault(_button);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: { Icon: _icon2.default, Button: _button2.default },
	    props: {
	        class: {
	            type: String,
	            default: ""
	        },
	        style: {
	            type: [Object, String],
	            default: ""
	        },
	        current: {
	            type: Number,
	            default: 1
	        },
	        all: {
	            type: Number,
	            default: 1
	        }
	    },
	    computed: {
	        classes: function classes() {
	            return 'mv-page ' + this.class;
	        },
	        disabledPrev: function disabledPrev() {
	            return this.current == 1 ? true : false;
	        },
	        disabledNext: function disabledNext() {
	            return this.current == this.all ? true : false;
	        }
	    },
	    methods: {
	        prevClick: function prevClick() {
	            if (this.current > 1) {
	                this.current = this.current - 1;
	                this.$emit('on-change', this.current);
	            }
	        },
	        nextClick: function nextClick() {
	            if (this.current < this.all) {
	                this.current = this.current + 1;
	                this.$emit('on-change', this.current);
	            }
	        }
	    }
	};
	// </script>
	// <style lang="less">
	//     @import "../../assets/css/common.less";
	//
	//     div.mv-page{
	//         span{
	//             position: relative;
	//             display: inline-block;
	//             padding: 0.07rem 0.18rem;
	//             margin-bottom: 0;
	//             font-size: 0.13rem;
	//             font-weight: 400;
	//             line-height: 1.42;
	//             color: @color-theme-font-2;
	//             text-align: center;
	//             white-space: nowrap;
	//             vertical-align: top;
	//         }
	//         .mv-btn{
	//             margin: 0px;
	//         }
	//     }
	// </style>
	//
	// <template>
	//     <div :class="classes" :style="style">
	//         <Button :disabled.sync="disabledPrev" @click="prevClick">上一页</Button>
	//         <span>{{current}}/{{all}}</span>
	//         <Button :disabled.sync="disabledNext" @click="nextClick">下一页</Button>        
	//     </div>
	// </template>
	// <script>

/***/ },
/* 236 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"style\">\n    <Button :disabled.sync=\"disabledPrev\" @click=\"prevClick\">上一页</Button>\n    <span>{{current}}/{{all}}</span>\n    <Button :disabled.sync=\"disabledNext\" @click=\"nextClick\">下一页</Button>        \n</div>\n";

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(238)
	__vue_script__ = __webpack_require__(240)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] node_modules/mvui/components/uploader/uploader.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(241)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-55aaed47/uploader.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(239);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./uploader.vue", function() {
				var newContent = require("!!./../../../css-loader/index.js!./../../../vue-loader/lib/style-rewriter.js!./../../../less-loader/index.js!./../../../vue-loader/lib/selector.js?type=style&index=0!./uploader.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\na,\nbutton,\ninput {\n  outline: none;\n}\n/**\n * 主题颜色\n */\n/**\n * z-index管理, mvui的z-index从1000开始\n */\n/**\n * 公用函数\n * @author gaochao\n */\n/* clearfix less实现 */\n/* 去掉双击选中 */\n/**\n * css3动画\n * @param {string} @property 需要动画的属性，默认all\n * @param {string} @duration 持续时间，默认1s\n * @param {string} @timing-function 动画函数，默认ease-in\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 旋转\n * @param {string} @deg 旋转角度，默认0deg\n */\n/**\n * css3动画 缩放\n * @param {Number} @x 缩放比例\n * @param {Number} @y 缩放比例\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 translate\n * @param {Number} @x translateX\n * @param {Number} @y translateY\n */\n/**\n * css3动画 animate\n * @param {String} @aniName 动画名\n * @param {String} @time 时间\n * @param {String} @type 动画类型\n * @param {String} @delay 延迟\n * @param {String} @loop 是否循环\n * @param {String} @alternate 播放模式\n */\n/**\n * 透明度\n * @param {int} @opacity 透明度\n */\n/**\n * 边框背景设置\n * @param {String} bd-color 边框颜色\n * @param {String} bg-color 背景颜色\n */\n/**\n * 背景尺寸\n * @param {String} background-size 背景尺寸\n */\n/**\n * 字体相关设置\n * @param {String} font-size 大小\n * @param {String} font-weight 粗细\n * @param {String} color 字体颜色\n */\n/**\n * 圆角设置\n * @param {String} size 大小\n */\n/**\n* 背景透明\n* @param {Number} red 红色值0-255\n* @param {Number} green 红色值0-255\n* @param {Number} blue 红色值0-255\n* @param {Number} alpha 红色值0-1\n*/\n/**\n * 阴影效果\n * @param {String} x 水平位移\n * @param {String} y 垂直位置\n * @param {String} r 模糊半径\n * @param {String} c 颜色\n * @param {String} l 阴影尺寸\n */\n/**\n * box-sizing\n * @param {String} property  属性设置\n */\n/**\n * landing页面输入框等元素高度\n * @param {string} height 高度\n * @param {string} line-height 行高\n */\n/**\n * a无text-decoration\n */\n.x-a-none {\n  text-decoration: none;\n}\n.x-a-none:hover,\n.x-a-none:active {\n  text-decoration: none;\n}\n/**\n * 前缀宏代换\n * @param {String} property 属性\n * @param {String} rest 值\n **/\n/**\n * 前缀宏代换\n * @param {String} name 帧名称\n * @param {String} frames 帧动画\n **/\n/**\n * flex\n */\n.x-display-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n/**\n * flex num数量\n * @param {Number} num 水平位移\n */\n/**\n * flex-item 排列方式\n * @param {String} property 属性\n */\n/**\n * 旋转动画\n * @param {String} time 时间\n * @param {String} type 动画类型\n * @param {String} delay 延迟执行时间\n * @param {String} loop 循环方式\n */\n/** \n* https://github.com/frozenui/frozenui/ \n* MIT License\n*/\n.mv-1px-t {\n  border-top: 1px solid #e0e0e0;\n}\n.mv-1px-b {\n  border-bottom: 1px solid #e0e0e0;\n}\n.mv-1px-tb {\n  border-top: #e0e0e0 1px solid;\n  border-bottom: #e0e0e0 1px solid;\n  background-image: none;\n}\n.mv-1px-l {\n  border-left: 1px solid #e0e0e0;\n}\n.mv-1px-r {\n  border-right: 1px solid #e0e0e0;\n}\n.mv-1px {\n  border: 1px solid #e0e0e0;\n}\n.mv-1px-radius {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n@media screen and (min-device-pixel-ratio: 2) {\n  .mv-1px-radius {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-radius:before {\n    content: \"\";\n    width: 200%;\n    height: 200%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    border: 1px solid #e0e0e0;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    padding: 1px;\n    box-sizing: border-box;\n    border-radius: 8px;\n    pointer-events: none;\n  }\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n  .mv-1px {\n    position: relative;\n    border: 0;\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-l,\n  .mv-1px-r,\n  .mv-1px-tb {\n    border: 0;\n  }\n  .mv-1px-t {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-b {\n    background-position: left bottom;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-t,\n  .mv-1px-b,\n  .mv-1px-tb {\n    background-repeat: repeat-x;\n    -webkit-background-size: 100% 1px;\n  }\n  .mv-1px-tb {\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-position: top, bottom;\n  }\n  .mv-1px-l {\n    background-position: left top;\n    background-image: -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-r {\n    background-position: right top;\n    background-image: -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n  }\n  .mv-1px-l,\n  .mv-1px-r {\n    background-repeat: repeat-y;\n    background-size: 1px 100%;\n  }\n  .mv-1px:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, right top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0)), -webkit-gradient(linear, right top, left top, color-stop(0.5, transparent), color-stop(0.5, #e0e0e0));\n    background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;\n    background-repeat: no-repeat;\n    background-position: top, right, bottom, left;\n    padding: 1px;\n    box-sizing: border-box;\n    z-index: 10;\n    pointer-events: none;\n  }\n}\n.mv-fade-transition {\n  opacity: 1;\n  -webkit-transition: opacity .2s linear;\n  transition: opacity .2s linear;\n}\n.mv-fade-enter,\n.mv-fade-leave {\n  opacity: 0;\n}\n.mv-circular {\n  -webkit-animation: rotate 1s linear 0s infinite normal;\n  animation: rotate 1s linear 0s infinite normal;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  position: relative;\n  display: inline-block;\n  margin: auto;\n}\n@-webkit-keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n@keyframes rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\ndiv.mv-uploader {\n  position: relative;\n  display: block;\n  text-align: center;\n  display: table-cell;\n  vertical-align: middle;\n  color: #d7dde4;\n}\ndiv.mv-uploader input {\n  opacity: 0;\n  filter: alpha(opacity=0);\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n}\ndiv.mv-uploader .mv-icon-uploader {\n  font-size: 0.4rem;\n  display: inline-block;\n}\n", ""]);

	// exports


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _icon = __webpack_require__(27);

	var _icon2 = _interopRequireDefault(_icon);

	var _utils = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div :class="classes" :style="styles" :disabled="disabled">
	//         <input type="file" name="img" @change="change" />
	//         <slot name="preview">
	//             <Icon class="mv-icon-uploader"></Icon>
	//         </slot>
	//     </div>
	// </template>
	// <script>
	var STATUS = {
	    QUEUED: 'queued',
	    ABORTED: 'aborted',
	    UPLOADING: 'uploading',
	    COMPLETED: 'completed'
	};

	exports.default = {
	    components: {
	        Icon: _icon2.default
	    },
	    props: {
	        class: {
	            type: String,
	            default: ''
	        },
	        style: [Object, String],
	        /**
	         *  上传链接的地址
	         */
	        url: {
	            type: String,
	            default: ''
	        },
	        /**
	         *  后台接受的name
	         */
	        field: {
	            type: String,
	            default: 'file'
	        },
	        /**
	         *  文件最大的尺寸 以M为单位
	         */
	        maxSize: {
	            type: Number,
	            default: 4
	        },
	        maxSizeMessage: {
	            type: String,
	            default: '图片大小超过限制'
	        },
	        type: {
	            type: String,
	            default: 'jpg,png,jpeg,gif'
	        },
	        typeMessage: {
	            type: String,
	            default: '图片格式不正确'
	        },
	        autoLoad: {
	            type: Boolean,
	            default: true
	        },
	        more: {
	            type: Boolean,
	            default: false
	        },
	        status: {
	            type: String,
	            default: 'ready',
	            validator: function validator(value) {
	                return validate(value, ['ready', 'before', 'status', 'progress', 'success', 'complete', 'run']);
	            }
	        }
	    },
	    computed: {
	        styles: function styles() {
	            return (0, _utils.getStyle)(this.style);
	        },
	        classes: function classes() {
	            return 'mv-uploader ' + this.class;
	        }
	    },
	    ready: function ready() {
	        if (this.more) {
	            this.$el.children[0].setAttribute('multiple', 'multiple');
	        }
	    },
	    data: function data() {
	        return {
	            param: {
	                preview: [],
	                validate: []
	            },
	            queue: []
	        };
	    },

	    methods: {
	        change: function change(event) {
	            var files = event.target.files;
	            this.param.validate = [];
	            this.param.preview = [];
	            for (var i = 0; i < files.length; ++i) {
	                var url = void 0;
	                if (!this.validate(files[i])) {
	                    break;
	                }
	                this.add(files[i]);
	                // 调用ready方法
	                url = this.getFileUrl(files[i]);
	                this.param.preview.push(url);
	            }
	            // 校验失败回调
	            if (this.param.validate.length > 0) {
	                this.$emit('on-validate', this.param.validate);
	            }
	            this.$emit('on-preview', this.param.preview);
	            this.status = 'status';
	            if (this.autoLoad) {
	                this.run();
	            }
	        },
	        validate: function validate(file) {
	            var fileName = file.name || file.fileName;
	            // 判断图片大小
	            if (file.size / 1024 / 1024 > this.maxSize) {
	                //alert('上传图片超出了最大限制,最大只能上传'+this.maxSize+'M');
	                this.param.validate.push({
	                    file: file,
	                    message: this.maxSizeMessage,
	                    type: 'size'
	                });
	                return false;
	            }
	            // 判断图片
	            if (!fileName.toLowerCase().match('(jpg)|(png)|(jpeg)|(gif)$')) {
	                this.param.validate.push({
	                    file: file,
	                    message: this.typeMessage,
	                    type: 'format'
	                });
	                return false;
	            }
	            return true;
	        },
	        add: function add(file) {
	            this.queue.push(file);
	        },
	        run: function run() {
	            if (this.queue.length == 0) {
	                return;
	            }
	            var item = this.queue.shift();
	            this.doUpload(item);
	        },
	        doUpload: function doUpload(item) {
	            var self = this,
	                xhr = void 0,
	                formData = new FormData();
	            xhr = item.xhr = this.xhr = this.xhr || new XMLHttpRequest();
	            //this.options.beforeSend.call(this, item, xhr);
	            this.$emit('on-before', item, this.xhr);
	            this.status = 'before';
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === 4) {
	                    self.onComplete(item, xhr);
	                }
	            };
	            xhr.upload.onprogress = function (evt) {
	                var loaded = evt.loaded,
	                    tot = evt.total,
	                    per = Math.floor(100 * loaded / tot); //已经上传的百分比
	                self.$emit('on-progress', per);
	                this.status = 'progress';
	            };
	            xhr.open('post', this.url, true);
	            formData.append(this.field, item);
	            xhr.send(formData);
	        },

	        onComplete: function onComplete(item, xhr) {
	            if (item.status !== STATUS.ABORTED) {
	                item.status = STATUS.COMPLETED;
	                if (xhr.status === 200) {
	                    //this.success.call(this, item, xhr);
	                    this.$emit('on-success', JSON.parse(xhr.responseText), item);
	                    this.status = 'success';
	                } else {
	                    //this.options.error.call(this, item, xhr);
	                    this.$emit('on-error', item);
	                }
	                //this.options.complete.call(this, item, xhr);
	                this.$emit('on-complete', item);
	                this.status = 'complete';
	            }
	            if (item.xhr) {
	                delete item.xhr;
	            }
	            this.run();
	        },
	        getFileUrl: function getFileUrl(file) {
	            var url = void 0;
	            if (navigator.userAgent.indexOf("MSIE") >= 1) {
	                // IE 
	                url = this.$el.children[0].value;
	            } else {
	                url = window.URL.createObjectURL(file);
	            }
	            return url;
	        }
	    },
	    watch: {
	        status: function status(val) {
	            if (val == 'run') {
	                this.run();
	            }
	        }
	    }
	};
	// </script>
	// <style lang="less">
	// @import "../../assets/css/common.less";
	// div.mv-uploader {
	//     position: relative;
	//     display: block;
	//     text-align: center;
	//     display:table-cell;
	//     vertical-align: middle; 
	//     color: @color-border-theme;
	//     input{
	//         .x-opacity(0);
	//         position: absolute;
	//         top: 0px;
	//         left: 0px;
	//         width: 100%;
	//         height: 100%;
	//     }
	//     .mv-icon-uploader{
	//         font-size: 0.4rem;
	//         display: inline-block;
	//     }
	// }
	// </style>

/***/ },
/* 241 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"classes\" :style=\"styles\" :disabled=\"disabled\">\n    <input type=\"file\" name=\"img\" @change=\"change\" />\n    <slot name=\"preview\">\n        <Icon class=\"mv-icon-uploader\"></Icon>\n    </slot>\n</div>\n";

/***/ },
/* 242 */
/***/ function(module, exports) {

	module.exports = "\n<header>\n    <a v-link=\"{path:'/home' , activeClass:'active'}\">\n        <Icon v-if=\"icon\" class=\"mv-icon-arrow-left mv-icon-class\"></Icon>\n    </a>\n    <slot></slot>\n</header>\n";

/***/ },
/* 243 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"home\">\n    <div class=\"home-list\">\n        <div class=\"home-list-title\">base</div>\n        <ul>\n            <li><a v-link=\"{path:'/button' , activeClass:'active'}\">Button 按钮</a></li>\n        </ul>\n    </div>\n</div>\n";

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(245)
	__vue_script__ = __webpack_require__(247)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/components/button.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(248)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4c22044c/button.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(246);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./button.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./button.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, ".mv-btn {\n  margin-top: 0.05rem;\n}\n", ""]);

	// exports


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _hometitle = __webpack_require__(22);

	var _hometitle2 = _interopRequireDefault(_hometitle);

	var _mvui = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>  
	//     <div class="body-wrapper">
	//         <Hometitle>Button</Hometitle>
	//         <div class="wrapper-example">
	//
	//             <div class="wrapper-area">
	//                 <div class="wrapper-area-title">默认形状</div>
	//                 <div class="wrapper-area-content">
	//                     <Button @click="click">默认按钮</Button>
	//                 </div>
	//             </div>
	//
	//             <div class="wrapper-area">
	//                 <div class="wrapper-area-title">形状控制</div>
	//                 <div class="wrapper-area-content">
	//                     <Button shape="round">圆角按钮</Button>
	//                     <Button shape="round" disabled="disabled">disabled</Button>
	//                 </div>
	//             </div>
	//
	//             <div class="wrapper-area">
	//                 <div class="wrapper-area-title">颜色</div>
	//                 <div class="wrapper-area-content">
	//                     <Button class="mv-btn-primary" type="submit">primary</Button>
	//                     <Button class="mv-btn-success">success</Button>
	//                     <Button class="mv-btn-warning">warning</Button>
	//                     <Button class="mv-btn-danger">danger</Button>
	//                     <Button class="mv-btn-royal">royal</Button>
	//                 </div>
	//             </div>
	//
	//             <div class="wrapper-area">
	//                 <div class="wrapper-area-title">是否有背景色</div>
	//                 <div class="wrapper-area-content">
	//                     <Button class="mv-btn-primary" type="submit">primary</Button>
	//                     <Button class="mv-btn-primary" type="submit" :plain="true">primary</Button>
	//                     <Button class="mv-btn-primary" type="submit" :plain="true" shape="round">primary</Button>
	//                     <Button class="mv-btn-primary" type="submit" :plain="true" shape="round" disabled="disabled">primary</Button>
	//                 </div>
	//             </div>
	//
	//             <div class="wrapper-area">
	//                 <div class="wrapper-area-title">是否有icon以及修改icon样式</div>
	//                 <div class="wrapper-area-content">
	//                     <Button class="mv-btn-primary" icon="mv-icon-loading-1" icon-style="font-size: 0.14rem;">加载中...</Button>
	//                     <Button class="mv-btn-primary" icon="mv-icon-loading-1" icon-style="color: red;font-size: 0.14rem;">加载完成</Button>
	//                 </div>
	//             </div>
	//
	//             <div class="wrapper-area">
	//                 <div class="wrapper-area-title">点击事件</div>
	//                 <div class="wrapper-area-content">
	//                     <Button @click="click">按钮点击</Button>
	//                 </div>
	//             </div>
	//
	//         </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    components: {
	        Hometitle: _hometitle2.default,
	        Button: _mvui.Button
	    },
	    methods: {
	        click: function click(event) {
	            console.log(event);
	            debugger;
	        }
	    }
	};
	// </script>
	// <style lang="less">
	//     .mv-btn{
	//         margin-top: 0.05rem;
	//     }
	// </style>

/***/ },
/* 248 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"body-wrapper\">\n    <Hometitle>Button</Hometitle>\n    <div class=\"wrapper-example\">\n        \n        <div class=\"wrapper-area\">\n            <div class=\"wrapper-area-title\">默认形状</div>\n            <div class=\"wrapper-area-content\">\n                <Button @click=\"click\">默认按钮</Button>\n            </div>\n        </div>\n\n        <div class=\"wrapper-area\">\n            <div class=\"wrapper-area-title\">形状控制</div>\n            <div class=\"wrapper-area-content\">\n                <Button shape=\"round\">圆角按钮</Button>\n                <Button shape=\"round\" disabled=\"disabled\">disabled</Button>\n            </div>\n        </div>\n\n        <div class=\"wrapper-area\">\n            <div class=\"wrapper-area-title\">颜色</div>\n            <div class=\"wrapper-area-content\">\n                <Button class=\"mv-btn-primary\" type=\"submit\">primary</Button>\n                <Button class=\"mv-btn-success\">success</Button>\n                <Button class=\"mv-btn-warning\">warning</Button>\n                <Button class=\"mv-btn-danger\">danger</Button>\n                <Button class=\"mv-btn-royal\">royal</Button>\n            </div>\n        </div>\n\n        <div class=\"wrapper-area\">\n            <div class=\"wrapper-area-title\">是否有背景色</div>\n            <div class=\"wrapper-area-content\">\n                <Button class=\"mv-btn-primary\" type=\"submit\">primary</Button>\n                <Button class=\"mv-btn-primary\" type=\"submit\" :plain=\"true\">primary</Button>\n                <Button class=\"mv-btn-primary\" type=\"submit\" :plain=\"true\" shape=\"round\">primary</Button>\n                <Button class=\"mv-btn-primary\" type=\"submit\" :plain=\"true\" shape=\"round\" disabled=\"disabled\">primary</Button>\n            </div>\n        </div>\n\n        <div class=\"wrapper-area\">\n            <div class=\"wrapper-area-title\">是否有icon以及修改icon样式</div>\n            <div class=\"wrapper-area-content\">\n                <Button class=\"mv-btn-primary\" icon=\"mv-icon-loading-1\" icon-style=\"font-size: 0.14rem;\">加载中...</Button>\n                <Button class=\"mv-btn-primary\" icon=\"mv-icon-loading-1\" icon-style=\"color: red;font-size: 0.14rem;\">加载完成</Button>\n            </div>\n        </div>\n\n        <div class=\"wrapper-area\">\n            <div class=\"wrapper-area-title\">点击事件</div>\n            <div class=\"wrapper-area-content\">\n                <Button @click=\"click\">按钮点击</Button>\n            </div>\n        </div>\n\n    </div>\n</div>\n";

/***/ }
]);