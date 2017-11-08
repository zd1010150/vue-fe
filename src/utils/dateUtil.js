/* eslint-disable one-var */
let timePickerFormat = (value) => {
  let date = new Date(value),
    year,
    month,
    day
  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()
  return year + '-' + (month < 10 ? '0' + (month) : month) + '-' + (day < 10 ? ('0' + day) : day)
}
/**
 * 获取今天的日期和30天之前的日期
 * @return {[type]} [description]
 */
let aMonthDate = () => {
  let _now = new Date().getTime(),
    _monthAgo = _now - 30 * 24 * 60 * 60 * 1000
  return {
    now: timePickerFormat(_now),
    monthAgo: timePickerFormat(_monthAgo)
  }
}
/**
 * 毫秒转成 天时分秒
 * @param  {[type]} val      [description]
 * @param  {[type]} language [description]
 * @return {[type]}          [description]
 */
let numberToTime = (val, language) => {
  let day = Math.floor(val / (24 * 60 * 60 * 1000)),
    hour = Math.floor((val - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000)),
    min = Math.floor((val - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000)),
    sec = Math.floor((val - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000 - min * 60 * 1000) / 1000)
  let units = {
      zh: {
        day: ' 天 ',
        hour: ' 时 ',
        min: ' 分 ',
        sec: ' 秒 '
      },
      en: {
        day: ' Day ',
        hour: ' Hour ',
        min: ' Min ',
        sec: ' Sec '
      }
    },
    unit = units[language]
  day = day > 0 ? ('' + day + unit.day) : ''
  hour = (day === '' && hour === 0) ? '' : ((hour < 10 ? ('0' + hour) : hour) + unit.hour)
  min = (min < 10 ? ('0' + min) : min) + unit.min
  sec = (sec < 10 ? ('0' + sec) : sec) + unit.sec
  return day + hour + min + sec + ''
}
export { timePickerFormat, aMonthDate, numberToTime }
