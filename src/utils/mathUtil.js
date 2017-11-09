export default {
  getPercentage (dividend, divisor) {
    if (typeof divisor === 'number' && typeof dividend === 'number' && !isNaN(divisor) && !isNaN(dividend)) {
      divisor = divisor === 0 ? 1 : divisor
      return dividend / divisor
    } else return 0
  }
}
