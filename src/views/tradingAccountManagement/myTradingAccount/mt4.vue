
<template>
	<div class="row pt-none">
			<div class="col-lg-12 col-md-12">
			<section class="one-mt4-section">
				<header class="clearfix">
					<div class="col-lg-6 col-md-6 col-xs-12 mt4-account p-none">
						<span class="mt4-title">MT4 Account:</span>
						<strong class="amount mt4 text-dark">{{ mt4.mt4_id}}</strong>
				    	<span class="text-primary">(Type:{{mt4.account_type}})</span>	
					</div>
					<div class="col-lg-6 col-md-6 col-xs-12 text-right p-none operate">
						<chp-button class="mb-xs mt-xs  btn btn-default print-btn" @click="modifyPwd">
					       改变密码
					    </chp-button>
				       	<chp-button class="mb-xs mt-xs  btn btn-default print-btn">
				       		出金
				      	</chp-button>
						<chp-button class="mb-xs mt-xs  btn btn-default print-btn">
							入金
						</chp-button>
					</div>
				</header>
				<div class="charts pt-lg">
					
					<table  class="subtitle small-screen">
						<tr>
							<td>Balance:</td>
							<td>Currency:</td>
							<td>Leverage:</td>
						</tr>
						<tr>
							<td class="info-number text-dark">{{ mt4.balance}}</td>
							<td class="info-number text-dark">{{ mt4.base_currency}}</td>
							<td class="info-number text-dark select">
								<chp-select :value="''+mt4.leverage" class="leverage pull-right">
						            <template v-for="(l,index) in leverages">
						                <mu-menu-item :value="l.val" :title="l.title" key="index"/>
						            </template>
				           		 </chp-select> 
				           </td>
						</tr>
					</table>
					<chp-panel  :canCollapse="true" 
								:canClose="false" 
								collapsePanelText="detaile"
					 			expandPanelText="close" 
					 			:isHeaderTransparent="true" 
					 			:showActionRipple="false"  
								:isLoading="loadingStatus" 
								@collapsePanel="collapsePanel" 
								ref="panel" 
								:defaultStatus="defaultStatus"
					>
						<dl slot="subtitle" class="subtitle clearfix big-screen">
							<dt class="info-title">Balance</dt>
							<dd class="amount info-number text-dark">{{ mt4.balance}}</dd>
							<dt class="info-title">Currency</dt>
							<dd class="amount info-number text-dark">{{ mt4.base_currency}}</dd>
							<dt class="info-title">Leverage</dt>
							<dd class="amount info-number text-dark leverage">
								<chp-select :value="''+mt4.leverage">
					              <template v-for="(l,index) in leverages">
					                <mu-menu-item :value="l.val" :title="l.title" key="index"/>
					              </template>
				           		 </chp-select> 
							</dd>
						</dl>
						<div slot="body" v-if="mt4.account_type != 'Agent'">
							<div class="col-md-12 col-sm-12 pull-right pt-sm pr-none">
				                <form class="form-inline">
				                    <div class="form-group" :class="errorClass('startDate')">
				                      <chp-date-picker :hintText="$t('ui.datePicker.startDate')" v-model.lazy="model.startDay" @input="changeStartday" :fullWidth="true" :required="true"  v-validate="'required'" data-vv-value-path="model.startDay" data-vv-name="startDate" data-vv-validate-on="change" :maxDate="maxStartDate"/>
				                       <span  class="error"
				                      v-if="errors.has('startDate:required')">{{errors.first('startDate:required')}}</span>
				                    </div>
				                    <div class="form-group " :class="errorClass('endDate')">
				                      <chp-date-picker :hintText="$t('ui.datePicker.endDate')" @input="changeEndday" :minDate = "minEndDate" v-model.lazy="model.endDay"  v-validate="'required'" data-vv-value-path="model.endDay" data-vv-name="endDate" :fullWidth="true" :required="true" data-vv-validate-on="change"/>
				                       <span class="error"
				                      v-if="errors.has('endDate:required')">{{errors.first('endDate:required')}}</span>
				                    </div>
				                    <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="research">
				                      <i class="fa fa-search "></i>
				                    </chp-button>
				                </form>
          					</div>
							<div class="col-md-12 col-sm-12 pt-lg pr-none pl-none">
							  <chp-echart :media="media"	:externalOption="option" v-if="option" ></chp-echart>
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
	import validateMixin from 'mixins/validatemix.js'
	import tradeService from 'services/tradeService'
	import mt4Service from 'services/mt4Service'
	const MT4_CHART_PANEL_PREX = "mt4-chart-panel-"

	export default{
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
				console.log(this.mt4.account_type == 'Agent' ? 'close' : 'open',"******")
				return 'close'
			}

		},
		mixins:[validateMixin],
		data(){
			return {
				leverages : this.$store.state.leverage,
				model:{
					startDay:"",
					endDay:""
				},
				total:[],
				minEndDate:"",
          		maxStartDate:"",
          		loadingStatus:false,
          		collapsed:true,
          		isFirstShow:true,
          		defaultOption:{
          			legend: {
          				left:0,
          				orient:'horizontal',
          				data:[]
				    },
				    grid:{
				    	width:'auto',
				    	height:'auto',
				    	left:'10%',
				    	right:'5%'
				    },
				     xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: []
				    }, 
				    yAxis: {
				        type: 'value'
				    },
				    series: [],
				    tooltip: {
				        trigger: 'axis'
				    },
          		},
          		option: null,
          		media:[{
          			query: {
			           maxWidth: 768,
			           minWidth:400 

			        },
			        option:{
			        	legend:{
			        		orient:'horizontal',
			        		//padding:10
			        		left:"5%"
			        	},
			        	grid:{
			        		left:"10%"
			        	}
			        }
          		},
          		{
          			query: {
			           maxWidth: 400    
			        },
			        option:{
			        	legend:{
			        		orient:'vertical',
			        		//padding:10
			        		left:'20%'
			        	},
			        	grid:{
			        		top:'25%',
			        		left:'20%'
			        	}
			        }
          		}]
			}
		},
		methods:{
			
			async modifyPwd(){
				let {success,data} = mt4Service.modifyAccountPWD()
			},
			changeEndday(val){
		      	this.model.endDay = val;
		    },
	      	changeStartday(val){
		      	this.model.startDay = val
		        
	      	},
	      	async fetchChartData(mt4Id){
        		this.loadingStatus = true;
		      	let {data,message,success} = await tradeService.getVolumeStatistics(mt4Id);
		        this.loadingStatus = false;
		        if(success){
		          	this.mapData(data)
		    	}
      		},

	      	async research(){
	            let validateResult = await this.$validator.validateAll();
	            if(validateResult){
	              this.fetchChartData();
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
				    legendData = [this.$t('trade.fx'),this.$t('trade.oil'),this.$t('trade.metal'),this.$t('trade.cfd')],
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


	       		this.option = Object.assign({},this.defaultOption,{
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
	       			this.$router.push('agent-center/statistics');
	       		}else{
	       			this.$emit("collapsePanel",this.order,isOpen)
	       		}
	       		
	       	}
  		},
  		watch:{
  			'model.startDay' : function(val){
    			this.minEndDate = val;
    		},
      		'model.endDay':function(val){
       			this.maxStartDate = val;
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
					top:0px;
					bottom:0px;
					border-top: 3px solid #0088CC;
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
				form{
					&.form-inline{
						text-align: right;
					}
					.form-group{
						text-align: left;
					}
				}
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
					width:100%;
					
					td{
						text-align: left !important;
						&:first-child{
							width:40%;
							
						}
						&:nth-child(2){
							width:40%;
							
						}
						&:last-child{
							text-align: right !important;
						}
						&.select{
							padding-top: 5px;
						}
					}
					.info-number{
						padding-right: 0px;
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
				
				.panel-actions{
					flot:right;
					position:absolute;
					margin-bottom:0px;
					button{
						float:left !important;
					}
				}
			}
		}
	}
</style>