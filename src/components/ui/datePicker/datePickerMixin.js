

let zh_localConfig = {
  dayAbbreviation: ['日', '一', '二', '三', '四', '五', '六'],
  dayList: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  monthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  monthLongList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
},en_localConfig = {
  dayAbbreviation: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  dayList: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'],
  monthLongList: ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
}
const zh_dateTimeFormat = {
  formatDisplay (date) {
    var day = date.getDate()
    return `${zh_localConfig.monthList[date.getMonth()]}-${day > 9 ? day : '0' + day} ${zh_localConfig.dayList[date.getDay()]}`
  },
  formatMonth (date) {
    return `${date.getFullYear()} ${zh_localConfig.monthLongList[date.getMonth()]}`
  },
  getWeekDayArray (firstDayOfWeek) {
    let beforeArray = []
    let afterArray = []
    const dayAbbreviation = zh_localConfig.dayAbbreviation
    for (let i = 0; i < dayAbbreviation.length; i++) {
      if (i < firstDayOfWeek) {
        afterArray.push(dayAbbreviation[i])
      } else {
        beforeArray.push(dayAbbreviation[i])
      }
    }
    return beforeArray.concat(afterArray)
  }
}
const en_dateTimeFormat={
  formatDisplay (date) {
    return `${en_localConfig.dayList[date.getDay()]}, ${en_localConfig.monthList[date.getMonth()]} ${date.getDate()}`
  },
  formatMonth (date) {
    return `${en_localConfig.monthLongList[date.getMonth()]} ${date.getFullYear()}`
  },
  getWeekDayArray (firstDayOfWeek) {
    let beforeArray = []
    let afterArray = []
    for (let i = 0; i < en_localConfig.dayAbbreviation.length; i++) {
      if (i < firstDayOfWeek) {
        afterArray.push(en_localConfig.dayAbbreviation[i])
      } else {
        beforeArray.push(en_localConfig.dayAbbreviation[i])
      }
    }
    return beforeArray.concat(afterArray)
  }
}
export default {
  data () {
    return {
      enDateFormat:this.$store.state.language == "en" ? en_dateTimeFormat : zh_dateTimeFormat,
      okLabel:this.$t('ui.button.ok'),
      cancelLabel:this.$t('ui.button.cancel')
    }
  },
  watch:{
    "$store.state.language" :function(val){
      this.enDateFormat = val== "en" ? en_dateTimeFormat : zh_dateTimeFormat
      this.okLabel = this.$t('ui.button.ok')
      this.cancelLabel = this.$t('ui.button.cancel')
    }
  }
}