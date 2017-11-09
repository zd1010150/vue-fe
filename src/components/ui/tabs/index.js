import Tabs from './tabs.vue'
import TabContent from './tabContent'
import TabHeader from './tabHeader'

export default function install (Vue) {
  Vue.component('chp-tabs', Tabs)
  Vue.component('chp-tab-header', TabHeader)
  Vue.component('chp-tab-content', TabContent)
}
