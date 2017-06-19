import vBar from 'v-bar';
import chpInkRipple from './chpInkRipple/chpInkRipple.vue';
import button from './button.vue';
import panel from './panel/panel.vue'
import List from './list'

export default function install(Vue) {
  Vue.use(List)
  Vue.component('chp-scroll-bar',vBar)
  Vue.component('chp-ink-ripple', chpInkRipple)
  Vue.component('chp-button',button)
  Vue.component('chp-panel',panel)
}
