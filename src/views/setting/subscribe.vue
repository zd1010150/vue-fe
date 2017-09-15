<i18n src="./i18n.yaml"></i18n>
<template>
	<div class="row">
		<div class="col-sm-12">
	        <div class="panel panel-accordion">
	            <div class="panel-heading">
	                <h4 class="panel-title">
	                    <a class="accordion-toggle">
	                       {{ $t('subscribeAndUnsubscribe') }}
	                    </a>
	                </h4>
	            </div>
	            <div class="accordion-body">
	                <div class="panel-body">
		                <div class="row">
		                	<div class="checkbox-default col-lg-4 col-md-4 col-sm-6">
		                        <chp-checkbox id="active_trader" v-model="subscribe" nativeValue="active_trader">{{ $t('active_trader') }}</chp-checkbox>
		                    </div>
		                    <div class="checkbox-default col-lg-4 col-md-4 col-sm-6" v-if="$store.state.userInfo.hasAgent">
		                         <chp-checkbox id="active_agent" v-model="subscribe" nativeValue="active_agent">{{ $t('active_agent') }}</chp-checkbox>
		                    </div>
		                    <div class="checkbox-default col-lg-4 col-md-4 col-sm-6">
		                         <chp-checkbox id="dormant_trader" v-model="subscribe" nativeValue="dormant_trader">{{ $t('dormant_trader') }}</chp-checkbox>
		                    </div>
		                    <div class="checkbox-default col-lg-4 col-md-4 col-sm-6" v-if="$store.state.userInfo.hasAgent">
		                         <chp-checkbox  id="dormant_agent" v-model="subscribe" nativeValue="dormant_agent">{{ $t('dormant_agent') }}</chp-checkbox>
		                    </div>
		                    <div class="checkbox-default col-lg-4 col-md-4 col-sm-6">
		                         <chp-checkbox :value="['system']" :nativeValue="'system'" :disabled="true">{{ $t('systemEmail') }}</chp-checkbox>
		                    </div>
		                </div>
		                <div class="row">
		                	 <div class="col-lg-12">
		                    	<chp-button class="btn btn btn-primary mr-xs btn-sm mt-sm" @click="save()" :disabled="saveDisabled"> 
		                    		<i class="fa fa-save mr-xs"></i> Save
		                    	</chp-button>
		                    </div>
		                </div>
	                </div>
	            </div>
	        </div>
	    </div>
    </div>
</template>
<script>
	import settingService from 'services/settingService'
	export default{
		data(){
			return {
				subscribe:[],
				saveDisabled: false,
				model:{
					active_trader: 0 ,
					active_agent: 0,
					dormant_trader: 0,
					dormant_agent: 0
				}
			}
		},
		methods:{
			mapData(data){
				let keys = []
				for(let key in data){
					data[key] == "subscribe" ? keys.push(key) : ''
				}
				this.subscribe = keys
			},
			async save(){
				let param = {}
				for(let key in this.model){
					let value = this.subscribe.indexOf(key) > -1 ? 0 : 1
					param[key] = value
				}
				this.saveDisabled = true
				let { success,data } = await settingService.subscribe(param)
				this.saveDisabled = false
				if(success){
					this.toastr.info(this.$t("info.SUCCESS"))
				}
			},
			async fetchData(){
				let { success,data } = await settingService.getEmailSubscribeStatus()
				if(success){
					this.mapData(data)
				}
			}
		},
		created(){
			this.fetchData()
		}
	}
</script>