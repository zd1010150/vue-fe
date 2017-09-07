<template>
	<div class="col-lg-6 col-md-6 col-xs-12">
		
	</div>
</template>
<script>
	import notificationService from 'services/notificationService'
	export default{
		methods:{
			async fetchData(){
				let { success,data } = await notificationService.getNoticeByType("")
			}
		}
	}
</script>