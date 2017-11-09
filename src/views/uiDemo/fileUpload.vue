<template>
  <div>
    <h6>单文件上传</h6>
    <chp-file-upload
      name="document"
      :post-action="postAction"
      @input="inputFunction"
      :multiple="true"
      ref="upload">
      file upload
    </chp-file-upload>
    <h6>多文件拖动上传</h6>
    <chp-file-upload
      name="document"
      drop=".dropFileArea"
      :extensions="['png', 'jpg','jpeg','bmp','pdf','doc','docx']"
      :dropDirectory="false"
      :multiple="true"
      :post-action="dropPostAction"
      @input="dropInputFunction"
      ref="dropUploads">
      <mu-text-field hintText="拖动" multiLine :rows="7" :rowsMax="6" class="form-control dropFileArea" :disabled="true"/>
    </chp-file-upload>

  </div>

</template>
<script>
  import { UPLOAD_DOCUMENT_URL } from '../../config/url.config.js'

  export default {
    data () {
      return {
        files: [],
        postAction: UPLOAD_DOCUMENT_URL + '/bill',
        dropPostAction: UPLOAD_DOCUMENT_URL + '/bill',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }
    },
    methods: {
      inputFunction (files, isAllsuccess, error) {
        console.log('input file:', JSON.stringify(files), isAllsuccess, JSON.stringify(error))
      },
      dropInputFunction (files, isAllsuccess, error) {
        console.log('input file:', JSON.stringify(files), isAllsuccess, JSON.stringify(error))
      }
    }
  }
</script>
