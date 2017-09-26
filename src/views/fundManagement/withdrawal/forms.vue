<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="col-lg-12 col-md-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
			 <template slot="panelTitle">{{ $t('withdrawal.withdrawal') }}</template>
		     <chp-tabs :value="activeStepTab"  @change = "handleStepTabChange" type="wizard" slot="body">
		      <template slot="header">
		        <chp-tab-header href="tab1">{{ $t('withdrawal.account') }}</chp-tab-header>
		        <chp-tab-header href="tab2">{{ $t('withdrawal.profile') }}</chp-tab-header>
		        <chp-tab-header href="tab3">{{ $t('withdrawal.confirm') }}</chp-tab-header>
		      </template>
		      <template slot="content">
				<chp-expand-transition name="chp-fade" >
					<keep-alive>
						<component :is="currentView" @loading="loadingData" @submit="submitData" ref="tab"></component>
					</keep-alive>
				</chp-expand-transition>
		      </template>
			</chp-tabs>
		    <div class="row" slot="footer">
		      <div class="col-md-6 col-sm-6 col-xs-6" >
		          <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="previous" v-if="activeStepTab !='tab1'">
		            <i class="fa fa-angle-left hidden-sm hidden-xs"></i> {{ $t('ui.button.previous') }}
		          </chp-button>
		          
		      </div>
		       <div class="col-md-6 col-sm-6 col-xs-6" >
		       	<chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn pull-right" @click="next" v-if="activeStepTab !='tab3'">
		           {{ $t('ui.button.next') }}
		           <i class="fa fa-angle-right hidden-sm hidden-xs"></i> 
		          </chp-button>
		          <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn pull-right" @click="submit" v-if="activeStepTab =='tab3'" :disabled="hasSubmit">
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
import fundsService from 'services/fundsService' 
import {SET_REFRESH_TABLE} from "store/mutation-types"
import {TABLES } from "src/config/app.config.js"
	export default{
		data(){
			return{
				loadingStatus:false,
				activeStepTab:"tab1",
				model:null,
				hasSubmit:false
			}
		},
		computed:{
			tabIndex (){
				return Number(/\d/.exec(this.activeStepTab)[0])
			},
			currentView(){
				switch (this.tabIndex){
					case 1:
						return 'withdrawal-account'
					case 2:
						return 'withdrawal-profile'
					case 3:
						return 'withdrawal-confirm'
					}
				}
		},
		components:{
			"withdrawal-account":account,
			"withdrawal-profile":profile,
			"withdrawal-confirm":confirm
		},
		created(){
			this.activeStepTab="tab1"
		},
		methods:{
			async handleStepTabChange(id){
				let result = await this.validateTab()
				if(result){
					this.activeStepTab = id
				}
			},
			async validateTab(){
				return await this.$refs.tab.validate()
			},
			async submit(){
				this.hasSubmit = true
				let result = await this.validateTab()
				if(result && this.model){
					let {success,data} = await fundsService.withdrawal(this.model)
					if(success){
						this.toastr.info(this.$t("info.SUCCESS"))
						this.$refs.tab.init()
						this.activeStepTab = "tab1"
						this.$refs.tab.init()
						this.$emit("refresh")
					}else{
						this.activeStepTab = "tab1"
					}
				}
				this.hasSubmit = false
			},
			async previous(){
				let result = await this.validateTab()
				if(result){
					this.activeStepTab= "tab"+(this.tabIndex-1)
				}
			},
			async next(){
				let result = await this.validateTab()
				if(result){
					this.activeStepTab = "tab"+(this.tabIndex+1)
				}
			},
			loadingData(loading){
				this.loadingStatus = loading
			},
			submitData(model){
				this.model = model
			}
		}
	}
</script>