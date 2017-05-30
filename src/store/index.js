import Vue from 'vue'
import Vuex from "vuex"

import state from "./state"
import getter from "./getters"
import mutation from "./mutation"
import action from "./action"

Vue.use(Vuex)

export  default new Vuex.store({
  state,
  getter,
  mutation,
  action
});
