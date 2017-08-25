/**
 * MT4信息
 */
import   { fetchData }  from  './network/getData'

export default{
  /**
   * mt4   账号的交易量统计
   * @param  {[type]} mt4Id      [description]
   * @param  {[type]} start_date [description]
   * @param  {[type]} end_date   [description]
   * @return {[type]}            [description]
   */
  async getVolumeStatistics(mt4Id,start_date,end_date){
    return fetchData('GET','/mt4/statistics',{mt4_id:mt4Id,start_date,end_date})
  },
  /**
   * mt4 代理账号的总用户余额统计，总用户数统计
   */
  async getAgentTotalClientsAndBalance(mt4Id){
  	return fetchData('GET','/account/totalinfo/'+mt4Id)
  }

}
