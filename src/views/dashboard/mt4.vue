<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="col-lg-6 col-md-6 col-xs-12">
    <chp-panel :canCollapse="false" :canClose="false" class="dashbord-fix-height-panel">
      <template slot="panelTitle">MT4
        <chp-view-all href="#/account-management/my-trading-account"></chp-view-all>
      </template>
      <template slot="body">
        <div class="operater pull-right pb-sm ">
          <chp-button classes="btn-success  btn-sm mr-sm pl-lg pr-lg" href="#/fund-manager/deposite-funds">
            <i class="fa fa-money" aria-hidden="true"></i>
            {{ $t('fund.deposit') }}
          </chp-button>
          <chp-button classes="btn-danger btn-sm pl-lg pr-lg" href="#/fund-manager/withdrawal">
            <i class="fa fa-credit-card" aria-hidden="true"></i>
            {{ $t('fund.withdraw') }}
          </chp-button>
        </div>
        <table class="table mb-none">
          <thead>
          <tr>
            <th>{{ $t('account.account') }}</th>
            <th>{{ $t('account.type') }}</th>
            <th>{{ $t('account.balance') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(t,index) in accounts" :key="index">
            <td>{{ t.mt4_id }}</td>
            <td>{{ t.account_type }}</td>
            <td> <chp-money :money="t.balance"/></td>
          </tr>
          </tbody>
        </table>
      </template>
    </chp-panel>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        accounts: this.$store.state.mt4Accounts.slice(0, 4)
      }
    },
    watch: {
      '$store.state.mt4Accounts' () {
        this.accounts = this.$store.state.mt4Accounts.slice(0, 4)
      }
    }
  }
</script>
