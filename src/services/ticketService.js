/**
 * Ticket
 */
import   { fetchData }  from  './network/getData'

export default{
  
  async getQuestionType(){
    return fetchData('GET','/tickets/')
  },
  
  async getTicketDetail(id){
  	return fetchData('GET','/tickets/display/'+id)
  },
  async getTicketTypes(){
    return fetchData('GET','/tickets/types')
  },
  async addTicket({subject,account_no,type,content,attachment,fileid}){
    return fetchData('POST','/tickets/save',{subject,account_no,type,content,attachment,fileid})
  },
  async replayTicket({ticket_id,content,attachment,fileid}){
    return fetchData('POST','/ticketposts/save',{ticket_id,content,attachment,fileid})
  },
  async closeTicket(ticket_id){
     return fetchData('POST','/tickets/modify',{ticket_id:ticket_id,status:'closed'})
  }

}
