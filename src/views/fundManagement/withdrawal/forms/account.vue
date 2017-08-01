<template lang="html">

      <form slot="body" class="form-horizontal form-bordered " method="POST"  target="_blank" ref="accountForm">
       <div class="form-group" :class="errorClass('MT4')">
          <label class="control-label col-md-3">MT4 | Balance</label>
          <div class="col-md-6" >
            <chp-select v-model="model.mt4_id" v-validate="'required'" data-vv-value-path="model.mt4_id" name="mt4_id">
              <template v-for="mt4 in MT4">
                <mu-menu-item :value="mt4.id" :title="mt4.text" key="mt4.id"/>
              </template>
            </chp-select>
             <span slot="required" class="error" v-if="errors.has('MT4:required')">{{errors.first('MT4:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('deposit_pay')">
          <label class="control-label col-md-3">Amount({{baseCurrency}})</label>
          <div class="col-md-6">
            <mu-text-field v-model="model.order_amount"  v-validate="'required|positiveFloatMoney'" data-vv-value-path="model.order_amount" data-vv-name="withdraw_pay" data-vv-validate-on="blur" class="form-control"   :fullWidth="true" name="order_amount" />
            
            <span slot="required" class="error" v-if="errors.has('withdraw_pay:required')">{{errors.first('withdraw_pay:required')}}</span>
            <span slot="required" class="error" v-if="errors.has('withdraw_pay:positiveFloatMoney')">{{errors.first('withdraw_pay:positiveFloatMoney')}}</span>
            
            <span slot="required" class="error" v-if="errors.has('deposit_pay:moneyRange')">{{errors.first('deposit_pay:moneyRange')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('MT4')">
          <label class="control-label col-md-3">Methods</label>
          <div class="col-md-6" >
            <chp-select v-model="model.method" v-validate="'required'" data-vv-value-path="model.mt4_id" name="method">
              <template v-for="m in methods">
                <mu-menu-item :value="m" :title="m.text" key="m.id"/>
              </template>
            </chp-select>
             <span slot="required" class="error" v-if="errors.has('MT4:required')">{{errors.first('MT4:required')}}</span>
          </div>
        </div>
        <div class="form-group" :class="errorClass('MT4')">
          <label class="control-label col-md-3">Account</label>
          <div class="col-md-6" >
            <chp-select v-model="model.mt4_id" v-validate="'required'" data-vv-value-path="model.mt4_id" name="mt4_id">
              <template v-for="mt4 in MT4">
                <mu-menu-item :value="mt4.id" :title="mt4.text" key="mt4.id"/>
              </template>
            </chp-select>
             <span slot="required" class="error" v-if="errors.has('MT4:required')">{{errors.first('MT4:required')}}</span>
          </div>
        </div>
		<div class="form-group" :class="errorClass('deposit_pay')">
          <label class="control-label col-md-3">Fee({{baseCurrency}})</label>
          <div class="col-md-6">
            <mu-text-field v-model="fee" class="form-control"   :fullWidth="true" name="order_amount" :disabeld="true"/>
          </div>
        </div>
      </form> 

</template>

<script>
import mt4Service from "services/mt4Service"
import validateMixin from 'mixins/validatemix'
 
  
export default {
	data(){
      return {
        MT4 : null,
        methods: null,
        accounts:null,
        baseCurrency: "",
        fee:"",
        model : {
          mt4_id : "",
          order_amount: "",
          bank_code:"",
          method:""
        }
      }
    },
    methods:{
    	async fetchMethodsAccounts(){

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
            return {success,data,message};
    	}
    },
    created(){
    	this.$emit("loading",true);
    	let self = this;
    	Promise.all([this.fetchMT4(),this.fetchMethodsAccounts()]).then(function(){
            self.$emit("loading",false);
          });
    }
  }
</script>

