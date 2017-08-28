
import ticketList from 'views/ticket/index'

export default [{
  path: "/ticket/ticketList",
  component: ticketList,
  meta: {
    requiresAuth: true,
    pageTitle: "ticketList"
  }
}];
