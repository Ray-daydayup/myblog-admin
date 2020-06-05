import Vue from 'vue'
import Vuex from 'vuex'
import popupStore from './modules/popup'
import userStore from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    popup: popupStore,
    user: userStore
  }
})
