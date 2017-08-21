/**
 * MT4信息
 */
import   { fetchData }  from  './network/getData'

export default{
  
  async getVolumeStatistics(mt4Id,start_date,end_date){
    return fetchData('GET','/mt4/statics',{mt4_id:mt4Id,start_date,end_date})
  }

}
