/* eslint-disable camelcase */
/**
 * 历史记录查询接口
 */
/**
 * 入金和出金，内转，相关方法
 */
import { fetchData } from './network/getData'

export default {
  /**
   * 根据语言，获取支付方式
   */
  async getDepositeMethod (language) {
    return fetchData('GET', '/' + '/' + language)
  }

}
