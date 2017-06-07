'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	template: '<div id="map"></div>',
	data: function data() {
		return {};
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

			return map;
		},
		registerEvents: function registerEvents(map) {
			var _this = this;

			//Map Loaded
			map.on('load', function () {
				_this.$emit('map-load', map);

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
			});

			//Map Resized
			map.on('resize', function () {
				_this.$emit('map-resize', map);
			});

			//Map Webgl Context Lost 
			map.on('resize', function (e) {
				_this.$emit('map-webglcontextlost', map, e);
			});

			//Map Webgl Context Restored
			map.on('resize', function (e) {
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

			//Map Touch Move
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

			//Map Touch End
			map.on('touchend', function (e) {
				_this.$emit('map-touchend', map, e);
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
			//Nav Control
			if (this.navControl.show) {
				var nav = new mapboxgl.NavigationControl();
				map.addControl(nav, this.navControl.position);
			}

			//Geolocation Control
			if (this.geolocateControl.show) {
				var geolocate = new mapboxgl.GeolocateControl(this.geolocateControl.options);
				map.addControl(geolocate, this.geolocateControl.position);
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
	}
};
