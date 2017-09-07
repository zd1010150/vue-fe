
import   { fetchData }  from  './network/getData'

export default {
  getNoticeByType({type,language,category,startDay,endDay}){
  	 return fetchData("GET","/notice/"+type+"/all",{ language,category,startDay,endDay })
  },
  getUnreadNotice(){
	return fetchData("GET","/notice/unread")
  }
}
