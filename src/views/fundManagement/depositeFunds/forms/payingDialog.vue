<i18n src="../../i18n.yaml"></i18n>
<template>
  <chp-dialog-alert
    :chp-content-html="$t('deposit.dialogNote')"
    :chp-ok-text="$t('ui.button.confirm')"
    ref="infoDialog"
    @close="close"
  >
  </chp-dialog-alert>
</template>
<script>
  export default {
    methods: {
      close () {
        this.$emit('close')
      },
      open () {
        this.$refs.infoDialog.open()
      }
    }
  }
</script>
