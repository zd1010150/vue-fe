<i18n src="./i18n.yaml"></i18n>
<template>
	<div class="col-lg-6 col-md-6 col-sm-12">
		<chp-panel :canCollapse="false" :canClose="false" :isLoading="loadingStatus">
			<template slot="panelTitle">
				{{ $t("video") }}
				<chp-view-all href="#/training/videos"></chp-view-all>
			</template>
			<chp-carousel   slot="body"
							:perPage="1" 
							:autoplay="false" 
							:autoplayHoverPause="true" 
							:loop="true" 
							:paginationPadding="5"
							:autoplayTimeout="7000">
				<chp-slide v-for="(video,index) in videos" class="slide-wrapper" :key="index">
					<chp-feature-image :src= "video.imagepath || video.image_link "/>
		      		<div class="mask">
						<h3>
							<a :href="'#/training/videos?level=3&videoType='+video.dummy+'&videoId='+video.id" >
							{{ $t("watch")}}</a>
						</h3>
					</div>
		        </chp-slide>
			</chp-carousel>
		</chp-panel>
	</div>
</template>
<script>
	import trainingService from "services/trainingService"
	import loading from 'src/mixins/loading'
	export default{
		mixins:[loading],
		data(){
			return {
				videos:[]
			}
		},
		created(){
			this.fetchData()
		},
		methods:{
			async fetchData(){
				this.loadingStatus = true
				let { success,data } = await trainingService.getVideo(this.$store.state.language == "zh" ? "mandarin" : "english")
				this.loadingStatus = false
				if(success && data.info && data.analysis && data.tutorials){
					this.videos = [...data.info,...data.analysis,...data.tutorials]
				}
			}
		},
		watch:{
			"$store.state.language":function(){
				this.fetchData()
			}
		}
	}
</script>
<style lang="less">
	@import "~assets/less/variable.less";
	@import "~assets/less/transition.less";

	.VueCarousel-pagination{
		float:none !important;
	}
	.slide-wrapper{
		position:relative;
		.mask{
			position:absolute;
			left:0px;
			right:0px;
			top:0px;
			bottom:0px;
			.display(flex);
			.align-items(center);
			.justify-content(center);
			transition:@material-enter;
			h3{
				a{
					color:transparent;
				}
			}
			&:hover{
				h3 > a{
					color:@dark-color;
				}
				background-color: rgba(256,256,256,.6);	
			}
			
		}
	}
	.size,.copy{
		text-align: center;
	}
	
	html.dark{
		.slide-wrapper{
			.mask{
				&:hover{
					h3 > a{
						color:@light-color;
					}
					background-color: rgba(0, 0, 0,.6)
				}
				
			}
		}
	}
</style>