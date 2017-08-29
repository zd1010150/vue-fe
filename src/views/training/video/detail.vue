<template>
	<div>
		this is teaching detail.... id is{{ $route.query.id }}
		<router-link to="?level=2&videoType=teaching">all teaching videos</router-link>
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