import vBar from './vBar';
import chpInkRipple from './chpInkRipple/chpInkRipple';
import button from './button';
import panel from './panel/panel'
import Checkbox from './checkbox'
import Radio from './radio'
import DropBack from './backdrop'
import MuseUI from './museUI'
import Select from './select'
import Tabs from './tabs'
import Pagination from './pagination'
import Datepicker from './datePicker'
import Toolbar from './toolbar'
import Tooltip from './tooltip'
import Table from './table'
import Dialog from './dialog'

import './vueForm/vueForm.less'

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
  Vue.use(Toolbar)
  Vue.use(Tooltip)
  Vue.use(Table)
  Vue.use(Dialog)
  Vue.component('chp-button',button)
  Vue.component('chp-panel',panel)
}