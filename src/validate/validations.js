import reg from "../utils/regx"
import message from "./message"
import { Validator } from 'vee-validate'

const passwordValidator = {
  messages:{
    en: message.en.password,
    zh: message.zh.password

  },
  validate(value){
    return reg.password.test(value);
  }
};

export default function install(){
  Validator.extend('password',passwordValidator);
}
