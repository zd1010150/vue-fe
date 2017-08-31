<i18n src="../../i18n.yaml"></i18n>
<template>
	<chp-panel  :canCollapse="false" 
				:canClose="false" 
	 			:showActionRipple="false"  
				:isLoading="loadingStatus" 
				ref="panel">
				<template slot="title">Active Client Statistics</template>
		<div slot="body">
			<div class="col-md-12 col-sm-12 pt-lg pr-none pl-none">
			  <chp-echart :media="media" :externalOption="option" v-if="option"></chp-echart>
			</div>
		</div>
	</chp-panel>
</template>
<script>
	import tradeService from 'services/tradeService'
	import loadingMix from 'mixins/loading'
	import { LINE_OPTION_CONFIG,LINE_MEDIA_CONFIG } from 'src/config/chart.config.js'
	export default{
		mixins:[loadingMix],
		data(){
			return {
				chartData:null,
				media:LINE_MEDIA_CONFIG,
				defaultOption:{
          			legend: {
          				left:0,
          				orient:'horizontal',
          				data:[]
				    },
				    grid:{
				    	width:'auto',
				    	height:'auto',
				    	left:'10%',
				    	right:'5%'
				    },
				     xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: []
				    }, 
				    yAxis: {
				        type: 'value'
				    },
				    series: [],
				    tooltip: {
				        trigger: 'axis'
				    },
          		},
          		option: null
			}
		},
		methods:{
			mapData(data){
				let series = {clients:[],accounts:[]},
					xAxis = {
					        type: 'category',
					        boundaryGap: false,
					        data: []
					    },
				    legend = { data : [this.$t('ui.trade.activeClient'),this.$t('ui.trade.totalClient')]}
			    for(let c in data.clients){
			    	xAxis.data.push(c)
			    	series.clients.push(data.clients[c])
			    	series.accounts.push(data.accounts[c])
				}
				this.option = Object.assign({},LINE_OPTION_CONFIG,{
					legend:legend,
	       			xAxis:xAxis,
	       			series: [
	       				{
	       					name: this.$t('ui.trade.activeClient'),
	       					data:series.clients,
	       					type:'line'
	       				},
	       				{
	       					name: this.$t('ui.trade.totalClient'),
	       					data:series.accounts,
	       					type:'line'
	       				}]
				})
			},
			async fetchData({mt4_id,start_date,end_date}){
				this.loadingStatus = true
				let {success,data} = await tradeService.getAccountsAndActiveClient({mt4_id,start_date,end_date})
				this.loadingStatus = false
				if(success){
					this.mapData(data)
				}
			},
			research({mt4_id,start_date,end_date}){
				this.fetchData({mt4_id,start_date,end_date})
			}
		}
	}
</script>