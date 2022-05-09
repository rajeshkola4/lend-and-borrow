import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'


import users from './mixins/users.mixin';

Vue.config.productionTip = false

Vue.mixin(users);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
