
const BEIJING_OFFSET = 8 //北京时间差 东8区


let getBeiJingTimeByTimestamp=(timestamp)=>{
		return timestamp + BEIJING_OFFSET*60*60*1000
}

let getTimeDelay = (timestamp) =>{
	return new Date().getTime() - timestamp
}

let millionSecondsToHour = (millionSeconds) =>{
	let _s = millionSeconds/1000,d=0,h=0,m=0,s=0
    console.log(_s,_s/24*60*60);
	d = Math.floor(_s/(24*60*60))
	_s = _s-d*24*60*60
	h = Math.floor(_s/(60*60))
	_s = _s-h*60*60
	m = Math.floor(_s/60)
	_s = _s-m*60
	s = Math.floor(_s)
	return {
		d,h,m,s
	}
}
export { getBeiJingTimeByTimestamp, getTimeDelay}
