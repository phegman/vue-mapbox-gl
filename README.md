# Mapbox GL JS Vue.js

A simple lightweight (9kb/3kb gzipped) Mapbox GL JS Vue component. Great for quick prototyping or smaller projects. For larger projects [VueMapbox](https://soal.github.io/vue-mapbox/) may be a better fit.

## [Demo](https://vue-mapbox-gl.peterhegman.com)

- [Installation](#installation)
- [Setup](#setup)
- [Props](#props)
- [Events](#map-events)
- [Plugins](#plugins)
- [Popups](#popups)
- [Development](#development)

## Installation

### Yarn

```bash
yarn add mapbox-gl-vue
```

### NPM

```bash
npm install mapbox-gl-vue --save
```

### [Vue CDN](https://vuejs.org/v2/guide/#Getting-Started)

Download latest `vue-mapbox-gl.min.js` from [https://github.com/phegman/vue-mapbox-gl/releases](https://github.com/phegman/vue-mapbox-gl/releases)

Include using a `<script>` tag

```html
<script src="vue-mapbox-gl.min.js"></script>
```

### Including Mapbox GL JS

This package does not include the Mapbox GL JS and CSS files. See Mapbox GL JS installation guide here: [https://www.mapbox.com/install/js/](https://www.mapbox.com/install/js/)

#### Importing Mapbox GL JS with Webpack

If you decide to include Mapbox GL JS by installing it with Yarn/NPM you should use [Shimming](https://webpack.js.org/guides/shimming/) for it to work correctly.

`webpack.config.js`

```js
const webpack = require('webpack')

plugins: [
  new webpack.ProvidePlugin({
    mapboxgl: 'mapbox-gl',
  }),
]
```

Projects setup with [Vue CLI 3](https://cli.vuejs.org/):

`vue.config.js`

```js
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl',
      }),
    ],
  },
}
```

## Setup

In the file you will be including the component:

```vue
<script>
import Mapbox from 'mapbox-gl-vue'

export default {
  components: { Mapbox },
}
</script>
```

In your template block:

```vue
<template>
  <div id="app">
    <mapbox
      access-token="your access token"
      :map-options="{
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-96, 37.8],
        zoom: 3,
      }"
    />
  </div>
</template>
```

#### CSS

CSS needs to be added for the map to show up. The `#map` container needs a height and a width. Example:

```vue
<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
```

## Props

Vue.js Documentation [https://vuejs.org/v2/guide/components.html#Props](https://vuejs.org/v2/guide/components.html#Props)

`access-token`  
 Type: `string`  
 Required: `true`

Your access token is required for Mapbox to work. It can be obtained in the Mapbox Studio dashboard

---

`map-options`  
 Type: [MapboxOptions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/ecb7a34d7a93504d556f3e281baa7e4d4080317e/types/mapbox-gl/index.d.ts#L252)  
 Required: `true`

Overview of available Mapbox options can be found here: [https://www.mapbox.com/mapbox-gl-js/api/#map](https://www.mapbox.com/mapbox-gl-js/api/#map)

`container` will default to `map` (giving the container an id of `map`). If you want to change this or use multiple map components on the same page simply set the `container` property.

---

`nav-control`  
 Type: [NavigationControlOptions](https://github.com/phegman/vue-mapbox-gl/blob/master/src/interfaces/navigation-control-options.interface.ts)  
 Required: `false`  
 Default: `{ show: true, position: 'top-right' }`

More information about navigation control here: [https://docs.mapbox.com/mapbox-gl-js/api/#navigationcontrol](https://docs.mapbox.com/mapbox-gl-js/api/#navigationcontrol)

---

`geolocate-control`  
 Type: [GeolocateControlOptions](https://github.com/phegman/vue-mapbox-gl/blob/master/src/interfaces/geolocate-control-options.interface.ts)  
 Required: `false`  
 Default: `{ show: false, position: 'top-left', options: {} }`

More information about geolocate control here: [https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol](https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol)

---

`scale-control`  
 Type: [ScaleControlOptions](https://github.com/phegman/vue-mapbox-gl/blob/master/src/interfaces/scale-control-options.interface.ts)  
 Required: `false`  
 Default: `{ show: false, position: 'top-left', options: {} }`

More information about scale control here: [https://docs.mapbox.com/mapbox-gl-js/api/#scalecontrol](https://docs.mapbox.com/mapbox-gl-js/api/#scalecontrol)

---

`fullscreen-control`  
 Type: [FullscreenControlOptions](https://github.com/phegman/vue-mapbox-gl/blob/master/src/interfaces/fullscreen-control-options.interface.ts)  
 Required: `false`  
 Default: `{ show: false, position: 'top-right' }`

More information about full screen control here: [https://docs.mapbox.com/mapbox-gl-js/api/#fullscreencontrol](https://docs.mapbox.com/mapbox-gl-js/api/#fullscreencontrol)

---

`attribution-control`  
 Type: [AttributionControlOptions](https://github.com/phegman/vue-mapbox-gl/blob/master/src/interfaces/attribution-control-options.interface.ts)  
 Required: `false`  
 Default: `{ show: false, position: 'top-right' }`

More information about full screen control here: [https://docs.mapbox.com/mapbox-gl-js/api/#attributioncontrol](https://docs.mapbox.com/mapbox-gl-js/api/#attributioncontrol)

#### Example

```vue
<template>
  <div id="app">
    <mapbox
      access-token="your access token"
      :map-options="{
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-96, 37.8],
        zoom: 3,
      }"
      :geolocate-control="{
        show: true,
        position: 'top-left',
      }"
      :scale-control="{
        show: true,
        position: 'top-left',
      }"
      :fullscreen-control="{
        show: true,
        position: 'top-left',
      }"
    />
  </div>
</template>
```

## Map Events

`@map-init` : This event is fired when the map is initialized. It can be used to integrate [plugins](https://docs.mapbox.com/mapbox-gl-js/plugins/).

All Mapbox GL JS events are available for use. List of events here: [https://docs.mapbox.com/mapbox-gl-js/api/#map.event:resize](https://docs.mapbox.com/mapbox-gl-js/api/#map.event:resize)

Map events can be used by adding the `@map-` prefix to the beginning of the Mapbox event name. For example for the `click` event `@map-click` can be used. All events are passed the mapboxgl [Map](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/ecb7a34d7a93504d556f3e281baa7e4d4080317e/types/mapbox-gl/index.d.ts#L60) instance as the first parameter and, if the event has one, the [MapboxEvent](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/ecb7a34d7a93504d556f3e281baa7e4d4080317e/types/mapbox-gl/index.d.ts#L1117) as the second parameter.

For events that support specifying a `layerId` as documented here [https://docs.mapbox.com/mapbox-gl-js/api/#map#on](https://docs.mapbox.com/mapbox-gl-js/api/#map#on) the `layerId` can be specified by using a colon to separate the event from the `layerId`. For example if you have a layer with an id of `points` the `click` event can be registered like so: `@map-click:points`

## Geolocation Events

Geolocation events are available for use by adding the `@geolocate-` prefix to the beginning of the Mapbox event name. A list of Geolocation events can be found here: [https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol.event:geolocate](https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol.event:geolocate)

#### Example

`App.vue`

```vue
<template>
  <div id="app">
    <mapbox
      access-token="your access token"
      :map-options="{
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-96, 37.8],
        zoom: 3,
      }"
      :geolocate-control="{
        show: true,
        position: 'top-left',
      }"
      @map-load="loaded"
      @map-zoomend="zoomend"
      @map-click:points="clicked"
      @geolocate-error="geolocateError"
      @geolocate-geolocate="geolocate"
    />
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'

export default {
  components: { Mapbox },
  methods: {
    loaded(map) {
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-77.03238901390978, 38.913188059745586],
                },
                properties: {
                  title: 'Mapbox DC',
                  icon: 'monument',
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-122.414, 37.776],
                },
                properties: {
                  title: 'Mapbox SF',
                  icon: 'harbor',
                },
              },
            ],
          },
        },
        layout: {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top',
        },
      })
    },
    zoomend(map, e) {
      console.log('Map zoomed')
    },
    clicked(map, e) {
      const title = e.features[0].properties.title
      console.log(title)
    },
    geolocateError(control, positionError) {
      console.log(positionError)
    },
    geolocate(control, position) {
      console.log(
        `User position: ${position.coords.latitude}, ${position.coords.longitude}`
      )
    },
  },
}
</script>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
```

## Plugins

Plugins ([https://www.mapbox.com/mapbox-gl-js/plugins/](https://www.mapbox.com/mapbox-gl-js/plugins/)) can be integrated using the `map-init` event that is fired when Mapbox is initialized. Below is an example:

```vue
<template>
  <div id="app">
    <mapbox
      access-token="your access token"
      :map-options="{
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-96, 37.8],
        zoom: 3,
      }"
      :geolocate-control="{
        show: true,
        position: 'top-left',
      }"
      :scale-control="{
        show: true,
        position: 'top-left',
      }"
      :fullscreen-control="{
        show: true,
        position: 'top-left',
      }"
      @map-init="mapInitialized"
    />
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'

export default {
  components: { Mapbox },
  methods: {
    initialized(map) {
      const Draw = new MapboxDraw()
      map.addControl(Draw)
    },
  },
}
</script>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
```

## Popups

Popups can be a bit tricky if you are trying to use Vue directives inside the popup content. This is because the popups are added to the DOM by Mapbox and not compiled by Vue. See below for one approach to solving this problem.

`App.vue`

```vue
<template>
  <div id="app">
    <mapbox
      access-token="your access token"
      :map-options="{
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-96, 37.8],
        zoom: 3,
      }"
      @map-load="loaded"
      @map-click:points="clicked"
      @map-mouseenter:points="mouseEntered"
      @map-mouseleave:points="mouseLeft"
    />
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import PopupContent from './PopupContent.vue'

export default {
  components: { Mapbox },
  methods: {
    loaded(map) {
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-77.03238901390978, 38.913188059745586],
                },
                properties: {
                  title: 'Mapbox DC',
                  icon: 'monument',
                },
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-122.414, 37.776],
                },
                properties: {
                  title: 'Mapbox SF',
                  icon: 'harbor',
                },
              },
            ],
          },
        },
        layout: {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top',
        },
      })
    },
    clicked(map, e) {
      if (e.features) {
        const coordinates = e.features[0].geometry.coordinates.slice()

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
          .setLngLat({ lng: coordinates[0], lat: coordinates[1] })
          .setHTML('<div id="vue-popup-content"></div>')
          .addTo(map)

        new PopupContent({
          propsData: { feature: e.features[0] },
        }).$mount('#vue-popup-content')
      }
    },
    mouseEntered(map) {
      map.getCanvas().style.cursor = 'pointer'
    },
    mouseLeft(map) {
      map.getCanvas().style.cursor = ''
    },
  },
}
</script>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
```

`PopupContent.vue`

```vue
<template>
  <div>
    <h3>{{ feature.properties.title }}</h3>
    <button @click="popupClicked">Learn more</button>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    feature: {
      required: true,
      type: Object,
    },
  },
  methods: {
    popupClicked() {
      alert('Learn more clicked')
    },
  },
})
</script>
```

## Development

### Install dependencies

```bash
yarn install
```

### Start development server

This will start a dev server with [HMR](https://webpack.js.org/guides/hot-module-replacement/) at `localhost:8080`.

```bash
ACCESS_TOKEN=yourAccessToken yarn dev
```

### Linting

Please make sure all your code passes linting before opening a PR.

```bash
yarn lint
```
