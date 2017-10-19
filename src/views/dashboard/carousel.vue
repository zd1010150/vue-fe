<template>
	<div>
		<div class="col-lg-12">
			<div class="thumbnail carousel-wrapper">
				<chp-carousel   :key="carouselKey"
								:perPage="1" 
								:autoplay="true" 
								:autoplayHoverPause="true" 
								:loop="true" 
								:paginationPadding="5"
								:autoplayTimeout="3000"
								class="dashboard-carousel">
					<chp-slide v-for="(activity,index) in activities" class="slide-wrapper" :key="index">
						<!-- <chp-feature-image :src= "activity.imagepath || activity.image_link "/>
						-->
						<table class="slide-img-wrapper">
							<tr>
								<td><img class="slide-img" :src= "activity.imagepath || activity.image_link " alt=""></td>
							</tr>
						</table>
						<!-- <div class="slide-img-wrapper">
							
						</div> -->
						<div class="mask">
							<h3><a :href="activity.url" target="_blank">{{ $t("more")}}</a></h3>
						</div>
					</chp-slide>
				</chp-carousel>
	  		</div>			
		</div>
	</div>
	
</template>
<script>
	import activityService from "services/activityService"
	export default{
		data(){
			return {
				activities:[],
				carouselKey:Math.random()
			}
		},
		created(){
			this.fetchData()
		},
		methods:{
			async fetchData(){
				let {success,data} = await activityService.getCampaigns(this.$store.state.language == "en" ? "english" : "mandarin")
				if(success){
					this.activities = data.items
				}
			}
		},
		watch:{
			"$store.state.language":function(){
				this.fetchData()
			},
			"$store.state.leftSideBarStatus":function(){
				this.carouselKey = Math.random() //为了强制重绘该滚动框，以实现自适应
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
	table.slide-img-wrapper{
		width:100%;
		height:100%;
		td:last-child{
			vertical-align: middle;
			text-align: center !important;
		}
		
	}
	.slide-img{
		width:100%;
		max-width: 100%;
		height:auto;
	}
	.slide-wrapper{
		position:relative;
		overflow: hidden;
		.featured-image{
			max-width: 900px;
			background-color: transparent;
		}
		.mask{
			position:absolute;
			z-index:10;
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
	@media(max-width:@screen-sm-min){
		.slide-img{
			width:100%;
			height:auto;
			max-height: auto;
		}
	}	

</style>