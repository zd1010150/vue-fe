outer<i18n src="../i18n.yaml"></i18n>
<template>
 	<div class="container-fluid" >
	    <div class="row">
	    	<div class="col-lg-12 col-md-12">
				<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
					 <template slot="panelTitle">{{ $t('applicationSubaccount.registerSubAccount')}}</template>
					 <form slot="body" class="form-horizontal form-bordered " ref="accountForm">
				        <div class="form-group" :class="errorClass('platForm')">
				          <label class="control-label col-md-3"> {{ $t("platForm")}} 
				            <span class="required" aria-required="true">*</span>
				          </label>
				          <div class="col-md-6" >
				            <chp-select v-model="model.plat_form" v-validate="'required'" data-vv-value-path="model.plat_form" name="platForm">
				              <template v-for="(p,index) in platForms">
				                <mu-menu-item :value="p.val" :title="p.title" key="index"/>
				              </template>
				            </chp-select>
				            
				            <span slot="required" class="error" v-if="errors.has('platForm:required')">{{errors.first('platForm:required')}}</span>
				          </div>
				        </div>
				        <div class="form-group" :class="errorClass('accountType')">
				          <label class="control-label col-md-3">{{ $t("accountType")}} 
				            <span class="required" aria-required="true">*</span>
				          </label>
				          <div class="col-md-6" >
				            <chp-select v-model="model.account_type" v-validate="'required'" data-vv-value-path="model.account_type" name="accountType">
				              <template v-for="(a,index) in accountTypes">
				                <mu-menu-item :value="a.val" :title="a.title" key="index"/>
				              </template>
				            </chp-select>
				            
				            <span slot="required" class="error" v-if="errors.has('accountType:required')">{{errors.first('accountType:required')}}</span>
				          </div>
				        </div>
				        <div class="form-group" :class="errorClass('lever')">
				          <label class="control-label col-md-3">{{ $t("leverage")}} 
				            <span class="required" aria-required="true">*</span>
				          </label>
				          <div class="col-md-6" >
				            <chp-select v-model="model.lever" v-validate="'required'" data-vv-value-path="model.lever" name="lever">
				              <template v-for="(l,index) in leverages">
				                <mu-menu-item :value="l.val" :title="l.title" key="index"/>
				              </template>
				            </chp-select>
				            
				            <span slot="required" class="error" v-if="errors.has('lever:required')">{{errors.first('lever:required')}}</span>
				          </div>
				        </div>
				        <div class="form-group" :class="errorClass('baseCurrency')">
				          <label class="control-label col-md-3">{{ $t("basecurrency")}} 
				            <span class="required" aria-required="true">*</span>
				          </label>
				          <div class="col-md-6" >
				            <chp-select v-model="model.base_currency" v-validate="'required'" data-vv-value-path="model.base_currency" name="baseCurrency">
				              <template v-for="(b,index) in baseCurrencies">
				                <mu-menu-item :value="b.val" :title="b.title" key="index"/>
				              </template>
				            </chp-select>
				            
				            <span slot="required" class="error" v-if="errors.has('baseCurrency:required')">{{errors.first('baseCurrency:required')}}</span>
				          </div>
				        </div>
				        <div class="form-group" :class="errorClass('reason')">
				          <label class="control-label col-md-3">{{ $t("reason")}} 
							<span class="required" aria-required="true">*</span>
				          </label>
				          <div class="col-md-6" >
				            <mu-text-field :hintText="$t('')" multiLine :rows="3" :rowsMax="6" class="form-control" v-model="model.reason" v-validate="'required'" data-vv-value-path="model.reason" name="reason"/>
				            
				            <span slot="required" class="error" v-if="errors.has('reason:required')">{{errors.first('reason:required')}}</span>
				          </div>
				        </div>
				        <div class="form-group" :class="errorClass('terms')">
				          	<div class="col-md-9 col-md-offset-3">
        						<chp-checkbox  name="terms" nativeValue="checkedIterms" v-model="checkedIterms" data-vv-value-path="checkedIterms" v-validate="'required'" data-vv-name="terms"  type="checkbox">
					        		<a class="" href="https://www.acy.com/why-acy/terms-and-conditions" target="_blank">{{ $t('applicationSubaccount.agreenTerms')}}</a>
					        	</chp-checkbox>
        						<br>
        						<span slot="required" class="error" v-if="errors.has('terms:required')">{{errors.first('terms:required')}}</span>
      						</div>
				        </div>
	       			</form> 
					<div class="row" slot="footer">
					    <div class="col-md-6 col-md-offset-3" >
				          <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="submit" :disabled="submitDisable">
				            <i class="fa fa-check hidden-sm hidden-xs"></i> {{ $t('ui.button.submit') }}
				          </chp-button>
			      		</div>
					</div>
				</chp-panel>
			</div>
	    </div>
	</div>
</template>
<script>
  import validateMixin from 'mixins/validatemix'
  import configService from 'services/configService' 
  import mt4Service from 'services/mt4Service'
  export default{
  		mixins : [validateMixin],
		data(){
			return {
				loadingStatus:false,

				model :{
					plat_form:"",
					account_type:"",
					lever:"",
					base_currency:"",
					reason:""
				},
				checkedIterms:[],
				platForms:[{
					title : "MetaTrader4",
					val:"MetaTrader4"
				}],
				accountTypes:[{val:"",title:""}],
				leverages:[{val:"",title:""}],
				baseCurrencies:[{val:"",title:""}],
				submitDisable : false
			}
		},
		methods:{
			async submit(){
				this.submitDisable = true
				let validateResult = await this.$validator.validateAll()
				if(validateResult){
					let {success} = await mt4Service.applyMT4Account(this.model)
					if(success){
						this.toastr.info(this.$t("info.SUCCESS"))
						this.resetForm()
					}
				}
				this.submitDisable = false
			},
			resetForm(){
				this.checkedIterms=[];
				this.$refs.accountForm.reset()
			},
			mapData(data){
				this.accountTypes = data["client_account_type"].split("|").map((type)=>{
						return {
							val : type,
							title: type
						}
				})
				this.$set(this.model,"account_type",this.accountTypes.length > 0 ? this.accountTypes[0].val : "");
				this.leverages = this.$store.state.leverage
				this.$set(this.model,"lever",this.leverages.length > 0 ? this.leverages[0].val : "");
				this.baseCurrencies = data["client_base_currency"].split("|").map((currency)=>{
					return {
						val:currency,
						title:currency
					}
				})
				this.$set(this.model,"base_currency",this.baseCurrencies.length > 0 ? this.baseCurrencies[0].val : "")
				this.$set(this.model,"plat_form",this.platForms[0].val)
			},
			async fetchConfig(){
				let fields = ["client_account_type","client_base_currency"]
				this.loadingStatus = true
				let {success,data} = await configService.getConfigByKey({fields})
				this.loadingStatus = false
				if(success && data){
					this.mapData(data)
				}
			}
		},
		created(){
			this.fetchConfig()
		}
	}
</script>
