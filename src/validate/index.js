import VeeValidate from 'vee-validate'
import Validation from './validations'
import attribute from "./attribute"
import message from "./message"
import zhLocal from "./zh-message"
import Store from 'store'

export default function install(Vue){
  const dictionary = {
    en:{
      attributes:attribute.en,
      message:message.en
    },
    zh:{
      attributes:attribute.zh,
      message:message.zh
    }
  };
  
  const config = {
    events: 'blur',
    locale:Store.state.language,
    dictionary:dictionary
  };

  Validation();

  VeeValidate.Validator.addLocale(zhLocal);

  Vue.use(VeeValidate,config);
}
