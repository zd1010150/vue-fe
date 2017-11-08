/**
 * 配置信息
 */
import { fetchData } from './network/getData'

export default {
  /**
   * 向后端查询是否已经登录
   */
  async getConfigByKey ({fields}) {
    return fetchData('GET', '/setting', fields)
  },
  mapLeverage (level) {
    return level && level.length > 0 && level.split('|').map((le) => {
      return {
        val: le,
        title: le + ':1'
      }
    })
  }

}
