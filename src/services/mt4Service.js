/**
 * MT4信息
 */
import   { fetchData }  from  './network/getData'
import dataTableService from './dataTableService'
export default{

  async getMT4Account(type="all"){
    return fetchData('GET','/account/'+type+"/index")
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
  },
  /**
   * 传入所有的accounts,然后{traderAccounts:[],agentAccounts:[]}
   * @param  {[type]} accounts [description]
   * @return {[type]}          [description]
   */
  filterAccounts(accounts){
    let result = {traderAccounts:[],agentAccounts:[]}
    accounts.forEach((account)=>{
      if(account.account_type == "Agent"){
        result.agentAccounts.push(account)
      }else{
        result.traderAccounts.push(account)
      }
    })
    return result;
  },
  async modifyAccountLeverage(mt4Id,level){
    return fetchData('PUT','/account/'+mt4Id,{leverage:level})
  },
  async modifyAccountPWD(mt4Id){
    return fetchData('PUT','/account/'+mt4Id,{password:"reset"})
  },
  //申请代理子账户
  async applyAffiliate({exp,exp_company,one_month_new_acc,per_month_trading_volume,avg_deposit,exp_comment,service_comment}){
    return fetchData('POST','/affiliate/apply',{exp,exp_company,one_month_new_acc,per_month_trading_volume,avg_deposit,exp_comment,service_comment})
  },
  async getAffiliateList(agentId,{keywords,start_date,end_date},pageSize,pageIndex,sort){
    let url = '/agent/clientlist/clients'
    return dataTableService.pagingQuery({url,pageSize,pageIndex,sort,queryParameter:{mt4_id:agentId,keywords,start_date,end_date}})
  }

}
