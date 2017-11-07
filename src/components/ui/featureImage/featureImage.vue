<template>
	<div class="featured-image" :style="innerStyle">
		<slot></slot>
	</div>
</template>
<script>
  import { shrink } from "src/utils/pictureUtil.js"
	export default{
		props:{
			src:String,
      isThumbnail : {
			  default : true
      },
      onlyShrinkOnMobile : {
			  default : false
      }
		},
		computed:{
			innerStyle(){
			  return {
					backgroundImage: 'url('+(this.isThumbnail ? shrink(this.src,this.onlyShrinkOnMobile) : this.src) +')'
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
