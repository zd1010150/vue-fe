import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Store from 'store'

import en from './en'
import zh from './zh'
import dateTimeFormats from './dateTimeFormats'

Vue.use(VueI18n)

let messages = {
  en,
  zh
}

export default new VueI18n({
  locale: Store.state.language,
  messages: messages,
  dateTimeFormats
})
