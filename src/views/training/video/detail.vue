<template>
	<div>
		this is teaching detail.... id is  {{ $route.query.videoId }} --  {{ $route.query.videoType }}
		<router-link to="?level=2&videoType=teaching">all {{ $route.query.videoType }} videos</router-link>
		<router-link to="?level=1">all teaching videos</router-link>
	</div>
</template>
<script>
	export default{
		created(){
			console.log("")
		}
	}
</script>