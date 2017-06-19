import leftSideBar from './left-side-bar/leftSideBar.vue'
import pageHeader from './page-header/pageHeader.vue'
import rightSideBar from './right-side-bar/rightSideBar.vue'
import topBar from './top-bar/topbar.vue'


export default function install(Vue) {
  Vue.component('chp-left-side-bar',leftSideBar)
  Vue.component('chp-right-side-bar',rightSideBar)
  Vue.component('chp-page-header',pageHeader)
  Vue.component('chp-top-bar',topBar)
}

