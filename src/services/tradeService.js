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
  },
  /**
   * 代理账号的新用户和有效用户折线图
   */
  async getAccountsAndActiveClient({mt4_id,start_date='',end_date=''}){
    return fetchData('GET','/agent/clients/cumulative',{mt4_id,start_date,end_date})
  },
  /**
   * 有效账户和所有账户的比例饼图
   */
  async getPercentageActiveClient({mt4_id,start_date='',end_date=''}){
    return fetchData('GET','/agent/clients/activation',{mt4_id,start_date,end_date})
  },
  /**
   * 代理有效账户和净入金折线图和区域图
   */
  async getActiveAndNetDeposite({mt4_id,start_date='',end_date=''}){
    return fetchData('GET','/agent/clients/contribution',{mt4_id,start_date,end_date})
  },
  /**
   * 代理的出入金折线图
   */
  async getWithdrawalAndDeposit({mt4_id,start_date='',end_date=''}){
    return fetchData('GET','/agent/treasury/transations',{mt4_id,start_date,end_date})
  },
  /**
   * 代理的佣金折线图
   */
  async getCommission({mt4_id,start_date='',end_date=''}){
    return fetchData('GET','/agent/treasury/commissioins',{mt4_id,start_date,end_date})
  },
  /**
   * 交易各项产品手数每天的折线图
   */
  async getDailyAndTotalVolume({mt4_id,start_date='',end_date=''}){
    return fetchData('GET','/agent/volume/daily',{mt4_id,start_date,end_date})
  },
   /**
   * 交易各项产品手数饼图
   */
  async getPeriodVolume({mt4_id,start_date='',end_date=''}){
    return fetchData('GET','/agent/volume/period',{mt4_id,start_date,end_date})
  },
   /**
   * 交易各项产品者交易量贡献值柱状图
   */
  async getAverageVolume({mt4_id,start_date='',end_date=''}){
    return fetchData('GET','/agent/volume/average',{mt4_id,start_date,end_date})
  },
}
