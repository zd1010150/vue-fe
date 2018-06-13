<template>  
  <form method="post" action="" @submit.prevent="onSubmit">
    <!--组件最外部需要有一个名为aetherupload-wrapper的id，用以包装组件-->
    <div class="row">
    <div class="form-group col-sm-6 " id="aetherupload-wrapper" >
      <div class="controls">
        <div class="uploader clearfix">
          <!--需要有一个名为file的id，用以标识上传的文件，aetherupload(file,group)中第二个参数为分组名，success方法可用于声名上传成功后的回调方法名-->
          <div class="col-sm-6">
            <input type="file" id="file" :disabled="inputDisabled"/>
          </div>
          <div class="col-sm-6">
          <div class="progress mb-none ">
            <div id="progressbar"></div><!--需要有一个名为progressbar的id，用以标识进度条-->
          </div>
          </div>
        </div>     
        <span style="font-size:12px;color:#aaa;" id="output"></span><!--需要有一个名为output的id，用以标识提示信息-->
        <input type="hidden" name="file1" id="savedpath" ><!--需要有一个名为savedpath的id，用以标识文件保存路径的表单字段，还需要一个任意名称的name-->
        <div class="formatTip">* 视频文件不能超过 300MB; 文件形式：MP4, AVI, WMV, MPG, MOV</div>
        <div
          v-if="invalidExt"
          class="formatTip error"
        >
          * 视频格式有误，请重新上传
        </div>
        <div
          v-if="invalidSize"
          class="formatTip error"
        >
          * 视频超出规定大小，请压缩您的视频
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <button type="submit" class="btn btn-primary" :disabled="hashedVideoId == -1">
        <i class="fa fa-upload" aria-hidden="true"></i>
        确认上传
      </button>
    </div>
    </div>
  </form>
</template>
<script>
  import $ from 'jquery'
  import { aetherupload } from 'src/utils/bigFileUploadUtils'
  import videoServices from 'services/videoServices'

  export default {
    data () {
      return {
        authVideos: [],
        hashedVideoId: -1,
        invalidExt: false,
        invalidSize: false
      }
    },
    computed: {
      inputDisabled: function () {
        return this.authVideos.length > 1
      }
    },
    mounted: function () {
      const me = this
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        $('#file').change(function () {
          console.log('file changed')
          const isExtValid = me.isFileExtValid(this),
            isSizeValid = me.isSizeValid(this)
          me.invalidExt = !isExtValid
          me.invalidSize = !isSizeValid
          if (!isExtValid || !isSizeValid) {
            me.hashedVideoId = -1
            return
          }

          aetherupload(this, 'file').success(function (res) {
            console.log('upload success')
            const { id, status } = res
            me.hashedVideoId = status === 'success' ? id : -1
          }).upload()
        })
      })
    },
    watch: {
      '$store.state.authVideos' () {
        this.authVideos = this.$store.state.authVideos
      }
    },
    methods: {
      async fetchAuthVideosList () {
        return this.$store.dispatch('fetchAuthVideosList')
      },
      async onSubmit () {
        let result = await videoServices.uploadedNewVideo(this.hashedVideoId)
        if (result.message === 'SUCCESS') {
          // reset vid
          this.hashedVideoId = -1
          // refetch video list
          this.fetchAuthVideosList()
        }
      },
      isFileExtValid (file) {
        const validExts = ['mp4', 'avi', 'wmv', 'mpg', 'mov'],
          fileExt = file.value.replace(/^.*\./, '')
        return validExts.indexOf(fileExt.toLowerCase()) > -1
      },
      isSizeValid (file) {
        // conversion rate from Megabyte to bytes
        const rate = 1048576,
          totalBytes = file.files[0].size,
          totalMb = totalBytes / rate
        console.log(totalMb)
        return totalMb <= 300
      }
    }
  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";
  
  #aetherupload-wrapper {
    .uploader {
      padding: .5em;
      background: @dark-bg-color;

      input[type="file"] {
        max-width: 100%;
      }
    }

    .progress {
      background: #5c5f64;
      height: 10px;
      width: 100%;
      margin-top: 7px;

      #progressbar {
        background: #3c87c7;
        height: 10px;
        width: 0;
      }
    }

    .formatTip {
      color: @dark-font-color;
      line-height: 2em;

      &.error {
        color: #e53935;
        font-weight: 700;
      }
    }
  }

  @media (max-width: @screen-sm-min) {
    #aetherupload-wrapper {
      .uploader {
        padding: 1em 0;
        background: @dark-bg-color;
      }
    }
  }
</style>