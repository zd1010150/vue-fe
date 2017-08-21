import bankAccount from 'views/fundManagement/bankAccount/index'
import depositeFunds from 'views/fundManagement/depositeFunds/index'
import internalTransfer from 'views/fundManagement/internalTransfer/index'
import withdrawal from 'views/fundManagement/withdrawal/index'


export default [{
  path: "fund-manager/deposite-funds",
  component: depositeFunds,
  meta: {
    requiresAuth: true,
    pageTitle: "depositeFunds"
  }
}, {
  path: "fund-manager/bank-account",
  component: bankAccount,
  meta: {
    requiresAuth: true,
    pageTitle: "bankAccount"
  }
}, {
  path: "fund-manager/withdrawal",
  component: withdrawal,
  meta: {
    requiresAuth: true,
    pageTitle: "withdrawal"
  }
}, {
  path: "fund-manager/internal-transfer",
  component: internalTransfer,
  meta: {
    requiresAuth: true,
    pageTitle: "internalTransfer"
  }
}];
