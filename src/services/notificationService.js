
import { fetchData }  from  './network/getData'
import dataTableService from './dataTableService'

export default {
/**
    type 取值： action, announcement, course;
	language 取值: en, zh
	category 取值: Systems, InternalTransfer, Withdrawals, Deposits
	startDay endDay开始结束日期
	当type为action时，无category字段时返回所有action数据，有categ时返回请求类别的数据，和language无关
	当type为announcement, course时，返回language语言的对应数据，
 */
  async getNoticeByType(type,{language='',category='',startDay='',endDay='',pageIndex=1,pageSize=5,sort=''}){

  	return dataTableService.pagingQuery({
  		url : "/notice/"+type+"/all",
  		pageIndex:pageIndex,
  		pageSize:pageSize,
  		sort:"",
  		queryParameter:{language,category,startDay,endDay}
  	})
  },
  async getUnreadNotice(){
	return fetchData("GET","/notice/unread")
  }
}
