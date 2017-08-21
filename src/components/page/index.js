import leftSideBar from './leftSideBar/leftSideBar'
import pageHeader from './pageHeader/pageHeader'
import rightSideBar from './rightSideBar/rightSideBar'
import topBar from './topBar/topbar'
import dataTable from './dataTable/dataTable.vue'

export default function install(Vue) {
  Vue.component('chp-left-side-bar',leftSideBar)
  Vue.component('chp-right-side-bar',rightSideBar)
  Vue.component('chp-page-header',pageHeader)
  Vue.component('chp-top-bar',topBar)
  Vue.component('chp-data-table',dataTable)
}

