<template>
  <bank-account-cup v-if="method == ALL_METHODS.CUP"
                    :method="method"
                    :editObj="editObj"
                    :ref="ALL_METHODS.CUP"
                    @refresh="refresh"/>
  <bank-account-credit v-else-if="method == ALL_METHODS.CREDIT"
                       :method="method"
                       :editObj="editObj"
                       :ref="ALL_METHODS.CREDIT"
                       @refresh="refresh"/>
  <bank-account-fasa v-else-if="method == ALL_METHODS.FASA"
                     :method="method"
                     :editObj="editObj"
                     :ref="ALL_METHODS.FASA"
                     @refresh="refresh"/>
  <bank-account-doku v-else-if="method == ALL_METHODS.DOKU"
                     :method="method"
                     :editObj="editObj"
                     :ref="ALL_METHODS.DOKU"
                     @refresh="refresh"/>

</template>
<script>
  import cup from './cup'
  import credit from './credit'
  import fasa from './fasa'
  import doku from './doku'

  export default {
    components: {
      'bank-account-cup': cup,
      'bank-account-credit': credit,
      'bank-account-fasa': fasa,
      'bank-account-doku': doku
    },
    props: {
      method: String,
      editObj: Object
    },
    data () {
      return {
        ALL_METHODS: {
          CREDIT: 'CREDIT',
          CUP: 'CUP',
          DOKU: 'DOKU',
          FASA: 'FASA'
        }
      }
    },
    methods: {
      submit () {
        this.$refs[this.ALL_METHODS[this.method]].submit()
      },
      refresh () {
        this.$emit('refresh')
      }
    }
  }
</script>
<style lang="less">
  .dropFileArea {
    max-height: 300px;
    min-height: 30px;
    width: 100%;
    height: auto;
    overflow: auto;
    .file-uploads {
      width: 100%;
    }
  }
</style>
