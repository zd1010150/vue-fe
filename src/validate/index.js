import VeeValidate from 'vee-validate'
import Validation from './validations'
import attribute from "./attribute"
import customMessage from "./custom-message"
import zhLocal from "./zh-message"
import Store from 'store'

export default function install(Vue){
  const dictionary = {
    en:{
      attributes:attribute.en
    },
    zh:{
      attributes:attribute.zh
    }
  }
  
  const config = {
    events: 'blur',
    locale:Store.state.language,
    dictionary:dictionary
  };
  
  Validation()
  VeeValidate.Validator.addLocale(zhLocal)
  VeeValidate.Validator.updateDictionary(customMessage)
  Vue.use(VeeValidate,config)
}
