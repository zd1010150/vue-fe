<template>
	<div class="tab">
		<agent-statistics-time-picker @research = "research" :agent="agent">
			this is client
		</agent-statistics-time-picker>
		<agent-statistics-client-chart-1 ref="chart1" ></agent-statistics-client-chart-1>
		<agent-statistics-client-chart-2 ref="chart2" ></agent-statistics-client-chart-2>
		<agent-statistics-client-chart-3 ref="chart3" ></agent-statistics-client-chart-3>
		
	</div>
</template>
<script>
	import timePicker from '../timePicker'
	import chart1 from './chart1'
	import chart2 from './chart2'
	import chart3 from './chart3'
	export default{
		props:{
			agent:[String,Number],
			
		},
		data(){
			return {
				start_date:"",
				end_date:""
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
			}
		},
		watch:{
			agent:function(val){
				this.refresh()
			}
		}
	}
</script>