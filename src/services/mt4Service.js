/**
 * MT4信息
 */
import   { fetchData }  from  './network/getData'

export default{
  
  async getMT4Account(id="",{type}={}){
    return fetchData('GET','/account/'+id,{type})
  },
  /**
   * 申请mt4账号
   * @param  {[type]} options.plat_form     [description]
   * @param  {[type]} options.account_type  [description]
   * @param  {[type]} options.lever         [description]
   * @param  {[type]} options.base_currency [description]
   * @param  {[type]} options.reason        [description]
   * @return {[type]}                       [description]
   */
  async applyMT4Account({plat_form,account_type,lever,base_currency,reason}){
  	return fetchData('POST','/account',{plat_form,account_type,lever,base_currency,reason})
  }

}
