import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './functions/camera'
import './functions/functions'

window.eventbus = new Vue()
Vue.prototype.$eventbus = window.eventbus
Vue.config.productionTip = false
window.Application = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.router = window.Application.$router
if (typeof mp !== 'undefined') {
  mp.events.add('ChangeStateRouter', (page) => {
    if (window.router.currentRoute.path == page) return
    window.router.push(page)
  })
}
