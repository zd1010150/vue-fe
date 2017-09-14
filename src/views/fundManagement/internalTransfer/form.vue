<i18n src="../i18n.yaml"></i18n>
<template>
<div class="col-lg-12 col-md-12">
 <chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
  <template slot="title">{{ $t('internalTransfer.internalTransfer') }}</template>
  <form slot="body" class="form-horizontal form-bordered ">
    
    <div class="form-group" :class="errorClass('origin_login')">
      <label class="control-label col-md-3">{{ $t('internalTransfer.fromAccount') }}</label>
      <div class="col-md-6" >
        <chp-select v-model="model.origin_login" v-validate="'required'" data-vv-value-path="model.origin_login" data-vv-name="origin_login" >
          <template v-for="mt4 in originMt4">
            <mu-menu-item :value="mt4.id" :title="mt4.text" key="mt4.id"/>
          </template>
        </chp-select>
         <span slot="required" class="error" v-if="errors.has('origin_login:required')">{{errors.first('origin_login:required')}}</span>
      </div>
    </div>
    <div class="form-group" :class="errorClass('target_login')">
      <label class="control-label col-md-3">{{ $t('internalTransfer.toAccount') }}</label>
      <div class="col-md-6" >
        <chp-select v-model="model.target_login" v-validate="'required'" data-vv-value-path="model.target_login" data-vv-name="target_login" >
          <template v-for="mt4 in targetMt4">
            <mu-menu-item :value="mt4.id" :title="mt4.text" key="mt4.id"/>
          </template>
        </chp-select>
         <span slot="required" class="error" v-if="errors.has('target_login:required')">{{errors.first('target_login:required')}}</span>
      </div>
    </div>
    <div class="form-group" :class="errorClass('money')">
      <label class="control-label col-md-3">{{ $t('internalTransfer.amount') }} ({{baseCurrency}})</label>
      <div class="col-md-6">
        <mu-text-field v-model="model.money"  v-validate="'required|positiveFloatMoney'" data-vv-value-path="model.money" data-vv-name="money" data-vv-validate-on="blur" class="form-control"   :fullWidth="true" />
        
        <span slot="required" class="error" v-if="errors.has('money:required')">{{errors.first('money:required')}}</span>
        <span slot="required" class="error" v-if="errors.has('money:positiveFloatMoney')">{{errors.first('money:positiveFloatMoney')}}</span>
      </div>
    </div>
    <div class="form-group" :class="errorClass('terms')">
      <div class="col-md-9 col-md-offset-3">
        
        <chp-checkbox  name="terms" 
				        nativeValue="checkedIterms" 
				        v-model="checkedIterms" 
				        data-vv-value-path="checkedIterms" 
				        v-validate="'required'" 
				        data-vv-name="terms" 
				        data-vv-validate-on="input" 
				        type="checkbox"/>
        <span class="">{{ $t('internalTransfer.note')}}</span>
        <br>
        <span slot="required" class="error" v-if="errors.has('terms:required')">{{errors.first('terms:required')}}</span>
      </div>
    </div>
 </form> 
 <div class="row" slot="footer">
  <div class="col-md-6 col-md-offset-3 " >
      <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="submit" :disabled="disableSubmit">
        <i class="fa fa-check hidden-sm hidden-xs"></i> {{ $t('ui.button.submit') }}
      </chp-button>
      
  </div>
 </div>
 </chp-panel>
</div>
</template>
<script>
	import fundsService from 'services/fundsService'
	import validateMixin from 'mixins/validatemix'
	import loadingMix from 'mixins/loading'
	export default{
		mixins:[validateMixin,loadingMix],
		data(){
			return{
				checkedIterms:[],
				originMt4:null,
				originTargetMT4:null,
				originSrcMT4:null,
				targetMt4:null,
				disableSubmit:false,
				loadingStatus:false,
				baseCurrency:"",
				model:{
					origin_login:"",
					target_login:"",
					money:""
				}
			}
		},
		created(){
			this.fetchMT4()
		},
		watch:{
			'model.origin_login':function(id,oldId){
				this.baseCurrency = this.originSrcMT4.filter((mt4) =>{
					return mt4.id == id
				})[0].baseCurrency

				this.targetMt4 = this.originTargetMT4.filter((mt4) => {
					return mt4.id !== id 
				})
		    },
			'model.target_login':function(id){
				this.originMt4 = this.originSrcMT4.filter((mt4) => {
					return mt4.id !== id 
				})
			}
		},
		methods:{
			async submit(){
				this.disableSubmit = true
				let validateResult = await this.$validator.validateAll()
		          if(validateResult){
		            let {message,success,data} = await fundsService.internalTransferDeposite(this.model)
		            this.toastr.info(this.$t("info.SUCCESS"))
		          }
		        this.disableSubmit = false
			},
			fetchMT4(){
		        if(this.$store.state.mt4Accounts.length >= 2){
		        	this.originSrcMT4 = this.originMt4 = this.$store.state.mt4Accounts.map((mt4)=>{
		                return {
		                  id:mt4.mt4_id,
		                  text:"#"+mt4.mt4_id+" | "+mt4.balance,
		                  baseCurrency:mt4.base_currency
		                }
		              });
		            this.originTargetMT4 = this.targetMt4 = this.$store.state.traderAccounts.map((mt4)=>{
		                return {
		                  id:mt4.mt4_id,
		                  text:"#"+mt4.mt4_id+" | "+mt4.balance,
		                  baseCurrency:mt4.base_currency
		                }
		              });
		            this.$set(this.model,"origin_login",this.originMt4[0].id)
		        }else{
		        	this.toastr.error(this.$t("internalTransfer.errors.onlyOneAccount"))
		            this.disableSubmit = true
		        }
	        },
		}
	}
</script>