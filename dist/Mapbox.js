(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mapbox-gl-vue", [], factory);
	else if(typeof exports === 'object')
		exports["mapbox-gl-vue"] = factory();
	else
		root["mapbox-gl-vue"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//

exports.default = {
	data: function data() {
		return {
			_map: null
		};
	},

	props: {
		accessToken: {
			type: String,
			required: true
		},
		mapOptions: {
			type: Object,
			required: true
		},
		navControl: {
			type: Object,
			default: function _default() {
				return {
					show: true,
					position: 'top-right'
				};
			}
		},
		geolocateControl: {
			type: Object,
			default: function _default() {
				return {
					show: false,
					position: 'top-left',
					options: {}
				};
			}
		},
		scaleControl: {
			type: Object,
			default: function _default() {
				return {
					show: false,
					position: 'top-left',
					options: {}
				};
			}
		},
		fullscreenControl: {
			type: Object,
			default: function _default() {
				return {
					show: false,
					position: 'top-right'
				};
			}
		}
	},
	mounted: function mounted() {
		//Initialze Map
		var map = this.mapInit();

		//Save map object to data
		this._map = map;

		//Add Controls to map
		this.addControls(map);

		//Register Map Events
		this.registerEvents(map);
	},

	methods: {
		mapInit: function mapInit() {
			//Mapbox GL access token
			mapboxgl.accessToken = this.accessToken;

			//Add container to options object
			if (!this.mapOptions.hasOwnProperty('container')) {
				this.mapOptions.container = 'map';
			}

			//New Mapbox Instance
			var map = new mapboxgl.Map(this.mapOptions);

			//Emit init event passing map object
			this.$emit('map-init', map);

			return map;
		},
		registerEvents: function registerEvents(map) {
			var _this = this;

			//Map Loaded
			map.on('load', function () {
				_this.$emit('map-load', map);
			});

			//Map Mouse Move
			map.on('mousemove', function (e) {
				_this.$emit('map-mousemove', map, e);
			});

			//Map Clicked
			map.on('click', function (e) {
				_this.$emit('map-click', map, e);
			});

			//Map Context Menu
			map.on('contextmenu', function (e) {
				_this.$emit('map-contextmenu', map, e);
			});

			//Map Resized
			map.on('resize', function () {
				_this.$emit('map-resize', map);
			});

			//Map Webgl Context Lost 
			map.on('webglcontextlost', function (e) {
				_this.$emit('map-webglcontextlost', map, e);
			});

			//Map Webgl Context Restored
			map.on('webglcontextrestored', function (e) {
				_this.$emit('map-webglcontextrestored', map, e);
			});

			//Map Removed
			map.on('remove', function () {
				_this.$emit('map-remove', map);
			});

			//Map Source Data Loading
			map.on('sourcedataloading', function (e) {
				_this.$emit('map-sourcedataloading', map, e);
			});

			//Map Touch Start
			map.on('touchstart', function (e) {
				_this.$emit('map-touchstart', map, e);
			});

			//Map Move Start
			map.on('movestart', function (e) {
				_this.$emit('map-movestart', map, e);
			});

			//Map Move
			map.on('move', function (e) {
				_this.$emit('map-move', map, e);
			});

			//Map Move End
			map.on('moveend', function (e) {
				_this.$emit('map-moveend', map, e);
			});

			//Map Error
			map.on('error', function (e) {
				_this.$emit('map-error', map, e);
			});

			//Map Data
			map.on('data', function (e) {
				_this.$emit('map-data', map, e);
			});

			//Map Style Data
			map.on('styledata', function (e) {
				_this.$emit('map-styledata', map, e);
			});

			//Map Mouse Up
			map.on('mouseup', function (e) {
				_this.$emit('map-mouseup', map, e);
			});

			//Map Touch Cancel
			map.on('touchcancel', function (e) {
				_this.$emit('map-touchcancel', map, e);
			});

			//Map Source Data
			map.on('sourcedata', function (e) {
				_this.$emit('map-sourcedata', map, e);
			});

			//Map Data Loading
			map.on('dataloading', function (e) {
				_this.$emit('map-dataloading', map, e);
			});

			//Map Style Data Loading
			map.on('styledataloading', function (e) {
				_this.$emit('map-styledataloading', map, e);
			});

			//Map Double Click
			map.on('dblclick', function (e) {
				_this.$emit('map-dblclick', map, e);
			});

			//Map Render
			map.on('render', function () {
				_this.$emit('map-render', map);
			});

			//Map Mouse Out
			map.on('mouseout', function (e) {
				_this.$emit('map-mouseout', map, e);
			});

			//Map Mouse Down
			map.on('mousedown', function (e) {
				_this.$emit('map-mousedown', map, e);
			});

			//Map Mouse Over
			map.on('mouseover', function (e) {
				_this.$emit('map-mouseover', map, e);
			});

			//Map Touch End
			map.on('touchend', function (e) {
				_this.$emit('map-touchend', map, e);
			});

			//Map Touch Move
			map.on('touchmove', function (e) {
				_this.$emit('map-touchmove', map, e);
			});

			//Map Zoom Start
			map.on('zoomstart', function (e) {
				_this.$emit('map-zoomstart', map, e);
			});

			//Map Zoom End
			map.on('zoomend', function (e) {
				_this.$emit('map-zoomend', map, e);
			});

			//Map Zoom
			map.on('zoom', function (e) {
				_this.$emit('map-zoom', map, e);
			});

			//Map Box Zoom Cancel
			map.on('boxzoomcancel', function (e) {
				_this.$emit('map-boxzoomcancel', map, e);
			});

			//Map Box Zoom End
			map.on('boxzoomend', function (e) {
				_this.$emit('map-boxzoomend', map, e);
			});

			//Map Box Zoom Start
			map.on('boxzoomstart', function (e) {
				_this.$emit('map-boxzoomstart', map, e);
			});

			//Map Rotate Start
			map.on('rotatestart', function (e) {
				_this.$emit('map-rotatestart', map, e);
			});

			//Map Rotate
			map.on('rotate', function (e) {
				_this.$emit('map-rotate', map, e);
			});

			//Map Rotate End
			map.on('rotateend', function (e) {
				_this.$emit('map-rotateend', map, e);
			});

			//Map Drag End
			map.on('dragend', function (e) {
				_this.$emit('map-dragend', map, e);
			});

			//Map Drag
			map.on('drag', function (e) {
				_this.$emit('map-drag', map, e);
			});

			//Map Drag
			map.on('dragstart', function (e) {
				_this.$emit('map-dragstart', map, e);
			});

			//Map Pitch
			map.on('pitch', function (e) {
				_this.$emit('map-pitch', map, e);
			});

			//Map Pitch Start
			map.on('pitchstart', function (e) {
				_this.$emit('map-pitchstart', map, e);
			});

			//Map Pitch End
			map.on('pitchend', function (e) {
				_this.$emit('map-pitchend', map, e);
			});
		},
		addControls: function addControls(map) {
			var _this2 = this;

			//Nav Control
			if (this.navControl.show) {
				var nav = new mapboxgl.NavigationControl();
				map.addControl(nav, this.navControl.position);
			}

			//Geolocation Control
			if (this.geolocateControl.show) {
				var geolocate = new mapboxgl.GeolocateControl(this.geolocateControl.options);
				map.addControl(geolocate, this.geolocateControl.position);

				geolocate.on('geolocate', function (position) {
					_this2.$emit('geolocate-geolocate', geolocate, position);
				});

				geolocate.on('trackuserlocationstart', function () {
					_this2.$emit('geolocate-trackuserlocationstart', geolocate);
				});

				geolocate.on('trackuserlocationend', function () {
					_this2.$emit('geolocate-trackuserlocationend', geolocate);
				});

				geolocate.on('error', function (positionError) {
					_this2.$emit('geolocate-error', geolocate, positionError);
				});
			}

			//Scale Control
			if (this.scaleControl.show) {
				var scale = new mapboxgl.ScaleControl(this.scaleControl.options);
				map.addControl(scale, this.scaleControl.position);
			}

			//Fullscreen Control
			if (this.fullscreenControl.show) {
				var fullscreen = new mapboxgl.FullscreenControl();
				map.addControl(fullscreen, this.fullscreenControl.position);
			}
		}
	},
	beforeDestroy: function beforeDestroy() {
		this._map.remove();
	}
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    attrs: {
      id: _vm.mapOptions.hasOwnProperty("container")
        ? _vm.mapOptions.container
        : "map"
    }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d7f5bcc2", esExports)
  }
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Mapbox_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Mapbox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Mapbox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d7f5bcc2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Mapbox_vue__ = __webpack_require__(2);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Mapbox_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d7f5bcc2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Mapbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Mapbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d7f5bcc2", Component.options)
  } else {
    hotAPI.reload("data-v-d7f5bcc2", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })
/******/ ]);
});