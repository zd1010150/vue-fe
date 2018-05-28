import VeeValidate from 'vee-validate'
import Validation from './validations'
import attribute from './attribute'
import customMessage from './custom-message'
import zhLocal from './zh-message'
import zhHantLocal from './zh-hant-message'
import Store from 'store'

export default function install (Vue) {
  const dictionary = {
      en: {
        attributes: attribute.en
      },
      zh: {
        attributes: attribute.zh
      },
      'zh-Hant': {
        attributes: attribute.zhHant
      }
    }, config = {
      events: 'blur',
      locale: Store.state.i18nLanguage,
      dictionary: dictionary
    }
  Validation()
  VeeValidate.Validator.addLocale(zhLocal)
  VeeValidate.Validator.addLocale(zhHantLocal)
  VeeValidate.Validator.updateDictionary(customMessage)
  Vue.use(VeeValidate, config)
}
