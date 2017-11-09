/**
 * reference https://github.com/lian-yue/vue-upload-component http://www.muse-ui.org/#/linearProgress
 */
import expondTransition from './expandTransition'
import horizonExpandTransition from './horizonExpandTransition'

export default function install (Vue) {
  Vue.component('chp-expand-transition', expondTransition)
  Vue.component('chp-horizion-expand-transition', horizonExpandTransition)
}
