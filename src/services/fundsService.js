/**
 * 入金和出金，内转，相关方法
 */
import   { fetchData }  from  './network/getData'

export default{
  /**
   * 存入资金
   */
  async depositeFunds({mt4_id, order_amount,bank_code="",fasa_account=""}){
    return fetchData('POST',"/deposit",{mt4_id, order_amount,bank_code,fasa_account});
  },
  /**
   * 根据语言，获取支付方式
   */
  async getDepositeMethod(language){
  	return fetchData('GET',"/"+"/"+language)
  }

}
