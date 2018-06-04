<i18n src="./i18n.yaml"></i18n>
<template>
  <chp-log-layout>
    <div slot="content">
      <form method="post" action="">
        <div class="form-group " id="aetherupload-wrapper" ><!--组件最外部需要有一个名为aetherupload-wrapper的id，用以包装组件-->
            <label>文件1(带回调)：</label>
            <div class="controls" >
                <!--需要有一个名为file的id，用以标识上传的文件，aetherupload(file,group)中第二个参数为分组名，success方法可用于声名上传成功后的回调方法名-->
                <!-- <input type="file" id="file"  onchange="aetherupload(this,'file').success(someCallback).upload()"/> -->
                <input type="file" id="file" />
                <div class="progress " style="height: 6px;margin-bottom: 2px;margin-top: 10px;width: 200px;">
                    <div id="progressbar" style="background:blue;height:6px;width:0;"></div><!--需要有一个名为progressbar的id，用以标识进度条-->
                </div>
                <span style="font-size:12px;color:#aaa;" id="output"></span><!--需要有一个名为output的id，用以标识提示信息-->
                <input type="hidden" name="file1" id="savedpath" ><!--需要有一个名为savedpath的id，用以标识文件保存路径的表单字段，还需要一个任意名称的name-->
            </div>
        </div>
        <!-- <div class="form-group " id="aetherupload-wrapper">
            <label>文件2(无回调)：</label>
            <div class="controls" >
                <input type="file" id="file" onchange="aetherupload(this,'file').upload()"/>
                <div class="progress " style="height: 6px;margin-bottom: 2px;margin-top: 10px;width: 200px;">
                    <div id="progressbar" style="background:blue;height:6px;width:0;"></div>
                </div>
                <span style="font-size:12px;color:#aaa;" id="output"></span>
                <input type="hidden" name="file2" id="savedpath" >
            </div>
        </div> -->

        <button type="submit" class="btn btn-primary">点击提交</button>
      </form>


      <chp-file-upload 
        name="document"
        :extensions="uploadConfig.img.extentions"
        :size="uploadConfig.img.size"
        :post-action="postAction"
        @input="inputFunction"
      >
        UPLOAD
      </chp-file-upload>
    </div>
  </chp-log-layout>
</template>
<script>
  import { UPLOAD_DOCUMENT_URL } from 'src/config/url.config'
  import { UPLOAD_CONFIG } from 'src/config/app.config.js'
  import $ from 'jquery'
  import { aetherupload } from 'src/utils/bigFileUploadUtils'

  export default {
    data () {
      return {
        uploadConfig: UPLOAD_CONFIG,
        postAction: UPLOAD_DOCUMENT_URL + '/avatar'
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        $('#file').change(function () {
          console.log('file changed')
          aetherupload(this, 'file').success(function () {
            console.log('upload success')
          }).upload()
        })
      })
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
