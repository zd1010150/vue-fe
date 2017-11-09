<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="row pb-lg">
    <div class="col-lg-12 col-md-12" v-if="url">
      <table>
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
  </div>
</template>
<script>
  import eventUtil from 'src/utils/eventUtil'

  export default {
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

</style>
