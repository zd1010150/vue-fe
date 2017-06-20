import chpSelect from './chpSelect.vue';
import chpOption from './chpOption.vue';

export default function install(Vue) {
  Vue.component('chp-select', chpSelect);
  Vue.component('chp-option', chpOption);
}
