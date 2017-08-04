import Vue from 'vue'
import Router from 'vue-router'
import authRoter from './map/auth'
import errorRouter from './map/error'
import myTrandingAccountRouter from './map/myTradingAccount'


import roterhook from './hooks/index'
Vue.use(Router)

let router = new Router({
  suppressTransitionError:__PRO__
});

router.addRoutes(_.concat(authRoter,errorRouter));

roterhook(router);


export default router;
