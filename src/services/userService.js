import { fetchData } from './network/getData'

export default {
  async login (form) {
    return fetchData('POST', '/login', form)
  },
  async checkLogin () {
    return fetchData('GET', '/checkLogin')
  },
  async logout (id) {
    return fetchData('POST', '/logout')
  },
  async getUserInfo () {
    return fetchData('GET', '/user/me')
  },
  async syncProfile () {
    return fetchData('GET', '/profile/sync')
  },
  async fetchIfNeedVideoAuth () {
    return fetchData('GET', '/video_cert/need_to_be_certified')
  }
}
