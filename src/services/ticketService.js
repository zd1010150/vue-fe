/* eslint-disable camelcase */
/**
 * Ticket
 */
import { fetchData } from './network/getData'
import store from 'store'
import { SET_FETCH_PENDING } from 'store/mutation-types'

export default {

  async getQuestionType () {
    return fetchData('GET', '/tickets/')
  },

  async getTicketDetail (id) {
    let promise = await fetchData('GET', '/tickets/display/' + id)
    store.commit(SET_FETCH_PENDING, true)
    return promise
  },
  async getTicketTypes (language) {
    return fetchData('GET', '/tickets/types/' + language)
  },
  async addTicket ({subject, account_no, type, content, attachment, fileid}) {
    return fetchData('POST', '/tickets/save', {subject, account_no, type, content, attachment, fileid})
  },
  async replayTicket ({ticket_id, content, attachment, fileid}) {
    return fetchData('POST', '/ticketposts/save', {ticket_id, content, attachment, fileid})
  },
  async closeTicket (ticket_id) {
    return fetchData('POST', '/tickets/modify', {ticket_id: ticket_id, status: 'closed'})
  }

}
