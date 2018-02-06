<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="row pb-lg">
    <div class="col-lg-5 col-md-5" v-if="url">
      <table >
        <tr>
          <td class="title"><h4>{{ $t('agentActivity.agentUrl') }} :</h4></td>
          <td class="url pl-sm">
            <span class="text-dark">{{url}}</span>
          </td>
          <td class="btn-td">
            <chp-button class=" ml-xs btn btn-primary print-btn" @click="copy()">
              {{ $t('agentActivity.copyAgentUrl') }}
            </chp-button>

          </td>
        </tr>
      </table>
    </div>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 img-container">
      <vue-qr  :logoSrc="$store.state.userInfo.avatar"
               :text="url"
               :logoMargin="5"
               :size="140"
               :margin="0"
               class="qrimage-wrapper"
               :dotScale="1"></vue-qr>
    </div>
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
        url: ''
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

  .title {
    h4 {
      padding-bottom: 0px;
    }

  }

  .btn-td {
    width: 60px;
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

    width: 160px;
    height: 160px;;
    padding: 10px;
    background-color: #fff;
  }
</style>
