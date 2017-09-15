<i18n src="../../i18n.yaml"></i18n>
<template>
	<div class="tab">
		<agent-statistics-time-picker @research = "research" :agent="agent">
			<ul class="total-info">
				<li>
					{{ $t('trade.totalActiveClient') }} : <span class="text-dark info-number"> {{ totalClients.activeClients}} </span>
				</li>
				<li>
					{{ $t('trade.totalClient') }} : <span class="text-dark info-number"> {{ totalClients.allClients}}  </span>
				</li>
			</ul>
		</agent-statistics-time-picker>
		<agent-statistics-client-chart-1 ref="chart1" ></agent-statistics-client-chart-1>
		<agent-statistics-client-chart-2 ref="chart2" :agent="agent" @totalChange="totalChange"></agent-statistics-client-chart-2>
		<agent-statistics-client-chart-3 ref="chart3" ></agent-statistics-client-chart-3>
		
	</div>
</template>
<script>
	import timePicker from '../timePicker'
	import chart1 from './chart1'
	import chart2 from './chart2'
	import chart3 from './chart3'
	export default{
		activated(){
			this.refresh()
		},
		props:{
			agent:[String,Number],
		},
		data(){
			return {
				start_date:"",
				end_date:"",
				totalClients:{
					activeClients:0,
					allClients:0
				}
			}
		},
		components:{
			'agent-statistics-time-picker' : timePicker,
			'agent-statistics-client-chart-1' : chart1,
			'agent-statistics-client-chart-2' : chart2,
			'agent-statistics-client-chart-3' : chart3,
		},
		methods:{
			refresh(){
				if(this.agent){
					let model = { mt4_id:this.agent,start_date:this.start_date,end_date:this.end_date}
					this.$refs.chart1.research(model)
					this.$refs.chart2.research(model)
					this.$refs.chart3.research(model)
				}
			},
			research({start_date,end_date}){
				this.start_date = start_date
				this.end_date = end_date
				this.refresh()
			},
			totalChange(val){
				this.totalClients = Object.assign({},val)
			}
		},
		watch:{
			agent:function(val){
				this.refresh()
			}
		}
	}
</script>
<style scoped lang="less">
.total-info{
		padding: 0px;
		margin: 0px;
		overflow: hidden;
		list-style-type: none;
		li {
			float: left;
		}
	}
.info-number{ 
	font-size: 1.7rem;
	padding-right: 20px;

}
</style>