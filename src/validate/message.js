export default {
  zh: {
    password: (field) => `${field}必须包括8个字符，包括数字，大写字母和小写字母`,
    positiveFloatMoney: (field) => `${field}格式不对，小数点之后最多两位`,
    moneyRange: (field, params, {min, max}) => {
      if (min && max) {
        return `最大${field}金额${max},最小${field}金额${min}`
      } else {
        return `校验异步出错`
      }
    }
  },
  zhHant: {
    password: (field) => `${field}必須包括8個字符，包括數字，大寫字母和小寫字母`,
    positiveFloatMoney: (field) => `${field}格式不對，小數點之後最多兩位`,
    moneyRange: (field, params, {min, max}) => {
      if (min && max) {
        return `最大${field}金額${max},最小${field}金額${min}`
      } else {
        return `校驗異步出錯`
      }
    }
  },
  en: {
    password: (field) => `${field} at least 8 characters including number ,lower capital and upper capitals`,
    positiveFloatMoney: (field) => `${field} is error.There is at most two digitals after decimal`,
    moneyRange: (field, params, {min, max}) => {
      if (min && max) {
        return `Max ${field} currency is ${max},Min ${field} currency is ${min}`
      } else {
        return `Sync validation error`
      }
    }
  }
}
