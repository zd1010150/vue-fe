/**
 * Ticket
 */
import   { fetchData }  from  './network/getData'

export default{
  
  async getQuestionType(){
    return fetchData('GET','/tickets/')
  },
  
  async getTicketDetail(id){
  	return fetchData('GET','/tickets/display/'+id)
  },
  /**
   * 传入所有的accounts,然后{traderAccounts:[],agentAccounts:[]}
   * @param  {[type]} accounts [description]
   * @return {[type]}          [description]
   */
  async addTicket({subject,account_no,type,content,attachment}){
    return fetchData('POST','/tickets/save')
  },
  async modifyAccountLeverage(mt4Id,level){
    return fetchData('PUT','/account/'+mt4Id,{leverage:level})
  },
  async modifyAccountPWD(mt4Id){
    return fetchData('PUT','/account/'+mt4Id,{password:""})
  }

}
