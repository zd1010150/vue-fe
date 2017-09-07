<template>
	<div class="featured-image" :style="innerStyle">
		<slot></slot>
	</div>
</template>
<script>
	export default{
		props:{
			src:String
		},
		computed:{
			innerStyle(){
				return {
					backgroundImage: 'url('+this.src+')'
				}
			}
		}
	}
</script>
<style lang="less">
	.featured-image {
		width: 100%;
		height: 0;
		padding-bottom: 56.25%;
		background: rgba(0, 0, 0, 0.1) no-repeat center;
		background-size: 100%;
	}
</style>