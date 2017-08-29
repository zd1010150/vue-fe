<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="row pt-lg">
		<div class="col-lg-12 col-md-12">
				<div class="clearfix col-lg-12 col-md-12 col-xs-12 pl-none">
					<h4 class="pull-left trade-volume-title">{{ $t('trade.tradeVolumn')}}{{$t('trade.level')}}</h4>
					<a href="javascript:void(0)" @click="showTerms" class="pull-right trade-volume-terms">
						<i class="fa fa-info-circle" aria-hidden="true"></i>
						{{$t('activityTerms')}}
					</a>
				</div>
				
				<template v-for="(value,key) in activityData">
					<div class="col-lg-6 col-md-6 col-xs-12 pl-none col-volumn">
					<section class="panel volumn-panel">
						<div class="panel-body p-lg bg-default">
							<div class="widget-summary">
								<div class="widget-summary-col pl-md pr-md info-col">
									<div class="summary pb-lg">
										<h4 class="title">{{ $t('trade.'+key) }}</h4>
										<div class="info">
											<strong class="amount">
											{{ value.currentValue}}
											</strong>
											{{ $t('trade.lots')}}
										</div>
									</div>
								<!--test-->
									<template v-if="value.hasAward">
										<div class="summary-footer pt-lg" :class="classes">
											<div class="level-left">
												<span>
													{{ $t('trade.level') }} {{ value.awardLevel}}
													<i class="fa lead fa-caret-right" aria-hidden="true"></i>
													{{ $t('trade.level') }} {{ value.currentLevel}}
												</span>
												 
											</div>
											<div class="level-right">
												<span class="text-primary text-primary lead">
													<i class="fa fa-money" aria-hidden="true"></i>
														{{ value.amount}}({{ value.baseCurrency }})
												</span>
												<chp-button class="btn-primary" @click="getBonus(key)">
													<i class="fa fa-gift"></i>&nbsp;{{ $t('getBonus') }}
												</chp-button>
											</div>
										</div>
									</template>
									<template v-else>
										<div class="summary-footer pt-lg">
											<span class="level lead pr-md">
											{{ $t('trade.level') }}: {{ value.currentLevel}} 
											</span>
											<span>
											{{ value.currentValue }}/{{ value.level[value.currentLevel] }}
											</span>	
										</div>
									</template> 
								</div>
								<div class="widget-summary-col widget-summary-col-icon">
									<chp-circle-chart class="circle-chart" :externalOption='value.chartData'>
									</chp-circle-chart>
								</div>
							</div>
						</div>
					</section>
				</div>
			</template>
		</div>
		<chp-dialog-alert
	  	:chp-title="$t('activityTerms')"
	  	:chpContentHtml="terms"
	  	:chp-ok-text="$t('ui.button.confirm')"
	  	:scrollable="true"
	  	ref="termsDailog"/>
	</div>
</template>
<script>
	import activityService from "services/activityService"
	export default{
		props:{
			dataInfo:{
					type: Object,
					default:function(){
						return {}
					}
				},
			agent:{
				type:[String,Number]
			}
		},
		data(){
			return {
				terms:"XX",
				activityData : this.mapData(this.dataInfo),
				defaultData:{
		       		fx:{
		       			level:[0,0,0,0,0,0,0,0,0,0],
		       			currentValue: 0,
		       			currentLevel: 0,
		       			awardLevel:0,
		       			hasAward:0,
		       			awardBonus:0,
		       			baseCurrency:"USD",
		       			percentage:0,
		       			nextLevelValue:0
		       		},
		       		metal:{
		       			level:[0,0,0,0,0,0,0,0,0,0],
		       			currentValue: 0,
		       			currentLevel: 0,
		       			awardLevel:0,
		       			hasAward:0,
		       			awardBonus:0,
		       			baseCurrency:"USD",
		       			percentage:0,
		       		    nextLevelValue:0
		       		},
		       		oil:{
		       			level:[0,0,0,0,0,0,0,0,0,0],
		       			currentValue: 0,
		       			currentLevel: 0,
		       			awardLevel:0,
		       			hasAward:0,
		       			awardBonus:0,
		       			baseCurrency:"USD",
		       			percentage:0,
		       			nextLevelValue:0
		       		},
		       		cfd:{
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
	    watch:{
	    	dataInfo : function(val){
	    		this.mapData(val)
	    	}
	    },
	    methods:{
	    	mapData(data){
	    		let tmpObject = Object.assign({},this.defaultData||{},data)
	     		for(let key in tmpObject){
	     			tmpObject[key].chartData = this.calculateChartData(tmpObject[key])
	     		}
	     		this.activityData = Object.assign({},this.activityData || {},tmpObject)
	    	},
	    	calculateChartData(data){
	    		return {
	    			graphic:[{
	    				type:'group',
				    	left:'center',
				    	top:'50%',
				    	children:[
				    		{
				    			type:'text',
				    			id:'level',
				    			z:100,
				    			style:{
				    				text:this.$t("level")+data.currentLevel+'\n\n'+data.currentValue+'/'+data.level[data.currentLevel],
				    				fill:'#ccc',
				    				lineHeight:16,
				    				font: 'bold 14px Microsoft YaHei',
				    				textAlign: 'center'
				    			}

				    		}
				    	]
	    			}],
	    			series: [
				        {
				            
				            type:'pie',
				            radius: ['78%', '88%'],
				            avoidLabelOverlap: false,
				            startAngle:360,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: false
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {
				                	value:data.currentValue, 
				                	name:this.$t("doneLots")
				                },
				                {
				                	value:data.nextLevelValue, 
				                	name:this.$t('remainLots'),
					                itemStyle:{ 
					                	normal:{
					                	color:'#ccc'
					                }}
				            	}
				            ]
				        }
				    ]
	    		}
	    	},
	    	async getBonus(type){
	    		let {data,message,success} = await activityService.agentAward({type:type,agentId:this.agent})
	    		if(success){
	    			this.$emit('refresh')
	    			this.toastr.info(this.$t("info.SUCCESS"));
	    		}
	    	},
	    	async showTerms(){
	    		let {data,message,success} = await activityService.getAgentLevelActivityTerms(this.$store.state.language == "en" ? "en" :"zh")
	    		if(success){
	    			this.terms = data
	    			this.$refs.termsDailog.open()
	    		}
	    	}
	     }
}
</script>
<style lang="less">
@import "~assets/less/normal.less";

.trade-volume-terms{
	height:29px;
	line-height: 43px;
	display: inline-block;
}
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