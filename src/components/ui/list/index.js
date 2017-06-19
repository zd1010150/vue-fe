import list from './list.vue';
import listItem from './listItem.js';
import listExpand from './listExpand.vue';

export default function install(Vue) {
  Vue.component('chp-list', list);
  Vue.component('chp-list-item', listItem);
  Vue.component('chp-list-expand', listExpand);

}
