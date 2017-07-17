import bankAccount from 'views/myTradingAccount/bankAccount'
import depositeFunds from 'views/myTradingAccount/depositeFunds'
import internalTransfer from 'views/myTradingAccount/internalTransfer'
import withdrawal from 'views/myTradingAccount/withdrawal'


export default [{
  path: "/my-trading-account",
  children: [{
    path: "bank-account",

    component: bankAccount,
    meta: {
      requiresAuth: false
    }
  }, {
    path: "deposite-funds",

    component: depositeFunds,
    meta: {
      requiresAuth: false
    }
  }, {
    path: "withdrawal",
    component: withdrawal,
    meta: {
      requiresAuth: false
    }
  }, {
    path: "internal-transfer",
    component: internalTransfer,
    meta: {
      requiresAuth: false
    }
  }]
}];
