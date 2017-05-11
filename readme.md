# Mapbox GL JS Vue.js

A Vue.js Mapbox component.  

## Installation

### NPM

```js
npm install mapbox-gl-vue --save
```

## Usage

* [Setup](#setup)
* [Props](#props)
* [Events](#events)
* [Popups](#popups)

### Setup
This package does not include the Mapbox GL JS and CSS files. They need to be included in the `<head>` of your HTML file. See Mapbox GL quickstart guide here: [https://www.mapbox.com/mapbox-gl-js/api/](https://www.mapbox.com/mapbox-gl-js/api/)

In your main js file:

```js
import Mapbox from 'mapbox-gl-vue';
const app = new Vue({
    el: '#app',
    components: {
        'mapbox': Mapbox
    },
]);
```
In your HTML file:

```html
<!-- #app -->
<div id="app">
	<mapbox></mapbox>
</div>
```

#### Vueify
If you are using [Vueify](https://github.com/vuejs/vueify) in your build script the Mapbox component can be included as follows: 

```js
Vue.component('mapbox', require('mapbox-gl-vue/src/components/Mapbox.vue'));
const app = new Vue({
    el: '#app'
]);
```

#### CSS
CSS needs to be added for the map to show up. The `#map` container needs a height and a width. Example:

```css
#map {
	width: 100%;
	height: 500px;
}
```

### Props

Vue.js Documentation [https://vuejs.org/v2/guide/components.html#Props](https://vuejs.org/v2/guide/components.html#Props)

`access-token`  
	Type: `String`  
	Required: `True`

Your access token is required for Mapbox to work. It can be obtained in the Mapbox Studio dashboard

---

`map-options`  
	Type: `Object`  
	Required: `True`

Overview of available Mapbox options can be found here: [https://www.mapbox.com/mapbox-gl-js/api/#map](https://www.mapbox.com/mapbox-gl-js/api/#map)

---

`nav-control`  
	Type: `Object`  
	Required: `False`  
	Default: ```{
		show: true,
		position: 'top-right'
	}```

More information about navigation control here: [https://www.mapbox.com/mapbox-gl-js/api/#navigationcontrol](https://www.mapbox.com/mapbox-gl-js/api/#navigationcontrol)

---

`geolocate-control`  
	Type: `Object`  
	Required: `False`  
	Default: ```{
		show: false,
		position: 'top-left',
		options: {}
	}```

More information about geolocate control here: [https://www.mapbox.com/mapbox-gl-js/api/#geolocatecontrol](https://www.mapbox.com/mapbox-gl-js/api/#geolocatecontrol)

---

`scale-control`  
	Type: `Object`  
	Required: `False`  
	Default: ```{
		show: false,
		position: 'top-left',
		options: {}
	}```

More information about scale control here: [https://www.mapbox.com/mapbox-gl-js/api/#scalecontrol](https://www.mapbox.com/mapbox-gl-js/api/#scalecontrol)

---

`fullscreen-control`  
	Type: `Object`  
	Required: `False`  
	Default: ```{
		show: false,
		position: 'top-right'
	}```

More information about full screen control here: [https://www.mapbox.com/mapbox-gl-js/api/#fullscreencontrol](https://www.mapbox.com/mapbox-gl-js/api/#fullscreencontrol)

#### Example
```vue
<mapbox 
access-token="your access token"
:map-options="{
	style: 'mapbox://styles/mapbox/light-v9',
	center: [-96, 37.8],
	zoom: 3
}"
:geolocate-control="{
	show: true, 
	position: 'top-left'
}"
:scale-control="{
	show: true,
	position: 'top-left'
}"
:fullscreen-control="{
	show: true,
	position: 'top-left'
}">
</mapbox>
```

### Events

All Mapbox GL events are available for use. For a list of events look here: [https://www.mapbox.com/mapbox-gl-js/api/#map.event:resize](https://www.mapbox.com/mapbox-gl-js/api/#map.event:resize)

Events can be used by prepending `map-` to the beginning of the Mapbox event. For example for the Mapbox `click` event `@map-click` can be used.

All events are passed the `map` object and the event if it has one.

Example: 

HTML File:
```html
<!-- #app -->
<div id="app">
	<mapbox
		@map-load="mapLoaded"
		@map-click="mapClicked"
	>
	</mapbox>
</div>
```

Main js file:

```js
const app = new Vue({
    el: '#app',
    components: {
        'mapbox': Mapbox
    },
    methods: {
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
            alert('Map Clicked!');
        },
    }
]);
```

### Popups

Popups can be a little tricky if you are trying to use Vue directives inside the popup content. This is because the popups are added to the DOM by Mapbox and not compiled by Vue. To get around this you can use extend Vue to create a new Component and then mount that to the popup. Below is an example:

Main js file:

```js
const app = new Vue({
    el: '#app',
    methods: {
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
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['points']
            });
            map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
        },
        addPopUp(map, e) {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['points']
            });
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
```

## Support

Please [open an issue](https://github.com/phegman/mapbox-gl-vue.js/issues) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/phegman/mapbox-gl-vue.js/compare).
