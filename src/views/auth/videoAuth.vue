<template>
  <div class="authPage">
    <Topbar />
    <div class="authPageBody">
      <p class="notification">根据最新的法律法规，我们需要您在账户开通后进行视频认证，您可以录制好视频后进行上传。</p>
      <TablePanel />      
      <UploadPanel />
    </div>
  </div>
</template>
<script>
  import Topbar from './components/Topbar.vue'
  import TablePanel from './components/TablePanel.vue'
  import UploadPanel from './components/UploadPanel.vue'

  export default {
    components: {
      'TablePanel': TablePanel,
      'Topbar': Topbar,
      'UploadPanel': UploadPanel
    }
  }
</script>
<style lang="less">
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
      padding: 0 0 50px;
      font-size: 1rem;

      .notification {
        line-height: 2em;
        font-size: 1.1em;
        padding: 1em;
      }
    } 
  }
</style>