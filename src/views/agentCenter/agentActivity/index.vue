<template>
	<div class="container-fluid" >
		<agent-activity-head></agent-activity-head>
		<agent-activity-client></agent-activity-client>
		<agent-activity-volumn></agent-activity-volumn>
	</div>	
</template>
<script>
	import head from '../head.vue'
	import validClient from './validClient'
	import volumn from './volumn'
	export default{
		components:{
			'agent-activity-head' : head,
			'agent-activity-client' : validClient,
			'agent-activity-volumn' : volumn
		}
	}
</script>