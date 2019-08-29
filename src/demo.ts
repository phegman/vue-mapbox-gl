import Vue from 'vue'
import Demo from './Demo.vue'

new Vue({
  render: h => h(Demo, { props: { accessToken: process.env.ACCESS_TOKEN } }),
}).$mount('#app')
