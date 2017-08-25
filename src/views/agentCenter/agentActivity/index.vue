<template>
	<div class="container-fluid" >
		<agent-activity-head @agentChange="agentChange" @totalClients="totalClients"></agent-activity-head>
		<agent-activity-client :dataInfo="clientDataInfo" :totalClients="totalClientsNumber"></agent-activity-client>
		<agent-activity-volumn :agent="agent" :dataInfo="volumnDataInfo" @refresh="refresh"></agent-activity-volumn>
	</div>	
</template>
<script>
	import agentRouterMixin from 'mixins/agentRouterMixin'
	import activitiService from 'services/activityService'
	import head from '../head.vue'
	import validClient from './validClient'
	import volumn from './volumn'
	export default{
		mixins:[agentRouterMixin],
		data(){
			return {
				agent:"",
				dataInfo:{},
				totalClientsNumber:0
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
			},
			refresh(){//刷新当前数据
				this.fetchData()
			},
			totalClients(val){
				this.totalClientsNumber = val
			}
		},
		watch:{
			agent:function(val){
				this.fetchData()
			}
		},
		computed:{
			clientDataInfo:function(){
				if(this.dataInfo && this.dataInfo.client){
					return this.dataInfo.client
				}else{
					return {}
				}
			},
			volumnDataInfo:function(){
				if(this.dataInfo && this.dataInfo.fx && this.dataInfo.metal && this.dataInfo.cfd && this.dataInfo.oil)
					return {
						oil: this.dataInfo.oil,
						fx: this.dataInfo.fx,
						metal: this.dataInfo.metal,
						cfd:this.dataInfo.cfd
					}
				else return {}
			}
		}
	}
</script>