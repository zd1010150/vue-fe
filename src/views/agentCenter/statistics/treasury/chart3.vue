<i18n src="../../i18n.yaml"></i18n>
<template>
	<chp-panel  :canCollapse="false" 
				:canClose="false" 
	 			:showActionRipple="false"  
				:isLoading="loadingStatus" 
				ref="panel">
		<template slot="panelTitle">
			{{ $t("charts.avgCom") }} 
			<span class="chart-specification-tip pull-right">
				<i class="fa fa-info-circle" aria-hidden="true"></i>
				<chp-tooltip chp-direction="left">{{ $t('charts.treasuryChart.avgComTip') }}</chp-tooltip>
			</span>
		</template>
		<div slot="body" class="row">
			<div class="col-lg-6 col-md-6 col-sm-12 pr-lg pl-none content-center">
			    <chp-echart :media="media" :externalOption="option" v-if="option"></chp-echart>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-12 pr-none pl-none ">
			 <table class="table table-striped ">
				<thead>
					<tr>
						<th></th>
						<th> <i class="fa fa-circle chart-blue" aria-hidden="true"></i>  {{ chartData.current.time}}</th>
						<th><i class="fa fa-circle chart-red" aria-hidden="true"></i> {{ chartData.last.time}}</th>
						<th><i class="fa fa-circle chart-green" aria-hidden="true"></i> {{ $t("charts.toDate") }}
						<chp-tooltip chp-direction="left">{{ $t('charts.treasuryChart.toDateTip') }}</chp-tooltip>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ $t('charts.avgComofActiveClient') }}</td>
						<td>{{chartData.current.avgActiveCom}}
							<chp-tooltip chp-direction="left">
							{{ $t('charts.comofActiveClient')+'/'+ $t('trade.activeClient') + " = " + chartData.current.activeCom + "/" + chartData.current.activeClients + "="+ chartData.current.avgActiveCom
							}}
							</chp-tooltip>
						</td>
						<td>{{chartData.last.avgActiveCom}}
							<chp-tooltip chp-direction="left">
							{{ $t('charts.comofActiveClient')+'/'+ $t('trade.activeClient') + " = " + chartData.last.activeCom + "/" + chartData.last.activeClients + "="+ chartData.last.avgActiveCom
							}}
							</chp-tooltip>
						</td>
						<td>{{chartData.total.avgActiveCom}}
							<chp-tooltip chp-direction="left">
							{{ $t('charts.comofActiveClient')+'/'+ $t('trade.activeClient') + " = " + chartData.total.activeCom + "/" + chartData.total.activeClients + "="+ chartData.total.avgActiveCom
							}}
							</chp-tooltip>
						</td>
					</tr>
					<tr>
						<td>{{ $t('charts.avgComofAllClient') }}

						</td>
						<td>{{chartData.current.avgAllCom}}
							<chp-tooltip chp-direction="left">
							{{ $t('charts.comofAllClient')+'/'+ $t('trade.totalClient') + " = " + chartData.current.allCom + "/" + chartData.current.allClients + "="+ chartData.current.avgAllCom
							}}
							</chp-tooltip>
						</td>
						<td>{{chartData.last.avgAllCom}}
							<chp-tooltip chp-direction="left">
							{{ $t('charts.comofAllClient')+'/'+ $t('trade.totalClient') + " = " + chartData.last.allCom + "/" + chartData.last.allClients + "="+ chartData.last.avgAllCom
							}}
							</chp-tooltip>

						</td>
						<td>{{chartData.total.avgAllCom}}
							<chp-tooltip chp-direction="left">
							{{ $t('charts.comofAllClient')+'/'+ $t('trade.totalClient') + " = " + chartData.total.allCom + "/" + chartData.total.allClients + "="+ chartData.total.avgAllCom
							}}
							</chp-tooltip>

						</td>
					</tr>
				</tbody>
			</table>
			</div>
		</div>
		
	</chp-panel>
</template>
<script>
	import tradeService from 'services/tradeService'
	import loadingMix from 'mixins/loading'
	import { LINE_OPTION_CONFIG,LINE_MEDIA_CONFIG } from 'src/config/chart.config.js'
	import mathUtil from "src/utils/mathUtil"
	export default{
		mixins:[loadingMix],
		data(){
			return {
				chartData:{current:{
					ctiveClients:0,
					activeCom:0,
					allClients:0,
					allCom:0,
					time:"",
					avgActiveCom:0,
					avgAllCom:0
				},total:{
					ctiveClients:0,
					activeCom:0,
					allClients:0,
					allCom:0,
					time:"",
					avgActiveCom:0,
					avgAllCom:0
				},last:{
					ctiveClients:0,
					activeCom:0,
					allClients:0,
					allCom:0,
					time:"",
					avgActiveCom:0,
					avgAllCom:0
				}},
				media:[{
				    query: {
				      maxWidth: 768,
				      minWidth: 400
				    },
				    option: {
				      legend: {
				        orient: 'horizontal',
				        left: "center"
				      },
				      grid: {
				        left: "10%",
				        top: "10%",
				        containLabel: true
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
				        left: '20%'
				      },
				      grid: {
				        top: '25%',
				        left: '20%',
				        containLabel: true
				      }
				    }
				  }
				],
				option: null
			}
		},
		methods:{
			mapData(data){
				let xAxis = {
					        type: 'category',
					        boundaryGap: true,
					        data: [],
					        axisLabel:{
					        	interval: 0 ,
					        	rotate : -10
					        }
					},
					legend = { 
						data : [ { 
					    	name: this.$t('charts.avgComofActiveClient'),
					    	icon:'circle'
					    },{
					    	name:this.$t('charts.avgComofAllClient'),
					    	icon:'circle'
					    }]
					}
				    
					xAxis.data.push(data.current.time)
					xAxis.data.push(data.last.time)
					xAxis.data.push(this.$t("charts.toDate"))

			    this.option = Object.assign({},
			    	LINE_OPTION_CONFIG,{
						xAxis,
						legend,
		       			series: [
		       				{
		       					name: this.$t('charts.avgComofActiveClient'),
		       					data:this.getBarSeriesData(data,"avgActiveCom"),
		       					type:'bar',
		       					barGap: 0,
		       					barWidth:10,
		       					barMinHeight:1

		       				},
		       				{
		       					name: this.$t('charts.avgComofAllClient'),
		       					data: this.getBarSeriesData(data,"avgAllCom"),
		       					type:'bar',
		       					barWidth:10,
		       					barMinHeight:1
		       				}]
				})
			},
			getBarSeriesData(data,type){
				return [
					data.current[type],
					data.last[type],
					data.total[type]
				]
			},
			getAvgValue(data){
				if( data){
					for(let key in data){
						let info = data[key]
							data[key].avgActiveCom = mathUtil.getPercentage(info.activeCom,info.activeClients)
							data[key].avgAllCom = mathUtil.getPercentage(info.allCom,info.allClients)
					}
					
				}
				return data
			},
			async fetchData({mt4_id,start_date,end_date}){
				this.loadingStatus = true
				let {success,data} = await tradeService.getCommissionAndActiveClient({mt4_id,start_date,end_date})
				this.loadingStatus = false
				if(success){
					data = this.getAvgValue(data)
					this.mapData(data)
					this.chartData = Object.assign({},data)
				}
			},
			research({mt4_id,start_date,end_date}){
				this.fetchData({mt4_id,start_date,end_date})
			}
		}
	}
</script>