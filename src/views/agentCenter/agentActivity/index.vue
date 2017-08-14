<template>
	<div class="container-fluid" >
		<agent-activity-head @agentChange="agentChange"></agent-activity-head>
		<agent-activity-client :agent="agent" :dataInfo="dataInfo"></agent-activity-client>
		<agent-activity-volumn :agent="agent" :dataInfo="dataInfo"></agent-activity-volumn>
	</div>	
</template>
<script>
	import activitiService from 'services/activityService'
	import head from '../head.vue'
	import validClient from './validClient'
	import volumn from './volumn'
	export default{
		data(){
			return {
				agent:"",
				dataInfo:{}
			}
		},
		components:{
			'agent-activity-head' : head,
			'agent-activity-client' : validClient,
			'agent-activity-volumn' : volumn
		},
		methods:{
			agentChange(agent){
				this.agent = agent
			},
			async fetchData(){
				let {data,success,message} = await activitiService.getAgentLevelActivity({
					type:'all',
					agentId:this.agent
				})
				if(success){
					this.dataInfo = data 
				}
			}
		},
		watch:{
			agent:function(val){
				this.fetchData();
			}
		},
		created(){
			//this.fetchData();
		}
	}
</script>