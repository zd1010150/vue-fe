export default {
	 beijingTime: function (value) {
            var date = new Date (value + (1000*60*60*8)),year,month,day,hour,minute,second;
            year = date.getUTCFullYear();
            month = date.getUTCMonth()+1;
            day = date.getUTCDate();
            hour = date.getUTCHours();
            minute = date.getUTCMinutes();
            second = date.getUTCSeconds();
        return day + '/' + (month < 10 ? '0'+(month) : month) + '/' + year + ' ' + hour + ':' + minute + ':' + second;
        }
}