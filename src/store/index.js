import Vue from 'vue'
import Vuex from "vuex"

import state from "./state"
import getters from "./getters"
import mutations from "./mutation"
import actions from "./action"

Vue.use(Vuex)


export  default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
