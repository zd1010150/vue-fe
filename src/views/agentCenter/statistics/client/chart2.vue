<i18n src="../../i18n.yaml"></i18n>
<template>
	<chp-panel  :canCollapse="false" 
				:canClose="false" 
	 			:showActionRipple="false"  
				:isLoading="loadingStatus" 
				ref="panel">
		<template slot="panelTitle">
			{{ $t("charts.activeClientComparision") }}
			<span class="chart-specification-tip pull-right">
				<i class="fa fa-info-circle" aria-hidden="true"></i>
				<chp-tooltip chp-direction="left">{{ $t('charts.clientChart.historyActivetraderIconTip') }}</chp-tooltip>
			</span>
		</template>
		<div slot="body" class="row">
			<div class="col-lg-3 col-md-3 col-sm-12 pr-none pl-none content-center">
			    <h5>{{ $t('charts.clientChart.until') }} {{chartData.all.time}}</h5>
			    <chp-liquid-fill :percentage="allPercentage" 
							  width="140px" 
							  height="140px" 
							  class="liquid-fill-chart">
			    </chp-liquid-fill>
			    <p>
			    {{ $t('trade.activeClient') }} | {{ $t('trade.totalClient') }}
			    <chp-tooltip chp-direction="bottom">{{ $t('charts.clientChart.totalPercentageTip') }}
					</chp-tooltip>
			     </p>					
			</div>
			<div class="col-lg-3 col-md-3 col-sm-12 pr-none pl-none content-center">
				<h5>{{ chartData.selected.time}}</h5>
				<chp-liquid-fill :percentage="selectedPerCentage" 
								  width="140px" 
								  height="140px" 
								  class="liquid-fill-chart">
				</chp-liquid-fill>
				<p class="content-center ">
					{{ $t('trade.activeClient') }} | {{ $t('trade.totalClient') }} 
					<chp-tooltip chp-direction="bottom">{{ $t('charts.clientChart.selectedPercentageTip') }}
					</chp-tooltip>
				</p>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-12 pr-none pl-none ">
			 <table class="table table-striped ">
				<thead>
					<tr>
						<th></th>
						<th>{{ $t('charts.clientChart.until')  }} {{chartData.all.time}}</th>
						<th>{{ chartData.selected.time}}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ $t('trade.activeClient') }}</td>
						<td>{{chartData.all.activeClients}}</td>
						<td>{{chartData.selected.activeClients}}</td>
					</tr>
					<tr>
						<td>{{ $t('trade.totalClient') }}</td>
						<td>{{chartData.all.allClients}}</td>
						<td>{{chartData.selected.allClients}}</td>
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
	import mathUtil from 'src/utils/mathUtil'
	export default{
		mixins:[loadingMix],
		filters,
		props:{
			agent:[String,Number]
		},
		data(){
			return {
				chartData:{all:{},selected:{}},
				allPercentage:0,
				selectedPerCentage:0
			}
		},
		methods:{
			mapData(data){
				this.allPercentage = mathUtil.getPercentage(data.all.activeClients,data.all.allClients)*100
				this.selectedPerCentage = mathUtil.getPercentage(data.selected.activeClients,data.selected.allClients)*100
			},
			async fetchData({mt4_id,start_date,end_date}){
				this.loadingStatus = true
				let {success,data} = await tradeService.getPercentageActiveClient({mt4_id,start_date,end_date})
				this.loadingStatus = false
				if(success){
					this.chartData = data
					this.mapData(data)
					this.$emit("totalChange",data.selected)
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
	}
	
	@media(max-width:@screen-sm-min){
		table{
			margin-top: 20px;
		}
	}
</style>