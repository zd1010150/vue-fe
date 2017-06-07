import Vue from "vue"
import VueI18n from 'vue-i18n'
import { DEFAULT_LANGUAGE } from "../config/app.config"

import en from "./en"
import zh from "./zh"

Vue.use(VueI18n);

let messages =  {
  en,
  zh
}
export default new VueI18n({
  locale : DEFAULT_LANGUAGE,
  messages
});
