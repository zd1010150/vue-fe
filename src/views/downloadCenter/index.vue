<template>
	<div class="container-fluid" >
	   <h3>META Trader 4</h3>
	    <div class="row">
	    	<div class="col-lg-5 col-md-5">
				<h4>PC platform</h4>
		    	<section class="panel panel-featured-left panel-featured-primary platform" :class="{ 'selected' : type== 'desktop'}" @click="openPage('desktop')">
					<div class="panel-body">
						<div class="widget-summary">
							<div class="widget-summary-col widget-summary-col-icon">
								<div class="summary-icon icon">
									<i class="fa fa-windows text-primary"></i>
								</div>
							</div>
							<div class="widget-summary-col padding-10" >
								<div class="summary">
									<h4 class="title ">Windows-Desktop</h4>
									<div class="info">
										<span class="">PC platform for desktop</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
	    	</div>
	    </div>
	    <div class="row">
	    		<div class="col-lg-5 col-md-5">
			    	<h4>Web Platform</h4>
			    	<section class="panel panel-featured-left panel-featured-primary platform" :class="{ 'selected' : type== 'browsers'}" @click="openPage('browsers')">
						<div class="panel-body">
							<div class="widget-summary">
								<div class="widget-summary-col widget-summary-col-icon">
									<div class="summary-icon icon">
										<i class="fa fa-internet-explorer text-primary"></i>
									</div>
								</div>
								<div class="widget-summary-col padding-10" >
									<div class="summary">
										<h4 class="title ">Web Platform</h4>
										<div class="info">
											Web Platform for browser
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
	    		</div>
	    </div>
	    <div class="row">
	    		<div class="col-lg-12 col-md-12 download-center-mobile">
		    	<h4 class="download-center-mobile-title">Mobile Platform</h4>
		    	<div class="col-lg-5 col-md-5">
			    	<section class="panel panel-featured-left panel-featured-primary platform" :class="{ 'selected' : type== 'ios'}" @click="openPage('ios')">
						<div class="panel-body">
							<div class="widget-summary">
								<div class="widget-summary-col widget-summary-col-icon">
									<div class="summary-icon icon">
										<i class="fa fa-apple text-primary"></i>
									</div>
								</div>
								<div class="widget-summary-col padding-10" >
									<div class="summary">
										<h4 class="title ">IOS</h4>
										<div class="info">
											Mobile Platform for iPhone
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div class="col-lg-5 col-md-5">
					<section class="panel panel-featured-left panel-featured-primary platform" 
					:class="{ 'selected' : type== 'android'}" @click="openPage('android')">
						<div class="panel-body">
							<div class="widget-summary">
								<div class="widget-summary-col widget-summary-col-icon">
									<div class="summary-icon icon">
										<i class="fa fa-android text-primary"></i>
									</div>
								</div>
								<div class="widget-summary-col padding-10" >
									<div class="summary">
										<h4 class="title ">Android</h4>
										<div class="info">
											Mobile Platform for Android
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

	    	</div>
	    </div>
   	</div>
</template>
<script>
	import configService from 'services/configService'
	import { MT4_WEB_PLATFORM } from 'src/config/url.config.js'
	export default{
		data(){
			return {
				type:"",
				model:{
					desktop:"",
					browsers:MT4_WEB_PLATFORM[this.$store.state.language],
					ios:"",
					android:""
				}
			}
		},
		methods:{
			async fetchConfigURL(){
				let fields = ["mt4_pc","mt4_ios","mt4_android"],
					{ success,data } = await configService.getConfigByKey({fields});
					if(success && data){
						this.$set(this.model,"desktop",data["mt4_pc"])
						this.$set(this.model,"ios",data["mt4_ios"])
						this.$set(this.model,"android",data["mt4_android"])
					}

			},
			openPage(type){
				window.open(this.model[type],"_blank")
				this.type = type
			}


		},
		created(){
			this.fetchConfigURL();
		},
		watch:{
			"$store.state.language" : function(val){
				this.model.browsers = MT4_WEB_PLATFORM[val]
			}
		}
	}
</script>
<style lang="less">
	@import "~assets/less/variable.less";
	.download-center-mobile{
		padding-left: 0px;
		padding-right: 0px;
		.download-center-mobile-title{
			padding-left: 15px;
		}
	}
	.platform.selected{
		background-color: @light-component-accent-bg-color;
	}
	html.dark{
		.platform.selected{
		background-color: @dark-component-accent-bg-color;
	}
	}
</style>