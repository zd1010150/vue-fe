/**
 * 如果语言为英语就无法查看onlinetraining页面
 */
import Store from 'store'
import { ZH_LANGUAGE } from 'src/config/app.config.js'

export default {
  beforeRouteEnter (to, from, next) {
    let language = Store.state.language
    if (language === ZH_LANGUAGE) {
      next()
    } else {
      next({path: '/403'})
    }
  }
}
