<template>
	<scroll-bar></scroll-bar>
</template>
<script>
	import VueScrollbar from 'vue2-scrollbar'
	export default{
		components:{
			'scroll-bar' : VueScrollbar
		}
	}
</script>
<style>
	@import  "~vue2-scrollbar/style/vue2-scrollbar.css";
</style>