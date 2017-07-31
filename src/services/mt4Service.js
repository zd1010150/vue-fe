/**
 * MT4信息
 */
import   { fetchData }  from  './network/getData'

export default{
  
  async getMT4Account(){
    return fetchData('GET',"/account")
  }

}
