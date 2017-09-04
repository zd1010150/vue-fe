<i18n src="../i18n.yaml"></i18n>
<template>
	<div class='row'>
	<div class='col-md-12 col-lg-12 col-sm-12'></div>
		<chp-tabs :value='activeTab'  :isJustified='true' :isPrimary='true' @change = 'handleTabChange'>
            <template slot='header'>
	            <chp-tab-header href='treasury'>{{ $t('charts.treasury') }}</chp-tab-header>
	            <chp-tab-header href='volume'>{{ $t('charts.volume') }}</chp-tab-header>
	            <chp-tab-header href='client'>{{ $t('charts.client') }}</chp-tab-header>
            </template>
            <template slot='content'>
            	
            		<chp-expand-transition name="chp-fade" >
		        		<keep-alive>
				        	<component v-bind:is="currentView" :agent="agent"></component>
				        </keep-alive>
	    			</chp-expand-transition>
            	
			</template>
		</chp-tabs>
	</div>
</template>
<script>
	import client from './client/client'
	import treasury from './treasury/treasury'
	import volume from './volume/volume'
	export default{
		props:{
			agent:[String,Number]
		},
		components:{
			'agent-statistics-client' : client,
			'agent-statistics-treasury' : treasury,
			'agent-statistics-volume' : volume
		},
		data(){
			return {
				activeTab:"volume",
				currentView:"agent-statistics-volume"
			}
		},
		methods:{
			handleTabChange(val){
				this.activeTab = val
			}
		},
		watch:{
			activeTab(val){
				this.currentView ='agent-statistics-'+val
			},
		}
	}
</script>