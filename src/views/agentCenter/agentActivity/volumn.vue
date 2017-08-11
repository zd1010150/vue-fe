<template>
	<div class="row">
		<div class="col-lg-12 col-md-12">
				<h4>交易量等级</h4>
				<div class="col-lg-6 col-md-6 col-xs-12 pl-none col-volumn">
					<section class="panel volumn-panel">
						<div class="panel-body p-lg bg-default">
							<div class="widget-summary">
								<div class="widget-summary-col pr-xs info-col">
									<div class="summary pb-lg">
										<h4 class="title">FX</h4>
										<div class="info">
											<strong class="amount">1281</strong>手
										</div>
									</div>
									<div class="summary-footer pt-lg">
										<!-- <span class="level lead pr-md">等级10</span>
										<span>4000/10000</span>	 -->
										<span class="text-dark">有未领取奖励</span>
										&nbsp;
										<chp-button class="btn-primary"><i class="fa fa-gift"></i>&nbsp;点我领奖!</chp-button>
										<!-- <mu-icon-button><i class="fa fa-gift"></i>有未领取奖励，点我领奖!</mu-icon-button> -->
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
								<div class="widget-summary-col pr-xs info-col">
									<div class="summary pb-lg">
										<h4 class="title">FX</h4>
										<div class="info">
											<strong class="amount">1281</strong>手
										</div>
									</div>
									<div class="summary-footer pt-lg">
										<!-- <span class="level lead pr-md">等级10</span>
										<span>4000/10000</span>	 -->
										<span class="text-dark">有未领取奖励</span>
										&nbsp;
										<chp-button class="btn-primary"><i class="fa fa-gift"></i>&nbsp;点我领奖!</chp-button>
										<!-- <mu-icon-button><i class="fa fa-gift"></i>有未领取奖励，点我领奖!</mu-icon-button> -->
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
								<div class="widget-summary-col pr-xs info-col">
									<div class="summary pb-lg">
										<h4 class="title">FX</h4>
										<div class="info">
											<strong class="amount">1281</strong>手
										</div>
									</div>
									<div class="summary-footer pt-lg ">
										<div class="col-lg-6 col-md-6 col-xs-12 p-none">
											<span class="level  pr-md">
											等级<span>6 </span> 
											<i class="fa lead fa-caret-right" aria-hidden="true"></i>
											等级<span>10 </span> 
										</span>
										</div>
										<div class="col-lg-6 col-md-6 col-xs-12 p-none">
											
											<span class="text-primary text-primary lead">
												<i class="fa fa-money" aria-hidden="true"></i>
													300(AUD)
											</span>
											
											<chp-button class="btn-primary pull-right">
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
								<div class="widget-summary-col pr-xs info-col">
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
			header.panel-heading{
				padding:10px;
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

</style>