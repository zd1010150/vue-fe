/**
 * reference: https://github.com/SSENSE/vue-carousel
 */
import { Carousel, Slide } from 'vue-carousel'


export default function install(Vue) {
  Vue.component('chp-carousel', Carousel)
  Vue.component('chp-slide', Slide)
  
}
