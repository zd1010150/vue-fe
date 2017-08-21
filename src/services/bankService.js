/**
 * 银行
 */
import   { fetchData }  from  './network/getData'

export default{
  /**
   * 向后端查询是否已经登录
   */
  async getBank(gateway){
    return fetchData('GET',"/deposit/bank-list/"+gateway)
  }
  
}
