<template>
  <span> {{ formatMoney }}</span>
</template>
<script>
  import mathUtil from 'utils/mathUtil'

  export default {
    data () {
      return {
        formatMoney: mathUtil.getFormatMoney(Number(this.money))
      }
    },
    props: {

      money: [Number, String]
    },
    watch: {
      money: function (val, oldVal) {
        this.formatMoney = mathUtil.getFormatMoney(val)
      }

    }

  }
</script>
