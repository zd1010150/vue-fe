/* eslint-disable camelcase */
import { fetchData } from './network/getData'

export default {
  async subscribe ({active_trader = 0, active_agent = 0, dormant_trader = 0, dormant_agent = 0}) {
    return fetchData('POST', '/email/subscribe-toggle', {active_trader, active_agent, dormant_trader, dormant_agent})
  },
  async getCorporate () {
    return fetchData('GET', '/profile/company')
  },
  async getEmailSubscribeStatus () {
    return fetchData('GET', '/setting/email')
  }
}
