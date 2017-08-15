<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="row pt-lg">
		<div class="col-lg-12 col-md-12">
				<h4 class="pull-left">{{ $t('activeClient')}}{{$t('level')}}</h4>
				<section class="panel panel-responsive">
					<div class="panel-body ">
						<table class="client-table">
							<tr>
								<td class="padding-10">有效客户数：</td>
								<td class="padding-10">总客户数：</td>
							</tr>
							<tr>
								<td class="padding-10">
									<span class="lead text-dark padding-right-10">
									{{ activityInfo.currentValue}}
									</span>{{ $t('traderUnit') }}
								</td>
								<td class="padding-10">
									<span class="lead text-dark padding-right-10">
									10000
									</span>{{ $t('traderUnit') }}
								</td>
							</tr>
						</table>
						<div class="progress progress-striped progress-xs m-sm light">
							<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemax="100" :style="{width: activityInfo.percentage+'%' }">
								<span class="sr-only">{{ activityInfo.percentage }}%</span>
							</div>
						</div>
						<p class="padding-10 pb-none padding-top-20">
							<span class="level lead pr-md">{{ $t('level') }}{{ activityInfo.currentLevel}}</span>
						<span class="number">{{ activityInfo.currentValue}}/{{ activityInfo.level[activityInfo.currentLevel]}}</span>
						</p>
					</div>
					<header class="panel-heading bg-white ">
						<chp-liquid-fill :percentage="activityInfo.percentage" width="140px" height="140px" class="liquid-fill-chart"></chp-liquid-fill>
					</header>
					
				</section>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			agent:{
				type: [String, Number]
			},
			dataInfo:{
				type: Object
			}
		},
		data(){
			return {
				defaultData:{
					level:[0,0,0,0,0,0,0,0,0,0],
	       			currentValue: 0,
	       			currentLevel: 0,
	       			awardLevel:0,
	       			hasAward:0,
	       			awardBonus:0,
	       			baseCurrency:"USD",
	       			percentage:0,
	       			nextLevelValue:0
				}
			}
		},
		computed:{
			activityInfo:function(){
				return Object.assign(this.defaultData,this.dataInfo)
			}
		}
	}
</script>
<style lang="less">
@import "~assets/less/normal.less";
	.panel-responsive{
		display: table;
		width:100%;
		.panel-body{
			display: table-cell;
			vertical-align: middle;
			padding:20px;
		}
		header.panel-heading{
			width:140px;
			display: table-cell;
			padding:30px;
			vertical-align: middle;
		}

	}
	@media(max-width:@screen-sm-min){
		.panel-responsive{
			.panel-body{
				padding:5px;
			}
			header.panel-heading{
				padding:10px;
			}
		}
	}

	@media(max-width:@screen-xs-min){
		.panel-responsive{
			.panel-body{
				display: block;
				width:100%;
			}
			header.panel-heading{
				display: table;
				width:100%;
				padding:0px 10px 30px;
				.liquid-fill-chart{
					display: table-cell;
					text-align: center;
					width:100% !important;
				}
			}
		}
	}
	
</style>