<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="row  mt4-select-row pb-lg">
    <div class="col-md-12 col-lg-12">
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 pl-none">
        <span class="mt4-title">{{ $t('agnetNo') }}</span>
        <mu-flat-button class="select-mt4" :class="{'open' : open}" ref="selectMT4" @click="toggle"
                        href="javascript:void(0)">
          <strong class="amount mt4 text-dark">{{agent}}</strong>
          <i class="fa custom-caret"></i>
        </mu-flat-button>
        <mu-popover :trigger="trigger" :open="open" @close="handleCloseAgentList">
          <mu-menu @change="change">
            <template v-for='m in MT4'>
              <mu-menu-item :value='m.mt4_id' :title="m.mt4_id + ''" :key="Math.random()"></mu-menu-item>
            </template>
          </mu-menu>
        </mu-popover>
      </div>
      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 pl-none pr-none ">
        <table class="total-table ">
          <tr>
            <td> {{ $t('availabelCommissions') }}：</td>
            <td>{{ $t('totalClientBalance') }}：</td>
            <td>{{ $t('trade.totalClient') }}：</td>
          </tr>
          <tr class="number">
            <td>
              <strong class="lead text-dark">{{model.balance}}</strong>
              <span>{{model.baseCurrency}}</span>
            </td>
            <td>
              <strong class="lead text-dark">{{ model.totalBalance}} </strong>
            </td>
            <td>
              <strong class="lead text-dark">{{ model.totalClient }}</strong>
              <span>{{ $t('trade.traderUnit') }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import tradeService from 'services/tradeService'

  export default {
    data () {
      return {
        trigger: null,
        open: false,
        MT4: [],
        agent: '',
        model: {
          totalBalance: 0,
          balance: 0,
          baseCurrency: '',
          totalClient: 0
        }
      }
    },
    methods: {
      change (val) {
        this.agent = val
        this.open = false
      },
      toggle () {
        this.open = !this.open
      },
      async fetchBalanceAndTotal () {
        let {success, data} = await tradeService.getAgentTotalClientsAndBalance(this.agent)
        if (success) {
          let {balance, traders} = data
          this.model = Object.assign({}, this.model, {
            totalBalance: balance,
            totalClient: traders
          })
        }
      },
      handleCloseAgentList () {
        this.open = false
      }
    },
    watch: {
      agent: function (val, oldVal) {
        let tmp = this.MT4.map((mt4) => {
          if (mt4.mt4_id === val) {
            return {
              balance: mt4.balance,
              baseCurrency: mt4.base_currency
            }
          }
        })
        this.model = Object.assign({}, this.model, tmp.length > 0 ? tmp[0] : {balance: 0, baseCurrency: ''})
        this.fetchBalanceAndTotal()
        this.$emit('agentChange', val)
      },
      'model.totalClient': function (val) {
        this.$emit('totalClients', val)
      }
    },
    created () {
      this.MT4 = this.$store.state.agentAccounts
      this.agent = this.MT4.length > 0 ? this.MT4[0].mt4_id : ''
    },
    mounted () {
      this.trigger = this.$refs.selectMT4.$el
    }

  }
</script>
<style lang="less">
  @import "~assets/less/variable.less";
  @import "~assets/less/transition.less";

  .mt4-select-row {
    .mt4-title {
      font-size: 2.0rem;
      vertical-align: middle;
    }
    .select-mt4 {
      &.open {
        .fa {
          transform: rotate(180deg) translate3D(0, 0, 0)
        }
      }
      &:hover {
        text-decoration: none;
        color: @blue-color !important;
        background-color: transparent;
      }
      vertical-align: middle;
      strong.mt4 {
        font-size: 2.4rem;
      }
      .fa {
        transition: @arrow-rotate-transition;
        display: inline-block;
        margin-left: 20px;
        width: 10px;
        height: 10px;
        font-size: 16px;
        font-weight: bold;
        &:before {
          content: "\f107";
        }
      }
    }
    .total-table {
      float: right;
      width: 100%;
      td {
        width: 33.333%;
        text-align: left;
        padding: 0px 0px;
      }
      .number {
        td {
          text-align: left;

        }
      }
    }
  }

  @media (max-width: @screen-sm-min) {
    .mt4-select-row {
      .total-table {
        float: left;
        padding-top: 10px;
      }
    }
  }

</style>
