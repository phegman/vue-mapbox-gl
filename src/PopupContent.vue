<template>
  <div>
    <h3>{{ feature.properties.title }}</h3>
    <button @click="popupClicked">Learn more</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { MapboxGeoJSONFeature } from 'mapbox-gl'

@Component
export default class PopupContent extends Vue {
  @Prop({ required: true }) readonly feature: MapboxGeoJSONFeature

  popupClicked() {
    alert('Learn more clicked')
  }
}
</script>
