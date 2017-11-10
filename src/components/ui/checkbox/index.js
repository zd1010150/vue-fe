/**
 * reference:http://vuematerial.io/#/components/checkbox  ,但是此处增加了input事件，如果CheckBox，选中了，
 * 那么就会返回checkbox的value,如果没选中，就是null，参考https://github.com/baianat/vee-validate/issues/484
 */
import chpCheckbox from './chpCheckbox.vue'

export default function install (Vue) {
  Vue.component('chp-checkbox', chpCheckbox)
}
