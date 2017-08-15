/**
 * reference:http://vuematerial.io/#/components/dialog  
 * scroller 特性来自于这个组件http://www.muse-ui.org/#/dialog  的scrollerdialog
 */
import chpDialog from './chpDialog.vue'
import chpDialogAlert from './presets/chpDialogAlert.vue'
import chpDialogConfirm from './presets/chpDialogConfirm.vue'
import chpDialogPrompt from './presets/chpDialogPrompt.vue'


export default function install(Vue) {
  Vue.component('chp-dialog', chpDialog);
  

  /* Presets */
  Vue.component('chp-dialog-alert', chpDialogAlert);
  Vue.component('chp-dialog-confirm', chpDialogConfirm);
  Vue.component('chp-dialog-prompt', chpDialogPrompt);

}
