// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import AlertComp from './pubComps/alert/index.js'

// BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import config from './common/config.js'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.mixin({
  methods: {
    showAlert (opts) {
      return new AlertComp(opts)
    },
    _config () {
      return config
    },
    _setTitle (name) {
      document.title = name
    }
  },
  created () {
    window.vm = this
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
