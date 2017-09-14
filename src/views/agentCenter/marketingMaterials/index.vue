<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="fluid-container">
		<agent-statistics-head @agentChange="agentChange"></agent-statistics-head>
		<div class="row">
			<div class="col-lg-12 col-md-12">
				<chp-tabs :isJustified="true"  :value="activeStepTab"  @change = "handleStepTabChange">
	      			<template slot="header">
		        		<chp-tab-header href="tab1">{{ $t('marketingMaterial.banner') }}</chp-tab-header>
		       			<chp-tab-header href="tab2">{{ $t('marketingMaterial.video') }}</chp-tab-header>
		      		</template>
	      			<template slot="content">
	      			 	<chp-tab-content id="tab1" class="row">

							<div v-for=" (image,index) in images" class="col-lg-3 col-md-3 col-sm-6 col-xs-12" :key="index">
								<section class="picture">
									<mu-paper class="pic" :zDepth="2">
										<img class="img-responsive" :src="image.src" alt="">
										<div class="mask">
											<p class="p-sm"> 
												{{ getImageScript(image) }}
											</p>
										</div>
									</mu-paper>
									<p class="size pt-sm">{{ image.name }}</p>
									<p class="copy">
										<chp-button class="mb-xs mt-xs  btn btn-primary print-btn"  @click="copy(getImageScript(image))">
											{{ $t('marketingMaterial.copy') }}
										</chp-button>	
									</p>
								</section>
							</div>
							
	                    </chp-tab-content>
	                    <chp-tab-content id="tab2" class="row">
							<div v-for=" (video,index) in videos" class="col-lg-4 col-md-4 col-sm-6 col-xs-12" :key="'video'+index">
								<section class="picture">
									<mu-paper class="pic" :zDepth="2">
										<video class="img-responsive" controls="" autoplay="true" >
  											<source :src="video.src"> 
  											</video> 

										<div class="mask">
											<p class="p-sm"> 
												{{ getVideoScript(video) }}
											</p>
										</div>
									</mu-paper>
									<p class="size pt-sm">{{ video.name }}</p>
									<p class="copy">
										<chp-button class="mb-xs mt-xs  btn btn-primary print-btn" @click="copy(getVideoScript(video))">
											{{ $t('marketingMaterial.copy') }}
										</chp-button>	
									</p>
								</section>
							</div>
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
	import { ORG_INDEX } from "src/config/url.config.js"
	import eventUtil from "src/utils/eventUtil"
	import head from '../head.vue'
	export default{
		components:{
			'agent-statistics-head' : head
		},
		mixins:[agentRouterMixin],
		data(){
			return {
				orgUrl:ORG_INDEX[this.$store.state.language],
				agent:null,
				images:[],
				videos: [],
				activeStepTab:'tab1',
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
				let { success,data } = await materialService.getMarketingImage()
				if( success ){
					this.images = data
				}
			},
			async fetchVideoData(){
				let { success,data } = await materialService.getMarketingVideo()
				if( success ){
					this.videos  = data

				}
			},
			agentChange(agentId){
				this.agent = this.$store.state.agentAccounts.filter((agent)=>{
					return agent.mt4_id == agentId
				})[0]
			},
			getImageScript(image){
				let obj = Object.assign(this.agent,{ src: image.src ,wp_url: this.orgUrl})
				return  `
				<a href="${obj.wp_url}${obj.agent_url}" target="_blank">
    				<img src="${obj.src}"/>
				</a>
				`
			},
			getVideoScript(video){
				let obj = Object.assign(this.agent,{ src: video.src,wp_url: this.orgUrl })
				return  `<video width="260" height="150" controls="" autoplay="" 
							onended="_acy_direct(this)" 
							data-url="${obj.wp_url}${obj.agent_url}">
			    				<source src="${ obj.src }">
							</video>
							\<script type="text/javascript"\>
				    			function _acy_direct ( dom ) 
				    			{ 
				        			window.open ( dom.getAttribute ( "data-url" ) ); 
				   				}
							\<\/script\>`
			},
			copy(txt){
				if(eventUtil.copy(txt)){
					this.toastr.info(this.$t('marketingMaterial.copySuccess'))
				}else{
					this.toastr.error(this.$t('marketingMaterial.unsupportCopy'))
				}
			}
		},
		watch:{
			async agent(val,oldVal){
				if(val != oldVal){
					let self = this
					this.$store.commit(SET_CONTENT_LOADING,true)
					Promise.all([await this.fetchVideoData(),await this.fetchImageData()]).then(()=>{
						self.$store.commit(SET_CONTENT_LOADING,false)	
					})
				}
			},
			'$store.state.language'(val){
				this.orgUrl = ORG_INDEX[val]
			}
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