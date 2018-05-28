import { DEFAULT_LANGUAGE, DEFAULT_THEME } from '../config/app.config'
import { getStore } from '../utils/storage.js'
import { navLanguage } from '../utils/navigationUtil'
export default {
  userInfo: null,
  language: getStore('language') || navLanguage || DEFAULT_LANGUAGE, // 此处一定要有值，因为i18n初始化时，从这个地方获取了值
  i18nLanguage: getStore('i18nLanguage') || navLanguage || DEFAULT_LANGUAGE,
  theme: getStore('theme') || DEFAULT_THEME,
  errors: [],
  token: null,
  path: '',
  leftSideBarStatus: window.innerWidth >= 768,
  mt4Accounts: [],
  traderAccounts: [],
  agentAccounts: [],
  leverage: [],
  contentLoading: false,
  refreshNoticeFlag: false,
  terms: {zh: '', en: ''},
  syncTime: getStore('syncTime') || null,
  asyncLoading: false,
  fetchPending: false
}
