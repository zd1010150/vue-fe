
import ticketList from 'views/ticket/ticketList'
import ticketDetail from 'views/ticket/ticketDetail'

export default [{
  path: "/ticket/ticketList",
  component: ticketList,
  meta: {
    requiresAuth: true,
    pageTitle: "ticketList"
  }
},{
  path: "/ticket/ticketDetail",
  component: ticketDetail,
  meta: {
    requiresAuth: true,
    pageTitle: "ticketDetail"
  }
}];
