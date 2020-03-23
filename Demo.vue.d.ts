import Vue from 'vue';
import { Map, MapLayerMouseEvent, GeolocateControl } from 'mapbox-gl';
export default class Demo extends Vue {
    readonly accessToken: string;
    initalized(map: Map): void;
    loaded(map: Map): void;
    clicked(map: Map, e: MapLayerMouseEvent): void;
    mouseEntered(map: Map): void;
    mouseLeft(map: Map): void;
    geolocateError(control: GeolocateControl, positionError: PositionError): void;
    geolocate(control: GeolocateControl, position: Position): void;
}
