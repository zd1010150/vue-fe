<template>
	<div class="col-lg-12 col-md-12">
	 <chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
	 <template slot="title">Withdrawal</template>
     <chp-tabs :value="activeStepTab"  @change = "handleStepTabChange" type="wizard" slot="body">
      <template slot="header">
        <chp-tab-header href="tab1">Account</chp-tab-header>
        <chp-tab-header href="tab2">Profile</chp-tab-header>
        <chp-tab-header href="tab3">Confirm</chp-tab-header>
      </template>
      <template slot="content">
        <chp-tab-content id="tab1">

          <withdrawal-account @loading="loadingData"></withdrawal-account>
        </chp-tab-content>
        <chp-tab-content id="tab2">

          <withdrawal-profile></withdrawal-profile>
        </chp-tab-content>
        <chp-tab-content id="tab3">

          <withdrawal-confirm></withdrawal-confirm>
        </chp-tab-content>

      </template>

    </chp-tabs>
    <div class="row" slot="footer">
      <div class="col-md-6" >
          <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="previous">
            <i class="fa fa-angle-left hidden-sm hidden-xs"></i> {{ $t('ui.button.previous') }}
          </chp-button>
          
      </div>
       <div class="col-md-6" >
       	<chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn pull-right" @click="next" v-if="activeStepTab !='tab3'">
           {{ $t('ui.button.next') }}
           <i class="fa fa-angle-right hidden-sm hidden-xs"></i> 
          </chp-button>
          <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn pull-right" @click="submit" v-if="activeStepTab =='tab3'">
           {{ $t('ui.button.submit') }}
           <i class="fa fa-check hidden-sm hidden-xs"></i> 
          </chp-button>
       </div>
    </div>
   
    </chp-panel>

	</div>
</template>
<script>
import account from "./forms/account"
import profile from "./forms/profile"
import confirm from "./forms/confirm"
	export default{
		data(){
			return{
				loadingStatus:false,
				activeStepTab:"tab1"
			}
		},
		computed:{
			tabIndex (){
				return Number(/\d/.exec(this.activeStepTab)[0])
			}
		},
		components:{
			"withdrawal-account":account,
			"withdrawal-profile":profile,
			"withdrawal-confirm":confirm
		},
		created(){
			console.log("form created",this.method);
		},
		methods:{
			handleStepTabChange(id){
				console.log("tabs ",id," is clicked");
				this.activeStepTab = id;
			},
			submit(){

			},
			cancel(){

			},
			previous(){
				this.activeStepTab= "tab"+(this.tabIndex-1)
			},
			next(){
				this.activeStepTab = "tab"+(this.tabIndex+1)
			},
			loadingData(loading){
				this.loadingStatus = loading;
			}
		}
	}
</script>