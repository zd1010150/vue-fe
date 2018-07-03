<template>
  <div class="container-fluid">
    <template v-for="(mt4,index) in accounts">
      <mt4 :account="mt4" :key="index" :ref="'mt4'+index" :order="index" @collapsePanel="collapsePanel"></mt4>
    </template>
  </div>
</template>
<script>
  import mt4 from './mt4'
  import mt4Service from 'services/mt4Service'
  import _ from 'lodash'

  export default {
    data () {
      return {
        previousOrder: 0,
        accounts: this.$store.state.mt4Accounts
      }
    },
    components: {
      'mt4': mt4
    },
    async mounted () {
      const disabledAccounts = await this.getAllDisabledAccount()
      if (this.$store.state.mt4Accounts.length > 0) {
        let noAgentIndex
        this.$store.state.mt4Accounts.filter((account, index) => {
          if (account.account_type !== 'Agent' && (noAgentIndex === undefined)) {
            noAgentIndex = index
          }
        })
        if (this.$store.state.mt4Accounts && this.$store.state.mt4Accounts.length > 0) {
          this.$refs['mt4' + (noAgentIndex === undefined ? 0 : noAgentIndex)][0].open()
          this.previousOrder = noAgentIndex
        }
      }
      this.accounts = this.$store.state.mt4Accounts.concat(disabledAccounts)
    },
    methods: {
      collapsePanel (order, isOpen) {
        if (isOpen && order !== this.previousOrder) {
          this.$refs['mt4' + this.previousOrder][0].close()
          this.previousOrder = order
        }
      },
      async getAllDisabledAccount () {
        const disabledAccounts = await mt4Service.getAllDiabledAccount()
        if (disabledAccounts.success) {
          if (!_.isEmpty(disabledAccounts.data)) {
            return disabledAccounts.data.map(account => Object.assign({}, account, {disabled: true}))
          }
        }
        return []
      }
    }
  }
</script>
