// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store, eventBus} from './store/store'
import VueMaterial from 'vue-material'
import Vuex from 'vuex'


import 'vue-material/dist/vue-material.css'
import 'font-awesome/scss/font-awesome.scss'
import 'ionicons/dist/scss/ionicons.scss'

Vue.use(VueMaterial)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.material.registerTheme({
  default: {
    primary: {
      color: 'blue',
      hue: 900
    },
    accent: 'orange',
    warn: 'red',
    background: 'white'
  },
  cxLogin: {
    primary: {
      color: 'orange',
      hue:500,
      textColor: 'white' // text will be black
    },
    accent: 'orange',
    warn: 'red',
    background: {
      color: 'blue',
      hue: 800
    }
  }
  
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})