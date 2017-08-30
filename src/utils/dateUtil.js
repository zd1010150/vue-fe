let timePickerFormat = (value) => {
  let date = new Date(value),
    year,
    month,
    day
  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()
  return year + "-" + (month < 10 ? '0' + (month) : month) + '-' + (day < 10 ? ('0' + day) : day)
}
/**
 * 获取今天的日期和30天之前的日期
 * @return {[type]} [description]
 */
let aMonthDate =()=>{
	let _now = new Date().getTime(),
		_monthAgo = _now - 30*24*60*60*1000
		return {
			now: timePickerFormat(_now),
			monthAgo : timePickerFormat(_monthAgo)
		}
}
export { timePickerFormat,aMonthDate }
