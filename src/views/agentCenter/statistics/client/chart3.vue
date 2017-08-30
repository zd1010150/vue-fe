<template>
	<chp-panel  :canCollapse="false" 
				:canClose="false" 
	 			:showActionRipple="false"  
				:isLoading="loadingStatus" 
				ref="panel">
				<template slot="title">Active Client Deposit Contribution</template>
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
				console.log(data)
			},
			async fetchData({mt4_id,start_date,end_date}){
				this.loadingStatus = true
				let {success,data} = tradeService.getAccountsAndActiveClient({mt4_id,start_date,end_date})
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