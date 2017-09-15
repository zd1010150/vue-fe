<i18n src="./i18n.yaml"></i18n>
<template>
	<div class="row mt4-activity">
		<template v-for="(value,key) in volumnDataInfo">
			<section class="panel volumn-panel col-lg-6 col-xs-12" :class="'volume-'+key">
					<div class="panel-body">
						<div class="widget-summary">
							<div class="widget-summary-col info-col">
								<div class="summary">
									<h4 class="title">{{ $t('trade.'+key) }}</h4>
									<table>
										<tr>
											<td>{{ $t('currentLots') }}</td>
											<td>{{ $t('nextLevel') }}</td>
											<td>{{ $t('maxLevelLots') }}</td>
										</tr>
										<tr>
											<td>{{ value.currentValue }}</td>
											<td>{{ value.level[value.currentLevel] }}</td>
											<td>{{ value.level[value.level.length - 1]}}</td>
										</tr>
									</table>
									<chp-progress-bar 
										:percentage= "value.percentage" 
										:bgClasses="['progress-striped','progress-xxs','mt-xs','mb-xs','light']"
										/>
								</div>
								<template v-if="value.hasAward">
									<div class="summary-footer clearfix">
										<div class="pull-left">
											<span>
												{{ $t('trade.level') }} {{ value.awardLevel}}
												<i class="fa fa-caret-right" aria-hidden="true"></i>
												{{ $t('trade.level') }} {{ value.currentLevel}}
											</span>
											 
										</div>
										<div class="pull-right">
											<i class="fa fa-money" aria-hidden="true"></i>
											{{ value.amount}}({{ value.baseCurrency }})
											<chp-button class="animated  rubberBand btn-xs  pl-sm pr-sm ml-xs " @click="getBonus(key)">
												<span class="button-content-wrapper">
												 	<i class="fa fa-gift hidden-xs">&nbsp;</i>
												 	{{ $t('getBonus') }} 
												</span>
											</chp-button>
										</div>
									</div>
								</template>
								<template v-else>
									<div class="summary-footer clearfix">
										<span class="pull-left">
										{{ $t('trade.level') }}: {{ value.currentLevel}} 
										</span>
										<span class="pull-right">
										{{ $t('maxLevel') }} {{ value.level.length }}
										</span>	
									</div>
								</template> 
							</div>
						</div>
					</div>
				</section>
		</template>
	</div>
</template>
<script>
	import activityService from "services/activityService"
	export default{
		data(){
			return {
				dataInfo:{}
			}
		},
		methods:{
			async fetchData(){
				let {data,success,message} = await activityService.getTraderLevelActivity({
					type:'all'
				})
				if(success){
					this.dataInfo = data 
				}
			},
			async getBonus(type){
	    		let {data,message,success} = await activityService.traderAward({type:type})
	    		if(success){
	    			this.toastr.info(this.$t("info.SUCCESS"))
	    			this.fetchData()
	    		}
	    	},
		},
		
		computed:{
			volumnDataInfo:function(){
				if(this.dataInfo && this.dataInfo.fx && this.dataInfo.metal && this.dataInfo.cfd && this.dataInfo.oil)
					return {
						oil: this.dataInfo.oil,
						fx: this.dataInfo.fx,
						metal: this.dataInfo.metal,
						cfd:this.dataInfo.cfd
					}
				else return {}
			}
		},
		created(){
			this.fetchData()
		}
	}
</script>
<style lang="less">
	@import "~assets/less/variable.less";
	.mt4-activity{
		.panel-body{
			padding:10px 20px !important;
		}
		table{
			width:100%;
			td:last-child{
				text-align: right !important;
			}
		}
		.progress-xxs{
			height:2px;
			border-radius: 2px;
		}
		.widget-summary .summary-footer{
			border-top: none;
			height:27px;
			padding:0px;
			.button-content-wrapper{
				display: inline-block;
		      	min-width: 30px;
		      	min-height: 20px;
		      
			}
		}
		.colorMix(@color){
			h4{
				color:@color !important;
			}
			.btn{
				color:#fff;
				border-color:@color;
				background-color: @color;
			}
			.progress-bar{
				background-color: @color !important;
			}
		}
		.volume-oil{
			.colorMix(@blue-color);
		}
		.volume-fx{
			.colorMix(@theme-red-color);
		}
		.volume-cfd{
			.colorMix(@theme-yellow-color);
		}
		.volume-metal{
			.colorMix(@theme-green-color);
		}
	}
	
	
</style>