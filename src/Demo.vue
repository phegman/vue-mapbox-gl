<template>
  <mapbox
    :access-token="accessToken"
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
    @map-load="loaded"
    @map-init="initalized"
    @map-click:points="clicked"
    @map-mouseenter:points="mouseEntered"
    @map-mouseleave:points="mouseLeft"
    @geolocate-error="geolocateError"
    @geolocate-geolocate="geolocate"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Point } from 'geojson'
import mapboxgl from 'mapbox-gl'
import Mapbox from './Mapbox.vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import PopupContent from './PopupContent.vue'
// @ts-ignore TypeScript definitions for mapbox-gl-draw not yet available
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
import { Map, MapLayerMouseEvent, GeolocateControl } from 'mapbox-gl'

@Component({
  components: { Mapbox },
})
export default class Demo extends Vue {
  @Prop({ required: true }) readonly accessToken: string

  initalized(map: Map): void {
    console.log('Map Initalized')

    const Draw = new MapboxDraw()
    map.addControl(Draw, 'top-right')
  }

  loaded(map: Map): void {
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
  }

  clicked(map: Map, e: MapLayerMouseEvent): void {
    if (e.features) {
      const coordinates = (e.features[0].geometry as Point).coordinates.slice()

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

      new PopupContent({ propsData: { feature: e.features[0] } }).$mount(
        '#vue-popup-content'
      )
    }
  }

  mouseEntered(map: Map): void {
    map.getCanvas().style.cursor = 'pointer'
  }

  mouseLeft(map: Map): void {
    map.getCanvas().style.cursor = ''
  }

  geolocateError(control: GeolocateControl, positionError: PositionError) {
    console.log(positionError)
  }

  geolocate(control: GeolocateControl, position: Position): void {
    console.log(
      `User position: ${position.coords.latitude}, ${position.coords.longitude}`
    )
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
