/**
 * reference https://github.com/lian-yue/vue-upload-component http://www.muse-ui.org/#/linearProgress
 */
import FileUpload from './upload.vue'

export default function install (Vue) {
  Vue.component('chp-file-upload', FileUpload)
}
