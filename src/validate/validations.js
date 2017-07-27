import reg from "../utils/regx"
import message from "./message"
import { Validator } from 'vee-validate'

const passwordValidator = {
  messages:{
    en: message.en.password,
    zh: message.zh.password

  },
  validate(value){
    return reg.password.test(value)
  }
};
const positiveFloatMoneyValidator = {
	messages:{
		en: message.en.positiveFloatMoney,
    	zh: message.zh.positiveFloatMoney
	},
	validate(value){
		return reg.positiveFloatMoney.test(value)
	}
};
export default function install(){
  Validator.extend('password',passwordValidator)
  Validator.extend('positiveFloatMoney',positiveFloatMoneyValidator)
}
