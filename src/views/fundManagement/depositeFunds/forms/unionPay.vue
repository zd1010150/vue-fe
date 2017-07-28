<template>
	<chp-panel :canCollapse="false" :canClose="false">
    <template slot="title">unionPay</template>
     <form slot="body" class="form-horizontal form-bordered">
        <div class="form-group" :class="errorClass('MT4')">
          <label class="control-label col-md-3">MT4 | Balance</label>
          <div class="col-md-6" >
            <chp-select v-model="model.mt4_id" v-validate="'required'" data-vv-value-path="model.mt4_id" name="MT4" >
              <template v-for="mt4 in MT4">
                <mu-menu-item :value="mt4.id" :title="mt4.text" key="mt4.id"/>
              </template>
            </chp-select>
             <span slot="required" class="error" v-if="errors.has('MT4:required')">{{errors.first('MT4:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('positiveFloatMoney')">
          <label class="control-label col-md-3">Amount({{baseCurrency}})</label>
          <div class="col-md-6">
            <mu-text-field v-model="model.order_amount"  v-validate="'required|positiveFloatMoney'" data-vv-value-path="model.order_amount" data-vv-name="positiveFloatMoney" data-vv-validate-on="input|blur" class="form-control"   :fullWidth="true"  />
            
            <span slot="required" class="error" v-if="errors.has('positiveFloatMoney:required')">{{errors.first('positiveFloatMoney:required')}}</span>
            <span slot="required" class="error" v-if="errors.has('positiveFloatMoney:positiveFloatMoney')">{{errors.first('positiveFloatMoney:positiveFloatMoney')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('bank')">
          <label class="control-label col-md-3">Bank</label>
          <div class="col-md-6">
            <chp-select v-model="model.bank_code" v-validate="'required'" data-vv-value-path="model.bank_code" data-vv-name="bank">
              <template v-for="(value,key) in banks">
                <mu-menu-item :value="key" :title="value" key="key"/>
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
        MT4 : null,
        banks: null,
        baseCurrency: "",
        model : {
          mt4_id : "",
          order_amount: "",
          bank_code:"",
          gateWayCode:this.methodCode
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
        let validateResult = await this.$validator.validateAll();
          if(validateResult){
            let {data,success,message} = await fundsService.depositeFunds(this.model);
            if(success){
              this.toastr.info(this.$t("info.SUCCESS"));
            }
          }
        
      },
      cancel(){
        this.model.order_amount = "";
      },
      async fetchMT4(){
         let {success,data,message} = await mt4Service.getMT4Account();
            if(success && data ){
              this.MT4 = data.map((mt4)=>{
                return {
                  id:mt4.mt4_id,
                  text:"#"+mt4.mt4_id+" | "+mt4.balance,
                  baseCurrency:mt4.base_currency
                }
              });
              this.$set(this.model,"mt4_id",this.MT4[0].id)
            }
      },
      async fetchBank(){
        let {success,data,message} = await bankService.getBank(this.methodCode);
            if(success && data ){
              let firstKey = "",flag = false
              for(let key in data){
                if(!flag){
                  firstKey = key;
                  flag=true;
                }
                this.banks = Object.assign({},this.banks,data);//一定要创建一个新对象，
             }
              this.$set(this.model,"bank_code",firstKey)
            }
        }
    },
    created(){
      if(this.methodCode){//需要加入条件判断，
          this.fetchMT4();
          this.fetchBank(); 
      }
    },
    watch:{
      'model.mt4_id' : function(val,oldVal){
        if(val == oldVal){return}
          else{
            let currency = this.MT4.filter(mt4 => {
              return mt4.id == val;
            });
            this.baseCurrency = currency[0].baseCurrency;
          }
      }
    }
	}
</script>