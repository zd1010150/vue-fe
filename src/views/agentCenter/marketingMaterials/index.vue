<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="fluid-container">
	<div class="row">
		<div class="col-lg-12 col-md-12">
			<chp-tabs :isJustified="true"  :value="activeStepTab"  @change = "handleStepTabChange">
      			<template slot="header">
	        		<chp-tab-header href="tab1">{{ $t('marketingMaterial.banner') }}</chp-tab-header>
	       			<chp-tab-header href="tab2">{{ $t('marketingMaterial.video') }}</chp-tab-header>
	      		</template>
      			<template slot="content">
      			 	<chp-tab-content id="tab1" class="row">

						<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							<section class="picture">
								<mu-paper class="pic" :zDepth="2">
									<img class="img-responsive" src="http://s3img.city.sina.com.cn/xiancheng/common/thumbnail/0/572c261447243db5d8c25020c8e314b8.jpg" alt="">
									<div class="mask">
										<p class="p-sm"> 
											{{imgScript}}
										</p>

										
									</div>
								</mu-paper>
								<p class="size pt-sm">Image Size:600*120</p>
								<p class="copy">
									<chp-button class="mb-xs mt-xs  btn btn-primary print-btn" >
										{{ $t('marketingMaterial.copy') }}
									</chp-button>	
								</p>
							</section>
						</div>
						
                    </chp-tab-content>
                    <chp-tab-content id="tab2">

                      第2个tab的内容
                    </chp-tab-content>
				</template>
			</chp-tabs>
		</div>
	</div>
	</div>
</template>
<script>
	import agentRouterMixin from 'mixins/agentRouterMixin'
	import materialService from 'services/materialService'
	import { SET_CONTENT_LOADING } from 'store/mutation-types'
	export default{
		mixins:[agentRouterMixin],
		data(){
			return {
				images:[],
				videos: [],
				activeStepTab:'tab1',
				imgScript:'<a href="www.acy.com">click me ver y longlong1111111111longlong1111111111longlong11111111111111111111</a>'
			}
		},
		methods:{
			handleStepTabChange:function(id){
				this.activeStepTab = id
			},
			toggleURL(id){
				document.getElementById("#"+id).classList.toggleClass('active')
			},
			async fetchImageData(){
				let { success,data } = materialService.getMarketingImage()
				if( success ){
					this.images = data
				}
			},
			async fetchVideoData(){
				let { success,data } = materialService.getMarketingVideo()
				if( success ){
					this.videos  = data
				}
			}
		},
		created(){
			
		}
	}
</script>
<style lang="less" scoped>
	@import "~assets/less/variable.less";
	@import "~assets/less/transition.less";
	.picture{
		.pic{
			max-height:300px;
			height:300px;
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

				&:hover{
					p{
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
	}
	html.dark{
		.picture{
			.pic{
				.mask{
					&:hover{
						p{
							color:@light-color;
					
						}
						background-color: rgba(0, 0, 0,.6)
					}
					
				}
			}
		}
	}
</style>