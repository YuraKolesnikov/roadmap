import Vue from 'vue'
import App from './App.vue'
import JsonExcel from 'vue-json-excel'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.component('downloadExcel', JsonExcel)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
