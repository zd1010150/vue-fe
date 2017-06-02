import Vue from 'vue'
import Router from 'vue-router'
import authRoter from './map/auth'
import indexRoter from './map/index'
import _ from "lodash"
import roterhook from './hooks/index'
Vue.use(Router)

let router = new Router({
  suppressTransitionError:__PRO__
});
let root = {
  path:"/",
  redirect:{ name:"login" }
};

router.addRoutes(_.concat(authRoter,indexRoter,root));

roterhook(router);


export default router;
