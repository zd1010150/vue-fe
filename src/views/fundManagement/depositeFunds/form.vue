<template>
  <div class="col-lg-12 col-md-12">

    <form-doku v-if="noAccountAndBank.indexOf(methodCode) > -1" :methodCode="innerMethodCode"
               :methodName="innerMethodName"></form-doku>
    <form-fasa-pay v-else-if="methodCode == 'fasa'" :methodCode="innerMethodCode"
                   :methodName="innerMethodName"></form-fasa-pay>
    <form-cards v-else-if="cards.indexOf(methodCode) > -1" :methodCode="innerMethodCode"
                :methodName="innerMethodName"></form-cards>
    <form-wire-transfer v-else-if="methodCode == 'bankwire'" :methodName="innerMethodName"></form-wire-transfer>
    <form-bank-transfer v-else-if="methodCode == 'inlbt'" :methodName="innerMethodName"></form-bank-transfer>
  </div>
</template>
<script>
  import doku from './forms/doku.vue'
  import fasaPay from './forms/fasaPay'
  import cards from './forms/cards'
  import wireTransfer from './forms/wireTransfer'
  import bankTransfer from './forms/bankTransfer'

  export default {
    data () {
      return {
        innerMethodCode: this.methodCode,
        innerMethodName: this.methodName,
        noAccountAndBank: ['doku', 'inskr', 'invis', 'inmas'],
        cards: ['dd', 'hb', 'an', 'hd', 'zl', 'azf', 'hby', 'rpn']//和unionpay的
      }
    },
    props: {
      methodCode: {
        type: String,
        required: true
      },
      methodName: {
        type: String
      }

    },
    components: {
      'form-doku': doku,
      'form-fasa-pay': fasaPay,
      'form-cards': cards,
      'form-wire-transfer': wireTransfer,
      'form-bank-transfer': bankTransfer
    },
    watch: {
      methodCode (val) {
        this.innerMethodCode = val
      },
      methodName (val) {
        this.innerMethodName = val
      }
    }
  }
</script>
