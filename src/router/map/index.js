import _ from "lodash"
import Index from 'views/index'

import Dashboard from './dashboard'
import myTradingAccount from './myTradingAccount'
import FundManage from './fundManage'
import uiDemo from './uiDemo'
import training from './training'
import notice from './notice'
export default [{
  path: "/",
  component: Index,
  meta: {
    requiresAuth: true
  }, 
  children: _.concat(Dashboard,myTradingAccount,uiDemo,training,FundManage,notice)
}];
