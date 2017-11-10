/**
 * 页面的后台处理服务接口
 */
import { fetchData } from './network/getData'

export default {
  async fetchPending (language) {
    return fetchData('GET', '/ajax/fetchpendings', {language})
  },
  async detectIP () {
    return fetchData('GET', '/ip-check')
  }
}
