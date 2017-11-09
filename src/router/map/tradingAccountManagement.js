import myTradingAccount from 'views/tradingAccountManagement/myTradingAccount/index'
import applicationSubAccount from 'views/tradingAccountManagement/applicationSubAccount/index'

export default [{
  path: 'account-management/application-sub-account',
  component: applicationSubAccount,
  meta: {
    requiresAuth: true,
    pageTitle: 'applicationSubAccount'
  }
}, {
  path: 'account-management/my-trading-account',
  component: myTradingAccount,
  meta: {
    requiresAuth: true,
    pageTitle: 'myTradingAccount'
  }
}]
