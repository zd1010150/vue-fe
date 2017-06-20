import vBar from 'v-bar';
import chpInkRipple from './chpInkRipple/chpInkRipple.vue';
import button from './button.vue';
import panel from './panel/panel.vue'
import Checkbox from './checkbox'
import DropBack from './backdrop'
import List from './list'
import Menu from './menu'

export default function install(Vue) {
  Vue.component('chp-ink-ripple', chpInkRipple)
  Vue.use(Checkbox)
  Vue.use(DropBack)
  Vue.use(List)
  Vue.use(Menu)
  Vue.component('chp-scroll-bar',vBar)
  Vue.component('chp-button',button)
  Vue.component('chp-panel',panel)
}
