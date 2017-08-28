export default {
	    beijingZoneTime: function (value) {
            let date = new Date (value + (1000*60*60*8)),year,month,day,hour,minute,second
            year = date.getUTCFullYear()
            month = date.getUTCMonth()+1
            day = date.getUTCDate()
            hour = date.getUTCHours()
            minute = date.getUTCMinutes()
            second = date.getUTCSeconds()
            return day + '/' + (month < 10 ? '0'+(month) : month) + '/' + year + ' ' + hour + ':' + minute + ':' + second
        },
        beijingDate: function(value){
             let date = new Date (value + (1000*60*60*8)),
                 year,
                 month,
                 day
            year = date.getUTCFullYear()
            month = date.getUTCMonth()+1
            day = date.getUTCDate()
            return day + '/' + (month < 10 ? '0'+(month) : month) + '/' + year
        },
        beijingTime:function(value){
            let date = new Date (value + (1000*60*60*8)),
                hour,
                minute,
                second
            hour = date.getUTCHours()
            minute = date.getUTCMinutes()
            second = date.getUTCSeconds()
            return hour + ':' + minute
        }
}