<i18n src="./i18n.yaml"></i18n>
<template>
    <chp-log-layout>
      <div slot="content">
        <chp-file-upload name="document"
                         :extensions="uploadConfig.img.extentions"
                         :size="uploadConfig.img.size"
                         :post-action="postAction"
                         @input="inputFunction">
          shangchuan
        </chp-file-upload>
      </div>
    </chp-log-layout>
</template>
<script>
  import { UPLOAD_DOCUMENT_URL } from 'src/config/url.config'
  import { UPLOAD_CONFIG } from 'src/config/app.config.js'

  export default {
    data () {
      return {
        uploadConfig: UPLOAD_CONFIG,
        postAction: UPLOAD_DOCUMENT_URL + '/avatar'
      }
    },
    watch: {},
    methods: {
      inputFunction (response, isAllsuccess, errors) {
        if (isAllsuccess) {
          alert(response[0].data.url)
        } else {
          this.toastr.error(this.$t('info.UPLOAD_ERROR.' + errors[0]))
        }
      }
    }
  }
</script>
<style scoped>

</style>
