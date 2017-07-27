<template>
	<chp-panel :canCollapse="false" :canClose="false">
    <template slot="title">unionPay</template>
     <form slot="body" class="form-horizontal form-bordered">
        <div class="form-group">
          <label class="control-label col-md-3">MT4 | Balance</label>
          <div class="col-md-6">
            <chp-select v-model="model.mt4_id" v-validate="'required'" data-vv-value-path="model.mt4_id" name="MT4" :class="errorClass('MT4')">
              <template v-for="mt4 in MT4">
                <mu-menu-item :value="mt4.id" :title="mt4.text" key="mt4.id"/>
              </template>
            </chp-select>
             <span slot="required" class="error" v-if="errors.has('MT4:required')">{{errors.first('MT4:required')}}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-3">Amount(USD)</label>
          <div class="col-md-6">
            <mu-text-field v-model="model.order_amount"  v-validate="'required|positiveFloatMoney'" data-vv-value-path="model.order_amount" data-vv-name="positiveFloatMoney" class="form-control"   :fullWidth="true" :class="errorClass('positiveFloatMoney')"/>
            <span>{{baseCurrency}}</span>
            <span slot="required" class="error" v-if="errors.has('positiveFloatMoney:required')">{{errors.first('positiveFloatMoney:required')}}</span>
            <span slot="required" class="error" v-if="errors.has('positiveFloatMoney:positiveFloatMoney')">{{errors.first('positiveFloatMoney:positiveFloatMoney')}}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-3">Bank</label>
          <div class="col-md-6">
            <chp-select v-model="model.bank_code" v-validate="'required'" data-vv-value-path="model.bank_code" data-vv-name="bank" :class="errorClass('bank')">
              <template v-for="b in banks">
                <mu-menu-item :value="b.code" :title="b.title" key="b.code"/>
              </template>
            </chp-select>
            <span slot="required" class="error" v-if="errors.has('bank:required')">{{errors.first('bank:required')}}</span>
          </div>
        </div>
     </form> 
    <div class="row" slot="footer">
      <div class="col-md-6 col-md-offset-3" >
          <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="submit">
            <i class="fa fa-check hidden-sm hidden-xs"></i> {{ $t('ui.button.pay') }}
          </chp-button>
          <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="cancel">
           <i class="fa fa-times hidden-sm hidden-xs"></i> {{ $t('ui.button.cancel') }}
          </chp-button>
      </div>
    </div>
  </chp-panel>
</template>
<script>
  import mt4Service from "services/mt4Service"
  import bankService from "services/bankService"
  import fundsService from "services/fundsService"
  import validateMixin from 'mixins/validatemix.js'
	export default{
    mixins:[validateMixin],
		data(){
      return {
        MT4 : [],
        banks: [],
        baseCurrency: "",
        model : {
          mt4_id : "",
          order_amount: "",
          bank_code:""
        }
      }
    },
    props:{
      methodCode:{
        type:String
      }
    },
    methods:{
      async submit(){
        try{
            let validateResult = await this.$validator.validateAll();
            if(validateResult){
              let {data,success,message} = await fundsService.depositeFunds(this.model);
              if(success){
                this.toastr.info(this.$t("info.SUCCESS"));
              }else{
                throw new Error(message);
              }
            }
        }catch(error){
          this.toastr.error(this.$t("info."+error.message));
        }
      },
      cancel(){
        this.model.order_amount = "";
      },
      async fetchMT4(){
         try{
            let {success,data,message} = await mt4Service.getMT4Account();
            if(success && data ){
              this.MT4 = data.map((mt4)=>{
                return {
                  id:mt4.mt4_id,
                  text:"#"+mt4.mt4_id+" | "+mt4.balance,
                  baseCurrency:mt4.base_currency
                }
              });
            }else{
              throw Error(message);
            }
          }catch(error){
            this.toastr.error(this.$t("info."+error.message));
        }
      },
      async fetchBankCard(){
          try{
            let {success,data,message} = await bankService.getBank();
            if(success && data ){
              this.banks = data;
            }else{
              throw Error(message);
            }
          }catch(error){
            this.toastr.error(this.$t("info."+error.message));
        }
      }
    },
    created(){
      this.fetchMT4();
      this.fetchBankCard(); 
    },
    mounted(){
      
    },
    watch:{
      'model.mt4_id' : function(val,oldVal){
        if(val == oldVal){return}
          else{
            this.baseCurrency = this.MT4.filter(mt4 => {
              return mt4.id == val;
            }).baseCurrency;
          }
      }
    }
	}
</script>