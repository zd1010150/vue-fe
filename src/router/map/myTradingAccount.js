import bankAccount from 'views/myTradingAccount/bankAccount'
import depositeFunds from 'views/myTradingAccount/depositeFunds'
import internalTransfer from 'views/myTradingAccount/internalTransfer'
import withdrawal from 'views/myTradingAccount/withdrawal'


export default [{
  path: "my-trading-account/deposite-funds",
  component: depositeFunds,
  meta: {
    requiresAuth: true
  }
}, {
  path: "my-trading-account/bank-account",
  component: bankAccount,
  meta: {
    requiresAuth: true
  }
}, {
  path: "my-trading-account/withdrawal",
  component: withdrawal,
  meta: {
    requiresAuth: true
  }
}, {
  path: "my-trading-account/internal-transfer",
  component: internalTransfer,
  meta: {
    requiresAuth: true
  }
}];
