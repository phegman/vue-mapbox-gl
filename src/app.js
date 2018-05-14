import Mapbox from './components/Mapbox.vue';

const app = new Vue({
	el: '#app',
	components: { Mapbox },
	methods: {
		mapInit(map) {
			const Draw = new MapboxDraw();

			map.addControl(Draw);
		},
		mapLoaded(map) {
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
		mapClicked(map, e) {
			this.addPopUp(map, e);
		},
		mapMouseMoved(map, e) {
			const features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
			map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
		},
		geolocate(control, position) {
			console.log(`User position: ${position.coords.latitude}, ${position.coords.longitude}`);
		},
		geolocateError(control, positionError) {
			console.log(positionError);
		},
		geolocateStart(control) {
			console.log('geolocate started');
		},
		geolocateEnd(control) {
			console.log('geolocate ended');
		},
		addPopUp(map, e) {
			const features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
			if (!features.length) {
				return;
			}

			const feature = features[0];

			const popupContent = Vue.extend({
				template: '<button @click="popupClicked">Click Me!</button>',
				methods: {
					popupClicked() {
						alert('Popup Clicked!');
					},
				}
			});

			// Populate the popup and set its coordinates
			// based on the feature found.
			const popup = new mapboxgl.Popup()
				.setLngLat(feature.geometry.coordinates)
				.setHTML('<div id="vue-popup-content"></div>')
				.addTo(map);

			new popupContent().$mount('#vue-popup-content');
		}
	}
});
