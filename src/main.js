import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'


import users from './mixins/users.mixin';

Vue.config.productionTip = false

Vue.mixin(users);
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3bkMNMlGi4Mf7TvE_lclxqteV5mcCSOk",
  authDomain: "lendandborrow-c664c.firebaseapp.com",
  projectId: "lendandborrow-c664c",
  storageBucket: "lendandborrow-c664c.appspot.com",
  messagingSenderId: "571992026748",
  appId: "1:571992026748:web:761bc98ace362d9253a3f9",
  measurementId: "G-X5CDL6RSNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
