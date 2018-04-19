<template>

  <bank-account-china-cup v-else-if="method == ALL_METHODS.CUP"
                          :method="method"
                          :editObj="editObj"
                          :branchObj="branchObj"
                          :ref="ALL_METHODS.CUP"
                          @refresh="refresh"/>

</template>

<script>
  import CUP from './chinaCup.vue'

  export default {
    components: {
      'bank-account-china-cup': CUP
    },
    props: {
      method: String,
      editObj: Object,
      branchObj: Object
    },
    data () {
      return {
        ALL_METHODS: {
          CUP: 'CUP'
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
