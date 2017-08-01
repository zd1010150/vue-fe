<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="col-lg-12 deposite-methods">
  <template  v-for="(value,key) in gateWays">
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 flex-container content-center">
      
        <payment-method :value="key" :bgUrl="value.bgUrl" :title="value.title"
                        :isActive="value.isActive" :methodCode="value.code " @chosePaymentMethod="chosePaymentMethod">
        </payment-method>
      </div>
    </template>
  </div>
</template>
<script>
  import method from "./method.vue"
  import fundsService from "services/fundsService"
  import { DEFAULT_PAY_GATEWAY as defaultMethod } from 'src/config/app.config.js'
  export default{
    data(){
      return {
        previousMethod:"",
        allGateWays: {
          unionPay_DD: {
            title: "",
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_HB: {
            title: "",
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_AN: {
            title: "",
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_HD: {
            title: "",
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_ZL: {
            title: "",
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          unionPay_AZF: {
            title: "",
            bgUrl: "/static/images/Union-pay-icon.png",
            isActive: false
          },
          wireTransfer: {
            title: "",
            bgUrl: "/static/images/wticon.png",
            isActive: false
          },
          fasaPay: {
            title: "",
            bgUrl: "/static/images/fasapay_logo.png",
            isActive: false
          }, 
          doku: {
            title: "",
            bgUrl: "/static/images/doku.png",
            isActive: false
          }
        },
        defaultGateWays:{
          wireTransfer: {
            title: this.$t("payMentMethod.wireTransfer"),
            bgUrl: "/static/images/wticon.png",
            isActive: true,
            code:""
          }
        },
        gateWays:{}
      }
    },
    components: {
      'payment-method': method
    },
    computed: {},
    mounted(){
      this.previousMethod = defaultMethod.key;
      this.$emit('chosePaymentMethod', defaultMethod.key,defaultMethod.code);
    },
    methods: {
      chosePaymentMethod(method,methodCode){
        this.gateWays[this.previousMethod].isActive=false;
        this.gateWays[method].isActive=true;
        this.previousMethod = method;
        this.$emit('chosePaymentMethod', method,methodCode);
      },
      async fetchPaymentMethods(){
          let {data,success,message} = await fundsService.getDepositeMethod(this.$store.state.language);
            if(success){
              this.gateWays = Object.assign({},this.defaultGateWays);
              for(let method in data){
                this.$set(this.gateWays,method,Object.assign({},this.allGateWays[method],data[method]));
              }
           }
        }
      },
    created() {
      this.fetchPaymentMethods();
    },
    watch:{
      '$store.state.language' : function(val,oldVal){
          if(val !==oldVal){
            this.fetchPaymentMethods();
          }
      }
    }
  }
</script>

