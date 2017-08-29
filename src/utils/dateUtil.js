let timePickerFormat = function(value) {
  let date = new Date(value),
    year,
    month,
    day
  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()
  return year + "-" + (month < 10 ? '0' + (month) : month) + '-' + (day < 10 ? ('0' + day) : day)
}
export { timePickerFormat }
