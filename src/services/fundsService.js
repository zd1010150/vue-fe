/**
 * 入金和出金，内转，相关方法
 */
import   { fetchData }  from  './network/getData'

export default{
  /**
   * 内转
   */
  async internalTransferDeposite({origin_login,target_login,money}){
    return fetchData('POST',"/internal-transfer",{origin_login,target_login,money});
  },
  /**
   * 根据语言，获取支付方式
   */
  async getDepositeMethod(language){
  	return fetchData('GET',"/deposit/method/"+language)
  }

}
