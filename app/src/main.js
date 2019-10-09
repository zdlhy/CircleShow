import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'src/assets/weui.min.css'
import axios from './request.js'

Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
