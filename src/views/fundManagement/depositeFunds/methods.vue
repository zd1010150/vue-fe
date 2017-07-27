<i18n src="./i18n.yaml"></i18n>
<template>
  <div class="col-lg-12 deposite-methods">
    <template v-for="(value,key) in methods">
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 flex-container content-center">
      
        <payment-method :value="key" :bgUrl="value.bgUrl" :title="value.title"
                        :isActive="value.isActive" :methodCode="value.code " @chosePaymentMethod="chosePaymentMethod"></payment-method>
      
      </div>
    </template>

  </div>
</template>
<script>
  import method from "./method.vue"
  import fundsService from "services/fundsService"
  export default{
    data(){
      return {
        previousMethod:"",
        methods: {
          unionPay_DD: {
            title: this.$t('payMentMethod.unionPay'),
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_HB: {
            title: this.$t('payMentMethod.unionPay'),
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_AN: {
            title: this.$t('payMentMethod.unionPay'),
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_HD: {
            title: this.$t('payMentMethod.unionPay'),
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_ZL: {
            title: this.$t('payMentMethod.unionPay'),
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_AZF: {
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
          }, 
          doku: {
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
      this.previousMethod = "wireTransfer";
      this.methods[this.previousMethod].isActive = true;
    },
    methods: {
      chosePaymentMethod(method,methodCode){
        this.methods[this.previousMethod].isActive=false;
        this.methods[method].isActive=true;
        this.previousMethod = method;
        this.$emit('chosePaymentMethod', method,methodCode);
      },
      async fetchPaymentMethods(){
        try{
              let {data,success,message} = await fundsService.getDepositeMethod(this.$store.state.language);
              if(success){
                Object.assign(this.methods,data);
              }else{
                throw new Error(message);
              }
        }catch(error){
          this.toastr.error(this.$t("info."+error.message));
        }
      }
    },
    created() {
      this.fetchPaymentMethods();
    }
  }
</script>

