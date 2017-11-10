import event from 'views/event/index'

export default [{
  path: '/event',
  component: event,
  meta: {
    requiresAuth: true,
    pageTitle: 'event'
  }
}]
