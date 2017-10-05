<template>
	<div class="fluid-container">
		<agent-client-list-head @agentChange="agentChange"></agent-client-list-head>
		<agent-client-list-table :agentId="agentId"></agent-client-list-table>
	</div>
</template>
<script>
	import agentRouterMixin from 'mixins/agentRouterMixin'
	import head from '../head.vue'
	import table from './table.vue'
	export default{
		mixins:[agentRouterMixin],
		data(){
			return {
				agentId:""
			}
		},
		components:{
			'agent-client-list-head' : head,
			'agent-client-list-table' : table
			
		},
		methods:{
			agentChange(val){
				this.agentId = val
	      	}
		}
	}
</script>