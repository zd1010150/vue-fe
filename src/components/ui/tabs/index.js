import Tabs from './tabs.vue';
import TabContent from './tab-content.vue'
import TabHeader from './tab-header.vue'


export default function install(Vue) {
  Vue.component('chp-tabs', Tabs)
  Vue.component('chp-tab-header', TabHeader)
  Vue.component('chp-tab-content', TabContent)
}
