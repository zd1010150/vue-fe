import _ from "lodash"
import Index from 'views/index'

import Dashboard from './dashboard'
import tradingAccountManagement from './tradingAccountManagement'
import FundManage from './fundManage'
import uiDemo from './uiDemo'
import training from './training'
import notice from './notice'
import downloadCenter from './downloadCenter'
import agentCenter from './agentCenter'
import event from './event'
export default [{
  path: "/",
  component: Index,
  meta: {
    requiresAuth: true
  }, 
  children: _.concat(Dashboard,tradingAccountManagement,uiDemo,training,FundManage,notice,downloadCenter,agentCenter,event)
}];
