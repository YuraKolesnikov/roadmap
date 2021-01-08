import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'
import messages from './modules/messages'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    messages,
    user
  },
  plugins: [
    VuexPersistedState()
  ]
})
