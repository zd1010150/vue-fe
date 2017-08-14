<template>
	<div class="row pt-lg">
		<div class="col-lg-12 col-md-12">
				<h4>交易量等级</h4>
				<div class="col-lg-6 col-md-6 col-xs-12 pl-none col-volumn">
					<section class="panel volumn-panel">
						<div class="panel-body p-lg bg-default">
							<div class="widget-summary">
								<div class="widget-summary-col pl-md pr-md info-col">
									<div class="summary pb-lg">
										<h4 class="title">FX</h4>
										<div class="info">
											<strong class="amount">1281</strong>手
										</div>
									</div>
									<div class="summary-footer pt-lg">
										<span class="level lead pr-md">等级:10 </span>
										<span>4000/10000</span>	
									</div>
								</div>
								<div class="widget-summary-col widget-summary-col-icon">
									<chp-circle-chart class="circle-chart"></chp-circle-chart>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div class="col-lg-6 col-md-6 col-xs-12  pl-none pr-none col-volumn">
					<section class="panel  volumn-panel">
						<div class="panel-body p-lg bg-default">
							<div class="widget-summary">
								<div class="widget-summary-col pl-md pr-md info-col">
									<div class="summary pb-lg">
										<h4 class="title">FX</h4>
										<div class="info">
											<strong class="amount">1281</strong>手
										</div>
									</div>
									<div class="summary-footer pt-lg" :class="classes">
										<div class="level-left">
											<span>
												level 6
												<i class="fa lead fa-caret-right" aria-hidden="true"></i>
												level 10
											</span>
											 
										</div>
										<div class="level-right">
											<span class="text-primary text-primary lead">
												<i class="fa fa-money" aria-hidden="true"></i>
													300(AUD)
											</span>
											<chp-button class="btn-primary">
												<i class="fa fa-gift"></i>&nbsp;Get Bonus
											</chp-button>
										</div>
									</div>
								</div>
								<div class="widget-summary-col widget-summary-col-icon">
									<chp-circle-chart class="circle-chart"></chp-circle-chart>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div class="col-lg-6 col-md-6 col-xs-12  pl-none col-volumn">
					<section class="panel  volumn-panel">
						<div class="panel-body p-lg bg-default">
							<div class="widget-summary">
								<div class="widget-summary-col pl-md pr-md info-col">
									<div class="summary pb-lg">
										<h4 class="title">FX</h4>
										<div class="info">
											<strong class="amount">1281</strong>手
										</div>
									</div>
									<div class="summary-footer pt-lg" :class="classes">
										<div class="level-left">
											<span>
												等级6
												<i class="fa lead fa-caret-right" aria-hidden="true"></i>
												等级10
											</span>
											 
										</div>
										<div class="level-right">
											<span class="text-primary text-primary lead">
												<i class="fa fa-money" aria-hidden="true"></i>
													300(AUD)
											</span>
											<chp-button class="btn-primary">
												<i class="fa fa-gift"></i>&nbsp;点我领奖
											</chp-button>
										</div>
									</div>
								</div>
								<div class="widget-summary-col widget-summary-col-icon">
									<chp-circle-chart class="circle-chart"></chp-circle-chart>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div class="col-lg-6 col-md-6 col-xs-12  pl-none pr-none col-volumn">
					<section class="panel  volumn-panel">
						<div class="panel-body p-lg bg-default">
							<div class="widget-summary">
								<div class="widget-summary-col pl-md pr-md info-col">
									<div class="summary pb-lg">
										<h4 class="title">FX</h4>
										<div class="info">
											<strong class="amount">1281</strong>手
										</div>
									</div>
									<div class="summary-footer pt-lg">
										<span class="level lead pr-md">等级:10 </span>
										<span>4000/10000</span>	
									</div>
								</div>
								<div class="widget-summary-col widget-summary-col-icon">
									<chp-circle-chart class="circle-chart"></chp-circle-chart>
								</div>
							</div>
						</div>
					</section>
				</div>
		</div>
	</div>
</template>
<script>
	export default{
	 data(){
       return {
       	
       }
	 },
     computed:{
     	classes:function(){
     		let status = this.$store.state.leftSideBarStatus
     		if(status && window.innerWidth <= 768){
     			return ""
     		}else{
     			return "level"
     		}
     	}
     },
     created(){
     	
	}
}
</script>
<style lang="less">
@import "~assets/less/normal.less";
.widget-summary{
	.widget-summary-col{
		vertical-align: middle;
		.title{
			padding-bottom: 0px;
		}

	}
	.summary-footer{
		text-align: left;
		&.level{
			display: table;
			width:100%;
			.level-left{
				display: table-cell;
				text-align: left;
				
			}
			.level-right{
				display: table-cell;
				text-align: right;
				vertical-align: middle;
			}
			.level-left,.level-right{
				& > span{
					display: inline-block;
					height:40px;
					line-height: 40px;
					margin:0px;
					vertical-align: middle;
				}
				button{
					vertical-align: middle;
				}
			}
		}
	}
}
@media(max-width:@screen-sm-min){
	.col-volumn{
		padding-right: 0px;
	}
	.volumn-panel{
		.panel-body{
			padding:5px;
			
		}
	}
}

@media(max-width:@screen-xs-min){
	.volumn-panel{
		.info-col{
			display: block;
			width:100%;
		}
		.widget-summary-col.widget-summary-col-icon{
			display: table;
			width:100%;
			padding:10px 10px 0px;
			.circle-chart{
				display: table-cell;
				text-align: center;
				width:100% !important;
			}
		}
	}
}
@media(max-width:@screen-iphone6){ //兼容iphone6
	.volumn-panel{
		.summary-footer.level{
			.level-left,.level-right{
				display:block;
				text-align: left;
				& > span{
					display: inline-block;
					height:40px;
					line-height: 40px;
					margin:0px;
					vertical-align: middle;
				}
				button{
					vertical-align: middle;
				}
			}
		}
	}
}

</style>