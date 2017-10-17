<i18n src="./i18n.yaml"></i18n>
<template>
	<div class="row mt4-activity">
		<template v-for="(value,key) in volumnDataInfo">
			<section class="panel volumn-panel col-lg-12 col-md-12 col-xs-12" :class="'volume-'+key">
					<div class="panel-body">
						<div v-if="value.hasAward" class="tag">							
							<div class="tag-box active" @click="getBonus(key)">
								<div class="border"></div>
								<div class="word">
									<span class="level">
										{{ $t('levelUp') }} {{ value.awardLevel}} <i class="fa fa-caret-right" aria-hidden="true"></i> {{ value.currentLevel}}
									</span>
									<span>
										<i class="fa fa-gift hidden-xs"></i>: {{ value.amount}} ( {{ value.baseCurrency }} )
									</span>
									 
								</div>
							</div>
						</div>
						<div v-else class="tag">							
							<div class="tag-box">
								<div class="border"></div>
								<div class="word"><i class="fa fa-gift hidden-xs"></i> {{ $t('levelUpGift') }}</div>
							</div>
						</div>
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
								<!-- <template v-if="value.hasAward">
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
								</template> -->
								<template>
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
	import activityService from 'services/activityService'
	import { SET_ASYNC_LOADING } from 'store/mutation-types'
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
					console.log('emit data',data)
					this.$emit("getActivityData",data)
				}
			},
			async getBonus(type){
				this.$store.commit(SET_ASYNC_LOADING,true)
	    		let {data,message,success} = await activityService.traderAward({type:type})
	    		this.$store.commit(SET_ASYNC_LOADING,false)
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
						fx: this.dataInfo.fx,
						metal: this.dataInfo.metal,
						cfd:this.dataInfo.cfd,
						oil: this.dataInfo.oil
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
			padding:20px 20px 5px !important;
			position: relative;
		}
		.tag {
			position: absolute;
			top:12px;
			right:-1px;
			box-shadow: 1px 1px 4px rgba(0,0,0,0.5);
			
			.tag-box {
				position: relative;
				.border {
					position: absolute;
					top:0;
					left:-12px;
					width:0;
					border-left:12px solid transparent;
					border-bottom: 12px solid #777;
					border-top: 12px solid #777;
				}
				.word{
					color:#fff;
					padding:3px 10px 3px 15px;
					font-size: 12px;
					line-height: 18px;
					background:#777;
					.level {
						margin-right: 8px;
					}

				}			
			}
			.tag-box.active {
				cursor: pointer;
			}
			
		}
		h4{
			font-size:20px !important;
			padding-bottom: 5px !important;
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
			.tag-box.active .border {
				border-bottom-color: @blue-color;
				border-top-color: @blue-color;
			}
			.tag-box.active .word {
				background: @blue-color;
			}
			.colorMix(@blue-color);
		}
		.volume-fx{
			.tag-box.active .border {
				border-bottom-color: @theme-red-color;
				border-top-color: @theme-red-color;
			}
			.tag-box.active .word {
				background: @theme-red-color;
			}
			.colorMix(@theme-red-color);
		}
		.volume-cfd{
			.tag-box.active .border {
				border-bottom-color: @theme-yellow-color;
				border-top-color: @theme-yellow-color;
			}
			.tag-box.active .word {
				background: @theme-yellow-color;
			}
			.colorMix(@theme-yellow-color);
		}
		.volume-metal{
			.tag-box.active .border {
				border-bottom-color: @theme-green-color;
				border-top-color: @theme-green-color;
			}
			.tag-box.active .word {
				background: @theme-green-color;
			}
			.colorMix(@theme-green-color);
		}
	}
	
	
</style>