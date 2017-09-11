<i18n src="../../i18n.yaml"></i18n>
<template>
	<chp-panel  :canCollapse="false" 
				:canClose="false" 
	 			:showActionRipple="false"  
				:isLoading="loadingStatus" 
				ref="panel">
		<template slot="title">{{ $t('charts.percantageVolumeStatistics') }}</template>
		<div slot="body" class="row">
			<div class="col-lg-6 col-md-6 col-sm-12 pr-none pl-none content-center">
				<chp-echart class="circle-chart" :externalOption='option'></chp-echart>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-12 pr-none pl-none ">
			 <table class="table table-striped ">
				<thead>
					<tr>
						<th></th>
						<th>{{ chartData.current.time}}</th>
						<th>{{ chartData.last.time}}</th>
						<th>{{ $t("charts.historyTotalVolume") }}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><i class="fa fa-circle chart-blue" aria-hidden="true"></i> {{ $t('trade.fx') }}</td>
						<td>{{chartData.current.forex}}</td>
						<td>{{chartData.last.forex}}</td>
						<td>{{chartData.total.forex}}</td>
					</tr>
					<tr>
						<td><i class="fa fa-circle chart-red" aria-hidden="true"></i>{{ $t('trade.metal') }}</td>
						<td>{{chartData.current.metal}}</td>
						<td>{{chartData.last.metal}}</td>
						<td>{{chartData.total.metal}}</td>
					</tr>
					<tr>
						<td><i class="fa fa-circle chart-green" aria-hidden="true"></i>{{ $t('trade.oil') }}</td>
						<td>{{chartData.current.oil}}</td>
						<td>{{chartData.last.oil}}</td>
						<td>{{chartData.total.oil}}</td>
					</tr>
					<tr>
						<td><i class="fa fa-circle chart-orange" aria-hidden="true"></i>{{ $t('trade.cfd') }}</td>
						<td>{{chartData.current.cfd}}</td>
						<td>{{chartData.last.cfd}}</td>
						<td>{{chartData.total.cfd}}</td>
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
	import filters from 'src/filters'
	export default{
		mixins:[loadingMix],
		filters,
		
		data(){
			return {
				chartData:{current:{},last:{},total:{}},
				option:{
					series:[] //pie chart 没有数据的时候，要将series设置为[]
				}
			}
		},
		methods:{
			mapData(data){
				this.option = Object.assign({},{
					grid:{
						containLabel: true
					},
					tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
					series:[{
						name:this.$t('charts.historyTotalCommission'),
						type:'pie',
						radius:[0,'40%'],
						labelLine:{
							normal:{
								show: false
							}
						},
						label: {
			                normal: {
			                	show:false
			                }
		            	},
						data: this.calculateCircleChart(data,'total')
					},{
						name:data.last.time,
						type:'pie',
						label: {
			                normal: {
			                	show:false
			                }
		            	},
		            	labelLine:{
							normal:{
								show: false
							}
						},
						radius:['45%','65%'],
						data: this.calculateCircleChart(data,'last')
					},{
						name:data.current.time,
						type:'pie',
						label: {
			                normal: {
			                	show:false
			                }
		            	},
		            	labelLine:{
							normal:{
								show: false
							}
						},
						radius:['70%','90%'],
						data: this.calculateCircleChart(data,'current')
					}]
				})
			},
			calculateCircleChart(data,type){
				return [{
					name: this.$t('trade.fx'),
					value: data[type].forex 
					
				},{
					name: this.$t('trade.oil'),
					value: data[type].oil 
				},{
					name: this.$t('trade.metal'),
					value: data[type].metal 
				},{
					name: this.$t('trade.cfd'),
					value: data[type].cfd 
				}]
			},
			async fetchData({mt4_id,start_date,end_date}){
				this.loadingStatus = true
				let {success,data} = await tradeService.getPeriodVolume({mt4_id,start_date,end_date})
				this.loadingStatus = false
				if(success){
					this.chartData = data
					this.mapData(data)
				}
			},
			research({mt4_id,start_date,end_date}){
				this.fetchData({mt4_id,start_date,end_date})
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "~assets/less/variable.less";
	table{
		margin-top: 50px;
		.fa-circle{
			display: inline-block;
			padding-right: 5px;
		}
	}
	
	@media(max-width:@screen-sm-min){
		table{
			margin-top: 20px;
		}
	}
</style>