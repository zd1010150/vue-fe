/**
 * MT4信息
 */
import { fetchData } from './network/getData'

export default {

  async getOnlineTraining (language) {
    return fetchData('GET', '/training/courses', {language})
  },
  async registerOnlineTraining (courseId) {
    return fetchData('GET', '/training/courses/register/' + courseId)
  },
  async cancelOnlineTraining (courseId) {
    return fetchData('GET', '/training/courses/cancel/' + courseId)
  },
  async getVideo (language) {
    return fetchData('GET', '/training/videos', {language})
  },
  async getCategoryVideo (language, category = '', page, pageSize) {
    return fetchData('GET', '/training/videos', {language, category, page, pageSize})
  },
  async getSingleVideo (id) {
    return fetchData('GET', '/training/videos/display/' + id)
  },
  async statisticsBook (id) {
    return fetchData('GET', '/training/books/display/' + id)
  },
  async getBook (language) {
    return fetchData('GET', '/training/books/', {language})
  },
  async getCategoryBook (language, category = '') {
    return fetchData('GET', '/training/books/', {language, category})
  }

}
