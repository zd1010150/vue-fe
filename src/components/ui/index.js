import vBar from './vBar'
import scrollBar from './scrollBar'
import chpInkRipple from './chpInkRipple/chpInkRipple'
import button from './button'
import panel from './panel/panel'
import Checkbox from './checkbox'
import Radio from './radio'
import DropBack from './backdrop'
import MuseUI from './museUI'
import Tabs from './tabs'
import Pagination from './pagination'
import Datepicker from './datePicker'
import Toolbar from './toolbar'
import Tooltip from './tooltip'
import Table from './table'
import Dialog from './dialog'
import List from './list'
import FileUpload from './fileupload'
import ImagePreview from './imagePreview'
import ExpandTransition from './expandTransition'
import Echarts from './echarts'
import liquidFill from './liquidFill'
import Timer from './timer'
import Carousel from './carousel'
import FeatureImage from './featureImage'
import ProgressBar from './progressBar'
import OneLine from './oneLine'
import ViewAll from './viewAll'
export default function install(Vue) {
  Vue.component('chp-ink-ripple', chpInkRipple)
  Vue.component('chp-button',button)
  Vue.component('chp-panel',panel)
  Vue.use(Checkbox)
  Vue.use(Radio)
  Vue.use(DropBack)
  Vue.use(MuseUI)
  Vue.use(vBar)
  Vue.use(scrollBar)
  Vue.use(Tabs)
  Vue.use(Pagination)
  Vue.use(Datepicker)
  Vue.use(FileUpload)
  Vue.use(Toolbar)
  Vue.use(Tooltip)
  Vue.use(Table)
  Vue.use(Dialog)
  Vue.use(List)
  Vue.use(ImagePreview)
  Vue.use(ExpandTransition)
  Vue.use(Echarts)
  Vue.use(liquidFill)
  Vue.use(Timer)
  Vue.use(Carousel)
  Vue.use(FeatureImage)
  Vue.use(ProgressBar)
  Vue.use(OneLine)
  Vue.use(ViewAll)
}
