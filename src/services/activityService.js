/**
 * 活动信息
 */
import   { fetchData }  from  './network/getData'

export default{
  /**
   * 获取代理等级活动
   * @param  {[type]} options.type:'all' [description]
   * @param  {[type]} options.agentId:'' [description]
   * @return {[type]}                    [description]
   */
  async getAgentLevelActivity({type='all',agentId=''}){
    return fetchData('GET','/activity/agent-level',{type,agentId})
  },
  /**
   * 代理领奖
   */
  async agentAward({type='all',agentId=''}){
    return fetchData('POST','/activity/agent-level/award',{type,agentId})
  },
   /**
   * 获取交易账号等级活动
   * @param  {[type]} options.type:'all' [description]
   * @param  {[type]} options.agentId:'' [description]
   * @return {[type]}                    [description]
   */
  async getTraderLevelActivity({type='all'}){
    return fetchData('GET','/activity/trader-level',{type})
  },
  /**
   * 交易账号领奖
   */
  async traderAward({type='all'}){
    return fetchData('POST','/activity/trader-level/award',{type})
  },
  /**
   * 获取交易者等级活动条款
   */
  async getTraderLevelActivityTerms(language){
    return fetchData('GET','/activity/trader-level/terms/'+language)
  },
  /**
   * 获取代理等级活动条款
   */
  async getAgentLevelActivityTerms(language){
    return fetchData('GET','/activity/agent-level/terms/'+language)
  }

}
