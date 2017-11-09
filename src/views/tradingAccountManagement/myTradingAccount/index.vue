<template>
  <div class="container-fluid">
    <template v-for="(mt4,index) in $store.state.mt4Accounts">
      {{ 'mt4'+index }}
      <mt4 :account="mt4" :key="index" :ref="'mt4'+index" :order="index" @collapsePanel="collapsePanel"></mt4>
    </template>
  </div>
</template>
<script>
  import mt4 from './mt4'

  export default {
    data () {
      return {
        previousOrder: 0
      }
    },
    components: {
      'mt4': mt4
    },
    mounted () {
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
    },
    methods: {
      collapsePanel (order, isOpen) {
        if (isOpen && order !== this.previousOrder) {
          this.$refs['mt4' + this.previousOrder][0].close()
          this.previousOrder = order
        }
      }
    }
  }
</script>
