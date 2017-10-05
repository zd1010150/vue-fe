<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="col-lg-12 deposite-methods">
    <section class="methods bankTransfer" v-if="Object.keys(gateWays.bankTransfer).length > 0">
      <h4 class="text-dark">{{ $t('payMentMethod.bankTransfer')}}</h4>
      <div class="row">
        <template  v-for="(value,key) in gateWays.bankTransfer">
          <div class="methods-wrapper">
            <payment-method :value="value.code" 
                            :bgUrl="value.logo" 
                            :title="value.name"
                            :isActive="value.isActive"
                            type="bankTransfer" 
                            @chosePaymentMethod="chosePaymentMethod">
            </payment-method>
          </div>
        </template>
      </div>
    </section>
    <section class="methods cards" v-if="Object.keys(gateWays.cards).length > 0">
      <h4 class="text-dark">{{ $t('payMentMethod.cards')}}</h4>
      <div class="row">
        <template  v-for="(value,key) in gateWays.cards">
          <div class="methods-wrapper">
            <payment-method :value="value.code" 
                            :bgUrl="value.logo" 
                            :title="value.name"
                            :isActive="value.isActive"
                            type="cards"  
                            @chosePaymentMethod="chosePaymentMethod">
            </payment-method>
          </div>
        </template>
      </div>
    </section>
    <section class="methods e-wallet" v-if="Object.keys(gateWays.eWallet).length > 0">
      <h4 class="text-dark">{{ $t('payMentMethod.eWallet')}}</h4>
      <div class="row">
        <template  v-for="(value,key) in gateWays.eWallet">
          <div class="methods-wrapper">
            <payment-method :value="value.code" 
                            :bgUrl="value.logo" 
                            :title="value.name"
                            :isActive="value.isActive" 
                            type="eWallet" 
                            @chosePaymentMethod="chosePaymentMethod">
            </payment-method>
          </div>
        </template>
      </div>
    </section>
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
        gateWays:{
          cards:{},
          eWallet:{},
          bankTransfer:{}
        }
      }
    },
    components: {
      'payment-method': method
    },
    methods: {
      chosePaymentMethod(code,type){
        this.$set(this.gateWays[this.previousMethod.type][this.previousMethod.code],"isActive",false)
        this.$set(this.gateWays[type][code],"isActive",true)
        
        this.previousMethod = Object.assign({},this.gateWays[type][code])

        this.$emit('chosePaymentMethod', code,this.gateWays[type][code].name)
      },
      mapData(data){
        for(let key in data){
          let methods = data[key]
          Object.keys(methods).forEach((innerKey)=>{
            Object.assign(methods[innerKey],{ 
              isActive:innerKey== defaultMethod.code,
              code:innerKey 
            })
          })
          this.$set(this.gateWays,key,methods)
        }
      },
      setDefaultMethod(){
        this.previousMethod = defaultMethod
        this.$emit('chosePaymentMethod', defaultMethod.code,this.gateWays[defaultMethod.type][defaultMethod.code].name)
      },
      async fetchPaymentMethods(){
          let {data,success,message} = await fundsService.getDepositeMethod(this.$store.state.language)
            if(success){
              this.mapData(data)
              this.setDefaultMethod()
           }
        }
      },
    created() {
      this.fetchPaymentMethods()
    },
    watch:{
      '$store.state.language' : function(val){
        this.fetchPaymentMethods()
      }
    }
  }
</script>
<style lang="less">
@import "~assets/less/variable.less";
  .methods-wrapper{
    width:25%;
    float:left;
  }
@media(max-width:@screen-sm-min){
  .methods-wrapper{
    width:50%;
  }
}
</style>

