<template>
  <div
    :id="
      Object.prototype.hasOwnProperty.call(mapOptions, 'container')
        ? mapOptions.container
        : 'map'
    "
  ></div>
</template>

<script lang="ts">
declare global {
  const mapboxgl: typeof mapboxgl
}

import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

import ScaleControlOptions from './interfaces/scale-control-options.interface'
import AttributionControl from './interfaces/attribution-control-options.interface'
import GeolocateControlOptions from './interfaces/geolocate-control-options.interface'
import NavigationControlOptions from './interfaces/navigation-control-options.interface'
import FullscreenControlOptions from './interfaces/navigation-control-options.interface'

@Component
export default class Mapbox extends Vue {
  @Prop({ required: true }) readonly accessToken: string
  @Prop({ required: true }) readonly mapOptions: mapboxgl.MapboxOptions
  @Prop({
    default: () => {
      return {
        show: true,
        position: 'top-right',
        options: {},
      }
    },
  })
  readonly navControl!: NavigationControlOptions

  @Prop({
    default: () => {
      return {
        show: false,
        position: 'top-left',
        options: {},
      }
    },
  })
  readonly geolocateControl!: GeolocateControlOptions

  @Prop({
    default: () => {
      return {
        show: false,
        position: 'top-left',
        options: {},
      }
    },
  })
  readonly scaleControl!: ScaleControlOptions

  @Prop({
    default: () => {
      return {
        show: false,
        position: 'top-right',
        options: {},
      }
    },
  })
  readonly fullscreenControl!: FullscreenControlOptions

  @Prop({
    default: () => {
      return {
        show: false,
        position: 'top-right',
        options: {},
      }
    },
  })
  readonly attributionControl!: AttributionControl

  private map!: mapboxgl.Map

  mounted(): void {
    // Initialze Map
    this.map = this.mapInit()

    // Add Controls to map
    this.addControls(this.map)

    // Register Map Events
    this.registerMapEvents(this.map)
  }

  beforeDestroy(): void {
    this.map.remove()
  }

  @Emit()
  mapInit(): mapboxgl.Map {
    mapboxgl.accessToken = this.accessToken

    // Add container to options object
    if (!Object.prototype.hasOwnProperty.call(this.mapOptions, 'container')) {
      this.mapOptions.container = 'map'
    }

    // New Mapbox Instance
    const map = new mapboxgl.Map(this.mapOptions)

    return map
  }

  registerMapEvents(map: mapboxgl.Map): void {
    const availableEvents: string[] = [
      'error',
      'load',
      'remove',
      'render',
      'resize',
      'webglcontextlost',
      'webglcontextrestored',
      'dataloading',
      'data',
      'tiledataloading',
      'sourcedataloading',
      'styledataloading',
      'sourcedata',
      'styledata',
      'boxzoomcancel',
      'boxzoomstart',
      'boxzoomend',
      'touchcancel',
      'touchmove',
      'touchend',
      'touchstart',
      'click',
      'contextmenu',
      'dblclick',
      'mousemove',
      'mouseup',
      'mousedown',
      'mouseout',
      'mouseover',
      'mouseenter',
      'mouseleave',
      'movestart',
      'move',
      'moveend',
      'zoomstart',
      'zoom',
      'zoomend',
      'rotatestart',
      'rotate',
      'rotateend',
      'dragstart',
      'drag',
      'dragend',
      'pitchstart',
      'pitch',
      'pitchend',
      'wheel',
    ]

    const availableEventsWithLayerSupport: string[] = [
      'touchcancel',
      'touchend',
      'touchstart',
      'click',
      'contextmenu',
      'dblclick',
      'mousemove',
      'mouseup',
      'mousedown',
      'mouseout',
      'mouseover',
      'mouseenter',
      'mouseleave',
    ]

    if (Object.keys(this.$listeners).length) {
      for (const eventType in this.$listeners) {
        const [parsedEventType, layerId] = eventType
          .replace(/^map-/, '')
          .split(':')
        if (availableEvents.indexOf(parsedEventType) > -1) {
          if (
            layerId &&
            availableEventsWithLayerSupport.indexOf(parsedEventType) > -1
          ) {
            map.on(
              parsedEventType as keyof mapboxgl.MapLayerEventType,
              layerId,
              event => {
                this.$emit(eventType, map, event)
              }
            )
          } else {
            map.on(parsedEventType, event => {
              this.$emit(eventType, map, event)
            })
          }
        }
      }
    }
  }

  addControls(map: mapboxgl.Map): void {
    // Nav Control
    if (this.navControl.show) {
      const nav = new mapboxgl.NavigationControl(this.navControl.options)
      map.addControl(nav, this.navControl.position)
    }

    // Geolocation Control
    if (this.geolocateControl.show) {
      const geolocate = new mapboxgl.GeolocateControl(
        this.geolocateControl.options
      )
      map.addControl(geolocate, this.geolocateControl.position)

      const availableEvents: string[] = [
        'error',
        'trackuserlocationstart',
        'trackuserlocationend',
        'geolocate',
      ]

      if (Object.keys(this.$listeners).length) {
        for (const eventType in this.$listeners) {
          const parsedEventType = eventType.replace(/^geolocate-/, '')
          if (availableEvents.indexOf(parsedEventType) > -1) {
            geolocate.on(parsedEventType, (position?: Position) => {
              if (position) {
                this.$emit(eventType, geolocate, position)
              } else {
                this.$emit(eventType, geolocate)
              }
            })
          }
        }
      }
    }

    // Scale Control
    if (this.scaleControl.show) {
      const scale = new mapboxgl.ScaleControl(this.scaleControl.options)
      map.addControl(scale, this.scaleControl.position)
    }

    // Fullscreen Control
    if (this.fullscreenControl.show) {
      const fullscreen = new mapboxgl.FullscreenControl()
      map.addControl(fullscreen, this.fullscreenControl.position)
    }
  }
}
</script>
