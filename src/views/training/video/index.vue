<template>
	<transition name="slide-fade" mode="out-in">
		<keep-alive>
			<component v-bind:is="currentView"></component>
		</keep-alive>
	</transition>
</template>
<script>
import VideoMain from './main/index'
import singleIndex from './singleIndex.vue'
import detail from './detail'

export default {
	data() {
		return {
			currentView: "video-main",			
		}
	},
	
	components: {
		"video-main": VideoMain,
		"video-single-index": singleIndex,
		"video-detail": detail
	},
	methods:{
		switchComponents(level){
			if(level){
				switch (Number(level)) {
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
	},
	created(){
		this.switchComponents(this.$route.query && this.$route.query.level)
	},
	watch: {
		"$route.query": function(val) {
			this.switchComponents(val && val.level)
			
		}
		
	}
}
</script>