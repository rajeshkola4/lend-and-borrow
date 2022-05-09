import Vue from "vue";
import Vuex from "vuex";

import lbStore from './modules/lbStore'
import authStore from './modules/authStore'
Vue.use(Vuex);
const store = new Vuex.Store({
  modules:{
    lbStore:lbStore,
    authStore:authStore
  }
});
export default store;