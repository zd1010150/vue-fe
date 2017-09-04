<i18n src="../i18n.yaml"></i18n>
<template>
	<div class="row pt-none">
			<div class="col-lg-12 col-md-12">
			<section class="one-mt4-section pb-lg">
				<header class="clearfix bottom-2px-border pb-sm pt-sm">
					<div class="col-lg-6 col-md-6 col-xs-12 mt4-account p-none">
						<span class="mt4-title">MT4 {{ $t('account') }}:</span>
						<strong class="amount mt4 text-dark">{{ mt4.mt4_id}}</strong>
				    	<span class="text-primary pl-sm">({{ $t('type') }} :{{ mt4.account_type }})</span>	
					</div>
					<operate-trading-account :mt4Id="mt4.mt4_id"></operate-trading-account>	
				</header>
				<div class="charts pt-lg">
					<table  class="subtitle small-screen">
						<tr>
							<td>{{ $t('trade.balance') }}:</td>
							<td>{{ $t('trade.currency') }}:</td>
							<td>{{ $t('trade.leverage') }}:</td>
						</tr>
						<tr>
							<td class="info-number text-dark">{{ mt4.balance}}</td>
							<td class="info-number text-dark">{{ mt4.base_currency}}</td>
							<td class="info-number text-dark select">
								<chp-select :value="''+mt4.leverage" class="leverage pull-right" @change="changeLeverage">
						            <template v-for="(l,index) in leverages">
						                <mu-menu-item :value="l.val" :title="l.title" key="index"/>
						            </template>
				           		 </chp-select> 
				           </td>
						</tr>
					</table>
					<chp-panel  :canCollapse="true" 
								:canClose="false" 
								:collapsePanelText="$t('detail')"
					 			:expandPanelText="$t('close')" 
					 			:isHeaderTransparent="true" 
					 			:showActionRipple="false"  
								:isLoading="loadingStatus" 
								@collapsePanel="collapsePanel" 
								ref="panel" 
								:defaultStatus="defaultStatus"
					>
						<dl slot="subtitle" class="subtitle clearfix big-screen">
							<dt class="info-title">{{ $t('trade.balance') }}</dt>
							<dd class="amount info-number text-dark">{{ mt4.balance}}</dd>
							<dt class="info-title">{{ $t('trade.currency') }}</dt>
							<dd class="amount info-number text-dark">{{ mt4.base_currency}}</dd>
							<dt class="info-title">{{ $t('trade.leverage') }}</dt>
							<dd class="amount info-number text-dark leverage">
								<chp-select :value="''+mt4.leverage" @change="changeLeverage">
					              <template v-for="(l,index) in leverages">
					                <mu-menu-item :value="l.val" :title="l.title" key="index"/>
					              </template>
				           		 </chp-select> 
							</dd>
						</dl>
						<div slot="body" v-if="mt4.account_type != 'Agent'">
							<filter-trading-account @refetchChartData="refetchChartData"></filter-trading-account>
							<div class="col-md-12 col-sm-12 pt-lg pr-none pl-none">
							  <chp-echart :externalOption="option" :media = "media" v-if="option" ></chp-echart>
							</div>
						</div>
					</chp-panel>
				</div>
				<footer></footer>
			</section>
			</div>
		</div>
</template>
<script>
	import mt4Service from 'services/mt4Service'
	import tradeService from 'services/tradeService'
	import filter from './filter'
	import operate from './operate'
	import { LINE_OPTION_CONFIG,LINE_MEDIA_CONFIG } from 'src/config/chart.config.js'
	export default{
		components:{
			'filter-trading-account' : filter,
			'operate-trading-account' : operate 
		},
		props:{
			account:{
				type:Object
			},
			order:Number
		},
		computed:{
			mt4:function(){
				return this.account || {}
			},
			defaultStatus:function(){
				return 'close'
			}

		},
		data(){
			return {
				leverages : this.$store.state.leverage,
				total:[],
				loadingStatus:false,
          		collapsed:true,
          		isFirstShow:true,
          		option: null,
          		media: LINE_MEDIA_CONFIG
			}
		},
		methods:{
			async changeLeverage(val){
				await mt4Service.modifyAccountLeverage(this.mt4.mt4_id,val)
			},
			refetchChartData(start_date,end_date){
				this.fetchChartData(this.mt4.mt4_id,start_date,end_date)
			},
			async fetchChartData(mt4Id,start_date="",end_date=""){
        		this.loadingStatus = true;
		      	let {data,message,success} = await tradeService.getVolumeStatistics(mt4Id,start_date,end_date);
		        this.loadingStatus = false;
		        if(success){
		          	this.mapData(data)
		    	}
      		},
			mapData(data){
	       		let series = { fx:[],oil:[],metal:[],cfd:[]},
	       		 	xAxis = {
				        type: 'category',
				        boundaryGap: false,
				        data: []
				    },
				    lots = this.$t("trade.lots"),
				    legendData = [{
				    	name:this.$t('trade.fx'),
				    	icon:'circle'
				    },{
				    	name:this.$t('trade.oil'),
				    	icon:'circle'
				    },{
				    	name:this.$t('trade.metal'),
				    	icon:'circle'
				    },{
				    	name:this.$t('trade.cfd'),
				    	icon:'circle'
				    }],
				    chart = data.chart,
				    total = [
				    			{
					    			name:this.$t('trade.fx'),
					    			value:data.total.fx
				    			},
				    			{
					    			name:this.$t('trade.oil'),
					    			value:data.total.oil
				    			},
				    			{
					    			name:this.$t('trade.metal'),
					    			value:data.total.metal
				    			},
				    			{
					    			name:this.$t('trade.cfd'),
					    			value:data.total.cfd
				    			},
				    ],
				    self = this
				    self.total = total
					let legend = {
						data: legendData,
				        formatter:function(name){
				        	let val = self.total.filter((ele,index)=>{
				        		if(ele.name == name){
				        			return true
				        		}
				        	})[0].value
				        	return name + " " + val + " "+  lots
				        }
				}
	       		for(let key in chart){
	       			let tmp = chart[key]
					xAxis.data.push(key)
	       			series.fx.push(tmp.fx)
	       			series.oil.push(tmp.oil)
	       			series.metal.push(tmp.metal)
	       			series.cfd.push(tmp.cfd)
	       		}
				this.option = Object.assign({},LINE_OPTION_CONFIG,{
	       			legend:legend,
	       			xAxis:xAxis,
	       			series: [
	       				{
	       					name: this.$t('trade.fx'),
	       					data:series.fx,
	       					type:'line'
	       				},
	       				{
	       					name: this.$t('trade.oil'),
	       					data:series.oil,
	       					type:'line'
	       				},
	       				{
	       					name: this.$t('trade.metal'),
	       					data:series.metal,
	       					type:'line'
	       				},
	       				{
	       					name: this.$t('trade.cfd'),
	       					data:series.cfd,
	       					type:'line'
	       				}
	       			]
	       		})
			},
	       	open(){
	       		this.$refs.panel.expandPanel()
	       		if(this.isFirstShow){
	       			this.fetchChartData(this.mt4.mt4_id)
	       			this.isFirstShow = false
	       		}
	       	},
	       	close(){
	       		this.$refs.panel.shrinkPanel()
	       	},
	       	collapsePanel(isOpen){
	       		if(isOpen && this.mt4.account_type != "Agent"){
	       			this.open()
	       		}
	       		if(this.mt4.account_type == "Agent"){
	       			this.close();
	       			this.$router.push('/agent-center/statistics');
	       		}else{
	       			this.$emit("collapsePanel",this.order,isOpen)
	       		}
	       		
	       	}
  		}
  		

	}
</script>
<style lang="less">
@import "~assets/less/variable.less";
	.one-mt4-section{
		header{
			.mt4-account{
				height:40px;
				line-height: 40px;
				.mt4{
					font-size: 2.4rem;
				}
			}
		}
		.subtitle{
			&.big-screen{
				margin:0px;
				height:45px;
				line-height: 45px;
				dt,dd{
					font-weight: normal;
					display: inline-block;
					vertical-align: baseline;
				}
				
				.info-number{ 
					font-size: 1.7rem;
					padding-right: 20px;

				}
				.leverage{
					width:110px;
					position: relative;
					.chp-select{
						padding-top: 5px;
						position:absolute;
						top:-25px;
					}
				}
			}
			&.small-screen{
				display: none;
			}
		}
		.panel{
			&.panel-collapsed{
				.panel-heading{
					border-bottom: 2px solid #0088CC;
    				border-radius: 2px 3px 0px 0px !important;
				}
				.panel-body{
					border-bottom: none;

				}
			}

			.panel-heading{
				overflow: hidden;
				padding-bottom: 0px;
				padding-top:0px;
				height:45px;
				.panel-subtitle{
					margin:0px 0px;
					height:100%;
				}
				.panel-actions{
					padding: 0px 10px;
					background-color: @light-component-bg-color;
					border-top: 3px solid #0088CC;
					top:0px;
					bottom:0px;
					border-radius: 5px 5px 0px 0px ;
					a.action-text{
						&:hover{
							background-color:  @light-component-bg-color;	
						}
						color:@blue-color;
					}
				}
			}
			.panel-body{
				border-bottom: 2px solid #0088CC;
				padding:0px;
			}
		}
	}
	html.dark{
		.one-mt4-section{
			.panel{
				.panel-heading{
					.panel-actions{
						background-color: @dark-panel-body-bg-color;
						a.action-text{
							&:hover{
								background-color:  @dark-panel-body-bg-color;	
							}
						}
					}
				}
			}
		}
	}
	@media (max-width:@screen-sm-min){
		.one-mt4-section{
			header{
				.operate{
					text-align: left;
				}
			}
			.subtitle.small-screen{
					display: table ;
					font-size: 1.3rem;
					
					td{ 
						padding: 0px 20px 5px 0px;
						text-align: left !important;
						/*&:first-child{
							width:40%;
							
						}
						&:nth-child(2){
							width:40%;
							
						}*/
						&:last-child{
							text-align: right !important;
						}
						&.select{
							padding-top: 5px;
						}
					}
					.info-number{
						.leverage{
							width:90px;
						}
					}
					
				}
			.panel{
				padding-top: 20px;
				.subtitle.big-screen{
					display: none;
				}
				.panel-heading{
					.panel-actions{
						
						left:0;
						right:auto !important;
						position:absolute;
						margin-bottom:0px;
						button{
							float:left !important;
						}
					}
				}

			}
		}
	}
</style>