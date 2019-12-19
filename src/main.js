import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { store, initStore } from './store/index'
import './plugins'
import * as filters from './filters'
import './assets/styles/index.scss'
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'
Vue.config.productionTip = false
Vue.config.devtools = true
/* 定义全局过滤器 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  Blob,
  Export2Excel,
  router,
  store,
  render: h => h(App),
  created () {
    initStore()
  }
}).$mount('#app')
