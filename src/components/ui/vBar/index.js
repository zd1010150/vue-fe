// import vBar from 'v-bar'
import vBar from './vBar'
import './bar.less'

export default function install (Vue) {
  Vue.component('chp-scroll-bar', vBar)
}
