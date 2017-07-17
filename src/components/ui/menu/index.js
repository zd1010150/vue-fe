import chpMenu from './chpMenu.vue';
import chpMenuItem from './chpMenuItem.vue';
import chpMenuContent from './chpMenuContent.vue';

export default function install(Vue) {
  Vue.component('chp-menu', chpMenu);
  Vue.component('chp-menu-item', chpMenuItem);
  Vue.component('chp-menu-content', chpMenuContent);
}
