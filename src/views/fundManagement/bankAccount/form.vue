<template>
	<div class="col-lg-12 col-md-12">
	 <chp-panel :canCollapse="false" :canClose="true" :isLoading="loadingStatus" @closePanel="closePanel">
	 <template slot="title">Withdrawal</template>
     <chp-tabs :value="activeStepTab"  @change = "handleStepTabChange" type="wizard" slot="body">
      <template slot="header">
        <chp-tab-header href="tab1">Account</chp-tab-header>
        <chp-tab-header href="tab2">Profile</chp-tab-header>
      </template>
      <template slot="content">
        <chp-tab-content id="tab1">

          <bank-account-method @methodChange="methodChange"></bank-account-method>	
        </chp-tab-content>
        <chp-tab-content id="tab2">

          <bank-account :method="method"></bank-account>
        </chp-tab-content>
       
      </template>

    </chp-tabs>
    <div class="row" slot="footer">
      <div class="col-md-6" >
          <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="previous" v-if="activeStepTab =='tab2'">
            <i class="fa fa-angle-left hidden-sm hidden-xs"></i> {{ $t('ui.button.previous') }}
          </chp-button>
          
      </div>
       <div class="col-md-6" >
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
	export default{
		data(){
			return{
				method:"",
				loadingStatus:false,
				activeStepTab:"tab1",
				
			}
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
		created(){
			console.log("form created",this.method);
		},
		methods:{
			handleStepTabChange(id){
				console.log("tabs ",id," is clicked");
				this.activeStepTab = id;
			},
			methodChange(val){
				this.method = val;
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
				this.$emit('close');
			},submit(){
				
			}
		}
	}
</script>