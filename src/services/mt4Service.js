/**
 * MT4信息
 */
import   { fetchData }  from  './network/getData'

export default{
  /**
   * 向后端查询是否已经登录
   */
  async getMT4Account(){
    return fetchData('GET',"/account")
  }

}
