import * as type from "./mutation-types"
import userService from "../services/userService"
import pwdService from "../services/pwdService"
import mt4Service from "../services/mt4Service"
import configService from "../services/configService"
export default {

  async login({ commit }, form) {
    return await userService.login(form).then(({ data, success, message }) => {
      if (success && data.token) {
        commit(type.SET_TOKEN, data.token)
      }
      return { data, success, message }
    })
  },
  async getUserInfo({ commit }) {
    return await userService.getUserInfo().then(({ data, success, message }) => {
      if (success) {
        commit(type.SET_USERINFO, data)

      }
      return { success ,data}
    });
  },
  async logout({ commit, state }) {
    if (state && state.userInfo) {
      return await userService.logout()
    }
  },
  async addSystemError({ commit }, error) {
    commit(type.ADD_ERROR_INFO, error)
  },
  async changePassword({ commit }, { old_password, password }) {
    let { data, success, message } = await pwdService.changePwd({ old_password, password })
    if (success) {
      commit(type.SET_USERINFO, null)
      commit(type.SET_TOKEN, "")
    }
    return { data, success, message }
  },
  async getMT4Accounts({ commit }) {
    let { data, success, message } = await mt4Service.getMT4Account()
    if (success) {
      let { traderAccounts, agentAccounts } = mt4Service.filterAccounts(data)
      commit(type.SET_MT4_ACCOUNTS, data)
      commit(type.SET_MT4_TRADER_ACCOUNTS, traderAccounts)
      commit(type.SET_MT4_AGENT_ACCOUNTS, agentAccounts)
    } else {
      commit(type.SET_MT4_ACCOUNTS, [])
      commit(type.SET_MT4_TRADER_ACCOUNTS, [])
      commit(type.SET_MT4_AGENT_ACCOUNTS, [])
    }
    return { data, success, message }
  },
  async getLeverageAndTerms({ commit }) {
    let { data, success, message } = await configService.getConfigByKey({ fields: ["leverage", "terms", "terms_en"] })
    if (success) {
      commit(type.SET_LEVERAGE, configService.mapLeverage(data['leverage']))
      commit(type.SET_TERMS, {
        zh: data["terms"],
        en: data["terms_en"]
      })
    } else {
      commit(type.SET_LEVERAGE, [])
    }
    return { success, data }
  }

}
