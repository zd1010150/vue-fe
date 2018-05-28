import { setStore } from '../utils/storage.js'
import { ZH_LANGEUAGES, ZH_LANGUAGE, EN_LANGUAGE } from 'src/config/app.config'
import {
  ADD_ERROR_INFO,
  SET_ASYNC_LOADING,
  SET_CONTENT_LOADING,
  SET_FETCH_PENDING,
  SET_LANGUAGE,
  SET_I18N_LANGUAGE,
  SET_LEFT_SIDE_BAR_STATUS,
  SET_LEVERAGE,
  SET_MT4_ACCOUNTS,
  SET_MT4_AGENT_ACCOUNTS,
  SET_MT4_TRADER_ACCOUNTS,
  SET_NOTICE_REFRESH_FLAG,
  SET_PATH,
  SET_SYNC_TIME,
  SET_TERMS,
  SET_THEME,
  SET_TOKEN,
  SET_USERINFO
} from './mutation-types'

export default {
  [SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [ADD_ERROR_INFO] (state, error) {
    state.errors.push(error)
  },
  [SET_TOKEN] (state, token) {
    state.token = token
    setStore('token', token)
  },
  [SET_LANGUAGE] (state, language) {
    state.language = ZH_LANGEUAGES.indexOf(language) > -1 ? ZH_LANGUAGE : EN_LANGUAGE
  },
  [SET_I18N_LANGUAGE] (state, language) {
    state.i18nLanguage = language
  },
  [SET_THEME] (state, theme) {
    state.theme = theme
  },
  [SET_PATH] (state, path) {
    state.path = path
  },
  [SET_LEFT_SIDE_BAR_STATUS] (state, status) {
    state.leftSideBarStatus = status
  },
  [SET_MT4_ACCOUNTS] (state, accounts) {
    state.mt4Accounts = accounts
  },
  [SET_MT4_AGENT_ACCOUNTS] (state, accounts) {
    state.agentAccounts = accounts
  },
  [SET_MT4_TRADER_ACCOUNTS] (state, accounts) {
    state.traderAccounts = accounts
  },
  [SET_LEVERAGE] (state, leverage) {
    state.leverage = leverage
  },
  [SET_CONTENT_LOADING] (state, loading) {
    state.contentLoading = loading
  },
  [SET_NOTICE_REFRESH_FLAG] (state, flag) {
    state.refreshNoticeFlag = flag
  },
  [SET_TERMS] (state, terms) {
    state.terms = terms
  },
  [SET_SYNC_TIME] (state, time) {
    state.syncTime = time
  },
  [SET_ASYNC_LOADING] (state, loading) {
    state.asyncLoading = loading
  },
  [SET_FETCH_PENDING] (state, fetchPending) {
    state.fetchPending = fetchPending
  }
}
