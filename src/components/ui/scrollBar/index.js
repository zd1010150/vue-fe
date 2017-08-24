/**
 * reference:https://github.com/BosNaufal/vue2-scrollbar
 */
import scroller from './scroller'
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css'
export default function install(Vue){
  Vue.component('chp-scroll-bar-2',scroller);
}