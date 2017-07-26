<i18n src="./i18n.yaml"></i18n>
<template>
  <div>
    <template v-for="(value,key) in methods">
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 flex-container content-center">
      
        <payment-method :value="key" :bgUrl="value.bgUrl" :title="value.title"
                        :isActive="value.isActive" @chosePaymentMethod="chosePaymentMethod"></payment-method>
      
      </div>
    </template>

  </div>
</template>
<script>
  import method from "./method.vue"
  export default{
    data(){
      return {
        previousMethod:"",
        methods: {
          unionPay: {
            title: this.$t('payMentMethod.unionPay'),
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          wireTransfer: {
            title: this.$t('payMentMethod.wireTransfer'),
            bgUrl: "/static/images/wticon.png",
            isActive: false
          },
          fasaPay: {
            title: this.$t('payMentMethod.fasapay'),
            bgUrl: "/static/images/fasapay_logo.png",
            isActive: false
          }, doku: {
            title: this.$t('payMentMethod.doku'),
            bgUrl: "/static/images/doku.png",
            isActive: false
          }
        }
      }
    },
    components: {
      'payment-method': method
    },
    computed: {},
    mounted(){
      this.previousMethod = "unionPay";
    },
    methods: {
      chosePaymentMethod(method){
        this.methods[this.previousMethod].isActive=false;
        this.methods[method].isActive=true;
        this.previousMethod = method;
        this.$emit('chosePaymentMethod', method);
      }
    }
  }
</script>

