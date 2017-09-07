<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="col-lg-12 col-md-12">
	 <chp-panel :canCollapse="false" :canClose="true" :isLoading="loadingStatus" @closePanel="closePanel">
	 <template slot="title">{{ editObj? $t('bankcard.editBtnText') : $t('bankcard.newBtnText')}}</template>
     <chp-tabs :value="activeStepTab"  @change = "handleStepTabChange" type="wizard" slot="body">
      <template slot="header">
        <chp-tab-header href="tab1">{{ $t('bankcard.account') }}</chp-tab-header>
        <chp-tab-header href="tab2">{{ $t('bankcard.profile') }}</chp-tab-header>
      </template>
      <template slot="content">
		<chp-expand-transition name="chp-fade" >
        		<keep-alive>
		         <component v-bind:is="currentView" @methodChange="methodChange" :method="method" :editMethod="editMethod" ref="accountView" :editObj="editObj" @close="closePanel" @refresh="refresh"></component>
		        </keep-alive>
	    </chp-expand-transition>
       </template>
	</chp-tabs>
    <div class="row" slot="footer">
      <div class="col-md-6 col-sm-6 col-xs-6" >
          <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="previous" v-if="activeStepTab =='tab2'">
            <i class="fa fa-angle-left hidden-sm hidden-xs"></i> {{ $t('ui.button.previous') }}
          </chp-button>
          
      </div>
       <div class="col-md-6 col-sm-6 col-xs-6" >
       		<chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn pull-right" @click="next" v-if="activeStepTab =='tab1'">
           		{{ $t('ui.button.next') }}
           		<i class="fa fa-angle-right hidden-sm hidden-xs"></i> 
          	</chp-button>
          	<chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn pull-right" @click="submit" v-if="activeStepTab =='tab2'">
           		<i class="fa fa-check hidden-sm hidden-xs"></i> 
           		{{ $t('ui.button.submit') }}
          	</chp-button>
       </div>
    </div>
   
    </chp-panel>
</div>
	
</template>
<script>
import account from "./forms/account"
import method from "./forms/method"
 import bankCardService from 'services/bankCardService'
	export default{
		data(){
			return{
				method:"",
				loadingStatus:false,
				activeStepTab:"tab1",
				currentView:null,
				editObj:null,
				innerEditId:this.editId,
				editMethod:null
			}
		},
		props:{
			editId:[Number,String]
		},
		computed:{
			tabIndex (){
				return Number(/\d/.exec(this.activeStepTab)[0])
			}
		},
		components:{
			"bank-account":account,
			"bank-account-method":method
		},
		mounted(){
			this.initTab(this.innerEditId);
		},
		watch:{
			activeStepTab(val){
				if (val ==  "tab1"){
					this.currentView ="bank-account-method"
				}else{
					this.currentView = "bank-account"
				}
			},
			editId:function(val,oldVal){
				if(val==oldVal){
					return
				}else{
					this.innerEditId = val
				}
			},
			innerEditId:function(val){
				this.initTab(val);
			}
		},
		methods:{
			handleStepTabChange(id){
				this.activeStepTab = id
			},
			methodChange(val){
				this.method = val
			},
			previous(){
				this.activeStepTab= "tab"+(this.tabIndex-1)
			},
			next(){
				this.activeStepTab = "tab"+(this.tabIndex+1)
			},
			loadingData(loading){
				this.loadingStatus = loading;
			},
			closePanel(){
				this.$emit('close')
			},submit(){
				this.$refs.accountView.submit()
			},refresh(){

				this.$emit("refresh")
			},
			async fetchSingleBankCardInfo(id){
				this.loadingStatus=true
				let {success,data}= await bankCardService.getBankCardById(id);
				if(success && data){

					this.editObj = data
					this.editMethod = data.method
				}
				this.loadingStatus=false
			},
			initTab(id){
				if(!!id){
					this.fetchSingleBankCardInfo(id);
					this.currentView = "bank-account"
					this.activeStepTab = "tab2";
				}else{
					this.editObj = null;
					this.currentView = "bank-account-method";
					this.activeStepTab = "tab1";
				}
				
			}
		}
	}
</script>