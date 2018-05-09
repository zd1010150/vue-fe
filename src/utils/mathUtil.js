import _ from 'lodash'

export default {
  getPercentage (dividend, divisor) {
    if (typeof divisor === 'number' && typeof dividend === 'number' && !isNaN(divisor) && !isNaN(dividend)) {
      divisor = divisor === 0 ? 1 : divisor
      return _.floor(dividend / divisor, 2)
    } else return 0
  },
  getFormatMoney (money) {
    return _.round(money, 2)
  }
}
