// Import vue component
import Vue from 'vue'
import Mapbox from './Mapbox.vue'
import { VueConstructor } from 'vue'

declare global {
  interface Window {
    Vue?: VueConstructor<Vue>
  }

  interface InstallFunc {
    (Vue: VueConstructor): void
    installed?: boolean
  }
}

// Declare install function executed by Vue.use()
let install: InstallFunc
install = function(Vue: VueConstructor): void {
  if (install.installed) return
  install.installed = true
  Vue.component('Mapbox', Mapbox)
}

// Create module definition for Vue.use()
const plugin = {
  install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default Mapbox
