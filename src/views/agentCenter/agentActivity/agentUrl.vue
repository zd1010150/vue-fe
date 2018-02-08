<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="row pb-lg">
    <div class="col-lg-12 col-md-12 col-sm-12" v-if="url">
      <table >
        <tr>
          <td class="title"><h4>{{ $t('agentActivity.agentUrl') }} :</h4></td>
          <td class="url pl-sm">
            <span class="text-dark">{{url}}</span>
          </td>
          <td class="btn-td">
            <chp-button class=" ml-xs btn btn-primary print-btn hidden-sm hidden-xs" @click="copy()">
              {{ $t('agentActivity.copyAgentUrl') }}
            </chp-button>
          </td>
          <td>
            <chp-button class="ml-xs btn btn-primary show-qr-btn hidden-sm hidden-xs" @click="showQrCode()">
              {{ $t('agentActivity.showQRCode') }}
            </chp-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="col-sm-12 pt-sm">
      <chp-button class=" btn btn-primary print-btn visible-sm-inline-block visible-xs-inline-block" @click="copy()">
        {{ $t('agentActivity.copyAgentUrl') }}
      </chp-button>
      <chp-button class=" ml-xs btn btn-primary show-qr-btn visible-sm-inline-block visible-xs-inline-block" @click="showQrCode()">
        {{ $t('agentActivity.showQRCode') }}
      </chp-button>
    </div>
    <mu-dialog :open="qrIsShow"  @close='hideQrCode' :dialogClass="'qr-image-preview-dialog'">
      <div class="title-wrapper" slot="title">
        <mu-icon-button @click='hideQrCode' class="close-btn">
          <i class="fa fa-times"></i>
        </mu-icon-button>
      </div>
      <div class="content" slot="default">
          <vue-qr  :logoSrc="$store.state.userInfo.avatar"
                   :text="url"
                   slog="body"
                   :logoMargin="5"
                   :size="240"
                   :margin="0"
                   class="qrimage-wrapper mfp-img img-responsive"
                   :dotScale="1" />
      </div>
    </mu-dialog>
  </div>
</template>
<script>
  import eventUtil from 'src/utils/eventUtil'
  import VueQr from 'vue-qr'

  export default {
    components: {VueQr},
    props: {
      agent: {
        type: [String, Number]
      }
    },
    data () {
      return {
        url: '',
        qrIsShow: false
      }
    },
    created () {
      this.getUrlByAccount(this.agent)
    },
    methods: {
      copy () {
        if (eventUtil.copy(this.url)) {
          this.toastr.info(this.$t('agentActivity.copySuccess'))
        } else {
          this.toastr.error(this.$t('marketingMaterial.unsupportCopy'))
        }
      },
      getUrlByAccount (id) {
        let tmp = this.$store.state.agentAccounts.filter((mt4) => {
          return mt4.mt4_id === id
        })
        this.url = tmp && tmp.length > 0 ? tmp[0].agent_url : ''
      },
      showQrCode () {
        this.qrIsShow = true
      },
      hideQrCode () {
        this.qrIsShow = false
      }
    },
    watch: {
      agent (val) {
        this.getUrlByAccount(val)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";

  .title {
    h4 {
      padding-bottom: 0px;
      padding-top: 0px;
      white-space: nowrap;
    }

  }
  .title, .url {
    vertical-align: middle;
  }
  @media only screen and (max-width: 767px) {
    .img-container{
      display: flex;
      justify-content: center;
    }
  }


  .qrimage-wrapper{

    width:260px;
    height: 260px;;
    padding: 10px;
    background-color: #fff;
  }
</style>
