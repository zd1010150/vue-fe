import Vue from 'vue'
import Router from 'vue-router'
import authRoter from './map/auth'
import indexRoter from './map/index'
import uiDemoRouter from './map/uiDemo'
import myTrandingAccountRouter from './map/myTradingAccount'
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

router.addRoutes(_.concat(authRoter,indexRoter,root,uiDemoRouter,myTrandingAccountRouter));

roterhook(router);


export default router;
