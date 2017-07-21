import myTradingAccount from 'views/myTradingAccount/myTradingAccount'


export default [{
  path: "my-trading-account",
  component: myTradingAccount,
  meta: {
    requiresAuth: true
  }
}];
