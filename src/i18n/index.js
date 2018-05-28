import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Store from 'store'

import en from './en'
import zh from './zh'
import zhHant from './zh-Hant'
import dateTimeFormats from './dateTimeFormats'

Vue.use(VueI18n)

let messages = {
  en,
  zh,
  'zh-Hant': zhHant
}
console.log('dandan', Store.state.i18nLanguage)
export default new VueI18n({
  locale: Store.state.i18nLanguage,
  messages: messages,
  dateTimeFormats
})
