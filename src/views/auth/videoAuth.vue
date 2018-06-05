<i18n src="./i18n.yaml"></i18n>
<template>
  <chp-log-layout class="verificationWrapper">
    <div slot="content" class="content">
      <h4>
        账户认证
        <div style="float: right;">
          <a
            class="mb-xs mt-xs mr-xs btn btn-default"
            target="_blank"
            :href="externalUrl.qq"
          >
            <i class="fa fa-qq"></i>
            在线QQ
          </a>
          <a
            class="mb-xs mt-xs mr-xs btn btn-default"
            target="_blank"
            :href="externalUrl.livechat"
          >
            <i class="fa fa-comments-o"></i>
            在线聊天
          </a>
        </div>
      </h4>
      <div class="verfBody">
        <p class="tip">根据最新的法律法规，我们需要您在账户开通后进行视频认证，您可以录制好视频后进行上传。</p>
        <div class="contentWrapper">
          <h4>已上传视频审核状态</h4>
          <div class="mainContent">
            <div style="margin-bottom: 20px;">
              <i class="fa fa-info-circle"></i>
              我们会在两个工作日内进行审核，如有任何疑问，请随时联系我们的客服。
            </div>
            <table class="table mb-none">
              <thead><tr>
                <th>创建时间</th>
                <th>文件名</th>
                <th>状态</th>
                <th>操作</th>
              </tr></thead>
              <tbody>
              <tr v-for="(a, i) in videos" :key="a.id">
                <td width="300px"> {{ a.createdAt }} </td>
                <td min-width="150px"> {{ a.name }} </td>
                <td min-width="150px"> {{ a.status }} </td>
                <td width="150px">
                  <!-- <i class="fa fa-trash-alt"></i> -->
                  <mu-icon-button
                    @click="deleteVideo(a)"
                    v-if="a.statusId !== 1"
                  >
                    <i aria-hidden="true" class="fa fa-trash-o"></i>
                  </mu-icon-button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="contentWrapper">
          <h4><img class="lightOn" src="https://image.ibb.co/gEL8DT/light_on.png" />认证需求</h4>
          <div class="mainContent">
            <div class="testimony">
              <p>1. 正面录制自己手持<span>身份证</span>和<span>出金银行卡</span></p>
              <p>2. 并且阅读以下条款：</p>
              <div class="subtestimony">
                <p>a. 本人同意并且接受ACY官网上面风险提示页面里面的所有风险</p>
                <p>b. 本人对自己的个人行为负责，在自愿和完全了解风险的前提下入金进行外汇保证金交易</p>
                <p>c. 本人使用自己的银行账户在自己授权的前提下入金进行外汇保证金交易</p>
                <p>d. 现申请吧账户资金提取到本人的XXX银行（哪家银行）卡，尾号是XXXX（出金卡最后四位数），请ACY稀万予以审核</p>
                <p>e. 本人愿意承担在出金过程中，通过银行及支付公司转账出现的任何法律风险</p>
              </div>        
            </div>
            <form method="post" action="" @submit.prevent="onSubmit">
              <div class="form-group " id="aetherupload-wrapper" ><!--组件最外部需要有一个名为aetherupload-wrapper的id，用以包装组件-->
                <div class="controls" >                  
                  <div class="uploader">
                    <!--需要有一个名为file的id，用以标识上传的文件，aetherupload(file,group)中第二个参数为分组名，success方法可用于声名上传成功后的回调方法名-->
                    <input type="file" id="file" />
                    <div class="progress " style="background:#5c5f64;height: 10px;margin-bottom: 2px;margin-top: 10px;width: 200px;">
                      <div id="progressbar" style="background:#3c87c7;height:10px;width:0;"></div><!--需要有一个名为progressbar的id，用以标识进度条-->
                    </div>
                  </div>     
                  <span style="font-size:12px;color:#aaa;" id="output"></span><!--需要有一个名为output的id，用以标识提示信息-->
                  <input type="hidden" name="file1" id="savedpath" ><!--需要有一个名为savedpath的id，用以标识文件保存路径的表单字段，还需要一个任意名称的name-->
                  <div class="formatTip">* 视频文件不能超过 100MB; 文件形式：MP4, AVI, WMV, MPG, MOV</div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="hashedVideoId == -1">
                <span class="glyphicon glyphicon-upload"></span>
                确认上传
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </chp-log-layout>
</template>
<script>
  import $ from 'jquery'
  import { aetherupload } from 'src/utils/bigFileUploadUtils'
  import { EXTERNAL_URL } from 'src/config/url.config.js'
  import videoServices from 'services/videoServices'

  export default {
    data () {
      return {
        externalUrl: EXTERNAL_URL,
        videos: [],
        hashedVideoId: -1
      }
    },
    mounted: function () {
      const me = this
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        $('#file').change(function () {
          console.log('file changed')
          aetherupload(this, 'file').success(function (res) {
            console.log('upload success')
            const { id, status } = res
            me.hashedVideoId = status === 'success' ? id : -1
          }).upload()
        })
      })
    },
    watch: {},
    created () {
      this.fetchVideosList()
    },
    methods: {
      async fetchVideosList () {
        this.loadingStatus = true
        let response = await videoServices.getUploadedVideos()
        this.loadingStatus = false
        if (response.message === 'SUCCESS' && response.data) {
          const me = this
          this.videos = response.data.map((v) => ({
            id: v.id,
            vid: v.video_id,
            name: v.name,
            statusId: v.status,
            status: me.mapStatusIdToName(v.status),
            createdAt: v.created_at
          }))
        } else {
          this.videos = []
        }
      },
      async onSubmit () {
        console.log('submit clicked')
        let result = await videoServices.uploadedNewVideo(this.hashedVideoId)
        console.dir(result)
        if (result.message === 'SUCCESS') {
          // reset vid
          this.hashedVideoId = -1
          // refetch video list
          this.fetchVideosList()
        }
      },
      mapStatusIdToName (id) {
        switch (id) {
          case 0:
            return '待审核'
          case 1:
            return '审核成功'
          case 2:
            return '已拒绝'
          default:
            return '-'
        }
      },
      async deleteVideo ({ vid }) {
        let result = await videoServices.deleteVideoById(vid)
        if (result.message === 'SUCCESS') {
          // refetch video list
          this.fetchVideosList()
        }
      }
    }
  }
</script>
<style scoped>
  .verificationWrapper {
    max-width: 100%;
  }
  .verificationWrapper h4 {
    line-height: 40px;
    padding: 0 30px 10px;
    border-bottom: 3px solid #303138;
    margin: 0;
  }
  .verfBody {
    padding: 0 30px;
  }
  .verfBody .tip {
    line-height: 50px;
  }
  .contentWrapper {
    margin-bottom: 20px;
  }
  .contentWrapper h4 {
    padding: 0 0 0 14px;
    line-height: 40px;    
    background: #292d35;
  }
  .mainContent {
    background: #30353d;
    padding: 25px 30px 50px;
  }
  .testimony {
    color: #fff;
    margin-bottom: 30px;
  }
  .testimony p {
    line-height: 2;
    font-size: 14px;
  }
  .testimony span {
    text-decoration: underline;
    font-weight: 700;
  }
  .subtestimony {
    padding-left: 15px;
  }
  #aetherupload-wrapper {
    float: left;
  }
  .formatTip {
    margin-top: 5px;
  }
  .mainContent .btn-primary {
    margin-top: 3px;
    margin-left: 10px;
  }
  .uploader input,
  .uploader .progress {
    display: inline-block;
  }
  .uploader input {
    vertical-align: bottom;
  }
  .lightOn {
    width: 24px;
    margin-right: 5px;
    vertical-align: text-bottom;
  }
  .uploader {
    background: #292d35;
    padding: 5px;
    padding-bottom: 8px;
  }
  .table {
    background: #292d35;
  }
</style>
