import Vue from 'vue';
import Mapbox from './Mapbox.vue';
import { VueConstructor } from 'vue';
declare global {
    interface Window {
        Vue?: VueConstructor<Vue>;
    }
    interface InstallFunc {
        (Vue: VueConstructor): void;
        installed?: boolean;
    }
}
export default Mapbox;
