/**
 * reference:http://vuematerial.io/#/components/dialog
 */
import chpDialog from './chpDialog.vue';
import chpDialogTitle from './chpDialogTitle.vue';
import chpDialogContent from './chpDialogContent.vue';
import chpDialogActions from './chpDialogActions.vue';
import chpDialogAlert from './presets/chpDialogAlert.vue';
import chpDialogConfirm from './presets/chpDialogConfirm.vue';
import chpDialogPrompt from './presets/chpDialogPrompt.vue';


export default function install(Vue) {
  Vue.component('chp-dialog', chpDialog);
  Vue.component('chp-dialog-title', chpDialogTitle);
  Vue.component('chp-dialog-content', chpDialogContent);
  Vue.component('chp-dialog-actions', chpDialogActions);

  /* Presets */
  Vue.component('chp-dialog-alert', chpDialogAlert);
  Vue.component('chp-dialog-confirm', chpDialogConfirm);
  Vue.component('chp-dialog-prompt', chpDialogPrompt);

}
