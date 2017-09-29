<i18n src="./i18n.yaml"></i18n>
<template>
	<div class="fluid-container">
		<div class="row" v-for="(activity,index) in activities">
			<div class="col-lg-12 col-md-12" :key="index">
				<chp-panel :canClose="false" :canCollapse="false">
		            <template slot="panelTitle">{{ activity.title}}</template>
		            <div slot="body" class="table-wrapper">
		            	<div class="table-row-wrapper">
		            		<div class="img-wrapper">
		        				<chp-feature-image :src= "activity.imagepath || activity.image_link "/>
		        				<div class="mask">
									<table>
										<tr>
											<td>
												<h3><a :href="activity.url" target="_blank">{{ $t("more")}}</a></h3>
											</td>
										</tr>
									</table>
								</div>
	        				</div>
		            		<section class="info-wrapper pl-lg pt-lg">
	            				<p >{{activity.start_time}}-{{activity.end_time}}</p>
			              		<p v-html="activity.description"></p>
			              		<p class="more">
			              			<a class="mb-xs mt-xs  btn btn-primary print-btn" :href="activity.url" target="_blank">
												{{ $t("more")}}
									</a>	
			              		</p>
		            		</section>
		            	</div>
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
		.table-wrapper{
			display: table;
			width:100%;
		}
		.table-row-wrapper{
			display: table-row;
		}
		.img-wrapper,.info-wrapper{
			display: table-cell;
			vertical-align: middle;
			width:50%;
		}
		.img-wrapper{
			position: relative;
			.mask{
				position:absolute;
				top:0px;
				bottom:0px;
				left:0px;
				right:0px;
				z-index:50;
				transition:@material-enter;
				table{
					width:100%;
					height:100%;
					td{
						text-align: center !important;
					}
				}
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
		
		.size,.copy{
			text-align: center;
		}
	
	html.dark{
			.img-wrapper{
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
		.img-wrapper,.info-wrapper{
			display: block;
			vertical-align: middle;
			width:100%;
		}
	}
</style>