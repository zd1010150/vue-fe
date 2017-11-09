import { fetchData } from './network/getData'

export default {
  /**
   * 向后端查询是否已经登录
   */
  async checkLogin () {
    return fetchData('GET', '/validate-token')
  }
}
