import log from './log.vue';
import main from './main.vue';

export default function install(Vue) {
  Vue.component('chp-log-layout', log)
  Vue.component('chp-main-layout',main)
}
