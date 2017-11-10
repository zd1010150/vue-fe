/**
 * 如果该用户没有开通代理就无法查看该页面
 */
import Store from 'store'

export default {
  beforeRouteEnter (to, from, next) {
    let userInfo = Store.state.userInfo
    if (to.meta.agent && userInfo && userInfo.hasAgent) {
      next()
    } else if ((!to.meta.agent) && userInfo && (!userInfo.hasAgent)) {
      next()
    } else {
      next({path: '/403'})
    }
  }
}
