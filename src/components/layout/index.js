import log from './log.vue'
import main from './main.vue'
import password from './password.vue'
import error from './error.vue'
export default function install(Vue) {
  Vue.component('chp-log-layout', log)
  Vue.component('chp-main-layout',main)
  Vue.component('chp-pwd-layout',password)
  Vue.component('chp-error-layout',error)
}
