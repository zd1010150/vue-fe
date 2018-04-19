/**
 * 银行卡
 */
import { fetchData } from './network/getData'

export default {
  async getCreditCardCount () {
    return fetchData('GET', '/bank-card/credit/count')
  },
  async getBankCard () {
    return fetchData('GET', '/bank-card')
  },
  async deleteBankCard (id) {
    return fetchData('DELETE', '/bank-card/' + id)
  },
  async fetchProvince () {
    return fetchData('GET', '/union/cities_info')
  },
  async getBanks () {
    return fetchData('GET', '/union/banks')
  },
  async searchBranch ({bankId, provinceId, cityId, keywords}) {
    return fetchData('GET', `/union/bank/${bankId}/province/${provinceId}/cities/${cityId}/branches`, { keywords })
  },
  async addBankCard ({province, city, address, account, swift, bank_name, method, document, document_2}) {
    return fetchData('POST', '/bank-card', {
      province,
      city,
      address,
      account,
      swift,
      bank_name,
      method,
      document,
      document_2
    })
  },
  async addChinaBankCard ({province_id, city_id, branch_id, phone, account, swift, bank_id, method, document}) {
    return fetchData('POST', '/bank-card/v2', {
      province_id,
      city_id,
      branch_id,
      phone,
      account,
      swift,
      bank_id,
      method,
      document
    })
  },
  async updateChinaBankCard (id, {province_id, city_id, branch_id, phone, account, swift, bank_id, method, document}) {
    return fetchData('PUT', `/bank-card/v2/${id}`, {
      province_id,
      city_id,
      branch_id,
      phone,
      account,
      swift,
      bank_id,
      method,
      document
    })
  },
  async getBankCardById (id) {
    return fetchData('GET', '/bank-card/' + id)
  },
  async updateBankCard (id, {province, city, address, account, swift, bank_name, method, document, document_2}) {
    return fetchData('PUT', '/bank-card/' + id, {
      province,
      city,
      address,
      account,
      swift,
      bank_name,
      method,
      document,
      document_2
    })
  }
}
