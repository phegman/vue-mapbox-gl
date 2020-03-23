/// <reference types="mapbox-gl" />
declare global {
    const mapboxgl: typeof mapboxgl;
}
import Vue from 'vue';
import ScaleControlOptions from './interfaces/scale-control-options.interface';
import AttributionControl from './interfaces/attribution-control-options.interface';
import GeolocateControlOptions from './interfaces/geolocate-control-options.interface';
import NavigationControlOptions from './interfaces/navigation-control-options.interface';
import FullscreenControlOptions from './interfaces/navigation-control-options.interface';
export default class Mapbox extends Vue {
    readonly accessToken: string;
    readonly mapOptions: mapboxgl.MapboxOptions;
    readonly navControl: NavigationControlOptions;
    readonly geolocateControl: GeolocateControlOptions;
    readonly scaleControl: ScaleControlOptions;
    readonly fullscreenControl: FullscreenControlOptions;
    readonly attributionControl: AttributionControl;
    private map;
    mounted(): void;
    beforeDestroy(): void;
    mapInit(): mapboxgl.Map;
    registerMapEvents(map: mapboxgl.Map): void;
    addControls(map: mapboxgl.Map): void;
}
