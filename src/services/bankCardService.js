/**
 * 银行卡
 */
import   { fetchData }  from  './network/getData'

export default{
  /**
   * 向后端查询是否已经登录
   */
  async getBankCard(){
    return fetchData('GET',"/bank-card")
  },
  async deleteBankCard(id){
  	return fetchData('DELETE',"/bank-card/"+id)
  }
  
}
