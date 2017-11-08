/**
 * refrence https://ssense.github.io/vue-carousel/api/
 * 注意此api没有增加循环 loop 这个参数
 */
import Carousel from './Carousel.vue'
import Slide from './Slide.vue'

export default function install (Vue) {
  Vue.component('chp-carousel', Carousel)
  Vue.component('chp-slide', Slide)
}
