/**
 * 入金和出金，内转，相关方法
 */
import { fetchData } from './network/getData'

export default {
  /**
   * 内转
   */
  async internalTransferDeposite ({origin_login, target_login, money}) {
    return fetchData('POST', '/internal-transfer', {origin_login, target_login, money})
  },
  /**
   * 根据语言，获取支付方式
   */
  async getDepositeMethod (language) {
    return fetchData('GET', '/deposit/method/' + language)
  },
  /**
   * 获取转账信息
   * @return {[type]} [description]
   */
  async getBanktransferInfo (currency) {
    return fetchData('GET', '/deposit/bank-transfer/info', {pay_currency: currency})
  },
  /**
   * 根据语言，获取出金方式
   */
  async getWithdrawMethod (language) {
    return fetchData('GET', '/withdraw/method/' + language)
  },
  /**
   * 出金
   */
  async withdrawal ({mt4_id, order_amount, bank_code, method}) {
    return fetchData('POST', '/withdraw', {mt4_id, order_amount, bank_code, method})
  },
  async getCreditcardRange (mt4Id) {
    return fetchData('GET', '/withdraw/credit/limit/' + mt4Id)
  },
  async getSkrillWithdrawalRange (mt4Id) {
    return fetchData('GET', '/withdraw/skrill/limit/' + mt4Id)
  }

}
