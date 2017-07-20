import log from './log.vue';
import main from './main.vue';
import password from './password.vue'
export default function install(Vue) {
  Vue.component('chp-log-layout', log)
  Vue.component('chp-main-layout',main)
  Vue.component('chp-pwd-layout',password)
}
