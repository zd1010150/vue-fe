import _ from "lodash"
import Index from 'views/index'

import Dashboard from './dashboard'
import myTradingAccount from './myTradingAccount'
import uiDemo from './uiDemo'

export default [{
  path: "/",
  component: Index,
  children: _.concat(Dashboard,myTradingAccount,uiDemo)
}];
