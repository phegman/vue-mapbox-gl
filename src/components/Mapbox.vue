<template>
	<div :id="(mapOptions.hasOwnProperty('container') ? mapOptions.container : 'map')"></div>
</template>

<script>
	export default {
		data () {
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

			//Save map object to data
			this._map = map;

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

				//Emit init event passing map object
				this.$emit('map-init', map);

				return map;
			},
			registerEvents (map) {
				//Map Loaded
				map.on('load', () => {
					this.$emit('map-load', map);
				});

				//Map Mouse Move
				map.on('mousemove', e => {
					this.$emit('map-mousemove', map, e);
				});

				//Map Clicked
				map.on('click', e => {
					this.$emit('map-click', map, e);
				});

				//Map Context Menu
				map.on('contextmenu', e => {
					this.$emit('map-contextmenu', map, e);
				});

				//Map Resized
				map.on('resize', () => {
					this.$emit('map-resize', map);
				});

				//Map Webgl Context Lost 
				map.on('webglcontextlost', e => {
					this.$emit('map-webglcontextlost', map, e);
				});

				//Map Webgl Context Restored
				map.on('webglcontextrestored', e => {
					this.$emit('map-webglcontextrestored', map, e);
				});

				//Map Removed
				map.on('remove', () => {
					this.$emit('map-remove', map);
				});

				//Map Source Data Loading
				map.on('sourcedataloading', e => {
					this.$emit('map-sourcedataloading', map, e);
				});

				//Map Touch Start
				map.on('touchstart', e => {
					this.$emit('map-touchstart', map, e);
				});

				//Map Move Start
				map.on('movestart', e => {
					this.$emit('map-movestart', map, e);
				});

				//Map Move
				map.on('move', e => {
					this.$emit('map-move', map, e);
				});

				//Map Move End
				map.on('moveend', e => {
					this.$emit('map-moveend', map, e);
				});

				//Map Error
				map.on('error', e => {
					this.$emit('map-error', map, e);
				});

				//Map Data
				map.on('data', e => {
					this.$emit('map-data', map, e);
				});

				//Map Style Data
				map.on('styledata', e => {
					this.$emit('map-styledata', map, e);
				});

				//Map Mouse Up
				map.on('mouseup', e => {
					this.$emit('map-mouseup', map, e);
				});

				//Map Touch Cancel
				map.on('touchcancel', e => {
					this.$emit('map-touchcancel', map, e);
				});

				//Map Source Data
				map.on('sourcedata', e => {
					this.$emit('map-sourcedata', map, e);
				});

				//Map Data Loading
				map.on('dataloading', e => {
					this.$emit('map-dataloading', map, e);
				});

				//Map Style Data Loading
				map.on('styledataloading', e => {
					this.$emit('map-styledataloading', map, e);
				});

				//Map Double Click
				map.on('dblclick', e => {
					this.$emit('map-dblclick', map, e);
				});

				//Map Render
				map.on('render', () => {
					this.$emit('map-render', map);
				});

				//Map Mouse Out
				map.on('mouseout', e => {
					this.$emit('map-mouseout', map, e);
				});

				//Map Mouse Down
				map.on('mousedown', e => {
					this.$emit('map-mousedown', map, e);
				});

				//Map Mouse Over
				map.on('mouseover', e => {
					this.$emit('map-mouseover', map, e);
				});

				//Map Touch End
				map.on('touchend', e => {
					this.$emit('map-touchend', map, e);
				});

				//Map Touch Move
				map.on('touchmove', e => {
					this.$emit('map-touchmove', map, e);
				});

				//Map Zoom Start
				map.on('zoomstart', e => {
					this.$emit('map-zoomstart', map, e);
				});

				//Map Zoom End
				map.on('zoomend', e => {
					this.$emit('map-zoomend', map, e);
				});

				//Map Zoom
				map.on('zoom', e => {
					this.$emit('map-zoom', map, e);
				});

				//Map Box Zoom Cancel
				map.on('boxzoomcancel', e => {
					this.$emit('map-boxzoomcancel', map, e);
				});

				//Map Box Zoom End
				map.on('boxzoomend', e => {
					this.$emit('map-boxzoomend', map, e);
				});

				//Map Box Zoom Start
				map.on('boxzoomstart', e => {
					this.$emit('map-boxzoomstart', map, e);
				});

				//Map Rotate Start
				map.on('rotatestart', e => {
					this.$emit('map-rotatestart', map, e);
				});

				//Map Rotate
				map.on('rotate', e => {
					this.$emit('map-rotate', map, e);
				});

				//Map Rotate End
				map.on('rotateend', e => {
					this.$emit('map-rotateend', map, e);
				});

				//Map Drag End
				map.on('dragend', e => {
					this.$emit('map-dragend', map, e);
				});

				//Map Drag
				map.on('drag', e => {
					this.$emit('map-drag', map, e);
				});

				//Map Drag
				map.on('dragstart', e => {
					this.$emit('map-dragstart', map, e);
				});

				//Map Pitch
				map.on('pitch', e => {
					this.$emit('map-pitch', map, e);
				});

				//Map Pitch Start
				map.on('pitchstart', e => {
					this.$emit('map-pitchstart', map, e);
				});

				//Map Pitch End
				map.on('pitchend', e => {
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

					geolocate.on('geolocate', position => {
						this.$emit('geolocate-geolocate', geolocate, position);
					});

					geolocate.on('trackuserlocationstart', () => {
						this.$emit('geolocate-trackuserlocationstart', geolocate);
					});

					geolocate.on('trackuserlocationend', () => {
						this.$emit('geolocate-trackuserlocationend', geolocate);
					});

					geolocate.on('error', positionError => {
						this.$emit('geolocate-error', geolocate, positionError);
					});
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
		beforeDestroy() { 
			this._map.remove();
		}
	};
</script>
