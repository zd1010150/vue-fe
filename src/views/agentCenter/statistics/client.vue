<template>
	<div class="tab">
		<agent-statistics-time-picker @research = "research">
			this is client
		</agent-statistics-time-picker>
		this is the client chart
	</div>
</template>
<script>
	import timePicker from './timePicker'
	export default{
		components:{
			'agent-statistics-time-picker' : timePicker
		},
		methods:{
			research(){
				console.log('research')
			}
		}
	}
</script>