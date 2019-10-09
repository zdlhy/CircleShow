import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    saveUser (state, obj) {
      state.user = obj
    }
  },
  actions: {
    setUser (content, userMsg) {
      content.commit('saveUser', userMsg)
    }
  }
})
