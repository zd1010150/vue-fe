<i18n src="../../i18n.yaml"></i18n>
<template>
	<chp-panel  :canCollapse="false" 
				:canClose="false" 
	 			:showActionRipple="false"  
				:isLoading="loadingStatus" 
				ref="panel">
				<template slot="title">Active Client Statistics</template>
		<div slot="body">
			<div class="col-md-12 col-sm-12 pr-none pl-none">
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
				media:[{
				    query: {
				      maxWidth: 768,
				      minWidth: 400
				    },
				    option: {
				      legend: {
				        orient: 'horizontal',
				        //padding:10
				        left: "center"
				      },
				      grid: {
				        left: "5%",
				        top: "15%",
				        containLabel: true,
				        width:'80%'
				      }
				    }
				  },
				  {
				    query: {
				      maxWidth: 400
				    },
				    option: {
				      legend: {
				        orient: 'vertical',
				        //padding:10
				        left: '20%'
				      },
				      grid: {
				        top: '25%',
				        left: '8%',
				        containLabel: true,
				        width:'92%'
				      }
				    }
				  }
				],
				option: null
			}
		},
		methods:{
			mapData(data){
				let series = {clients:[],netDeposit:[]},
					yAxis = [{
							name:this.$t('trade.activeClient'),
							type:'value'
						},{
							name:this.$t('trade.netDeposit'),
							type:'value'
						}],
					xAxis = {
					        type: 'category',
					        boundaryGap: false,
					        data: []
					    },
				    legend = { data : [ { 
					    	name:this.$t('trade.activeClient'),
					    	icon:'circle'
					    },{
					    	name:this.$t('trade.netDeposit'),
					    	icon:'circle'
					    }]}
			    for(let c in data.clients){
			    	xAxis.data.push(c)
			    	series.clients.push(data.clients[c])
			    	series.netDeposit.push(data.net_deposits[c])
				}
				this.option = Object.assign({},LINE_OPTION_CONFIG,{
					legend,
	       			xAxis,
	       			yAxis,
	       			series: [
	       				{
	       					name: this.$t('trade.activeClient'),
	       					data:series.clients,
	       					type:'line'
	       				},
	       				{
	       					name: this.$t('trade.netDeposit'),
	       					data:series.netDeposit,
	       					yAxisIndex:1,//使用第二个纵坐标
	       					type:'line',
	       					areaStyle: {
				                normal: {}
				            }
	       				}]
				})
			},
			async fetchData({mt4_id,start_date,end_date}){
				this.loadingStatus = true
				let {success,data} = await tradeService.getActiveAndNetDeposite({mt4_id,start_date,end_date})
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