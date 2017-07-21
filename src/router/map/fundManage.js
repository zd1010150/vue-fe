import bankAccount from 'views/fundManagement/bankAccount'
import depositeFunds from 'views/fundManagement/depositeFunds/index'
import internalTransfer from 'views/fundManagement/internalTransfer'
import withdrawal from 'views/fundManagement/withdrawal'


export default [{
  path: "fund-manager/deposite-funds",
  component: depositeFunds,
  meta: {
    requiresAuth: true
  }
}, {
  path: "fund-manager/bank-account",
  component: bankAccount,
  meta: {
    requiresAuth: true
  }
}, {
  path: "fund-manager/withdrawal",
  component: withdrawal,
  meta: {
    requiresAuth: true
  }
}, {
  path: "fund-manager/internal-transfer",
  component: internalTransfer,
  meta: {
    requiresAuth: true
  }
}];
