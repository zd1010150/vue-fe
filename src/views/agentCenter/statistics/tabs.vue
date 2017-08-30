<template>
	<div class='row'>
	<div class='col-md-12 col-lg-12 col-sm-12'></div>
		<chp-tabs :value='activeTab'  :isJustified='true' :isPrimary='true' @change = 'handleTabChange'>
            <template slot='header'>
	            <chp-tab-header href='treasury'>Treasury</chp-tab-header>
	            <chp-tab-header href='volume'>Volume</chp-tab-header>
	            <chp-tab-header href='client'>Client</chp-tab-header>
            </template>
            <template slot='content'>
	            <chp-tab-content id='treasury'>
					<agent-statistics-treasury :agent="agent"></agent-statistics-treasury>
	            </chp-tab-content>
	            <chp-tab-content id='volume'>
	            	<agent-statistics-volume :agent="agent"></agent-statistics-volume>
				</chp-tab-content>
	            <chp-tab-content id='client'>
					<agent-statistics-client :agent="agent"></agent-statistics-client>
	            </chp-tab-content>
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
				activeTab:"client",
			}
		},
		methods:{
			handleTabChange(val){
				this.activeTab = val
			}
		}
	}
</script>