
/**
 * 页面的后台处理服务接口
 */
import   { fetchData }  from  './network/getData'
export default{
  async fetchPending(){
    return fetchData('GET','/ajax/fetchpendings')
  },
  async detectIP(){
  	return fetchData('GET','/ip-check')
  }
}