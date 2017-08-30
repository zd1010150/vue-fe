<template>
	<transition name="slide-fade" mode="out-in">
		<keep-alive>
	 		<component
	  			v-bind:is= "currentView"
			></component>	
		</keep-alive>
	</transition>
</template>
<script>
	import VideoMain from './main/index'
	import singleIndex from './singleIndex.vue'
	import detail from './detail'
	export default{
		data(){
			return {
				currentView : "video-main"
			}
		},
		components:{
			"video-main" : VideoMain,
			"video-single-index" : singleIndex,
			"video-detail" : detail
		},
		watch:{
			"$route.query" : function(val){
				console.log(val,"====")
				if(val && val.level){
					switch (Number(val.level)){
						case 1:
							this.currentView = "video-main"
							break
						case 2:
							this.currentView = "video-single-index"
							break
						case 3:
							this.currentView = "video-detail"
							break
					}
				}else{
					this.currentView = "video-main"
				}
			}
		}
	}
</script>