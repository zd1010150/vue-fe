import chpList from './chpList.vue'
import chpListItem from './chpListItem.js'
import chpListExpand from './chpListExpand.vue'

export default function install (Vue) {
  Vue.component('chp-list', chpList)
  Vue.component('chp-list-item', chpListItem)
  Vue.component('chp-list-expand', chpListExpand)
}
