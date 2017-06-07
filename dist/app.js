/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
	template: '<div id="map"></div>',
	data () {
		return {

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
			default: () => {
				return {
					show: true,
					position: 'top-right'
				};
			}
		},
		geolocateControl: {
			type: Object,
			default: () => {
				return {
					show: false,
					position: 'top-left',
					options: {}
				};
			}
		},
		scaleControl: {
			type: Object,
			default: () => {
				return {
					show: false,
					position: 'top-left',
					options: {}
				};
			}
		},
		fullscreenControl: {
			type: Object,
			default: () => {
				return {
					show: false,
					position: 'top-right'
				};
			}
		}
	},
	mounted () {
		//Initialze Map
		const map = this.mapInit();

		//Add Controls to map
		this.addControls(map);

		//Register Map Events
		this.registerEvents(map);
	},
	methods: {
		mapInit () {
			//Mapbox GL access token
			mapboxgl.accessToken = this.accessToken;

			//Add container to options object
			if (!this.mapOptions.hasOwnProperty('container')) {
				this.mapOptions.container = 'map';
			}

			//New Mapbox Instance
			const map = new mapboxgl.Map(this.mapOptions);

			return map;
		},
		registerEvents (map) {
			//Map Loaded
			map.on('load', () => {
				this.$emit('map-load', map);

				//Map Mouse Move
				map.on('mousemove', (e) => {
					this.$emit('map-mousemove', map, e);
				});

				//Map Clicked
				map.on('click', (e) => {
					this.$emit('map-click', map, e);
				});

				//Map Context Menu
				map.on('contextmenu', (e) => {
					this.$emit('map-contextmenu', map, e);
				});
			});

			//Map Resized
			map.on('resize', () => {
				this.$emit('map-resize', map);
			});

			//Map Webgl Context Lost 
			map.on('resize', (e) => {
				this.$emit('map-webglcontextlost', map, e);
			});

			//Map Webgl Context Restored
			map.on('resize', (e) => {
				this.$emit('map-webglcontextrestored', map, e);
			});

			//Map Removed
			map.on('remove', () => {
				this.$emit('map-remove', map);
			});

			//Map Source Data Loading
			map.on('sourcedataloading', (e) => {
				this.$emit('map-sourcedataloading', map, e);
			});

			//Map Touch Start
			map.on('touchstart', (e) => {
				this.$emit('map-touchstart', map, e);
			});

			//Map Move Start
			map.on('movestart', (e) => {
				this.$emit('map-movestart', map, e);
			});

			//Map Touch Move
			map.on('movestart', (e) => {
				this.$emit('map-movestart', map, e);
			});

			//Map Move
			map.on('move', (e) => {
				this.$emit('map-move', map, e);
			});

			//Map Move End
			map.on('moveend', (e) => {
				this.$emit('map-moveend', map, e);
			});

			//Map Error
			map.on('error', (e) => {
				this.$emit('map-error', map, e);
			});

			//Map Data
			map.on('data', (e) => {
				this.$emit('map-data', map, e);
			});

			//Map Style Data
			map.on('styledata', (e) => {
				this.$emit('map-styledata', map, e);
			});

			//Map Mouse Up
			map.on('mouseup', (e) => {
				this.$emit('map-mouseup', map, e);
			});

			//Map Touch Cancel
			map.on('touchcancel', (e) => {
				this.$emit('map-touchcancel', map, e);
			});

			//Map Source Data
			map.on('sourcedata', (e) => {
				this.$emit('map-sourcedata', map, e);
			});

			//Map Data Loading
			map.on('dataloading', (e) => {
				this.$emit('map-dataloading', map, e);
			});

			//Map Style Data Loading
			map.on('styledataloading', (e) => {
				this.$emit('map-styledataloading', map, e);
			});

			//Map Double Click
			map.on('dblclick', (e) => {
				this.$emit('map-dblclick', map, e);
			});

			//Map Render
			map.on('render', () => {
				this.$emit('map-render', map);
			});

			//Map Mouse Out
			map.on('mouseout', (e) => {
				this.$emit('map-mouseout', map, e);
			});

			//Map Mouse Down
			map.on('mousedown', (e) => {
				this.$emit('map-mousedown', map, e);
			});

			//Map Touch End
			map.on('touchend', (e) => {
				this.$emit('map-touchend', map, e);
			});

			//Map Zoom Start
			map.on('zoomstart', (e) => {
				this.$emit('map-zoomstart', map, e);
			});

			//Map Zoom End
			map.on('zoomend', (e) => {
				this.$emit('map-zoomend', map, e);
			});

			//Map Zoom
			map.on('zoom', (e) => {
				this.$emit('map-zoom', map, e);
			});

			//Map Box Zoom Cancel
			map.on('boxzoomcancel', (e) => {
				this.$emit('map-boxzoomcancel', map, e);
			});

			//Map Box Zoom End
			map.on('boxzoomend', (e) => {
				this.$emit('map-boxzoomend', map, e);
			});

			//Map Box Zoom Start
			map.on('boxzoomstart', (e) => {
				this.$emit('map-boxzoomstart', map, e);
			});

			//Map Rotate Start
			map.on('rotatestart', (e) => {
				this.$emit('map-rotatestart', map, e);
			});

			//Map Rotate
			map.on('rotate', (e) => {
				this.$emit('map-rotate', map, e);
			});

			//Map Rotate End
			map.on('rotateend', (e) => {
				this.$emit('map-rotateend', map, e);
			});

			//Map Drag End
			map.on('dragend', (e) => {
				this.$emit('map-dragend', map, e);
			});

			//Map Drag
			map.on('drag', (e) => {
				this.$emit('map-drag', map, e);
			});

			//Map Drag
			map.on('dragstart', (e) => {
				this.$emit('map-dragstart', map, e);
			});

			//Map Pitch
			map.on('pitch', (e) => {
				this.$emit('map-pitch', map, e);
			});

			//Map Pitch Start
			map.on('pitchstart', (e) => {
				this.$emit('map-pitchstart', map, e);
			});

			//Map Pitch End
			map.on('pitchend', (e) => {
				this.$emit('map-pitchend', map, e);
			});

		},
		addControls (map) {
			//Nav Control
			if (this.navControl.show) {
				const nav = new mapboxgl.NavigationControl();
				map.addControl(nav, this.navControl.position);
			}

			//Geolocation Control
			if (this.geolocateControl.show) {
				const geolocate = new mapboxgl.GeolocateControl(this.geolocateControl.options);
				map.addControl(geolocate, this.geolocateControl.position);
			}

			//Scale Control
			if (this.scaleControl.show) {
				const scale = new mapboxgl.ScaleControl(this.scaleControl.options);
				map.addControl(scale, this.scaleControl.position);
			}

			//Fullscreen Control
			if (this.fullscreenControl.show) {
				const fullscreen = new mapboxgl.FullscreenControl();
				map.addControl(fullscreen, this.fullscreenControl.position);
			}

		}
	},
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Mapbox = __webpack_require__(0);

var _Mapbox2 = _interopRequireDefault(_Mapbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new Vue({
	el: '#app',
	components: {
		'mapbox': _Mapbox2.default
	},
	methods: {
		mapLoaded: function mapLoaded(map) {
			map.addLayer({
				'id': 'points',
				'type': 'symbol',
				'source': {
					'type': 'geojson',
					'data': {
						'type': 'FeatureCollection',
						'features': [{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-77.03238901390978, 38.913188059745586]
							},
							'properties': {
								'title': 'Mapbox DC',
								'icon': 'monument'
							}
						}, {
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [-122.414, 37.776]
							},
							'properties': {
								'title': 'Mapbox SF',
								'icon': 'harbor'
							}
						}]
					}
				},
				'layout': {
					'icon-image': '{icon}-15',
					'text-field': '{title}',
					'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
					'text-offset': [0, 0.6],
					'text-anchor': 'top'
				}
			});
		},
		mapClicked: function mapClicked(map, e) {
			this.addPopUp(map, e);
		},
		mapMouseMoved: function mapMouseMoved(map, e) {
			var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
			map.getCanvas().style.cursor = features.length ? 'pointer' : '';
		},
		addPopUp: function addPopUp(map, e) {
			var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
			if (!features.length) {
				return;
			}

			var feature = features[0];

			var popupContent = Vue.extend({
				template: '<button @click="popupClicked">Click Me!</button>',
				methods: {
					popupClicked: function popupClicked() {
						alert('Popup Clicked!');
					}
				}
			});

			// Populate the popup and set its coordinates
			// based on the feature found.
			var popup = new mapboxgl.Popup().setLngLat(feature.geometry.coordinates).setHTML('<div id="vue-popup-content"></div>').addTo(map);

			new popupContent().$mount('#vue-popup-content');
		}
	}
});

/***/ })
/******/ ]);