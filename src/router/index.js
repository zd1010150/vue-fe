import Vue from 'vue'
import Router from 'vue-router'
import authRoter from './map/auth.js';
import indexRoter from './map/index.js';
import _ from "lodash";

Vue.use(Router)

let root = {
  path:"/",
  redirect:{ name:"login" }
};

export default new Router({
  routes : _.concat(authRoter,indexRoter,root)

})
