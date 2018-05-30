/* eslint-disable one-var */
import reg from '../utils/regx'
import message from './message'
import { Validator } from 'vee-validate'
import configService from 'services/configService'

const passwordValidator = {
  messages: {
    en: message.en.password,
    zh: message.zh.password,
    'zh-Hant': message.zhHant.password
  },
  validate (value) {
    return reg.password.test(value)
  }
}
const positiveFloatMoneyValidator = {
  messages: {
    en: message.en.positiveFloatMoney,
    zh: message.zh.positiveFloatMoney,
    'zh-Hant': message.zhHant.positiveFloatMoney
  },
  validate (value) {
    return reg.positiveFloatMoney.test(value)
  }
}
const moneyRangeValidator = {
  messages: {
    en: message.en.moneyRange,
    zh: message.zh.moneyRange,
    'zh-Hant': message.zhHant.moneyRange
  },
  async validate (value, fieldKey) {
    let fields = ['max_' + fieldKey, 'min_' + fieldKey],
      validationResult = {
        valid: false,
        data: {
          min: null,
          max: null
        }
      }
    let {success, data} = await configService.getConfigByKey({fields})
    if (success && data) {
      Object.assign(validationResult.data, {
        min: data['min_' + fieldKey],
        max: data['max_' + fieldKey]
      })
      validationResult.valid = value >= Number(validationResult.data.min) && value <= Number(validationResult.data.max)
    }
    return validationResult
  }
}

export default function install () {
  Validator.extend('password', passwordValidator)
  Validator.extend('positiveFloatMoney', positiveFloatMoneyValidator)
  Validator.extend('moneyRange', moneyRangeValidator)
}
