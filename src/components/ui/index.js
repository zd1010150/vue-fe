import chpInkRipple from './chpInkRipple/chpInkRipple.vue';
import button from './button.vue';
import panel from './panel/panel.vue'
export default function install(Vue) {


  Vue.component('chp-ink-ripple', chpInkRipple);
  Vue.component('chp-button',button)
  Vue.component('chp-panel',panel)
}
