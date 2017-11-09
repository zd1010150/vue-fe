import uiComponent from 'components/ui'

import pageComponent from 'components/page'

import layoutComponent from 'components/layout'

export default function install (Vue) {
  Vue.use(layoutComponent)
  Vue.use(uiComponent)
  Vue.use(pageComponent)
}
