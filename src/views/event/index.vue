<i18n src="./i18n.yaml"></i18n>
<template>
	<div class="fluid-container">

		<div class="row" v-for="(activity,index) in activities">
			<div class="col-lg-12 col-md-12" :key="index">
			<chp-panel :canClose="false" :canCollapse="false">
	            <template slot="title">{{ activity.title}}</template>
	            <div slot="body" class="row p-sm">
	              <mu-card class="pic col-lg-3 col-md-3 col-sm-12 p-sm">
	              	<img class="img-responsive" :src="activity.image_link || activity.imagepath" alt="">
	              	<div class="mask">
						<h3><a :href="activity.url" target="_blank">{{ $t("more")}}</a></h3>
					</div>
	              </mu-card>
	              <section class="col-lg-9 col-md-9 col-sm-12 pr-lg pt-lg">
	              	<p>{{activity.start_time}}-{{activity.end_time}}</p>
	              	<p>{{activity.description}}</p>
	              	<p class="more">
	              		<a class="mb-xs mt-xs  btn btn-primary print-btn" :href="activity.url" target="_blank">
										{{ $t("more")}}
						</a>	
	              	</p>
	              </section>
	              

	            </div>
          </chp-panel>
			</div>
		</div>
	</div>
</template>
<script>
	import activityService from "services/activityService"
	export default{
		data(){
			return {
				activities:[]
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
			}
		}
	}
</script>
<style lang="less" scoped>
	@import "~assets/less/variable.less";
	@import "~assets/less/transition.less";
	
		.row{
			.display(flex);
			.align-items(center);
		}
		.pic{
			
			
			display: table-cell;
			vertical-align: middle;
			position:relative;
			img{

			}
			.mask{
				transparent:0;
				position:absolute;
				top:0px;
				bottom:0px;
				left:0px;
				right:0px;
				width:100%;
				z-index:4;
				vertical-align: middle;
				word-break:break-all;
				.display(flex);
				.align-items(center);
				.justify-content(center);
				color:transparent;
				
				transition:@material-enter;
				h3 > a{
					color:transparent;
				}
				&:hover{
					h3 > a{
						color:@dark-color;
					}
					background-color: rgba(256,256,256,.6);	
				}
				
			}
			
		}
		.pic img{

			vertical-align: middle;
			max-width:100%;
		}
		.size,.copy{
			text-align: center;
		}
	
	html.dark{
		
			.pic{
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
		.row{
			display: block;
		}
	}
</style>