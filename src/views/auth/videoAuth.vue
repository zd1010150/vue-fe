<i18n src="../../components/page/topBar/i18n.yaml"></i18n>
<template>
  <div class="authPage">
    <!-- Top bar -->
    <Topbar />
    <div class="authPageBody">
      <!-- List panel -->
      <p class="notification">根据最新的法律法规，我们需要您在账户开通后进行视频认证，您可以录制好视频后进行上传。</p>
      <TablePanel />      
      <UploadPanel />
      <div style="color:red">Component Version End</div>
    </div>
    <div class="verfBody">
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
              <p>d. 现申请把账户资金提取到本人的XXX银行（哪家银行）卡，尾号是XXXX（出金卡最后四位数），请ACY稀万予以审核</p>
              <p>e. 本人愿意承担在出金过程中，通过银行及支付公司转账出现的任何法律风险</p>
            </div>        
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import videoServices from 'services/videoServices'

  // Components
  import Topbar from './components/Topbar.vue'
  import TablePanel from './components/TablePanel.vue'
  import UploadPanel from './components/UploadPanel.vue'

  export default {
    components: {
      'TablePanel': TablePanel,
      'Topbar': Topbar,
      'UploadPanel': UploadPanel
    },
    data () {
      return {
        videos: []
      }
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
<style lang="less" scoped>
  @import "~assets/less/variable.less";
  
  .authPageBody {
    padding: 0 20px 20px;
    font-size: 1.3rem;
    
    .notification {
      line-height: 4em;
    }
  }

  @media (max-width: @screen-sm-min) {
    .authPageBody {
      padding: 0 0 10px;
      font-size: 1rem;

      .notification {
        line-height: 2em;
        font-size: 1.1em;
        padding: 1em;
      }
    } 
  }
</style>