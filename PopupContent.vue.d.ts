import Vue from 'vue';
import { MapboxGeoJSONFeature } from 'mapbox-gl';
export default class PopupContent extends Vue {
    readonly feature: MapboxGeoJSONFeature;
    popupClicked(): void;
}
