<i18n src="../../i18n.yaml"></i18n>
<template>
	<div class="tab">
		<agent-statistics-time-picker @research = "research" :agent="agent">
			<ul class="total-info">
				<li>
					{{ $t('trade.totalFx') }} : <span class="text-dark info-number"> {{ totalvolumes.total_forex_volume}} </span>
				</li>
				<li>
					{{ $t('trade.totalOil ') }} : <span class="text-dark info-number"> {{ totalvolumes.total_oil_volume}}  </span>
				</li>
				<li>
					{{ $t('trade.totalMetal') }} : <span class="text-dark info-number"> {{ totalvolumes.total_metal_volume}}  </span>
				</li>
				<li>{{ $t('trade.totalCfd') }} : <span class="text-dark info-number"> {{ totalvolumes.total_cfd_volume}}  </span></li>
			</ul>
		</agent-statistics-time-picker>
		<agent-statistics-volume-chart-1 ref="chart1" @totalChange="totalChange"></agent-statistics-volume-chart-1>
		<agent-statistics-volume-chart-2 ref="chart2" ></agent-statistics-volume-chart-2>
		<agent-statistics-volume-chart-3 ref="chart3" ></agent-statistics-volume-chart-3>
		
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
				totalvolumes:{
					total_forex_volume:0,
					total_oil_volume:0,
					total_metal_volume:0,
					total_cfd_volume:0
				}
			}
		},
		components:{
			'agent-statistics-time-picker' : timePicker,
			'agent-statistics-volume-chart-1' : chart1,
			'agent-statistics-volume-chart-2' : chart2,
			'agent-statistics-volume-chart-3' : chart3,
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
				this.totalvolumes = Object.assign({},val)
			}
		},
		watch:{
			agent:function(val){
				this.refresh()
			},
			"$store.state.language"(){
				this.refresh()
			}
		}
	}
</script>
<style lang="less" scoped>
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