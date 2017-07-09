import vBar from './v-bar';
import chpInkRipple from './chpInkRipple/chpInkRipple.vue';
import button from './button.vue';
import panel from './panel/panel.vue'
import Checkbox from './checkbox'
import Radio from './radio'
import DropBack from './backdrop'
import MuseUI from './muse-ui'
import Select from './select'
import Tabs from './tabs'
import Pagination from './pagination'
import Datepicker from './datePicker'
export default function install(Vue) {
  Vue.component('chp-ink-ripple', chpInkRipple)
  Vue.use(Checkbox)
  Vue.use(Radio)
  Vue.use(DropBack)
  Vue.use(MuseUI)
  Vue.use(vBar)
  Vue.use(Select)
  Vue.use(Tabs)
  Vue.use(Pagination)
  Vue.use(Datepicker)
  Vue.component('chp-button',button)
  Vue.component('chp-panel',panel)
}
